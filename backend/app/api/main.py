"""Adhikaar API — assessment pipeline over 15 central welfare schemes."""

import logging
import time
from collections import defaultdict, deque

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.agent.graph import run_assessment
from app.agent.nodes import corpus_by_id
from app.api.schemas import AssessRequest, AssessResponse, SchemeSummary
from app.i18n.translate import to_english, translate_response

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(name)s %(levelname)s %(message)s")
logger = logging.getLogger("adhikaar.api")

app = FastAPI(
    title="Adhikaar API",
    description=(
        "A verifiable public-benefit reasoning engine: cited eligibility answers for "
        "15 Indian central welfare schemes, grounded in official scheme text."
    ),
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# The pipeline spends shared free-tier LLM quota, so the public endpoint is
# rate-limited per client (sliding window, in-process — one container serves this).
RATE_LIMIT_REQUESTS = 10
RATE_LIMIT_WINDOW_SECONDS = 60.0
_request_times: defaultdict[str, deque[float]] = defaultdict(deque)


@app.middleware("http")
async def rate_limit_assess(request: Request, call_next):
    if request.url.path == "/api/assess" and request.method == "POST":
        client_ip = request.client.host if request.client else "unknown"
        now = time.monotonic()
        window = _request_times[client_ip]
        while window and now - window[0] > RATE_LIMIT_WINDOW_SECONDS:
            window.popleft()
        if len(window) >= RATE_LIMIT_REQUESTS:
            return JSONResponse(
                status_code=429,
                content={"detail": "Too many requests — please wait a minute and try again."},
            )
        window.append(now)
    return await call_next(request)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/schemes", response_model=list[SchemeSummary])
def list_schemes() -> list[SchemeSummary]:
    """All schemes in the corpus."""
    return [
        SchemeSummary(
            scheme_id=doc.scheme_id,
            short_name=doc.short_name,
            name=doc.name,
            category=doc.category,
            ministry=doc.ministry,
            page_url=doc.page_url,
        )
        for doc in corpus_by_id().values()
    ]


@app.post("/api/assess", response_model=AssessResponse)
def assess(request: AssessRequest) -> AssessResponse:
    """Assess scheme eligibility from a plain-language description.

    Conversational: when the response is `need_info`, show `question` to the user
    and send their reply together with the returned `profile`.
    """
    prior = request.profile.model_dump(exclude_none=True) if request.profile else None
    # Inbound edge: free text → canonical English. The engine and extractor
    # never see the user's language; structured profile fields pass untouched.
    message = to_english(request.message, request.lang)
    try:
        state = run_assessment(message, prior, engine=request.engine)
    except Exception:
        logger.exception("assessment pipeline failed")
        raise HTTPException(
            status_code=502,
            detail="We couldn't complete the assessment right now. Please try again.",
        ) from None

    response = AssessResponse(
        status=state["status"],
        question=state.get("question"),
        profile=state["profile"],
        results=state.get("results", []),
    )
    # Outbound edge: prose → user's language. Verdicts, scheme names, amounts,
    # URLs, and citations are language-invariant by construction.
    return translate_response(response, request.lang)

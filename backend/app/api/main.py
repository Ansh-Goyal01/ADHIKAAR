"""Adhikaar API — assessment pipeline over 15 central welfare schemes."""

import logging

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.agent.graph import run_assessment
from app.agent.nodes import corpus_by_id
from app.api.schemas import AssessRequest, AssessResponse, SchemeSummary

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
    allow_origins=["http://localhost:3000", "https://*.vercel.app"],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


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
    try:
        state = run_assessment(request.message, request.profile, engine=request.engine)
    except Exception:
        logger.exception("assessment pipeline failed")
        raise HTTPException(
            status_code=502,
            detail="We couldn't complete the assessment right now. Please try again.",
        ) from None

    return AssessResponse(
        status=state["status"],
        question=state.get("question"),
        profile=state["profile"],
        results=state.get("results", []),
    )

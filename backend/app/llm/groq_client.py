"""Groq (Llama 3.3 70B) client — secondary model used as the independent eval judge."""

import logging
import time

from groq import APIError, Groq
from tenacity import retry, retry_if_exception_type, stop_after_attempt, wait_exponential

from app.config import settings
from app.llm.cache import cache_key, get_cache

logger = logging.getLogger(__name__)

_client: Groq | None = None


def _get_client() -> Groq:
    global _client
    if _client is None:
        _client = Groq(api_key=settings.groq_api_key)
    return _client


THROTTLE_SECONDS = 1.0  # keep well inside the free-tier requests/tokens-per-minute caps


@retry(
    stop=stop_after_attempt(6),
    wait=wait_exponential(multiplier=2, min=2, max=90),
    retry=retry_if_exception_type(APIError),
)
def _complete(prompt: str, temperature: float, json_mode: bool) -> str:
    response = _get_client().chat.completions.create(
        model=settings.groq_model,
        messages=[{"role": "user", "content": prompt}],
        temperature=temperature,
        response_format={"type": "json_object"} if json_mode else None,
    )
    return response.choices[0].message.content or ""


def complete(prompt: str, temperature: float = 0.0, json_mode: bool = False) -> str:
    """Plain completion, served from disk cache when possible."""
    key = cache_key(
        "groq",
        settings.groq_model,
        {"prompt": prompt, "temperature": temperature, "json": json_mode},
    )
    cache = get_cache()
    text = cache.get(key)
    if text is None:
        text = _complete(prompt, temperature, json_mode)
        cache.set(key, text)
        time.sleep(THROTTLE_SECONDS)
    else:
        logger.debug("groq cache hit")
    return text

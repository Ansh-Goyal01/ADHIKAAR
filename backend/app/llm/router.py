"""Resilient structured generation: Gemini primary, Groq fallback.

The free Gemini tier intermittently returns 503 (high demand) or degenerate
empty outputs. Any failure — transport, parsing, or semantic (via `validate`) —
falls back to Groq (Llama 3.3 70B) with the JSON schema embedded in the prompt.
"""

import json
import logging
from collections.abc import Callable
from typing import TypeVar

from pydantic import BaseModel

from app.llm import gemini, groq_client

logger = logging.getLogger(__name__)

T = TypeVar("T", bound=BaseModel)

GROQ_JSON_SUFFIX = """

Respond with a single JSON object (no prose, no markdown fences) that conforms
exactly to this JSON schema:
{schema}
"""


def generate_structured_resilient(
    prompt: str,
    schema: type[T],
    validate: Callable[[T], None] | None = None,
) -> T:
    """Structured output from Gemini, falling back to Groq. `validate` may raise
    to reject a semantically-bad result and trigger the fallback."""
    try:
        result = gemini.generate_structured(prompt, schema)
        if validate is not None:
            validate(result)
        return result
    except Exception as exc:  # noqa: BLE001 — any primary failure triggers fallback
        logger.warning("gemini failed (%s: %s); falling back to groq", type(exc).__name__, exc)

    text = groq_client.complete(
        prompt + GROQ_JSON_SUFFIX.format(schema=json.dumps(schema.model_json_schema())),
        json_mode=True,
    )
    result = schema.model_validate_json(text)
    if validate is not None:
        validate(result)
    return result

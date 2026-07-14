"""Request/response models for the public API (OpenAPI-documented)."""

from typing import Literal

from pydantic import BaseModel, Field, model_validator

from app.agent.state import SchemeResult, UserProfile


class AssessRequest(BaseModel):
    message: str = Field(
        default="",
        max_length=4000,
        description="What the person said. May be empty when a structured "
        "profile (from the guided wizard) is supplied instead.",
    )
    profile: UserProfile | None = Field(
        default=None, description="Profile from a previous turn (send back unchanged)"
    )

    @model_validator(mode="after")
    def _message_or_profile(self) -> "AssessRequest":
        if not self.message.strip() and self.profile is None:
            raise ValueError("Provide a message, a profile, or both.")
        return self
    engine: Literal["rules", "llm"] | None = Field(
        default=None,
        description="Override the decider: deterministic rules engine (default) or "
        "LLM-only baseline (kept for comparison).",
    )
    lang: str = Field(
        default="en",
        max_length=8,
        description="Report language (BCP-47 primary subtag, e.g. 'hi'). The "
        "engine always reasons in canonical English; only free-text input and "
        "report prose are translated. Verdicts, scheme names, amounts, and "
        "citations are language-invariant.",
    )


class AssessResponse(BaseModel):
    status: Literal["ok", "need_info"]
    question: str | None = Field(default=None, description="Set when status is need_info")
    profile: UserProfile
    results: list[SchemeResult] = []


class SchemeSummary(BaseModel):
    scheme_id: str
    short_name: str
    name: str
    category: str
    ministry: str
    page_url: str

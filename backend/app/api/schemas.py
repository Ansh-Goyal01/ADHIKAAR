"""Request/response models for the public API (OpenAPI-documented)."""

from typing import Literal

from pydantic import BaseModel, Field

from app.agent.state import SchemeResult, UserProfile


class AssessRequest(BaseModel):
    message: str = Field(min_length=3, max_length=4000, description="What the person said")
    profile: dict | None = Field(
        default=None, description="Profile from a previous turn (send back unchanged)"
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

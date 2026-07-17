"""Typed state flowing through the agent pipeline."""

from typing import Literal, TypedDict, get_args

from pydantic import BaseModel, Field, field_validator

from app.retrieval.search import RetrievedChunk

Verdict = Literal["eligible", "likely_eligible", "not_eligible", "need_more_info"]


class UserProfile(BaseModel):
    """Structured facts extracted from the user's plain-language description.

    Every field is optional — `None` means "not stated", and the pipeline treats
    missing facts as unknowns, never as defaults.
    """

    age: int | None = None
    gender: Literal["male", "female", "other"] | None = None
    marital_status: Literal["married", "widowed", "single", "divorced"] | None = None
    state: str | None = None
    area: Literal["rural", "urban"] | None = None
    occupation: str | None = None
    is_farmer_with_land: bool | None = None
    annual_family_income_inr: int | None = None
    social_category: (
        Literal["general", "sc", "st", "obc", "minority", "ews", "dnt", "safai_mitra"]
        | None
    ) = None
    has_bpl_card: bool | None = None
    disability_percent: int | None = None
    has_bank_account: bool | None = None
    pays_income_tax: bool | None = None
    is_student: bool | None = None
    daughter_age: int | None = None
    # Facts that make occupation/household rules deterministic (Phase 2 engine).
    family_member_in_govt_service: bool | None = None
    receives_govt_pension_over_10k: bool | None = None
    holds_constitutional_or_political_post: bool | None = None
    is_practicing_registered_professional: bool | None = None
    cultivates_crops: bool | None = None
    has_land_ownership_or_tenure_docs: bool | None = None
    house_type: Literal["kutcha", "pucca"] | None = None
    owns_motorized_vehicle: bool | None = None
    is_pmjay_priority_category: bool | None = None
    has_lpg_connection: bool | None = None
    is_street_vendor: bool | None = None
    has_vending_certificate_or_lor: bool | None = None
    is_vishwakarma_trade_artisan: bool | None = None
    is_post_matric_student: bool | None = None
    is_pregnant: bool | None = None
    # The applicant is the only girl child of the family (no brother; per scheme
    # text, a girl with a brother is not a "single girl child").
    single_girl_child: bool | None = None
    # Disability category as enumerated in the National Trust Act 1999 / RPwD Act
    # scheme text (Autism, Cerebral Palsy, Intellectual Disability, Multiple
    # Disabilities); "other" for a certified disability outside those four.
    disability_type: (
        Literal[
            "autism",
            "cerebral_palsy",
            "intellectual_disability",
            "multiple_disabilities",
            "other",
        ]
        | None
    ) = None
    # The family's primary breadwinner has died (National Family Benefit Scheme).
    bereavement_event: bool | None = None
    notes: str = ""

    @field_validator(
        "gender",
        "marital_status",
        "area",
        "social_category",
        "house_type",
        "disability_type",
        mode="before",
    )
    @classmethod
    def _normalize_category(cls, value: object, info) -> object:
        """Extractors sometimes return 'SC', 'Rural', or junk like 'BPL' (an
        economic status, not a social category). Lowercase valid values; treat
        anything outside the Literal as "not stated" rather than failing the
        whole request — with disk-cached completions such a failure would be
        deterministic and permanent."""
        if not isinstance(value, str):
            return value
        lowered = value.strip().lower()
        allowed = get_args(get_args(cls.model_fields[info.field_name].annotation)[0])
        return lowered if lowered in allowed else None


class ProfileExtraction(BaseModel):
    """Gemini structured output for the profile-builder node."""

    profile: UserProfile
    is_enough_to_assess: bool
    clarifying_question: str = Field(
        default="",
        description="One kind, plain-language question asking ONLY for the most "
        "valuable missing facts. Empty if is_enough_to_assess.",
    )


class Citation(BaseModel):
    chunk_id: str
    quote: str


class Reason(BaseModel):
    text: str
    citations: list[Citation]


class SchemeAssessment(BaseModel):
    scheme_id: str
    verdict: Verdict
    summary: str
    reasons: list[Reason]
    missing_info: list[str] = []


class AssessmentBatch(BaseModel):
    assessments: list[SchemeAssessment]


class VerifiedCitation(BaseModel):
    chunk_id: str
    quote: str
    section: str
    source_url: str


class VerifiedReason(BaseModel):
    text: str
    citations: list[VerifiedCitation]


class SchemeResult(BaseModel):
    """Final per-scheme answer returned by the API."""

    scheme_id: str
    scheme_name: str
    short_name: str
    verdict: Verdict
    summary: str
    reasons: list[VerifiedReason]
    missing_info: list[str]
    # For conditional (likely_eligible) verdicts: the self-declared facts the
    # verdict rests on, each phrased as a concrete verification step.
    confirm_before_applying: list[str] = []
    documents: str = ""
    how_to_apply: str = ""
    page_url: str = ""
    references: list[dict[str, str]] = []
    dropped_claims: int = 0


class AgentState(TypedDict, total=False):
    message: str
    prior_profile: dict | None
    profile: UserProfile
    status: Literal["ok", "need_info"]
    question: str
    retrieved: list[RetrievedChunk]
    assessments: list[SchemeAssessment]
    results: list[SchemeResult]

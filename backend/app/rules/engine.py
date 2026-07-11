"""Deterministic eligibility engine — three-valued logic over typed facts.

Every rule is one clause of official scheme text made executable:
- `require` rules must hold; `exclude` rules must not.
- A rule over a missing fact evaluates to *unknown* — never guessed. Unknowns
  surface as questions, and a scheme with unknowns yields `need_more_info`.
- `self_declared` marks facts the state ultimately verifies (e.g. BPL lists):
  if such a rule is decisive, `eligible` is softened to `likely_eligible`.
"""

from typing import Literal

from pydantic import BaseModel, model_validator

from app.agent.state import UserProfile, Verdict

Op = Literal["eq", "ne", "gt", "gte", "lt", "lte"]
RuleStatus = Literal["met", "failed", "excluded", "unknown"]


class Condition(BaseModel):
    """A leaf comparison on one profile field, or an any/all combinator."""

    field: str | None = None
    op: Op | None = None
    value: bool | int | str | None = None
    any: list["Condition"] | None = None
    all: list["Condition"] | None = None

    @model_validator(mode="after")
    def _exactly_one_form(self) -> "Condition":
        forms = sum([self.field is not None, self.any is not None, self.all is not None])
        if forms != 1:
            raise ValueError("condition must be exactly one of: leaf(field/op/value), any, all")
        if self.field is not None:
            if self.op is None:
                raise ValueError(f"leaf condition on {self.field!r} needs an op")
            if self.field not in UserProfile.model_fields:
                raise ValueError(f"unknown profile field {self.field!r}")
        return self


def _compare(actual: bool | int | str, op: Op, value: bool | int | str) -> bool:
    match op:
        case "eq":
            return actual == value
        case "ne":
            return actual != value
        case "gt":
            return actual > value
        case "gte":
            return actual >= value
        case "lt":
            return actual < value
        case "lte":
            return actual <= value


def evaluate_condition(condition: Condition, profile: UserProfile) -> bool | None:
    """Three-valued: True, False, or None (a needed fact is missing)."""
    if condition.any is not None:
        results = [evaluate_condition(c, profile) for c in condition.any]
        if any(r is True for r in results):
            return True
        return None if any(r is None for r in results) else False
    if condition.all is not None:
        results = [evaluate_condition(c, profile) for c in condition.all]
        if any(r is False for r in results):
            return False
        return None if any(r is None for r in results) else True

    actual = getattr(profile, condition.field)
    if actual is None:
        return None
    return _compare(actual, condition.op, condition.value)


class Rule(BaseModel):
    id: str
    kind: Literal["require", "exclude"]
    when: Condition
    clause: str  # the official text this rule encodes, verbatim or tightly quoted
    source_url: str
    ask: str  # plain-language question to resolve an unknown
    self_declared: bool = False


class SchemeRules(BaseModel):
    scheme_id: str
    version: str
    rules: list[Rule]


class RuleFinding(BaseModel):
    rule_id: str
    kind: Literal["require", "exclude"]
    status: RuleStatus
    clause: str
    source_url: str
    ask: str
    self_declared: bool


class RuleVerdict(BaseModel):
    scheme_id: str
    verdict: Verdict
    findings: list[RuleFinding]

    @property
    def unknown_asks(self) -> list[str]:
        return [f.ask for f in self.findings if f.status == "unknown"]


def _rule_status(rule: Rule, profile: UserProfile) -> RuleStatus:
    holds = evaluate_condition(rule.when, profile)
    if holds is None:
        return "unknown"
    if rule.kind == "require":
        return "met" if holds else "failed"
    return "excluded" if holds else "met"


def evaluate_scheme(scheme: SchemeRules, profile: UserProfile) -> RuleVerdict:
    findings = [
        RuleFinding(
            rule_id=rule.id,
            kind=rule.kind,
            status=_rule_status(rule, profile),
            clause=rule.clause,
            source_url=rule.source_url,
            ask=rule.ask,
            self_declared=rule.self_declared,
        )
        for rule in scheme.rules
    ]

    if any(f.status in ("failed", "excluded") for f in findings):
        verdict: Verdict = "not_eligible"
    elif any(f.status == "unknown" for f in findings):
        verdict = "need_more_info"
    elif any(f.self_declared for f in findings):
        verdict = "likely_eligible"
    else:
        verdict = "eligible"
    return RuleVerdict(scheme_id=scheme.scheme_id, verdict=verdict, findings=findings)

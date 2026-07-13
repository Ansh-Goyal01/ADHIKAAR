"""Phase 2 nodes: the deterministic rules engine decides; the LLM only explains.

The engine evaluates all 15 schemes against the typed profile. Reasons cite the
rule's source clause (official text, human-verified at encoding time), so no
chunk-containment verification is needed — grounding holds by construction.
The LLM writes the one-line friendly summaries and can never change a verdict;
if it fails, deterministic template summaries ship instead.
"""

import logging

from pydantic import BaseModel

from app.agent.nodes import corpus_by_id
from app.agent.state import (
    AgentState,
    SchemeResult,
    Verdict,
    VerifiedCitation,
    VerifiedReason,
)
from app.llm.router import generate_structured_resilient
from app.rules.engine import RuleFinding, RuleVerdict, evaluate_scheme
from app.rules.loader import load_all_rules

logger = logging.getLogger(__name__)

VERDICT_ORDER: dict[Verdict, int] = {
    "eligible": 0,
    "likely_eligible": 1,
    "need_more_info": 2,
    "not_eligible": 3,
}

TEMPLATE_SUMMARIES: dict[Verdict, str] = {
    "eligible": "Based on the official rules, you appear to qualify for this scheme.",
    "likely_eligible": (
        "You appear to qualify based on the official rules — one condition rests on a "
        "fact the authorities will verify."
    ),
    "need_more_info": "We need one or two more details to check this scheme for you.",
    "not_eligible": (
        "Based on the official rules, this scheme doesn't apply to your situation."
    ),
}


def _reason_text(finding: RuleFinding) -> str:
    label = finding.rule_id.replace("-", " ")
    if finding.kind == "exclude":
        label = label.removeprefix("exclude ")
        if finding.status == "excluded":
            return f"An official exclusion applies — {label}."
        return f"Exclusion checked — {label} does not apply to you."
    if finding.status == "met":
        return f"Requirement met — {label}."
    return f"Requirement not met — {label}."


def _finding_reasons(verdict: RuleVerdict) -> list[VerifiedReason]:
    if verdict.verdict == "not_eligible":
        relevant = [f for f in verdict.findings if f.status in ("failed", "excluded")]
    else:
        relevant = [f for f in verdict.findings if f.status == "met"]
    return [
        VerifiedReason(
            text=_reason_text(f),
            citations=[
                VerifiedCitation(
                    chunk_id=f"rule:{verdict.scheme_id}:{f.rule_id}",
                    quote=f.clause,
                    section="exclusions" if f.status == "excluded" else "eligibility",
                    source_url=f.source_url,
                )
            ],
        )
        for f in relevant
    ]


class SchemeExplanation(BaseModel):
    scheme_id: str
    summary: str


class SummaryBatch(BaseModel):
    summaries: list[SchemeExplanation]


EXPLAIN_PROMPT = """You explain welfare-scheme eligibility verdicts in one kind sentence each.

The deterministic rules engine has already decided each verdict by checking the person's
facts against official scheme rules — you MUST NOT change, soften, or second-guess any
verdict, and you must not introduce any fact or number that is not given below.

Person's facts: {profile}

Verdicts to explain (scheme, verdict, rule findings):
{verdict_block}

For each scheme_id, write `summary`: ONE warm, plain-language sentence addressed to the
person as "you", faithfully reflecting the verdict and its decisive findings.
"""


def _llm_summaries(state: AgentState, verdicts: list[RuleVerdict]) -> dict[str, str]:
    explain = [v for v in verdicts if v.verdict != "not_eligible"]
    if not explain:
        return {}
    block = "\n".join(
        f"- {v.scheme_id}: {v.verdict}; "
        + "; ".join(f"{f.rule_id}={f.status}" for f in v.findings)
        for v in explain
    )
    wanted = {v.scheme_id for v in explain}
    try:
        batch = generate_structured_resilient(
            EXPLAIN_PROMPT.format(
                # notes carries user-influenced free text — keep it out of the
                # explainer prompt so injected wording can't reach summaries.
                profile=state["profile"].model_dump_json(
                    exclude_none=True, exclude={"notes"}
                ),
                verdict_block=block,
            ),
            SummaryBatch,
        )
        return {s.scheme_id: s.summary for s in batch.summaries if s.scheme_id in wanted}
    except Exception:  # noqa: BLE001 — templates are the safe fallback
        logger.warning("explainer failed; using template summaries")
        return {}


def rules_assess_and_compose(state: AgentState) -> AgentState:
    profile = state["profile"]
    corpus = corpus_by_id()
    retrieved_schemes = {c.scheme_id for c in state.get("retrieved", [])}

    verdicts = [
        evaluate_scheme(scheme_rules, profile) for scheme_rules in load_all_rules().values()
    ]
    # need_more_info is shown only for schemes retrieval found on-topic — otherwise a
    # sparse profile would bury the user in questions about irrelevant schemes.
    verdicts = [
        v
        for v in verdicts
        if v.verdict != "need_more_info" or v.scheme_id in retrieved_schemes
    ]

    summaries = _llm_summaries(state, verdicts)

    results = []
    for verdict in verdicts:
        doc = corpus[verdict.scheme_id]
        results.append(
            SchemeResult(
                scheme_id=verdict.scheme_id,
                scheme_name=doc.name,
                short_name=doc.short_name,
                verdict=verdict.verdict,
                summary=summaries.get(verdict.scheme_id)
                or TEMPLATE_SUMMARIES[verdict.verdict],
                reasons=_finding_reasons(verdict),
                missing_info=(
                    verdict.unknown_asks if verdict.verdict == "need_more_info" else []
                ),
                confirm_before_applying=(
                    verdict.confirmations
                    if verdict.verdict == "likely_eligible"
                    else []
                ),
                documents=doc.sections.get("documents", ""),
                how_to_apply=doc.sections.get("application", ""),
                page_url=doc.page_url,
                references=[r.model_dump() for r in doc.references],
                dropped_claims=0,
            )
        )
    results.sort(key=lambda r: VERDICT_ORDER[r.verdict])
    return {"results": results, "assessments": [], "status": "ok"}

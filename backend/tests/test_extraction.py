"""Extraction pipeline: drafts are validated against the closed field
vocabulary and quarantined in rules/proposed/ — never in the live rules dir."""

from unittest.mock import patch

import pytest
from pydantic import ValidationError

from app.extraction.propose import (
    PROPOSED_DIR,
    ConditionDraft,
    ExtractionOutput,
    RuleDraft,
    SchemeProposal,
    profile_rule_fields,
    propose_rules,
    validate_draft,
    vocabulary_field_names,
    write_proposal,
)
from app.ingestion.models import CorpusDoc


def test_prompt_vocabulary_matches_the_profile_schema_exactly():
    """If someone adds a profile field, the extractor prompt must learn it —
    and the prompt must never promise a field the engine can't test."""
    assert vocabulary_field_names() == profile_rule_fields()


def test_valid_draft_promotes_to_engine_rule_with_proposed_status():
    draft = RuleDraft(
        id="age-at-least-18",
        kind="require",
        when=ConditionDraft(field="age", op="gte", value=18),
        clause="The minimum age of joining is 18 years.",
        ask="What is your age?",
    )
    rule = validate_draft(draft, "https://www.myscheme.gov.in/schemes/x")
    assert rule.review_status == "proposed"
    assert rule.when.field == "age"


def test_list_valued_leaf_expands_to_any_of():
    """Models sometimes collapse 'SC or ST' into one leaf with a list value
    instead of an any_of of two leaves — expand rather than reject it."""
    draft = RuleDraft(
        id="sc-or-st",
        kind="require",
        when=ConditionDraft(field="social_category", op="eq", value=["sc", "st"]),
        clause="The applicant must belong to SC or ST category.",
        ask="Do you belong to SC or ST?",
    )
    rule = validate_draft(draft, "https://example.gov.in")
    assert rule.when.any is not None
    assert {c.value for c in rule.when.any} == {"sc", "st"}


def test_unknown_field_draft_is_rejected():
    draft = RuleDraft(
        id="pregnant-woman",
        kind="require",
        when=ConditionDraft(field="is_pregnant", op="eq", value=True),
        clause="The applicant should be a pregnant woman.",
        ask="Are you pregnant?",
    )
    with pytest.raises(ValidationError):
        validate_draft(draft, "https://example.gov.in")


def _doc() -> CorpusDoc:
    return CorpusDoc(
        scheme_id="test-scheme",
        short_name="TS",
        name="Test Scheme",
        category="test",
        level="Central",
        ministry="Ministry of Testing",
        page_url="https://www.myscheme.gov.in/schemes/test-scheme",
        references=[],
        fetched_at="2026-07-13",
        sections={"eligibility": "The applicant must be at least 18 years of age."},
    )


def test_propose_rules_splits_valid_and_invalid_drafts():
    output = ExtractionOutput(
        rules=[
            RuleDraft(
                id="age-at-least-18",
                kind="require",
                when=ConditionDraft(field="age", op="gte", value=18),
                clause="The applicant must be at least 18 years of age.",
                ask="What is your age?",
            ),
            RuleDraft(
                id="bad-field",
                kind="require",
                when=ConditionDraft(field="not_a_field", op="eq", value=True),
                clause="Nonsense.",
                ask="?",
            ),
        ]
    )
    with patch("app.extraction.propose.generate_structured_resilient", return_value=output):
        proposal = propose_rules(_doc())
    assert [r.id for r in proposal.rules] == ["age-at-least-18"]
    assert proposal.rules[0].source_url == "https://www.myscheme.gov.in/schemes/test-scheme"
    assert len(proposal.rejected_drafts) == 1
    assert proposal.rejected_drafts[0]["draft"]["id"] == "bad-field"


def test_write_proposal_lands_in_proposed_dir_only(tmp_path, monkeypatch):
    monkeypatch.setattr("app.extraction.propose.PROPOSED_DIR", tmp_path / "proposed")
    proposal = SchemeProposal(
        scheme_id="test-scheme",
        scheme_name="Test Scheme",
        extracted_at="2026-07-13",
        source_url="https://example.gov.in",
        rules=[],
        rejected_drafts=[],
        blocked_rules=[],
        simplifications=["Enrollment windows are not modeled."],
    )
    out = write_proposal(proposal)
    assert out.parent.name == "proposed"
    assert "awaiting-human-review" in out.read_text(encoding="utf-8")
    # the engine's live directory is untouched by construction
    assert "schemes" not in str(out.parent)


def test_proposed_dir_is_not_the_live_rules_dir():
    from app.rules.loader import SCHEMES_DIR

    assert PROPOSED_DIR != SCHEMES_DIR
    assert PROPOSED_DIR.name == "proposed"

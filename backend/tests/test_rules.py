"""Every rule in the repository is exercised in all three logic states, plus
hand-written boundary tests for the verdict composition."""

import pytest

from app.agent.state import UserProfile
from app.rules.engine import Condition, Rule, evaluate_scheme
from app.rules.loader import load_all_rules

ALL_SCHEMES = load_all_rules()
ALL_RULES = [
    (scheme_id, rule) for scheme_id, scheme in ALL_SCHEMES.items() for rule in scheme.rules
]

# Valid-but-different values for known Literal-typed fields, keyed by the rule's
# target value. Any value not listed here (free-text fields, or a Literal value
# we haven't seen yet) falls back to a guaranteed-different sentinel string —
# the exact alternate doesn't matter for a not-satisfied probe, only that it differs.
ALT_LITERAL = {
    "widowed": "single",
    "female": "male",
    "male": "female",
    "other": "female",
    "rural": "urban",
    "kutcha": "pucca",
    "sc": "obc",
    "obc": "sc",
    "st": "sc",
    "minority": "general",
    "general": "sc",
}


def _different_value(value: bool | int | str) -> bool | int | str:
    if isinstance(value, bool):
        return not value
    if isinstance(value, str):
        return ALT_LITERAL.get(value, f"not-{value}")
    return value + 1


def _leaf_updates(condition: Condition, satisfy: bool) -> dict:
    value = condition.value
    match condition.op:
        case "eq":
            return {condition.field: value if satisfy else _different_value(value)}
        case "ne":
            # holds (True) means actual != value: satisfy -> anything else,
            # not-satisfy -> exactly value. ne/None is untestable (can never
            # reach "failed" — see NOTES 2026-07-13) and must not reach here.
            if value is None:
                raise AssertionError("ne with value=None has no failing state — fix the rule, not this helper")
            return {condition.field: _different_value(value) if satisfy else value}
        case "gte":
            return {condition.field: value if satisfy else value - 1}
        case "lte":
            return {condition.field: value if satisfy else value + 1}
        case "lt":
            return {condition.field: value - 1 if satisfy else value}
        case "gt":
            return {condition.field: value + 1 if satisfy else value}
    raise AssertionError(f"unhandled op {condition.op}")


def profile_for(condition: Condition, satisfy: bool) -> UserProfile:
    if condition.any is not None:
        if satisfy:
            return UserProfile(**_leaf_updates(condition.any[0], True))
        updates: dict = {}
        for leaf in condition.any:
            updates.update(_leaf_updates(leaf, False))
        return UserProfile(**updates)
    if condition.all is not None:
        if satisfy:
            updates = {}
            for leaf in condition.all:
                updates.update(_leaf_updates(leaf, True))
            return UserProfile(**updates)
        # One leaf false is enough; keep the rest satisfied so the test
        # isolates the "at least one requirement fails" path.
        updates = {}
        for leaf in condition.all:
            updates.update(_leaf_updates(leaf, True))
        updates.update(_leaf_updates(condition.all[0], False))
        return UserProfile(**updates)
    return UserProfile(**_leaf_updates(condition, satisfy))


@pytest.mark.parametrize(
    ("scheme_id", "rule"), ALL_RULES, ids=[f"{s}:{r.id}" for s, r in ALL_RULES]
)
def test_rule_three_states(scheme_id: str, rule: Rule):
    scheme = ALL_SCHEMES[scheme_id]

    def status_of(profile: UserProfile) -> str:
        verdict = evaluate_scheme(scheme, profile)
        return next(f.status for f in verdict.findings if f.rule_id == rule.id)

    holds = status_of(profile_for(rule.when, satisfy=True))
    fails = status_of(profile_for(rule.when, satisfy=False))
    unknown = status_of(UserProfile())

    if rule.kind == "require":
        assert (holds, fails) == ("met", "failed")
    else:
        assert (holds, fails) == ("excluded", "met")
    assert unknown == "unknown"


# --- verdict composition & boundaries ---


def verdict(scheme_id: str, **facts) -> str:
    return evaluate_scheme(ALL_SCHEMES[scheme_id], UserProfile(**facts)).verdict


def test_ignwps_age_window_boundaries():
    base = {"marital_status": "widowed", "gender": "female", "has_bpl_card": True}
    assert verdict("ignwps", age=39, **base) == "not_eligible"
    assert verdict("ignwps", age=40, **base) == "likely_eligible"  # BPL is self-declared
    assert verdict("ignwps", age=79, **base) == "likely_eligible"
    assert verdict("ignwps", age=80, **base) == "not_eligible"


def test_pmjjby_upper_boundary_catches_the_llm_false_positive():
    # The documented Phase-1 failure: LLM said "eligible" for a 62-year-old.
    assert verdict("pmjjby", age=62, has_bank_account=True) == "not_eligible"
    assert verdict("pmjjby", age=50, has_bank_account=True) == "eligible"
    assert verdict("pmjjby", age=51, has_bank_account=True) == "not_eligible"


def test_pm_kisan_taxpayer_exclusion_beats_landholding():
    assert (
        verdict(
            "pm-kisan",
            is_farmer_with_land=True,
            pays_income_tax=True,
            family_member_in_govt_service=False,
            receives_govt_pension_over_10k=False,
        )
        == "not_eligible"
    )


def test_pm_kisan_all_clear_is_eligible():
    assert (
        verdict(
            "pm-kisan",
            is_farmer_with_land=True,
            pays_income_tax=False,
            family_member_in_govt_service=False,
            receives_govt_pension_over_10k=False,
            holds_constitutional_or_political_post=False,
            is_practicing_registered_professional=False,
        )
        == "eligible"
    )


def test_conditional_verdicts_carry_concrete_confirmation_steps():
    """'Likely eligible' must always tell the person exactly what to confirm
    and where — every decisive self-declared rule ships a verify_hint."""
    verdict = evaluate_scheme(
        ALL_SCHEMES["nsap-ignoaps"], UserProfile(age=65, has_bpl_card=True)
    )
    assert verdict.verdict == "likely_eligible"
    assert verdict.confirmations, "conditional verdict without a confirmation step"
    assert "BPL list" in verdict.confirmations[0]
    assert "Gram Panchayat" in verdict.confirmations[0]


def test_every_self_declared_rule_has_a_verify_hint():
    missing = [
        f"{scheme_id}:{rule.id}"
        for scheme_id, rule in ALL_RULES
        if rule.self_declared and not rule.verify_hint.strip()
    ]
    assert not missing, f"self_declared rules without verify_hint: {missing}"


def test_pm_kisan_practicing_professional_family_is_excluded():
    assert (
        verdict(
            "pm-kisan",
            is_farmer_with_land=True,
            is_practicing_registered_professional=True,
        )
        == "not_eligible"
    )


def test_pm_kisan_political_post_family_is_excluded():
    assert (
        verdict(
            "pm-kisan",
            is_farmer_with_land=True,
            holds_constitutional_or_political_post=True,
        )
        == "not_eligible"
    )


def test_apy_taxpayer_excluded_despite_age_and_account():
    assert verdict("apy", age=30, has_bank_account=True, pays_income_tax=True) == "not_eligible"
    assert verdict("apy", age=30, has_bank_account=True, pays_income_tax=False) == "eligible"


def test_sukanya_samriddhi_under_ten_only():
    assert verdict("sukanya-samriddhi", daughter_age=9) == "eligible"
    assert verdict("sukanya-samriddhi", daughter_age=10) == "not_eligible"


def test_pmuy_male_applicant_not_eligible():
    assert verdict("pmuy", gender="male", age=30, has_bpl_card=True, has_lpg_connection=False) == "not_eligible"


def test_missing_fact_yields_need_more_info_with_ask():
    result = evaluate_scheme(
        ALL_SCHEMES["nsap-ignoaps"], UserProfile(age=65)  # BPL status unknown
    )
    assert result.verdict == "need_more_info"
    assert any("BPL" in ask for ask in result.unknown_asks)


def test_bpl_pass_softens_to_likely_eligible():
    assert verdict("nsap-ignoaps", age=65, has_bpl_card=True) == "likely_eligible"

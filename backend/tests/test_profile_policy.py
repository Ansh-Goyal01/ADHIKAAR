"""The proceed/ask decision is deterministic policy, not LLM whim."""

from unittest.mock import patch

from app.agent.nodes import build_profile
from app.agent.state import ProfileExtraction, UserProfile


def run_with_extraction(profile: UserProfile, says_enough: bool) -> str:
    extraction = ProfileExtraction(
        profile=profile, is_enough_to_assess=says_enough, clarifying_question="More?"
    )
    with patch("app.agent.nodes.generate_structured_resilient", return_value=extraction):
        return build_profile({"message": "x", "prior_profile": None})["status"]


def test_three_decisive_facts_override_model_hesitation():
    profile = UserProfile(age=40, has_bank_account=True, pays_income_tax=False)
    assert run_with_extraction(profile, says_enough=False) == "ok"


def test_location_and_gender_do_not_count_as_decisive():
    profile = UserProfile(marital_status="widowed", gender="female", state="Bihar")
    assert run_with_extraction(profile, says_enough=False) == "need_info"


def test_model_yes_is_respected_even_when_sparse():
    profile = UserProfile(age=62, occupation="farmer")
    assert run_with_extraction(profile, says_enough=True) == "ok"

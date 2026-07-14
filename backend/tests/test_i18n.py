"""Translation-at-the-edges: verdict invariance and canonical-value protection."""

from unittest.mock import patch

import pytest

from app.agent.state import SchemeResult, UserProfile, VerifiedReason
from app.api.schemas import AssessRequest, AssessResponse
from app.i18n import translate as tr


class FakeProvider:
    """Deterministic pseudo-translator: wraps text so translation is visible."""

    name = "fake"

    def __init__(self) -> None:
        self.calls: list[list[str]] = []

    def translate_batch(self, texts: list[str], target: str) -> list[str]:
        self.calls.append(list(texts))
        return [f"[{target}]{t}" for t in texts]


@pytest.fixture
def fake_provider(monkeypatch):
    provider = FakeProvider()
    monkeypatch.setattr(tr, "_provider", provider)
    yield provider
    monkeypatch.setattr(tr, "_provider", None)


def _result() -> SchemeResult:
    return SchemeResult(
        scheme_id="pm-kisan",
        scheme_name="Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
        short_name="PM-KISAN",
        verdict="eligible",
        summary="You are eligible because you are a landholding farmer family.",
        reasons=[
            VerifiedReason(
                text="Requirement met — landholding farmer family.",
                citations=[
                    {
                        "chunk_id": "rule:pm-kisan:landholding",
                        "quote": "All landholding farmers' families shall be eligible.",
                        "section": "eligibility",
                        "source_url": "https://www.myscheme.gov.in/schemes/pm-kisan",
                    }
                ],
            )
        ],
        missing_info=[],
        confirm_before_applying=["Confirm your land record at the tehsil office."],
        documents="1. Aadhaar Card\n1. Land papers",
        how_to_apply="Visit [the portal](https://pmkisan.gov.in) and register.",
        page_url="https://www.myscheme.gov.in/schemes/pm-kisan",
        references=[{"title": "Guidelines", "url": "https://pmkisan.gov.in/g.pdf"}],
        dropped_claims=0,
    )


def _response() -> AssessResponse:
    return AssessResponse(status="ok", profile=UserProfile(age=45), results=[_result()])


def test_translate_response_translates_prose_only(fake_provider):
    translated = tr.translate_response(_response(), "hi")
    result = translated.results[0]
    # Prose fields are translated…
    assert result.summary.startswith("[hi]")
    assert result.reasons[0].text.startswith("[hi]")
    assert result.confirm_before_applying[0].startswith("[hi]")
    assert result.documents.startswith("[hi]")
    assert result.how_to_apply.startswith("[hi]")
    # …canonical values are byte-identical.
    assert result.verdict == "eligible"
    assert result.scheme_name == "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)"
    assert result.short_name == "PM-KISAN"
    assert result.page_url == "https://www.myscheme.gov.in/schemes/pm-kisan"
    assert result.references == [{"title": "Guidelines", "url": "https://pmkisan.gov.in/g.pdf"}]
    # Citations are verbatim official text — never translated.
    assert (
        result.reasons[0].citations[0].quote
        == "All landholding farmers' families shall be eligible."
    )


def test_translate_response_english_is_identity(fake_provider):
    response = _response()
    assert tr.translate_response(response, "en") is response
    assert fake_provider.calls == []


def test_verdicts_are_language_invariant(fake_provider):
    """The core parity property: translation cannot change a verdict."""
    response = _response()
    for lang in ("hi", "bn", "ta"):
        translated = tr.translate_response(response, lang)
        assert [r.verdict for r in translated.results] == [
            r.verdict for r in response.results
        ]
        assert [r.scheme_id for r in translated.results] == [
            r.scheme_id for r in response.results
        ]


def test_unsupported_language_passes_through(fake_provider):
    assert tr.translate_many(["hello"], "xx") == ["hello"]
    assert fake_provider.calls == []


def test_translate_many_uses_disk_cache(fake_provider):
    # Unique per run: the disk cache persists between test sessions.
    text = f"Requirement met — adult ({__import__('uuid').uuid4()})."
    first = tr.translate_many([text], "hi")
    second = tr.translate_many([text], "hi")
    assert first == second == [f"[hi]{text}"]
    assert len(fake_provider.calls) == 1  # second call served from disk cache


def test_provider_failure_falls_back_to_english(monkeypatch):
    class BrokenProvider:
        name = "broken"

        def translate_batch(self, texts, target):
            raise RuntimeError("provider down")

    monkeypatch.setattr(tr, "_provider", BrokenProvider())
    text = "This unique failure-path string must survive untranslated."
    assert tr.translate_many([text], "hi") == [text]
    monkeypatch.setattr(tr, "_provider", None)


def test_request_accepts_lang():
    request = AssessRequest(profile={"age": 30}, lang="hi")
    assert request.lang == "hi"
    assert AssessRequest(profile={"age": 30}).lang == "en"


def test_to_english_passthrough_for_english_and_blank(fake_provider):
    assert tr.to_english("I am a farmer", "en") == "I am a farmer"
    assert tr.to_english("   ", "hi") == "   "
    assert fake_provider.calls == []

"""Hybrid retrieval: BM25 + dense fused with RRF, then cross-encoder reranked."""

import pytest

from app.retrieval.rerank import _tokenize, rrf_fuse


def test_tokenize_lowercases_and_strips_punctuation():
    assert _tokenize("Below Poverty Line (BPL) card-holder, age 60+") == [
        "below",
        "poverty",
        "line",
        "bpl",
        "card",
        "holder",
        "age",
        "60",
    ]


def test_rrf_rewards_agreement_between_rankers():
    dense = ["a", "b", "c"]
    lexical = ["b", "d"]
    fused = rrf_fuse([dense, lexical])
    # "b" appears in both rankings, so it must beat "a" (top of one list only).
    assert fused["b"] > fused["a"]
    assert set(fused) == {"a", "b", "c", "d"}


def test_rrf_preserves_order_within_a_single_ranking():
    fused = rrf_fuse([["a", "b", "c"]])
    assert fused["a"] > fused["b"] > fused["c"]


@pytest.mark.slow
def test_reranked_search_surfaces_the_right_scheme():
    """The FN-class probe: a savings-account query for a young daughter must
    rank Sukanya Samriddhi chunks near the top, ahead of pension schemes."""
    from app.retrieval.rerank import search_reranked

    hits = search_reranked(
        "eligibility for government welfare schemes: female, daughter aged 9, "
        "mother wants a long-term savings account for her girl child",
        k=18,
    )
    assert len(hits) == 18
    top5_schemes = [c.scheme_id for c in hits[:5]]
    assert "sukanya-samriddhi" in top5_schemes
    # scores are sigmoid-normalized so downstream section-guarantee chunks
    # (pinned at 1.0) always sort above reranked ones
    assert all(0.0 <= c.score <= 1.0 for c in hits)
    assert hits[0].score >= hits[-1].score

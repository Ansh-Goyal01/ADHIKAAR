"""Hybrid retrieval with local reranking.

Dense-only retrieval was the pipeline's weakest link (scheme precision ~0.22):
BGE-small similarity blurs "who the person is" into "which schemes apply".
This module retrieves broadly along two views — dense (semantic) and BM25
(lexical) — fuses them with reciprocal-rank fusion, then lets a small local
cross-encoder (ONNX, CPU, free) read each query/chunk pair and rerank.
No network calls; the cross-encoder model is cached on disk after first load.
"""

import re
from collections import defaultdict
from functools import lru_cache
from math import exp

from fastembed.rerank.cross_encoder import TextCrossEncoder
from rank_bm25 import BM25Okapi

from app.config import settings
from app.retrieval.search import RetrievedChunk, _collection, _to_chunks, search

DENSE_K = 40  # breadth of the dense candidate sweep
BM25_K = 40  # breadth of the lexical candidate sweep
RRF_DAMPING = 60  # standard reciprocal-rank-fusion constant
POOL_K = 40  # fused candidates handed to the cross-encoder

_WORD = re.compile(r"[a-z0-9]+")


def _tokenize(text: str) -> list[str]:
    return _WORD.findall(text.lower())


@lru_cache(maxsize=1)
def _all_chunks() -> list[RetrievedChunk]:
    result = _collection().get(include=["documents", "metadatas"])
    return _to_chunks(
        result["ids"],
        result["documents"],
        result["metadatas"],
        [0.0] * len(result["ids"]),
    )


@lru_cache(maxsize=1)
def _bm25_index() -> BM25Okapi:
    return BM25Okapi([_tokenize(chunk.text) for chunk in _all_chunks()])


def _bm25_top(query: str, k: int) -> list[RetrievedChunk]:
    chunks = _all_chunks()
    scores = _bm25_index().get_scores(_tokenize(query))
    ranked = sorted(zip(chunks, scores, strict=True), key=lambda cs: cs[1], reverse=True)
    return [chunk for chunk, score in ranked[:k] if score > 0.0]


def rrf_fuse(rankings: list[list[str]], k: int = RRF_DAMPING) -> dict[str, float]:
    """Reciprocal-rank fusion: ids ranked high by several rankers score highest."""
    fused: dict[str, float] = defaultdict(float)
    for ranking in rankings:
        for rank, chunk_id in enumerate(ranking, start=1):
            fused[chunk_id] += 1.0 / (k + rank)
    return dict(fused)


@lru_cache(maxsize=1)
def _cross_encoder() -> TextCrossEncoder:
    return TextCrossEncoder(model_name=settings.reranker_model)


def _sigmoid(logit: float) -> float:
    return 1.0 / (1.0 + exp(-logit))


def search_reranked(query: str, k: int = 18) -> list[RetrievedChunk]:
    """Broad dense + BM25 sweep, RRF fusion, cross-encoder rerank, top-k.

    Returned scores are sigmoid(cross-encoder logit) in (0, 1), so callers that
    pin must-include chunks at 1.0 keep their guarantee after merging.
    """
    dense = search(query, k=DENSE_K)
    lexical = _bm25_top(query, BM25_K)
    by_id = {chunk.chunk_id: chunk for chunk in [*dense, *lexical]}

    fused = rrf_fuse([[c.chunk_id for c in dense], [c.chunk_id for c in lexical]])
    pool = sorted(fused, key=lambda cid: fused[cid], reverse=True)[:POOL_K]

    logits = _cross_encoder().rerank(query, [by_id[cid].text for cid in pool])
    reranked = sorted(zip(pool, logits, strict=True), key=lambda cl: cl[1], reverse=True)
    return [
        by_id[cid].model_copy(update={"score": round(_sigmoid(logit), 6)})
        for cid, logit in reranked[:k]
    ]

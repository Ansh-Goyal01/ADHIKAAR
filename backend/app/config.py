"""Application configuration, loaded from environment variables / repo-root .env."""

from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

REPO_ROOT = Path(__file__).resolve().parents[2]
DATA_DIR = REPO_ROOT / "data"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=REPO_ROOT / ".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    gemini_api_key: str = ""
    groq_api_key: str = ""

    # "rules" = deterministic engine decides (Phase 2, default);
    # "llm" = LLM decides (Phase 1 baseline, kept for the eval comparison)
    eligibility_engine: str = "rules"

    # "gemini" (default) or "groq" — set PRIMARY_LLM=groq when Gemini free-tier
    # quota is exhausted to skip its retry latency entirely.
    primary_llm: str = "gemini"

    gemini_model: str = "gemini-2.5-flash"
    groq_model: str = "llama-3.3-70b-versatile"
    # Faithfulness judge runs on a separate model: its own free-tier quota bucket,
    # and it reduces self-preference when judging the 70B generator's claims.
    groq_judge_model: str = "llama-3.1-8b-instant"
    embedding_model: str = "BAAI/bge-small-en-v1.5"
    # Local ONNX cross-encoder for reranking (free, CPU, ~80MB on disk).
    reranker_model: str = "Xenova/ms-marco-MiniLM-L-6-v2"

    raw_dir: Path = DATA_DIR / "raw"
    corpus_dir: Path = DATA_DIR / "corpus"
    chroma_dir: Path = DATA_DIR / "chroma"
    cache_dir: Path = DATA_DIR / "cache"


settings = Settings()

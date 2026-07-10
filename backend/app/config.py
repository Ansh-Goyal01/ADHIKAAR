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

    gemini_model: str = "gemini-2.5-flash"
    groq_model: str = "llama-3.3-70b-versatile"
    embedding_model: str = "BAAI/bge-small-en-v1.5"

    raw_dir: Path = DATA_DIR / "raw"
    corpus_dir: Path = DATA_DIR / "corpus"
    chroma_dir: Path = DATA_DIR / "chroma"
    cache_dir: Path = DATA_DIR / "cache"


settings = Settings()

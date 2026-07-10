# Adhikaar backend — Hugging Face Spaces (Docker SDK, free tier).
# The vector index is built at image-build time from the committed corpus,
# so the Space serves queries immediately after cold start.

FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1 \
    HF_HUB_DISABLE_SYMLINKS_WARNING=1 \
    FASTEMBED_CACHE_PATH=/app/.fastembed

WORKDIR /app/backend

COPY backend/pyproject.toml backend/uv.lock ./
RUN pip install --no-cache-dir uv && \
    uv export --no-dev --no-emit-project -o requirements.txt && \
    pip install --no-cache-dir -r requirements.txt

COPY backend/app ./app
COPY backend/evals ./evals
COPY data/corpus /app/data/corpus
COPY data/raw /app/data/raw

# Downloads the BGE-small ONNX model and builds the Chroma index into the image.
RUN python -m app.ingestion index

EXPOSE 7860
CMD ["uvicorn", "app.api.main:app", "--host", "0.0.0.0", "--port", "7860"]

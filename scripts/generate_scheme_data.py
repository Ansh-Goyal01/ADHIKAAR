"""Generate web/lib/data/schemes.json from the committed corpus + rules repository.

The Explore pages are statically generated from this file so they stay fast and
readable even when the free-tier backend is cold. Re-run after any corpus or
rules change:  python -X utf8 scripts/generate_scheme_data.py
"""

import json
import re
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
CORPUS_DIR = ROOT / "data" / "corpus"
RULES_DIR = ROOT / "backend" / "app" / "rules" / "schemes"
OUT = ROOT / "web" / "lib" / "data" / "schemes.json"


def first_sentences(text: str, max_chars: int = 220) -> str:
    """A short, clean snippet for catalog cards."""
    flat = re.sub(r"\s+", " ", text or "").strip()
    if len(flat) <= max_chars:
        return flat
    cut = flat[:max_chars]
    last_stop = max(cut.rfind(". "), cut.rfind("! "), cut.rfind("? "))
    return cut[: last_stop + 1] if last_stop > 80 else cut.rsplit(" ", 1)[0] + "…"


def load_rules(scheme_id: str) -> list[dict]:
    path = RULES_DIR / f"{scheme_id}.yaml"
    if not path.exists():
        return []
    doc = yaml.safe_load(path.read_text(encoding="utf-8"))
    return [
        {
            "id": rule["id"],
            "kind": rule["kind"],
            "clause": re.sub(r"\s+", " ", rule["clause"]).strip(),
            "source_url": rule["source_url"],
        }
        for rule in doc.get("rules", [])
    ]


def main() -> None:
    schemes = []
    for path in sorted(CORPUS_DIR.glob("*.json")):
        doc = json.loads(path.read_text(encoding="utf-8"))
        sections = doc.get("sections", {})
        schemes.append(
            {
                "scheme_id": doc["scheme_id"],
                "short_name": doc["short_name"],
                "name": doc["name"],
                "category": doc["category"],
                "ministry": doc["ministry"],
                "page_url": doc["page_url"],
                "references": doc.get("references", []),
                "fetched_at": doc.get("fetched_at"),
                "benefit_snippet": first_sentences(sections.get("benefits", "")),
                "sections": {
                    key: sections[key]
                    for key in (
                        "details",
                        "benefits",
                        "eligibility",
                        "exclusions",
                        "application",
                        "documents",
                    )
                    if sections.get(key)
                },
                "rules": load_rules(doc["scheme_id"]),
            }
        )

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(
        json.dumps(schemes, ensure_ascii=False, indent=1) + "\n", encoding="utf-8"
    )
    print(f"{len(schemes)} schemes -> {OUT}")


if __name__ == "__main__":
    main()

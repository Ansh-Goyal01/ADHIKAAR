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

# Schemes deliberately outside Adhikaar's scope — the applicant is not an
# individual, so the eligibility check can never apply. Distinct from
# "coming soon" (a rules-pending state): this is a final, honest exclusion.
OUT_OF_SCOPE = {
    "hepsn": (
        "This grant is applied for by a college or institution, not by an "
        "individual — so a personal eligibility check doesn't apply."
    ),
}


def strip_markdown(text: str) -> str:
    """Corpus sections are markdown-ish; catalog snippets must be plain prose."""
    out = re.sub(r"^\s{0,3}#{1,6}\s*", "", text, flags=re.MULTILINE)  # headings
    out = re.sub(r"^\s{0,3}>\s?", "", out, flags=re.MULTILINE)  # blockquotes
    # list markers — bullets tolerate a missing space after the marker ("-Cashless…")
    out = re.sub(r"^\s*(?:[-*+]\s*|\d+\.\s+)", "", out, flags=re.MULTILINE)
    out = re.sub(r"\*\*([^*]+)\*\*", r"\1", out)  # bold
    out = re.sub(r"\*([^*]+)\*", r"\1", out)  # italics
    out = re.sub(r"`([^`]+)`", r"\1", out)  # code
    out = re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", out)  # links
    return out


def first_sentences(text: str, max_chars: int = 220) -> str:
    """A short, clean snippet for catalog cards."""
    flat = re.sub(r"\s+", " ", strip_markdown(text or "")).strip()
    # bullets glued to the previous sentence survive line-based stripping
    # ("…per year.- Comprehensive…") — a sentence break is what was meant
    flat = re.sub(r"\.\s*-\s+", ". ", flat)
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
                "out_of_scope": doc["scheme_id"] in OUT_OF_SCOPE,
                "out_of_scope_reason": OUT_OF_SCOPE.get(doc["scheme_id"], ""),
            }
        )

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(
        json.dumps(schemes, ensure_ascii=False, indent=1) + "\n", encoding="utf-8"
    )
    print(f"{len(schemes)} schemes -> {OUT}")


if __name__ == "__main__":
    main()

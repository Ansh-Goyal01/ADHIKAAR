"""Generate the per-rule human sign-off checklist in the Obsidian vault.

The vault page is a generated VIEW — the source of truth for verification state
is the `review_status` field on each rule in backend/app/rules/schemes/*.yaml
(encoded = machine-encoded + unit-tested; verified = human-certified against the
source clause). Re-run after any rule change:

    python -X utf8 scripts/generate_rule_signoff.py
"""

import json
from datetime import date
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
RULES_DIR = ROOT / "backend" / "app" / "rules" / "schemes"
CORPUS_DIR = ROOT / "data" / "corpus"
OUT = ROOT / "obsidian-vault" / "03-Rules-as-code" / "Rule-Sign-off-Checklist.md"

STATUS_LABEL = {"encoded": "☐ encoded — awaiting sign-off", "verified": "✅ verified"}


def condition_text(when: dict) -> str:
    if "any" in when and when["any"] is not None:
        return " OR ".join(condition_text(c) for c in when["any"])
    if "all" in when and when["all"] is not None:
        return " AND ".join(condition_text(c) for c in when["all"])
    op = {"eq": "=", "ne": "≠", "gt": ">", "gte": "≥", "lt": "<", "lte": "≤"}[when["op"]]
    return f"`{when['field']} {op} {when['value']}`"


def scheme_name(scheme_id: str) -> str:
    doc = json.loads((CORPUS_DIR / f"{scheme_id}.json").read_text(encoding="utf-8"))
    return doc.get("short_name") or doc.get("name") or scheme_id


def main() -> None:
    schemes = []
    for path in sorted(RULES_DIR.glob("*.yaml")):
        schemes.append(yaml.safe_load(path.read_text(encoding="utf-8")))

    total = sum(len(s["rules"]) for s in schemes)
    verified = sum(
        1 for s in schemes for r in s["rules"] if r.get("review_status") == "verified"
    )
    lines = [
        "---",
        "title: Rule-Sign-off-Checklist",
        "tags: [rules-as-code, checklist, generated]",
        f"updated: {date.today().isoformat()}",
        "---",
        "",
        "# Per-rule verification checklist",
        "",
        "> [!important] Generated file — do not edit here.",
        "> Source of truth is `review_status` on each rule in",
        "> `backend/app/rules/schemes/*.yaml`. To certify a rule, read the clause",
        "> beside the linked official source; then flip its `review_status` to",
        "> `verified` (or tell Claude to). Regenerate with",
        "> `python -X utf8 scripts/generate_rule_signoff.py`.",
        "",
        f"**Progress: {verified}/{total} rules verified.** "
        "A rule counts as *shipped-verified* only after human sign-off; until then "
        "the site's limitations page must say rules are machine-encoded and tested "
        "but pending certification.",
        "",
        "How to check one rule (~2 min): open the source URL, find the clause, "
        "confirm (1) the quoted clause matches the official text, (2) the encoded "
        "condition captures it — thresholds exact, direction right (require vs "
        "exclude), (3) facts the person can't reliably self-report are marked "
        "`self_declared`.",
        "",
    ]

    for scheme in schemes:
        sid = scheme["scheme_id"]
        simplifications = scheme.get("simplifications") or []
        lines += [
            f"## {scheme_name(sid)} (`{sid}`, rules v{scheme['version']})",
            "",
            "| # | rule | kind | encoded condition | official clause (as encoded) | status |",
            "|---|------|------|-------------------|------------------------------|--------|",
        ]
        for i, rule in enumerate(scheme["rules"], 1):
            clause = " ".join(rule["clause"].split())
            flags = " *(self-declared)*" if rule.get("self_declared") else ""
            status = STATUS_LABEL[rule.get("review_status", "encoded")]
            lines.append(
                f"| {i} | `{rule['id']}`{flags} | {rule['kind']} | "
                f"{condition_text(rule['when'])} | {clause} "
                f"([source]({rule['source_url']})) | {status} |"
            )
        lines.append("")
        if simplifications:
            lines.append("**Known simplifications (flagged for the signer):**")
            lines += [f"- ⚠️ {' '.join(s.split())}" for s in simplifications]
            lines.append("")

    lines += [
        "---",
        "Related: [[Verification-Sign-off]] (process) · [[Encoding-Notes]] · "
        "[[Scheme-Coverage]]",
        "",
    ]
    OUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"wrote {OUT} — {total} rules, {verified} verified, "
          f"{sum(len(s.get('simplifications') or []) for s in schemes)} simplifications flagged")


if __name__ == "__main__":
    main()

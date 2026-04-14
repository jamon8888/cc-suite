---
name: antislop-expert
description: "This skill should be used when the user asks to 'check for slop', 'audit this text', or 'remove AI language'."
---

# antislop-expert

Audit text for AI-generated language patterns ("slop"), hallucination markers, and stylometric tells. Produce a scored report with specific remediation suggestions.

## Workflow

1. **Input**: Accept text to audit (pasted, file path, or search `data/` for drafts).
2. **Lexical scan**: Check against slop lexicons (`references/lexicon_slop_en.md`, `references/lexicon_slop_fr.md`).
3. **Structural analysis**: Detect structural patterns per `references/structural_patterns_en.md` / `references/motifs_structurels_fr.md`.
4. **Stylometric check**: Apply stylometry rules from `references/stylometry_en.md` / `references/stylometrie_fr.md`.
5. **Hallucination flags**: Cross-reference claims against `references/allegations_hallucinations_en.md` / `references/allegations_hallucinations_fr.md`.
6. **Typography**: Verify typographic conventions per `references/typography_en.md` / `references/typographie_fr.md`.
7. **Score**: Compute an antislop score (0-100). Use `scripts/antislop_score.py` or `scripts/slop_pipeline.py` as reference for scoring logic.
8. **Remediate**: Apply remediation rules from `references/remediation_rules_en.md` / `references/regles_remediation_fr.md`.
9. **Report**: Output a structured audit report with per-section scores and specific fix suggestions.

## References

- `references/lexicon_slop_en.md` / `references/lexicon_slop_fr.md` -- Slop word/phrase lexicons
- `references/structural_patterns_en.md` / `references/motifs_structurels_fr.md` -- Structural pattern detectors
- `references/stylometry_en.md` / `references/stylometrie_fr.md` -- Stylometric analysis rules
- `references/allegations_hallucinations_en.md` / `references/allegations_hallucinations_fr.md` -- Hallucination markers
- `references/typography_en.md` / `references/typographie_fr.md` -- Typographic conventions
- `references/remediation_rules_en.md` / `references/regles_remediation_fr.md` -- Fix suggestions
- `scripts/antislop_score.py` -- Scoring script
- `scripts/slop_pipeline.py` -- Full pipeline script

## Triggers

- "check for slop"
- "audit this text"
- "remove AI language"
- "is this text AI-generated"
- "antislop check"
- "clean up AI writing"

## Source Credibility Check (Wiki Integration)

When the audited content cites wiki sources (references like `[source](wiki/...)` or claims marked with confidence levels):

1. **Check confidence levels**: For each cited wiki article, read its frontmatter `confidence` field.
   - `high` -> OK
   - `medium` -> Flag: "Source a confiance moyenne -- verifier avant publication."
   - `low` -> Flag: "Source a faible confiance -- rechercher des sources supplementaires."
   - Missing/no wiki -> Flag: "Affirmation sans source wiki. Ajouter via /sales:recherche."

2. **Check staleness**: Read the `updated` field in cited article frontmatter. If older than 90 days, flag: "Source datee de plus de 90 jours. Re-rechercher avec /sales:recherche."

3. **Report**: Add a "Credibilite des sources" section to the audit report with per-source confidence and freshness scores.

---
description: "Triple audit: slop + credibilite des sources + fraicheur."
argument-hint: "[paste text or file path]"
allowed-tools: Read, Write, Glob, Grep, Bash(ls:*), Bash(wc:*), Bash(date:*)
model: haiku
---

# /copywriter:verifier

The "Red Pen" for your content. Use this to sanitize AI-generated text or polish your own drafts.

## Your task

### Prelude: Resolve Wiki

1. **HUB**: Try `$HOME/wiki/_index.md`. If exists -> HUB = `$HOME/wiki`. Else read `~/.config/llm-wiki/config.json` and use `resolved_path`. If no config -> HUB = `$HOME/wiki`.
2. **Wiki**: `--wiki <name>` -> lookup `HUB/wikis.json` | cwd has `.wiki/` -> use it | else -> HUB.
3. **Verify**: If wiki missing, proceed with Audit 1 only.

## Usage

```bash
/copywriter:verifier "Here is some text I wrote..."
/copywriter:verifier data/drafts/my-post.md
```

## Workflow

### Audit 1: Slop Detection

1. **Reads** the input text.
2. **Loads** `${CLAUDE_PLUGIN_ROOT}/data/voice-dna.json` (to compare against your baseline).
3. **Triggers** the `antislop-expert` skill.
4. **Outputs** the "Slop Report":
    - Slop Score (0-100)
    - Hall of Shame (List of worst words used)
    - Assessing "Humanity" (Texture check)
5. **Offers** a Rewrite (Version A: Polish / Version B: Radical Humanization).

### Audit 2: Source Credibility

If wiki exists and the audited content cites wiki sources:
1. For each citation, read the wiki article's frontmatter `confidence` field
2. `high` -> OK
3. `medium` -> Flag: "Source a confiance moyenne -- verifier avant publication."
4. `low` -> Flag: "Source a faible confiance -- rechercher des sources supplementaires."
5. No wiki source -> Flag: "Affirmation sans source wiki. Ajouter via /copywriter:apprendre."

### Audit 3: Staleness

For each cited wiki article:
1. Read `updated` field from frontmatter
2. If older than 90 days: Flag: "Source datee de plus de 90 jours. Re-rechercher avec /copywriter:recherche."

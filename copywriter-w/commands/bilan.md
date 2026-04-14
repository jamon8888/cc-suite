---
description: "Bilan: etat de ta base de connaissances et statistiques de contenu."
argument-hint: "[--detailed]"
allowed-tools: Read, Glob, Grep, Bash(ls:*), Bash(wc:*), Bash(date:*)
---

## Your task

### Prelude: Resolve Wiki

1. **HUB**: Try `$HOME/wiki/_index.md`. If exists -> HUB = `$HOME/wiki`. Else read `~/.config/llm-wiki/config.json` and use `resolved_path`. If no config -> HUB = `$HOME/wiki`.
2. **Wiki**: `--wiki <name>` -> lookup `HUB/wikis.json` | cwd has `.wiki/` -> use it | else -> HUB.
3. **Verify**: Read `<wiki-root>/_index.md`. If missing -> "Pas de wiki. Lance /copywriter:recherche ou /copywriter:apprendre pour commencer."

### Show Status

1. **Wiki stats**: Read master `_index.md`. Show: source count, article count, output count, last compiled, last lint date.

2. **Content stats**: Count files in `output/` by date prefix for current month. Report: pieces written this month, formats used.

3. **Recent activity**: Read `log.md`, show last 10 entries.

4. **Identity status**: Check if `${CLAUDE_PLUGIN_ROOT}/data/voice-dna.json` is populated.
   - If empty: "Profil non configure. Lance /copywriter:start."
   - If populated: Show voice DNA summary (primary_role, unique_angle).

5. **Suggestions**: Based on state:
   - If 5+ uncompiled sources: "Tu as N sources non compilees."
   - If no recent research (>30 days): "Pas de recherche recente. /copywriter:recherche pour rafraichir ta base."
   - If content calendar missing or expired: "/copywriter:calendrier pour planifier le mois."

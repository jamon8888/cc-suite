---
description: "Calendrier de contenu strategique fonde sur ta base wiki."
argument-hint: "[month] [focus topic]"
allowed-tools: Read, Write, Glob, Bash(ls:*), Bash(wc:*), Bash(date:*), Bash(mkdir:*)
model: sonnet
---

# /copywriter:calendrier

Stop posting randomly. Build a cohesive narrative strategy.

## Your task

### Prelude: Resolve Wiki

1. **HUB**: Try `$HOME/wiki/_index.md`. If exists -> HUB = `$HOME/wiki`. Else read `~/.config/llm-wiki/config.json` and use `resolved_path`. If no config -> HUB = `$HOME/wiki`.
2. **Wiki**: `--wiki <name>` -> lookup `HUB/wikis.json` | cwd has `.wiki/` -> use it | else -> HUB.
3. **Verify**: If wiki missing, proceed but warn: "Calendrier sans base de connaissances -- les angles ne sont pas valides par des sources."

## Usage

```bash
/copywriter:calendrier "March" "Launch of Course"
/copywriter:calendrier "Next Week" "Authority Building"
```

## Workflow

### Step 1: Load Strategic Context

1. **Triggers** `content-calendar-planner`.
2. **Reads** `${CLAUDE_PLUGIN_ROOT}/data/business-profile.json` (to align with offers).
3. **Generates** the "Waterfall Strategy":
    - 1x Hero Asset (Blog/Newsletter).
    - 3x Social Splinters (LinkedIn/Twitter).
    - 1x Personal Story.
4. **Outputs** a Markdown Table Grid + Task List.

### Wiki Confidence Grounding

If wiki exists:
1. Read `<wiki-root>/_index.md` and `wiki/_index.md` for article list
2. For each planned topic, check if a wiki article covers it
3. High-confidence articles -> Hero slots (strong foundation)
4. Low-confidence articles -> warn: "Pas assez de sources sur X. /copywriter:recherche d'abord ?"
5. No wiki coverage -> suggest: "Aucun article wiki sur X. Lancer une recherche ?"

### Save Output

Save calendar to `<wiki-root>/output/calendar-YYYY-MM.md`

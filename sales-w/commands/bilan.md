---
description: "Bilan: etat de ta base sales-wiki, pipeline et fraicheur des entites."
argument-hint: "[--detailed]"
allowed-tools: Read, Glob, Grep, Bash(ls:*), Bash(wc:*), Bash(date:*)
---

## Your task

### Prelude: Resolve Wiki

1. **HUB**: Try `$HOME/sales-wiki/_index.md`. If exists -> HUB = `$HOME/sales-wiki`. Else read `~/.config/llm-sales-wiki/config.json` and use `resolved_path`. If no config -> HUB = `$HOME/sales-wiki`.
2. **Wiki**: `--wiki <name>` -> lookup `HUB/wikis.json` | cwd has `.wiki/` -> use it | else -> HUB.
3. **Verify**: Read `<wiki-root>/_index.md`. If missing -> "Pas de wiki. Lance /sales:recherche ou /sales:demarrer."

### Show Status

1. **Wiki stats**: Read master `_index.md`. Show: source count, article count, output count, last compiled, last lint.

2. **Entity freshness report**: Grep all wiki articles for `entity_type:` in frontmatter. For each entity article, check `last_verified` against `freshness_threshold`. Report stale entities with days-since-update.

3. **Pipeline summary** (if deal projects exist): Count `output/projects/*/WHY.md`. For each active deal project, show: deal name, last activity date, file count.

4. **Recent activity**: Read `log.md`, last 10 entries.

5. **Identity status**: Check `${CLAUDE_PLUGIN_ROOT}/data/sales-profile.json`. If empty: "Profil non configure. Lance /sales:demarrer."

6. **Suggestions**:
   - Stale entities: "N entites obsoletes. /sales:recherche pour rafraichir."
   - Uncompiled sources: "N sources non compilees."
   - No recent research: "/sales:recherche pour alimenter ta base."

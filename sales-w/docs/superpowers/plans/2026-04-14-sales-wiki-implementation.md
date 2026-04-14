# Sales Wiki — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Cowork plugin that fuses llm-wiki's knowledge base pipeline with the sales plugin's 27 skills, 8 agents, and 9 MCP connectors, producing an evidence-based sales OS with entity freshness tracking and deal-as-project mapping.

**Architecture:** Dual-Core — JSON identity files in `data/` for fast session loading, wiki knowledge base at `~/sales-wiki/` for persistent research on accounts, competitors, and markets. Commands orchestrate context assembly (identity + wiki + CRM signals via MCP), agents receive self-contained briefs. Entity freshness system flags stale account/competitor articles.

**Tech Stack:** Markdown files (skills, commands, agents), JSON (plugin manifest, identity files, hooks, MCP config), Python (antislop scoring scripts). No build step. Cowork plugin conventions.

**Source plugins:**
- llm-wiki (optimized): `D:/telechargements/llm-wiki/`
- sales v3.0: `/tmp/sales/sales/`
- Proven pattern reference: `D:/telechargements/copywriter-wiki/`
- Scaffold: `D:/telechargements/sales-wiki/`

**Key difference from copywriter-wiki build:**
- Hub at `~/sales-wiki/` (not `~/wiki/`)
- 31 skills (vs 22), 13 commands (vs 9), 8 agents (vs 7), 9 MCP servers (vs 1)
- Entity freshness system (account/prospect/competitor staleness tracking)
- Deal-as-project mapping (active deals = wiki projects)
- `para-organizer` and `wiki-inbox` skills NOT ported

---

## File Map

### Files to create (new)

| File | Notes |
|------|-------|
| `.claude-plugin/plugin.json` | name: "sales" |
| `.mcp.json` | 9 HTTP MCP servers |
| `hooks/hooks.json` | SessionStart only |
| `data/sales-profile.json` | From sales `data/2-Domaines/` |
| `data/icp.json` | From sales `data/2-Domaines/` |
| `data/voice-dna.json` | From sales `data/2-Domaines/` |
| `data/LinkedIn/activity_log.md` | From sales `data/2-Domaines/LinkedIn/` |
| `data/LinkedIn/prospects.md` | From sales `data/2-Domaines/LinkedIn/` |
| `commands/sales.md` | NEW: natural language router |
| `commands/bilan.md` | NEW: wiki + pipeline status |
| `commands/demarrer.md` | Adapted from sales `start.md` |
| `commands/prospecter.md` | Adapted from sales `prospect.md` |
| `commands/recherche.md` | Adapted from llm-wiki `research.md` |
| `commands/pipeline.md` | Adapted from sales (merges pipeline + pipeline-review) |
| `commands/preparer.md` | Adapted from sales (merges call-summary + engage) |
| `commands/creer.md` | Adapted from sales `create.md` |
| `commands/negocier.md` | Adapted from sales `negotiate.md` |
| `commands/coacher.md` | Adapted from sales `coach.md` |
| `commands/linkedin.md` | Adapted from sales `linkedin.md` |
| `commands/prevoir.md` | Adapted from sales `forecast.md` |
| `commands/analyser.md` | Adapted from sales `win-loss.md` |
| `LICENSE` | MIT |
| `README.md` | French |
| `CONNECTORS.md` | 9 MCP + degradation |

### Files to copy verbatim from llm-wiki

| Destination | Source |
|-------------|--------|
| `skills/wiki-core/references/ingestion.md` | llm-wiki `references/ingestion.md` |
| `skills/wiki-core/references/indexing.md` | llm-wiki `references/indexing.md` |
| `skills/wiki-core/references/linting.md` | llm-wiki `references/linting.md` |

### Files to copy then modify from llm-wiki

| Destination | Source | Modification |
|-------------|--------|-------------|
| `skills/wiki-core/SKILL.md` | llm-wiki `wiki-manager/SKILL.md` | Rename to wiki-core, hub default `~/sales-wiki/` |
| `skills/wiki-core/references/hub-resolution.md` | llm-wiki | Default path `~/sales-wiki/`, config at `~/.config/llm-sales-wiki/` |
| `skills/wiki-core/references/wiki-structure.md` | llm-wiki | Add `entity_type` and `freshness_threshold` to article frontmatter |
| `skills/wiki-core/references/compilation.md` | llm-wiki | Add `entity_type`, `freshness_threshold`, `sales_angles` |
| `skills/wiki-core/references/thesis-mode.md` | llm-wiki | Add ICP sales-weighted evidence |
| `skills/wiki-reader/SKILL.md` | llm-wiki | Hub default `~/sales-wiki/` |
| `skills/wiki-writer/SKILL.md` | llm-wiki | Hub default `~/sales-wiki/` |
| `skills/wiki-research/SKILL.md` | llm-wiki | Hub default `~/sales-wiki/` |

### Files to copy from sales (27 skills - 1 dropped = 26, + references/templates)

All skills from `/tmp/sales/sales/skills/` EXCEPT `para-organizer/` (dropped per spec).

Each copied skill needs: `data/2-Domaines/` -> `data/`, Solo/Sentinel removal.

### Files to copy from sales (8 agents)

All agents from `/tmp/sales/sales/agents/`. Each needs path fixes + `disallowedTools: Edit`.

---

## Task Sequence

---

### Task 1: Plugin Foundation

**Files:**
- Create: `.claude-plugin/plugin.json`
- Create: `.mcp.json`
- Create: `hooks/hooks.json`
- Copy: `data/sales-profile.json`, `data/icp.json`, `data/voice-dna.json`, `data/LinkedIn/*`
- Create: `LICENSE`

- [ ] **Step 1: Create plugin.json**

Write to `D:/telechargements/sales-wiki/.claude-plugin/plugin.json`:

```json
{
  "name": "sales",
  "version": "1.0.0",
  "description": "Evidence-based sales OS. Wiki-backed competitive intel, account research, win/loss patterns, deal preparation. All grounded in cited, confidence-scored sources with entity freshness tracking.",
  "author": { "name": "NMarchitecte" },
  "license": "MIT",
  "keywords": ["sales", "crm", "pipeline", "wiki", "competitive-intelligence", "prospecting", "linkedin", "deal-coaching", "evidence-based"],
  "userConfig": {
    "exa_api_key": {
      "description": "Exa API key for neural search (optional, falls back to WebSearch)",
      "sensitive": true
    }
  }
}
```

Create parent directory first: `mkdir -p D:/telechargements/sales-wiki/.claude-plugin`

- [ ] **Step 2: Create .mcp.json**

Write to `D:/telechargements/sales-wiki/.mcp.json`:

```json
{
  "mcpServers": {
    "slack":      { "type": "http", "url": "https://mcp.slack.com/mcp" },
    "hubspot":    { "type": "http", "url": "https://mcp.hubspot.com/anthropic" },
    "close":      { "type": "http", "url": "https://mcp.close.com/mcp" },
    "clay":       { "type": "http", "url": "https://api.clay.com/v3/mcp" },
    "zoominfo":   { "type": "http", "url": "https://mcp.zoominfo.com/mcp" },
    "notion":     { "type": "http", "url": "https://mcp.notion.com/mcp" },
    "atlassian":  { "type": "http", "url": "https://mcp.atlassian.com/v1/mcp" },
    "fireflies":  { "type": "http", "url": "https://api.fireflies.ai/mcp" },
    "ms365":      { "type": "http", "url": "https://microsoft365.mcp.claude.com/mcp" }
  }
}
```

- [ ] **Step 3: Create hooks/hooks.json**

```bash
mkdir -p D:/telechargements/sales-wiki/hooks
```

Write to `D:/telechargements/sales-wiki/hooks/hooks.json`:

```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [{
          "type": "prompt",
          "prompt": "Read ${CLAUDE_PLUGIN_ROOT}/data/sales-profile.json if it exists. Use language_preference to set output language. If language_preference is missing or file is empty, default to French and suggest /sales:demarrer.",
          "timeout": 30
        }]
      }
    ]
  }
}
```

- [ ] **Step 4: Copy identity data from sales**

```bash
mkdir -p D:/telechargements/sales-wiki/data/LinkedIn
cp /tmp/sales/sales/data/2-Domaines/sales-profile.json D:/telechargements/sales-wiki/data/
cp /tmp/sales/sales/data/2-Domaines/icp.json D:/telechargements/sales-wiki/data/
cp /tmp/sales/sales/data/2-Domaines/voice-dna.json D:/telechargements/sales-wiki/data/
cp /tmp/sales/sales/data/2-Domaines/LinkedIn/activity_log.md D:/telechargements/sales-wiki/data/LinkedIn/
cp /tmp/sales/sales/data/2-Domaines/LinkedIn/prospects.md D:/telechargements/sales-wiki/data/LinkedIn/
```

- [ ] **Step 5: Create LICENSE**

Write MIT license to `D:/telechargements/sales-wiki/LICENSE` with author "NMarchitecte", year 2026.

- [ ] **Step 6: Verify**

```bash
find D:/telechargements/sales-wiki -type f | sort
```

Expected: plugin.json, .mcp.json, hooks.json, 5 data files, LICENSE, spec doc, plan doc.

---

### Task 2: Wiki Skills Layer (port from llm-wiki)

**Files:**
- Create: `skills/wiki-core/SKILL.md` + 7 references
- Copy: `skills/wiki-reader/SKILL.md`, `skills/wiki-writer/SKILL.md`, `skills/wiki-research/SKILL.md`

- [ ] **Step 1: Create directories and copy references**

```bash
mkdir -p D:/telechargements/sales-wiki/skills/wiki-core/references
mkdir -p D:/telechargements/sales-wiki/skills/wiki-reader
mkdir -p D:/telechargements/sales-wiki/skills/wiki-writer
mkdir -p D:/telechargements/sales-wiki/skills/wiki-research

# Verbatim copies (3 files)
cp D:/telechargements/llm-wiki/skills/wiki-manager/references/ingestion.md D:/telechargements/sales-wiki/skills/wiki-core/references/
cp D:/telechargements/llm-wiki/skills/wiki-manager/references/indexing.md D:/telechargements/sales-wiki/skills/wiki-core/references/
cp D:/telechargements/llm-wiki/skills/wiki-manager/references/linting.md D:/telechargements/sales-wiki/skills/wiki-core/references/

# To-be-modified copies (4 files)
cp D:/telechargements/llm-wiki/skills/wiki-manager/references/hub-resolution.md D:/telechargements/sales-wiki/skills/wiki-core/references/
cp D:/telechargements/llm-wiki/skills/wiki-manager/references/wiki-structure.md D:/telechargements/sales-wiki/skills/wiki-core/references/
cp D:/telechargements/llm-wiki/skills/wiki-manager/references/compilation.md D:/telechargements/sales-wiki/skills/wiki-core/references/
cp D:/telechargements/llm-wiki/skills/wiki-manager/references/thesis-mode.md D:/telechargements/sales-wiki/skills/wiki-core/references/
```

- [ ] **Step 2: Create wiki-core/SKILL.md**

Copy `D:/telechargements/llm-wiki/skills/wiki-manager/SKILL.md` to `D:/telechargements/sales-wiki/skills/wiki-core/SKILL.md`. Then edit:
- `name: wiki-manager` -> `name: wiki-core`
- Update description to "Sales plugin's knowledge base core"
- Change hub default from `~/wiki/` to `~/sales-wiki/` in the Hub Path section
- Change config path from `~/.config/llm-wiki/` to `~/.config/llm-sales-wiki/`

- [ ] **Step 3: Copy wiki-reader, wiki-writer, wiki-research**

```bash
cp D:/telechargements/llm-wiki/skills/wiki-reader/SKILL.md D:/telechargements/sales-wiki/skills/wiki-reader/
cp D:/telechargements/llm-wiki/skills/wiki-writer/SKILL.md D:/telechargements/sales-wiki/skills/wiki-writer/
cp D:/telechargements/llm-wiki/skills/wiki-research/SKILL.md D:/telechargements/sales-wiki/skills/wiki-research/
```

- [ ] **Step 4: Update hub defaults in all 4 wiki skills**

In each of the 4 SKILL.md files (wiki-core, wiki-reader, wiki-writer, wiki-research):
- Replace `~/wiki/` with `~/sales-wiki/` everywhere
- Replace `$HOME/wiki` with `$HOME/sales-wiki` everywhere
- Replace `wiki-manager` with `wiki-core` in any reference paths
- Replace `~/.config/llm-wiki/` with `~/.config/llm-sales-wiki/`

- [ ] **Step 5: Modify hub-resolution.md**

In `D:/telechargements/sales-wiki/skills/wiki-core/references/hub-resolution.md`:
- Replace all `~/wiki/` with `~/sales-wiki/`
- Replace `~/.config/llm-wiki/config.json` with `~/.config/llm-sales-wiki/config.json`
- Replace `$HOME/wiki` with `$HOME/sales-wiki`

- [ ] **Step 6: Modify wiki-structure.md — add entity frontmatter**

Read `D:/telechargements/sales-wiki/skills/wiki-core/references/wiki-structure.md`. In the Wiki Article Format section, add to the frontmatter schema:

```yaml
entity_type: account|prospect|competitor|market    # optional, for sales entities
freshness_threshold: 30                             # days before flagged stale
last_verified: YYYY-MM-DD                           # last human confirmation
```

Add a paragraph: "Sales wiki articles about accounts, prospects, and competitors include entity metadata. Default freshness thresholds: competitor=30d, prospect=45d, account=60d, market=90d. The daily briefing and call prep commands check these thresholds."

- [ ] **Step 7: Modify compilation.md — add entity fields + sales angles**

Read `D:/telechargements/sales-wiki/skills/wiki-core/references/compilation.md`. Add to article frontmatter schema: `entity_type`, `freshness_threshold`, `last_verified`, `sales_angles`. Add paragraph: "During compilation, if the source relates to an identifiable company/market, set `entity_type` and appropriate `freshness_threshold`. Generate 2-4 `sales_angles` per article: objection opportunities, pain point alignments, competitive advantages. Format: 'Objection contre ConcurrentX sur le prix', 'Point douleur: migration complexe'."

- [ ] **Step 8: Modify thesis-mode.md — add ICP sales weighting**

Add to Phase 2: "When ICP and sales-profile data are available, weight evidence by sales relevance. Sources addressing `icp.pain_points` or `sales_profile.competitive_advantages` score +1 relevance."

- [ ] **Step 9: Verify**

```bash
find D:/telechargements/sales-wiki/skills/wiki-* -type f | sort
```

Expected: 4 SKILL.md + 7 references = 11 files.

---

### Task 3: Identity Skills (port from sales)

**Files:**
- Copy: `skills/voice-dna-creator/`, `skills/icp-creator/` (with refs), `skills/antislop-expert/` (with refs + scripts)

- [ ] **Step 1: Copy identity + antislop skills**

```bash
# Voice DNA (with references)
mkdir -p D:/telechargements/sales-wiki/skills/voice-dna-creator/references
cp /tmp/sales/sales/skills/voice-dna-creator/SKILL.md D:/telechargements/sales-wiki/skills/voice-dna-creator/
cp /tmp/sales/sales/skills/voice-dna-creator/references/*.md D:/telechargements/sales-wiki/skills/voice-dna-creator/references/

# ICP (with references)
mkdir -p D:/telechargements/sales-wiki/skills/icp-creator/references
cp /tmp/sales/sales/skills/icp-creator/SKILL.md D:/telechargements/sales-wiki/skills/icp-creator/
cp /tmp/sales/sales/skills/icp-creator/references/* D:/telechargements/sales-wiki/skills/icp-creator/references/

# Antislop (with references + scripts)
mkdir -p D:/telechargements/sales-wiki/skills/antislop-expert/references
mkdir -p D:/telechargements/sales-wiki/skills/antislop-expert/scripts
cp /tmp/sales/sales/skills/antislop-expert/SKILL.md D:/telechargements/sales-wiki/skills/antislop-expert/
cp /tmp/sales/sales/skills/antislop-expert/references/*.md D:/telechargements/sales-wiki/skills/antislop-expert/references/
cp /tmp/sales/sales/skills/antislop-expert/scripts/*.py D:/telechargements/sales-wiki/skills/antislop-expert/scripts/
```

- [ ] **Step 2: Update data paths in all copied skills**

For every SKILL.md in voice-dna-creator, icp-creator, antislop-expert:
- Replace `data/2-Domaines/` with `data/`
- Replace `data/2-Areas/` with `data/`
- Remove Solo/Sentinel references

```bash
grep -rl "2-Domaines\|2-Areas\|SOLO_ROOT\|solo_installed\|SENTINEL" D:/telechargements/sales-wiki/skills/voice-dna-creator/ D:/telechargements/sales-wiki/skills/icp-creator/ D:/telechargements/sales-wiki/skills/antislop-expert/ 2>/dev/null
```

Fix each match.

- [ ] **Step 3: Add source credibility to antislop SKILL.md**

Append the source credibility section (same as copywriter-wiki Task 4 Step 3):
- Confidence level check (high/medium/low/missing)
- Staleness check (>90 days)
- French messaging

- [ ] **Step 4: Verify**

```bash
find D:/telechargements/sales-wiki/skills/voice-dna-creator D:/telechargements/sales-wiki/skills/icp-creator D:/telechargements/sales-wiki/skills/antislop-expert -type f | wc -l
```

Expected: 3 SKILL.md + 2 voice-dna refs + 5 icp refs + 12 antislop refs + 2 scripts = 24 files.

---

### Task 4: Prospecting Skills (port from sales)

**Files:**
- Copy: `account-research/`, `competitive-intelligence/`, `exa-search-expert/`, `linkedin-prospector/`, `outbound-sequence/`

- [ ] **Step 1: Copy all prospecting skills**

```bash
for skill in account-research competitive-intelligence exa-search-expert linkedin-prospector outbound-sequence; do
  mkdir -p "D:/telechargements/sales-wiki/skills/$skill"
  cp -r "/tmp/sales/sales/skills/$skill/"* "D:/telechargements/sales-wiki/skills/$skill/"
done
```

- [ ] **Step 2: Update data paths and remove Solo/Sentinel**

```bash
grep -rl "2-Domaines\|2-Areas\|SOLO_ROOT\|solo_installed\|SENTINEL\|../solo/" D:/telechargements/sales-wiki/skills/account-research/ D:/telechargements/sales-wiki/skills/competitive-intelligence/ D:/telechargements/sales-wiki/skills/exa-search-expert/ D:/telechargements/sales-wiki/skills/linkedin-prospector/ D:/telechargements/sales-wiki/skills/outbound-sequence/ 2>/dev/null
```

For each match: `data/2-Domaines/` -> `data/`, remove Solo blocks.

- [ ] **Step 3: Verify**

```bash
find D:/telechargements/sales-wiki/skills/account-research D:/telechargements/sales-wiki/skills/competitive-intelligence D:/telechargements/sales-wiki/skills/exa-search-expert D:/telechargements/sales-wiki/skills/linkedin-prospector D:/telechargements/sales-wiki/skills/outbound-sequence -type f | wc -l
```

Expected: 13 files (1+2+5+1+4).

---

### Task 5: Pipeline Ops + Deal Execution + Deal Strategy Skills (port from sales)

**Files:**
- Copy: 13 skills (client-management, daily-briefing, hubspot-sync, territory-planner, call-prep, create-an-asset, discovery-interview-prep, proposal-builder, rfp-shredder, champion-builder, negotiation-advisor, objection-library, qbr-builder)

- [ ] **Step 1: Copy all 13 skills**

```bash
for skill in client-management daily-briefing hubspot-sync territory-planner call-prep create-an-asset discovery-interview-prep proposal-builder rfp-shredder champion-builder negotiation-advisor objection-library qbr-builder; do
  mkdir -p "D:/telechargements/sales-wiki/skills/$skill"
  cp -r "/tmp/sales/sales/skills/$skill/"* "D:/telechargements/sales-wiki/skills/$skill/"
done
```

- [ ] **Step 2: Update data paths and remove Solo/Sentinel in all 13 skills**

```bash
grep -rl "2-Domaines\|2-Areas\|SOLO_ROOT\|solo_installed\|SENTINEL\|../solo/" D:/telechargements/sales-wiki/skills/client-management/ D:/telechargements/sales-wiki/skills/daily-briefing/ D:/telechargements/sales-wiki/skills/hubspot-sync/ D:/telechargements/sales-wiki/skills/territory-planner/ D:/telechargements/sales-wiki/skills/call-prep/ D:/telechargements/sales-wiki/skills/create-an-asset/ D:/telechargements/sales-wiki/skills/discovery-interview-prep/ D:/telechargements/sales-wiki/skills/proposal-builder/ D:/telechargements/sales-wiki/skills/rfp-shredder/ D:/telechargements/sales-wiki/skills/champion-builder/ D:/telechargements/sales-wiki/skills/negotiation-advisor/ D:/telechargements/sales-wiki/skills/objection-library/ D:/telechargements/sales-wiki/skills/qbr-builder/ 2>/dev/null
```

Fix each match: `data/2-Domaines/` -> `data/`, remove Solo/Sentinel blocks.

- [ ] **Step 3: Verify**

```bash
find D:/telechargements/sales-wiki/skills/client-management D:/telechargements/sales-wiki/skills/daily-briefing D:/telechargements/sales-wiki/skills/hubspot-sync D:/telechargements/sales-wiki/skills/territory-planner D:/telechargements/sales-wiki/skills/call-prep D:/telechargements/sales-wiki/skills/create-an-asset D:/telechargements/sales-wiki/skills/discovery-interview-prep D:/telechargements/sales-wiki/skills/proposal-builder D:/telechargements/sales-wiki/skills/rfp-shredder D:/telechargements/sales-wiki/skills/champion-builder D:/telechargements/sales-wiki/skills/negotiation-advisor D:/telechargements/sales-wiki/skills/objection-library D:/telechargements/sales-wiki/skills/qbr-builder -type f | wc -l
```

Expected: ~38 files (13 SKILL.md + ~25 references/templates).

---

### Task 6: LinkedIn + Coaching Skills (port from sales)

**Files:**
- Copy: `linkedin-creator/`, `linkedin-engager/`, `linkedin-orchestrator/`, `email-coach/`, `win-loss-analyzer/`

- [ ] **Step 1: Copy all 5 skills**

```bash
for skill in linkedin-creator linkedin-engager linkedin-orchestrator email-coach win-loss-analyzer; do
  mkdir -p "D:/telechargements/sales-wiki/skills/$skill"
  cp -r "/tmp/sales/sales/skills/$skill/"* "D:/telechargements/sales-wiki/skills/$skill/"
done
```

- [ ] **Step 2: Update data paths and remove Solo/Sentinel**

```bash
grep -rl "2-Domaines\|2-Areas\|SOLO_ROOT\|solo_installed\|SENTINEL\|../solo/" D:/telechargements/sales-wiki/skills/linkedin-creator/ D:/telechargements/sales-wiki/skills/linkedin-engager/ D:/telechargements/sales-wiki/skills/linkedin-orchestrator/ D:/telechargements/sales-wiki/skills/email-coach/ D:/telechargements/sales-wiki/skills/win-loss-analyzer/ 2>/dev/null
```

Fix each match.

- [ ] **Step 3: Verify**

```bash
find D:/telechargements/sales-wiki/skills/linkedin-creator D:/telechargements/sales-wiki/skills/linkedin-engager D:/telechargements/sales-wiki/skills/linkedin-orchestrator D:/telechargements/sales-wiki/skills/email-coach D:/telechargements/sales-wiki/skills/win-loss-analyzer -type f | wc -l
```

Expected: ~19 files (5 SKILL.md + ~14 references).

---

### Task 7: Agents (port from sales)

**Files:**
- Copy: 8 agent files

- [ ] **Step 1: Copy all agents**

```bash
mkdir -p D:/telechargements/sales-wiki/agents
cp /tmp/sales/sales/agents/*.md D:/telechargements/sales-wiki/agents/
```

- [ ] **Step 2: Update each agent**

For each of the 8 agent files:
1. Replace `data/2-Domaines/` with `data/` and `data/2-Areas/` with `data/`
2. Remove Solo/Sentinel references and conditional blocks
3. Ensure `model: sonnet` in frontmatter
4. Ensure `disallowedTools: Edit` in frontmatter

- [ ] **Step 3: Verify**

```bash
ls D:/telechargements/sales-wiki/agents/
grep -r "2-Domaines\|SOLO_ROOT\|SENTINEL" D:/telechargements/sales-wiki/agents/ 2>/dev/null
```

Expected: 8 files, zero stale references.

---

### Task 8: Commands — Wiki Operations (3 commands)

**Files:**
- Create: `commands/recherche.md` (from llm-wiki research.md)
- Create: `commands/bilan.md` (new)
- Router and other commands in Task 9

- [ ] **Step 1: Create recherche.md**

Copy `D:/telechargements/llm-wiki/commands/research.md` to `D:/telechargements/sales-wiki/commands/recherche.md`.

Then edit:
- Frontmatter description: "Recherche approfondie multi-agents. Persiste dans ta base sales-wiki. Mode these pour valider des hypotheses sales."
- Replace ALL `${CLAUDE_PLUGIN_ROOT}/skills/wiki-manager/references/` with `${CLAUDE_PLUGIN_ROOT}/skills/wiki-core/references/`
- Replace `~/wiki/` with `~/sales-wiki/` and `$HOME/wiki` with `$HOME/sales-wiki`
- Replace `~/.config/llm-wiki/` with `~/.config/llm-sales-wiki/`
- Add ICP + sales-profile injection before Phase 2: "Read `${CLAUDE_PLUGIN_ROOT}/data/icp.json` and `${CLAUDE_PLUGIN_ROOT}/data/sales-profile.json`. Include icp.pain_points and sales_profile.competitive_advantages in agent prompts."
- Add to agent prompt template: `**Audience**: Search for content relevant to sales audience: {icp.pain_points}. Prioritize practitioner and CRM sources.`
- In Phase 4 (Compile): "Set entity_type and freshness_threshold for compiled articles about identifiable entities. Generate 2-4 sales_angles per article."
- Phase 5 suggestions in French: "Prochaine etape: /sales:preparer ou /sales:creer"

- [ ] **Step 2: Create bilan.md**

Write to `D:/telechargements/sales-wiki/commands/bilan.md`:

```markdown
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
```

- [ ] **Step 3: Verify**

```bash
ls D:/telechargements/sales-wiki/commands/
```

Expected: recherche.md, bilan.md.

---

### Task 9: Commands — Sales Operations (11 commands)

**Files:**
- Create: `commands/sales.md` (router), `commands/demarrer.md`, `commands/prospecter.md`, `commands/pipeline.md`, `commands/preparer.md`, `commands/creer.md`, `commands/negocier.md`, `commands/coacher.md`, `commands/linkedin.md`, `commands/prevoir.md`, `commands/analyser.md`

- [ ] **Step 1: Create sales.md (router)**

Write to `D:/telechargements/sales-wiki/commands/sales.md`. Natural language router following the spec Section 5 pattern. Include:
- Frontmatter: description "Sales OS — comprend le langage naturel", argument-hint "[<texte libre>] [status]"
- Inline wiki prelude with `~/sales-wiki/` as default
- Pattern matching table from spec (account name -> preparer, URL -> recherche, pipeline/deals -> pipeline, etc.)
- Confidence routing (high/low)
- Empty args -> show status + available commands list in French

- [ ] **Step 2: Create demarrer.md**

Copy `/tmp/sales/sales/commands/start.md` to `D:/telechargements/sales-wiki/commands/demarrer.md`. Edit:
- French description: "Initialiser le plugin Sales: profil vendeur, ICP, Voice DNA et base wiki."
- Add `argument-hint: "[--update voice|icp|sales-profile]"`
- Replace `data/2-Domaines/` with `data/`, remove Solo/Sentinel
- Add Phase 2 (Wiki Init): create `~/sales-wiki/topics/<niche>/` using wiki-structure.md protocol
- Add Phase 3 (Bootstrap): "Veux-tu que je recherche tes principaux concurrents ? (5 min)"
- Add profile versioning: backup to `data/sales-profile.previous.json` before overwrite
- Add --update flag support

- [ ] **Step 3: Create preparer.md (key fusion command)**

Write from scratch to `D:/telechargements/sales-wiki/commands/preparer.md`. This is the main fusion point. Include:
- Frontmatter: "Preparer un appel/meeting fonde sur ta base wiki + signaux CRM."
- Allowed-tools: Read, Write, Glob, Grep, Agent, WebSearch, WebFetch
- Inline wiki prelude (`~/sales-wiki/`)
- Identity check (sales-profile.json)
- 7-step orchestrator-injects flow:
  1. Read identity (sales-profile + ICP + voice-dna)
  2. Query wiki: Grep articles with entity_type matching the account
  3. Check freshness: flag stale articles
  4. Pull CRM signals (HubSpot/Close deals, Slack threads, Fireflies transcripts -- graceful if MCP absent)
  5. Assemble brief (identity + wiki + CRM)
  6. Dispatch prep-master-agent
  7. Save to `output/projects/<deal>/call-prep-YYYY-MM-DD.md`
- No-wiki fallback: proceed with CRM-only, suggest /sales:recherche

- [ ] **Step 4: Create prospecter.md**

Copy `/tmp/sales/sales/commands/prospect.md` to `D:/telechargements/sales-wiki/commands/prospecter.md`. Edit:
- French description
- Replace data paths, remove Solo/Sentinel
- Add inline wiki prelude
- Add wiki query: before prospecting, check if wiki has articles on the target account/sector
- Add freshness warning for stale prospect articles

- [ ] **Step 5: Create pipeline.md**

Copy `/tmp/sales/sales/commands/pipeline.md` to `D:/telechargements/sales-wiki/commands/pipeline.md`. Edit:
- French description: "Vue pipeline + sante des deals."
- Replace data paths, remove Solo/Sentinel
- Add inline wiki prelude
- Add wiki enrichment: for each deal in pipeline, check wiki `output/projects/<deal>/` for existing research
- Merge pipeline-review functionality (from the dropped pipeline-review.md command): read `commands/pipeline-review.md` from source, incorporate its review logic into this single command

- [ ] **Step 6: Create creer.md**

Copy `/tmp/sales/sales/commands/create.md` to `D:/telechargements/sales-wiki/commands/creer.md`. Edit:
- French description: "Creer un asset sales (proposal, deck, email, QBR, battlecard)."
- Replace data paths, remove Solo/Sentinel
- Add wiki prelude + wiki source citation in generated assets
- Save output to wiki `output/projects/<deal>/` when a deal context exists

- [ ] **Step 7: Create negocier.md**

Copy `/tmp/sales/sales/commands/negotiate.md` to `D:/telechargements/sales-wiki/commands/negocier.md`. Edit:
- French description: "Conseil negociation fonde sur wiki + patterns win/loss."
- Replace data paths, remove Solo/Sentinel
- Add wiki query: read objection patterns and win/loss articles before dispatching deal-desk-advisor

- [ ] **Step 8: Create coacher.md**

Copy `/tmp/sales/sales/commands/coach.md` to `D:/telechargements/sales-wiki/commands/coacher.md`. Edit:
- French description: "Coaching: review email, roleplay, feedback. Enrichi par patterns wiki."
- Replace data paths, remove Solo/Sentinel
- Add wiki enrichment: win/loss patterns injected into coaching context

- [ ] **Step 9: Create linkedin.md**

Copy `/tmp/sales/sales/commands/linkedin.md` to `D:/telechargements/sales-wiki/commands/linkedin.md`. Edit:
- French description: "Suite LinkedIn: post, engage, prospect, orchestrate."
- Replace data paths, remove Solo/Sentinel
- Add wiki content angles for thought leadership posts

- [ ] **Step 10: Create prevoir.md**

Copy `/tmp/sales/sales/commands/forecast.md` to `D:/telechargements/sales-wiki/commands/prevoir.md`. Edit:
- French description: "Prevision pipeline avec scoring wiki."
- Replace data paths, remove Solo/Sentinel
- Add wiki confidence: weight forecast by wiki article confidence scores per deal

- [ ] **Step 11: Create analyser.md (win/loss -> wiki compilation)**

Copy `/tmp/sales/sales/commands/win-loss.md` to `D:/telechargements/sales-wiki/commands/analyser.md`. Edit:
- French description: "Analyse win/loss -> compilee dans ta base wiki. Detecte les patterns sur plusieurs deals."
- Replace data paths, remove Solo/Sentinel
- Add wiki prelude
- Add post-analysis wiki ingestion:
  1. After win-loss-analyst-agent produces analysis
  2. Ingest analysis into `raw/notes/YYYY-MM-DD-winloss-<deal>.md`
  3. Compile into wiki articles (updates patterns)
  4. Archive deal project to `output/projects/.archive/<deal>/`
  5. Report: "Analyse ingeree. Apres N+ analyses, les patterns emergent."

- [ ] **Step 12: Verify all commands**

```bash
ls D:/telechargements/sales-wiki/commands/
```

Expected: 13 files (sales, demarrer, prospecter, recherche, pipeline, preparer, creer, negocier, coacher, linkedin, prevoir, analyser, bilan).

---

### Task 10: Documentation + Validation

**Files:**
- Create: `CONNECTORS.md`, `README.md`

- [ ] **Step 1: Create CONNECTORS.md**

Write to `D:/telechargements/sales-wiki/CONNECTORS.md`. Include:
- Integration table (9 MCP: CRM, enrichment, comms, transcription, knowledge)
- Degradation gracieuse per connector
- Setup order (HubSpot first -> Slack -> Fireflies -> Clay/ZoomInfo -> rest)
- All in French

- [ ] **Step 2: Create README.md**

Write to `D:/telechargements/sales-wiki/README.md`. Include:
- Plugin name and description
- Setup (install + /sales:demarrer)
- Command table (13 commands, French descriptions)
- Workflow example (demarrer -> recherche -> preparer -> creer -> analyser)
- Architecture (Dual-Core + entity freshness)
- 7 fusion points summary
- Credits (llm-wiki, sales, NMarchitecte)

- [ ] **Step 3: Full validation**

```bash
echo "=== FILE COUNT ===" && find D:/telechargements/sales-wiki -type f | wc -l
echo "=== SKILLS ===" && find D:/telechargements/sales-wiki/skills -maxdepth 1 -type d | grep -v "^D:/telechargements/sales-wiki/skills$" | wc -l
echo "=== COMMANDS ===" && ls D:/telechargements/sales-wiki/commands/ | wc -l
echo "=== AGENTS ===" && ls D:/telechargements/sales-wiki/agents/ | wc -l
echo "=== PLUGIN NAME ===" && grep '"name"' D:/telechargements/sales-wiki/.claude-plugin/plugin.json
echo "=== STALE REFS ===" && grep -rl "2-Domaines\|2-Areas\|wiki-manager\|SOLO_ROOT\|solo_installed\|SENTINEL" D:/telechargements/sales-wiki/skills/ D:/telechargements/sales-wiki/commands/ D:/telechargements/sales-wiki/agents/ 2>/dev/null || echo "CLEAN"
echo "=== HUB REFS ===" && grep -r "~/wiki/" D:/telechargements/sales-wiki/skills/ D:/telechargements/sales-wiki/commands/ 2>/dev/null | grep -v "sales-wiki" || echo "CLEAN - all refs use ~/sales-wiki/"
```

Expected:
- ~130 files total
- 30 skill directories (26 sales + 4 wiki; NOT 31 because para-organizer is dropped)
- 13 commands
- 8 agents
- Plugin name: "sales"
- Zero stale references
- All hub refs use `~/sales-wiki/` not `~/wiki/`

- [ ] **Step 4: Test load (manual)**

```bash
claude --plugin-dir D:/telechargements/sales-wiki
```

Run `/sales` -- should show status. Run `/help` -- should list all `/sales:*` commands.

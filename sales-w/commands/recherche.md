---
description: "Recherche approfondie multi-agents. Persiste dans ta base sales-wiki. Mode these pour valider des hypotheses sales."
argument-hint: "<topic|question> [--mode thesis \"<claim>\"] [--new-topic] [--sources <N>] [--deep] [--retardmax] [--min-time <duration>] [--wiki <name>] [--local] [--project <slug>]"
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(ls:*), Bash(wc:*), Bash(date:*), Bash(mkdir:*), WebFetch, WebSearch, Agent
---

## Your task

Conduct deep research on the topic in $ARGUMENTS. This is an automated pipeline: search -> ingest -> compile.

### Prelude: Resolve Wiki

1. **HUB**: Try `$HOME/sales-wiki/_index.md`. If exists -> HUB = `$HOME/sales-wiki`. Else read `~/.config/llm-sales-wiki/config.json` and use `resolved_path`. If no config -> HUB = `$HOME/sales-wiki`.
2. **Wiki**: `--local` -> `.wiki/` | `--wiki <name>` -> lookup `HUB/wikis.json` | cwd has `.wiki/` -> use it | else -> HUB.
3. **Verify**: Read `<wiki-root>/_index.md`. If missing -> stop: "No wiki found. Use `--new-topic <name>` to create one, or run `/wiki init` first."
4. **Parse $ARGUMENTS** below.

### `--new-topic` branch

When `--new-topic` is set, override the standard resolution:
1. Derive a slug from the topic: lowercase, hyphens, no special chars, max 40 chars
2. If HUB doesn't exist, create it (wikis.json + _index.md + log.md + topics/)
3. Create the new topic wiki at `HUB/topics/<slug>/` following the full init protocol (directory structure, .obsidian/, empty _index.md files, config.md, log.md)
4. Register in `HUB/wikis.json` and update hub `_index.md`
5. Target this new wiki for all research that follows

### Parse $ARGUMENTS

- **topic/question**: The research subject — everything that is not a flag.
- **--mode thesis "<claim>"**: Activate thesis mode. Read and follow `${CLAUDE_PLUGIN_ROOT}/skills/wiki-core/references/thesis-mode.md`.
- **--new-topic**: Create a new topic wiki from the topic name and start researching into it.
- **--sources <N>**: Target sources PER ROUND (default: 5, max: 20)
- **--deep**: 8 parallel agents with broader search angles
- **--retardmax**: 10 agents, skip planning, ingest aggressively
- **--min-time <duration>**: Minimum research time. Keep running research rounds until this duration is reached. Formats: `30m`, `1h`, `2h`, `4h`. Default: single round (no minimum).
- **--wiki <name>**: Target a specific existing topic wiki
- **--local**: Use project-local `.wiki/`
- **--project <slug>**: Tag all new outputs with this project. Verify the project exists at `<wiki-root>/output/projects/<slug>/WHY.md` before starting. See `${CLAUDE_PLUGIN_ROOT}/skills/wiki-core/references/projects.md`.

### Input Detection: Topic vs Question vs Thesis

- **Thesis** (explicit): `--mode thesis` flag is set -> read `${CLAUDE_PLUGIN_ROOT}/skills/wiki-core/references/thesis-mode.md` and follow it.
- **Thesis** (auto-detected): input contains "prove that", "is it true that", "verify", "test the claim", "test the hypothesis" -> same as above.
- **Question**: starts with what/why/how/when/where/who, contains "?", or is phrased as a goal -> enter Question Research Mode below.
- **Topic**: a noun/phrase naming a subject area -> proceed with standard research protocol.

### Question Research Mode

The question itself is the scope constraint.

**Step 1: Decompose the question** into 3-5 focused sub-questions. Example:

Input: "What makes long form articles go viral and how to replicate it"
Decomposition:
- **What**: What patterns do viral long-form articles share?
- **Why**: What psychological/social mechanisms drive sharing?
- **How**: What is the step-by-step process to write one?
- **Who**: Who has done this successfully and what do they say?
- **Data**: What does the data say?

Present the decomposition to the user. Then proceed.

**Step 2: One agent per sub-question.** Each agent targets a specific sub-question.

**Step 3: Compile with structure.** Concept articles for each key finding, a topic article synthesizing the full answer, reference articles for tools and examples.

**Step 4: Generate playbook.** Save to `output/playbook-{slug}-{YYYY-MM-DD}.md`. Structure: original question, key findings per sub-question, actionable steps, examples, sources.

**Step 5: Derive theses.** Suggest 2-3 testable claims from the findings.

### Minimum Time Research (`--min-time`)

#### Session State

Create `<wiki-root>/.research-session.json`:

```json
{
  "session_id": "YYYY-MM-DD-HHmmss",
  "topic": "research topic",
  "start_time": "ISO 8601",
  "min_time_budget": "2h",
  "current_round": 1,
  "rounds_completed": [],
  "cumulative_sources": 0,
  "cumulative_articles": 0,
  "status": "in_progress"
}
```

**Resume detection**: If `.research-session.json` exists with `status: "in_progress"`, ask: "Found interrupted session (Round N, M sources so far). Continue from Round N+1, or start fresh?"

**Multi-round flow:**

```
Round 1: Full research protocol (Phase 1-5) -> gaps, progress score
Reflect: Score gaps (impact x feasibility x specificity), pick top 3
Round 2: Research on top 3 gaps -> compile, new gaps
Reflect: Look for cross-topic connections between rounds
Round 3+: Continue until --min-time reached, progress >= 80, or two consecutive low-yield rounds
Final: /wiki:lint --fix, summary, delete session file
```

**Termination rules:**
- Progress >= 80 with no high-impact gaps -> recommend early completion
- Two consecutive rounds with progress < 40 -> diminishing returns, switch strategy
- Round would exceed time budget by >50% -> don't start it

### Research Protocol (Single Round — Topic Mode)

#### Phase 1: Existing Knowledge Check

1. Read `wiki/_index.md` and `raw/_index.md` to understand what the wiki already knows
2. Use Grep for the topic and related terms across existing articles
3. Identify gaps — what is NOT covered
4. Generate 5-8 specific search angles based on gaps

#### Phase 1b: Load Sales Context

Read `${CLAUDE_PLUGIN_ROOT}/data/icp.json` and `${CLAUDE_PLUGIN_ROOT}/data/sales-profile.json`. Include icp.pain_points and sales_profile.competitive_advantages in each agent's prompt.

#### Phase 2: Web Research — Parallel Agent Swarm

Launch agents IN PARALLEL (single message, multiple Agent tool calls).

> **Cowork fallback**: If Agent tool is unavailable, execute each agent sequentially. Continue without error.

**Standard mode (default):** 5 parallel agents

| Agent | Focus | Search Strategy |
|-------|-------|----------------|
| **Academic** | Peer-reviewed papers, meta-analyses | Google Scholar, PubMed, arxiv. Recent (last 2 years). |
| **Technical** | Technical deep-dives, specs, docs | Technical guides, whitepapers, engineering blogs. |
| **Applied** | Case studies, practical guides | How-to guides, industry reports, tutorials. |
| **News/Trends** | Recent developments, announcements | News from last 6 months, conference talks. |
| **Contrarian** | Criticisms, limitations, failures | Critiques, rebuttals, known limitations. |

**Deep mode (`--deep`):** adds Historical, Adjacent, Data/Stats agents.

**Retardmax mode (`--retardmax`):** ALL above plus 2 Rabbit Hole agents. Skip Phase 1, 4-5 searches each, lower quality threshold, --sources default bumps to 15.

**Each agent must:**
- Run 2-3 different WebSearch queries (vary terms)
- Use WebFetch to extract full content for promising results
- Evaluate quality (1-5 scale)
- Return ranked list: title, URL, content, quality score, why worth ingesting
- Target 3-5 high-quality sources
- Skip: paywalled, SEO spam, thin, duplicate

**Agent prompt template:**
```
You are a research agent. Your task:
**Objective**: Research "{topic}" from the {Agent Role} angle.
**Focus**: {Role-specific focus}
**Search strategy**: {Strategy from table}
**Current wiki state**: The wiki already covers: {summary from Phase 1}. Search for what's NOT covered.
**Audience**: Search for content relevant to sales audience: {icp.pain_points}. Prioritize practitioner and CRM sources.
**Constraints**: Run 2-3 WebSearch queries, WebFetch promising results, target 3-5 sources.
**Return format**: Title, URL, quality score (1-5), key findings (3-5 bullets), why worth ingesting.
**Quality scoring**: 5=peer-reviewed/primary data, 4=authoritative blog/docs, 3=decent coverage, 2=thin/derivative, 1=spam.
```

**Deduplication:** After all agents return, deduplicate by URL and content similarity.

#### Phase 2b: Credibility Review

| Signal | Scoring |
|--------|---------|
| Peer-reviewed? | +2 if yes |
| Recent (last 3 years) | +1 |
| Author authority | +1 if established |
| Potential bias | -1 if detected |
| Corroboration (multiple agents) | +1 per agent, max +2 |

**Tiers**: High (4-6) -> confidence: high | Medium (2-3) -> confidence: medium | Low (0-1) -> confidence: low | Reject (<0) -> skip.

Select top N sources (--sources count), ranked by credibility x quality.

#### Phase 3: Ingest

For each selected source:
1. Write to `raw/{type}/YYYY-MM-DD-slug.md` with frontmatter (title, source URL, type, tags, summary)
2. Auto-detect type: academic -> papers, news -> articles, code -> repos, guides -> articles, data -> data
3. Update indexes: `raw/{type}/_index.md`, `raw/_index.md`, master `_index.md`

#### Phase 4: Compile

1. Read all newly ingested sources
2. Follow the compilation protocol in `${CLAUDE_PLUGIN_ROOT}/skills/wiki-core/references/compilation.md`
3. Set confidence levels based on corroboration
4. Set entity_type and freshness_threshold for compiled articles about identifiable entities. Generate 2-4 sales_angles per article.
5. Update all indexes

#### Phase 5: Report & Log

Append to topic `log.md` and hub `HUB/log.md`:
`## [YYYY-MM-DD] research | "topic" -> N sources ingested, M articles compiled`

**Report contents:**
- Topic researched, round N of M (if --min-time)
- Agents launched (count and angles)
- Sources found / ingested / skipped (with reasons)
- Articles created / updated (with paths)
- Confidence map (high/medium/low claims)
- New cross-references discovered
- Remaining gaps and suggested follow-ups
- Time spent (this round / total if --min-time)
- **Progress score** (0-100): sources x3 (max 30) + articles x5 (max 30) + cross-refs x2 (max 20) + avg credibility x4 (max 20)
- **Termination recommendation** if progress >= 80 or < 40
- Prochaine etape: /sales:preparer ou /sales:creer

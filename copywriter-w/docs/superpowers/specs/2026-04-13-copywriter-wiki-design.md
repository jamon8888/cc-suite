# Copywriter Wiki -- Design Spec

**Date**: 2026-04-13
**Status**: Approved (rev 2 -- post code review)
**Plugin name**: `copywriter`
**Version**: 1.0.0
**Author**: NMarchitecte
**Approach**: Dual-Core (JSON identity + wiki knowledge base)
**Target user**: Solopreneur / Creator (French-first, bilingual)

---

## 1. Purpose

An evidence-based copywriting studio for Claude Desktop Cowork. Forks and merges the best of two plugins:

- **llm-wiki** (v0.2.2 by nvk): persistent research pipeline (ingest -> compile -> query), confidence scoring, thesis mode, multi-agent research, Obsidian dual-linking.
- **copywriter** (v2.0 by Antigravity Factory): Voice DNA, ICP, anti-slop engine, content calendar, multi-format writing (blog/newsletter/LinkedIn/sales/scripts), 7 specialized agents.

Every piece of content is grounded in researched, cited, confidence-scored wiki sources -- written in the user's authentic voice.

## 2. Architecture

### Dual-Core Principle

Two data layers serve different purposes:

| Layer | Storage | Contents | Loading |
|-------|---------|----------|---------|
| **Identity** | `data/` (plugin-local JSON) | voice-dna.json, icp.json, business-profile.json, glossary.md | SessionStart hook loads voice-dna.json only (~200 tokens). ICP and business-profile loaded lazily by agents that need them. |
| **Knowledge** | `~/wiki/topics/<niche>/` (shared hub) | Ingested sources, compiled articles, theses, outputs | On demand, only when research depth needed |

**Why shared hub**: A solopreneur's research compounds. Email marketing research done for a blog post powers next month's newsletter. Separate hubs mean duplicating work.

**Why JSON identity**: Voice DNA, ICP, and business profile are small (~5KB total), sacred, and needed frequently. Loading from wiki articles would add unnecessary Read calls for a quick LinkedIn post.

### Mental model

- "Qui je suis ?" = `data/` (identity, fast)
- "Qu'est-ce que je sais ?" = `~/wiki/` (knowledge, deep)

### Context Assembly Pattern

**Orchestrator-injects model**: The command file (e.g., `ecrire.md`) is the orchestrator. It:
1. Reads the required identity files (`data/voice-dna.json`, `data/icp.json`, etc.)
2. Queries the wiki for relevant articles (Grep + Read top 3-5 by relevance)
3. Assembles a **content brief** (identity + wiki excerpts + topic)
4. Passes the content brief as the Agent tool prompt

Agents never read files themselves. They receive a self-contained brief and produce output. This guarantees context isolation and predictable token costs.

### Hub Resolution for All Wiki Operations

Every command or skill that touches `~/wiki/` must resolve the hub path first. The resolution is inlined in each command (not delegated to a reference file):

1. **HUB**: Try `$HOME/wiki/_index.md`. If exists -> HUB = `$HOME/wiki`. Else read `~/.config/llm-wiki/config.json` and use `resolved_path`. If no config -> HUB = `$HOME/wiki`.
2. **Wiki**: `--local` -> `.wiki/` | `--wiki <name>` -> lookup `HUB/wikis.json` | cwd has `.wiki/` -> use it | else -> HUB.

Wiki skills (`wiki-reader`, `wiki-writer`, `wiki-research`) include this same 2-step resolution at the top of their SKILL.md for ambient activation. The `wiki-core/references/hub-resolution.md` file exists as documentation for edge cases (iCloud, spaces, symlinks) but is not read at runtime.

## 3. Plugin Structure

```
copywriter/
├── .claude-plugin/
│   └── plugin.json
├── .mcp.json                         # WordPress (optional)
├── hooks/
│   └── hooks.json
├── data/                             # IDENTITY
│   ├── voice-dna.json
│   ├── icp.json
│   ├── business-profile.json
│   └── glossary.md
├── skills/                           # 22 SKILLS
│   ├── wiki-core/                    # Hub resolution, principles
│   │   ├── SKILL.md
│   │   └── references/
│   │       ├── hub-resolution.md     # Documentation only, not read at runtime
│   │       ├── wiki-structure.md     # Verbatim port from llm-wiki
│   │       ├── ingestion.md          # Verbatim port from llm-wiki
│   │       ├── compilation.md        # MODIFIED: adds content_angles frontmatter
│   │       ├── indexing.md           # Verbatim port from llm-wiki
│   │       ├── linting.md            # Verbatim port from llm-wiki
│   │       └── thesis-mode.md        # MODIFIED: adds ICP-weighted evidence
│   ├── wiki-reader/                  # Query wiki
│   │   └── SKILL.md
│   ├── wiki-writer/                  # Ingest/compile
│   │   └── SKILL.md
│   ├── wiki-research/                # Multi-agent research
│   │   └── SKILL.md
│   ├── wiki-inbox/                   # Inbox processor
│   │   └── SKILL.md
│   ├── voice-dna-creator/            # Voice DNA extraction
│   │   └── SKILL.md
│   ├── icp-creator/                  # ICP interview
│   │   └── SKILL.md
│   ├── business-profile-creator/     # Business profile
│   │   └── SKILL.md
│   ├── antislop-expert/              # Anti-slop + credibility
│   │   ├── SKILL.md
│   │   ├── references/              # 12 files: 6 FR + 6 EN (see Section 12)
│   │   └── scripts/                 # Python scoring
│   ├── content-writer/               # Content generation orchestrator
│   │   └── SKILL.md
│   ├── seo-blog-writer/
│   │   ├── SKILL.md
│   │   └── templates/
│   ├── linkedin-post/
│   │   ├── SKILL.md
│   │   ├── references/
│   │   └── examples/
│   ├── twitter-thread/
│   │   └── SKILL.md
│   ├── newsletter-writer/
│   │   ├── SKILL.md
│   │   └── references/
│   ├── sales-email-sequence/
│   │   ├── SKILL.md
│   │   └── templates/
│   ├── video-script-generator/
│   │   ├── SKILL.md
│   │   └── templates/
│   ├── landing-page-copy/
│   │   └── SKILL.md
│   ├── title-brain/
│   │   └── SKILL.md
│   ├── content-calendar/
│   │   ├── SKILL.md
│   │   └── references/
│   ├── quote-extractor/
│   │   └── SKILL.md
│   ├── social-media-bio/
│   │   └── SKILL.md
│   └── wordpress-publisher/
│       └── SKILL.md
├── commands/                         # 9 COMMANDS
│   ├── copywriter.md                 # Natural language router + status
│   ├── start.md
│   ├── ecrire.md
│   ├── recherche.md
│   ├── calendrier.md
│   ├── verifier.md
│   ├── apprendre.md
│   ├── question.md
│   └── bilan.md
├── agents/                           # 7 AGENTS
│   ├── blog-agent.md
│   ├── social-agent.md
│   ├── newsletter-agent.md
│   ├── script-agent.md
│   ├── sales-copy-agent.md
│   ├── research-agent.md
│   └── onboarding-agent.md
├── CONNECTORS.md
├── README.md
└── LICENSE
```

**Changes from rev 1:**
- Removed `skill-config.json` (undefined, unnecessary)
- Removed `linkedin-analytics` skill (dead -- not wired to any command)
- Added `commands/copywriter.md` for natural language router (9th command)
- Skill count corrected to 22 (was 23, removed linkedin-analytics)
- Reference files annotated as "verbatim port" or "MODIFIED" with reason

## 4. plugin.json

```json
{
  "name": "copywriter",
  "version": "1.0.0",
  "description": "Evidence-based copywriting studio. Wiki-backed research, Voice DNA, anti-slop, multi-format writing. Every piece of content grounded in cited, confidence-scored sources.",
  "author": { "name": "NMarchitecte" },
  "license": "MIT",
  "keywords": ["copywriting", "wiki", "knowledge-base", "content", "voice-dna", "seo", "research", "evidence-based", "antislop"],
  "userConfig": {
    "exa_api_key": {
      "description": "Exa API key for neural search (optional, falls back to WebSearch)",
      "sensitive": true
    },
    "wp_site_url": {
      "description": "WordPress site URL for auto-publish (optional)",
      "sensitive": false
    },
    "wp_username": {
      "description": "WordPress username (optional)",
      "sensitive": false
    },
    "wp_app_password": {
      "description": "WordPress application password (optional)",
      "sensitive": true
    }
  }
}
```

**Note**: The actual `plugin.json` on disk at `.claude-plugin/plugin.json` must use `"name": "copywriter"` (not `"copywriter-wiki"`). This name drives the command namespace: `/copywriter:ecrire`, `/copywriter:recherche`, etc.

## 5. Commands

| Command | Description | Identity reads | Wiki reads | Wiki writes |
|---------|-------------|---------------|------------|-------------|
| `/copywriter` | Natural language router + status | Depends on route | Depends on route | Depends on route |
| `/copywriter:start` | Onboarding: voice + ICP + wiki init | Creates JSON | Creates topic wiki | wiki init |
| `/copywriter:ecrire [format] "topic"` | Write content (blog/social/newsletter/script/sales) | Voice DNA + ICP + Business | Wiki articles on topic | output/ |
| `/copywriter:recherche "topic"` | Deep wiki-backed research | ICP (focus angles) | Existing articles (gaps) | raw/ + wiki/ |
| `/copywriter:calendrier "month" "focus"` | Content calendar grounded in wiki | Business (offers, CTAs) | Confidence scores | output/ |
| `/copywriter:verifier` | Triple audit: slop + credibility + staleness | Voice DNA (baseline) | Source credibility | Nothing |
| `/copywriter:apprendre <url\|file\|text>` | Ingest a source into wiki | Nothing | Nothing | raw/ + indexes |
| `/copywriter:question "question"` | Query the knowledge base | Nothing | Wiki articles | log.md |
| `/copywriter:bilan` | Wiki status + content stats | Nothing | _index.md | Nothing |

### Command details

#### `/copywriter` (Natural Language Router)

Lives in `commands/copywriter.md`. Routes freeform text to the right subcommand.

**Pattern matching (first match wins):**
- URL detected (http/https) -> `apprendre`
- Question mark or FR question words (quel/comment/pourquoi/est-ce que) or EN (what/how/why) -> `question`
- FR write words (ecris/redige/post/article/publie/cree un/genere) or EN (write/create/draft) -> `ecrire`
- FR research words (recherche/cherche/explore/investigue) or EN (research/investigate/look into) -> `recherche`
- FR plan words (planifie/calendrier/planning) or EN (plan/calendar/schedule) -> `calendrier`
- FR verify words (verifie/audit/slop/corrige) or EN (check/audit/verify) -> `verifier`
- Empty or "status"/"bilan" -> show wiki status (inline)
- Ambiguous -> numbered choice menu

**Confidence routing:** High confidence (single strong signal) routes directly with announcement. Low confidence presents top 2-3 options.

#### `/copywriter:start`

Three phases, delegated to onboarding-agent:
1. **Identity**: Business profile interview -> `data/business-profile.json`, Voice DNA from writing samples -> `data/voice-dna.json`, ICP interview -> `data/icp.json`, language preference (FR/EN/bilingual)
2. **Wiki Init**: Derive topic wiki name from business niche, create `~/wiki/topics/<niche>/`
3. **Bootstrap**: Offer 5-minute research to seed the knowledge base

**Voice DNA versioning**: Before overwriting `voice-dna.json`, copy existing file to `data/voice-dna.previous.json`. This prevents accidental data loss if `/copywriter:start` is re-run. To update voice DNA without resetting other identity files, use `--update` flag: `/copywriter:start --update voice` only re-runs the voice DNA interview.

#### `/copywriter:ecrire [format] "topic"`

Router dispatches to specialized agent:

| Argument | Agent | Skill chain |
|----------|-------|-------------|
| `blog` | blog-agent | web_search -> title-brain -> seo-blog-writer -> antislop |
| `social` | social-agent | title-brain -> linkedin-post / twitter-thread |
| `newsletter` | newsletter-agent | newsletter-writer -> antislop |
| `script` | script-agent | video-script-generator |
| `sales` | sales-copy-agent | sales-email-sequence -> antislop |

**Context assembly** (orchestrator-injects pattern):
1. Command reads `data/voice-dna.json`, `data/icp.json`, `data/business-profile.json`
2. Command queries wiki: Grep `wiki/` for topic terms, read top 3-5 articles by relevance
3. Command assembles content brief (identity + wiki excerpts + topic)
4. Command passes brief as Agent tool prompt
5. Agent produces content, returns to command
6. Command runs antislop check inline (not via hook -- see Section 6)
7. Command offers WordPress publish if `userConfig.wp_site_url` is set

**If no wiki exists**: `ecrire` proceeds without wiki context (produces content based on identity only). Surfaces suggestion: "Tes articles seraient plus solides avec une base de connaissances. Lance `/copywriter:recherche` pour commencer."

Citation behavior by format:
- **Blog**: Full source section at bottom, inline references
- **Newsletter**: Light -- "I've been studying X, here's what I found"
- **LinkedIn/Twitter/Script/Sales**: None visible -- wiki informs angle but no citations shown

#### `/copywriter:recherche "topic"`

Wiki-backed persistent research. Replaces copywriter's ephemeral search-and-forget.

```
/copywriter:recherche "email deliverability"                    # 5 agents
/copywriter:recherche "cold email trends" --deep                # 8 agents
/copywriter:recherche --mode thesis "Le cold email est mort"    # For/against verdict
/copywriter:recherche "email marketing" --min-time 1h           # Multi-round
```

Differences from llm-wiki's research:
- Agents receive ICP context (search angles relevant to YOUR audience)
- Practitioner sources weighted higher than academic in credibility scoring
- Compiled articles get `content_angles` frontmatter field (list of suggested hooks)
- Post-research suggests: `/copywriter:ecrire` or `/copywriter:calendrier`

Differences from copywriter's research:
- Results persist in wiki (not ephemeral)
- Multi-round with `--min-time`
- Thesis mode for validating content angles
- Confidence scoring on every claim

#### `/copywriter:calendrier "month" "focus"`

Cascade model (Hero -> Splinters -> Personal Story) from copywriter, enhanced:
- Topic selection from wiki articles ranked by confidence + recency
- High-confidence topics get Hero slots
- Low-confidence topics trigger research suggestion
- Gap detection: "Pas assez de sources sur X. Rechercher d'abord ?"
- Saved to `~/wiki/topics/<niche>/output/calendar-YYYY-MM.md`

#### `/copywriter:verifier`

Triple audit (not dual):
1. **Slop score**: Banned words, passive voice, voice DNA match (bilingual FR/EN)
2. **Source credibility**: Confidence levels of cited wiki sources. Flags: "Cette affirmation n'est soutenue par aucune source dans ta base."
3. **Staleness**: Wiki articles older than 90 days flagged for re-research

#### `/copywriter:apprendre <source>`

Direct port of llm-wiki's ingest with inline prelude. Accepts URLs, file paths, freeform text.

**Auto-compile behavior**: When 5+ uncompiled sources accumulate, **suggests** compilation: "Tu as N sources non compilees. Lancer `/copywriter:apprendre` ne les transforme pas en articles. Lance la compilation ? (o/n)". Does NOT auto-compile without consent (expensive in tokens).

#### `/copywriter:question "question"`

Direct port of llm-wiki's query. Answers from wiki content only, with citations and confidence levels.

#### `/copywriter:bilan`

Wiki status: source count, article count, output count, last compiled, last lint, recent activity log. Plus content stats: pieces written this month (count output/ files by date), formats used, topics covered.

## 6. Hooks

```json
{
  "SessionStart": [
    {
      "hooks": [{
        "type": "prompt",
        "prompt": "Read ${CLAUDE_PLUGIN_ROOT}/data/voice-dna.json if it exists. Use language_preference to set output language. If language_preference is missing or file is empty, default to French and suggest /copywriter:start.",
        "timeout": 30
      }]
    }
  ]
}
```

**What changed from rev 1 and why:**

1. **Removed PostToolUse hooks entirely.** The Cowork `PostToolUse` matcher matches against tool names (Read, Write, WebFetch, etc.), not skill directory names. Matching on "seo-blog-writer" would never fire because it is a skill, not a tool. Anti-slop and WordPress publish checks are now handled **inline in the `ecrire.md` command** after the agent returns its output (step 6-7 in the ecrire flow above).

2. **SessionStart only loads voice-dna.json.** ICP and business-profile are loaded lazily by the `ecrire.md` command when it assembles the content brief. This keeps the SessionStart hook fast (~200 tokens) and avoids loading identity files for wiki-only operations (`question`, `bilan`, `apprendre`).

3. **Default language is French** when voice-dna.json is empty or missing (target user is French-first solopreneur).

## 7. Agent Context Envelopes

Each agent receives minimal context via the orchestrator-injects pattern (see Section 2):

| Agent | Receives | Does NOT receive |
|-------|----------|-----------------|
| blog-agent | voice-dna + ICP + business + 3-5 wiki articles + topic | Calendar, other drafts |
| social-agent | voice-dna + ICP + topic | Wiki (optional), business profile |
| newsletter-agent | voice-dna + ICP + business + wiki articles | Calendar |
| script-agent | voice-dna + ICP + topic | Wiki (optional) |
| sales-copy-agent | voice-dna + ICP + business (offers/CTAs) + wiki | Calendar |
| research-agent | ICP + wiki gap summary + topic | Voice DNA, business |
| onboarding-agent | Nothing (interviews from scratch) | Everything |

All agents use `model: sonnet` for speed and cost. Orchestration (command routing, wiki queries, content brief assembly) runs on whatever model the user's session uses.

**Context isolation rule**: Each agent gets identity + task-specific data. Never the full wiki. Never other agents' outputs. This prevents voice drift across formats.

**Who performs wiki article selection**: The orchestrating command (e.g., `ecrire.md`), not the agent. The command Greps wiki/ for topic terms, reads the top 3-5 articles by summary/tag relevance, and includes their key content in the agent prompt. The agent never touches the filesystem.

## 8. Token Budget

| Scenario | Identity | Skill | Command | Wiki reads | Total |
|----------|----------|-------|---------|------------|-------|
| Quick LinkedIn post | ~200 | ~800 | ~600 | 0 | **~1,600** |
| Blog with wiki sources | ~500 | ~1,800 | ~1,200 | ~2,000 | **~5,500** |
| Deep research session | ~200 | ~630 | ~3,000 | ~1,500 | **~5,330** |
| Content calendar | ~400 | ~1,200 | ~800 | ~1,000 | **~3,400** |
| Quick question to wiki | 0 | ~680 | ~600 | ~800 | **~2,080** |

**Notes:**
- Identity column: ~200 = voice-dna only (SessionStart). ~400-500 = voice-dna + ICP + business (loaded by command).
- Skill column for deep research (~630) is lower than blog (~1,800) because research uses wiki-research SKILL.md (30 lines) while blog activates content-writer + seo-blog-writer + antislop-expert skills.
- Compared to original copywriter: ~8,000-12,000 tokens per session (CLAUDE.md zone system loads everything). This design loads only what each scenario needs.

## 9. Five Fusion Points

### Fusion 1: Research That Compounds
Copywriter's ephemeral research replaced by wiki's persistent pipeline. Sources ingested, compiled, and queryable months later.

### Fusion 2: Evidence-Backed Content Calendar
Calendar topic selection draws from wiki confidence scores. Low-confidence topics trigger research suggestions before committing to a Hero slot.

### Fusion 3: Thesis-Driven Content Angles
Validate hot takes before writing: `/copywriter:recherche --mode thesis "Le cold email est mort en 2026"`. Verdict with for/against evidence shapes the angle.

### Fusion 4: Source-Aware Anti-Slop
Antislop checks voice match AND source credibility. Claims backed by low-confidence or missing wiki sources get flagged.

### Fusion 5: Queryable Content Archive
Published content saved to wiki output/, compiled, indexed, cross-referenced. Repurpose with full context instead of re-researching.

## 10. What's NOT Ported

| Feature | Decision | Reason |
|---------|----------|--------|
| Solo ecosystem detection | Dropped | Self-contained plugin |
| Sentinel integration | Dropped | Over-engineered for solopreneur |
| CLAUDE.md zone system | Replaced by skill references | Token efficiency |
| `skills_loading` / `bundles` in plugin.json | Dropped | Not an official Cowork field |
| `data/2-Areas/` + `data/2-Domaines/` duplication | Merged to `data/` | Language handled by voice-dna preference |
| `skill-config.json` | Dropped | Undefined schema, unnecessary |
| `linkedin-analytics` skill | Dropped | Not wired to any command |
| `linkedin-scheduler` skill | Dropped | Requires live API, fragile |
| `hacienda-maker.json` | Dropped | Internal tooling |
| `evals/` directory | Dropped for v1 | Can add later |
| Reddit MCP script | Dropped | WebSearch fallback sufficient |

## 11. Connectors

| Category | Placeholder | Default | Alternatives |
|----------|-------------|---------|--------------|
| CMS | `~~CMS` | WordPress MCP | Ghost, Webflow |
| Search | `~~search` | WebSearch (built-in) | Exa (via userConfig) |
| Social | `~~social` | Clipboard (paste) | LinkedIn MCP via Zapier |

All connectors optional. Graceful degradation: no connector = markdown output.

**WordPress publish**: Handled in `ecrire.md` command flow (step 7), gated on `userConfig.wp_site_url` being non-empty. If not configured, the step is skipped entirely -- no prompt shown.

## 12. Bilingual Handling

- Commands are in French (ecrire, recherche, calendrier, verifier, apprendre, question, bilan)
- Output language follows `voice-dna.json > language_preference` (FR/EN/bilingual)
- Default language when voice-dna is empty: **French** (target user is French-first)
- Natural language router understands both FR and EN intent patterns (see Section 5)

### Anti-slop bilingual loading

The `antislop-expert/references/` directory contains 12 files, 6 per language:

| FR | EN |
|----|-----|
| `lexicon_slop_fr.md` | `lexicon_slop_en.md` |
| `motifs_structurels_fr.md` | `structural_patterns_en.md` |
| `stylometrie_fr.md` | `stylometry_en.md` |
| `regles_remediation_fr.md` | `remediation_rules_en.md` |
| `allegations_hallucinations_fr.md` | `allegations_hallucinations_en.md` |
| `typographie_fr.md` | `typography_en.md` |

**Loading rule:**
- `language_preference: "fr"` -> load only FR files (6 files)
- `language_preference: "en"` -> load only EN files (6 files)
- `language_preference: "bilingual"` -> load FR files for French content, EN files for English content. Determined per content piece, not per session. Never load both sets simultaneously (would double token cost).

## 13. Edge Cases

### First run (no identity files)
- SessionStart hook reads empty `voice-dna.json`, defaults to French, suggests `/copywriter:start`
- All commands except `start` and `bilan` check for empty identity and redirect: "Lance `/copywriter:start` d'abord pour configurer ton profil."

### No wiki exists
- `ecrire`: proceeds without wiki context, produces identity-only content, suggests `/copywriter:recherche`
- `recherche`: creates wiki on the fly (wiki-creating variant)
- `question`, `bilan`, `verifier`, `calendrier`: stop with "Pas de wiki trouve. Lance `/copywriter:recherche` ou `/copywriter:apprendre` pour commencer."
- `apprendre`: creates wiki on the fly (wiki-creating variant)

### Voice DNA re-creation
- `/copywriter:start` backs up existing `voice-dna.json` to `voice-dna.previous.json` before overwriting
- `/copywriter:start --update voice` re-runs only the voice DNA interview, preserves ICP and business profile

### Commands run out of order
- `ecrire` before `start`: redirects to `start`
- `ecrire` before `recherche`: works (identity-only content), suggests research
- `calendrier` before `recherche`: works (generates calendar without wiki grounding), warns: "Calendrier sans base de connaissances -- les angles ne sont pas valides par des sources."

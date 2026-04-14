# Sales Wiki -- Design Spec

**Date**: 2026-04-14
**Status**: Approved
**Plugin name**: `sales`
**Version**: 1.0.0
**Author**: NMarchitecte
**Approach**: Dual-Core (JSON identity + wiki knowledge base)
**Target user**: Solopreneur / Small sales team (French-first, bilingual)

---

## 1. Purpose

An evidence-based sales OS for Claude Desktop Cowork. Forks and merges:

- **llm-wiki** (v0.2.2 by nvk): persistent research pipeline (ingest -> compile -> query), confidence scoring, thesis mode, multi-agent research.
- **sales** (v3.0 by Antigravity Factory): 27 skills, 8 agents, 13 commands, 9 MCP connectors. Covers prospecting, pipeline management, deal execution, negotiation, coaching, LinkedIn.

Competitive intel, account research, win/loss patterns, and deal preparation are grounded in a persistent, compiled, confidence-scored wiki knowledge base.

## 2. Architecture

### Dual-Core Principle

| Layer | Storage | Contents | Loading |
|-------|---------|----------|---------|
| **Identity** | `data/` (plugin-local JSON) | sales-profile.json, icp.json, voice-dna.json, LinkedIn/ | SessionStart loads sales-profile.json only (~200 tokens). ICP/voice-dna loaded lazily by commands. |
| **Knowledge** | `~/sales-wiki/topics/<niche>/` (separate hub) | Account profiles, competitor analyses, win/loss patterns, market research, deal workspaces | On demand, when research depth needed |

**Why separate hub (`~/sales-wiki/`)**: Sales data contains client-confidential information (deal amounts, competitor positioning, internal pricing). Isolating from `~/wiki/` (used by copywriter-wiki) prevents accidental cross-contamination.

**Why JSON identity**: Sales profile, ICP, and voice DNA are small (~5KB), needed every session, and change rarely. Wiki is for the evolving knowledge that powers decisions.

### Mental model

- "Qui je suis comme vendeur ?" = `data/` (identity, fast)
- "Qu'est-ce que je sais sur ce compte/marche/concurrent ?" = `~/sales-wiki/` (knowledge, deep)

### Context Assembly Pattern

**Orchestrator-injects model**: Same as copywriter-wiki. The command file reads identity + queries wiki + pulls MCP signals, assembles a brief, passes to agent. Agents never read files or call MCP themselves.

### Hub Resolution

Same 2-step protocol as copywriter-wiki, but default hub is `~/sales-wiki/` instead of `~/wiki/`:

1. **HUB**: Try `$HOME/sales-wiki/_index.md`. If exists -> HUB = `$HOME/sales-wiki`. Else read `~/.config/llm-sales-wiki/config.json` and use `resolved_path`. If no config -> HUB = `$HOME/sales-wiki`.
2. **Wiki**: `--wiki <name>` -> lookup `HUB/wikis.json` | cwd has `.wiki/` -> use it | else -> HUB.

### Entity Freshness System (sales-specific)

Wiki articles about accounts, prospects, and competitors have temporal sensitivity. Article frontmatter includes:

```yaml
entity_type: account|prospect|competitor|market
freshness_threshold: 30    # days before flagged stale
last_verified: 2026-04-01  # last human or research confirmation
```

**Freshness thresholds by entity type:**
- `competitor` : 30 days (markets move fast)
- `prospect` : 45 days
- `account` : 60 days (existing accounts evolve slower)
- `market` : 90 days

**Where freshness is checked**: preparer, bilan, prospecter, daily-briefing. Stale articles trigger: "Recherche obsolete sur X (derniere MAJ il y a N jours). Relancer /sales:recherche ?"

### Deal-as-Project Mapping

Active deals map to wiki projects:

```
~/sales-wiki/topics/<niche>/output/projects/<deal-slug>/
├── WHY.md                    # Deal rationale: why pursuing, value, timeline
├── call-notes-YYYY-MM-DD.md  # Call summaries
├── proposal-v1.md            # Generated proposals
├── competitive-analysis.md   # Competitor comparison for this deal
└── objections-log.md         # Objections encountered + responses used
```

Created by `/sales:preparer` or `/sales:creer`. Archived by `/sales:analyser` (win/loss).

## 3. Plugin Structure

```
sales/
├── .claude-plugin/
│   └── plugin.json
├── .mcp.json                          # 9 MCP servers (all optional)
├── hooks/
│   └── hooks.json
├── data/                              # IDENTITY
│   ├── sales-profile.json
│   ├── icp.json
│   ├── voice-dna.json
│   └── LinkedIn/
│       ├── activity_log.md
│       └── prospects.md
├── skills/                            # 31 SKILLS
│   ├── wiki-core/                     # Hub resolution, principles
│   │   ├── SKILL.md
│   │   └── references/
│   │       ├── hub-resolution.md      # Documentation only (modified: ~/sales-wiki/ default)
│   │       ├── wiki-structure.md      # MODIFIED: adds entity_type frontmatter
│   │       ├── ingestion.md           # Verbatim port from llm-wiki
│   │       ├── compilation.md         # MODIFIED: adds entity_type, freshness_threshold
│   │       ├── indexing.md            # Verbatim port from llm-wiki
│   │       ├── linting.md            # Verbatim port from llm-wiki
│   │       └── thesis-mode.md         # MODIFIED: adds ICP sales-weighted evidence
│   ├── wiki-reader/SKILL.md           # MODIFIED: hub default ~/sales-wiki/
│   ├── wiki-writer/SKILL.md           # MODIFIED: hub default ~/sales-wiki/
│   ├── wiki-research/SKILL.md         # MODIFIED: hub default ~/sales-wiki/
│   ├── voice-dna-creator/SKILL.md     # From sales (with references/)
│   ├── icp-creator/                   # From sales (with references/)
│   │   ├── SKILL.md
│   │   └── references/
│   ├── antislop-expert/               # From sales + credibility enhancement
│   │   ├── SKILL.md
│   │   ├── references/               # 12 files FR + EN
│   │   └── scripts/                  # 2 Python files
│   ├── account-research/SKILL.md
│   ├── competitive-intelligence/
│   │   ├── SKILL.md
│   │   └── references/
│   ├── exa-search-expert/
│   │   ├── SKILL.md
│   │   └── references/
│   ├── linkedin-prospector/SKILL.md
│   ├── outbound-sequence/
│   │   ├── SKILL.md
│   │   └── references/
│   ├── client-management/
│   │   ├── SKILL.md
│   │   └── references/
│   ├── daily-briefing/
│   │   ├── SKILL.md
│   │   └── references/
│   ├── hubspot-sync/SKILL.md
│   ├── territory-planner/
│   │   ├── SKILL.md
│   │   └── references/
│   ├── call-prep/
│   │   ├── SKILL.md
│   │   └── references/
│   ├── create-an-asset/
│   │   ├── SKILL.md
│   │   └── references/
│   ├── discovery-interview-prep/
│   │   ├── SKILL.md
│   │   └── references/
│   ├── proposal-builder/
│   │   ├── SKILL.md
│   │   └── references/
│   ├── rfp-shredder/
│   │   ├── SKILL.md
│   │   └── references/
│   ├── champion-builder/
│   │   ├── SKILL.md
│   │   └── references/
│   ├── negotiation-advisor/
│   │   ├── SKILL.md
│   │   └── references/
│   ├── objection-library/
│   │   ├── SKILL.md
│   │   └── references/
│   ├── qbr-builder/
│   │   ├── SKILL.md
│   │   └── references/
│   ├── linkedin-creator/
│   │   ├── SKILL.md
│   │   └── references/
│   ├── linkedin-engager/SKILL.md
│   ├── linkedin-orchestrator/
│   │   ├── SKILL.md
│   │   └── references/
│   ├── email-coach/
│   │   ├── SKILL.md
│   │   └── references/
│   └── win-loss-analyzer/
│       ├── SKILL.md
│       └── references/
├── commands/                          # 13 COMMANDS
│   ├── sales.md                       # Natural language router
│   ├── demarrer.md                    # Onboarding
│   ├── prospecter.md                  # Find + engage prospects
│   ├── recherche.md                   # Deep wiki research
│   ├── pipeline.md                    # Pipeline view + health
│   ├── preparer.md                    # Call/meeting prep
│   ├── creer.md                       # Create assets
│   ├── negocier.md                    # Negotiation advisor
│   ├── coacher.md                     # Coaching suite
│   ├── linkedin.md                    # LinkedIn suite
│   ├── prevoir.md                     # Forecast
│   ├── analyser.md                    # Win/loss -> wiki
│   └── bilan.md                       # Wiki + pipeline status
├── agents/                            # 8 AGENTS
│   ├── deal-desk-advisor.md
│   ├── outbound-campaign-architect.md
│   ├── pipeline-guardian-agent.md
│   ├── prep-master-agent.md
│   ├── roleplay-dojo-agent.md
│   ├── sales-coach-agent.md
│   ├── signal-trapper-agent.md
│   └── win-loss-analyst-agent.md
├── CONNECTORS.md
├── README.md
└── LICENSE
```

## 4. plugin.json

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

**Note**: MCP servers are configured in `.mcp.json` (all HTTP, no userConfig needed -- they use OAuth via Cowork). Only Exa needs an API key.

## 5. Commands

| Command | Description | Identity | Wiki | MCP |
|---------|-------------|----------|------|-----|
| `/sales` | Routeur langage naturel + status | Depends | Depends | Depends |
| `/sales:demarrer` | Onboarding: profil + ICP + wiki init | Creates | Creates | - |
| `/sales:prospecter "cible"` | Trouver et engager des prospects | ICP | Account articles | Clay, ZoomInfo |
| `/sales:recherche "sujet"` | Recherche wiki profonde | ICP + Sales profile | raw/ + wiki/ | Exa |
| `/sales:pipeline` | Vue pipeline + sante des deals | Sales profile | Deal projects | HubSpot, Close |
| `/sales:preparer "compte"` | Prep call/meeting fonde sur wiki | All identity | Account + competitor articles | Fireflies, HubSpot, Slack |
| `/sales:creer "type"` | Creer asset (proposal, deck, email, QBR) | Voice DNA + Sales | Wiki research | MS365, Atlassian |
| `/sales:negocier "deal"` | Conseil negociation fonde sur wiki | Sales profile | Objections + win/loss patterns | - |
| `/sales:coacher` | Coaching: email review, roleplay, feedback | Voice DNA | Win/loss patterns | Fireflies |
| `/sales:linkedin "action"` | Suite LinkedIn (post, engage, prospect, orchestrate) | Voice DNA + ICP | Wiki for content angles | - |
| `/sales:prevoir` | Forecast pipeline avec scoring | Sales profile | Deal confidence scores | HubSpot, Close |
| `/sales:analyser "deal"` | Win/loss -> compilee dans wiki | - | Creates wiki articles | HubSpot |
| `/sales:bilan` | Status wiki + pipeline + fraicheur entites | Sales profile | _index.md + freshness | - |

### Command details

#### `/sales` (Natural Language Router)

Lives in `commands/sales.md`. Pattern matching (first match wins):
- Account/company name detected -> `preparer`
- URL detected -> `recherche` (ingest source)
- "pipeline/deals/forecast/prevision" -> `pipeline` or `prevoir`
- "LinkedIn/post/engage" -> `linkedin`
- "email/proposal/deck/QBR/devis" -> `creer`
- "negocier/objection/prix/remise" -> `negocier`
- "coach/roleplay/feedback" -> `coacher`
- "prospect/trouver/cibler" -> `prospecter`
- "analyser/win/loss/perdu/gagne" -> `analyser`
- Question mark or "quel/comment/pourquoi" -> `recherche` (query mode)
- Empty or "status/bilan" -> show status
- Ambiguous -> numbered choice menu

#### `/sales:demarrer`

Three phases, delegated to onboarding agent:
1. **Identity**: Sales profile interview -> `data/sales-profile.json` (quotas, territory, offers, sales cycle), Voice DNA, ICP. Language preference (FR/EN/bilingual).
2. **Wiki Init**: Create `~/sales-wiki/topics/<niche>/` (separate hub from copywriter)
3. **Bootstrap**: "Veux-tu que je recherche tes principaux concurrents ? (5 min)" -- runs `/sales:recherche` on top 3 competitors.

**Profile versioning**: Before overwriting `sales-profile.json`, copy to `data/sales-profile.previous.json`. Supports `--update` flag: `/sales:demarrer --update icp`.

#### `/sales:preparer "compte"` (key fusion point)

Context assembly (orchestrator-injects):
1. Read identity: sales-profile + ICP + voice-dna
2. Query wiki: Grep articles with `entity_type: account|competitor` matching the account
3. Check freshness: flag stale articles, suggest re-research
4. Pull CRM signals (MCP): last emails (Slack), deal notes (HubSpot/Close), call transcripts (Fireflies)
5. Assemble brief: identity + wiki articles + CRM signals + meeting agenda
6. Dispatch prep-master-agent with the brief
7. Save to `output/projects/<deal>/call-prep-YYYY-MM-DD.md`

**If no wiki articles on this account**: proceed with CRM-only data, surface: "Pas d'articles wiki sur ce compte. Lance /sales:recherche 'Nom du compte' pour approfondir."

#### `/sales:recherche "sujet"`

Same pipeline as copywriter:recherche but sales-oriented:
- Agents receive ICP + sales-profile (not just ICP)
- Practitioner + CRM sources weighted higher
- Compiled articles get `entity_type` and `freshness_threshold` in frontmatter
- Content angles replaced by `sales_angles` (objection opportunities, pain point alignments)
- Post-research: "/sales:preparer ou /sales:creer"

#### `/sales:analyser "deal"` (win/loss -> wiki compilation)

1. Collect deal data (CRM via MCP, project folder notes)
2. Dispatch win-loss-analyst-agent
3. Produce root cause analysis (what worked, what didn't, timeline, decision factors)
4. **Ingest** analysis into `raw/notes/YYYY-MM-DD-winloss-<deal>.md` as wiki source
5. **Compile** into wiki articles (updates patterns: recurring objections, winning segments, competitor weaknesses)
6. Archive deal project to `output/projects/.archive/<deal>/`
7. After 5+ analyses, patterns emerge in wiki articles with high confidence

#### `/sales:pipeline`

Reads deal projects from wiki `output/projects/`, enriches with CRM data (HubSpot/Close MCP). Shows:
- Active deals with wiki confidence scores
- Stale deals (no activity >14 days)
- Entity freshness warnings
- Suggested actions per deal

#### `/sales:negocier "deal"`

1. Load deal project WHY.md + objections-log.md
2. Query wiki for win/loss patterns against this competitor/segment
3. Query objection-library + wiki-compiled objection patterns
4. Dispatch deal-desk-advisor with context
5. Produces: negotiation strategy, BATNA analysis, concession map, red lines

#### `/sales:prevoir`

Forecast grounded in wiki confidence:
- Pipeline data from CRM (HubSpot/Close)
- Each deal's wiki confidence score (based on research depth, entity freshness)
- Historical win rates from compiled win/loss articles
- Output: weighted forecast with confidence intervals, not just gut feeling

#### `/sales:creer "type"`

Creates sales assets. Types: `proposal`, `deck`, `email`, `qbr`, `rfp-response`, `battlecard`.
- Reads wiki articles relevant to the client/deal
- Uses proposal-builder, qbr-builder, rfp-shredder, create-an-asset skills
- Cites wiki sources in proposals (ROI data, case studies, competitive advantages)

#### `/sales:coacher`

Routes to coaching sub-modes:
- `email` -> email-coach (review + rewrite)
- `roleplay` -> roleplay-dojo-agent (practice objection handling)
- `feedback` -> sales-coach-agent (review a call transcript or strategy)
All enriched with wiki win/loss patterns.

#### `/sales:linkedin "action"`

Routes: `post` -> linkedin-creator, `engage` -> linkedin-engager, `prospect` -> linkedin-prospector, `plan` -> linkedin-orchestrator. Voice DNA applied. Wiki provides content angles for thought leadership posts.

#### `/sales:bilan`

Wiki status + pipeline status + entity freshness:
- Wiki stats (sources, articles, outputs, last compiled)
- Pipeline summary (active deals, total value, stale deals)
- Entity freshness report (which accounts/competitors need re-research)
- Identity status (sales-profile populated?)
- Suggestions based on state

## 6. Hooks

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

SessionStart only. No PostToolUse hooks (antislop runs inline in commands that generate content: creer, linkedin, prospecter outbound sequences).

## 7. Agent Context Envelopes

| Agent | Receives | Does NOT receive |
|-------|----------|-----------------|
| prep-master-agent | sales-profile + ICP + voice-dna + wiki articles (account + competitor) + CRM signals + meeting context | Other deals, full pipeline |
| outbound-campaign-architect | ICP + wiki competitor articles + outbound templates | Deal data, pipeline |
| pipeline-guardian-agent | sales-profile (quotas) + deal project summaries | Full wiki, call notes |
| deal-desk-advisor | sales-profile + ICP + deal WHY.md + proposal context + wiki win/loss patterns | Other deals |
| roleplay-dojo-agent | voice-dna + ICP + objection library + wiki patterns | Pipeline, CRM |
| sales-coach-agent | voice-dna + email/call to review + wiki win/loss patterns | Pipeline, other deals |
| signal-trapper-agent | ICP + trigger conditions + CRM signals | Full wiki, identity |
| win-loss-analyst-agent | deal project folder + CRM timeline + outcome | Other deals, pipeline |

All `model: sonnet`, `disallowedTools: Edit`. Orchestrator-injects pattern: command assembles the brief, agent receives it self-contained.

## 8. MCP Servers

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

All HTTP, all optional. Authentication via Cowork OAuth (run `/mcp` to connect).

**Graceful degradation**: Every command works without MCP. Missing CRM data is requested manually. Missing enrichment falls back to WebSearch.

**MCP usage by command:**

| Command | MCP servers used |
|---------|-----------------|
| prospecter | Clay, ZoomInfo (enrichment) |
| preparer | HubSpot/Close (deal), Fireflies (transcripts), Slack (threads) |
| pipeline | HubSpot/Close (pipeline data) |
| prevoir | HubSpot/Close (forecast) |
| linkedin | Notion (content ideas) |
| analyser | HubSpot/Close (deal history) |
| creer | MS365 (templates), Atlassian (specs) |
| coacher | Fireflies (call recordings) |

## 9. Token Budget

| Scenario | Identity | Skill | Command | Wiki + MCP | Total |
|----------|----------|-------|---------|------------|-------|
| Quick LinkedIn post | ~200 | ~800 | ~600 | 0 | **~1,600** |
| Call prep with wiki | ~500 | ~900 | ~1,200 | ~3,000 | **~5,600** |
| Deep competitor research | ~200 | ~630 | ~3,000 | ~1,500 | **~5,330** |
| Pipeline review | ~400 | ~800 | ~800 | ~2,000 | **~4,000** |
| Win/loss analysis | ~200 | ~900 | ~1,500 | ~2,000 | **~4,600** |
| Proposal creation | ~500 | ~1,200 | ~1,000 | ~2,500 | **~5,200** |
| Daily briefing | ~200 | ~700 | ~600 | ~1,500 | **~3,000** |

MCP servers are lazy-loaded only by commands that use them. No session-wide MCP overhead.

## 10. Seven Fusion Points

### Fusion 1: Competitive Intel Persistante
Research on competitors persists in wiki. Every call prep against that competitor automatically cites compiled articles.

### Fusion 2: Win/Loss Compiles en Patterns
`/sales:analyser` ingests win/loss into wiki. After 10+ deals, patterns emerge: "Tu perds 80% des deals >50K contre ConcurrentX sur le prix."

### Fusion 3: Call Prep Fonde sur Evidence
`/sales:preparer` assembles wiki articles (account history, sector research, competitor analysis) + CRM signals. Freshness verified.

### Fusion 4: Objection Library Vivante
Objections from each deal are ingested via `/sales:analyser`. Library enriches automatically. Thesis mode validates: "Notre prix est trop eleve pour le mid-market ?"

### Fusion 5: Proposals Fondes sur Recherche
`/sales:creer proposal` cites wiki: ROI chez clients similaires, benchmarks secteur, avantages competitifs documentes. Each claim has a confidence score.

### Fusion 6: Territory Planning par Evidence
Wiki contains research articles per segment. Territory planner cites: "Le secteur fintech a un taux de conversion 2x (source wiki, confiance haute)."

### Fusion 7: Daily Briefing Enrichi
Cross-references CRM signals with wiki articles. "Signal: Acme a leve 50M (Slack). Wiki: ton article montre qu'ils evaluent depuis 3 mois."

## 11. What's NOT Ported

| Feature | Decision | Reason |
|---------|----------|--------|
| Solo ecosystem | Dropped | Self-contained |
| Sentinel integration | Dropped | Over-engineered |
| CLAUDE.md zone system | Replaced by skills | Token efficiency |
| `skills_loading` / `bundles` | Dropped | Not official Cowork field |
| `data/2-Domaines/` PARA | Flattened to `data/` | Simpler |
| `para-organizer` skill | Dropped | PARA removed |
| `wiki-inbox` skill | Dropped | Sales signals come from MCP, not file drops |
| `check-connections` command | Dropped | Cowork handles natively |
| `pipeline-review` command | Merged into `pipeline` | Redundant |
| `call-summary` command | Merged into `preparer` | Same workflow |
| `engage` command | Merged into `prospecter` | Part of prospecting |
| `evals/` directory | Dropped for v1 | Can add later |
| `hacienda-maker.json` | Dropped | Internal tooling |

## 12. Connectors

| Category | Placeholder | Default | MCP Options |
|----------|-------------|---------|-------------|
| CRM | `~~CRM` | Manual notes | HubSpot, Close |
| Enrichment | `~~enrichment` | WebSearch | Clay, ZoomInfo |
| Communication | `~~comms` | Manual | Slack, MS365 |
| Transcription | `~~transcription` | Manual notes | Fireflies |
| Knowledge | `~~knowledge` | Wiki only | Notion, Atlassian |

All optional. Graceful degradation: no MCP = manual input + WebSearch.

## 13. Bilingual Handling

- Commands in French (demarrer, prospecter, preparer, negocier, coacher, prevoir, analyser, bilan, creer, linkedin, recherche, pipeline)
- Output language follows `sales-profile.json > language_preference`
- Default when empty: French
- Anti-slop loads FR or EN reference files per content piece (never both simultaneously)
- Natural language router understands FR + EN patterns

## 14. Edge Cases

### First run (no identity)
- SessionStart reads empty sales-profile.json, defaults French, suggests `/sales:demarrer`
- All commands except `demarrer` and `bilan` check for empty identity and redirect

### No wiki exists
- `preparer`: proceeds with CRM-only data, suggests `/sales:recherche`
- `recherche`: creates wiki on the fly (wiki-creating variant)
- `analyser`: creates wiki on the fly to ingest win/loss
- `pipeline`, `prevoir`, `bilan`: work with CRM data only, note wiki absence
- `negocier`, `coacher`: work with static objection library + CRM, suggest research

### Entity staleness
- Stale articles surfaced as warnings, never block operations
- Threshold configurable per entity_type in frontmatter
- Daily briefing includes freshness report

### Profile re-creation
- `/sales:demarrer` backs up existing profile to `data/sales-profile.previous.json`
- `/sales:demarrer --update icp` re-runs only ICP interview

### Deal lifecycle
- Created by `preparer` or `creer` (first interaction with account)
- Updated by call notes, proposals, objections log
- Archived by `analyser` (win/loss) to `.archive/`
- Archived deals remain queryable (wiki articles compiled from them persist)

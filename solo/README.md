# Solo — The Solopreneur OS

> **A Claude Code & CoWork Plugin**
> Run your entire business from a single Claude conversation.

Solo is a Claude Code plugin for solopreneurs, freelancers, and indie builders. It combines client management, product development, and financial tracking into one coherent system — with background agents that handle routine work automatically. Pair with **copywriter** for content creation.

**Zero setup required.** Works immediately with local Markdown files. Connect MCP integrations to supercharge each workflow.

---

## What Solo Does

| Area | Commands | What you get |
|------|----------|--------------|
| **Build** | `/solo:build` | Full product pipeline: discover → validate → design |
| **Sales** | `/solo:prospect`, `/solo:clients`, `/solo:diagnose` | Prospect research, outreach, pipeline, proposals, lead qualification |
| **Finance** | `/solo:invoice` | Invoices, payment tracking, P&L reporting |
| **Operations** | `/solo:weekly-review`, `/solo:research`, `/solo:plan` | Monday dashboard, market intelligence, PARA organization |
| **Setup** | `/solo:start`, `/solo:check-connections` | Onboard your profile, configure integrations |

---

## 6 Things No Other Plugin Does

**1. Voice DNA** — Run `/solo:start` once. Solo profiles your writing style from your existing content and uses it for every proposal and outreach email. Your output sounds like you, not an AI. Pair with **copywriter** to extend this to blog posts, newsletters, and LinkedIn.

**2. PARA Data Structure** — Every artifact (client cards, invoices, personas, research notes) lands in a structured `data/` folder organized by Projects, Areas, Resources, and Archives. Nothing gets lost. Sessions build on each other.

**3. Background Agents** — Six autonomous agents run without prompting: the Discovery Synthesizer structures your user research; the Invoice Reminder tracks overdue payments daily; the Pipeline Monitor flags cold leads every Wednesday.

**4. Product Build Pipeline** — The only Claude plugin with a codified discover → validate → design workflow. `/solo:build discover` generates personas and problem statements. `/solo:build validate` runs Reddit signal mining and competitor checks. `/solo:build design` produces a PRD, user stories, and a design brief ready for prototyping.

**5. Diagnostic Qualification** — Build a scored lead or client assessment with `/solo:diagnose create`. Publish it as a real Tally form with one command. Responses are pulled back, scored, and routed into your pipeline automatically. No manual scoring, no copy-pasting between tools.

**6. Dual-Mode Design** — Every command runs standalone (no API keys, no configuration). Each has a Supercharged path when you connect MCP integrations for your CRM, inbox, invoicing tool, or search engine.

---

## Key Workflows

### Build Engine

Move from idea to validated, spec-ready design.

- `/solo:build discover` → Persona, customer journey, problem statement
- `/solo:build validate` → Reddit research, competitor gaps, validation checkpoint
- `/solo:build design` → PRD, user stories, design brief

> **Prototype?** Pair with [solo-studio](../solo-studio/README.md) and run `/solo-studio:build` to generate mockups, Figma prototypes, or demo videos from your design brief.

### Sales Pipeline

Manage leads without the overhead of a heavy CRM.

- `/solo:prospect find [company]` → Company deep-dive via Exa
- `/solo:prospect outreach` → AIDA-based personalized email
- `/solo:clients pipeline` → Dashboard of active deals, risk scores, next actions

### Lead Qualification

Stop spending an hour on discovery calls with prospects who were never ready. Solo’s diagnostic system lets you build scored assessments, share them as real Tally forms, and route every result directly into your pipeline — without leaving Claude.

#### How it works

A diagnostic is a set of weighted questions that produces a score from 0 to 100 and a band recommendation (Low / Medium / High). Unlike a survey, it delivers a **verdict with context**: this person is ready for a proposal, this client is at risk, this market signal is real.

You can run diagnostics five ways depending on your situation:

| Type | Use case | Routes to |
|------|----------|-----------|
| **Lead** | Qualify prospects before the first call | Pipeline stage, client card |
| **Client** | Monitor health and early churn signals | Client card `health_score` |
| **Onboarding** | Check readiness before project kickoff | Project log |
| **Product** | Validate market demand with real signal | Build validation results |
| **Self** | Assess your own business, pricing, or positioning | Weekly review |

---

#### Step 1 — Build the diagnostic

```
/solo:diagnose create
```

Claude guides you through 6 steps (~15 minutes):

1. **Purpose** — What decision does this inform? (e.g. “should I send a proposal or nurture first?”)
2. **Dimensions** — 4–6 weighted areas that predict the answer (e.g. Problem Clarity 20%, Pain Acuity 25%, Decision Readiness 30%, Budget Reality 25%)
3. **Questions** — 2–3 multiple-choice questions per dimension, each option scored 0–4
4. **Scoring** — Weighted formula: `score = sum( (dim_raw / dim_max) × dim_weight ) × 100`
5. **Band recommendations** — Three paragraphs written in your voice (Low 0–35 / Medium 36–65 / High 66–100)
6. **Routing** — Where results go in Solo (pipeline stage, client card, project log)

Saved to: `data/2-Domaines/diagnostics/[slug].json`

---

#### Step 2 — Run it (three modes)

**Mode A — Live conversational session**
```
/solo:diagnose run lead-qualifier
```
Claude conducts the session in this conversation — asks questions one at a time, scores answers invisibly, then reveals the result with dimension breakdown and personalized recommendation. Useful when you’re on a call and want to qualify in real time.

**Mode B — Self-service Claude prompt**
```
/solo:diagnose share lead-qualifier --claude
```
Generates a standalone block of text the respondent pastes into their own Claude session. Claude walks them through it and delivers their score. You get results pasted back.

**Mode C — Live Tally form** *(requires `~~forms` connector)*
```
/solo:diagnose share lead-qualifier --tally
```
Claude calls the Tally MCP server and builds the form programmatically — no Tally UI needed. It maps every dimension to a section header, every question to a multiple-choice block, and adds your lead capture fields (name, email, company) at the top. Returns a shareable URL instantly.

```
✓ Tally form published: Is Now the Right Time?
🔗 https://tally.so/r/abc123
```

The `form_id` and `form_url` are written back into the diagnostic’s `.json` automatically. You can have multiple diagnostics, each with its own independent Tally form:

```
data/2-Domaines/diagnostics/
  lead-qualifier-v1.json      → tally.so/r/abc123
  client-health-check.json    → tally.so/r/def456
  onboarding-readiness.json   → tally.so/r/ghi789
```

Create and publish as many as you need with the same flow.

---

#### Step 3 — Pull results back and score them

```
/solo:diagnose results lead-qualifier --tally
```

Claude fetches all submissions from Tally via MCP. Because Tally stores answer text (not score values), the `tally-integration` skill matches each answer back to the scoring table in your `.json` and calculates the weighted score per respondent. New submissions are saved as `.md` files in `data/1-Projets/diagnostics/[slug]/responses/` — skipping any already on file.

```
Fetching submissions from Tally...
✓ 14 total submissions | 6 new since last sync

Scoring and importing 6 new responses:
  → 2026-02-18-thomas-garcia-tally.md   Score: 74 🟢 High
  → 2026-02-19-lisa-park-tally.md        Score: 48 🟡 Medium
  → 2026-02-19-marc-dubois-tally.md      Score: 22 🔴 Low
  [...]

Running analysis on 23 total responses...
```

Run this anytime to sync the latest batch. No webhooks required.

---

#### Step 4 — Routing (automatic)

After scoring, each result is routed based on the `routing` config you set during creation. No manual work.

**Lead diagnostic:**
- Creates or updates a client card in `data/1-Projets/clients/`
- Sets pipeline stage: High → `Proposal`, Medium → `Discovery`, Low → nurture
- Notifies `monday-morning-agent` (surfaces in Monday briefing)
- High band also triggers `client-lifecycle-agent` Prospect → Lead transition

**Client diagnostic:**
- Updates `health_score` on the existing client card
- Score < 40: flags the card with ⚠️ and escalates to `client-lifecycle-agent`

**Onboarding diagnostic:**
- Score < 60: delays kickoff, generates pre-onboarding checklist
- Score appended to project log

**Product diagnostic:**
- Score and dimension breakdown appended to `validation-results.md`
- Feeds `/solo:build validate` decision gate

---

#### Step 5 — Analyze patterns

```
/solo:diagnose results lead-qualifier
```

*(without `--tally` — analyzes all responses already on file)*

After 5+ responses you get score distribution, dimension averages, and ICP signals. After 10+ the patterns become actionable:

```
Score distribution (23 responses):
  🟢 High  (66–100): 8 respondents — 35%
  🟡 Medium (36–65): 11 respondents — 48%
  🔴 Low   (0–35):  4 respondents — 17%

Dimension averages:
  Problem Clarity:    71%  ████████████████████░░░░
  Pain Acuity:        64%  ████████████████░░░░░░░░
  Decision Readiness: 48%  ████████████░░░░░░░░░░░░  ← weakest
  Budget Reality:     55%  ██████████████░░░░░░░░░░

Key finding: Decision Readiness is consistently the weakest dimension.
Your CTA is reaching people too early in their decision process.

→ Adjust medium-band CTA from “book a call” to “download the guide”
→ Add a Timeline question to filter for urgency
```

---

#### Library and setup

```
/solo:diagnose library         # See all diagnostics and their Tally URLs
/solo:check-connections        # Surfaces Tally setup if ~~forms not connected
```

Tally connector setup (one-time):
- **OAuth** (claude.ai): add `https://api.tally.so/mcp` to your MCP servers
- **API key** (Claude Desktop): get key at `tally.so/settings/api-keys`, add to `.mcp.json`

Full setup instructions in `skills/tally-integration/SKILL.md`.

### Financial Office

Stay on top of cash flow with minimal effort.

- `/solo:invoice create` → Professional invoice with auto-numbering (INV-YYYY-NNN)
- `/solo:invoice status` → Overdue tracker with collection rate
- **Auto-Trigger** → Invoice Reminder agent audits and drafts follow-ups daily

### Monday Dashboard

- `/solo:weekly-review` → Revenue summary, pipeline health, content calendar, top 3 priorities

---

## Autonomous Agents

Solo runs 7 background agents that handle the boring stuff:

| Agent | Trigger | What it does |
|-------|---------|--------------|
| **Monday Morning** | Every Monday 9 AM | Business intelligence recap + weekly priorities |
| **Discovery Synthesizer** | After `/solo:build discover` | Synthesizes research into persona + problem statement |
| **Invoice Reminder** | Daily | Audits overdue invoices, drafts follow-up campaigns |
| **Pipeline Monitor** | Every Wednesday | Flags deals with no contact in 14+ days |
| **Client Lifecycle** | On new client added | Sends welcome sequence, preps discovery brief |
| **Weekly Digest** | Every Friday EOD | Compiles summary for Monday review |
| **Diagnostic Monitor** | After each sync | Flags new high-band leads in Monday briefing |

---

## 35 Specialized Skills

Solo loads the right skill for each task automatically — no manual invocation needed:

- **Business identity**: business-profile-creator, voice-dna-creator, icp-creator, positioning-statement, tam-sam-som-calculator
- **Product discovery**: proto-persona, customer-journey-map, problem-statement, user-discovery, idea-test
- **Product design**: prd-development, user-story, design-brief-generator
- **Sales**: draft-outreach, proposal-generator, discovery-call, client-management, sales-pipeline, contract-templates
- **Diagnostics**: diagnostic-builder, diagnostic-runner, diagnostic-analyzer, tally-integration
- **Research**: company-research, exa-search-expert, reddit-research-insights
- **Finance**: invoice-generator, financial-health, pricing-strategy, scope-management
- **Operations**: para-organizer, project-management, weekly-review, pipeline-orchestrator

---

## Command Reference

| Command | Usage | Core skill |
|---------|-------|------------|
| `/solo:start` | Onboard your business profile | `business-profile-creator` |
| `/solo:research` | Deep market & competitor intelligence | `exa-search-expert` |
| `/solo:build` | Product pipeline: discover → validate → design | `pipeline-orchestrator` |
| `/solo:prospect` | Research leads and draft outreach | `draft-outreach` |
| `/solo:clients` | Manage client cards and deal health | `client-management` |
| `/solo:diagnose` | Build, run, and analyze scored assessments | `diagnostic-builder`, `diagnostic-runner` |
| `/solo:invoice` | Billing, tracking, and tax handling | `invoice-generator` |
| `/solo:plan` | PARA file organization and project review | `para-organizer` |
| `/solo:weekly-review` | Comprehensive business dashboard | `weekly-review` |
| `/solo:check-connections` | Diagnose MCP integrations and get tips | — |

---

## Connectors (Standalone → Supercharged)

Every command works standalone with local Markdown files. Connect MCP integrations to unlock live data sync:

| Integration | Default | Alternatives |
|-------------|---------|--------------|
| **CRM** | HubSpot | Pipedrive, Salesforce, Close |
| **Payments** | Stripe | Wave, QuickBooks, FreshBooks |
| **Search** | Exa | Tavily, Google |
| **Files** | Filesystem | Google Drive, Microsoft 365 |
| **Transcription** | Fireflies | Otter.ai, Grain |
| **Social** | LinkedIn MCP | Twitter/X |
| **Calendar** | Microsoft 365 | Google Calendar |
| **Forms** | Tally | Typeform, Fillout |
| **Design + Video** | Figma + Remotion (via solo-studio) | — |

Run `/solo:check-connections` to see which integrations are active.

See [CONNECTORS.md](./CONNECTORS.md) for setup details.

---

## Data Structure (PARA + Memoire)

```
data/
├── 0-Inbox/                    # Raw captures and incoming items
├── 1-Projets/                  # Active work with deadlines
│   ├── clients/                # Client relationship cards
│   ├── invoices/               # INV-YYYY-NNN numbered invoices
│   ├── diagnostics/            # Response files per diagnostic
│   │   └── [slug]/responses/   # One .md per session, scored
│   └── [project]/              # Product builds: persona → PRD → design brief
├── 2-Domaines/                 # Long-term assets
│   ├── diagnostics/            # Definition files ([slug].json)
│   ├── voice-dna.json          # Your writing style profile
│   ├── icp.json                # Ideal customer profile
│   └── business-profile.json   # Rates, services, positioning
├── 3-Ressources/               # Templates and reference materials
├── 4-Archives/                 # Completed work
└── memoire/                    # Business brain: contacts, glossary, history
```

---

## Quick Start

```
/solo:start                              # Set up your business profile (3 min)
/solo:check-connections                  # See which MCP integrations are active
/solo:build discover                     # Start your first product discovery session
/solo:diagnose create                    # Build your first lead qualifier
/solo:diagnose share lead-qualifier --tally  # Publish it as a Tally form
/solo:weekly-review                      # Get your Monday business dashboard
```

---

## Companion Plugins

**[copywriter](../copywriter/README.md)** adds the content creation layer: blog posts, newsletters, LinkedIn posts, and video scripts — all in your Voice DNA. Solo creates the voice profile; copywriter uses it to publish.

**[solo-studio](../solo-studio/README.md)** adds the prototyping phase: Stitch mockups, Figma interactive prototypes, Remotion demo videos, and storyboards. Install both for the complete build → prototype → launch pipeline.

---

## Language Support

Solo works in your language. Claude responds in whatever language you write in. French micro-entrepreneur invoice templates (TVA exonération) are included by default.

---

*Designed for builders, by builders.*

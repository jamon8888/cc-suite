# Comms Strategy — The Strategic Planning OS

> **A Claude Code & CoWork Plugin**
 for brand and integrated communications agencies.**

From client brief to campaign architecture — audience intelligence, messaging, media landscape, measurement, crisis planning, and new business pitching. Bilingual FR/EN. Runs fully standalone, no API keys required.

---

## Who This Is For

| Role | What you'll use it for |
|------|----------------------|
| **Communications strategist** | Annual plans, campaign platforms, message architecture |
| **Account director** | Brief decoding, client meeting prep, pitch leadership |
| **Agency founder** | New business development, pitch production, competitive intelligence |
| **Brand manager (in-house)** | Briefing agencies, auditing their outputs, building internal frameworks |

Works for: PR agencies, brand strategy consultancies, integrated communications agencies, corporate communications teams.

---

## Quick Start (3 minutes)

### Step 1 — Install

Copy the `comms-strategy/` folder into your Cowork plugins directory, or install via the plugin marketplace.

### Step 2 — Set up your agency profile

```
/comms:start
```

A 12-question interview about your agency. Creates your agency profile and scaffolds the full PARA workspace. Takes 3–5 minutes. You only do this once.

### Step 3 — Decode your first brief

```
/comms:brief
```

Paste any client brief (or describe it verbally). Get back a structured Strategic Platform — business challenge, comms challenge, audience definition, insight, idea territory, KPIs — in minutes.

---

## Everything You Can Do

| Command | What you get |
|---------|-------------|
| `/comms:start` | Agency onboarding — profile, PARA workspace, session context |
| `/comms:brief` | Decode a client brief into a full Strategic Platform |
| `/comms:strategy` | Build a complete integrated comms strategy (8-skill pipeline) |
| `/comms:audience` | Deep audience research — segments, portraits, tensions, media behaviours |
| `/comms:campaign` | Design a full campaign — concept, PESO mix, phased activations, timeline, budget |
| `/comms:pitch` | Build a new business pitch end-to-end — research, diagnosis, deck outline |
| `/comms:monitor` | Weekly media and competitive intelligence digest |
| `/comms:measure` | Define your KPI framework — 4-level measurement architecture with dashboard templates |
| `/comms:crisis` | Map risk scenarios, build response protocols, draft holding statements |
| `/comms:sprint` | **Autonomous** — brief in, complete 9-document strategy package out *(see below)* |

---

## The Strategy Sprint (Autonomous Workflow)

The most powerful feature. One command chains all 8 skills automatically.

```
/comms:sprint                              → prompts for brief
/comms:sprint "your brief here"            → processes inline text
/comms:sprint data/0-Inbox/brief-client.md → reads from file
```

**What happens:**

```
Phase 1  Brief analysis          → strategic-platform.md
Phase 2  Audience + Competitive  → audience-portrait.md + competitive-comms-map.md  [parallel]
Phase 3  Media + Stakeholders    → media-landscape.md + stakeholder-map.md          [parallel]

         ⏸️  5-minute checkpoint
         5-line platform summary + 3 strategic assumptions + competitive white space
         Reply "proceed" to continue — or "adjust [item]" to revise before continuing

Phase 4  Message architecture    → message-architecture.md
Phase 5  Campaign strategy       → campaign-brief.md
Phase 6  Measurement framework   → measurement-framework.md
         Sprint summary          → sprint-summary.md
```

**Output**: 9 documents across two PARA folders:

```
data/1-Projets/clients/[client]/      data/1-Projets/campaigns/[campaign]/
  strategic-platform.md                 campaign-brief.md
  audience-portrait.md                  measurement-framework.md
  competitive-comms-map.md
  media-landscape.md
  stakeholder-map.md
  message-architecture.md
  sprint-summary.md
```

**One checkpoint, not zero.** Everything before the checkpoint is research-based and can be generated autonomously. The checkpoint is the strategic direction decision — the one choice only a planner can make — before messaging and campaign work locks in.

**What the checkpoint shows:**
- 5-line platform summary (business challenge, comms challenge, audience archetype, insight, idea territory)
- 3 strategic assumptions with consequences if wrong
- The competitive white space: the angle or channel competitors are not using

**What sprint-summary.md contains:**
After completion, the sprint summary is your navigation document: full file index with one-line descriptions, the 3 strategic bets made (with rationale + validation approach), 5 open questions for the next client meeting, and the recommended presentation order for the strategy review.

**Thin briefs work.** If the brief has gaps, the sprint fills them with hypotheses from web research — every assumption is flagged `[TBC]` and surfaced at the checkpoint and in the summary. You review them before presenting to the client.

**Language override.** Sprint outputs follow the language of the brief. To override: add `[FR]` or `[EN]` at the end.
```
/comms:sprint data/0-Inbox/brief.md [FR]
```

**After the sprint:**
```
/comms:pitch [client]   → If this is a new business pitch
/comms:crisis [client]  → Add crisis planning to the package
```

---

## Key Workflows

### From brief to full strategy

```
Client sends brief
   ↓
/comms:brief         → Strategic Platform decoded, gaps identified
   ↓
[Client meeting to close gaps]
   ↓
/comms:strategy      → Full strategy built: audience, competitive, media,
                       messages, campaign, measurement (8 skills in sequence)
   ↓
Strategy document ready for presentation
```

Or skip directly to:
```
/comms:sprint        → Runs the entire sequence autonomously
```

---

### New business pitch

```
Prospect RFP arrives
   ↓
/comms:pitch         → Research the prospect, build strategic diagnosis,
                       draft recommendation, prepare deck outline
   ↓
pitch-builder-agent  → Auto-assembles the pitch deck (17–20 slides),
                       writes talking points, creates design brief
   ↓
Pass to design team
```

---

### Weekly competitive monitoring

Every Monday at 8:30 AM, the campaign-monitor-agent runs automatically:
- Scans press coverage for all active clients
- Flags competitor moves and new campaigns
- Identifies newsjacking opportunities
- Delivers a `weekly-intelligence-[date].md` to your projects folder

No prompt needed. Just check the file Monday morning.

---

## Your Workspace (PARA File Structure)

After `/comms:start`, your `data/` folder looks like this:

```
data/
├── 0-Inbox/                      Drop new briefs here for triage
│
├── 1-Projets/                    Active client work
│   ├── clients/
│   │   └── [ClientName]/
│   │       ├── strategic-platform.md
│   │       ├── audience-portrait.md
│   │       ├── message-architecture.md
│   │       ├── media-landscape.md
│   │       ├── competitive-comms-map.md
│   │       ├── stakeholder-map.md
│   │       ├── crisis-playbook.md
│   │       └── sprint-summary.md
│   ├── campaigns/
│   │   └── [CampaignName]/
│   │       ├── campaign-brief.md
│   │       └── measurement-framework.md
│   └── pitches/
│       └── [ProspectName]/
│           ├── pitch-brief.md
│           ├── pitch-deck-final.md
│           └── commercial-proposal.md
│
├── 2-Domaines/                   Agency-level (ongoing)
│   ├── agency-profile.md         ← Created by /comms:start
│   ├── brand-voice-charter.md    ← Created by brand-voice-auditor
│   ├── media-contacts/
│   └── voice-guidelines/
│
├── 3-Ressources/                 Reference materials
│   ├── templates/
│   ├── case-studies/
│   └── research/
│
└── 4-Archives/                   Completed campaigns + closed pitches
    ├── campaigns/
    └── pitches/
```

Use `/comms:para` to triage your Inbox and organize files automatically.

---

## Skills (10 Modules)

Skills load progressively — only what your task needs, when you need it.

| Bundle | Priority | Skills | What they produce |
|--------|----------|--------|------------------|
| **agency-foundations** | Always loaded | brief-analyzer, audience-intelligence, stakeholder-mapper | Strategic platform, audience portrait, stakeholder map |
| **creative-strategy** | Load on demand | message-architecture, campaign-strategy, brand-voice-auditor | Message hierarchy, campaign brief, voice charter |
| **intelligence** | Load on demand | media-landscape, competitive-comms | Media map + editorial calendar, competitive intelligence |
| **agency-ops** | Load on demand | comms-measurement, crisis-planner, para-organizer | KPI framework, crisis playbook, file organization |

---

## Agents (3 Autonomous Workers)

| Agent | Color | When it runs | What it does |
|-------|-------|-------------|-------------|
| **briefing-synthesizer-agent** | Blue | After `/comms:brief` | Audits platform completeness, removes gaps, generates client-ready version + meeting prep questions |
| **campaign-monitor-agent** | Cyan | Every Monday 8:30 AM | Scans press + competitive activity for all active clients → weekly intelligence digest |
| **pitch-builder-agent** | Green | After `/comms:pitch` | Assembles full pitch deck (17–20 slides), writes talking points, creates design brief |
| **strategy-sprint-agent** | Purple | Triggered by `/comms:sprint` | Orchestrates the full 8-skill strategy pipeline autonomously |

---

## Language

The plugin is fully bilingual. Output language follows your input:

- Brief written in French → all outputs in French
- Brief in English → all outputs in English
- Set explicitly: add `[FR]` or `[EN]` at the end of any command

Language preference is saved in your agency profile after `/comms:start`.

---

## Works Best With

| Plugin | What you gain |
|--------|-------------|
| **sentinel** | Decision quality checking at key strategic moments — pressure-tests your platform, message pillars, and campaign concept before client presentation |
| **copywriter** | Your message architecture feeds directly into content creation — posts, newsletters, and blog articles stay on-strategy |
| **solo** | Connects client management, invoicing, and pipeline to your comms work — agency ops in one place |
| **management-consulting** | Adds deep strategic frameworks (Five Forces, PESTLE, 7S) to your strategy documents |

Sentinel integration is built in: if Sentinel is installed, it offers decision quality checks at the 6 most critical strategic moments (brief decoding, message pillar drafting, campaign concept, pitch diagnosis, crisis mapping, KPI finalisation). Non-blocking — always your choice whether to run it.

---

## Connected Tools

See [CONNECTORS.md](CONNECTORS.md) for the full integration guide.

**Standalone** (no connections needed): all commands work with web search and local files.

**Supercharged with**:
- Exa — deep semantic search for audience research and competitive intelligence
- LinkedIn MCP — prospect research and media contact discovery
- Cision / Meltwater — real-time media monitoring for campaign-monitor-agent
- Google Analytics / GA4 — live data for measurement frameworks

---

## File Naming Convention

Files written by the plugin follow this pattern:

```
[YYYY-MM]_[TYPE]_[client-or-topic].md

Examples:
  2026-02_BRIEF_renault-repositioning.md
  2026-02_STRAT_renault-comms-platform.md
  2026-02_CAMP_renault-spring-launch.md
  2026-02_PITCH_sncf-brand-refresh.md
```

---

## Anti-Slop Built In

Every document the plugin writes is reviewed for hollow communications jargon. The following phrases are flagged and replaced with specific, evidence-based language:

`innovative` · `disruptive` · `best-in-class` · `leverage` · `synergy` · `holistic` · `cutting-edge` · `transformative` · `360°` · `multi-touchpoint` · `brand journey` · `resonates` (without specifying audience)

---

## Version

`1.0.0` — Initial release

**Built with**:
- Context engineering best practices: progressive skill loading, file system handoffs, zone-structured CLAUDE.md
- PARA methodology adapted for communications agency workflows
- Bilingual FR/EN throughout

---

*For issues or contributions, open a discussion in the repository.*

---
description: "Build a full integrated communications strategy — from brief to annual plan, covering audience, messaging, channels, phasing, and measurement."
argument-hint: "[client name] [year or campaign period]"
allowed-tools: Read, Write, Glob, Search, Skill
model: sonnet
---

# /comms:strategy — Integrated Communications Strategy

> If you see unfamiliar placeholders or need to check which tools are connected, see [CONNECTORS.md](../CONNECTORS.md).

Orchestrates the complete strategic planning process — pulling from all comms-strategy skills to produce a full communications strategy document. From client brief to annual plan, ready for client presentation.

## Usage

```
/comms:strategy
/comms:strategy "Acme Corp" "2026"
/comms:strategy "Brand X" "Q3 campaign"
```

---

## Strategy Build Sequence

```
                        /comms:strategy
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
    brief-analyzer    audience-intelligence  competitive-comms
    (if not done)     (audience portrait)   (competitive map)
          │                   │                   │
          └───────────────────┼───────────────────┘
                              ▼
                     stakeholder-mapper
                     (engagement matrix)
                              │
                              ▼
                      media-landscape
                      (PESO media map)
                              │
                              ▼
                    message-architecture
                    (message house)
                              │
                              ▼
                    campaign-strategy
                    (PESO channel mix + phasing)
                              │
                              ▼
                    comms-measurement
                    (KPI framework)
                              │
                              ▼
                   STRATEGY DOCUMENT
                   (saved to client folder)
```

---

## How It Works

### Phase 1: Foundation Check

Check if prerequisite work exists for the named client:

```
Read data/1-Projets/clients/[client]/strategic-platform.md
Read data/1-Projets/clients/[client]/audience-portrait.md
Read data/1-Projets/clients/[client]/competitive-comms-map.md
```

If files exist → use them as input.
If files don't exist → run the relevant skill/command first and gather input.

Inform the user which modules are being built from scratch vs. pulled from existing files.

### Phase 2: Brief Analysis

If `strategic-platform.md` doesn't exist:
- Ask the user to provide the client brief
- Run `brief-analyzer` skill
- Generate the Strategic Platform

If it exists: summarise the Strategic Platform and confirm with user before proceeding.

### Phase 3: Audience Intelligence

If `audience-portrait.md` doesn't exist:
- Ask: "Who is the primary target audience? I'll build a full portrait."
- Run `audience-intelligence` skill
- Generate audience portrait

If it exists: display the audience summary and confirm.

### Phase 4: Competitive and Media Landscape

If `competitive-comms-map.md` doesn't exist:
- Ask: "Who are the top 3–4 competitors to monitor?"
- Run `competitive-comms` skill in parallel with `media-landscape`

### Phase 5: Stakeholder Map

Ask: "Are there key institutional, internal, or B2B stakeholders to include? (e.g., regulators, employee groups, channel partners, investors)"

Run `stakeholder-mapper` skill based on brief + audience inputs.

### Phase 6: Message Architecture

Run `message-architecture` skill:
- Build message house from Strategic Platform + audience insights + competitive white space
- Define 3–5 pillars with RTBs
- Map adaptations by audience and context

### Phase 7: Campaign Architecture

Run `campaign-strategy` skill:
- Translate strategy into campaign concept
- Define PESO channel mix
- Build 3-phase activation plan
- Develop key activation ideas

### Phase 8: Measurement Framework

Run `comms-measurement` skill:
- Define KPIs at all 4 levels
- Set baselines
- Define reporting cadence

---

## Strategy Document Output

Compile all outputs into `data/1-Projets/clients/[client]/comms-strategy-[year].md`

**Document structure:**

```markdown
# Communications Strategy: [Client] — [Year/Period]

**Prepared by**: [Agency name from agency-profile.md]
**Date**: [Date]
**Status**: [Draft / For review / Final]

---

## Executive Summary
[1-page summary for senior stakeholders — 5 bullet points max]

## 1. Strategic Foundation
- Business challenge
- Communications challenge
- Strategic platform summary

## 2. Audience Intelligence
- Primary audience portrait
- Secondary audience portrait (if applicable)
- Key audience tension / insight

## 3. Competitive Landscape
- Competitive comms summary
- Share of voice snapshot
- White space opportunities

## 4. Stakeholder Map
- Priority stakeholder matrix
- Engagement approach summary

## 5. Media Landscape
- PESO ecosystem map
- Key media / editorial calendar

## 6. Message Architecture
- Brand narrative
- Message pillars (3–5)
- Audience adaptations

## 7. Campaign Architecture
- Campaign concept
- Channel mix (PESO)
- 3-phase activation plan
- Key activations

## 8. Measurement Framework
- KPI scorecard (4 levels)
- Baseline data
- Reporting cadence

## 9. Budget Framework
- Recommended allocation by PESO
- Budget split rationale

## 10. Timeline
- Master calendar (month by month)
- Key milestones

## Appendices
- Full audience portrait
- Full message architecture
- Full competitive map
- Full media landscape
```

After generating, ask:

> "Strategy document saved. Would you like me to:
> - Prepare a client presentation version (executive summary + key slides)?
> - Develop the campaign brief in more detail?
> - Build the pitch deck for new business?"

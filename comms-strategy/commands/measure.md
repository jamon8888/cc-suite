---
name: comms:measure
description: "Define a communications measurement framework — KPIs by funnel level and PESO channel, baselines, targets, and reporting templates."
argument-hint: "[campaign or client name]"
allowed-tools: Read, Write, Glob, Search
model: sonnet
---

# /comms:measure — Measurement Framework

> If you see unfamiliar placeholders or need to check which tools are connected, see [CONNECTORS.md](../CONNECTORS.md).

Builds a rigorous measurement framework for any communications campaign or programme — translating comms objectives into KPIs at all 4 levels, establishing baselines, and defining reporting cadence and dashboard templates.

Uses the `comms-measurement` skill.

## Usage

```
/comms:measure
/comms:measure "Brand X Q3 campaign"
/comms:measure data/1-Projets/campaigns/acme-launch/campaign-brief.md
```

---

## Measurement Build Flow

### Step 1: Load Campaign Context

Read:
- `data/1-Projets/clients/[client]/strategic-platform.md` (for objectives)
- `data/1-Projets/campaigns/[campaign]/campaign-brief.md` (for channels and KPIs)

If not found → ask for:
1. Campaign objective (what must this campaign achieve?)
2. Target audience
3. Channels in the mix (PESO)
4. Timeline (campaign period)
5. Available measurement tools (Cision / Meltwater / GA / native analytics)
6. Client's existing brand tracking data (if any)

### Step 2: Define the 4-Level KPI Set

Apply `comms-measurement` skill:
- Level 1: Activity (reach, press hits, SOV, engagement)
- Level 2: Perception (awareness, consideration, sentiment)
- Level 3: Behaviour (traffic, sign-up, search lift, referral)
- Level 4: Business impact (revenue attribution, NPS, market share)

Require at least one KPI at each level. If Level 4 KPIs aren't in scope, document why and how Level 3 proxies will indicate business impact.

### Step 3: Establish Baselines

For each KPI:
- Current value (baseline period: last 3 months / prior campaign)
- Source of the baseline data
- Data quality rating (High = verified data / Medium = estimate / Low = no data)
- Target value + target rationale

If baselines don't exist → design a pre-campaign measurement sprint to establish them.

### Step 4: Build the Dashboard Template

Generate the reporting dashboard template appropriate to the campaign:
- Campaign dashboard (weekly, during campaign)
- Mid-campaign review template
- End-of-campaign report template

### Step 5: Define Data Sources Map

| KPI | Tool | Owner | Frequency | Automated? |
|-----|------|-------|-----------|-----------|
| Press hits | Cision / manual | Agency | Daily | No/Yes |
| Social reach | Platform native | Agency | Weekly | No |
| Website traffic | Google Analytics | Client / Agency | Weekly | Yes |
| Brand awareness | Brand tracker | Client research team | Pre/post | No |
| SOV | Meltwater | Agency | Monthly | Yes |

### Step 6: Attribution Notes

Address the attribution question:
- How is comms contribution to business outcomes claimed?
- What attribution model is in use? (Last click / Multi-touch / Marketing mix modelling)
- What is the agreed boundary between comms attribution and other marketing attribution?

---

## Output Files

Save to `data/1-Projets/campaigns/[campaign]/measurement-framework.md`

After generating, offer:

```
Measurement framework saved. Next:

→ /comms:campaign     Link this framework back to the campaign brief
→ [Dashboard setup]   I can create a live tracking template in your preferred format
→ [Mid-campaign]      I can schedule a mid-campaign review using this framework
```

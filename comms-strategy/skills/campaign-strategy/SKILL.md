---
name: campaign-strategy
description: >
  This skill should be used when the user asks to "build a campaign strategy", "campaign
  architecture", "design an integrated campaign", "stratégie de campagne", "plan de
  campagne", or "campaign brief". Designs integrated multi-channel campaign architectures
  with PESO channel mix, phased activation plans, and measurement frameworks.
---

# Skill: Campaign Strategy

Translates a Strategic Platform into a fully designed campaign — with a big idea, an integrated PESO channel mix, a phased activation plan, and a measurement framework. Outputs the Campaign Brief that can be handed to creative, media, and production teams.

## When to Use

- After `brief-analyzer` has produced a Strategic Platform
- After `message-architecture` has defined the messaging hierarchy
- When a client needs a full integrated campaign plan
- When responding to an RFP or building a new business pitch
- When designing a product launch, brand campaign, or PR push

---

## Campaign Architecture Process

### Step 1: Translate Strategy into Campaign Concept

The campaign concept is the **creative expression** of the strategic insight. It is:
- Rooted in the insight from the Strategic Platform
- Bigger than any single execution (it can live across all channels)
- Expressible as a thought, not a tagline

**Concept development framework:**

```
Insight: [The human truth from the Strategic Platform]
         ↓
Reframe: [How the brand uniquely interprets that truth]
         ↓
Concept: [The creative territory — expressed as a thought, a tension, or an action]
         ↓
Line:    [The campaign line — optional, if the concept needs a verbal anchor]
```

**Test the concept:**
- Can it work in a 30-second film? ✓/✗
- Can it work as a press story? ✓/✗
- Can it work as a social content series? ✓/✗
- Can it work as a live experience? ✓/✗
- Would it still feel like the same campaign in all these formats? ✓/✗

If the answer to the last question is no, the concept is too executional — go broader.

### Step 2: Design the PESO Channel Mix

For each channel, define its **strategic role** (not just "we'll post on Instagram"):

| Channel | Role | Content type | Audience | KPI | Budget allocation |
|---------|------|-------------|---------|-----|------------------|
| **PAID** | | | | | |
| Social advertising | | | | | |
| Display / Programmatic | | | | | |
| Influencer paid | | | | | |
| Sponsored content | | | | | |
| **EARNED** | | | | | |
| Press / Media | | | | | |
| Organic social | | | | | |
| Reviews / UGC | | | | | |
| **SHARED** | | | | | |
| Brand social accounts | | | | | |
| Community / Forum | | | | | |
| Partner channels | | | | | |
| **OWNED** | | | | | |
| Website / Landing page | | | | | |
| Email / Newsletter | | | | | |
| Podcast / Content series | | | | | |
| Events | | | | | |

**Channel role vocabulary:**
- **Ignition** — Creates awareness and conversation (typically Paid + Earned)
- **Amplification** — Extends reach once momentum exists (typically Shared + Paid)
- **Conversion** — Moves audience to action (typically Owned + Paid)
- **Retention** — Sustains relationship post-campaign (typically Owned + Shared)

### Step 3: Define Campaign Phases

Most integrated campaigns run in 3 phases. Adapt to campaign duration and type:

#### Phase 1: IGNITION (Weeks 1–4)
**Objective**: Create awareness and generate conversation
- Lead channel: [typically Earned media + Paid launch ads]
- Key activation: [the hero execution that launches the campaign]
- Earned media hook: [the newsworthy angle that justifies press coverage]
- Social signal: [what gets shared — the sticky, social-native element]
- KPIs: Reach, Share of Voice, Press hits

#### Phase 2: AMPLIFICATION (Weeks 3–8, overlaps with Ignition)
**Objective**: Extend reach, build understanding, invite participation
- Lead channel: [typically Social + Influencer + Content]
- Key activation: [content series, influencer partnerships, events]
- Audience engagement mechanic: [how does the audience participate, not just watch?]
- KPIs: Engagement rate, Content consumption, Audience growth

#### Phase 3: CONVERSION & SUSTAIN (Weeks 6–12+)
**Objective**: Drive action and sustain brand preference
- Lead channel: [typically Owned + Paid retargeting]
- Key activation: [CTA mechanics, offers, loyalty play]
- Measurement: [link between comms exposure and commercial outcome]
- KPIs: Conversion, retention, NPS, brand consideration

### Step 4: Develop Key Activations

For each phase, propose 2–3 concrete activations:

```markdown
## Activation: [Name]

**Phase**: [Ignition / Amplification / Conversion]
**Channel**: [Primary channel]
**Mechanic**: [What happens / what the audience does]
**Why it works**: [Link back to insight and concept]
**Production requirements**: [What needs to be created]
**Budget range**: [High / Medium / Low — or specific if known]
**Risk level**: [High / Medium / Low + reason]
**Lead time**: [How long to produce]
```

### Step 5: Build the Timeline

```
Week 1  │ Pre-launch: Production complete, media relationships briefed
Week 2  │ LAUNCH: Hero activation goes live, press release issued
Week 3  │ Press coverage window, social seed content live
Week 4  │ Influencer activations, first performance review
Week 5–6│ Amplification: content series, community engagement
Week 7–8│ Mid-campaign review, optimisation
Week 9+ │ Conversion phase, retargeting, sustain content
EoC     │ End-of-campaign report, learnings captured
```

### Step 6: Budget Framework

If budget is known, allocate across the PESO mix:

| Category | % of budget | Amount | Rationale |
|---------|------------|--------|-----------|
| Production (creative, video, content) | 30–40% | | |
| Paid media | 30–40% | | |
| Influencer partnerships | 10–20% | | |
| Events / activation | 10–15% | | |
| PR (agency fees + events) | 10–15% | | |
| Contingency | 5–10% | | |

Note: Ratios vary significantly by campaign type (brand vs. performance vs. PR-led).

---

## Campaign Brief Output Template

Save to `data/1-Projets/campaigns/[campaign-name]/campaign-brief.md`

```markdown
# Campaign Brief: [Campaign Name]

**Client**: [Client name]
**Brand**: [Brand / Product]
**Date**: [Date]
**Campaign Period**: [Start → End]
**Budget**: [Total if known]

## Strategic Foundation
- Business Challenge: [from Strategic Platform]
- Communications Challenge: [from Strategic Platform]
- Target Audience: [Primary + Secondary]
- Insight: [from Strategic Platform]

## Campaign Concept
- Idea Territory: [from Strategic Platform]
- Campaign Concept: [Developed concept]
- Campaign Line: [Optional tagline]
- Tonality: [3 adjectives from Strategic Platform]

## Message Architecture
- Master Message: [from message-architecture]
- Supporting Messages: [Pillars by channel]

## Channel Mix
[PESO table from Step 2]

## Phasing
[Phase summary from Step 3]

## Key Activations
[Activation cards from Step 4]

## Timeline
[Visual timeline from Step 5]

## Budget Allocation
[Budget framework from Step 6]

## Measurement Framework
- Campaign KPIs: [from comms-measurement skill]
- Reporting cadence: [Weekly / Fortnightly / Monthly]
- Success definition: [What winning looks like]

## Mandatories & Constraints
[From brief]

## Open Questions
[Anything still needing client confirmation]
```

---

## Integration Points

- **Receives from**: `brief-analyzer`, `message-architecture`, `audience-intelligence`, `media-landscape`
- **Feeds into**: `comms-measurement`, creative brief, media plan
- **Triggered by**: `/comms:campaign`, `/comms:strategy`, `/comms:pitch`

---

## Earned Media Hook Generator

The most common failure in campaign strategy is launching without a clear answer to: **"Why will a journalist write this story?"**

Before finalising the campaign architecture, complete this template:

### The Earned Media Hook

```
STORY BRIEF FOR JOURNALISTS

Headline (what the article will say): [Write as if it's already published]
Why NOW: [What makes this story newsworthy in March 2026 specifically?]
The tension/conflict: [What's the surprise, reversal, or controversy?]
The human angle: [Who is this really about — not the brand, the person]
The data/proof: [What exclusive number, study, or reveal do we have?]
The dissenting voice: [Who might disagree — and is that a problem or an opportunity?]
Target publication: [Name 3 specific publications + the specific journalist]
```

**Earned hook archetypes by campaign type:**

| Campaign type | Hook archetype | Example |
|--------------|---------------|---------|
| Product launch | "The unexpected insight that led to this" | "We discovered X% of users do Y in a way no one expected" |
| Brand relaunch | "What the data revealed that forced us to change" | "After 10 years, our own customers showed us we were wrong about X" |
| Sustainability / CSR | "The uncomfortable truth about the category" | "Every [brand] in France produces X. Here's why we're the first to stop." |
| B2B thought leadership | "The counter-intuitive finding from our data" | "Companies that do X actually perform 30% worse — our 5-year study" |
| Crisis recovery | "The before and after — what we changed" | "We failed. Here's exactly what we did differently." |

**Rule:** If you cannot complete this template with specific answers, the campaign does not have an earned media strategy — it has a paid media strategy pretending to have PR.


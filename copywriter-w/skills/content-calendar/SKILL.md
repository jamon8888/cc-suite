---
name: content-calendar-planner
description: "Use this skill when the user asks to 'plan my content for [month]', 'build a content calendar', 'what should I post', 'content strategy', 'launch content plan', or 'editorial calendar'. Builds a strategic narrative from Awareness to Conversion using the Cascade model. Adapts trust-building depth to ticket price. Distinguishes evergreen from topical content. Produces KPIs per phase."
model: sonnet
---

# Content Calendar Planner

The "Editor-in-Chief" of your content operation. Designs a strategic narrative that moves your audience from Awareness to Conversion using the Pillar-Cluster (Cascade) model — calibrated to your offer price and audience temperature.

## Step 0: Offer Calibration

Before planning content, classify the offer to determine how much trust-building is required:

| Ticket | Trust depth needed | CTA progression |
|--------|-------------------|-----------------|
| < €200 | Minimal — 2-3 touchpoints | Can move to soft CTA in week 2 |
| €200–€999 | Moderate — 4-6 touchpoints | Soft CTA in week 3, hard CTA week 4 |
| €1000–€5000 | High — 6+ touchpoints before any pitch | Week 1-2: pure value, Week 3: social proof, Week 4: invitation |
| > €5000 / B2B | Very high — direct CTA is rarely the close | All content routes to "book a call" or "apply", never to a buy button |

**Rule for high-ticket:** Asking for a sale in week 1 with a €3000 offer destroys trust. The calendar must EARN the right to pitch. Content months 1-2 should contain zero direct sales messages.

## Step 1: Load Strategic Context

- **Business Goals**: `data/business-profile.json` — what is being sold, offer type
- **Audience**: `data/icp.json` — pain points, vocabulary, trust barriers
- **Voice**: `data/voice-dna.json` — format matches style
- **Constraints**: Frequency per platform, team size, primary channel

## Step 2: Monthly Belief Goal

Ask: *"What one belief should the audience hold at month end that they don't hold today?"*

This is the editorial spine. Every piece of content either builds toward or reinforces this belief. If you can't name the belief shift, you don't have a strategy — you have a schedule.

## Step 3: Evergreen vs Topical Split

Before generating topics, classify them:

| Type | Definition | Placement |
|------|-----------|-----------|
| **Evergreen** | Relevant in 12 months. Foundational ideas. | Write first — becomes the Hero asset |
| **Topical** | Tied to news, season, trend. Expires. | Fill gaps — never anchors the calendar |
| **Perennial** | Evergreen but needs updating annually (data, examples) | Mark for review date |

**Rule:** Hero assets must be evergreen or perennial. Never anchor the calendar on a trend piece that expires.

## Step 4: The Cascade Architecture

```
HERO (1x/week or bi-weekly)
└── Long-form blog, newsletter, or YouTube video
    └── Answers a core question the ICP has
    └── Optimised for search or shares

SPLINTERS (2-3x/week, 24-48h after Hero)
└── LinkedIn post / Twitter thread / Instagram carousel
    └── One idea from the Hero, reframed for platform
    └── Different angle — not a summary

SIGNALS (Daily or 5x/week)
└── Short observations, questions, reactions
    └── Pure relationship-building, no selling
    └── Easiest to create — lowest stakes
```

## Step 5: Content Mix Check

| Category | Target | What it does |
|---------|--------|-------------|
| **Value** (how-to, insight, framework) | 40% | Builds authority and trust |
| **Proof** (case study, result, testimonial) | 30% | Reduces risk, builds credibility |
| **Personal** (story, opinion, behind-scenes) | 20% | Builds relationship, humanises |
| **Sales** (soft or direct CTA) | 10% | Converts — only when trust is earned |

**For high-ticket offers:** Sales = 0% for first 6-8 weeks. Redistribute to Value (50%) + Proof (35%) + Personal (15%).

## Step 6: Assemble the Calendar

```
Week [N] — Theme: [Belief being built]

MON: [Hero] — [Title/Angle] | Type: [Evergreen/Topical] | Format: [Blog/Newsletter/Video]
TUE: [Splinter 1] — [Platform: LinkedIn] — [Angle from Hero]
WED: [Signal] — [Platform: Twitter/LinkedIn] — [Short observation]
THU: [Splinter 2] — [Platform: Instagram/Twitter] — [Different angle from Hero]
FRI: [Signal or Curation] — [Platform] — [Resource share + opinion]

CTA level this week: [None / Soft / Direct]
Trust-building phase: [Awareness / Consideration / Decision]
```

## Step 7: Phase KPIs

Each phase of the calendar has measurable success indicators:

| Phase | Weeks | Primary KPI | Secondary KPI |
|-------|-------|-------------|--------------|
| **Awareness** | 1–2 | Reach / Impressions | Follower growth |
| **Consideration** | 3–4 | Saves / Shares / CTR | Email signups |
| **Conversion** | 5–6 | Click-to-offer rate | Booked calls / Purchases |
| **Retention** | Ongoing | Replies / DMs / Testimonials | Churn rate (email unsubscribes) |

**Minimum measurement setup:** Track at least one KPI per phase. A calendar with no measurement is a production schedule, not a strategy.

## Step 8: Production Queue

After generating the calendar, output a production to-do list:

```
PRODUCTION QUEUE — [Month]

MUST WRITE FIRST (Hero assets — evergreen):
□ [Title] — [Format] — [Deadline: DD/MM]

SPLINTERS (can batch after Hero is done):
□ [Post title] — [Platform] — [Day]

SIGNALS (generate in batches of 5):
□ [Batch description] — [Platform]

RECYCLE (evergreen from archive):
□ [Old piece] → [New angle] — [Platform]
```

---

## Output

Markdown table grid + production to-do list. See `references/strategy.md` for extended Cascade Architecture templates and anti-patterns.

---

## Integration Points

- **Receives from**: `voice-dna-creator`, `icp-creator`, `business-profile-creator`
- **Feeds into**: All content skills via `{{calendar.this_week_theme}}`
- **Triggered by**: `/copywriter:plan`

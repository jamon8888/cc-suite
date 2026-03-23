---
name: comms-measurement
description: >
  Use this skill when the user asks about "KPIs", "measurement framework", "how do we
  measure success", "comms ROI", "indicateurs de performance", "tableau de bord",
  "campaign measurement", "what metrics should we track", "is our PR working",
  "attribution", or "reporting dashboard". Also trigger when a brief sets vague objectives
  like "increase awareness" without defining baselines, targets, or measurement methodology.
  Always produce targets benchmarked against sector norms, not invented aspirationally.
---

# Skill: Comms Measurement

Translates business and communications objectives into a structured measurement framework — KPIs by funnel stage and PESO channel, baselines, realistic targets calibrated against sector benchmarks, and a clear methodology for attribution. Ensures comms is accountable to business outcomes, not just activity metrics.

## Core Principle

**Activity ≠ Results.** Most agencies report Level 1 metrics (impressions, press hits, followers) and call it measurement. This skill insists on all four levels, with explicit methodology for attribution and sector-calibrated targets.

---

## The 4-Level Framework

```
Level 4: BUSINESS IMPACT
└── Revenue, market share, NPS, CAC, retention rate
    Attribution: partial — comms claims contribution with caution

Level 3: AUDIENCE BEHAVIOUR
└── Website visits, sign-ups, trial, purchase, search lift, referral
    Attribution: direct — UTM, promo codes, brand search volume

Level 2: AUDIENCE PERCEPTION
└── Brand awareness (aided/unaided), consideration, preference, sentiment, recall
    Attribution: survey pre/post + media weight correlation

Level 1: COMMS ACTIVITY
└── Reach, impressions, press hits, SOV, engagement, followers
    Attribution: direct — platforms and monitoring tools
```

**Rule:** Every campaign must have at least one KPI at each level. If Level 2 measurement (perception) is missing because "we don't have budget for a brand tracker," flag this as a **measurement gap that invalidates the campaign's learning value**.

---

## Step 1: Map Objectives to Metrics

| Comms Objective | Level | KPI | Method | Target | Baseline |
|----------------|-------|-----|--------|--------|---------|
| [Objective from Platform] | [1–4] | [Specific metric] | [Tool/methodology] | [Number] | [Current state] |

---

## Step 2: Sector Benchmarks

**Never set targets without referencing sector norms.** Use these calibration tables:

### Brand Awareness Benchmarks (France, annual campaign)

| Category | Typical unaided awareness gain per €100k media | Notes |
|----------|------------------------------------------------|-------|
| FMCG mass market | +1–3 pp | Large existing base, heavy competition |
| FMCG premium / bio | +2–4 pp | More targeted, less noise |
| B2C tech / app | +3–6 pp | Higher shareability, younger audience |
| B2B enterprise | +2–5 pp among target audience | Very narrow target, longer cycles |
| Luxury | +0.5–2 pp | Slow burn, exclusivity limits reach |
| NGO / associatif | +4–8 pp | Earned media leverage, cause resonance |

> **Example calibration:** A FMCG bio brand spending 400k€ over 6 months targeting 25-40 ans can realistically expect +2–4 pp unaided awareness. A target of +6 pp requires either higher spend, exceptional earned media, or a viral moment — flag if set without justification.

### Social Media Benchmarks (organic, 2026)

| Platform | Avg engagement rate | Good rate | Exceptional |
|----------|--------------------|-----------|-----------  |
| LinkedIn (brand) | 1.5–2.5% | >3% | >6% |
| Instagram (brand) | 0.5–1.5% | >2% | >4% |
| TikTok (brand) | 3–6% | >8% | >15% |
| Twitter/X (brand) | 0.3–0.8% | >1% | >2% |
| Facebook (brand) | 0.1–0.5% | >1% | >2% |

### Earned Media Benchmarks

| KPI | Realistic for 6-month campaign, 60k€ PR budget |
|-----|------------------------------------------------|
| Tier 1 press articles (Les Echos, Le Monde) | 3–8 |
| Tier 2 press articles (trade press) | 15–30 |
| Total earned reach (all press) | 2M–15M potential impressions |
| Key message penetration | >50% of articles carry ≥1 KM |
| Positive/neutral sentiment | >80% |

### Email Marketing Benchmarks (France, B2B vs B2C)

| Metric | B2B | B2C |
|--------|-----|-----|
| Open rate | 22–35% | 18–28% |
| Click rate | 3–6% | 2–4% |
| Unsubscribe rate | <0.5% | <0.8% |

---

## Step 3: Vanity Metrics Identification

Flag these in every measurement framework as **not sufficient for evaluation:**

| Metric | Why it's a vanity metric | Better alternative |
|--------|------------------------|-------------------|
| Total impressions | Includes accidental views, no intent signal | Unique reach + frequency |
| Follower count | Bought, inherited, inactive — means nothing | Engagement rate, % active followers |
| "Viral" post (one spike) | Doesn't persist in brand memory | SOV trend over 3 months |
| AVE (Advertising Value Equivalent) | Discredited, arbitrary, misleading | Audience reach + message penetration + sentiment |
| Number of press releases sent | Activity, not impact | Press articles published / articles pitched |
| App downloads (without retention) | Zombie users inflate numbers | D7 retention, MAU/DAU ratio |

> **AVE policy:** AVE is formally deprecated. Replace with: (Audience reach of publication × estimated % who read the article) + sentiment score + key message penetration rate.

---

## Step 4: Attribution Methodology

**The hardest problem in comms measurement.** Choose the right method for each campaign:

| Method | Best for | Limitation |
|--------|----------|------------|
| **UTM + conversion tracking** | Digital campaigns, direct response | Only tracks clicks — misses brand impact |
| **Pre/post survey** | Awareness and perception shifts | Expensive; other variables confound |
| **Brand search lift** | Brand campaigns with significant spend | Only works with reach scale; search intent varies |
| **Geo-split test** | Large brand campaigns (national vs control region) | Requires regional media buying |
| **Media mix modelling (MMM)** | Long-term brand investment | Requires 2+ years of data, expensive |
| **Self-reported (survey)** | Qualitative validation only | Recall bias, social desirability |

**For most mid-size campaigns:** Combine UTM tracking (Level 3) + pre/post awareness survey (Level 2) + media monitoring for message penetration (Level 1). This triangulates sufficiently.

**Attribution claim language:**
- ✓ "The campaign contributed to a +X pp increase in awareness, measured via pre/post survey. Other factors (seasonal, product) also in play."
- ✗ "Our campaign generated +X pp awareness." (overclaims causality)

---

## Step 5: Reporting Cadence

| Report | Frequency | Audience | Contents |
|--------|-----------|----------|---------|
| Live monitoring | Daily (campaign period) | Campaign team | SOV, social performance, press alerts |
| Weekly dashboard | Weekly | Agency + client comms director | L1–L2 KPIs, anomalies |
| Mid-campaign review | Mid-point | Client marketing director | Full scorecard, optimisation recommendations |
| End-of-campaign | End | Full stakeholder group | All 4 levels, attribution claims, learnings |
| Annual comms review | Yearly | CMO / CEO | Long-term brand metrics, strategic re-assessment |

---

## Dashboard Template

```markdown
# Campaign Measurement Dashboard: [Campaign Name]
Reporting period: [Dates] | Prepared by: [Agency]

## Executive Summary
Status: [On track / Needs attention / Exceeded targets]
Key win this period: [1 sentence]
Key concern this period: [1 sentence]

## KPI Scorecard

| KPI | Level | Target | Current | vs Baseline | Status |
|-----|-------|--------|---------|-------------|--------|
| [KPI 1] | L1 | | | | 🟢/🟡/🔴 |
| [KPI 2] | L2 | | | | 🟢/🟡/🔴 |
| [KPI 3] | L3 | | | | 🟢/🟡/🔴 |

## Earned Media
Press hits: [N] | Top placement: [Title + reach]
Key message penetration: [%] | Sentiment: [%P/%N/%Nt]

## Paid & Social
Reach: [N] | Engagement rate: [%] | Best content: [Description]

## Owned
Traffic: [+/-% vs baseline] | Newsletter: OR [%] / CTR [%]

## Vanity Metrics (for reference only — not evaluated)
Total impressions: [N] | Follower growth: [N] — not used for success assessment

## Attribution Note
[Describe what was measured how, and what causal claims are supportable]

## Optimisation Recommendations
1. [Action on underperforming area]
2. [Amplify overperforming area]
```

---

## Output

Save to `data/1-Projets/campaigns/[campaign]/measurement-framework.md`

Structure:
1. **Measurement Architecture** — 4-level KPI set
2. **PESO KPI Dashboard** — Targets with sector-benchmarked baselines
3. **Vanity Metrics Watchlist** — What NOT to optimise for
4. **Attribution Methodology** — How causal claims are structured
5. **Reporting Templates** — Dashboard per report type
6. **Data Sources Map** — Where every number comes from

---

## Integration Points

- **Receives from**: `brief-analyzer` (KPIs), `campaign-strategy` (channels), `audience-intelligence` (segments)
- **Feeds into**: Campaign reports, annual reviews, new business pitches
- **Triggered by**: `/comms:measure`, `/comms:strategy`, `/comms:campaign`

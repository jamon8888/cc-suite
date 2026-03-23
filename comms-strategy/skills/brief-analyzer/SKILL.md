---
name: brief-analyzer
description: >
  Use this skill when the user wants to "analyze a brief", "decode the brief",
  "build a strategic platform", "what does the client want", "brief analysis",
  "analyse le brief", or "extract the comms strategy from a brief". Also trigger
  whenever a brief arrives unstructured, is missing KPIs, sets an audience as broad
  demographics, or sets objectives without budget calibration. Detects brief pathologies,
  decodes B2B and B2C briefs, always produces a Strategic Platform + Brief Interrogation.
---

# Skill: Brief Analyzer

Transforms an unstructured client brief into a rigorous **Strategic Platform** — the single source of truth from which all campaign work flows. Detects brief pathologies, surfaces hidden strategic questions, proposes hypothetical territories when data is missing, and handles both B2B and B2C contexts.

## When to Use

- At the start of any engagement when a brief arrives
- Before `/comms:strategy`, `/comms:campaign`, or `/comms:pitch`
- When a brief is ambiguous, incomplete, or contradictory
- When briefing a creative team and they need strategic clarity

---

## Step 1: Detect the Brief Pathology First

Before building the platform, classify the brief type. This shapes how aggressively to challenge it.

| Pathology | Symptom | Response |
|-----------|---------|---------|
| **Kitchen Sink** | Multiple products, audiences, channels, objectives in one brief | Prioritise: one audience, one product, one message, one campaign |
| **Vanity Brief** | Deliverables listed before strategy (video, event, influencers) | Reverse: strategy first, then justify channels |
| **Feature Brief** | Lists product features, not audience problems | Reframe: what job does this product do for someone? |
| **Awareness Brief** | KPI = awareness with no conversion objective | Challenge: awareness for what? What behaviour after awareness? |
| **Circular Brief** | Business challenge = comms objective (increase sales by increasing awareness) | Surface the real barrier: why aren't people buying? |
| **B2B Monolith** | Audience defined as a job title (DAF, DSI) without role distinction | Decompose: buying committee roles, motivations, buying cycle |
| **Budget Mismatch** | Deliverables incompatible with stated budget | Flag with market-calibrated estimates and ask for correction |

---

## Step 2: The Strategic Platform

```
┌─────────────────────────────────────────────────────────────────────┐
│                      STRATEGIC PLATFORM                             │
├────────────────────┬────────────────────────────────────────────────┤
│ BRAND              │ [Client + product/service]                     │
│ DATE               │ [Date received]                                 │
│ CAMPAIGN TYPE      │ [Launch / Sustained / Event / Crisis / CSR...] │
│ BRIEF TYPE (B2B/B2C)│ [+ Pathology detected, if any]                │
├────────────────────┴────────────────────────────────────────────────┤
│ BUSINESS CHALLENGE                                                  │
│ The commercial problem this campaign must solve. Anchored in        │
│ numbers where possible. Not a comms objective — a business one.     │
├─────────────────────────────────────────────────────────────────────┤
│ COMMUNICATIONS CHALLENGE                                            │
│ Format: "We need to shift [audience] from [X] to [Y]."             │
│ X and Y are thinking/feeling/doing states — not brand goals.       │
├─────────────────────────────────────────────────────────────────────┤
│ TARGET AUDIENCE                                                     │
│ Primary: [One segment — demographic anchor + psychographic note]   │
│ Secondary: [If applicable]                                          │
│ B2B: buying roles + decision-maker identified                       │
├─────────────────────────────────────────────────────────────────────┤
│ INSIGHT                                                             │
│ Format: "[Audience] want [X] but [tension/contradiction]."         │
│ Test: Is this functional or identity tension? Name it.             │
│ Test: Would the audience recognise this AND feel slightly exposed? │
├─────────────────────────────────────────────────────────────────────┤
│ IDEA TERRITORY                                                      │
│ The conceptual space where executions live. A space, not a line.   │
│ Even if insight is incomplete: propose 2 hypothetical territories  │
│ with the caveat "to validate with client research."                │
├─────────────────────────────────────────────────────────────────────┤
│ MASTER MESSAGE                                                      │
│ What we want the audience to think/feel/do. Derived from insight.  │
│ Not from product features. Passes Slop Guard test.                 │
├─────────────────────────────────────────────────────────────────────┤
│ REASONS TO BELIEVE (max 3)                                          │
│ Proof points. Specific, not general. Preferably with numbers.      │
├─────────────────────────────────────────────────────────────────────┤
│ TONALITY                                                            │
│ 3 adjectives max. Always paired with a NOT: "Inspiring but NOT..."|
├─────────────────────────────────────────────────────────────────────┤
│ DELIVERABLES                                                        │
│ [What the client asked for — without validating it yet]            │
├─────────────────────────────────────────────────────────────────────┤
│ SUCCESS METRICS (KPIs)                                              │
│ [Quantified, time-bound. If missing: flag and propose hypotheses]  │
├─────────────────────────────────────────────────────────────────────┤
│ BUDGET / TIMELINE                                                   │
│ Budget: [stated] | Reality check: [market calibration]             │
│ Timeline: [stated] | Reality check: [production feasibility]       │
├─────────────────────────────────────────────────────────────────────┤
│ MANDATORY CONSTRAINTS                                               │
│ [Legal, brand, regulatory, tone constraints explicitly stated]     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Step 3: B2B Specific Layer

For B2B briefs, add this section after the standard platform:

```
B2B LAYER

Buying committee:
[Who is involved in the decision? Economic buyer / technical buyer / user buyer / champion / gatekeeper]

Primary comms target:
[Which role should communications prioritise? Usually the Champion or User Buyer, not the Economic Buyer]

Buying cycle:
[Typical length — weeks, months, quarters. What stage is the audience currently at?]

Incumbent advantage:
[Are they switching from a known provider? If yes, switching cost is the real barrier — not product features]

Internal politics:
[Who loses influence if this is implemented? That person is an opponent — identify them]
```

---

## Step 4: The Real Why (Sutherland)

Apply to every insight before accepting it:

```
REAL WHY ANALYSIS

Level 1 — What does the audience say they want?
Level 2 — Why do they want that?
Level 3 — What problem are they actually solving?
Level 4 — What would embarrass them to admit is the real driver?
Level 5 — What are they afraid of?

→ The insight lives at Level 4 or 5 — not at Level 1.
```

If Level 4–5 is inaccessible from the brief, flag it as a gap. Do not accept a Level 1 motivation as the insight.

---

## Step 5: Idea Territory — Always Propose, Even Hypothetically

Even when data is insufficient, propose **2 hypothetical territory directions** with caveats:

```
TERRITORY HYPOTHESIS (to validate)

Territory A: [Conceptual space — rich, not executional]
Rooted in: [Audience insight + brand truth]
What it allows: [List 3 executions possible in this territory]
Risk: [What could go wrong with this direction]

Territory B: [Alternative conceptual space]
Rooted in: [Different aspect of insight or different brand truth]
What it allows: [3 executions]
Risk: [What could go wrong]

→ Recommended: [A or B] because [rationale]
→ To validate: [What we need to learn from client/research before committing]
```

---

## Step 6: Brief Interrogation

```markdown
## Brief Interrogation

### Red Flags
- [Flag 1]: [Why it matters + what to ask]
- [Flag 2]: ...

### Budget Reality Check
[Calibrate stated budget vs market rates for stated deliverables]
Example: TV production + media buy minimum = €150–300k. Stated budget = €80k. → Either reduce scope or increase budget.

### Strategic Hypotheses
- If [assumption] is true → [strategic implication]
- If [assumption] is false → [alternative direction]

### Questions for Client — Prioritised
1. [Most critical — blocks all work until answered]
2. [Second priority]
3. [Nice to have]

### Recommended Next Steps
1. [e.g., Run audience-intelligence on primary segment]
2. [e.g., Run competitive-comms to validate territory hypothesis]
3. [e.g., Schedule strategic briefing to close top 3 gaps]
```

---

## Integration Points

- **Feeds into**: `message-architecture`, `audience-intelligence`, `campaign-strategy`
- **Triggered by**: `/comms:brief`, `/comms:strategy`
- **Saves to**: `data/1-Projets/clients/[client]/strategic-platform.md`

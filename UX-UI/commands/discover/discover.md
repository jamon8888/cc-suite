---
name: discover
description: Run a full discovery investigation using all available connectors. Aggregates signals from ~~user feedback, ~~chat, and ~~product analytics, checks the ~~knowledge base for prior research, scores the hypothesis, and recommends next actions. Use when you want to investigate a problem area before committing to design or development work.
argument-hint: "<hypothesis, feature area, or user problem to investigate>"
tools: []
---

# /discover

Investigate: @$1

**Invoke `feedback-mining`, `analytics-discovery`, and `research-repository` skills. Use all available connectors.**

---

## Discovery protocol

Run all steps that have a connected tool. Skip steps where the tool is not connected, and note the gap at the end.

### Step 1 — Prior research check
**Requires**: `~~knowledge base`

Query the research repository for prior studies on this topic. If relevant prior research found and recent (< 12 months), surface it and stop here unless there's a clear gap.

→ Uses `research-repository` Protocol 1.

### Step 2 — Feedback mining
**Requires**: `~~user feedback` and/or `~~chat`

Run the full feedback-mining protocol against Intercom and/or Slack.
- Classify signals by type (pain / wish / workaround / confusion / comparison)
- Extract top 5 signals by volume
- Identify segment concentration
- Generate 2–3 discovery hypotheses

→ Uses `feedback-mining` skill — full cross-connector aggregation format.

### Step 3 — Quantitative validation
**Requires**: `~~product analytics`

Run funnel analysis and feature adoption audit for the relevant area.
- Identify funnel drops > 20% in affected flow
- Flag low-adoption features related to the problem
- Check trend direction (improving / stable / degrading)

→ Uses `analytics-discovery` methods 1 and 2.

### Step 4 — Hypothesis scoring
Combine signals from all available sources into a scored hypothesis.

→ Uses `analytics-discovery` hypothesis scoring table (0–18).

### Step 5 — Recommended next action

| Score | Recommendation |
|-------|---------------|
| 0–6 | Weak signal. Monitor. Set a reminder to re-check in 30 days. |
| 7–12 | Moderate signal. Run `/research-synthesis` on extracted data. |
| 13–18 | Strong signal. Run `/interview-ops` to set up a research sprint. |

---

## Output

```markdown
## Discovery Brief: [Hypothesis / Topic]
**Date**: [today] | **Sources used**: [list]

### Prior research
[Found / Not found — summary if found]

### Feedback signal summary
[Top signals, segment concentration, discovery hypotheses]

### Analytics signal summary
[Funnel drops, adoption gaps, trend]

### Hypothesis score: [X/18]
[Table with dimension scores]

### Recommendation
[Action + rationale]

### Gaps (tools not connected)
[What we couldn't check and what it means for confidence]
```

---
name: feedback-mining
description: Extract structured discovery signals from existing support and communication data — without running new research. Activates when ~~user feedback (Intercom) or ~~chat (Slack) is connected and the user wants to understand user problems, prioritize features, identify segments, or build a discovery brief from what they already have. Trigger phrases include "what are users complaining about", "mine our support data", "what does feedback say about X", "find patterns in our tickets", "what are users asking for".
---

# Feedback Mining

This skill teaches Claude how to actively interrogate `~~user feedback` and `~~chat` MCP connectors to extract discovery signals — structured problem evidence you can act on — from data that already exists. No new research required.

**This is not synthesis.** Synthesis (`research-synthesis` skill) processes data you bring. Feedback mining *goes and retrieves* the data, classifies it, and surfaces patterns. The output feeds directly into `/research-synthesis` or `/discover`.

---

## When to use this vs new research

| Situation | Use feedback mining | Run new research |
|-----------|--------------------|-----------------:|
| You want to know *what* users complain about | ✓ | |
| You want to know *why* they feel that way | | ✓ |
| You're scoping a discovery sprint | ✓ | |
| You need to validate a hypothesis before building | ✓ (first pass) + | ✓ (confirm) |
| You need behavioral evidence, not opinions | → see `analytics-discovery` | |
| You have no tickets, no Slack, no feedback data | | ✓ |

Rule of thumb: mine first, research second. Don't spend 3 weeks on interviews if 400 Intercom tickets already answer the question.

---

## Signal taxonomy

Classify every piece of feedback into exactly one signal type before aggregating. Never mix types in the same cluster.

| Signal type | Definition | Example |
|-------------|-----------|---------|
| **Pain** | User reports something broken, missing, slow, confusing | "I can't export to PDF" / "This keeps crashing" |
| **Wish** | User explicitly requests a feature or change | "Would love a bulk action" / "Please add dark mode" |
| **Workaround** | User describes how they hack around a missing capability | "I export then reimport to achieve X" |
| **Confusion** | User is lost, misunderstands a concept, uses wrong mental model | "I thought clicking X would do Y" |
| **Comparison** | User references a competitor or prior tool positively | "In [Competitor] you could just…" |
| **Compliment** | User praises something specifically | Keep these — they reveal what not to touch |

Workarounds and Comparisons are the highest-value signals for discovery: they reveal *specific unmet needs with a clear solution direction*, not just vague dissatisfaction.

---

## Intercom (`~~user feedback`)

### Discovery query protocol

Run queries in this order. Each query narrows the signal surface progressively.

**Step 1 — Volume scan (what topics have critical mass)**
```
Query: search conversations by tag or topic keyword
Goal: identify topics with >10 conversations — these are candidates for discovery
```
Topics to always scan: [main feature areas of the product] + "export" + "import" + "slow" + "broken" + "missing" + "how do I" + "can't find"

**Step 2 — Segment scan (who is experiencing it)**
```
Query: filter conversations by user segment, plan tier, or company size
Goal: is this pain concentrated in a specific segment or universal?
```
Discovery signal strength is proportional to segment specificity. "Power users on Pro plan can't do X" is a stronger signal than "some users want X."

**Step 3 — Recency filter (is it getting worse)**
```
Query: same topic, filter last 30 days vs last 90 days
Goal: is conversation volume growing? Declining? Stable?
```
Growing signal = urgent. Declining signal = possibly self-resolved or already addressed.

**Step 4 — CSAT / NPS cross-reference**
```
Query: pull low-CSAT conversations (score ≤ 2) and find common topics
Goal: identify which issues create the most dissatisfaction (not just the most volume)
```
High volume + low CSAT = P0 discovery candidate.

### Output format per Intercom query

```markdown
## Feedback Mining: [Topic] — Intercom
**Date range**: [X] | **Conversations analyzed**: [N] | **Segment filter**: [if any]

### Signal distribution
| Signal type | Count | % of total |
|-------------|-------|-----------|
| Pain | | |
| Wish | | |
| Workaround | | |
| Confusion | | |
| Comparison | | |

### Top 5 signals by volume
1. **[Signal]** — [N occurrences] — [Segment if identifiable]
   Representative quote: "[verbatim]"

### Workarounds identified (highest priority)
- [Workaround description] → implies: [missing capability]

### Segment concentration
- [Segment A]: [N conversations, % of total signal]
- [Segment B]: ...

### CSAT impact
Conversations on this topic average CSAT: [X/5]
Below-average CSAT topics: [list]

### Discovery hypotheses generated
- H1: [Users in segment X can't do Y, causing them to Z]
- H2: ...
```

---

## Slack (`~~chat`)

Slack is where *internal* signal lives — sales call notes, customer success friction, team observations, and unfiltered customer quotes shared in real time. It's not a substitute for Intercom but it surfaces signal Intercom misses: things users say in calls but never ticket.

### Channels to mine for discovery

| Channel pattern | Signal type | Value |
|----------------|-------------|-------|
| `#feedback`, `#user-feedback`, `#customer-feedback` | Direct user quotes | Very high |
| `#sales`, `#sales-calls` | Prospect objections, competitive comparisons | High |
| `#customer-success`, `#cs-notes` | Onboarding friction, churn signals | High |
| `#bugs`, `#bug-reports` | Pain signals, reproducible issues | Medium |
| `#product`, `#product-feedback` | Internal team observations | Medium |
| `#support` | Volume + escalation patterns | Medium |

### Query protocol

**Step 1 — Keyword sweep across high-value channels**
```
Search for: [feature name] OR "can't" OR "broken" OR "missing" OR "wish" OR "customers keep asking" OR "competitor"
Channels: #feedback #customer-success #sales
Date range: last 90 days
```

**Step 2 — Surface internal consensus signals**
Internal team members often share the same customer pain repeatedly. A customer success manager saying "I keep getting asked about X" in 5 different threads is a strong signal.
```
Search for: "keep getting asked" OR "everyone wants" OR "every customer" OR "pattern I'm seeing"
```

**Step 3 — Extract competitor mentions**
```
Search for: [Competitor names] OR "compared to" OR "in [Competitor]" OR "switch" OR "churned"
```
Every competitor mention is a comparison signal. Cluster them by feature dimension.

**Step 4 — Sales objection mining**
```
Search: "they said" OR "customer said" OR "prospect said" OR "they need" OR "blocker"
Channels: #sales #sales-calls
```
Sales objections that are unsolved after 3+ mentions are discovery candidates.

### Output format per Slack query

```markdown
## Feedback Mining: [Topic] — Slack
**Channels scanned**: [list] | **Date range**: [X] | **Messages analyzed**: [N]

### Internal signal patterns
- [Pattern] — mentioned [N] times, contributors: [roles]
  Example thread: "[quote]" — @[role], #[channel]

### Competitor mentions
| Competitor | Feature dimension | Sentiment | Frequency |
|-----------|------------------|-----------|-----------|
| [Name] | [What they do better] | Negative for us | [N] |

### Sales objections with no current solution
1. [Objection] — [N occurrences] — blocks deal: [yes/unknown]

### Discovery hypotheses generated
- H1: ...
```

---

## Cross-connector aggregation

When both Intercom and Slack are available, run both protocols and merge findings into a single discovery brief using this structure:

```markdown
## Discovery Brief: [Topic / Feature Area]
**Generated**: [date]
**Sources**: Intercom ([N] conversations) + Slack ([N] messages)

### Problem statement
[1–2 sentences: who has the problem, what is it, what is the impact]

### Evidence strength
| Dimension | Score (1–5) | Notes |
|-----------|-------------|-------|
| Volume | | Total occurrences across sources |
| Segment specificity | | Is it concentrated or diffuse? |
| Workaround presence | | Users finding hacks = real unmet need |
| CSAT impact | | Does it drive dissatisfaction? |
| Internal consensus | | Do CS/Sales confirm independently? |
| Competitor pressure | | Is a competitor solving this? |
**Total evidence score**: [X/30]

### Top hypotheses
H1: [Hypothesis — falsifiable statement about user need]
H2: ...

### Recommended next step
- Score < 15: Monitor — not enough signal yet
- Score 15–22: Run `/research-synthesis` on extracted data before investing in interviews
- Score > 22: Discovery sprint warranted — run `/discover` to plan the full investigation
```

---

## Anti-patterns (what to avoid)

- **Recency bias**: Mining only last 7 days misses structural patterns. Always compare 30-day vs 90-day windows.
- **Volume as proxy for importance**: A feature requested by 50 enterprise accounts is more valuable than one requested by 500 free tier users. Always segment.
- **Ignoring silence**: If a topic has zero tickets, it may mean users have given up, not that they're satisfied. Cross-check with analytics drop-off.
- **Treating all wishes equally**: "Add dark mode" (cosmetic wish) ≠ "I can't use your product on mobile" (blocker). Signal type and CSAT impact determine priority.
- **Mining without a question**: Don't mine blindly. Always start with a specific discovery question and query against it.

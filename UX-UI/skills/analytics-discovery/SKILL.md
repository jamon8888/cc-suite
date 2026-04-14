---
name: analytics-discovery
description: Use product analytics data to identify discovery opportunities quantitatively. Activates when ~~product analytics (Amplitude, Mixpanel, Heap, FullStory) is connected and the user wants to find where users drop off, which features are underused, which segments behave differently, or validate whether a problem is worth solving. Trigger phrases: "where are users dropping off", "which features aren't being used", "show me the funnel", "validate this hypothesis with data", "is this problem big enough", "find opportunities in the data".
---

# Analytics Discovery

This skill teaches Claude how to use `~~product analytics` to drive discovery decisions quantitatively. Analytics answers questions that qualitative research can't: *how many users*, *which segments*, *when exactly*, and *how often*.

**This skill is about problem identification, not solution validation.** A/B testing and experiment analysis belong to a different phase. This skill covers the discovery phase: finding where the product fails users at scale.

---

## The discovery questions analytics can answer

Before querying, map each discovery question to the analytic method that answers it.

| Discovery question | Analytic method |
|-------------------|-----------------|
| Where do users give up? | Funnel analysis |
| Which features are unused despite high discoverability? | Feature adoption rate |
| Which users retain the most? What do they have in common? | Retention cohort analysis |
| Is this problem getting worse over time? | Trend analysis |
| Is this segment experiencing it more than others? | Segmented funnel or retention |
| Is there a behavioral pattern before churn? | Churn predictor / path analysis |
| Where do users go when they can't complete a task? | Path analysis / rage click detection |

Never start a query without knowing which question you're answering. Exploratory browsing of dashboards is not discovery — it produces noise, not hypotheses.

---

## Method 1 — Funnel analysis (find abandonment)

The highest-yield discovery method. Every significant funnel drop is either a design problem, a value proposition problem, or an onboarding problem — all are discovery candidates.

### Protocol

**Step 1**: Define the funnel as the sequence of events for a complete user task.
```
Example: Signup → Onboarding step 1 → Onboarding step 2 → First core action → Second session
```

**Step 2**: Query conversion rate at each step. Look for drops > 20% between consecutive steps.

**Step 3**: For each significant drop (> 20%):
- Segment the drop: does it affect all users equally, or is it concentrated?
- Compare conversion over time: is it stable, improving, or degrading?
- Cross-reference with qualitative: is there a corresponding ticket cluster in Intercom?

**Step 4**: Classify each drop as one of:
- **Friction drop** — user intends to complete the step but something blocks them (design problem → `/wireframe`)
- **Value drop** — user doesn't understand why they should complete the step (copy/positioning problem → `/ux-copy`)
- **Motivation drop** — user understands but doesn't care enough (product-market fit problem — warrants user interviews, not just a design fix)

### Output format

```markdown
## Funnel Analysis: [Funnel name]
**Date range**: [X] | **User segment**: [All / filtered]

| Step | Users entering | Conversion | Drop |
|------|---------------|------------|------|
| [Step 1] | [N] | 100% | — |
| [Step 2] | [N] | [X%] | [Y%] |
| [Step 3] | [N] | [X%] | [Y%] ← flag if > 20% |

### Significant drops flagged
**Drop at Step [N→N+1]**: [X%] drop — [N] users lost per [period]

Segment breakdown:
- [Segment A]: [X%] conversion (vs [Y%] average)
- [Segment B]: [X%] conversion

Trend (30-day): [Improving / Stable / Degrading]
Qualitative cross-reference: [Matching Intercom signal? Y/N — topic]

**Classification**: [Friction / Value / Motivation drop]
**Recommended action**: [Design fix / Copy fix / User interview to understand why]
```

---

## Method 2 — Feature adoption rate (find invisible features)

Low adoption of a discoverable feature is a signal. It means either the feature doesn't match user mental models, the entry point is wrong, or the value proposition isn't communicated.

### Protocol

**Step 1**: Pull adoption rate for each feature: % of active users who have used the feature at least once in the last 30 days.

**Step 2**: For features with adoption < 20% of MAU:
- Check if it's a new feature (< 60 days old) — low adoption may be expected
- Check discoverability: is it behind a nav item users reach? Is it surfaced in onboarding?
- Check if power users adopt it disproportionately — if so, it may be correctly scoped to a segment

**Step 3**: For features with high discoverability but low adoption:
- This is a discovery signal, not just a metric. Ask: is the feature solving a real problem users actually have?
- Flag for user interview: "Do users know this exists? Do they want to do this task at all?"

### Output format

```markdown
## Feature Adoption Audit
**Date range**: Last 30 days | **Base**: [MAU]

| Feature | Adoption rate | Trend | Discoverability | Flag |
|---------|--------------|-------|-----------------|------|
| [Feature A] | [X%] | ↑ | High | — |
| [Feature B] | [X%] | → | High | ⚠ Low adoption, high discoverability |
| [Feature C] | [X%] | ↓ | Low | May be hidden — check entry point |

### Discovery candidates (low adoption, high discoverability)
**[Feature B]**: [X%] adoption despite prominent placement.
- Power user segment adoption: [Y%] (vs [X%] average)
- Interpretation: [feature is niche / feature doesn't match mental model / value unclear]
- Recommended action: [user interview to test mental model / copy audit / reconsider scope]
```

---

## Method 3 — Retention cohort analysis (find the activation moment)

Retention cohorts reveal which behaviors correlate with users who stay. The gap between high-retention and low-retention cohorts is a discovery opportunity: users who *don't* do the high-retention behavior are a problem to solve.

### Protocol

**Step 1**: Pull N-day retention by cohort (week of signup is typical). Identify cohorts with significantly higher Day-7 and Day-30 retention.

**Step 2**: Compare the behavioral profile of high-retention vs low-retention cohorts in their first session:
- Which features did high-retention users use in session 1 that low-retention users didn't?
- Did high-retention users complete a specific sequence of steps?

**Step 3**: The delta between the two groups is the **activation hypothesis** — the behavior that, if you get more users to do it, should improve retention.

**Step 4**: Validate the hypothesis direction: is there a design or onboarding intervention that could increase the rate of this behavior? If yes, this is a `/wireframe` or `/flow` problem. If the behavior requires external motivation (change in user's context), it may be a positioning problem.

### Output format

```markdown
## Retention Cohort Analysis
**Cohort window**: [Weekly / Monthly] | **Retention measured at**: Day 1 / Day 7 / Day 30

| Cohort | Day 1 | Day 7 | Day 30 | Profile |
|--------|-------|-------|--------|---------|
| [Week A] | [X%] | [X%] | [X%] | Baseline |
| [Week B] | [X%] | [X%] | [X%] | High retention |

### Activation hypothesis
Users in high-retention cohorts who did **[Action X]** in session 1:
- Day-7 retention: [Y%] (vs [Z%] for users who didn't)
- Day-30 retention: [Y%] (vs [Z%])

**Hypothesis**: Getting more users to [Action X] in session 1 will improve Day-30 retention by approximately [delta]%.

**Intervention type**: [Onboarding flow redesign / Feature discoverability / Empty state prompt]
**Recommended action**: `/flow [onboarding journey]` to redesign the activation path
```

---

## Method 4 — Path analysis (find the real behavior)

What do users actually do, vs what we designed them to do? Path analysis reveals navigation patterns, backtracking, dead ends, and unexpected routes.

### Protocol

**Step 1**: Pull top entry → exit paths for the screen or flow in question.

**Step 2**: Identify:
- **Backtracking loops**: users returning to the same screen more than once in a session = confusion signal
- **Unexpected exits**: users leaving from screens that aren't designed as exit points
- **Unexpected paths**: common routes that don't match the designed happy path

**Step 3**: For FullStory-type tools with session recording, cross-reference with rage clicks (rapid repeated clicks on an element) and dead clicks (clicks on non-interactive elements users expected to be interactive).

### Output format

```markdown
## Path Analysis: [Screen / Flow name]

### Top 5 paths from [entry screen]
1. [Screen A → B → C → success] — [X%] of sessions
2. [Screen A → B → A → B → C → success] — [X%] ← backtracking loop
3. [Screen A → exit] — [X%] ← unexpected drop

### Anomalies flagged
- **Backtracking on [Step]**: [X%] of sessions revisit [Screen] before proceeding — confusion signal
- **Rage clicks on [Element]**: [N] sessions — users expect [Element] to be interactive
- **Dead exit at [Screen]**: [X%] of users who reach [Screen] leave the product — unfinished state

### Discovery implication
[Element / step] is a friction point not captured in funnel conversion. Recommend `/wireframe [Screen]` to redesign with these behavioral patterns as constraints.
```

---

## Hypothesis scoring (connect analytics to decision)

After running one or more analytic methods, score the discovery hypothesis before deciding to invest in interviews or design work.

```markdown
## Hypothesis: [Statement]
e.g. "Users on the free plan cannot complete [core task] without hitting a friction point at [step]"

| Evidence dimension | Score (0–3) | Source |
|-------------------|-------------|--------|
| Funnel drop > 20% at relevant step | | ~~product analytics |
| Feature adoption < 20% for related feature | | ~~product analytics |
| Matching Intercom ticket cluster (> 10 tickets) | | ~~user feedback |
| Internal Slack signal confirmed by CS/Sales | | ~~chat |
| Segment concentration (not universal) | | ~~product analytics |
| Trend: getting worse over last 30 days | | ~~product analytics |

**Total**: [X/18]

Decision:
- 0–6: Weak signal. Monitor. Do not invest in interviews.
- 7–12: Moderate signal. Run `/research-synthesis` on existing data first.
- 13–18: Strong signal. Discovery sprint warranted. Run `/discover`.
```

---

## What analytics cannot tell you

Analytics answers *what* and *how many*. It cannot answer *why*. Never make design decisions based on analytics alone.

| Analytics shows | Analytics does NOT show |
|----------------|------------------------|
| Users drop at step 3 | Why they drop at step 3 |
| Feature X has 8% adoption | Whether users want feature X |
| Segment A retains 3× better | What segment A values that others don't |
| Users backtrack on screen Y | What confused them on screen Y |

Every strong analytics signal warrants a qualitative follow-up: at minimum, `/research-synthesis` on feedback data; for > 13/18 hypothesis score, user interviews (`research-ops` skill for logistics).

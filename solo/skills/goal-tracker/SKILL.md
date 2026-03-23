---
name: goal-tracker
description: >
  Use this skill when the user says 'set goals', 'quarterly goals', 'OKR', 'track progress',
  'how are we doing vs goals', 'goal review', 'Q[N] objectives', or 'plan the quarter'.
  Transforms Solo from a rear-view mirror (what happened) into a windshield (are we moving
  toward what we decided). Goals feed weekly-review, monday-morning-agent, and business-health-agent.
---

# Skill: Goal Tracker

## STEP 0 — LOAD CURRENT GOALS

```
READ data/2-Domaines/goals/current-quarter.json
READ data/2-Domaines/team.json → mode, members
```

If no goals file exists: "No quarterly goals set yet. Let's create them — takes 5 minutes."

## STEP 1 — SET QUARTERLY GOALS

**Trigger**: "set Q[N] goals", "plan the quarter", "create OKRs"

Ask for up to 5 goals. For each goal, capture:

```
Title: [What you want to achieve — specific]
Type: revenue | client | product | personal | team
Metric: [How you'll measure it — one number or milestone]
Target: [The number or milestone to hit]
Deadline: [End of quarter or specific date]
Owner: [member_id if team mode — defaults to "owner"]
```

Goal types and their auto-linking:
| Type | Auto-links to | Tracked via |
|------|-------------|------------|
| `revenue` | financial-health MRR | invoice data |
| `client` | client cards | client count |
| `product` | build pipeline | launch milestones |
| `personal` | self-reported only | manual update |
| `team` | team-health-agent | multiple signals |

After capturing goals:

```json
{
  "quarter": "Q2",
  "year": "2026",
  "period": "2026-04-01 / 2026-06-30",
  "goals": [
    {
      "id": "G1",
      "title": "Atteindre 12 000€ MRR",
      "type": "revenue",
      "metric": "monthly_recurring_revenue",
      "target": 12000,
      "current": 8500,
      "unit": "€",
      "progress_pct": 71,
      "owner": "owner",
      "status": "on_track",
      "deadline": "2026-06-30",
      "notes": ""
    }
  ]
}
```

SAVE to: `data/2-Domaines/goals/current-quarter.json`
ARCHIVE previous quarter to: `data/4-Archives/goals/[YYYY]-Q[N].json`

## STEP 2 — UPDATE PROGRESS

**Trigger**: "update goals", "progress check", "G[N] is at [X]"

For `revenue` goals: auto-calculate from invoice data.
For `client` goals: count client cards with status = Active.
For `product` goals: read project milestones.
For `personal` or custom: prompt for manual update.

Progress calculation:
```
progress_pct = (current / target) × 100

status:
  progress_pct ≥ (days_elapsed / total_days × 100):  "on_track"  🟢
  progress_pct ≥ (days_elapsed / total_days × 100) - 15: "watch"  🟡
  otherwise: "at_risk"  🔴
  progress_pct ≥ 100: "achieved"  ✅
```

Days-elapsed logic matters: hitting 50% of a goal on day 45 of 90 = on track. Hitting 50% on day 75 = at risk.

## STEP 3 — GOAL SNAPSHOT (for weekly/monthly reports)

Format consumed by other skills and agents:

```markdown
## Q[N] Goal Progress — [Date]

| Goal | Target | Current | Progress | Pace | Status |
|------|--------|---------|----------|------|--------|
| [G1 title] | €12k MRR | €8.5k | 71% | Day 45/90 — need 58% | 🟢 On track |
| [G2 title] | 2 retainers | 1 | 50% | Day 45/90 — need 50% | 🟢 On track |
| [G3 title] | SaaS launch | beta | 30% | Day 45/90 — need 50% | 🔴 At risk |

Most at-risk: [G3 title] — [specific gap and suggested action]
```

## STEP 4 — QUARTER END REVIEW

**Trigger**: "quarter end", "Q[N] review", `/solo:year-end` (triggers this for each quarter)

For each goal:
- Achieved ✅ / Missed ❌ / Partial ⚡
- Root cause if missed: "What prevented hitting this?"
- Lesson: "What would you do differently?"

Generate:
```markdown
# Q[N] [YEAR] — End of Quarter Review

## Results
[Table: goal / target / result / status / key reason]

## Patterns
[What you consistently hit vs consistently missed]

## Carry-forward to Q[N+1]
[Goals to retry / modify / drop]

## Proposed Q[N+1] Goals
[3–5 suggestions based on patterns + current state]
```

ARCHIVE to: `data/4-Archives/goals/[YYYY]-Q[N]-review.md`

---

## Integration Points
- **Feeds**: `weekly-review` (goal snapshot opening), `monday-morning-agent` (most at-risk goal), `business-health-agent` (annual goal achievement rate), `standup-agent` (team goal progress)
- **Reads**: invoice data, client cards, project milestones (auto for revenue/client goals)
- **Triggered by**: `/solo:plan goals`, `/solo:weekly-review`, `/solo:year-end`

---
name: capacity-planner
description: >
  Use for 'capacity planning', 'can I take this project', 'bandwidth check', 'team capacity',
  'who has time', 'can we take this on'. Solo mode: personal capacity. Team mode: collective
  capacity with per-member breakdown and revenue impact framing. Always includes pipeline
  quasi-commitments.
---

# Skill: Capacity Planner

## STEP 0 — READ TEAM MODE

```
READ data/2-Domaines/team.json → mode, members[].capacity_hours_week, members[].id
READ data/2-Domaines/business-profile.json → weekly_billable_hours (solo fallback)
```

---

## SOLO MODE

### Step 1 — True billable capacity
```
Available hours/week: [from profile, default 25h]
True billable/month:  ~97h (22 days × 8h × 55% utilization)
```

### Step 2 — Committed load
```
READ data/1-Projets/[active projects]/ → hours_remaining, deadline
READ data/1-Projets/time/time-[current month].md → hours logged this week (if time-tracker active)
```

For each active project: `weekly_hours = hours_remaining ÷ weeks_until_deadline`

### Step 3 — Pipeline quasi-commitments
```
READ data/1-Projets/pipeline.md → deals at Verbal Commit (100%) and Negotiation (70%)
Estimate hours: deal_value ÷ effective_hourly_rate × probability
```

This step is mandatory. Ignoring pipeline creates false capacity.

### Step 4 — Capacity calculation
```
Free capacity/week = Available − Committed projects − Pipeline quasi-committed
```

### Step 5 — Economic framing
For the proposed project, always show:
```
If YES:  +€[project_value], buffer = [N]h/week, risk to [highest-margin active project]
If NO:   deferred or lost revenue = €[X], protects [N]h/week quality buffer
Alternative: start on [date] when [Project X] completes
```

---

## TEAM MODE

### Step 1 — Per-member capacity

For each member in team.json:
```
[Name] — [role]
  Available: [capacity_hours_week]h/week
  Committed: [sum of their active project hours/week]
  Pipeline quasi-committed: [their deals × probability]
  Free: [available − committed − pipeline]
```

### Step 2 — Team capacity table

```markdown
| Member | Available | Committed | Pipeline | Free |
|--------|-----------|-----------|---------|------|
| [Name1] | [N]h/w | [N]h/w | [N]h/w | [N]h/w |
| [Name2] | [N]h/w | [N]h/w | [N]h/w | [N]h/w |
| **Team** | **[N]h/w** | **[N]h/w** | **[N]h/w** | **[N]h/w** |
```

### Step 3 — Project fit analysis (team mode)

For the proposed project:
- Who can take it? (match by speciality + available hours)
- Who has the right skills? (check team.json member.speciality)
- If no one: can a subcontractor fill the gap?

```
READ data/1-Projets/subcontractors/*.md → available + matching skills
```

```
Option A: [Member X] takes it — [N]h/week, leaves [N]h buffer
Option B: Subcontractor [Name] at €[rate]/day — cost €[X], project margin = [N]%
Option C: Start [date + N weeks] when [project Y] ends
```

### Step 4 — Revenue impact (team mode)

```
Project value: €[X]
If assigned to [Member]:
  Their utilization: [N]% → [H/U/S — healthy/under/stressed]
  Revenue per member this month: €[X each]
  Team total: €[X]
```

---

## OUTPUT

**Solo mode:**
```markdown
# Capacity Report — [Date]

Available: [N]h/week | Committed: [N]h | Pipeline: [N]h | Free: [N]h

Active projects: [table]
Proposed project: [title] — [N]h/week for [N] weeks
Verdict: [YES/NO/ALTERNATIVE] — [reason + economic framing]
```

**Team mode:**
```markdown
# Team Capacity Report — [Date]

[Per-member table]
Team free: [N]h/week total

Proposed project: [title]
Best fit: [member] — [why + their free capacity]
Alternative: [subcontractor option if needed]
Revenue impact: [project adds €X, team MRR = €Y]
```

---

## Integration Points
- **Reads**: team.json, active projects, pipeline.md, time-tracker data, subcontractors/
- **Feeds**: proposal-generator (confirms timeline before promising), monday-morning-agent
- **Triggered by**: any project intake, `/solo:plan capacity`

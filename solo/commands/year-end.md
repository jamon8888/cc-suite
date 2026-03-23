---
name: year-end
description: Annual business review, archiving, and next-year setup. Run on the last working day of December.
---

# Command: /solo:year-end

Orchestrates the full annual transition: review, archive, reset.

## What it does (in sequence)

### Phase 1 — Annual Business Health Check

Invokes `business-health-agent` in annual mode (12-month view instead of 1-month).

Produces:
- Revenue trend: full year, quarterly breakdown
- Top 3 clients by revenue and by margin
- Win rate for the full year
- Effective hourly rate trend (monthly, if time-tracker data available)
- Goal achievement rate: Q1 through Q4

### Phase 2 — Goal Year Review

Invokes `goal-tracker` for each quarter:
- Final scores: achieved ✅ / missed ❌ / partial ⚡
- Patterns: what you consistently hit vs missed
- Root causes for misses
- Learnings to carry forward

### Phase 3 — Client Portfolio Review

For each client in `data/1-Projets/clients/`:
- Status: Active / Completed / Churned / On-hold
- Revenue in [YEAR]: €[X]
- Margin (if subcontractor data available): [N]%
- Relationship health: [final score]
- Decision: Renew / Expand / Let go

### Phase 4 — Archive

```python
year = current_year

# Move completed projects
completed_projects = [p for p in active_projects if p.status == "Complete"]
for p in completed_projects:
    move(p.path, f"data/4-Archives/{year}/projects/{p.name}/")

# Archive invoices
move_all(f"data/1-Projets/invoices/INV-{year}-*.md", f"data/4-Archives/{year}/invoices/")

# Archive time logs
move_all(f"data/1-Projets/time/time-{year}-*.md", f"data/4-Archives/{year}/time/")

# Archive goals
move(f"data/2-Domaines/goals/current-quarter.json", f"data/4-Archives/{year}/goals/full-year.json")

# Archive health reports
move_all(f"data/1-Projets/health-{year}-*.md", f"data/4-Archives/{year}/health/")
```

Report:
> "Archived [N] projects, [N] invoices, [N] health reports to data/4-Archives/[YEAR]/"

### Phase 5 — Fresh Start Setup

Create empty structures for the new year:

```python
next_year = current_year + 1

# New invoice numbering resets automatically (INV-YYYY-NNN)
# New goals file
create("data/2-Domaines/goals/current-quarter.json", template={
    "quarter": "Q1",
    "year": next_year,
    "goals": []
})
```

### Phase 6 — Q1 Goal Suggestions

Based on the year's patterns, suggest 3–5 goals for Q1 next year:

"Based on [YEAR]:
- You consistently hit revenue goals in Q1 (set a 10% higher target)
- You missed 2 client diversification goals (make this a Q1 priority, not Q3)
- Your effective hourly rate [grew/stagnated] — consider a rate review in Q1
- [Product/feature X] was always deferred — Q1 or officially archive it"

### Final Output

```markdown
# Year-End Report — [YEAR]

## Results Summary
Revenue: €[X] ([+/-N%] vs [YEAR-1])
Top client: [name] — €[X] ([N]% concentration)
Goal achievement: [N/total] objectives hit
Effective rate: €[X]/h avg ([+/-N%] vs target)

## Year Highlights
[3 things that went well]

## What to Change
[3 things to do differently]

## Q1 [next year] — Suggested Focus
[3–5 goal suggestions with rationale]

## Archived
Projects: [N] | Invoices: [N] | Time logs: [N] months
```

Save to: `data/4-Archives/[YEAR]/year-end-review.md`

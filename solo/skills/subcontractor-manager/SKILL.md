---
name: subcontractor-manager
description: >
  Use this skill when the user says 'add subcontractor', 'freelancer for this project',
  'sous-traitant', 'external help', 'cost of this project', 'project margin', or
  'who can help with'. Tracks subcontractors separately from clients to calculate
  true project margins and expand capacity without hiring.
---

# Skill: Subcontractor Manager

Subcontractors are not clients. They cost you money instead of paying you. This skill keeps them
in a separate data structure so `financial-health` can calculate real margins and
`capacity-planner` can include external capacity.

## Data Structure

```
data/1-Projets/subcontractors/[slug].md
```

```markdown
# Subcontractor: [Name]

**Status**: Active / Inactive / Occasional
**Speciality**: [What they do — e.g., "React development", "UX design", "Copywriting FR"]
**Day rate**: €[X]/day
**Hourly rate**: €[X]/h
**Typical availability**: [e.g., "2 days/week", "project-by-project"]
**Contact**: [email]
**Contract type**: Freelance / Portage salarial / Auto-entrepreneur
**Payment terms**: Net 15 / Net 30

## Project History
| Project | Client | Period | Days | Cost | Delivered? |
|---------|--------|--------|------|------|-----------|

## Quality Notes
[Reliability, communication, output quality — your honest notes]

## Skills Tags
[tag1, tag2, tag3]
```

## STEP 1 — ADD SUBCONTRACTOR

Ask for: name, speciality, rate (day or hourly), availability, contact.
Create file at `data/1-Projets/subcontractors/[slug].md`.

## STEP 2 — ASSIGN TO PROJECT

**Trigger**: "use [subcontractor] for [project]", "hire [name] for [days]"

```
READ data/1-Projets/subcontractors/[slug].md → rate
READ data/1-Projets/clients/[client].md → project value
```

Calculate:
```
Subcontractor cost:  [days × day_rate] = €[X]
Your project revenue: €[Y]
Gross margin:        €[Y - X] = [N]%
```

Present before confirming:
> "Assigning [Name] for [N] days at €[rate]/day = €[X] cost.
> Project revenue: €[Y]. Gross margin: €[Z] ([N]%).
> Is this margin acceptable? [Rule of thumb: aim for >50% gross margin]"

Update project file: add subcontractor line to budget section.
Update subcontractor file: log the project assignment.

## STEP 3 — CAPACITY EXTENSION

**Trigger**: "do I have capacity for [project]", when capacity-planner shows shortage

Check available subcontractors:
```
READ data/1-Projets/subcontractors/*.md → filter Active + matching speciality
```

Propose:
> "You don't have internal capacity for this [Xh] project.
> [Subcontractor A] handles [matching skill] at €[rate]/day.
> At [N] days: cost = €[X], client revenue = €[Y], margin = [Z]%.
> Want to include them in the capacity plan?"

## STEP 4 — SUBCONTRACTOR COSTS IN FINANCIAL HEALTH

When `financial-health` runs for a period, this skill provides the cost layer:

```
READ data/1-Projets/subcontractors/*.md → sum costs for period
```

Feeds financial-health as "Subcontractor costs" line in P&L:
```
Revenue:               €12,500
Subcontractor costs:   −€2,800  (22% of revenue)
Other expenses:        −€800
Net profit:            €8,900
Real margin:           71%
```

## STEP 5 — SUBCONTRACTOR ROSTER

**Trigger**: "show my subcontractors", "who can I call for [skill]"

List all active subcontractors with availability and speciality.
Filter by skill tag if requested.
Show each person's total historical project cost and project count.

## STEP 6 — INVOICE TRACKING FOR SUBS

Subcontractors send you invoices. Log them here to track costs accurately:

```
WRITE data/1-Projets/subcontractors/[slug]-invoices.md
| Date | Invoice # | Project | Amount | Status: Paid/Pending |
```

When `expense-tracker` runs, it reads this file to include sub costs in the monthly P&L.

---

## Integration Points
- **Feeds**: `financial-health` (subcontractor costs in P&L), `capacity-planner` (external capacity), `invoice-generator` (project costs)
- **Reads**: project files, capacity-planner data
- **Triggered by**: project assignment, `/solo:plan capacity`, financial-health P&L

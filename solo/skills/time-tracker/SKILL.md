---
name: time-tracker
description: >
  Use this skill when the user says 'log time', 'track hours', 'I worked X hours on',
  'time report', 'effective rate', 'billable hours', or 'how much did I work this week/month'.
  This skill is the data source for financial-health (effective hourly rate),
  capacity-planner (real utilization), and business-health-advisor (dimensions 3 and 4).
  Without time data, those skills estimate — with it, they calculate.
---

# Skill: Time Tracker

The missing data layer. Solopreneurs know their revenue. Almost none know their actual hourly rate.
This skill makes hours visible so every financial calculation becomes real instead of estimated.

## STEP 0 — CHECK TEAM MODE

```
READ data/2-Domaines/team.json → mode, members[current_user].id
```

In team mode: time entries include `member_id` field.
In solo mode: time entries are personal only.

## STEP 1 — LOG TIME (Quick Log)

**Trigger**: "log time", "I worked X hours", "log Xh on [project]"

Parse from input:
- `hours`: number (required)
- `project`: project name or client name (required — ask if missing)
- `date`: default today, override if stated
- `billable`: default true, false for internal/admin
- `description`: optional brief note
- `member_id`: auto-filled from team.json in team mode

```
WRITE data/1-Projets/time/time-[YYYY-MM].md
```

Append entry:
```markdown
| [Date] | [Project/Client] | [Hours] | [Billable: ✓/—] | [Description] | [member_id if team] |
```

Confirm:
> "Logged [Xh] on [project] — [date]. This month: [Xh] billable / [Xh] total so far."

## STEP 2 — BULK LOG

**Trigger**: "log this week", pasted list of hours, CSV

Parse each line. If ambiguous project name, ask once.
Group by project. Show summary before saving:
> "I found [N] entries totalling [Xh] ([Xh] billable). Save?"

## STEP 3 — RECURRING ENTRY

For regular fixed-hour clients (retainer):
```
WRITE data/2-Domaines/recurring-time.json
→ { client, hours_per_week, billable: true, auto_log: true }
```

Auto-log trigger: when `/solo:weekly-review` runs, check if recurring entries exist for the week and prompt: "Auto-log [Xh] for [client]?"

## STEP 4 — TIME REPORT

**Trigger**: "time report", "hours this week/month", "effective rate"

```
READ data/1-Projets/time/time-[YYYY-MM].md
READ data/1-Projets/invoices/*.md → revenue for same period
READ data/2-Domaines/business-profile.json → minimum_hourly_rate
```

Calculate:

```
Hours this month:
  Billable:    [Xh]
  Non-billable (admin/bizdev): [Xh]
  Total:       [Xh]
  Utilization: [billable/total × 100]%

Revenue this month:   €[X]
Effective hourly rate: €[revenue / billable hours]
vs minimum target:     €[minimum_hourly_rate]
Variance:             [+/-€X / +/-N%]

Peak work days: [top 3 days by hours]
Avg daily hours: [total / working days]
```

Health signal:
- Effective rate > 120% of target: 🟢 Excellent
- 80–120%: 🟡 On track
- <80%: 🔴 Underpricing or scope creep — investigate

**For team mode**: show breakdown by member + total.

## STEP 5 — BURNOUT SIGNAL

If total hours > 45h/week for 2+ consecutive weeks:
> "⚠️ You've logged [Xh]/week for [N] weeks straight. That's above the sustainable threshold. Consider raising rates, delegating, or rescheduling."

If non-billable hours > 40% of total:
> "⚠️ [N]% of your hours this month were non-billable (admin, bizdev). Target: < 30%. What's driving this?"

## OUTPUT FORMAT

```markdown
# Time Report — [Period]

## Summary
Billable: [Xh] | Non-billable: [Xh] | Total: [Xh]
Utilization: [N]% | Effective rate: €[X]/h vs target €[Y]/h

## By Project/Client
| Client/Project | Hours | Billable | Revenue | Effective Rate |
|----------------|-------|---------|---------|----------------|
| [Client 1]     |       | ✓       |         |                |

## Signals
[Any burnout or underpricing flags]
```

---

## Integration Points
- **Feeds**: `financial-health` (effective_hourly_rate), `capacity-planner` (real utilization), `business-health-advisor` (dimensions 3+4), `weekly-review`
- **Reads**: team.json (mode + members), business-profile.json (target rate), invoices/
- **Triggered by**: `/solo:time`, `/solo:weekly-review` (auto-prompt)

---
name: financial-health
description: "Use this skill when the user asks for 'financial health', 'revenue report', 'profit margin', 'P&L', or 'runway'. Distinguishes clearly between a revenue report (from invoices alone) and a full P&L (requires expense data). Never produces a P&L without expense input."
---

# Skill: Financial Health

Provides financial intelligence from Solo's data. Distinguishes between what can be calculated automatically and what requires user input. Never silently skips metrics.

## STEP 0 — DATA AVAILABILITY DECLARATION

Before calculating anything, state what's available:

```
READ data/1-Projets/invoices/*.md → count paid/sent/overdue invoices, detect date range
READ data/2-Domaines/business-profile.json → check: income_target, weekly_billable_hours
```

Report upfront:
```
Financial data found:
  Invoices: [N] files covering [date range]
  Paid: [N] invoices totalling [€X]
  Business profile: income target [€X/year] [or: not set]

I can calculate automatically: Revenue metrics, Collection Rate, Overdue exposure
I need from you for a full P&L: Total expenses for [period]
I need for Effective Hourly Rate: Total hours worked in [period]

What would you like? [A] Revenue report only | [B] Full P&L (I'll ask for expenses) | [C] All metrics
```

## STEP 1 — REVENUE METRICS (automatic)

| Metric | Calculation | Source |
|--------|------------|--------|
| Revenue (Paid) | Sum of paid invoices in period | invoices/ |
| Revenue (Invoiced) | Sum of all invoices issued | invoices/ |
| Outstanding | Sum of Sent, not yet due | invoices/ |
| Overdue | Sum past Due Date, unpaid | invoices/ |
| Collection Rate | Paid ÷ Invoiced × 100 | invoices/ |
| Avg Days to Pay | Mean of (Paid Date − Issue Date) | invoices/ — only if Paid Date field present |

**If Paid Date missing from invoices**: "Avg Days to Pay requires a 'Paid Date' field in your invoices. [N] invoices lack this field — add it for future tracking."

## STEP 2 — TREND ANALYSIS (6-month, automatic)

```
3-month moving average: (M-1 + M-2 + M-3) / 3
6-month moving average: (M-1 through M-6) / 6
MoM growth: (Current - Previous) / Previous × 100
```

| Signal | Condition | Score |
|--------|-----------|-------|
| Growing | 3M avg > 6M avg, MoM positive | 🟢 |
| Stable | 3M avg ≈ 6M avg, consistent | 🟡 |
| Contracting | 3M avg < 6M avg, 2+ declining months | 🔴 |

## STEP 3 — P&L (requires expense input)

If user wants a P&L: ask for expenses before proceeding.

```
To complete your P&L for [period], I need your expenses.
You can:
  A) Paste them now (I'll categorize them)
  B) Point me to your expense tracking file

Without expenses, I'll produce a revenue report, clearly labeled as such — not a P&L.
```

P&L structure when expenses are provided:

```markdown
# P&L — [Month Year]

## Revenue
[from invoice calculations]
Total Revenue: [X]

## Expenses (from user input or expense-tracker)
[categorized]
Total Expenses: [X]

## Summary
Net Profit: [Revenue − Expenses]
Profit Margin: [Net Profit ÷ Revenue × 100]%
Effective Hourly Rate: [Net Profit ÷ Hours] ← only if hours provided
```

## STEP 4 — RUNWAY PROJECTION (requires expenses)

```
Monthly burn = Expenses / N months of data
Cash on hand = Outstanding (paid soon) + bank balance (if known)
Runway = Cash on hand ÷ Monthly burn
```

If expenses unknown: "Runway requires your monthly expenses. Without them, I can show you how many months of revenue coverage you have at current collection rates — which is not the same as runway."

## STEP 5 — INCOME TARGET TRACKING (if set)

```
READ business-profile.json → income_target (annual)
Monthly target = annual ÷ 12
Progress = (Paid this month ÷ Monthly target) × 100
Days remaining = [N] days until month end
Revenue needed to hit target = Monthly target − Paid this month
Daily revenue needed = Revenue needed ÷ Days remaining
```

---

## Output

```markdown
# Financial Health — [Period]

## Revenue Summary
[Revenue metrics table]

## Trend: [🟢/🟡/🔴 with one-sentence diagnosis]
[3M vs 6M comparison]

## Outstanding & Overdue
[Summary with top overdue items]

## [P&L — only if expenses provided]

## [Runway — only if burn rate available]

## vs Monthly Target: [N]% ([€X to go, €Y/day needed])
```


## TEAM MODE — Revenue Split and Consolidated P&L

When `data/2-Domaines/team.json` has `mode: duo` or `mode: team`:

### Per-Member Revenue Breakdown

```
READ data/1-Projets/invoices/*.md → filter by deal_owner or member_id
READ data/2-Domaines/team.json → revenue_split per member
```

| Member | Revenue this month | Share (%) | vs Target |
|--------|-------------------|-----------|----------|
| [Name1] | €[X] | [N]% | [+/-N%] |
| [Name2] | €[X] | [N]% | [+/-N%] |
| **Total** | **€[X]** | 100% | |

### Subcontractor Costs

```
READ data/1-Projets/subcontractors/*.md → costs for period
```

```
Revenue:               €[X]
Subcontractor costs:   −€[X]  ([N]% of revenue)
Other expenses:        −€[X]
Net profit:            €[X]
Real gross margin:     [N]%
```

**Rule**: If subcontractor costs > 30% of revenue on a project, flag: "This project's margin is below target. Consider raising rates or renegotiating the scope."

---

## Integration Points
- **Reads**: invoices/, business-profile.json, expense-tracker output
- **Feeds**: weekly-review, business-health-advisor, monday-morning-agent

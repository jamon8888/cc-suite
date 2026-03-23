---
name: sales-pipeline
description: "Use for 'sales pipeline', 'pipeline status', 'deal tracking', 'pipeline health'. Surfaces all 6 risk signals with specific actions per deal. Calculates weighted pipeline and stage velocity."
---
# Skill: Sales Pipeline

## STEP 0 — READ PIPELINE

```
READ data/1-Projets/pipeline.md → all active deals with stage, last_touch, close_date, value, contacts
```

## STEP 1 — PIPELINE HEALTH DASHBOARD

```markdown
# Pipeline Health — [Date]

## Summary
Active deals: [N] worth €[total]
Weighted pipeline: €[sum(value × probability per stage)]
Avg deal size: €[total/N]
Avg deal age: [X days]
```

| Stage | Probability | Deals | Value | % of Pipeline |
|-------|------------|-------|-------|---------------|
| Prospect | 10% | | | |
| Discovery | 20% | | | |
| Proposal | 40% | | | |
| Negotiation | 60% | | | |
| Verbal Commit | 80% | | | |

## STEP 2 — 6-SIGNAL RISK AUDIT (all 6, every time)

For each active deal, check ALL signals:

| Signal | Threshold | Check |
|--------|-----------|-------|
| **Stale** | No activity 14+ days | Last touch date vs today |
| **Stuck in stage** | Same stage 30+ days | Stage entry date |
| **Past close date** | Expected close has passed | Close date vs today |
| **Single-threaded** | Only 1 contact at company | Contact count in deal |
| **No next action** | Next Action field empty | Field check |
| **Ghost** | 2+ unanswered outreach attempts | Outreach log |

For each flagged deal, generate a SPECIFIC action — not just the flag:

```
🔴 TechCorp [Stale — 21 days] 
   Action: "Send pattern-interrupt email referencing their recent [news/context]. 
   Don't follow up on the proposal — reference something new."

🔴 FinancePro [Single-threaded — only CMO contact]
   Action: "Find DSI or IT Director on LinkedIn. Multi-thread before Q2 budget decisions."

🟡 StartupX [Stuck in Proposal 35 days]
   Action: "Breakup email: 'I want to respect your time — still worth exploring?' 
   Either re-engages or self-qualifies out."
```

## STEP 3 — STAGE VELOCITY

For deals stuck in stage, compare to healthy deal velocity:
- Proposal stage average: 7-14 days before response
- Negotiation average: 7-21 days
- If 2× average: critical flag

"[Deal] has been in Proposal for [N] days — typically this stage resolves in [7-14] days. Either they're not the decision-maker or budget approval is blocked."

## STEP 4 — PIPELINE MOMENTUM

Monthly flow:
- Deals entered pipeline this month: [N]
- Deals closed won/lost this month: [N]
- Net pipeline change: +/−[N]
- Win rate (Closed Won / Total Closed): [%]

Signal: "Pipeline is [growing/stable/shrinking]. At current win rate, you need [N] more prospects to hit monthly revenue target."

## STEP 5 — WEEKLY FOCUS LIST

Top 3 deals to move this week, ranked by (value × urgency × probability):

1. [Deal] — [Why it's priority] — [Specific action]
2. [Deal] — [Why it's priority] — [Specific action]
3. [Deal] — [Why it's priority] — [Specific action]

---

## Integration Points
- **Reads**: pipeline.md, client cards
- **Feeds**: monday-morning-agent, capacity-planner, weekly-review

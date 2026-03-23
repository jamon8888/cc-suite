---
name: weekly-review
description: "Use this skill for 'weekly review', 'week in review', 'monday morning check'. Reads pipeline, invoices, and client files BEFORE asking questions. Detects recurring blockers. Reads Copywriter content calendar when installed."
---
# Skill: Weekly Review

## STEP 0 — AUTOMATIC DATA COLLECTION

Read before asking anything:

```
READ data/1-Projets/pipeline.md → deals, stages, last-touch dates
READ data/1-Projets/invoices/*.md → paid this week, outstanding, overdue
READ data/1-Projets/clients/*.md → health scores, last contact dates
READ data/2-Domaines/content-calendar.md → this week's planned content (if Copywriter installed)
READ data/1-Projets/weekly-review-*.md → last 3 reviews for pattern detection
```

Report what was loaded:
```
Data loaded:
  Pipeline: [N] active deals, [N] need attention
  Revenue this week: €[X] paid, €[X] overdue
  Clients: [N] Green / [N] Yellow / [N] Red
  Content: [published / missed / scheduled]
```

## STEP 0b — GOALS SNAPSHOT

If `data/2-Domaines/goals/current-quarter.json` exists:

Invoke `goal-tracker` to calculate current progress.

Insert at start of review output:
```
Q[N] Goal Progress:
  🟢 [G1]: [N]% on track
  🟡 [G2]: [N]% watch
  🔴 [G3]: [N]% at risk — [1 line: what's needed this week]
```

If G3 is at risk: add "Move [G3 goal] forward" to the Week Priorities as item #1 or #2.

## STEP 1 — AUTOMATED FLAGS

Surface these before asking the user anything:
- Deals with no activity in 7+ days → "TechCorp: 9 days since last contact"
- Overdue invoices → "Acme: €X, 12 days overdue"
- Client health Red → "DesignCo: Red (last contact 18 days ago)"
- Content missed from calendar → "Monday post not published — reschedule?"

## STEP 2 — USER INPUT (2 questions only)

After automated flags, ask exactly 2 questions:
1. "What went well this week?"
2. "What's stuck or slowing you down?"

## STEP 3 — PATTERN RECOGNITION

Compare to last 3 reviews (from files):
- Same blocker 3+ weeks → "This is the 3rd week you've mentioned [blocker]. That's structural — what would it take to resolve it permanently?"
- Revenue declining 2+ weeks → "Revenue has been below target for [N] consecutive weeks. Should we discuss pipeline priorities?"
- Consistently missing content → "Content has been missed [N] of the last [N] weeks. Is the calendar realistic?"

## STEP 4 — PRIORITY LIST

Rank by: revenue impact → hard deadlines → relationship risk

```
This Week's Top 3:
1. [Action] → €[revenue impact or deal value] → by [day]
2. [Action] → [relationship preservation] → by [day]
3. [Action] → [growth/strategic] → no hard deadline
```

## STEP 5 — OUTPUT

```markdown
# Weekly Review — Week of [Date]

## 📊 Automated Snapshot
[Pipeline / Revenue / Clients — from Step 0]

## 🚨 Flags Requiring Action
[From Step 1 — specific with dates]

## ✅ This Week's Wins
[From user input]

## 🚧 Blockers
[From user input + pattern detection note if recurring]

## 📅 Next Week's Top 3
[From Step 4 — ranked]

## 📱 Content
[Calendar status + next week's planned posts]
```

Save to: `data/1-Projets/weekly-review-[YYYY-MM-DD].md`

---

## Integration Points
- **Reads**: pipeline.md, invoices/, clients/, content-calendar.md, previous reviews
- **Feeds**: monday-morning-agent (flags), weekly-digest-agent

---
name: daily-briefing
description: "Use when the user asks for 'morning briefing', 'daily brief', 'what's on my plate today', 'wrap up my day'. Reads pipeline and deal files automatically — a briefing generated without data is a to-do list template, not intelligence."
---

# Daily Sales Briefing

## STEP 0 — AUTOMATIC DATA LOAD (no prompting the user)

```python
# Core pipeline data
deals      = glob("data/1-Projets/active-deals/*.md")
pipeline   = read("data/1-Projets/pipeline.md")
signals    = read("data/1-Projets/signals/today-signals.md")  # from signal-trapper-agent
prep_files = glob("data/1-Projets/active-deals/*-prep-*.md")  # from call-prep
profile    = read("data/sales-profile.json")
```

Opening 3-number snapshot (always):
```
📊 [Date] — Sales Pulse
Active deals:   [N] worth €[weighted pipeline]
Outstanding:    €[X] in open proposals
Overdue follow-ups: [N] (last touch >7 days)
```

## STEP 1 — AUTOMATED FLAGS (scan and surface, no user input needed)

From deal files, surface:
- Deals with no activity in **7+ days** → "TechStart: 9 days silent — €45k, Proposal stage"
- Proposals sent **10+ days ago** with no response → "Acme proposal: 12 days, no reply — try breakup email?"
- Any deal with a **close date this week** → "NexusCorp closes Friday — is it ready?"
- Commitments made in last meeting notes → "You promised to send case study to TechCorp by today"
- Deals at **single-threaded** risk → "Acme: only Sarah Chen as contact — multi-thread"

## STEP 2 — SIGNAL TRAPPER INTEGRATION

If `data/1-Projets/signals/today-signals.md` exists (written overnight by signal-trapper-agent):

```
🔔 Overnight Signals
[Company A]: [signal type] — [play recommendation]
[Company B]: [signal type] — [outreach draft ready]
```

If no signals file: "(No overnight signals — run signal-trapper-agent to monitor accounts)"

## STEP 3 — TODAY'S MEETINGS

If calendar connected: auto-pull.
If not: check `data/1-Projets/active-deals/` for any prep files dated today.

For each meeting found, link to the call-prep brief:
> "2pm — TechStart discovery (prep brief ready: data/1-Projets/active-deals/techstart-prep-[today].md)"

## STEP 4 — PRIORITY ACTION LIST

Rank by: revenue impact × urgency × relationship risk

```
Today's Top 3:
1. [Action] → [Deal / €value] → [Why today, not tomorrow]
2. [Action] → [Deal / relationship stake] → [Deadline or signal]
3. [Action] → [Pipeline health / strategic] → [Context]
```

## STEP 5 — END OF DAY MODE

**Trigger**: "wrap up my day" / "end of day" / "eod brief"

```
📋 Day Wrap — [Date]

Completed:
  [Actions taken — from today's priority list]

Open items (carry to tomorrow):
  [Anything not done, re-prioritized]

Tomorrow's top 3:
  [Derived from pipeline state + any new signals]
```

## OUTPUT MODES

| Mode | Trigger | Length |
|---|---|---|
| Full briefing | default | 3-section output |
| Quick brief | "quick brief" / "tldr" | 3 bullets only |
| EOD | "wrap up" / "end of day" | Day summary + tomorrow |

---

## Integration Points
- **Reads**: all deal files, pipeline.md, signal-trapper output, call-prep files
- **Requires**: signal-trapper-agent to run overnight for signals section
- **Triggered by**: `/sales:pipeline brief`, morning cadence

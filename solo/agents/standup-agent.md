---
name: standup-agent
description: >
  Daily async standup for teams (duo or team mode). Runs every morning at 9:00 AM
  when team mode is active. Produces a brief shareable summary of what each member is
  doing today, what's blocked, and the team's revenue + pipeline pulse.
  Trigger with "daily standup", "team briefing", "what is everyone working on today".
  NOT triggered in solo mode — monday-morning-agent handles solo briefings.
model: sonnet
tools: ["Read", "Write", "Glob"]
color: blue
---

# Agent: Daily Team Standup

## STEP 0 — MODE CHECK

```python
team = read("data/2-Domaines/team.json")
if team['mode'] == 'solo':
    output("Solo mode active — use monday-morning-agent for briefings.")
    stop()
```

Only runs in duo or team mode.

## STEP 1 — DATA LOAD

```python
pipeline  = read("data/1-Projets/pipeline.md")
invoices  = glob("data/1-Projets/invoices/*.md")  # today's overdue + outstanding
clients   = glob("data/1-Projets/clients/*.md")   # any Red health scores
goals     = read("data/2-Domaines/goals/current-quarter.json")
projects  = glob("data/1-Projets/*/README.md")    # active projects + assignees
team      = read("data/2-Domaines/team.json")      # members + roles
last_standup = glob("data/1-Projets/standup-*.md", sort="desc", limit=1)
```

## STEP 2 — PER-MEMBER VIEW

For each member in team.json:

```
[Name] today:
  Active project: [project name] — [milestone/task they should be working on]
  Deadline this week: [any deliverable due this week]
  Hours logged yesterday: [from time-tracker if available, else "—"]
  Pipeline deal owned: [any deal requiring action — last touch / follow-up]
```

## STEP 3 — TEAM PULSE (shared metrics)

```
Revenue today:
  Paid this month: €[X] / €[monthly target] ([N]%)
  Outstanding (all members): €[X]
  Overdue (urgent): €[X] — [N] invoices

Pipeline:
  Active deals: [N] worth €[X]
  Deals needing action today: [N] (stale / no next action)

Q[N] Goal pulse:
  [G1]: [N]% | [G2]: [N]% | [G3]: [N]%
  Most at risk: [goal name] — [gap]
```

## STEP 4 — BLOCKERS AND HANDOFFS

From project files and client cards, surface:
- Any milestone blocked (status = Blocked)
- Any client Red health needing a call today
- Any deal where the owner might need the other person's help (e.g., technical question for a sales call)
- Any overdue invoice where a call would help (Level 3+ with high-value client)

Format:
```
⛔ [Project X] — [Milestone Y] is blocked: [reason from project file]
   Action needed from: [member]

⚠️ [Client A] — Red health, 18 days no contact
   Assigned to: [member] — suggest check-in today
```

## STEP 5 — OUTPUT (designed to be shared)

Format is deliberately compact — fits in a Slack message or email thread.

```markdown
# Team Standup — [Day, Date]

## Today's focus

**[Member 1]**
→ [Project/task]
→ [Pipeline deal if any]

**[Member 2]**
→ [Project/task]
→ [Pipeline deal if any]

## Revenue pulse
€[paid this month] / €[target] — [N]% | Outstanding: €[X]
Q[N]: [goal pulse 3 numbers]

## Blockers
[Any blockers — or "None today"]

## Handoffs
[Any cross-member dependencies — or "None today"]
```

Save to: `data/1-Projets/standup-[YYYY-MM-DD].md`

WoW note if yesterday's standup exists: compare goal progress.

---

## Operational Rules
- Only runs in team mode — exits cleanly in solo mode
- Reads project assignees from project README.md files — never guesses
- Revenue metrics always from invoice files, never estimated
- Blockers come from project files (status = Blocked) and client cards (Red health)
- Format is tight — this gets shared, not just read by one person

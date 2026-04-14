---
name: interview-ops
description: Set up and manage a user interview sprint end-to-end using ~~email (Gmail), ~~calendar (Google Calendar), and ~~project tracker. Creates the research brief, identifies participants, drafts outreach emails, schedules sessions, and tracks interview status. Use after /discover returns a score ≥ 13/18, or when you already know you need to run user interviews.
argument-hint: "<research hypothesis or topic to investigate>"
tools: []
---

# /interview-ops

Set up research sprint for: @$1

**Invoke the `research-ops` and `research-repository` skills.**

---

## What this command does

Executes the full research sprint setup in sequence, using all available connectors:

1. **Check prior research** (~~knowledge base) — avoid duplicate work
2. **Create brief** (~~project tracker + ~~knowledge base) — anchor the sprint
3. **Identify participants** (~~user feedback) — pull from Intercom segments
4. **Set up tracker** (~~project tracker) — participant pipeline board
5. **Draft outreach** (~~email) — personalized, high-response-rate emails
6. **Schedule sessions** (~~calendar) — block time, send invites
7. **Post-sprint: publish synthesis** (~~knowledge base) — store for future use

---

## Inputs needed before starting

| Input | Default if not provided |
|-------|------------------------|
| Research hypothesis | Ask the user |
| Participant segment | "Active users last 30 days" |
| Number of interviews | 8 |
| Interview duration | 30 minutes |
| Date range for sessions | Next 10 business days |
| Incentive | None (ask if response rate matters) |

---

## Steps requiring confirmation

Before executing any action that sends emails or creates calendar events, show the user:
- The list of identified participants (name + email + segment + rationale)
- The outreach email draft
- The proposed calendar slots

Do not send anything without explicit confirmation. Show a preview first.

---

## Output at each step

**After participant identification:**
```markdown
## Participants identified: [N]
| Name | Email | Segment | Rationale |
|------|-------|---------|-----------|
| [Name] | [email] | [tier/usage] | [why they're relevant] |
Confirm to proceed with outreach? [Yes / Adjust list]
```

**After outreach drafts:**
```markdown
## Outreach email draft
Subject: [Subject line]
---
[Body]
---
Confirm to send to [N] participants? [Yes / Edit draft]
```

**After scheduling:**
```markdown
## Research sprint calendar
| Date | Time | Participant | Status |
|------|------|------------|--------|
| [Date] | [Time] | [Name] | Invite sent |
Tracker board updated in ~~project tracker.
```

---

## Post-sprint handoff

After interviews are complete, this command initiates the synthesis and storage:
- Run `/research-synthesis` on all interview notes
- Publish output to `~~knowledge base` using `research-repository` Protocol 2
- Update Living Personas and Known Pain Points
- Post summary to `~~chat` (#product or #research channel)
- Convert design implications to tickets in `~~project tracker`

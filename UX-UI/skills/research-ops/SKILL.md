---
name: research-ops
description: Operationalize user research logistics using ~~email (Gmail), ~~calendar (Google Calendar), and ~~project tracker (Linear / Asana / Jira). Activates when the user wants to plan a research sprint, recruit participants, send interview outreach, schedule sessions, or track interview status. Trigger phrases: "schedule user interviews", "recruit participants", "send interview invites", "plan a research sprint", "track my interviews", "set up research sessions".
---

# Research Ops

This skill operationalizes research logistics. It turns "I need to run 8 user interviews" into concrete actions against `~~email`, `~~calendar`, and `~~project tracker` — not a generic plan but an actual execution sequence using connected tools.

**This skill handles operations, not methodology.** For research methods and interview guide structure, see `user-research`. For analyzing results, see `research-synthesis`.

---

## Research sprint setup protocol

A research sprint is a time-boxed set of activities — typically 1–2 weeks — to investigate a specific hypothesis. Setting one up correctly takes 4 steps, all executed via connected tools.

### Step 1 — Create the research brief (~~project tracker + ~~knowledge base)

Before any outreach, create a research brief that anchors the sprint. This prevents scope creep mid-sprint and gives stakeholders a single document to review.

**If `~~project tracker` is connected:**
```
Create a project/epic: "Research Sprint: [Hypothesis statement]"
Sub-tasks to create:
  ☐ Research brief approved
  ☐ Participants identified ([N] needed)
  ☐ Outreach sent
  ☐ [N] interviews scheduled
  ☐ [N] interviews completed
  ☐ Synthesis delivered
  ☐ Design implications communicated
```

**If `~~knowledge base` is connected:**
Check if a prior study on the same hypothesis already exists before creating a new one. Query: `[hypothesis keywords]` in the research section. If a prior study exists → run `research-repository` protocol before starting a new sprint (avoid duplicating work).

Brief structure to write in the knowledge base:
```markdown
## Research Brief: [Hypothesis]
**Sprint dates**: [start] → [end]
**Research question**: [Single, specific question this sprint will answer]
**Hypothesis**: [Falsifiable statement — what we believe and why]
**Method**: [Interviews / Usability test / Survey]
**Participants needed**: [N] — [Segment criteria]
**Success criteria**: [How we'll know the hypothesis is confirmed or rejected]
**Owner**: [Name]
**Stakeholders**: [Who needs to see the output]
```

---

### Step 2 — Participant identification (~~user feedback + ~~email + ~~project tracker)

The hardest part of research ops is finding the right participants. The MCP connectors make this faster.

**From `~~user feedback` (Intercom):**
```
Query: filter users by segment criteria
Criteria to apply:
  - Plan tier / company size (if B2B)
  - Feature usage (have/haven't used the feature in question)
  - Recency (active in last 30 days — they have current context)
  - Prior feedback (users who submitted relevant tickets — they're already engaged)
  - Exclude: users with open complaints, churned accounts, internal team members
```
Export: name, email, account type, relevant usage context.

**From `~~email` (Gmail):**
For B2B: search your sent folder for direct customer contacts.
```
Search query: "[customer domain]" OR "following up" OR "call" — last 90 days
Filter: previous conversations with actual users (not billing, not legal)
```
These are warm contacts — response rate is significantly higher than cold outreach to the full user base.

**Participant tracking in `~~project tracker`:**
Create a tracking board with columns: `Identified` → `Outreach sent` → `Responded` → `Scheduled` → `Completed` → `Declined`.
Each participant = one card. Include: name, email, segment, outreach date, interview date.

Target: identify 15–20 candidates to yield 8 interviews (typical response rate: 40–60% for warm outreach to engaged users).

---

### Step 3 — Outreach (~~email + ~~calendar)

**Outreach email via `~~email` (Gmail):**

Principles for high response rate:
- Subject line: specific, not generic. "Quick question about [feature]" outperforms "Research Opportunity"
- 3 sentences max before the ask
- Offer 2–3 specific time slots, not "let me know when you're free"
- 30 minutes max — 45+ minute requests reduce response rate significantly
- Mention the incentive if any (gift card, early access, report summary)
- No attachments, no surveys in first contact

**Template structure (adapt per product and segment):**

```
Subject: Quick call about [specific feature / workflow] — 30 min?

Hi [Name],

I'm [role] at [Company], and I'm working on [feature area]. I noticed you [specific action — e.g. "submitted feedback about X" / "use Y regularly"] and I'd love to understand your experience better.

Would you have 30 minutes this week for a video call? Here are a few options:
- [Day], [Date] at [Time] [Timezone]
- [Day], [Date] at [Time] [Timezone]
- [Day], [Date] at [Time] [Timezone]

[Optional: We'll send a $[X] gift card as a thank-you for your time.]

No prep needed — it's a conversation, not a test.

[Name]
```

**Send batch cadence:**
- Send first batch of 8–10 outreach emails
- Wait 48 hours
- If response rate < 30%, adjust subject line or time slot options before sending second batch

**Calendar invites via `~~calendar` (Google Calendar):**
Once a participant confirms, create a calendar event immediately:
```
Title: [Research Sprint topic] — User Interview with [First name]
Duration: 30 minutes + 5 min buffer (set 35 min)
Location: [Video call link]
Description: [2-sentence context + agenda overview + "no prep needed"]
Attendees: researcher + participant (send invite to participant email)
Reminders: 24h before + 1h before
```

**Batch scheduling rule:** Space interviews at least 30 minutes apart to allow note-taking and immediate reaction notes between sessions. Avoid scheduling more than 3 interviews in a single day — quality degrades in session 4+.

---

### Step 4 — Status tracking throughout the sprint

Update the participant tracking board in `~~project tracker` after every interaction:

| Event | Action |
|-------|--------|
| Outreach email sent | Move card to `Outreach sent`, add sent date |
| Participant responds yes | Move to `Scheduled`, add interview date |
| Participant responds no | Move to `Declined`, note reason if given |
| Participant no-show | Add note, send one follow-up same day, move to `Declined` if no response |
| Interview completed | Move to `Completed`, attach notes file |
| 5 interviews completed | Trigger interim synthesis — don't wait for all 8 |

**When to pause outreach:** Stop sending new outreach once 8 confirmed interviews are on the calendar. Over-recruiting creates scheduling debt and participant fatigue if you end up cancelling.

---

## Interview day protocol

### Pre-interview (15 min before)
- Review participant's account context from `~~user feedback` — their recent tickets, usage notes
- Have the interview guide open (`user-research` skill for guide structure)
- Open the calendar event to confirm the video link
- Create a blank notes document linked to the participant's tracker card

### Post-interview (30 min after)
- Write immediate reaction notes (not analysis — observations and standout quotes)
- Move tracker card to `Completed`
- Tag any quotes worth surfacing to stakeholders immediately in `~~chat` (Slack `#research` or `#product` channel)
- Update the hypothesis confidence score if new evidence emerged

### After all interviews complete
- Run `/research-synthesis` on all interview notes
- Post synthesis to `~~knowledge base` using `research-repository` protocol
- Create `/discover` follow-on actions in `~~project tracker`

---

## Research sprint calendar template

A well-run 2-week research sprint follows this structure. Use `~~calendar` to block time:

| Day | Activity |
|-----|----------|
| Mon Week 1 | Brief finalized, participant list identified |
| Tue–Wed Week 1 | First outreach batch sent, calendar slots blocked |
| Thu–Fri Week 1 | First interviews (2–3 sessions) |
| Mon Week 2 | Second outreach follow-ups, interim synthesis on first 3 interviews |
| Tue–Thu Week 2 | Remaining interviews (4–5 sessions) |
| Fri Week 2 | Final synthesis session, design implications mapped |
| Mon Week 3 | Synthesis delivered to stakeholders, tracker updated |

Block these as recurring events in `~~calendar` at sprint kickoff, not retroactively.

---

## Response rate benchmarks

Use these to calibrate outreach success before spending time on follow-up.

| Outreach type | Expected response rate | If below this |
|--------------|----------------------|---------------|
| Warm (prior ticket submitter) | 50–65% | Check subject line |
| Warm (active user, no prior contact) | 30–45% | Check personalization |
| Cold (user base blast) | 10–20% | Normal — increase batch size |
| Incentivized ($25–50 gift card) | +15–25% uplift | Standard for low-engagement segments |
| Enterprise contacts (decision maker) | 15–30% | Normal — longer response window |

If response rate drops below benchmark: check email deliverability, adjust subject line, add incentive, or try `~~chat` (Slack) if the team has a community Slack with users.

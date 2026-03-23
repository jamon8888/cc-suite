---
name: discovery-call
description: "Use this skill for 'prep discovery call', 'discovery call for', 'prepare for sales call', 'post-call summary', or 'call notes for'. PRE-CALL: loads ICP + company research before generating questions. POST-CALL: produces scored BANT qualification and pipeline action."
---

# Skill: Discovery Call Assistant

Pre-call preparation with ICP fit scoring. Post-call processing with BANT qualification score and next action.

## PRE-CALL PREPARATION

### STEP 0 — CONTEXT LOAD (mandatory)

```
READ data/2-Domaines/icp.json → extract: ideal_company_size, industry, pain_points, disqualifiers
READ data/3-Ressources/[company].md  (company research if exists)
READ data/1-Projets/clients/[company].md  (prior relationship if exists)
```

Report:
```
Pre-call context:
  ICP profile: LOADED
  Company research: [FOUND — dated X / NOT FOUND — run company-research first?]
  Prior relationship: [FOUND — [N] interactions / NONE]

ICP Fit Assessment:
  Industry: [match/mismatch] — [reason]
  Company size: [match/mismatch]
  Likely pain points: [top 2 from ICP that likely apply]
  ICP fit score: [High/Medium/Low] — [1 sentence rationale]
```

### STEP 1 — COMPANY-SPECIFIC HOOKS

From research or public context, extract 2-3 specific hooks for the call opener:
- Recent news (funding, product launch, expansion)
- Visible pain signal (job postings, Glassdoor, product reviews)
- Shared context (mutual connection, their content, their problem publicly stated)

"Opening hook: '[Specific observation] — this suggests [relevant pain point]. Start here.'"

### STEP 2 — QUESTION SEQUENCE

Four phases — move from safe to specific:

**Phase 1: Situation (2-3 min)**
- "Can you walk me through how you currently handle [problem area]?"
- "What tools/systems do you use for this today?"
- "How long have you been doing it this way?"

**Phase 2: Problem (5-7 min)**
- "What are the biggest challenges with that process?"
- "What happens when [specific failure scenario based on their context]?"
- "How much time/money does this cost you per month?" ← always ask for a number
- "What have you tried before? Why didn't it work?"

**Phase 3: Impact (3-5 min)**
- "What's the business impact if this isn't solved this quarter?"
- "If you could solve this perfectly, what would change?"

**Phase 4: Decision Process (3-5 min)** — only after rapport
- "How do decisions like this typically get made at [Company]?"
- "Who else would be involved in evaluating this?"
- "What does your timeline look like?"
- "Do you have a budget allocated for solving this?"

### STEP 3 — OBJECTION SCRIPTS (pre-loaded)

| Objection | Response |
|-----------|---------|
| "We already have someone for this" | "What are the gaps you're still experiencing despite having them?" |
| "Budget is tight right now" | "Understood — when do budget decisions typically get made for next quarter?" |
| "Send me some information" | "Happy to — what specifically would help you make a decision?" |
| "We're not ready yet" | "What would need to happen for you to be ready?" |
| "Too expensive" | "What would make the price feel right for the value?" |

---

## POST-CALL PROCESSING

### STEP 4 — BANT QUALIFICATION

Score each dimension 0-25:

| Dimension | Signal | Score |
|-----------|--------|-------|
| **Budget** | Confirmed allocated → 25, Likely exists → 15, Unknown → 5, None → 0 |
| **Authority** | Decision-maker in call → 25, Champion, not buyer → 15, Wrong contact → 5 |
| **Need** | Acute pain + urgency → 25, Pain without urgency → 15, Vague interest → 5 |
| **Timeline** | <90 days → 25, 3-6 months → 15, 6+ months → 5, None → 0 |

**Total BANT score: /100**
- 80-100: Strong — move to Proposal. Send within 48h.
- 50-79: Moderate — nurture. Monthly touchpoint + valuable content.
- <50: Weak — qualify out or long-term nurture. Do not invest proposal time.

### STEP 5 — PIPELINE ACTION

```
UPDATE data/1-Projets/pipeline.md:
  - [Company]: Stage → [Discovery/Proposal/Nurture] based on BANT score
  - BANT Score: [N/100]
  - Next Action: [specific, with date]
  - Key insight: [the one thing that determines whether this closes]

UPDATE data/1-Projets/clients/[company].md:
  - Append meeting note with date, summary, BANT score
  - Update Next Action field
```

### STEP 6 — CALL SUMMARY

```markdown
# Discovery Call Summary — [Company] — [Date]

## Qualification Score: [BANT N/100] → [Strong/Moderate/Weak]

## BANT Breakdown
- Budget: [N/25] — [1-line rationale]
- Authority: [N/25] — [1-line rationale]
- Need: [N/25] — [1-line rationale]
- Timeline: [N/25] — [1-line rationale]

## Key Insight
[The one thing that will determine whether this closes — what the prospect cares most about]

## Pain Points Surfaced
[Verbatim quotes where possible]

## Decision Process
[Who's involved, timeline, how they buy]

## Recommended Next Action
[Specific with date — e.g., "Send proposal by [date] addressing [specific concern]"]

## Open Questions (to answer in proposal or next call)
[What we still don't know that matters]
```

---

## Integration Points
- **Reads**: icp.json, company research, client card
- **Writes**: call-summary.md, updates pipeline.md and client card
- **Feeds**: proposal-generator, sales-pipeline

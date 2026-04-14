---
name: research-repository
description: Use ~~knowledge base (Notion, Confluence) as a living research repository — search before starting new research, publish syntheses in a consistent structure, maintain a living personas document, and surface prior insights on demand. Activates when a knowledge base connector is available and the user wants to store, find, or build on prior research. Trigger phrases: "save this research", "has this been studied before", "find prior research on X", "update our personas", "publish the synthesis", "what do we already know about Y".
---

# Research Repository

This skill teaches Claude how to use `~~knowledge base` as a structured, searchable, living research repository — not just a filing cabinet, but an active decision-support system that prevents duplicate research, surfaces relevant prior findings, and compounds knowledge over time.

**The core principle**: every research sprint should first answer the question "do we already know this?" before investing in new research. This skill operationalizes that check.

---

## Repository structure

Before using the knowledge base as a research repository, it needs a consistent structure. If this is the first research stored, propose this structure to the user before writing anything.

```
Research/
├── _Living Documents/
│   ├── Personas (updated after each relevant sprint)
│   ├── Known Pain Points (updated continuously from feedback mining)
│   └── Open Research Questions (queue for future sprints)
├── Studies/
│   ├── [YYYY-MM] [Hypothesis/Topic] — [Method]
│   │   ├── Brief
│   │   ├── Guide (interview / survey / test)
│   │   ├── Raw Notes
│   │   └── Synthesis
│   └── ...
├── Feedback Mining/
│   ├── [YYYY-MM] [Topic] — Intercom
│   ├── [YYYY-MM] [Topic] — Slack
│   └── ...
└── Templates/
    ├── Research Brief template
    ├── Interview Guide template
    └── Synthesis template
```

If the knowledge base already has research but no consistent structure, propose a migration: map existing documents to this structure rather than starting over.

---

## Protocol 1 — Search before starting (prevent duplicate research)

**Run this before every new research sprint.** It takes 5 minutes and prevents 2-week investment in questions already answered.

**Step 1: Query for the hypothesis**
```
Search ~~knowledge base for: [hypothesis keywords] AND [feature area keywords]
Look in: Studies/ + Feedback Mining/ + _Living Documents/Known Pain Points
```

**Step 2: Evaluate recency and relevance**
A prior study is relevant if:
- It was conducted less than 12 months ago (user behavior changes; >12 months is usually stale)
- The participant segment matches the current hypothesis segment
- The product state at time of study was similar enough to today

A prior study is NOT sufficient to skip new research if:
- The product has changed significantly since the study
- The segment being studied is different (enterprise vs. SMB findings don't transfer)
- The study was conducted before a major pivot or feature launch

**Step 3: Classify the situation and recommend action**

| Situation | Recommendation |
|-----------|---------------|
| Prior study found, recent (<12 months), same segment | Surface the synthesis. No new research. Update if needed. |
| Prior study found, dated (>12 months) | Run a targeted follow-up (4 interviews, not 8) to check if findings still hold |
| Prior study found, different segment | New research required — prior findings may not transfer |
| No prior study found | Run full sprint |
| Related findings found, not a direct match | Treat as background context. Run focused sprint on the gap. |

**Output format for the search step:**

```markdown
## Prior Research Check: [Hypothesis]
**Queried**: ~~knowledge base | **Date**: [today]

### Found
- [Study name] — [Date] — [Method] — [N participants] — [Segment]
  Relevance: [High / Medium / Low] — [Why]
  Key finding: [1–2 sentences]

### Assessment
[Prior study found and sufficient / Prior study found but dated / Gap exists / No prior research]

### Recommendation
[Proceed with full sprint / Run targeted follow-up (4 sessions) / Skip — use existing synthesis / Start new sprint with prior study as background]
```

---

## Protocol 2 — Publish synthesis (consistent storage)

After every research sprint, publish the synthesis to the repository in a consistent format. Consistency is what makes the repository searchable and useful to people who weren't in the room.

**In `~~knowledge base`, create a page at:**
`Research/Studies/[YYYY-MM] [Hypothesis] — [Method]/Synthesis`

**Standard synthesis page structure:**

```markdown
# [Hypothesis statement]
**Date**: [YYYY-MM-DD] | **Method**: [Interviews / Survey / Usability Test]
**Participants**: [N] — [Segment description]
**Researcher**: [Name] | **Stakeholders**: [Names]
**Status**: Complete ✓

## Research question
[Single, specific question this sprint answered]

## Hypothesis result
☐ Confirmed / ☐ Partially confirmed / ☐ Rejected / ☐ Inconclusive

**Summary**: [2–3 sentences: what we found and what it means]

## Key findings
### Finding 1: [Short title]
**Prevalence**: [X of N participants]
**Evidence**: [Supporting quote(s)]
**Implication**: [What this means for the product]

### Finding 2: ...

## Design implications
| Finding | Recommended action |
|---------|--------------------|
| [Finding] | `/wireframe [screen]` / `/flow [journey]` / `/ux-copy [context]` |

## Open questions
- [What this sprint didn't answer]
- [What we should investigate next]

## Tags
[feature area] [segment] [method] [product area] [platform]
```

**Tagging rules**: Always add at least one feature tag, one segment tag, and one method tag. Tags are what make cross-study search work 6 months from now.

---

## Protocol 3 — Update living documents

After each sprint, update the three living documents. These are the high-value artifacts that compound over time.

### Living Personas

A persona document should be updated after any sprint that produces segment-specific findings.

**Update rule**: never replace a persona — append with version history. A persona in April may be different from the same segment in October if the product or market has changed.

```markdown
## [Persona name] — [Segment]
*Last updated: [date] after [study name]*

### Who they are
[2–3 sentences: role, context, relation to your product]

### Primary goals
1. [Goal]
2. [Goal]

### Key pain points (from research)
| Pain | Evidence | Last seen |
|------|----------|-----------|
| [Pain] | [Study link] | [Date] |

### Mental models
- [How they think about [concept]] — confirmed in [study]

### Quotes
> "[Verbatim quote that captures their perspective]" — P[X], [Study name], [Date]

### Update history
- [Date]: Added [pain] from [study]
- [Date]: Revised [mental model] after contradicting finding in [study]
```

### Known Pain Points

A running catalogue of confirmed user problems. Every pain confirmed in research gets an entry; every pain invalidated by research gets a strikethrough + note.

```markdown
| Pain | Confirmed in | Segment | Severity | Status |
|------|-------------|---------|----------|--------|
| [Pain] | [Study link] | [Segment] | P0/P1/P2 | Open / In progress / Resolved |
```

Severity: P0 = blocks core task · P1 = significant friction · P2 = annoyance · P3 = cosmetic

### Open Research Questions

A queue of questions the team has but hasn't answered yet. Fed by "Open questions" sections of every synthesis.

```markdown
| Question | Source | Priority | Assigned to | Sprint |
|----------|--------|----------|-------------|--------|
| [Question] | [Study that surfaced it] | High/Med/Low | — | — |
```

---

## Protocol 4 — Surface prior findings on demand

When a team member asks "what do we know about X", use the knowledge base to answer it before defaulting to "we should run research."

**Query protocol:**
```
1. Search ~~knowledge base for [topic keywords] in Research/
2. Search Living Documents/Known Pain Points for [topic]
3. Search Living Documents/Personas for [relevant segment]
4. Return: [N studies found] + [key findings] + [last updated date] + [open questions]
```

**Output format:**
```markdown
## What we know about: [Topic]
*Source: ~~knowledge base research repository*

### Relevant studies
- [Study name] ([date], [N participants]): [Key finding in 1 sentence] → [link]

### Confirmed pain points in this area
- [Pain] — confirmed [date], severity [P0/P1/P2] — [link to study]

### Persona relevance
- [Persona] experiences this as: [description]

### Gaps / open questions
- [What we don't know yet]

### Recommendation
[We have sufficient knowledge — act on it / We have partial knowledge — targeted follow-up needed / Unknown — full sprint needed]
```

---

## Repository health checks

Run these quarterly to keep the repository useful.

| Check | Threshold | Action |
|-------|-----------|--------|
| Studies older than 18 months | If product has changed significantly | Flag as "may be stale" |
| Personas not updated in 12 months | — | Schedule a persona refresh sprint |
| Pain points with status "Open" older than 6 months | If P0/P1 | Escalate to product review |
| Studies without tags | Any | Add tags retroactively |
| Studies without "Design implications" section | Any | Add the section using the synthesis template |

A repository that isn't maintained becomes noise. The quarterly check takes 30 minutes and keeps the asset usable.

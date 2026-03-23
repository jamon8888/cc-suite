---
name: scope-management
description: "Use this skill for 'scope creep', 'change request', 'out of scope', 'client wants to add'. Always reads the original contract/proposal before classifying. Generates formal Change Request document, not just conversation guidance."
---
# Skill: Scope Management

## STEP 0 — READ ORIGINAL SCOPE (mandatory)

```
READ data/1-Projets/[project]/  → find: contract, SOW, proposal, or any signed document
```

Report: "Original scope found: [document name, dated X]. Let me compare the request against it."

If no document found: "I don't have a written scope document for this project. The request classification will be based on your description — which carries more risk. Consider formalizing scope going forward."

## STEP 1 — CLASSIFY THE REQUEST

| Category | Definition | Common tell |
|----------|-----------|-------------|
| **Clarification** | Refining something in scope | "A bit different shade / slightly shorter" |
| **Enhancement** | Improving a scoped deliverable beyond spec | "Can we add animations / more detail" |
| **Addition** | Entirely new deliverable | "Can you also build / write / create X" |
| **Revision** | Re-doing completed work due to direction change | "Actually we want a completely different..." |

Verify against original scope: "Is [request] in the original scope? [Yes/Grey area/No]"

## STEP 2 — IMPACT ASSESSMENT

For Enhancement, Addition, or Revision:

| Dimension | Current Plan | With Change | Delta |
|-----------|-------------|-------------|-------|
| **Timeline** | [End date] | [New end date] | +[N] days |
| **Budget** | [Total fee] | [New total] | +€[X] |
| **Hours** | [Remaining] | [New estimate] | +[N] hours |
| **Risk** | [Current] | [New] | [Scope/quality impact] |

**Complexity premium for mid-project additions**: +20-30% on the additional scope. State explicitly: "Mid-project scope changes require context-switching and coordination overhead. The additional fee includes a 25% complexity premium — standard practice."

## STEP 3 — RESPONSE DECISION TREE

| Impact level | Action |
|-------------|--------|
| < 1 hour, no timeline impact | Do it, note it informally |
| 1-4 hours | Communicate impact, offer to include in a future batch |
| > 4 hours or timeline impact | Formal Change Request required |
| Revision of completed work (direction change) | Always CR, always billed |

## STEP 4 — CONVERSATION SCRIPT

**For out-of-scope requests:**
> "I want to make sure we deliver everything we committed to at the quality you expect. [Request] goes beyond our agreed scope, so I'd need to handle it as a Change Request. Here's what that would look like: [impact summary]. Want me to put together a formal CR, or would you prefer to schedule it for a future phase?"

**Never say:** "No problem!", "I'll squeeze it in", "Just this once" — each exception trains the client to expect more.

## STEP 5 — GENERATE CHANGE REQUEST DOCUMENT

```markdown
# Change Request — CR-[NUMBER]
**Project**: [Project name]
**Client**: [Client name]
**Date**: [Today]
**Requested by**: [Client contact]

## Description
[What was requested]

## Original Scope Reference
[Quote the relevant section from the original SOW/contract]

## Classification: [Enhancement / Addition / Revision]

## Impact Assessment
[Table from Step 2]

## Proposed Fee
Base scope addition: €[X]
Complexity premium (25%): €[X]
**Total CR value: €[X]**

## Timeline Impact
Current delivery date: [Date]
New delivery date: [Date + delta]

## Approval
[ ] Approved — signature: _________ Date: _________
[ ] Declined
[ ] Deferred to future phase
```

Save to: `data/1-Projets/[project]/CR-[number]-[description].md`
Update client card with the CR.

---

## Integration Points
- **Reads**: project contracts/proposals
- **Feeds**: invoice-generator (new CR billing), client card

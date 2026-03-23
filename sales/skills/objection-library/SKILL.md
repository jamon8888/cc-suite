---
name: objection-library
description: "Use when the user asks 'how do I handle [objection]', 'they said [objection]', 'pushback on price/timing/competitors'. Asks for stage and role before responding — the same objection at Discovery vs Close needs completely different handling."
---

# Skill: Objection Library

## STEP 0 — LOAD CONTEXT

```python
base = SOLO_ROOT if solo_installed else SALES_ROOT
voice_dna = read(f"{base}/data/2-Domaines/voice-dna.json")
```

Before generating any response, collect 3 pieces of context (ask once, as a single question):

```
To give you the right response, I need 3 things:
1. Deal stage: [Discovery / Demo / Proposal sent / Negotiation / Closing]
2. Who raised it: [Champion / Economic Buyer / Technical Evaluator / Unknown]
3. Any prior context: [has this objection come up before in this deal?]
```

Stage and role determine everything:
- "Too expensive" from an Evaluator at Discovery → price isn't the real issue, discovery is incomplete
- "Too expensive" from the CFO at Close → this is a real negotiation, trading variables apply
- Same objection, opposite responses.

## STEP 1 — REAL OBJECTION DIAGNOSIS

Stated objections are proxies. Before responding, surface the real one:

| Stated | Usually means | Diagnostic question |
|---|---|---|
| "Too expensive" | "ROI not justified" or "wrong budget owner" | "Is it the price itself, or the difficulty justifying it internally?" |
| "Not the right time" | "Not a priority for leadership" | "What would need to change for this to become urgent?" |
| "We need to evaluate alternatives" | "Not convinced yet" | "What specifically are you still uncertain about?" |
| "Need to think about it" | "Afraid to commit" or "missing info" | "What information would make this an easy yes?" |
| "We already have a solution" | "Don't see differentiation" | "What gaps does your current solution leave?" |

State the real objection before writing the response:
> "Stated: 'Too expensive' | Most likely real: ROI not tied to specific business outcome. Response targets the real objection."

## STEP 2 — ACA RESPONSE (in Voice DNA)

**A — Acknowledge**: Name the concern without dismissing it
**C — Clarify**: One diagnostic question (never skip — it changes everything)
**A — Answer**: Address the real objection, not the stated one

Apply voice-dna.json tone to the response.

### Stage-specific variants

**At Discovery (objection = resistance, not negotiation):**
- Don't defend price — you haven't established value yet
- Goal: keep the conversation open, surface the real concern

**At Proposal (objection = evaluation, they're comparing):**
- Acknowledge, then anchor to the business outcome from the proposal
- Bring in ROI numbers: "You mentioned [pain] costs you [X/month] — at [our price], you break even in [N] months"

**At Close (objection = last-mile negotiation):**
- Trading variables, not capitulation
- "If I [concession X], can you [commitment Y]?"

### Role-specific variants

**CFO / Economic Buyer**: Focus on ROI, payback period, risk reduction
**VP / Business Owner**: Focus on time saved, revenue impact, competitive advantage
**Technical Evaluator**: Focus on implementation risk, integration, security
**Champion**: Focus on their personal win — how does closing this advance their career?

## STEP 3 — 3 RESPONSE OPTIONS

For any significant objection, generate 3 responses ranked by aggressiveness:

```
Option 1 — Soft (preserve relationship, buy time):
[Response]

Option 2 — Direct (address head-on, maintain position):
[Response]

Option 3 — Challenge (flip the frame, create urgency):
[Response]

Recommended: Option [N] — because [deal stage + relationship context]
```

---

## Integration Points
- **Reads**: voice-dna.json, objection-categories-en.md (or fr)
- **Feeds**: call-prep (pre-loaded objection scripts), sales-coach-agent (pattern tracking)

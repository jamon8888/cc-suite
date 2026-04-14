---
name: sales-email-sequence
description: "Use this skill when the user asks to 'create email sequence', 'welcome sequence', 'launch email sequence', 'sales emails', or 'nurture sequence'. Adapts architecture according to ticket price (low/mid/high) and business model (B2C/B2B). High-ticket and B2B sequences route to a booking call, not a direct purchase. Templates from sequences-structures.md load on demand."
---

# Sales Email Sequence Creator

Email sequences are not all the same. A sequence selling a €27 ebook and a sequence selling a €5000 coaching program share almost nothing except the medium. This skill adapts its logic based on the parameters of the offer.

## Step 0: Offer Classification

Answer before writing a single email:

**Ticket price:**
| Range | Category | Closing mechanism |
|-------|----------|------------------|
| < €100 | Low ticket | Email → direct purchase |
| €100–€999 | Mid ticket | Email → sales page → purchase |
| €1000–€5000 | High ticket B2C | Email → landing page → booking call → close |
| > €5000 or any B2B | Premium | Email → thought leadership → booking call → proposal → close |

**Business model:**
- **B2C**: Single decision-maker, emotional drivers, faster cycle
- **B2B**: Buying committee, rational justification required, longer cycle (weeks–months)
- **B2B2C / Agency**: Hybrid — need both ROI language AND emotional resonance

**Audience temperature:**
- **Cold** (never heard of you): Trust bridge first, no pitch until email 3+
- **Warm** (subscribed, read content): Shorter trust bridge, faster to offer
- **Hot** (past buyer, engaged): Can move to offer quickly, focus on upgrade logic

---

## Step 1: Sequence Architecture by Ticket

### Low Ticket (< €100) — 5 emails, 5 days

| Email | Day | Role |
|-------|-----|------|
| 1 | D+0 | Deliver lead magnet + set expectations |
| 2 | D+2 | Origin story — why you made this |
| 3 | D+3 | The core insight — shift their belief |
| 4 | D+4 | Proof — result, testimonial, case study |
| 5 | D+5 | Direct offer with urgency |

### Mid Ticket (€100–€999) — 7 emails, 10 days

| Email | Day | Role |
|-------|-----|------|
| 1 | D+0 | Deliver + set up the story arc |
| 2 | D+2 | Their biggest mistake (name the enemy) |
| 3 | D+4 | The epiphany — what changed your view |
| 4 | D+6 | Social proof — specific result with number |
| 5 | D+8 | Objection pre-emption (time, price, "I'll do it myself") |
| 6 | D+9 | Offer — full pitch |
| 7 | D+10 | Last chance — honest scarcity |

### High Ticket B2C (€1000–€5000) — 10 emails, 21 days + call

**Key difference:** Email is not the close. Email earns the call. The call closes.

| Email | Day | Role |
|-------|-----|------|
| 1 | D+0 | Deliver + name the transformation they're here for |
| 2 | D+3 | The hidden cost of staying where they are |
| 3 | D+6 | Your story — the moment you faced the same problem |
| 4 | D+9 | Social proof — client story, specific situation and outcome |
| 5 | D+12 | The diagnosis — what's actually blocking them (not what they think) |
| 6 | D+15 | Your framework — explain the mechanism without giving it all away |
| 7 | D+17 | Client result #2 — different context from email 4 |
| 8 | D+18 | The invitation — apply or book a call |
| 9 | D+20 | Objection handling (not ready / can't afford / no time) |
| 10 | D+21 | Final call — closing email |

**Scarcity rule for high ticket:** Never use fake scarcity ("only 2 spots left" without proof). Use real scarcity: "I take 3 clients per month. Here's why that number matters for you." Or use timeline scarcity: "price increases after the beta cohort."

### B2B Sequence (any ticket) — 9 emails, 30 days + call

**Key differences:**
- Rational justification required alongside emotion
- Business case framing (ROI, risk, peer proof)
- Multiple stakeholders may read — write for the Champion, footnote for the Economic Buyer
- Booking call is mandatory, not optional

| Email | Day | Role |
|-------|-----|------|
| 1 | D+0 | Establish credibility — what problem you solve in their industry |
| 2 | D+4 | Industry insight — data or trend they care about |
| 3 | D+8 | The cost of inaction — in numbers if possible |
| 4 | D+12 | Client case study — same role/industry as recipient |
| 5 | D+16 | The diagnosis — most common root cause you see |
| 6 | D+19 | Your approach — what makes it different (methodology, not features) |
| 7 | D+22 | Peer proof — who else like them has done this |
| 8 | D+26 | The invitation — discovery call with clear agenda |
| 9 | D+30 | Follow-up — simple, short, no pressure |

---

## Step 2: Writing Guidelines (All Types)

**The P.S. strategy:**
- Every email must have a P.S. — it's the second most-read element
- Use for: restate the core offer link / add a social proof quote / one-line emotional kicker

**Objection matrix:** For the objection-handling email, address the top 3 in order of frequency:
1. "I don't have time" → Reframe as cost of lost time
2. "It's too expensive" → Show ROI or cost of inaction
3. "I need to think about it" → Name the real hesitation they won't say out loud

**Mobile first:**
- Subject line < 40 chars
- Preview text supports subject, doesn't repeat it
- First sentence viewable in Gmail preview (90 chars)
- Each email reads in < 3 minutes

---

## Output Format

```markdown
# Sequence: [Name] — [Type] — [Ticket Category]

## Sequence Overview
- Offer: [Product/service + price]
- Type: [Low/Mid/High/B2B]
- Length: [N] emails / [N] days
- Closing mechanism: [Direct purchase / Sales page / Booking call]

---

## Email [N]: Day [X] — [Role]

**Subject:** [< 40 chars]
**Preview:** [< 80 chars — adds info, doesn't repeat subject]

**Body:**
[Email content]

**P.S.** [Copy]

---
[Repeat for all emails]
```

See `templates/sequence-structures.md` for additional templates and objection-handling scripts.

---
name: negotiation-advisor
description: "Use when the user asks to 'negotiate deal', 'price pushback', 'they want a discount', 'strategy for call'. Asks for walk-away price and probes competitor threats before advising. Triggers Sentinel before Phase 2 when installed."
---

# Skill: Negotiation Advisor

## STEP 0 — SITUATION INTAKE

Before any analysis, collect the 3 things that change everything:

```
Before I build your strategy, I need:
1. What's your walk-away price / minimum acceptable outcome?
2. Who's the competitor they mentioned (if any) — and is it real or a pressure tactic?
3. What's your BATNA if this deal dies? (Be honest — it determines your leverage)
```

**Competitor threat assessment**: If they said "we'll go with [Competitor]":
- Ask: "Do you know which specific competitor?"
- If named: check win/loss data — "Have we lost to them before? What was the pattern?"
- If vague: likely a pressure tactic — adjust leverage analysis accordingly
- "We have options" without naming anyone = 80% pressure play

## STEP 1 — LEVERAGE ANALYSIS

| Factor | Your position | Their position |
|---|---|---|
| Who has the deadline? | [assess] | [assess] |
| Who has alternatives (BATNA)? | [assess] | [assess] |
| How acute is their pain? | [assess] | — |
| What's the switching cost for them? | — | [assess] |

**Deal health score**:
- Strong (you): deadline on their side, limited alternatives, acute pain → hold firm
- Even: negotiate carefully, give on low-cost variables first
- Weak (them): don't panic, find their constraint and solve it creatively

## STEP 2 — SENTINEL INTEGRATION (if installed)

```python
if sentinel_installed:
    invoke("sentinel-v8: questioner") → challenge assumptions about your leverage
    invoke("sentinel-v8: failure-finder") → surface 2-3 ways this negotiation fails
    present_challenges_before_phase_3 = True
```

Present Sentinel's challenges: "Before the strategy, Sentinel raised: [challenges]. How do you respond?"

## STEP 3 — TRADING VARIABLES (not just price)

**The order of sacrifice** (give cheapest first, save price for last):
1. **Timeline** — accelerate delivery, earlier start
2. **Payment terms** — split payments, milestone billing
3. **Scope** — remove or defer non-critical deliverables
4. **Access / support** — reduce SLA tier, async only support
5. **Case study rights** — use as reference customer (value to you)
6. **Price** — only after all other variables are exhausted

Build a trading table:
```
If they ask for [X], offer [Y instead]:
- "20% discount" → "I can't move on price, but I can split the payment across 3 months"
- "Shorter contract" → "Shorter term means higher monthly rate — or we do 12 months at this price"
```

## STEP 4 — TACTICAL SCRIPTS (Voss framework)

From `references/scripts.md` — apply based on situation:

**Label their concern** (before countering):
> "It sounds like the budget timing is the real constraint, not the value..."

**Mirror** (buy time, get them talking):
> "Too expensive?" [silence]

**Calibrated question** (shift the problem to them):
> "How are you supposed to justify this investment to your CFO without the ROI data we'd generate together?"

**Accusation audit** (pre-empt their objection):
> "You're probably thinking our price is too high for a company your size. Here's why the math actually works in your favor..."

## STEP 5 — WALK-AWAY SCRIPT

If they push below your floor:
> "I really want to find a way to make this work. But at [their number], I'd actually be losing money on this engagement — and that would make me a bad partner for you. The lowest I can go is [X], and here's exactly what you get for that..."

Never apologize for your price. Discounting without resistance signals your original price was wrong.

---

## Integration Points
- **Reads**: deal files, win-loss history (competitor assessment), sales-profile.json
- **Triggers**: Sentinel questioner + failure-finder before Phase 3
- **Triggered by**: `/sales:negotiate`

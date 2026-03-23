---
name: pricing-strategy
description: "Use this skill for 'pricing strategy', 'create rate card', 'set my rates', 'value-based pricing'. Reads business-profile.json first, saves rate card back to it after. Surfaces market benchmarks. Triggers Sentinel when installed."
---
# Skill: Pricing Strategy

## STEP 0 — LOAD AND SAVE CONTEXT

```
READ data/2-Domaines/business-profile.json → services, revenue_model, target_market, income_target
```

After generating the rate card, SAVE it back:
```
WRITE data/2-Domaines/business-profile.json → rate_card: {[generated rates]}
```

This ensures proposal-generator and invoice-generator always use current rates.

## STEP 1 — BASELINE RATE CALCULATION

If income_target not in business-profile: ask "What's your annual income target and total annual expenses?"

```
Annual need = income_target + annual_expenses
True billable hours/month = 97 hours (22 days × 8h × 55% — admin, bizdev, breaks)
Minimum hourly rate = Annual need / (97h × 12)
```

Explain the utilization choice: "I'm using 55% utilization (97h/month). At 70% you'd have more income but risk burnout. At 50% you'd have more buffer but need higher rates."

**Market benchmark**: Surface rate context for the user's service type:
- "Content strategy consultants in France: typically €450-800/day"
- "UX/Product consultants: typically €600-1100/day"
- "Tech consultants: typically €500-950/day"
(Use web search if Exa is available for current market data)

## STEP 2 — THREE-TIER RATE CARD

| Tier | Scope | Pricing | Best for |
|------|-------|---------|---------|
| **Essentiel** | Core deliverable only | Cost-based (hours × min rate) | Budget-constrained clients |
| **Standard** | Full service (recommended) | Min rate + 30% expertise buffer | Most clients — highlight this |
| **Premium** | Full service + strategy + priority access | Value-based (10-20% of value created) | High-ROI clients |

For each service, define: what's included / excluded / timeline / price rationale.

## STEP 3 — VALUE-BASED PRICING EXERCISE

For high-impact engagements, ask:
1. "What is this problem costing the client per month?"
2. "What would solving it be worth to them in 12 months?"
3. "What's the cost of doing nothing for 6 more months?"
4. "How does your price compare to hiring full-time for this function?"

**Rule**: Price at 10-20% of the value you create. If you can't quantify the value, default to market rates.

## STEP 4 — SENTINEL INTEGRATION

If Sentinel is installed:
```
INVOKE sentinel-v8: reality-checker on income_target and rate_card
INVOKE sentinel-v8: sentinel-reframe on pricing assumptions
```

Present Sentinel's challenge before finalizing: "Sentinel flagged: [challenge]. How do you respond to this?"

## STEP 5 — SAVE RATE CARD

```
UPDATE data/2-Domaines/business-profile.json:
  rate_card: {
    last_updated: [date],
    hourly_minimum: [X],
    daily_standard: [X],
    tiers: { essentiel: [...], standard: [...], premium: [...] }
  }
```

Confirm: "Rate card saved to your business profile. Proposal generator and invoice generator will now use these rates."

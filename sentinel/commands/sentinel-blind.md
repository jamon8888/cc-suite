---
name: sentinel-blind
description: >
  Generates a personal cognitive bias profile from the decision ledger.
  Analyzes patterns in calibration errors, retrospective assessments, and
  recurring bias flags to identify the user's most active blind spots.
  Output is a personal bias fingerprint that adjusts future triage
  weights — so Sentinel pre-loads the biases most relevant to THIS user,
  not just the generic decision-type defaults. Requires minimum 5 resolved
  decisions in the ledger.
allowed-tools: Read, Write
model: sonnet
---

<example>
user: "/sentinel-blind"
assistant: |
  bias_profile:
    data_points: 12 resolved decisions
    
    pattern_1:
      name: "Systematic timeline overconfidence"
      bias_ids: [9, 44]  # Planning Fallacy + Optimism Bias
      evidence: "8/12 decisions had timeline predictions that were optimistic by avg 2.3x"
      adjustment: "When this user estimates timelines, multiply by 2.3 before scoring"
      
    pattern_2:
      name: "Strong outside-view anchoring on financial projections"
      bias_ids: [1, 76]  # Anchoring + Survivorship Bias
      evidence: "Revenue projections in 4 decisions cited industry benchmarks that turned out to be survivorship-biased"
      adjustment: "Flag all revenue projections for survivorship audit"
      
    pattern_3:
      name: "Good calibration on people decisions"
      bias_ids: []
      evidence: "4 hiring decisions: Brier score 0.14 — well-calibrated"
      adjustment: "No adjustment needed in hiring domain"
      
    triage_overrides:
      financial_decisions: "Auto-add IDs 9, 44, 76 regardless of decision type"
      timeline_estimates: "Apply 2.3x correction factor to MAP confidence scores"
      
    blind_spot_warning: "You are better at identifying biases in financial decisions than
    in people decisions. Your calibration score is reversed — you think you're
    better at people but the data says otherwise."
<commentary>
The blind_spot_warning is the most valuable output. It catches the Bias Blind Spot
(ID 95) — where someone believes they are unbiased in the domain where they are
most biased.
</commentary>
</example>

# /sentinel-blind — Personal Bias Profile

## Why personalization matters

The default triage routes decisions to generic bias sets based on decision type.
This ignores the most important variable: the individual making the decision.

Tetlock's superforecasting research shows that individual bias profiles are:
- Stable across domains (overconfident people are overconfident in most areas)
- Identifiable from as few as 10-15 tracked predictions
- Correctable when made explicit and integrated into the decision process

/sentinel-blind uses the decision ledger to build a personal bias fingerprint —
and then feeds it back into Sentinel's triage so future analyses are calibrated
to the specific person using it.

## Language
Respond in the user's language.

## Step 1 — Read and validate the ledger

Read `data/decision-ledger.json`

Count decisions where `resolution.status = "resolved"`.

Minimum data requirements:
- < 5 resolved decisions: "Insufficient data. Run /sentinel-post on past decisions first."
- 5–10 decisions: Preliminary profile with explicit uncertainty
- 11–20 decisions: Reliable profile
- 21+ decisions: High-confidence profile with domain breakdown

Delegate calibration computation to the **calibration-coach** agent (Steps 2–4 of its workflow):
- Brier score overall
- Overconfidence by confidence bucket
- Domain breakdown
Pass the full ledger content to the agent.

## Step 2 — Pattern analysis

Analyze resolved decisions for the following patterns:

**Pattern A — Calibration by direction**
Are errors systematic in one direction?
- Consistent overconfidence (predicted 80%, actual 50%): Planning Fallacy + Optimism Bias
- Consistent underconfidence (predicted 40%, actual 70%): Pessimism Bias + Worst-case framing
- Mixed but domain-specific: identify which domains show systematic drift

**Pattern B — Timeline accuracy**
Extract all predictions involving timelines.
Calculate average prediction error ratio (actual / predicted).
If ratio > 1.3 consistently: Planning Fallacy pattern confirmed.
Generate a personal timeline correction factor.

**Pattern C — Outcome attribution in retrospectives**
From /sentinel-post reviews: does the user systematically attribute successes
to their decisions and failures to external factors?
This is the Self-Serving Bias signature.

**Pattern D — Domain calibration comparison**
Break Brier scores by decision domain.
Identify the domain where the user is MOST confident they are well-calibrated
AND has the WORST actual calibration score.
This is the Bias Blind Spot domain — where the user is most vulnerable.

**Pattern E — Recurrence of specific biases**
Which bias IDs have appeared most frequently in Questioner outputs
or in /sentinel-post retrospective audits?
These are the user's recurring cognitive patterns.

## Step 3 — Generate personal triage overrides

Output a structured profile that can be read by the /sentinel triage step:

```yaml
personal_bias_profile:
  version: "<date>"
  data_points: <n>
  confidence: "<LOW|MODERATE|HIGH>"
  
  recurring_biases:
    - bias_id: <n>
      name: "<bias name>"
      evidence: "<pattern description>"
      frequency: "<n/total decisions>"
  
  triage_overrides:
    always_add: [<bias IDs to always include regardless of decision type>]
    correction_factors:
      timeline_multiplier: <float>  # e.g., 1.8 means multiply timeline estimates by 1.8
      confidence_deflation: <float>  # e.g., 0.85 means reduce stated confidence by 15%
  
  blind_spot_domain: "<domain where calibration is worst but self-assessment is best>"
  
  strength_domain: "<domain where calibration is genuinely strong>"
```

## Step 4 — The blind spot confrontation

This is the most important output, and the hardest to deliver.

The Bias Blind Spot (ID 95) means people are systematically worse at seeing
biases in their own reasoning than in others'. And they are most blind in
the domain where they feel most competent.

Generate an explicit statement:
"Based on your decision history, you are LESS well-calibrated in [domain]
than you believe. Your subjective confidence in this domain is [X],
but your Brier score is [Y] — worse than your average. This is the
textbook Bias Blind Spot pattern. Sentinel will now flag this domain
with higher scrutiny in future analyses."

Deliver this directly. Do not soften it. The value is in the confrontation.

## Step 5 — Integrate into future sessions

Write the personal profile to `data/bias-profile.json`.

The CLAUDE.md reads this file at session start and injects the
triage overrides into the routing logic.

## Output format
```
📊 PERSONAL BIAS PROFILE
Data: <n> decisions | Confidence: <level>

🔁 RECURRING PATTERNS
[pattern 1 — bias name, frequency, adjustment]
[pattern 2 — bias name, frequency, adjustment]

⚙️ TRIAGE OVERRIDES (active for next session)
Always pre-load: [bias IDs]
Timeline correction: [factor]
Confidence deflation: [factor]

🎯 BLIND SPOT WARNING
[direct statement about worst-calibrated domain]

💪 CALIBRATION STRENGTH
[domain where judgment is most reliable]
```

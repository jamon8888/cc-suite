---
description: Review past predictions and calibration accuracy — track decision quality over time
---

# /review — Calibration Review

Review past predictions and measure calibration accuracy. Track how well your strategic calls have performed over time.

## Usage

```
/review
```

## Workflow

Invoke the **calibrator** agent to:
1. Load the prediction ledger
2. Score past predictions against actual outcomes
3. Calculate Brier scores and calibration metrics
4. Identify patterns (overconfidence, underconfidence by domain)
5. Generate a calibration report with improvement recommendations

## Output

A calibration report showing:
- Prediction accuracy over time
- Brier score trends
- Confidence calibration curve
- Specific patterns to watch for

---
name: sentinel-review
description: >
  Review past predictions and measure calibration. Calculates Brier scores,
  identifies patterns, suggests improvements.
allowed-tools: Read
model: sonnet
---


<example>
user: "/sentinel-review"
assistant: "[Reads ledger -> calculates stats -> shows calibration patterns -> suggests one specific improvement]"
</example>

# /sentinel-review - Learn From Your Predictions

## Method
1. Read `data/decision-ledger.json`
2. **First: surface overdue predictions** — find all entries where `resolved = false` AND `review_date` is in the past. Display them as a prioritised list:
   ```
   📋 OVERDUE REVIEWS ([n] decisions waiting)
   - [decision description] — review was due [date] — run /sentinel-post [id]
   ```
   If there are overdue predictions, lead with this block before any calibration stats.
   If none: note "No overdue predictions."
3. Delegate to **calibration-coach** agent for Brier score computation and pattern analysis on resolved decisions
4. Identify patterns:
   - Overconfidence in which domains?
   - Timeline accuracy
   - People-dependent vs system-dependent predictions
5. One actionable recommendation

## If no predictions yet
"No predictions recorded yet. After your next /sentinel analysis,
I'll record a prediction. Come back in [timeframe] to see how it went."

## Language
Respond in the user's language.

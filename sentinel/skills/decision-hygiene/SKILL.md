---
name: decision-hygiene
description: >
  Core decision analysis skill. Trigger whenever the user: describes a decision,
  choice, or dilemma in natural language ("I need to choose between...", "we're
  torn between...", "should we...", "I'm not sure whether to...", "help me decide");
  faces a trade-off between options; asks to triage, structure, or analyse a decision;
  asks for noise audit, calibration check, or bias catalog lookup; uses phrases like
  "decision hygiene" or "triage this decision". Trigger proactively — do not wait for
  technical vocabulary. Also activates for: structured scoring of options, judgment
  variance measurement, prediction tracking, heuristic pattern queries.
---

# Decision Hygiene Skill

## What this skill provides

Reference catalogs for structured lookups (read on demand):
- **bias-catalog.yaml** — cognitive biases with detection questions (questioner agent)
- **fallacy-catalog.yaml** — logical fallacies with structural patterns (logic-tester agent)
- **heuristic-patterns.yaml** — common heuristic activations
- **inhibition-strategies.yaml** — bias inhibition approaches

Inline computation formulas (no scripts required in Cowork):
- **Triage** — stakes/complexity scoring → protocol routing (in sentinel.md)
- **Noise** — divergence, CV, IQR algorithms (in noise-calculator agent)
- **Calibration** — Brier score, overconfidence by bucket (in calibration-coach agent)

## Important note on catalogs
The `interaction_multipliers` in bias-catalog.yaml are design parameters,
NOT empirical values. They indicate relative severity, not measured effects.

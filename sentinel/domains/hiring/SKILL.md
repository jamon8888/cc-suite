---
name: hiring
description: >
  Hiring and talent evaluation decision hygiene. Trigger when the user: is deciding
  whether to hire someone ("on hésite à recruter", "we're torn between candidates",
  "should we extend an offer", "help me evaluate this candidate"); is running or
  reviewing interviews; asks about interview bias, candidate scoring, or evaluation
  consistency; uses phrases like "hiring decision", "evaluate candidate", "recruitment",
  "talent evaluation", "interview calibration", or "finalist". Also activates for:
  structured candidate scoring, hiring noise audits, and committee calibration.
---


# Hiring Decision Hygiene

## Domain-specific biases

Load additional biases from: skills/hiring/biases.yaml

These biases are checked WITH EQUAL SEVERITY to the core 35 biases:

- **Halo Effect (H1)**: One positive trait (prestigious university, impressive
  company) influences overall perception across unrelated dimensions
- **Similarity Bias (H2)**: Favoring candidates who share traits, background,
  or hobbies with the interviewer
- **Contrast Effect (H3)**: Evaluating a candidate relative to the previous
  one rather than against absolute standards

## Frameworks

Load evaluation frameworks from: skills/hiring/frameworks.yaml

- **Structured Interview**: Same questions, defined rubric, independent scoring
  before panel discussion. 1-5 scale per dimension.
- **Cultural Add vs Fit**: Shift from "culture fit" (similarity) to "culture add"
  (what new perspective does this person bring?)

## Default evaluation dimensions for candidates

When evaluating candidates using MAP protocol, use these independent dimensions:

1. **Skill Match** (technical/functional competence for the role)
2. **Cultural Alignment** (shared values, NOT personality similarity)
3. **Relevant Experience** (track record in comparable contexts)
4. **Growth Potential** (learning velocity, adaptability)
5. **Team Complementarity** (what's MISSING in the current team, not similarity)

## Key principle

Score each dimension INDEPENDENTLY before discussing with other interviewers.
This is the core MAP insight applied to hiring: independent evaluation prevents
the halo effect from contaminating scores across dimensions.

## Templates

- Structured interview scorecard: skills/hiring/templates/candidate-scorecard.md
- Interview calibration guide: skills/hiring/templates/interview-calibration.md

---
name: analysis
description: |
  Rigorous strategic analysis with built-in decision science. MAP scoring, verification
  questions, pre-mortem, reality check, scope and temporal coherence.
  Triggers when user mentions:
  - "analyze these findings"
  - "run decision science on"
  - "stress-test this recommendation"
---

# Analysis — Rigorous Strategic Assessment

Apply structured decision science to research findings. This skill contains the full
Sentinel cognitive engine — it runs automatically as part of the analysis phase.

## Operating Principle

This is not a bias-detection exercise. It asks the questions you would skip under
pressure and structures the thinking you would compress when time-pressed.

## Process

### Step 1: Triage (Automatic)

Score the engagement on 4 dimensions:

| Dimension | 1 | 2 | 3 |
|-----------|---|---|---|
| **Stakes** | Easily reversed, low cost | Significant but recoverable | Irreversible or high cost |
| **Complexity** | One clear option | Few options, some uncertainty | Many options, high uncertainty |
| **Time pressure** | Days or more | Hours | Immediate |
| **Information quality** | Good data available | Partial data | Low data / high ambiguity |

Compute: Stakes × Complexity × Time factor × Information quality

- **Score 1–4**: LIGHT protocol (MAP + questions)
- **Score 5–8**: STANDARD protocol (MAP + questions + pre-mortem + reality check)
- **Score 9–12**: FULL protocol (all checks including scope + temporal + noise)

Present the triage score. This determines which checks run below.

### Step 2: MAP Scoring

Break the strategic question into 4-8 independent dimensions. Score each option on each dimension separately.

**Generic strategic dimensions** (adapt to the specific question):
1. Market attractiveness (size, growth, profitability)
2. Competitive position (strengths, differentiation)
3. Execution feasibility (capabilities, resources)
4. Financial impact (investment, returns, timeline)
5. Risk profile (downside, reversibility)
6. Strategic fit (alignment with client's strengths/portfolio)
7. Timing (market window, first-mover vs. fast-follower)
8. Optionality (does this open or close future options?)

**Scoring format:**
| Dimension | Option A | Confidence | Option B | Confidence |
|-----------|----------|------------|----------|------------|
| Market attractiveness | 8 | 0.7 | 6 | 0.8 |

Confidence = how sure you are of the score (0.0 to 1.0).

**Rules:**
- Score each dimension independently — do not let overall impression contaminate individual scores
- Delay intuition until all dimensions are scored
- Flag any dimension with confidence < 0.4 as requiring additional research

### Step 3: Verification Questions

Generate 5-8 questions targeting assumptions embedded in the research conclusions. Each question targets a specific reasoning trap but is phrased as a genuine inquiry.

**Question categories:**
- **Base rate neglect**: "How often do similar moves succeed?"
- **Confirmation bias**: "What would have to be true for the opposite conclusion?"
- **Anchoring**: "If we started from scratch, would we reach the same number?"
- **Availability bias**: "Are we overweighting recent or dramatic examples?"
- **Sunk cost**: "If we hadn't already invested X, would we still choose this?"
- **Planning fallacy**: "What's the realistic timeline if everything goes wrong?"
- **Competitive response**: "How will competitors react, and what's our counter?"

### Step 4: Pre-mortem (STANDARD and FULL)

Assume the recommended strategy was executed and failed spectacularly 18 months from now. Work backward:

1. **Failure modes**: What went wrong? (List 5-8 specific failure modes)
2. **Likelihood**: Rate each 1-5
3. **Early warning signals**: How would we know it's going wrong?
4. **Prevention measures**: What could we do now to prevent each?

### Step 5: Reality Check (STANDARD and FULL)

Compare the expected outcome against base rates:
- How do similar strategic moves typically perform?
- What's the base rate success for this type of initiative?
- What's the gap between our projection and the base rate?
- What would need to be true for us to beat the base rate?

Provide estimates with explicit confidence levels. Do not invent facts.

### Step 6: Scope Check (FULL only)

Test whether the proposed solution scale is proportional to the problem scale:
- Is the investment proportional to the opportunity?
- Are we solving the actual problem or a symptom?
- Could a smaller intervention achieve 80% of the value?

### Step 7: Temporal Audit (FULL only, if commitment > 6 months)

Test temporal coherence of preferences:
- Will we still want this in 2 years?
- Does this lock us into a path we might regret?
- What's the exit cost if we 

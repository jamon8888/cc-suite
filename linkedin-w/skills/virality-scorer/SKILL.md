---
name: virality-scorer
description: "This skill should be used to score a LinkedIn post for viral potential. Returns a score /100 with 6-dimension breakdown and improvement suggestions."
---

# Virality Scorer — 6 Dimensions

## Input

A LinkedIn post draft (full text) and its topic.

## Scoring Dimensions

Score each dimension on its scale:

### 1. Hook Power (0-25)
How scroll-stopping is the first line?
- Creates curiosity, surprise, or urgency?
- Under 140 characters?
- Specific (numbers, names, dollar amounts)?
- Avoids generic openers?

### 2. Structure & Readability (0-20)
- Max 2 lines per paragraph?
- Generous whitespace?
- One thought per line?
- Easy to scan on mobile?
- Under 25 newlines total?

### 3. Value & Insight (0-20)
- Actionable, specific, non-obvious insights?
- Concrete numbers (not vague claims)?
- Reader learns something they can apply today?

### 4. Engagement Trigger (0-15)
- Ends with a specific question or CTA?
- CTA is NOT generic ("Qu'en pensez-vous?")?
- Invites sharing, debate, or confession?
- Reader has a reason to comment?

### 5. Authenticity & Voice (0-10)
- Sounds human and personal?
- No AI slop words (delve, landscape, synergy, leverage)?
- Matches the voice-dna if loaded?
- Has a personality (not corporate)?

### 6. Relevance & Timing (0-10)
- Topic is trending or evergreen-valuable?
- Aligns with audience's current pain points?
- Aligns with content pillars?

## Heuristic Adjustments

Apply AFTER Claude scoring:

| Check | Adjustment |
|-------|-----------|
| Hook < 80 chars | +3 (short punchy hook) |
| Hook > 200 chars | -5 (too long) |
| Word count 100-250 | +3 (sweet spot) |
| Word count > 350 | -5 (too long for LinkedIn) |
| Word count < 50 | -3 (too short) |
| 3+ blank lines | +2 (good whitespace) |
| First line starts with "I/My/We" | +2 (personal hook pattern) |
| 2+ specific numbers ($X, Y%, Zx) | +3 (specificity) |
| No numbers at all | -3 (vague) |
| Ends with ? | +2 (question = 72% more comments) |

## Performance Tiers

| Score | Tier | Action |
|-------|------|--------|
| 85-100 | viral | Queue immediately |
| 65-84 | high | Queue with confidence |
| 40-64 | medium | Suggest improvements, offer regeneration |
| 1-39 | low | Auto-regenerate with feedback |

## Output Format

```json
{
  "total_score": 72,
  "hook_power": 20,
  "structure": 16,
  "value_insight": 14,
  "engagement_trigger": 10,
  "authenticity": 7,
  "relevance": 5,
  "heuristic_adjustments": ["+3 short hook", "+2 ends with question"],
  "strengths": ["Hook specifique avec chiffre", "Bon espacement"],
  "improvements": ["Ajouter un chiffre supplementaire dans le corps", "CTA pourrait etre plus specifique"],
  "predicted_performance": "high",
  "verdict": "Post solide. Le hook accroche et la structure est propre. Renforcer le CTA."
}
```

## Regeneration Feedback

If score < 60, return specific instructions for the post-generator:
```
REGENERATION FEEDBACK:
- Hook: [specific instruction, e.g., "Remplacer par un hook specificite avec un montant exact"]
- Body: [specific instruction]
- CTA: [specific instruction]
- Target: score >= 65
```

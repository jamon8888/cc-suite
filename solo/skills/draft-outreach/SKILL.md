---
name: draft-outreach
description: "Use this skill for 'draft outreach', 'cold email', 'write outreach for', 'prospect message'. Loads Voice DNA for tone. Reads company research before writing. Always produces 3 subject line variants and offers follow-up sequence."
---
# Skill: Draft Outreach

## STEP 0 — LOAD VOICE AND RESEARCH

```
READ data/2-Domaines/voice-dna.json → tone, signature_phrases, forbidden_words
READ data/3-Ressources/[company].md  (if exists)
READ data/2-Domaines/icp.json → pain_points, vocabulary
```

Report: "Voice DNA loaded: [tone description]. Company research: [FOUND/NOT FOUND]. Writing in your voice."

If no company research: "Running with context from your message. Running company-research first would strengthen the personalization."

## STEP 1 — PERSONALIZATION HOOK

Before writing the body, identify the specific hook:
- Recent news signal (funding, product launch, job posting, press mention)
- Pain signal from their content/reviews
- Shared context (community, event, mutual contact)

State: "Opening hook: '[specific observation]' — leads to '[relevant pain angle]'"

## STEP 2 — AIDA STRUCTURE + VOICE DNA

Apply AIDA using loaded voice DNA:

| Element | Rule | Voice DNA application |
|---------|------|----------------------|
| **Attention** | Specific detail, not compliment | Use their vocabulary from icp.json |
| **Interest** | Their problem, not your solution | Mirror their language style |
| **Desire** | One specific result, not a list | Match tone (direct/consultative from DNA) |
| **Action** | Lowest possible friction CTA | Match formality level |

**Word count by channel:**
- Email body: 150-200 words
- LinkedIn DM: 100-150 words
- Connection request: max 200 characters

## STEP 3 — THREE SUBJECT LINE OPTIONS

Always produce 3 subject lines testing different angles:

```
Option A [Curiosity]: "[Specific question that opens a loop]"
Option B [Specificity]: "[Precise number or outcome from your work]"
Option C [Pain]: "[Their problem stated as a cost or risk]"

Recommended: Option [X] — because [based on their seniority/context]
```

## STEP 4 — ANTISLOP CHECK

Scan outreach for: "leveraging synergies", "world-class", "best-in-class", "holistic", "transformative", "innovative", "seamless", "passionate about [generic thing]". Remove. Replace with specific.

## STEP 5 — FOLLOW-UP SEQUENCE

After initial draft, offer:
"Want the full 3-touch sequence? (Initial → Follow-up +5 days → Breakup +10 days)"

**Touch 2 (Day +5):** Add new value (article, insight, their own content reference). Don't repeat the pitch.
**Touch 3 (Day +10 — breakup):** "Last note — happy to connect whenever timing is better. Here's [one final value piece]." No ask.

---

## Integration Points
- **Reads**: voice-dna.json, company research, icp.json
- **Feeds**: sales-pipeline (new prospects), client card (new outreach log)

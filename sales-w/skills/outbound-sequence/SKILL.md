---
name: outbound-sequence
description: "Use when the user asks to 'create sequence for [Persona]', 'draft outbound campaign', 'write a cold email sequence'. Loads ICP and Voice DNA before writing — a sequence in the wrong voice converts 3× worse."
---

# Skill: Outbound Sequence Architect

## STEP 0 — LOAD DNA

```python
icp       = read("data/icp.json")
voice_dna = read("data/voice-dna.json")
profile   = read("data/sales-profile.json")
```

Report:
```
Sequence context loaded:
  ICP target: [role + company type from icp.json]
  Voice tone: [tone descriptor from voice-dna.json — e.g., "direct, data-first, no-fluff"]
  Language: [EN/FR/Bilingual from sales-profile.json]
  Methodology: [MEDDIC/SPIN/etc. from sales-profile.json]
```

## STEP 1 — BLUEPRINT SELECTION

From `references/blueprints.md`:

| Blueprint | Best for | Steps |
|---|---|---|
| **Aggeggio** | Senior buyers, consultative sale | 3 touches — value-heavy |
| **Spears** | Shorter sales cycle, clear pain | 5 touches — punchy |
| **Omni** | Full pipeline building | 15-day multi-channel assault |

Select with rationale: "Using [Spears] because [the persona has a short decision window and clear cost pain]."

## STEP 2 — SEQUENCE ARCHITECTURE

For each step, define:
- Day and delay from previous
- Channel (Email / LinkedIn DM / Phone / LinkedIn comment)
- Angle (different value angle per step — never repeat)
- Length (Email: 100-150 words max | LinkedIn: 60-100 words | Phone script: 30-second opener)

Angles to rotate across steps (never repeat the same angle):
1. **Pain angle** — their specific problem from icp.json pain_points
2. **Trigger angle** — industry event, hiring signal, competitor move
3. **Proof angle** — specific result for a similar company
4. **Direct angle** — minimal framing, explicit ask

## STEP 3 — DRAFT EACH TOUCH (in Voice DNA)

Apply voice-dna.json to every message:
- Tone: [from voice_dna.tone — match directness, warmth, formality level]
- Forbidden phrases: [from voice_dna.forbidden_words — e.g., "leverage", "synergy"]
- Signature phrases: [from voice_dna.signature_phrases if defined]

**Subject line**: 3 variants per email, testing different psychological angles:
```
Option A [Specificity]: "[Precise number or outcome]"
Option B [Curiosity]: "[Question that opens a loop]"
Option C [Pain]: "[Their problem as a cost or risk]"
Recommended: Option [X] — because [rationale based on persona seniority]
```

## STEP 4 — BREAKUP EMAIL (mandatory final touch)

Always include:
> "Last note from me — [first name]. Timing might just be off.
> I'll leave you with [one specific resource / insight relevant to their situation].
> If this ever becomes a priority, my door's open."

No pitch. No ask. Just value and a clean exit.

## STEP 5 — ANTISLOP SCAN

Before delivering the sequence, flag and fix:
- "Hope this finds you well" → delete
- "I wanted to reach out" → "[Specific reason I'm writing]"
- "leverage synergies" → [specific business outcome]
- "world-class", "innovative", "cutting-edge" → delete or replace with specifics
- Any subject line over 8 words → shorten

---

## Integration Points
- **Reads**: icp.json, voice-dna.json, sales-profile.json, blueprints.md
- **Triggered by**: `/sales:prospect sequence`, outbound-campaign-architect agent

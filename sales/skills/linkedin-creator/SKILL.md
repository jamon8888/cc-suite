---
name: linkedin-creator
description: "Use when the user asks to 'create LinkedIn post', 'write LinkedIn content', 'LinkedIn carousel', 'draft authority post'. Loads Voice DNA and ICP vocabulary before writing — LinkedIn content in the wrong voice performs 3-5× worse."
---

# LinkedIn Creator

## STEP 0 — LOAD DNA (mandatory)

```python
base = SOLO_ROOT if solo_installed else SALES_ROOT
voice_dna = read(f"{base}/data/2-Domaines/voice-dna.json")
icp       = read(f"{base}/data/2-Domaines/icp.json")
profile   = read("data/2-Domaines/sales-profile.json")
```

Report before writing:
```
Content context loaded:
  Voice: [tone from voice-dna — e.g., "direct, no fluff, data-first"]
  Audience: [ICP role/industry from icp.json]
  Language: [EN/FR/Bilingual]
  Forbidden words: [from voice-dna.forbidden_words]
```

## STEP 1 — SAVE-WORTHY TEST

Before writing, apply the core test:
> **"Can the reader use this to save 2 hours of work today, or make a better decision this week?"**

If no: shift from insight-post to utility-post:
- Insight post (low save): "Discovery calls fail because reps talk too much"
- Utility post (high save): "The 5-question discovery framework that closes 40% more deals [with the exact questions]"

The difference: the utility post contains a usable artifact (framework, checklist, template, formula) the reader keeps.

## STEP 2 — HOOK ENGINEERING (first 140 characters)

From `references/hook-library.md`:

**Formula A — Contrarian Leader** (highest authority)
> "[Accepted Truth] is the reason you're failing at [Result]."
> EN: "Asking for the meeting is why you lose deals."
> FR: "Demander le meeting, c'est la raison pour laquelle vous perdez des deals."

**Formula B — Evidence-Based** (highest credibility)
> "From [Metric A] to [Metric B] in [Time]. Here's how:"

**Formula C — Value-First** (highest utility)
> "The [N]-step [framework] for [specific result] (no fluff):"

Pick the formula based on post type. The hook must create a narrative gap that forces "See More."

## STEP 3 — BODY STRUCTURE

**Standard post:**
- Hook (140 chars)
- 3-5 punchy paragraphs, each 1-3 lines
- Each paragraph = one idea, fully expressed
- No filler transitions
- Blank line between every paragraph

**Carousel blueprint** — from `references/carousel-blueprint.md`:
- Slide 1: Hook (repeat the post hook)
- Slides 2-N: One idea per slide — numbered, with visual
- Last slide: The save-worthy artifact (the thing they bookmark)
- Final slide: CTA (comment / DM / save)

## STEP 4 — APPLY VOICE DNA

Rewrite the draft applying voice-dna.json:
- Match tone (directness, warmth, formality)
- Use signature phrases if defined
- Remove forbidden words
- Adjust sentence length to match documented style

## STEP 5 — ANTISLOP CHECK

Flag and fix before delivering:
- Remove: "unlock the potential of", "in today's landscape", "game-changer", "thought leadership"
- Remove: any sentence that doesn't add information
- Remove: generic CTA ("Like if you agree") → replace with specific CTA ("Comment the framework you use for this — I'll compile the best ones")

## STEP 6 — SAVE-WORTHY RATING

Self-score before delivering:
```
Save-worthy test: [Pass/Fail]
Reason: "[The specific artifact or insight the reader keeps]"
Hook formula used: [A/B/C]
Estimated engagement type: [Comments (debate) / Saves (utility) / Shares (identity)]
```

---

## Integration Points
- **Reads**: voice-dna.json, icp.json, hook-library.md, carousel-blueprint.md
- **Triggered by**: `/sales:linkedin post`, linkedin-orchestrator

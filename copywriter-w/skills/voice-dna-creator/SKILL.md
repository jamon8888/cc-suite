---
name: voice-dna-creator
description: "Use this skill when the user asks to 'create my voice DNA', 'analyze my writing style', 'profile my writing', 'make Claude write like me', or 'capture my tone'. Requires writing samples. Extracts both surface attributes (tone, length) AND rhetorical mechanisms (how the writer structures arguments, creates tension, moves the reader). Minimum 5 samples for reliable DNA."
---

# Voice DNA Creator

A Voice DNA has two layers: **surface attributes** (tone, sentence length, formality) and **rhetorical mechanisms** (how arguments are structured, how tension is created, how the writer moves the reader). Most tools capture the first layer. This skill captures both.

## Step 0: Sample Assessment

Before analysis:

**Minimum viable:** 5 samples of varied types (post + email + response + article + thread)
**Optimal:** 10–15 samples across 3+ formats over 3+ months

**If < 5 samples provided:**
→ Signal: "I have [N] samples. This is enough for a preliminary DNA — confidence: [Low/Medium]. I recommend gathering [X] more before treating this as definitive."

**Sample diversity check:**
- ✓ Different formats (social / email / long-form)
- ✓ Different emotional states (teaching / storytelling / opinion / selling)
- ✓ Different time periods (voice evolves)

---

## Step 1: Surface Analysis

Read all samples and extract:

**Sentence metrics:**
- Average sentence length (words)
- Variance (short writer = 8-12 words avg, high variance; long writer = 20+ words, lower variance)
- Paragraph length pattern

**Vocabulary profile:**
- Reading level approximation (Flesch-Kincaid)
- Anglo-Saxon vs Latinate preference (simple vs complex words)
- Jargon usage and type (industry / academic / street)

**Formatting preferences:**
- Uses numbered lists? Bullet points? Headers?
- Line breaks as rhetorical device (white space intentional?)
- Bold/emphasis pattern

---

## Step 2: Rhetorical Mechanism Extraction

This is the deeper layer — **how** the writer moves readers, not just **what** they sound like.

For each sample, identify the structural pattern:

**Argument structure:**
- `Problem → Insight → Proof → Action` (consultant/expert pattern)
- `Story → Lesson → Universalization` (storyteller pattern)
- `Claim → Counterargument → Refined claim` (intellectual pattern)
- `Data → Surprise → Implication` (analyst pattern)
- `Normality → Disruption → New normal` (contrarian pattern)

**Tension mechanics:**
- How does the writer create tension? (contradiction / stakes / curiosity gap / counter-intuition)
- Where is the tension placed? (first sentence / middle / CTA)

**Proof style:**
- Numbers as authority ("47 clients, 80% fail rate")
- Stories as proof ("I saw this happen with...")
- Logic chains ("If A then B, therefore C")
- Authority reference ("Research shows / X said")

**Signature moves** (specific to this writer):
- Recurring structural patterns not in the list above
- Idiomatic phrases that appear > once
- Rhetorical questions used how/when?

---

## Step 3: Build the DNA JSON

```json
{
  "voice_dna": {
    "version": "2.0",
    "last_updated": "YYYY-MM-DD",
    "sample_count": 0,
    "confidence": "Low | Medium | High",
    "core_essence": {
      "identity": "",
      "primary_role": "[Teacher / Storyteller / Challenger / Analyst / Builder]",
      "unique_angle": "[The specific lens this writer applies to every topic]"
    },
    "rhetorical_mechanisms": {
      "primary_argument_structure": "[Most common pattern from Step 2]",
      "secondary_structure": "[Second pattern]",
      "tension_mechanism": "[How they create tension — be specific]",
      "proof_style": "[How they prove claims]",
      "signature_moves": ["[Specific recurring patterns — verbatim examples]"]
    },
    "personality_traits": {
      "primary": [],
      "how_it_shows": {}
    },
    "emotional_palette": {
      "dominant_emotions": [],
      "energy_level": "",
      "uncomfortable_truths": "[Does this writer name what others avoid?]"
    },
    "communication_style": {
      "formality": "",
      "avg_sentence_length_words": 0,
      "sentence_variance": "High | Medium | Low",
      "paragraph_style": ""
    },
    "language_patterns": {
      "signature_phrases": ["[Exact phrases from samples — verbatim]"],
      "power_words": [],
      "forbidden_words": ["[Words that would break the voice — infer from absence]"],
      "transitions": []
    },
    "never_say": {
      "phrases": ["[Infer from samples — what this writer NEVER says]"],
      "tones": [],
      "approaches": []
    },
    "formatting_preferences": {},
    "voice_examples": {
      "opening_lines": ["[3 openings in this voice]"],
      "closing_lines": ["[3 closings in this voice]"],
      "transitional_phrases": []
    }
  }
}
```

---

## Step 4: Human-Readable Voice Brief

In addition to the JSON, produce a 150-word brief a human can read before a writing session:

```
VOICE BRIEF — [Name/Brand]

[Name] writes like a [primary role] who [unique angle].

Their signature move: [rhetorical mechanism in plain words].

They prove points with [proof style]. They create tension by [tension mechanism].

Sentence texture: [short/long/varied] — [1 example sentence].

What they'd NEVER write: [forbidden phrase or approach].

What makes their voice unmistakable: [1 specific thing that no other writer does].

When writing in this voice: [1 practical instruction].
```

---

## Step 5: Validation Test

Generate 3 test sentences in the captured voice. Ask:
1. "Does this sound like you — yes, no, or close?"
2. "Which word or phrase feels most off?"
3. "Can you give me a sentence you've written that this DNA should be able to match?"

If validation fails on >2 sentences: re-read samples, identify what mechanism was missed, iterate.

---

## Integration Points

- **Feeds into**: All content skills via `{{voice_dna}}` injection
- **Triggered by**: `/copywriter:start`, any skill that references `{{voice_dna}}`

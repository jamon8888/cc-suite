---
name: linkedin-post
description: "This skill should be used when the user asks to 'write a LinkedIn post', 'LinkedIn hook', or 'LinkedIn carousel'."
model: sonnet
---

# LinkedIn Authority Architecture

This skill is designed to maximize your "Dwell Time" on LinkedIn. It uses your unique `{{voice_dna}}` to stop the scroll.

```
┌─────────────────────────────────────────────────────────────────┐
│  STANDALONE (always works)                                      │
│  ✓ Hook Generation: 3 scroll-stopping variations.               │
│  ✓ Dwell-Time Formatting: Optimized whitespace & pacing.        │
│  ✓ Voice Match: Writes exactly like you (no "AI voice").        │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (connect ~~linkedin_api / TweetHunter)            │
│  + Trend Jacking: Injects current trending news/hashtags.       │
│  + Analytics Loop: Learns from your previous top performers.    │
│  + Carousel Maker: Formats content for PDF sliders.             │
└─────────────────────────────────────────────────────────────────┘
```

## 🛠 Triggers

- "Write a LinkedIn post about [Topic]"
- "Repurpose this blog into a social post"
- "Give me 3 hooks for this idea"
- "Fix this draft to be more viral"

## 🛠 Agent Instructions

### Before Writing

1.  **Load Context Profiles**:
    - Read `${CLAUDE_PLUGIN_ROOT}/data/2-Domaines/voice-dna.json` to match the user's voice precisely.
    - Read `${CLAUDE_PLUGIN_ROOT}/data/2-Domaines/icp.json` to align with the audience's pain points and jargon.
    - Read `${CLAUDE_PLUGIN_ROOT}/data/2-Domaines/business-profile.json` to ensure the post aligns with overall positioning.
2.  **Identify Post Objective**: Is the goal _Brand Awareness_, _Lead Generation_, or _Topical Authority_?
3.  **Check Source Material**: If the user wants to repurpose a blog post or transcript, search `${CLAUDE_PLUGIN_ROOT}/data/3-Resources/`.

---

## 🏛 The "LinkedIn Authority" Protocol

### 1. The Hook (First 140 Characters)

_Ref: `references/hook-library.md`_

_Goal: Stop the scroll._

- **The specific outcome**: "I spent $50k on ads. Here is what I learned."
- **The contrarian take**: "Stop doing X."
  _Rule: Never start with "In today's world..."_

### 2. Dwell-Time Engineering (The Body)

_Ref: `references/formatting-guide.md`_

- **Whitespace Rule**: No more than 2 lines per paragraph.
- **Tone**: Apply `{{voice_dna.tone}}`.
- **Anti-Slop**: Avoid words in `{{voice_dna.forbidden_words}}`.

### 3. Engagement & Conversion (The Footer)

_Ref: `references/engagement-framework.md`_

- **Meaningful CTA**: Ask a specific question.
- **The P.S. Play**: Promote `{{business.primary_cta}}` softly.

---

## 🚀 Writing Workflow

### Phase 1: Hook Generation (Always 3)

Generate exactly 3 distinct hook variations using the formulas in `references/hook-library.md`. Never deliver 1 hook — test options are part of the output.

Label each hook with its type:
- **Contrarian hook** — challenges a widely-held belief
- **Specificity hook** — leads with a precise number or outcome
- **Story hook** — opens in the middle of an action or moment
- **Question hook** — asks the thing they're afraid to answer publicly

Then recommend one with a 1-sentence rationale.

### Phase 2: Narrative Structure

Use **Hook → Story/Insight → Proof → CTA**.

### Phase 2b: CTA Selection

Weak CTAs are the most consistent failure in LinkedIn writing. Never use "What's your experience?" or "Thoughts?" alone.

**CTA library — pick the one that fits the post:**

| CTA type | Template | Use when |
|----------|---------|----------|
| Specific question | "If you had to fix one thing in [topic] this week, what would it be?" | Opinion posts |
| Poll substitute | "Have you tried [X]? Reply with: A) Yes, worked / B) Yes, failed / C) Never tried" | Research posts |
| Confession invite | "Tell me about a time [related embarrassing thing]. I'll start: [your story]" | Story posts |
| Resource offer | "I have a template for this. Want it? Say 'template' in comments." | How-to posts |
| Next step | "If this landed: follow for [specific promise]. I post [X] every [day]." | Authority posts |

### Phase 2c: Format Suggestion

Before writing the full post, scan the content for format fit:

| Content signal | Recommended format | Why |
|---------------|-------------------|-----|
| Numbered list (3–10 items) | **Carousel** | Each slide = one item; increases dwell time dramatically |
| Step-by-step process | **Carousel** | Visual progression keeps readers swiping |
| Comparison (A vs B) | **Carousel** | Side-by-side on slides > wall of text |
| Personal story | **Text post** | Carousels break emotional narrative |
| Hot take / opinion | **Text post** | Needs to land fast — carousels dilute the punch |
| Data / stat breakdown | **Carousel** | Numbers scan better as visual slides |

**Carousel trigger rule:** If the content is a list of 4+ items OR a step-by-step process → automatically suggest carousel format AND provide a slide-by-slide breakdown using `references/carousel-blueprint.md`. Do NOT require a supercharged connection for this suggestion — it's based on content structure alone.

Format choice output:
> "**Recommended format: Carousel** — this content (5 steps) reads better as slides than a list in a text post. Here's the text version first, then the carousel breakdown."

---

### Phase 3: Algorithmic Audit

- **Length by post type:**
  - Thought leadership / opinion → 1800–3000 chars (LinkedIn rewards time-on-post)
  - Story → 1500–2500 chars
  - List / How-to → 1200–2000 chars
  - Short contrarian → 600–900 chars (deliberate brevity = signal)
- **Links**: "Link in comments".
- **Carousel Option**: If helpful, output a slide-by-slide breakdown using `references/carousel-blueprint.md`.

---

## 📝 Output Format

```markdown
# LinkedIn Post Draft

**Target Audience**: {{icp.job_titles}}

---

[The Hook]

[The Body - formatted with whitespace]

[The CTA]

P.S. [Soft sell for {{business.offers}}]

---

**Character Count**: [X]/3000
```

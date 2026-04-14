---
name: video-script-generator
description: "Use this skill when the user asks to 'write a video script', 'YouTube script', 'TikTok script', 'Reels script', 'Short video', or 'VSL'. Adapts script structure, tone, and loop mechanics to the specific platform (YouTube Long / YouTube Shorts / TikTok / Instagram Reels / VSL). Always includes timing estimates per section, loop mechanism for short-form, and A-Roll/B-Roll split."
model: sonnet
---

# Video Script Generator

Video is not about words — it's about *visual retention*. This skill writes scripts that account for what the viewer *sees* AND what they *hear*, with timing estimates, platform-specific adaptations, and engineered loops for short-form.

## Step 0: Platform Classification

The platform determines everything: tone, pacing, loop requirement, and hook style.

| Platform | Format | Length | Tone | Loop required? | Key rule |
|----------|--------|--------|------|----------------|---------|
| **YouTube Long** | 16:9 | 8–15 min | Educational, storytelling | No | Retention graph — hooks every 2 min |
| **YouTube Shorts** | 9:16 | 15–60s | Direct, punchy | **YES** | Must loop — last frame feeds first frame |
| **TikTok** | 9:16 | 15–90s | Raw, conversational, casual | **YES** | Native feel — not polished ads |
| **Instagram Reels** | 9:16 | 15–90s | Slightly more polished than TikTok | **YES** | Can be more brand-consistent |
| **VSL** | 16:9 | 5–20 min | Calm authority, persuasive | No | No cuts to external footage — talking head |

**Platform tone rule:**
- TikTok sounds like a friend on FaceTime. Cut sentences mid-thought, speak colloquially.
- Reels can sound like a slightly edited TikTok — same energy, less raw.
- YouTube Long sounds like a knowledgeable friend explaining something properly.
- VSL sounds like a trusted advisor who isn't selling — even though they are.

---

## Step 1: Define the Payoff

Before writing, answer:

1. **The Knowledge Gap**: What will they know at the end that they didn't know before?
2. **The Transformation**: What will they be able to DO or FEEL differently?
3. **The Retention Promise**: Why should they stay past the first 10 seconds? (Must be stated in the hook.)

---

## Step 2: Scripts by Format

### A. YouTube Long-Form (The Retention Graph)

**Structure with timing:**

```
[HOOK] 0:00–0:30 (~75 words)
  - Visual: High energy, movement, or a shocking visual
  - Audio: Counterintuitive claim or specific outcome
  - Promise: "By the end of this video, you'll know [specific thing]"
  
[SETUP / CONTEXT] 0:30–1:30 (~250 words)
  - Why this matters NOW
  - Pattern interrupt at 1:00 (joke, B-roll, unexpected stat)
  - "Here's what most people get wrong about this..."

[MAIN CONTENT — Steps/Sections] 1:30–N:00
  - Each section: 1:30–3:00 min
  - Pattern interrupt every 90–120 seconds
  - Retention tease before each transition: "Step 3 is the one no one talks about"

[OUTRO] Final 60 seconds
  - Brief summary of what they learned
  - CTA: "Watch this video next" (session time > subscriptions)
  - Do NOT thank them for watching — it's passive and kills momentum
```

**Timing rule:** Write "~XX sec / XX words" at the start of each section. 130 words ≈ 1 minute of speech.

---

### B. Short-Form: Shorts / TikTok / Reels (The Loop Machine)

**The Loop Rule (non-negotiable for short-form):**
> The last sentence must *semantically or visually* connect back to the first sentence. The viewer who watches to the end and loops back should feel like the video just got more interesting — not that it ended.

**Structure with timing:**

```
[VISUAL HOOK] 0:00–0:03 (3 seconds, ~10 words)
  - Movement in the FIRST FRAME — not a still shot
  - Text overlay if talking head: the core claim in 5 words
  - Audio hook: "Stop doing X" / "Most people don't know this" / "I made $X doing Y"

[VERBAL HOOK + TENSION] 0:03–0:10 (~25 words)
  - Expand the promise: why should they keep watching?
  - Create a tension or curiosity gap that can only be resolved by watching to the end

[VALUE DROP — Rapid fire] 0:10–0:45 (~100 words)
  - Short, punchy statements
  - Visual change every 3 seconds: zoom cut / text overlay / angle change / B-roll
  - No long sentences — max 8 words per beat

[LOOP CLOSER] 0:45–0:60 (~20 words)
  - Final line: directly echoes or answers the first hook
  - Example: Hook = "Most people waste money on ads." Loop = "So next time you see an ad that stops you, ask yourself: why did it work?"
  - Optional: cut mid-sentence to force the loop replay
```

**3-Second Rule (Shorts/TikTok/Reels):**
Something must change visually every 3 seconds: zoom cut / text overlay / angle change / B-roll insert.

**Platform voice by format:**
```
TikTok: "Okay so I just realized something..." / "No one is talking about this..."
Reels:  "Here's the thing about [topic]..." / "If you're doing X, stop. Here's why:"
Shorts: "I learned this the hard way..." / "This one thing changed everything:"
```

---

### C. VSL (Video Sales Letter)

**Structure with timing:**

```
[PATTERN INTERRUPT] 0:00–0:30
  - Counterintuitive statement about their biggest problem
  - NOT "Hi, I'm [name]" — introduce yourself only after you've earned attention

[THE PROBLEM] 0:30–2:00
  - Name their exact pain in their vocabulary (use ICP language)
  - "You've probably tried X and Y. Here's why they didn't work..."

[THE PROMISE] 2:00–3:00
  - Introduce the mechanism — not the product, the *mechanism*
  - "What if there was a way to [result] without [pain]?"

[PROOF] 3:00–8:00
  - Before/after stories (3 min)
  - Testimonials with specific outcomes (2 min)

[THE OFFER] 8:00–12:00
  - What's included, what it costs, how it works
  - Guarantee — spell out exactly what you promise

[CTA + URGENCY] 12:00–end
  - One action, repeated three times
  - Real reason to act now (not fake scarcity)
```

---

## Step 3: A-Roll / B-Roll Split

Always define what the viewer *sees*, not just what they *hear*:

- **A-Roll**: Talking head, host on camera
- **B-Roll**: Footage, screenshots, screen recordings, stock, text overlays, graphics
- **Text Overlays**: Key claims repeated on screen (critical for silent viewers — 85% of social video watched with no sound)

**Silent viewer rule:** Any claim the viewer needs to understand to keep watching MUST appear as text overlay. Never assume audio is on.

---

## Output Format

```markdown
# Video Script: [Title]

**Platform**: [YouTube Long / Shorts / TikTok / Reels / VSL]
**Target length**: [X minutes / X seconds]
**Tone**: [Platform tone from Step 0]
**Loop required**: [Yes / No]

---

## 🎬 [Section Name] — [Timestamp] (~[N] words / ~[N] sec)

[A-ROLL] Host: "[Dialogue]"
[B-ROLL] Show: [Description of what appears on screen]
[TEXT OVERLAY]: "[Key claim in 5 words]"

---

[Continue for each section]

---

## 🖼 Thumbnail / Cover Frame Concept
- Visual: [Description]
- Text: [Max 5 words]
- Emotion: [What the face/visual communicates]

## ⏱ Timing Breakdown
[Section 1]: [N sec]
[Section 2]: [N sec]
Total: [N min N sec]
```

---

## Integration Points

- **Receives from**: `voice-dna-creator`, `icp-creator`
- **Feeds into**: `content-calendar-planner` (video as Hero asset)
- **Triggered by**: `/copywriter:write`

---
name: title-brain
description: "This skill should be used when the user asks to 'generate headlines', 'give me subject lines', or 'write a hook for'."
model: sonnet
---

# Title Brain (The Headline Engine)

David Ogilvy said, "When you have written your headline, you have spent 80 cents out of your dollar." This skill ensures you don't waste that investment. It engineers titles that earn the click.

```
┌─────────────────────────────────────────────────────────────────┐
│  CORE CAPABILITIES                                              │
│  ✓ 5-Style Generation (Curiosity, Benefit, Negative, etc.)      │
│  ✓ Platform Optimization (SEO vs Youtube vs Email)              │
│  ✓ Scorecard Analysis (Power Words, Sentiment)                  │
│  ✓ A/B Testing Variations                                       │
├─────────────────────────────────────────────────────────────────┤
│  STYLES                                                         │
│  1. The "How-To" (Utility)                                      │
│  2. The "Listicle" (Cognitive Ease)                             │
│  3. The "Negative" (Fear/Avoidance)                             │
│  4. The "Secret" (Curiosity)                                    │
│  5. The "Specific" (Data-driven)                                │
└─────────────────────────────────────────────────────────────────┘
```

## 🛠 Context Configuration

### 1. Load Audience Context

- **Sophistication**: `data/2-Domaines/icp.json`.
  - _Beginner_: "How to start..."
  - _Expert_: "Advanced scaling strategies..."
- **Voice**: `data/2-Domaines/voice-dna.json`. (Clickbaity or Professional?).

### 2. Define the Medium

- **YouTube**: < 60 chars. High drama. Face/Emotion.
- **Blog (SEO)**: Keyword front-loaded. < 60 chars.
- **Email**: < 40 chars (Mobile cut-off). Personal/Urgent.
- **Social Hook**: First sentence. Can be longer.

---

## 🏛 The 4 U's Scorecard

Every title produced must be scored on the 4 U's before delivery. Show the score in the output.

| Criterion | Question | 0–3 scale |
|-----------|----------|-----------|
| **Urgent** | Does it create pressure to read NOW vs later? | 0 = no urgency / 3 = must read now |
| **Unique** | Could this headline appear on 10 other sites? | 0 = generic / 3 = only you could write this |
| **Ultra-specific** | Does it include a number, name, or precise claim? | 0 = vague / 3 = hyper-specific |
| **Useful** | Is the reader better off for having read it? | 0 = no benefit / 3 = obvious clear gain |

**Total: /12** — Target ≥ 8 for any published headline. Below 6: rewrite before delivering.

**Anti-patterns by platform:**
- LinkedIn: Avoid pure clickbait ("You won't believe...") — damages professional credibility. Specific + Useful wins.
- YouTube: Emotional + Specific. Curiosity gaps outperform benefit headlines.
- Email: Urgent + Specific. Under 40 chars. Personal beats clever.
- SEO/Blog: Keyword-first. Useful beats clever every time. Specificity signals depth.
- Twitter/X: Contrarian or Counterintuitive. Short. Opinion framing beats neutral.

---

## 🏛 The Psychological Frameworks

### 1. The Curiosity Gap

_Formula_: [What they know] + [What they don't know] + [Why it matters].

- _Bad_: "Tips for productivity."
- _Good_: "The 5-minute habit that doubled my output (It's not coffee)."

### 2. The Negative Bias

_Formula_: Stop doing [X] or [Bad Thing] happens.

- _Bad_: "How to write better code."
- _Good_: "3 coding patterns that are destroying your codebase."

### 3. The Specificity God

_Formula_: [Specific Number] + [Specific Result] + [Timeframe].

- _Bad_: "Get more leads fast."
- _Good_: "How to get 10 B2B leads in 7 days without ads."

---

## 🔄 Generation Workflow

### Step 1: The Brain Dump

Generate 10 raw angles based on the core topic.

- _Angle_: Money.
- _Angle_: Speed.
- _Angle_: Ease.
- _Angle_: Fear.

### Step 2: The Refinement (The 4 U's)

Filter every title through the 4 U's:

1.  **Urgent**: Does it need to be read _now_?
2.  **Unique**: Has everyone else said this?
3.  **Ultra-Specific**: Is there a number or concrete noun?
4.  **Useful**: Is there a promise of value?

### Step 3: Platform Adaptation

Take the winner and morph it.

- _Base Idea_: "Sleep is important."
- _YouTube_: "I slept 8 hours for 30 days. Here's what happened."
- _SEO_: "Sleep Hygiene: The Ultimate Guide to REM Cycles."
- _Email_: "You look tired."

---

## 📝 Output Format

For each title request, deliver:
1. **1 recommended title per format** — the best version
2. **1 A/B variant per format** — different psychological angle
3. **4 U's scorecard** for the recommended title

```markdown
# Titles for: [Topic]

## [Platform — e.g., Email Subject Line]
**Recommended:** [Title]
**A/B Variant:** [Alternative angle — different psychological driver]
**4 U's Score:** Urgent [N] / Unique [N] / Ultra-specific [N] / Useful [N] = [Total]/12
**Why it works:** [1 sentence — which psychological mechanism]

## [Platform — e.g., YouTube Title]
...
```

## 📝 Output Format (Original)

```markdown
# Title Options: [Topic]

## 🏆 The Winner (Highest Probability)

**"[Title Text]"**

- _Why_: Hits Curiosity and Specificity. Under 50 chars.

## 🧪 Variation Set (A/B Test Candidates)

### Style: The "Listicle"

1. "7 Sleep Hacks used by Navy SEALs."
2. "10 Reasons you are waking up tired."

### Style: The "Negative"

3. "Stop drinking coffee before 9am. Here is why."
4. "The 'Hustle' mindset is killing your gains."

### Style: The "Secret"

5. "The $100 pillow that fixed my back pain."
6. "What doctors won't tell you about insomnia."

## 📊 Scorecard (Winner)

- **Power Words**: "Hacks", "Killing", "Secret".
- **Character Count**: 42 (Perfect for Mobile).
- **Sentiment**: Negative (High CTR).
```

---

## 🧠 Advanced Tactics

- **Bracket Power**: Adding bracketed text increases CTR by 30%.
  - "How to write code [Free Cheatsheet]"
- **Odd Numbers**: 7, 9, 11 perform better than 10.
- **"This"**: "Do _this_ to fix _that_." (Deictic language creates curiosity).

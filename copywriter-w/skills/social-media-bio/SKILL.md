---
name: social-media-bio-generator
description: "This skill should be used when the user asks to 'create my social bio', 'LinkedIn bio', or 'Twitter bio'."
model: sonnet
---

# Social Media Bio Generator (The Profile Architect)

Your bio is your digital elevator pitch. You have 3 seconds to answer: "Who are you?", "Who do you help?", and "Why should I follow?". This skill engineers bios for _conversion_, not just description.

```
┌─────────────────────────────────────────────────────────────────┐
│  CORE CAPABILITIES                                              │
│  ✓ Character Count Optimization (Twitter vs LI vs IG)           │
│  ✓ Value Proposition Crystallization                            │
│  ✓ Social Proof Integration                                     │
│  ✓ CTA Placement Mechanics                                      │
├─────────────────────────────────────────────────────────────────┤
│  PLATFORM MATRIX                                                │
│  1. Twitter/X: Witty, Concise, Credibility-focused.             │
│  2. LinkedIn: Professional, Result-Oriented, SEO-friendly.      │
│  3. Instagram: Visual, Aspirational, Link-focused.              │
└─────────────────────────────────────────────────────────────────┘
```

## 🛠 Context Configuration

### 1. Load Identity Context

- **Role**: `data/business-profile.json` (What is the official title?).
- **Offer**: `data/business-profile.json` (What is the primary product/service?).
- **Results**: `data/business-profile.json` (Numbers, revenue, clients served).

### 2. Define The Goal

- **Followers**: "I post about [Topic]."
- **Leads**: "I help [Avatar] achieve [Result]."
- **Status**: "Founder of [Company]."

---

## 🏛 The Bio Formulas

### Formula A: The "Authority" Stack (Best for LinkedIn)

_Structure_:

1.  **The Claim**: "Helping [Target] [Result]."
2.  **The Proof**: "Ex-[Company] | $10M generated."
3.  **The Content**: "Posting about [Topic] & [Topic]."
4.  **The CTA**: "Grab my free guide 👇"

### Formula B: The "Mission" Line (Best for Twitter)

_Structure_:

1.  **The One-Liner**: "Building the operating system for creators."
2.  **The Credibility**: "Backed by [VC] | 10k users."
3.  **The Invitation**: "Follow for the journey."

### Formula C: The "Minimalist" (Best for Instagram)

_Structure_:

1.  **Identity**: "Artist | NYC."
2.  **Statement**: "Making ugly things beautiful."
3.  **Link**: "Shop 👇"

---

## ✍️ Platform Specifics

### Twitter/X (160 Chars)

- **Space is money**. Remove "a", "the", "and".
- **Credentials matter**. "Founder @Company" builds trust.
- **Keywords**: Include 1-2 keywords for search (e.g., "SaaS", "AI").

### LinkedIn Headline (220 Chars)

- This follows you everywhere (comments, posts).
- **Front-load the value**. "Helping SaaS Founders..." is better than "CEO".
- Use separators `|` or `//` to break up ideas.

### Instagram (150 Chars)

- Use emojis as bullet points.
- Focus on the "Vibe" + the Link.

---

## 📝 Output Format

Provide 3 Options per Platform.

```markdown
# Bio Drafts

## 🐦 Twitter/X (Limit: 160)

**Option 1 (The Authority)**:
Founder @[Company] ($0→$1M). Building the future of [Industry]. Tweets on [Topic] & [Topic]. Join 10k+ readers 👇
_[112 Chars]_

**Option 2 (The Builder)**:
Building [Product] in public. Helping [Avatar] save 10hrs/week. Ex-[Company].
_[85 Chars]_

## 💼 LinkedIn Headline (Limit: 220)

**Option 1**:
Helping B2B Founders scale to $1M without Ads | Founder @[Company] | Newsletter: 20k Subs
_[88 Chars]_

**Option 2**:
I build systems for [Avatar] | Content Strategy & AI Automation | Featured in [Media]
_[86 Chars]_

## 📸 Instagram (Limit: 150)

**Option 1**:
📍 NYC
🚀 Founder @[Company]
✨ Helping you build better habits
👇 Free Course
_[Link]_
```

---

## 🧠 Psychological Triggers

- **Social Proof**: Numbers trust (10k+, $1M, 500 clients).
- **Specificity**: "Helping Founders" < "Helping B2B SaaS Founders".
- **Curiosity**: "Building the unknown."

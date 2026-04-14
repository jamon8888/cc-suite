---
name: landing-page-copy
description: "This skill should be used when the user asks to 'create a sales page', 'write landing page', or 'opt-in page'."
model: sonnet
---

# Landing Page Architect

A landing page has one job: **The Click**. This skill structures persuasion in a linear vertical format, guiding the user from "Curiosity" to "Commitment".

```
┌─────────────────────────────────────────────────────────────────┐
│  CORE CAPABILITIES                                              │
│  ✓ Headline Engineering (The H1)                                │
│  ✓ "The Fold" Optimization                                      │
│  ✓ Benefit Bullet Construction (Feature -> Benefit -> Meaning)  │
│  ✓ Guarantee & Risk Reversal                                    │
├─────────────────────────────────────────────────────────────────┤
│  PAGE TYPES                                                     │
│  1. SQUEEZE PAGE (Lead Magnet, Email Capture)                   │
│  2. SALES PAGE (Long-form, High Ticket)                         │
│  3. VSL PAGE (Video-first, curiosity driven)                    │
│  4. WEBINAR REGISTRATION (Date/Time urgency)                    │
└─────────────────────────────────────────────────────────────────┘
```

## 🛠 Context Configuration

### 1. Load Strategic Context
- **Offer**: `data/business-profile.json` (What is the "Mechanism"?).
- **Pain**: `data/icp.json` (What is the "Hell" they are in?).
- **Dream**: `data/icp.json` (What is the "Heaven" they want?).

### 2. Define the Offer Mechanics
-   **Price**: Low ($27) vs High ($1k+).
-   **Guarantee**: 30 Days? Conditional?
-   **Bonuses**: What sweeteners?

### 3. Traffic Temperature

**Cold traffic** (from ads, referral, first visit):
- Needs more context — explain who you are above the fold
- Testimonials must be above the fold
- Longer copy justified (more persuasion required)

**Warm traffic** (from email, social followers):
- Can skip the WHO YOU ARE section
- Shorter copy acceptable — they already trust you
- Lead directly with the offer mechanics

### 4. Form Friction Rules

| Page type | Optimal fields | Why |
|-----------|---------------|-----|
| Lead magnet squeeze page | Email only | Every additional field = -20% conversion |
| Webinar registration | First name + email | Name needed for personalization |
| High-ticket application | Multiple fields | Qualification is the point — friction filters |
| Product purchase | Checkout form | Standard — don't add pre-purchase fields |

---

## 🏛 The Sales Page Architecture (PAS Protocol)

### Section 1: The Hero (Above the Fold)
*Goal: Attention.*
-   **Pre-Headline**: "For [Target Audience] Only".
-   **Headline (H1)**: The Big Promise. "How to [Result] without [Pain]."
-   **Sub-Headline**: The "Mechanism". "Using the new [System] method."
-   **CTA Button**: "Yes, Show Me How."

### Section 2: The Problem (Agitation)
*Goal: Emotion.*
-   "Does this sound like you?"
-   List the symptoms.
-   "It's not your fault." (Externalize the enemy).

### Section 3: The Solution (The Reveal)
*Goal: Hope.*
-   Introduce the Product.
-   Show the "Mechanism" (Why it works).
-   "Introducing [Product Name]."

### Section 4: The Bullets (Features & Benefits)
*Goal: Desire.*
-   **Fascinations**: "The 3-step trick to X."
-   **Dimensionalization**: "So you can stop worrying about Y."

### Section 5: The Social Proof
*Goal: Trust.*
-   Testimonials.
-   Logos.
-   Case Studies.

### Section 6: The Offer Stack + Guarantee
*Goal: Logic.*
-   Recap everything they get.
-   Assign value to bonuses.
-   "Iron-clad 30-Day Guarantee."

### Section 7: The FAQ + Final CTA

*Goal: Remove last objections.*
- 5–7 questions that address the real objections: price, time, "will this work for me?"
- Write the questions the way the prospect would say them, not the way you'd want them asked
- Final CTA repeats the primary button from the Hero — identical wording

---

## Mobile-First Rules

**65%+ of landing page traffic is mobile.** These are non-negotiable:

| Rule | Requirement |
|------|-------------|
| Above-fold on mobile | Headline + CTA button visible without scrolling on a 375px screen |
| Button size | Minimum 44px tap target |
| Font size | Minimum 16px body, 24px+ headline |
| Single column | Never 2-column layouts for body copy on mobile |
| Form fields | One field per line. No side-by-side on mobile. |
| Load speed | No hero videos that auto-play on mobile — kills load time |

**Above-fold test:** Write the page. Then ask: "If someone sees ONLY the first screen on their phone — no scrolling — is the offer clear and is there a CTA?" If no: rewrite the hero.

---

## Thank You Page Copy

The Thank You page is the most neglected conversion surface. It's seen by 100% of people who gave you their contact — and most brands waste it with "Thanks! Check your inbox."

**Thank You Page architecture:**

```markdown
# [Confirm what they just did — specific]
"You're in. Your [lead magnet] is heading to [email]."

## What happens next
[Set expectations clearly: timeline, format, what to look for]

## While you wait...
[Bridge to the next step in your funnel — this is your conversion moment]

Option A — Content offer: "Read this first: [your best piece related to the topic]"
Option B — Product offer (warm traffic): "If you want to go deeper: [soft pitch for paid offer]"
Option C — Community: "Join [X] others in [community]"
Option D — Call booking (high-ticket): "Ready to talk? Book your free strategy call:"

## P.S.
[One personal note — make it feel like an individual sent it, not an autoresponder]
```

**Thank You page rule for high-ticket:** If your funnel ends at "check your email," you are leaving 70% of your follow-up potential on the table. The Thank You page is the first page of your sales conversation.

---
*Goal: Objection Handling.*
-   Kill the last doubts.
-   Final button.


---

## CRO Non-Negotiables (2026)

Every landing page must:
- [ ] **No navigation menu** — nowhere to go except convert or leave
- [ ] **CTA above the fold** — always visible without scrolling
- [ ] **One CTA, repeated** — not multiple offers
- [ ] **Social proof before the fold on cold traffic** — stars, testimonials, logos
- [ ] **Mobile-first layout** — 60%+ of landing page traffic is mobile

---

## Thank You Page Copy

The thank you page is the most under-used conversion asset. After the form is submitted:

**For lead magnet:**
> "Your [resource] is on its way to [email]. While you wait — one quick question: [lead to next step or survey]"

**Bonus move:** Offer a no-cost next step immediately (related video, booking a quick call, joining a community). The momentum of saying yes once makes saying yes again much easier.

---

## ✍️ Micro-Copy Tactics

## ✍️ Micro-Copy Tactics

-   **The Button Text**: Never use "Submit". Use "Get Instant Access" or "Send Me The Guide".
-   **Risk Reversal**: "Try it risk-free."
-   **Captions**: Put captions under images. They get read 300% more than body copy.

---

## 📝 Output Format

```markdown
# Landing Page Draft: [Offer Name]

## 🖼 Section 1: The Hero
**Pre-Head**: ATTENTION: Freelancers who want to scale.
**H1**: The "No-Code" Agency System: Scale to $10k/mo Without Hiring Employees.
**Sub-Head**: A simple 3-step framework to automate your delivery.
**Button**: [Unlock The System $47]

---

## 😫 Section 2: The Problem
Let me ask you...
Do you wake up dreading your inbox?
Are you trading time for money?
[Expand on Pain]

---

## 🎁 Section 3: The Solution
It doesn't have to be this way.
Introducing **The Solopreneur OS**.
The only system built for one-person businesses.

[...Continue for all sections]
```

## 🧠 Conversion Optimizers

1.  **Scarcity**: "Only 50 spots." (Real scarcity only).
2.  **Urgency**: "Price doubles Sunday."
3.  **Visuals**: Describe the image needed. "[IMAGE: Screenshot of Stripe dashboard showing growth]"

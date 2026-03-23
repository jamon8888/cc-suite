---
name: newsletter-writer
description: "Use this skill when the user asks to 'draft this week's newsletter', 'write a welcome email', 'turn this blog into an email', 're-engagement email', 'launch newsletter', or 'newsletter sequence'. Distinguishes 4 newsletter types (nurture/launch/re-engagement/curated) with distinct structures. Always produces 3 subject line options + preview text. Treats reactivation of cold lists as a separate challenge."
---

# Newsletter Writer

Email is the only channel you own. This skill builds newsletters that feel like a letter from a trusted person — not a broadcast from a brand.

## Step 0: Newsletter Type Classification

Identify the type before writing. Each has a different psychology and structure:

| Type | When | Primary goal | Tone |
|------|------|-------------|------|
| **Nurture** | Regular cadence (weekly/bi-weekly) | Build trust over time | Intimate, value-first |
| **Launch** | Pre-product or event release | Move from awareness to desire | Progressive urgency |
| **Re-engagement** | List dormant >3 months | Reactivate relationship | Vulnerable, honest |
| **Curated** | Aggregating external content | Save time for audience | Opinionated, editorial |

**Re-engagement special rule:** Never open a re-engagement email as if nothing happened. Acknowledge the gap directly:
> "I haven't sent you anything in [X months]. Here's why — and whether you should stay."

This honesty increases open rates and unsubscribes simultaneously — which is the goal. A cleaned list of engaged readers beats a big list of ghosts.

---

## Step 1: Load Context

- Voice DNA: `data/2-Domaines/voice-dna.json` (tone, signature phrases)
- ICP: `data/2-Domaines/icp.json` (what they're struggling with today)
- Business Profile: `data/2-Domaines/business-profile.json` (primary offer)
- Archive check: `data/4-Archives/` — has this angle been covered recently?

---

## Step 2: The 3 Subject Line Rule

**Always generate 3 subject lines + preview text for each.** One is not engineering — it's a guess.

Subject line types to cover:
1. **Personal/Curious** — sounds like it's from a person you know: "I failed at this for 3 years"
2. **Benefit/Specific** — what they get: "How to onboard freelancers without the usual friction"
3. **Contrarian/Provocative** — challenges a belief: "Your newsletter strategy is backwards"

For each subject line, immediately pair with a **preview text** (the 40-90 char snippet after the subject):
- Preview text must ADD information, not repeat the subject
- ✗ "This week's newsletter — open to find out"
- ✓ "One framework. Takes 10 minutes. Works on day one."

**Spam check on subject lines:**
- No "FREE", no ALL CAPS, no "!!!!", no "Don't miss"
- No personalization tokens in subject if list > 500 and you can't verify the data

---

## Step 3: Anatomy by Type

### Nurture Newsletter

Structure: Subject + Preview → Hook Lede → One Big Idea → Practical Takeaway → Soft CTA → P.S.

- **Hook Lede** (first 2 sentences): Must earn the next click. Open with a surprising fact, a short story, or a counterintuitive statement. Not "Welcome to this week's edition."
- **One Big Idea** only. Newsletters that try to cover 3 topics cover none of them.
- **You/I Ratio**: "You" leads every lesson/benefit. "I" appears only in stories.
- **Soft CTA**: Not a hard sell — a natural next step. "If this resonated, here's how we go deeper: [link]"
- **P.S.**: The second most-read part. Use for: a quote, a resource, or a 1-line soft pitch.

### Launch Newsletter (sequence logic)

| Email | Timing | Role |
|-------|--------|------|
| 1 | D-14 | The Problem — name the pain without mentioning the product |
| 2 | D-7 | The Insight — the reframe that changes how they see the problem |
| 3 | D-3 | The Story — a before/after (yours or a client's) |
| 4 | D-0 | The Offer — with 48h window |
| 5 | D+1 | The FAQ — handle the real objections |
| 6 | D+2 (last chance) | Scarcity — honest, not artificial |

**Ticket > €1000**: Add a booking-call CTA before D-0. Email alone rarely closes premium.

### Re-engagement Newsletter

Structure:
1. Acknowledge the gap (don't pretend it didn't happen)
2. Give the best piece of content you have — no selling
3. One honest question: "Should I keep sending you emails?" with reply-to activated
4. Warm option to unsubscribe: "If you'd rather I didn't, click here — no hard feelings"

### Curated Newsletter

Structure:
1. Brief editorial stance: "This week I noticed [theme]"
2. 3–5 curated items with **your opinionated take** on each (not summaries — reactions)
3. 1 original observation at the end
4. No CTA needed — trust-building is the CTA

---

## Step 4: Deliverability Checklist

Before finalising:
- [ ] Subject line < 50 chars (mobile preview)
- [ ] Preview text present (40-90 chars)
- [ ] Plain text version mentally possible (no images-only sections)
- [ ] From name = "Name" or "Name from Company" (not "Newsletter")
- [ ] No spam trigger words: "Free offer", "Make money", "Click here", "Guaranteed"
- [ ] Single main CTA (not 5 links)
- [ ] Unsubscribe link present

---

## Output Format

```markdown
# Newsletter Draft — [Type] — [Subject line chosen]

**Subject options:**
1. [Subject A] | Preview: [Preview A]
2. [Subject B] | Preview: [Preview B]
3. [Subject C] | Preview: [Preview C]

**Recommended:** [Option N] — because [reason]

---

[Newsletter body following anatomy for type]

---

P.S. [Copy]

---

**Deliverability check:** ✅/⚠️ [flag if any issue]
**Estimated read time:** [X min]
```

See `references/anatomy.md` for detailed section breakdown and additional templates.

---

## Integration Points

- **Receives from**: `voice-dna-creator`, `icp-creator`, `content-calendar-planner`
- **Triggered by**: `/copywriter:write`, newsletter agents

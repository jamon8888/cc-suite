---
name: competitive-comms
description: >
  Use this skill when the user asks about "competitor comms", "share of voice",
  "what are competitors saying", "competitive monitoring", "veille concurrentielle",
  "analyse concurrentielle", "white space analysis", "what territory is taken",
  "how do we differentiate", or "what should we NOT say because competitors own it".
  Output always ends with Strategic Implications directly linked to the client brief —
  not generic observations.
---

# Skill: Competitive Comms

Audits competitor communications strategies to identify white space and inform brand differentiation. Produces a Competitive Comms Map that ends with **Strategic Implications** — specific, actionable, linked to the client's brief.

**Critical output rule:** The final section is not "observations" or "findings" — it is **Strategic Implications**, formatted as direct recommendations for the client's message architecture, channel strategy, and campaign concept.

---

## Step 1: Map the Competitive Set

Identify 4–6 direct competitors + 2–3 category challengers:

| Company | Type | Priority | Why included |
|---------|------|----------|-------------|
| [Direct 1] | Direct | High | |
| [Direct 2] | Direct | High | |
| [Indirect/Challenger] | Disruptor | Medium | |

For each, collect:
- Brand website home + About page
- Press room / newsroom (recent 6 months)
- LinkedIn last 20 posts
- Instagram / TikTok (B2C)
- Google News: "[brand]" last 6 months
- Any published campaigns or brand films

---

## Step 2: Messaging Audit — Per Competitor

```markdown
### [Competitor Name]

Brand claim / tagline: [What they lead with]
Master message: [What they are fundamentally saying in 1 sentence]
Tone: [3 adjectives]
Key themes OWNED: [Topics they consistently occupy — not just mentioned]
Vocabulary: [Recurring words and phrases — what is their word territory?]
CONSPICUOUS ABSENCES: [Topics they systematically avoid — often a reveal]
Emotional register: [Inspiring / rational / urgent / playful / authoritative / fear-based]
Target audience signals: [Who the comms is aimed at]
Distinctive assets: [Visual, sonic, verbal codes — do they have real assets?]
```

**Pattern to look for:** The absence of a topic is often more revealing than what's present. If every competitor talks about "innovation" but none talks about "simplicity," that absence is the white space.

---

## Step 3: Channel Presence Matrix

Rate each competitor's presence and activity per channel (1–5, where 5 = dominant):

| Channel | [Comp 1] | [Comp 2] | [Comp 3] | [Comp 4] | Notes |
|---------|---------|---------|---------|---------|-------|
| LinkedIn | | | | | |
| Instagram | | | | | |
| TikTok | | | | | |
| YouTube | | | | | |
| National press (T1) | | | | | |
| Trade press (T2) | | | | | |
| Podcasts | | | | | |
| Events / Conferences | | | | | |
| Newsletter / Owned | | | | | |
| Influencers | | | | | |

---

## Step 4: Share of Voice Estimation

| Channel | Client | Comp 1 | Comp 2 | Comp 3 | Total |
|---------|--------|--------|--------|--------|-------|
| Press (earned) | % | % | % | % | 100% |
| Social (organic) | % | % | % | % | 100% |
| Search (organic) | % | % | % | % | 100% |
| Events | % | % | % | % | 100% |

---

## Step 5: White Space Analysis

The actionable core of competitive analysis.

### Message White Space

| Topic / Theme | Comp 1 | Comp 2 | Comp 3 | Occupied? | Opportunity |
|--------------|--------|--------|--------|-----------|-------------|
| [Topic] | Weak | Absent | Strong | No | High |
| ... | | | | | |

**Opportunity rating:** High = no competitor owns it + audience cares. Medium = present but weak. Low = saturated.

### Tone White Space

What emotional register is MISSING from the category?

| Existing register | Absent register | Is there audience demand? |
|------------------|----------------|--------------------------|
| [All compete on 'innovative'] | [Humble / self-aware] | [Yes if audience sceptical of category claims] |

### Channel White Space

Channels where competitors are absent but target audience is present:

| Channel | Competitor presence | Audience presence | Opportunity |
|---------|-------------------|------------------|-------------|
| | Absent | High | → Prioritise |
| | Absent | Medium | → Test |

### Audience White Space

Segments underserved or under-targeted by competitor comms:

| Segment | Who targets them | Depth | Opportunity |
|---------|-----------------|-------|-------------|

---

## Step 6: Strategic Implications

**This section is mandatory.** It translates the analysis into 5 specific, actionable recommendations directly linked to the client's brief. Generic observations are not accepted.

Format:

```
STRATEGIC IMPLICATIONS FOR [CLIENT BRIEF]

Implication 1 — Message territory: [Specific claim the client can own because competitors don't]
Because: [Competitor evidence]
Impact on brief: [How this changes the message architecture]

Implication 2 — Channel: [Specific channel(s) the client should prioritise because competitors are absent]
Because: [Competitive gap evidence]
Impact on brief: [How this changes the channel mix]

Implication 3 — Tone: [The tonal register available because it's absent from the category]
Because: [What the current category tone sounds like — and why the gap exists]
Impact on brief: [How this changes the creative direction]

Implication 4 — Audience: [Segment competitors have ignored that the client can own]
Because: [Who is underserved and why]
Impact on brief: [Audience prioritisation recommendation]

Implication 5 — Timing: [Window of opportunity — when to move before a competitor closes the gap]
Because: [Competitive context / regulatory / seasonal]
Impact on brief: [Timeline recommendation]
```

---

## Output: Competitive Comms Map

Save to `data/1-Projets/clients/[client]/competitive-comms-map.md`

Structure:
1. **Competitive Set** — Who we mapped and why
2. **Messaging Audit** — Per-competitor DNA
3. **Channel Presence Matrix**
4. **Share of Voice Estimates**
5. **White Space Analysis** — Message / Tone / Channel / Audience
6. **Earned Media Intelligence** — Which angles generated press for competitors
7. **Influencer Map** — Who amplifies whom
8. **Strategic Implications** — 5 direct recommendations for the brief

---

## Integration Points

- **Receives from**: `brief-analyzer` (competitor list), `media-landscape` (channel context)
- **Feeds into**: `message-architecture` (differentiation), `campaign-strategy` (channel), `media-landscape`
- **Triggered by**: `/comms:monitor`, `/comms:strategy`, `/comms:pitch`

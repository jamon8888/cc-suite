---
name: icp-creator
description: "Use this skill when the user asks to 'create my ICP', 'define my ideal client', 'build my audience profile', 'who is my target', or 'who should I write for'. Also trigger when voice-dna-creator or content-calendar-planner needs an audience profile that doesn't exist yet. For B2B contexts, builds a full buying committee map, not just a single persona."
---

# ICP Creator — Ideal Client Profile

A strong ICP is built from real signals, not from guesses. This skill asks the right questions, mines public data where possible, and flags when the information is insufficient to build a reliable profile.

## Step 0: Context Classification

Answer before building the ICP:

**Business model**: B2C (individual consumer) / B2B (business buyer) / B2B2C (sell to businesses who serve consumers)

**Data availability**:
- 10+ past clients/customers → Evidence-based ICP
- 3–9 clients → Hypothesis ICP (clearly flagged as needing validation)
- 0–2 clients → Aspirational ICP (highest risk — flag all assumptions)

**Ticket price (if known)**:
- < €200 → impulse/considered purchase
- €200–€2000 → considered purchase, 1 decision-maker
- > €2000 B2C or any B2B → multi-touchpoint, longer cycle, possibly committee

→ Adjust depth and buying committee section accordingly.

---

## Step 1: Discovery Questions

Ask these before populating any field. Do NOT generate from assumptions alone.

**Core identity:**
- Describe your best client in one sentence (not a job title — what makes them ideal?)
- What problem did they have when they found you?
- What happened to them after working with you?

**Motivation:**
- Why did they really hire you? (not the stated reason — the underlying fear or desire)
- What had they already tried that didn't work?
- What would have made them NOT hire you?

**Language:**
- What exact words did they use to describe their problem? (verbatim if possible)
- What do they call the solution they were looking for?
- What phrases appear in their LinkedIn posts / emails / reviews?

**For B2B only:**
- Who else was involved in the decision?
- Who could have vetoed the purchase?
- How long did it take from first contact to signature?

---

## Step 2: Research Protocol (Standalone)

When client data is limited, mine public signals:

**Reddit mining:**
- Find subreddits where this audience talks: r/[niche], r/freelance, r/entrepreneur, r/[industry]
- Search: "[problem keyword] + frustrated" / "[solution keyword] + doesn't work"
- Extract: exact vocabulary, recurring complaints, questions asked repeatedly

**LinkedIn signals:**
- Search posts by the target job title + their pain: "DG + transformation" / "freelance + client retention"
- Read the comments — not the posts. Comments reveal real objections and real vocabulary.

**Review mining:**
- Find reviews of competing services/products (G2, Trustpilot, Amazon for books on the topic)
- 1-star reviews = unmet needs. 5-star reviews = what delights.

**Output of research:**
Note: "Verbatim from Reddit r/[sub]: '[exact phrase]'" — never paraphrase audience language.

---

## Step 3: B2B Buying Committee (B2B only)

Never build a B2B ICP as a single persona. Map the committee:

| Role | Who they are | Their objective | Their fear | Their influence |
|------|-------------|-----------------|------------|-----------------|
| **Economic Buyer** | DG, CEO, DAF | ROI, strategic fit | Wasted budget | Final sign-off |
| **Technical Buyer** | DSI, CTO, ops lead | Integration, risk | Vendor lock-in | Gates shortlist |
| **User Buyer** | Teams, managers | Ease of use | Change overload | Can kill adoption |
| **Champion** | Internal advocate | Career advancement | Sponsors a failure | Drives internal case |
| **Gatekeeper** | Procurement, legal | Process, compliance | Liability | Can delay indefinitely |

**Primary content target:** Usually the Champion or User Buyer — the person who searches for solutions and consumes your content. The Economic Buyer rarely reads your blog.

**Content implication per role:**
- Champion → thought leadership, peer validation, business case templates
- User Buyer → how-to, tutorials, before/after
- Economic Buyer → case studies with hard numbers, analyst references

---

## Step 4: Generate the ICP JSON

```json
{
  "ideal_client_profile": {
    "version": "2.0",
    "last_updated": "YYYY-MM-DD",
    "icp_type": "evidence-based | hypothesis | aspirational",
    "business_model": "B2C | B2B | B2B2C",
    "primary_content_target": "[Role — for B2B: Champion/UserBuyer/EconomicBuyer]",
    "demographics": {
      "age_range": "",
      "location": "",
      "income_level": "",
      "education": ""
    },
    "professional_profile": {
      "job_titles": [],
      "industries": [],
      "company_size": "",
      "experience_level": "",
      "decision_making_power": "",
      "buying_cycle_length": ""
    },
    "psychographics": {
      "values": [],
      "beliefs": [],
      "identity_aspiration": "[Who they want to become — not just what they want to do]"
    },
    "problems_and_pain_points": {
      "primary_problems": [],
      "frustrations": [],
      "fears": [],
      "failed_solutions": ["[What they tried that didn't work — verbatim if possible]"],
      "real_why": "[The actual driver beneath the stated problem — Sutherland's Level 4-5]"
    },
    "goals_and_desires": {
      "immediate_goals": [],
      "long_term_aspirations": [],
      "dream_outcome": "",
      "identity_outcome": "[Who they will be after — not just what they will have]"
    },
    "language_patterns": {
      "words_they_use": ["[Verbatim from research — never invent]"],
      "phrases_they_say": ["[Direct quotes from reviews/Reddit/comments]"],
      "questions_they_ask": ["[Exact searches/questions from research]"],
      "words_they_hate": ["[Terms that signal 'not my kind of person']"],
      "jargon_they_know": []
    },
    "content_consumption": {
      "platforms": [],
      "content_formats": [],
      "trusted_voices": ["[Specific people/publications they follow]"],
      "consumption_context": "[When and where — commute, morning coffee, work research]"
    },
    "objections": {
      "common_objections": [],
      "trust_barriers": [],
      "b2b_committee_objections": {}
    },
    "buying_triggers": {
      "emotional_triggers": [],
      "logical_triggers": [],
      "timing_triggers": ["[Life/career events that create buying urgency]"]
    }
  }
}
```

---

## Step 5: Validation

After generating:
1. Show 3 verbatim phrases the ICP would say — ask: "Does this sound like your client?"
2. Flag any field filled with assumption (not evidence): mark with `[ASSUMPTION — validate with X clients]`
3. If < 5 real clients to draw from: explicitly state "This ICP is a hypothesis. Validate with 3 customer interviews before using for paid content."

---

## Integration Points

- **Feeds into**: `voice-dna-creator`, `content-calendar-planner`, `linkedin-post`, `newsletter-writer`, all content skills
- **Triggered by**: `/copywriter:start`, any skill that references `{{icp}}`

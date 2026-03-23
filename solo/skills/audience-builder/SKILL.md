---
name: audience-builder
description: >
  Use this skill when the user says 'create my ICP', 'define my ideal client',
  'build audience profile', 'create a persona', 'who is my user', 'proto-persona',
  'target customer', or 'who should I build for'. Handles both modes:
  ICP mode (service business targeting buyers) and persona mode (product targeting users).
  Replaces both icp-creator and proto-persona — detects context automatically.
---

# Skill: Audience Builder

Two modes, one skill. The context determines which to run.

**ICP mode** (service business): Who will pay you? What do they care about? What language do they use?
**Persona mode** (product builder): Who will use this? What job are they hiring it for? What does their day look like?

## STEP 0 — DETECT MODE

```
READ data/2-Domaines/business-profile.json → revenue_model (service / product / both)
```

| Context signal | Mode |
|----------------|------|
| "ideal client", "who should I target", "sales ICP" | ICP |
| "persona for my product", "user persona", "/solo:build" context | Persona |
| Both present or unclear | Ask: "Are you defining who will pay you (ICP for services) or who will use a product (persona)?" |

---

## ICP MODE

### Step 1 — Data Classification

| Data available | ICP type | Action |
|---------------|----------|--------|
| 10+ past clients | Evidence-based | Build from facts |
| 3–9 clients | Hypothesis ICP | Flag all assumptions |
| 0–2 clients | Aspirational ICP | All assumptions — warn |
| B2B context | Add buying committee | 5-role map required |

### Step 2 — Discovery Questions (don't generate without these)

Core:
- "Describe your best client in one sentence — not a job title, what makes them ideal?"
- "What problem did they have when they found you?"
- "Why did they really hire you? (not the stated reason — the underlying fear or desire)"
- "What exact words did they use to describe their problem?"

For B2B only:
- "Who else was involved in the decision?"
- "How long from first contact to signature?"
- "Who could have vetoed the purchase?"

### Step 3 — B2B Buying Committee (B2B only)

| Role | Objective | Fear | Influence |
|------|-----------|------|-----------|
| Economic Buyer | ROI, strategic fit | Wasted budget | Final sign-off |
| Technical Buyer | Integration, risk | Vendor lock-in | Gates shortlist |
| User Buyer | Ease of use | Change overload | Can kill adoption |
| Champion | Career advancement | Sponsors a failure | Drives case |
| Gatekeeper | Process, compliance | Liability | Can delay |

Primary content target: usually Champion or User Buyer.

### Step 4 — Output

Save to: `data/2-Domaines/icp.json`

Key fields: demographics, professional_profile, psychographics, pain_points (with `real_why` at level 4-5), language_patterns (verbatim from research), buying_triggers, b2b_buying_committee (if applicable).

Flag every field filled with assumption: `[ASSUMPTION — validate with X clients]`

---

## PERSONA MODE

### Step 1 — Research Approach

Mine before inventing:
- Reddit: r/[niche] + "frustrated" / "wish there was" / "why doesn't X"
- Product Hunt comments on competing products
- App store 1-star reviews of alternatives
- LinkedIn posts by target job title

Output verbatim quotes — never paraphrase audience language.

### Step 2 — Persona Structure

```markdown
# Persona: [Archetype Name]

## Snapshot
- Who: [Role, context, 1-sentence description]
- Quote: "[Something they'd actually say — from research if possible]"

## Jobs to Be Done
Primary JTBD: "When [situation], I want to [motivation], so I can [outcome]"
Secondary JTBDs: [list]

## Pain Points
- [Pain 1] — severity: High/Med/Low
- Source: [verbatim from research or "inferred"]

## Behavioral Signals
- [Workaround they currently use]
- [Tool they've tried and abandoned]
- [Community they're active in]

## Trigger Moments
[The specific life/work situation that makes them search for a solution — this is when to reach them]

## What "Done" Looks Like
[Their definition of success — specific and behavioral, not aspirational]
```

Save to: `data/1-Projets/[product]/persona-[name].md`

### Step 3 — Persona Confidence

| Interviews done | Confidence | Impact |
|----------------|-----------|--------|
| 0 | Very Low — hypothetical | Flag every assumption |
| 1–3 | Low — early signal | Use cautiously |
| 5–7 | Medium — usable | Proceed with caveats |
| 8+ | High | Proceed with confidence |

Always state: "This persona has [confidence level] confidence based on [N] user interviews."

---

## Integration Points
- **Replaces**: icp-creator, proto-persona (both deprecated)
- **Feeds**: draft-outreach, proposal-generator, content-calendar, diagnostic-builder, discovery-synthesizer-agent
- **Saves to**: data/2-Domaines/icp.json (ICP mode) or data/1-Projets/[product]/persona.md (persona mode)

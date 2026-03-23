---
name: proposal-generator
description: "Use this skill when the user asks to 'create proposal', 'write proposal for', 'generate SOW', 'pitch document', or 'devis'. Reads discovery notes and client research BEFORE writing — a proposal without client context is a template, not a proposal."
---

# Skill: Proposal Generator

Creates persuasive proposals by pulling discovery notes, client research, and pricing into a tailored document. The core value is using the client's own language back at them.

## STEP 0 — CONTEXT LOAD (mandatory, changes everything)

Read in this order. Report what was found.

```
1. READ data/1-Projets/[project-or-client]/call-summary.md
2. READ data/3-Ressources/[company].md  (company research)
3. READ data/1-Projets/clients/[client].md  (client card)
4. READ data/2-Domaines/business-profile.json  (your services + positioning)
```

Report before writing:
```
Context loaded:
  Discovery notes: [FOUND — dated X] or [NOT FOUND]
  Company research: [FOUND — dated X] or [NOT FOUND]
  Client card: [FOUND] or [NOT FOUND]
  Business profile: [FOUND]

Using from discovery: "[1-2 verbatim phrases from call notes to anchor the proposal]"
```

If no discovery notes found: "I don't have call notes for [client]. The proposal will be generic without them — worth 30 minutes to brief me on what was discussed. Or proceed with what you share in this conversation."

## STEP 1 — SELECT VARIANT

| Context | Variant | Key distinction |
|---------|---------|----------------|
| Project with defined deliverables | **SOW** | Scope, timeline, exclusions |
| Pitching new business | **Sales Proposal** | Their challenge framed as opportunity, tiered options |
| Ongoing service | **Rate Card Proposal** | Engagement models, retainer options |

Confirm: "Based on the context, I'll use the [SOW / Sales / Rate Card] format. Correct?"

## STEP 2 — BUILD

### SOW Structure

1. **The Challenge** — restate in THEIR language. Use verbatim phrases from call notes or client card.
   - ✓ "As you described: 'our onboarding is costing us 3 consultants a week'"
   - ✗ "Your company faces challenges with operational efficiency"

2. **Proposed Solution** — your approach, specifically addressing their situation
3. **Scope of Work** — what IS included (explicit list)
4. **Exclusions** — what is NOT included (mandatory section — prevents scope creep)
   - "The following are explicitly out of scope for this engagement: [list]"
   - "Any requests outside this scope will be addressed via a Change Request."
5. **Timeline** — phased with milestone dates
6. **Investment** — from pricing-strategy output or rate card
   - If budget TBD: present two options (full scope + lighter Phase 1)
7. **Terms** — payment schedule, revision policy, change request process
8. **Next Steps** — single clear CTA

### Sales Proposal Structure

1. **About [Company]** — demonstrate you understand them (use research)
2. **The Opportunity** — frame problem as opportunity
3. **Our Approach** — how you work + differentiation
4. **Options** — 3 tiers: Good / Better / Best (anchoring)
   - Good: minimum scope, lower price
   - Better: recommended (highlighted)
   - Best: premium scope, highest ROI framing
5. **Proof** — 1-2 relevant case studies with specific results
6. **Investment** — pricing with ROI framing
7. **Next Steps**

### Rate Card Proposal Structure

1. **Services Overview** — what you offer
2. **Engagement Models** — with price ranges
3. **Terms** — retainer commitments, cancellation policy

## STEP 3 — EXCLUSIONS CHECKLIST

Before finalizing any SOW, confirm these are addressed:

- [ ] Revision rounds explicitly limited (e.g., "2 rounds of revisions per deliverable")
- [ ] Technology/tools costs excluded (client pays for hosting, licenses, etc.)
- [ ] Out-of-scope request process defined (change request required)
- [ ] What happens if client delays are specified (timeline extends by delay duration)

## STEP 4 — SAVE

Save to: `data/1-Projets/clients/[client]/proposal-[date].md`
Update client card: Stage → Proposal, Next Action → "Follow up on proposal in 5 days"

---

## Integration Points
- **Reads**: call-summary.md, company research, client card, business-profile.json
- **Feeds**: client card (stage update), scope-management (exclusions reference)
- **Triggered by**: /solo:clients proposal

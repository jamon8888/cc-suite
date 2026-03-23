---
name: proposal-builder
description: "Use when the user asks to 'draft proposal', 'create proposal for [Client]', 'generate SOW'. Reads call summary and deal files BEFORE writing — a proposal built without the client's own words is a template, not a proposal."
---

# Skill: Proposal Builder

## STEP 0 — CONTEXT LOAD (mandatory)

```python
base = SOLO_ROOT if solo_installed else SALES_ROOT

call_summary = read(f"data/1-Projets/prospects/{client_slug}/call-summary.md")
deal_file    = read(f"data/1-Projets/active-deals/{client_slug}.md")
research     = read(f"data/3-Ressources/{client_slug}.md")
profile      = read("data/2-Domaines/sales-profile.json")
voice_dna    = read(f"{base}/data/2-Domaines/voice-dna.json")
```

Report before writing:
```
Proposal context — [Client]
Call summary: [FOUND dated X — extracting their language now] / [NOT FOUND — brief will be generic]
Deal file:    [FOUND — [N] interactions] / [NOT FOUND]
Research:     [FOUND] / [NOT FOUND]
```

Extract from call summary — show these before writing the proposal:
> "Using these client quotes to anchor the proposal:
> - '[Verbatim pain phrase from call notes]'
> - '[Their stated outcome in their words]'"

If no call summary: "No discovery notes found for [Client]. The proposal will be generic without them. Proceed or run call prep first?"

## STEP 1 — FORMAT SELECTION

| Trigger | Format |
|---|---|
| Defined project, fixed deliverables | **SOW** |
| Pitching new business | **Sales Proposal** (3-tier) |
| Ongoing / recurring engagement | **Retainer Proposal** |
| "pitch" or "vision" | **Sales Proposal** |

## STEP 2 — BUILD (using their language)

### SOW Structure

**1. The Challenge** — open with their words, not yours
> Do: "As you described: '[verbatim quote from call summary]'"
> Don't: "Your organization faces challenges with [generic category]"

**2. Our Approach** — map to their specific situation (not a generic service description)

**3. Scope of Work** — explicit deliverables list

**4. Exclusions** ← mandatory section, never skip
```
The following are explicitly out of scope:
- [Item 1]
- [Item 2]
Any request outside this scope requires a Change Request and will be quoted separately.
```

**5. Timeline** — phased with milestones and dates

**6. Investment** — 3-tier pricing (Basic/Recommended/Premium)
- Basic: minimum scope (lower anchor)
- Recommended: full scope — highlight this
- Premium: full scope + priority access + strategy sessions

**7. Terms** — pull from `references/legal-snippets.md`:
- Payment schedule (50% upfront recommended)
- Revision policy (2 rounds per deliverable)
- IP and confidentiality
- Change request process

**8. Next Steps** — single CTA (sign / schedule kickoff / confirm by date)

### Sales Proposal Structure
1. About [Company] — demonstrate you understand them
2. The Opportunity — their problem framed as opportunity
3. Our Approach — differentiation
4. Options (3-tier anchoring)
5. Proof — 1-2 case studies with specific results
6. Investment + Timeline
7. Next Steps

## STEP 3 — ANTISLOP CHECK

Before saving, scan for and remove:
- "innovative", "cutting-edge", "world-class", "seamless", "transformative"
- "we are passionate about", "leveraging synergies", "holistic approach"
- Any sentence that would be equally true for any competitor

Replace with specifics: client's industry, their stated metrics, their own language from call notes.

## STEP 4 — SAVE

```python
WRITE f"data/1-Projets/prospects/{client_slug}/proposal-{date}.md"
UPDATE deal file: Stage → Proposal, Next Action → "Follow up in 5 days"
```

Confirm: "Proposal saved. Client card updated — stage set to Proposal."

---

## Integration Points
- **Reads**: call-summary.md, deal file, account research, voice-dna.json, legal-snippets.md, pricing-tables.md
- **Writes**: proposal file, deal file stage update
- **Triggered by**: `/sales:create proposal`

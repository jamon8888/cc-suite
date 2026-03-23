---
name: call-prep
description: "Use when the user asks to 'prep me for my call with [company]', 'call prep [company]', 'prepare for [meeting type] with [person]'. Reads existing research and CRM files BEFORE generating prep — a brief built without context is just a template."
---

# Call Prep

## STEP 0 — CONTEXT LOAD (mandatory, no output until complete)

```python
# Determine data paths (ecosystem vs standalone)
base = SOLO_ROOT if solo_installed else SALES_ROOT

# Read in priority order
icp_data    = read(f"{base}/data/2-Domaines/icp.json")
voice_dna   = read(f"{base}/data/2-Domaines/voice-dna.json")
profile     = read("data/2-Domaines/sales-profile.json")

# Account-specific (read if exists)
research    = read(f"data/3-Ressources/{company_slug}.md")      # from account-research
deal_file   = read(f"data/1-Projets/active-deals/{company_slug}.md")  # CRM history
client_card = read(f"{base}/data/1-Projets/clients/{company_slug}.md")  # Solo client file
```

Report before writing anything:
```
Call Prep context — [Company] [Date]
Research file: [FOUND dated X — using] / [NOT FOUND — running web search now]
Deal history:  [FOUND — [N] interactions, last: X] / [NOT FOUND]
ICP fit:       [High/Medium/Low] — [reason in 1 line]
```

If no research file: run a quick web search immediately (3 searches: company news, leadership, product). Do not ask — act.

## STEP 1 — ICP FIT ASSESSMENT

Using icp.json, score this account before writing the brief:

```
ICP Fit: [High/Medium/Low]
✓ Industry: [match/mismatch — their industry vs ICP target]
✓ Size: [match/mismatch — headcount vs ICP range]
✓ Role: [match/mismatch — attendee title vs ICP buyer persona]
⚠ Watch for: [1-2 red flags — e.g., "no budget authority without CFO"]
```

## STEP 2 — NEWS HOOK

Search for one specific, timely hook from the prospect's world:
- Funding round, product launch, leadership change, hiring surge, press coverage
- Not older than 90 days

Format: **"Opening hook: '[Specific observation about their situation]' → leads to '[relevant pain angle]'"**

If no news found: use a competitor signal, industry trend, or their own content as hook.

## STEP 3 — MEETING TYPE BRIEF

Load `references/meeting-type-playbooks.md` for the specific meeting type.

| Meeting type | Key deliverable |
|---|---|
| Discovery | Situation→Problem→Impact→Decision question sequence |
| Demo | 3 custom demo flows mapped to their stated pain |
| Negotiation | BATNA, trading variables, walk-away threshold |
| QBR | Success metrics vs agreed criteria |
| Check-in | Relationship health + expansion signal detection |

Generate the brief using the playbook for the stated meeting type.

## STEP 4 — 3 STRATEGIC QUESTIONS

Not generic discovery questions — specific questions to advance THIS deal:
1. [Question tied to the specific news hook or open deal issue]
2. [Question to surface the real decision-making process]
3. [Question to test urgency or confirm/deny a key assumption]

## STEP 5 — OBJECTION PRE-LOAD

Based on deal stage and attendee role, load the 2 most likely objections from `references/question-bank.md`:

```
Likely objection 1: "[Stated objection]"
  Real objection: "[What's usually behind it]"
  Response: "[ACA framework — in your voice from voice-dna.json]"

Likely objection 2: [same format]
```

## STEP 6 — POST-CALL TEMPLATE

Append a blank post-call capture template at the end of every brief:

```markdown
## Post-Call Capture — [Company] [Date]

BANT Score (0–100):
  Budget: /25 — [evidence]
  Authority: /25 — [evidence]
  Need: /25 — [evidence]
  Timeline: /25 — [evidence]
Total: /100 → [Strong → Proposal / Moderate → Nurture / Weak → Qualify out]

Key insight: [The one thing that determines if this closes]
Next action: [Specific, with date]
Pipeline update: [Stage → Stage]
```

Save completed brief to: `data/1-Projets/active-deals/[company]-prep-[date].md`

---

## Integration Points
- **Reads**: account research, deal files, icp.json, voice-dna.json, meeting-type-playbooks.md
- **Feeds**: deal file (post-call notes), pipeline update
- **Triggered by**: `/sales:engage prep`, morning calendar detection

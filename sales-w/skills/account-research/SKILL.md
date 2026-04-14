---
name: account-research
description: "Use when the user asks to 'research [company]', 'intel on [prospect]', 'look up [person]', 'tell me about [company]'. Always saves findings to disk — research that isn't saved can't be used by call-prep, proposal-builder, or signal-trapper."
---

# Account Research

## STEP 0 — CHECK EXISTING DATA

```python
research_file = read(f"data/3-Ressources/{company_slug}.md")
icp           = read("data/icp.json")
deal_file     = read(f"data/1-Projets/active-deals/{company_slug}.md")
```

If research file exists and is < 14 days old: "Research found from [date]. Refresh or use existing?"
If deal file exists: "This is an active deal — pulling prior context first."

## STEP 1 — WEB RESEARCH (always execute)

Run these searches (don't ask permission — execute immediately):

```
1. "[Company] news 2025 2026"          → recent funding, launches, press
2. "[Company] [CEO/CTO name] LinkedIn" → leadership + hiring signals  
3. "[Company] vs [competitors]"         → how they position, what customers say
4. "[Company] jobs"                     → growth signals from hiring
5. "[Person name] [Company]"            → specific contact research if name given
```

## STEP 2 — FINDINGS STRUCTURE

```markdown
# Account Research — [Company] — [Date]

## Snapshot
- What they do (1 sentence)
- Size: [headcount range] | Stage: [startup/scaleup/enterprise]
- Industry: [sector] | HQ: [location]
- Revenue est.: [if available]

## Trigger Events (last 90 days)
| Event | Date | Relevance to us |
|---|---|---|
| [Funding / launch / hire / news] | | [why this matters for outreach] |

## Leadership
| Name | Role | Recent activity |
|---|---|---|
| [Name] | [Title] | [LinkedIn post / quote / interview] |

## Pain Signals
[Evidence of the problem we solve — hiring for relevant roles, complaints, workarounds mentioned publicly]

## Competitive Landscape
- Current vendor / incumbent (if known): [X]
- Evaluated: [Y, Z]
- How they position vs competitors: [summary]

## ICP Fit Assessment
```
ICP dimension    | Match? | Evidence
Industry         | ✓/✗    | [their sector vs ICP target]
Company size     | ✓/✗    | [headcount vs ICP range]
Pain alignment   | ✓/✗    | [pain signals found vs ICP pain points]
Geography        | ✓/✗    | [location vs ICP geography]

ICP Fit: [High/Medium/Low]
ICP confidence: [High/Medium/Low — based on research depth]
```

## Best Outreach Angle
[The specific hook to use — tied to a trigger event or pain signal]
"Open with: '[Specific observation]' → links to '[our relevant capability]'"
```

## STEP 3 — SAVE (mandatory)

```python
WRITE f"data/3-Ressources/{company_slug}.md"
```

Confirm: "Research saved → data/3-Ressources/[company].md. Call-prep and proposal-builder will use it automatically."

Update deal file if one exists: append research summary to meeting notes.

---

## Integration Points
- **Writes to**: data/3-Ressources/[company].md (read by call-prep, proposal-builder)
- **Reads**: icp.json (for fit assessment), existing deal files
- **Triggered by**: `/sales:prospect [company]`, call-prep (auto-triggers if no research found)

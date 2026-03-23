---
name: para-organizer
description: "This skill should be used when the user asks to 'organize agency files', 'set up PARA', 'structure my workspace', 'organize my briefs and campaigns', 'triage my inbox', or 'clean up my data folder'."
tools: ["Read", "Write", "Glob"]
---

# Agency File Organizer (PARA Method)

Organizes the `data/` folder using PARA methodology, adapted for a brand and communications agency. Maintains clean separation between active client work, ongoing agency responsibilities, reference material, and completed projects.

## Agency PARA Map

```
data/
├── 0-Inbox/                      # New briefs, assets, requests awaiting triage
├── 1-Projets/                    # Active work with live deadlines
│   ├── clients/                  # [ClientName].md — profile, history, contacts
│   ├── briefs/                   # brief-[client]-[YYYY-MM].md
│   ├── campaigns/                # [campaign-name]/ — strategy, assets, reports
│   ├── pitches/                  # [prospect]-pitch-[YYYY-MM].md
│   └── frameworks/               # Agency methodologies in active use
├── 2-Domaines/                   # Ongoing agency responsibilities (no deadline)
│   ├── agency-profile.md         # Agency identity — single source of truth
│   ├── media-contacts/           # Journalist, editor, influencer relationships
│   └── voice-guidelines/         # Brand voice standards and tone guides
├── 3-Ressources/                 # Reference material — permanent
│   ├── templates/                # Brief, platform, campaign templates
│   ├── case-studies/             # Past campaigns kept as reference
│   └── research/                 # Sector intelligence, audience data
└── 4-Archives/                   # Completed or inactive items
    ├── campaigns/                # Signed-off campaigns
    └── pitches/                  # Closed pitches — prefix won- or lost-
```

## File Naming Convention

Format: `[YYYY-MM]_[TYPE]_[client-or-topic].[ext]`

| Code | Category | Example |
|------|----------|---------|
| `BRIEF` | Active brief | `2026-02_BRIEF_renault-repositioning.md` |
| `STRAT` | Comms strategy / platform | `2026-02_STRAT_renault-comms-platform.md` |
| `CAMP` | Campaign document | `2026-02_CAMP_renault-spring-launch.md` |
| `PITCH` | New business pitch | `2026-02_PITCH_sncf-brand-refresh.md` |
| `AUD` | Audience analysis | `2026-02_AUD_renault-gen-z-segment.md` |
| `MEAS` | Measurement framework | `2026-02_MEAS_renault-q1-kpis.md` |
| `REF` | Reference / research | `2026-01_REF_automotive-sector-study.md` |

## Workflow

### Phase 1 — Scan
Read `data/` structure. Report:
- Files sitting in `0-Inbox/` (need triage)
- Files in wrong locations (e.g., briefs in root)
- Files with missing or ambiguous names
- Missing subdirectories from the PARA map above

### Phase 2 — Scaffold (if structure incomplete)
Create any missing directories. Offer to create placeholder `README.md` files in empty folders so structure is visible.

Do not create directories that already exist. Confirm scaffold plan before executing.

### Phase 3 — Triage Inbox
For each file in `0-Inbox/`, ask:
1. Active client work with a deadline → `1-Projets/`
2. Ongoing agency relationship or responsibility → `2-Domaines/`
3. Reference material with no deadline → `3-Ressources/`
4. Completed or inactive → `4-Archives/`
5. None of the above → flag for user decision

### Phase 4 — Execute (with approval)
Move and rename files per convention. **User approval required before any move or rename.**

Log each operation:
```
[YYYY-MM-DD HH:MM] MOVED: 0-Inbox/brief.md → 1-Projets/briefs/2026-02_BRIEF_acme-rebrand.md
```

## Archive Triggers

Move a campaign to `4-Archives/campaigns/` when:
- All deliverables are signed off by client
- Final report has been filed
- No active tasks remain

Move a pitch to `4-Archives/pitches/` when won or lost. Use prefix `won-` or `lost-` for easy filtering.

## Weekly Inbox Review

Process `0-Inbox/` in under 5 minutes:
1. Does it have a deadline? → `1-Projets/`
2. Is it an ongoing relationship? → `2-Domaines/`
3. Is it reference material? → `3-Ressources/`
4. Is it done? → `4-Archives/`
5. Is it noise? → delete (confirm first)

## Session Resumption

If interrupted, resume by:
1. Checking `0-Inbox/` for remaining untriaged items
2. Confirming last completed move from log
3. Continuing triage from that point

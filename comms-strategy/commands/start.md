---
description: "Agency onboarding — set up your agency profile, client portfolio, and working preferences. Run once to unlock all comms-strategy capabilities."
argument-hint: "[agency name or skip]"
allowed-tools: Read, Write, Bash, Glob
model: sonnet
---

# /comms:start — Agency Onboarding

> If you see unfamiliar placeholders or need to check which tools are connected, see [CONNECTORS.md](../CONNECTORS.md).

Sets up the agency's strategic foundation — profile, specialties, client list, brand voice, and working preferences. Creates the `data/2-Domaines/agency-profile.md` file that all other commands reference.

Run this once when first setting up the plugin. Re-run to update the profile.

## Usage

```
/comms:start
/comms:start "Agence Lumière"
```

---

## Onboarding Flow

Conduct a structured interview. Ask each question in turn. Pause and wait for the answer before moving on.

Produce output in the same language as the user's responses (FR or EN).

### Phase 1: Agency Identity

Ask the following questions sequentially:

**Question 1:** "What is the name of your agency? And what's the elevator pitch — how would you describe what you do in 2 sentences?"

**Question 2:** "What are your primary specialties? Choose all that apply:
- Brand strategy and positioning
- Corporate and institutional communications
- PR and media relations
- Integrated campaigns
- Digital and social media
- Content strategy and editorial
- Crisis communications
- Internal communications
- New business and pitch development
- Other (describe)"

**Question 3:** "What sectors do you specialise in? (List the 3–5 sectors where you have the most experience and/or clients)"

**Question 4:** "Geographically, what markets do you primarily serve? (e.g., France, French-speaking Europe, EMEA, Global)"

**Question 5:** "What languages do you work in? (FR / EN / DE / ES / other)"

### Phase 2: Client Portfolio

**Question 6:** "Who are your current active clients? Provide as much or as little as you're comfortable sharing. I'll use this to contextualise strategic work. Format:
- Client name
- Sector
- What you do for them (brief)"

**Question 7:** "Do you have any restricted clients — brands you cannot work with due to conflicts? List any sectors or specific brands to avoid."

### Phase 3: Working Preferences

**Question 8:** "How do you prefer to receive strategic outputs?
- Long-form (full documents with sections and sub-sections)
- Structured (headers + bullets + tables, minimal prose)
- Executive summary first, detail available on request"

**Question 9:** "Which measurement tools does your agency use? (e.g., Cision, Meltwater, Semrush, Brandwatch, native analytics — or none yet)"

**Question 10:** "Do you have any connected tools we should know about? Check [CONNECTORS.md](../CONNECTORS.md) for the list of integrations."

### Phase 4: New Business

**Question 11:** "What is your target client profile for new business? Describe your ideal client — sector, size, what challenge they typically bring you."

**Question 12:** "What is your agency's differentiator? What do you do that your competitors don't — or don't do as well?"

---

## Profile File Creation

After gathering answers, create `data/2-Domaines/agency-profile.md`:

```markdown
# Agency Profile

**Agency name**: [Name]
**Date created**: [Date]
**Last updated**: [Date]

## Identity
**Elevator pitch**: [2-sentence description]
**Primary specialties**: [List]
**Sector expertise**: [List]
**Markets**: [Geographies]
**Languages**: [List]

## Client Portfolio

### Active Clients
| Client | Sector | Scope |
|--------|--------|-------|
| [Client 1] | | |

### Conflict Restrictions
- [List any exclusions]

## Working Preferences
**Output format**: [Long-form / Structured / Summary-first]
**Measurement tools**: [List]
**Connected integrations**: [List from CONNECTORS.md]

## New Business Profile
**Target client**: [Description]
**Agency differentiator**: [What makes you different]

## Strategic Positioning
[Brief narrative of the agency's strategic position — auto-generated from answers]
```

---

## File System Setup

After saving `agency-profile.md`, scaffold the PARA directory structure. Create any missing directories — do not overwrite existing ones.

```
data/
├── 0-Inbox/
├── 1-Projets/
│   ├── clients/
│   ├── briefs/
│   ├── campaigns/
│   ├── pitches/
│   └── frameworks/
├── 2-Domaines/
│   ├── media-contacts/
│   └── voice-guidelines/
├── 3-Ressources/
│   ├── templates/
│   ├── case-studies/
│   └── research/
└── 4-Archives/
    ├── campaigns/
    └── pitches/
```

Create a `README.md` placeholder in `0-Inbox/` and `3-Ressources/templates/` so the structure is immediately usable:

**`data/0-Inbox/README.md`**:
```
# Inbox

Drop new briefs, assets, and client requests here for triage.
Run `/comms:para` to process items and route them to the right folder.
```

**`data/3-Ressources/templates/README.md`**:
```
# Templates

Store brief templates, comms platform templates, and campaign frameworks here.
```

---

## CLAUDE.md Update

After the file system is scaffolded, update the `CLAUDE.md` Zone 2 section. Find the line `[Waiting for onboarding via /comms:start...]` and replace the entire `## Agency Profile` section content with:

```markdown
## Agency Profile

**[Agency name]** — [2-sentence elevator pitch from Q1]

**Specialties**: [from Q2]
**Sectors**: [from Q3]
**Markets**: [from Q4]
**Languages**: [from Q5]
**Output format**: [from Q8]
**Language preference**: [fr / en / bilingual — derived from Q5]

*Last updated: [YYYY-MM-DD]*
```

---

## After Setup

Confirm setup is complete and offer next steps:

```
✅ Agency profile saved → data/2-Domaines/agency-profile.md
✅ PARA workspace scaffolded → data/ (0-Inbox, 1-Projets, 2-Domaines, 3-Ressources, 4-Archives)
✅ Session context updated → CLAUDE.md

You're ready to use all comms-strategy commands:

/comms:brief      → Analyze a client brief
/comms:strategy   → Build a full comms strategy
/comms:audience   → Deep audience research
/comms:campaign   → Design a campaign
/comms:pitch      → Develop a new business pitch
/comms:monitor    → Media and competitive monitoring
/comms:measure    → Define a measurement framework
/comms:crisis     → Crisis planning

Drop new briefs into data/0-Inbox/ and run /comms:para to triage and file them.

What would you like to work on first?
```

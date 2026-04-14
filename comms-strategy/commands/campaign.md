---
name: comms:campaign
description: "Build a complete integrated campaign architecture — concept, PESO channel mix, phased activation plan, timeline, and budget framework."
argument-hint: "[campaign name or client brief]"
allowed-tools: Read, Write, Glob, Search
model: sonnet
---

# /comms:campaign — Campaign Architecture

> If you see unfamiliar placeholders or need to check which tools are connected, see [CONNECTORS.md](../CONNECTORS.md).

Transforms a strategic platform into a fully designed integrated campaign — with a big idea, PESO channel mix, phased activation plan, and measurement framework. Outputs a Campaign Brief ready to hand to creative and media teams.

Uses the `campaign-strategy` skill.

## Usage

```
/comms:campaign
/comms:campaign "Brand X product launch"
/comms:campaign data/1-Projets/clients/Acme/strategic-platform.md
```

---

## Campaign Build Flow

### Step 1: Load the Strategic Foundation

Check for existing strategic files:

```
Read data/1-Projets/clients/[client]/strategic-platform.md
Read data/1-Projets/clients/[client]/audience-portrait.md
Read data/1-Projets/clients/[client]/message-architecture.md
```

If files exist → use them.
If not → ask the user for:
1. Campaign objective (what the campaign must achieve)
2. Target audience (primary and secondary)
3. Key message / campaign insight
4. Budget (approximate — High / Medium / Low if exact unknown)
5. Timeline (campaign dates + key milestones)
6. Mandatory elements (must-include executions or channels)

### Step 2: Develop the Campaign Concept

Apply the `campaign-strategy` skill to:
- Translate the strategic insight into a campaign concept
- Test the concept against the 5-channel test (film / press / social / event / OOH)
- Propose 2–3 concept territories for client to choose from

Format each territory:
```markdown
### Territory A: [Name]

**The idea**: [1 sentence — what the campaign is about]
**The insight it's rooted in**: [Quote from audience portrait]
**How it works across channels**: [Film / Press / Social / Event in 1 line each]
**Why it differentiates**: [Link to competitive white space]
**Risk level**: [High / Medium / Low — and why]
```

Present territories and ask client to choose one before proceeding to full build.

### Step 3: Design the PESO Channel Mix

For the chosen concept, design the full channel mix using `campaign-strategy` skill:
- Assign strategic role to each channel (Ignition / Amplification / Conversion / Retention)
- Define content type and KPI per channel
- Recommend budget allocation by channel

Ask: "Do you have a total budget to work with? I can build a recommended allocation."

### Step 4: Build the Phased Activation Plan

Design the 3-phase campaign timeline:
- Phase 1: Ignition (launch + earned media window)
- Phase 2: Amplification (content series + influencer + events)
- Phase 3: Conversion + Sustain (retargeting + CTA mechanics)

For each phase: key activations, channel lead, KPIs, budget.

### Step 5: Generate Key Activations

For each phase, propose 2–3 concrete activations:
- What it is
- Why it works (link to concept + insight)
- Production requirements
- Budget range
- Risk level

### Step 6: Build the Campaign Brief Document

Save to `data/1-Projets/campaigns/[campaign-name]/campaign-brief.md`

Include:
1. Campaign overview (client, brand, period, budget)
2. Strategic foundation (platform summary)
3. Campaign concept (chosen territory)
4. PESO channel mix
5. Phased activation plan
6. Key activations (activation cards)
7. Timeline (visual month-by-month)
8. Budget framework
9. Measurement framework (from `comms-measurement` skill)
10. Mandatories and constraints
11. Open questions for client

---

## After the Campaign Brief

Offer next actions:

```
Campaign Brief saved. Next steps:

→ /comms:measure    Define the full KPI framework for this campaign
→ /comms:pitch      Build a pitch deck version for presentation
→ [Creative brief]  I can draft the creative brief for your internal creative team
→ [Media brief]     I can draft the media brief for your media agency / buyer
```

---

## Tips

- **Concept first, channel second.** The channel mix must serve the idea — never let available tools drive the strategy.
- **Prioritise earned media hooks.** An integrated campaign without a genuinely newsworthy earned media angle is just an advertising campaign with extra steps.
- **Build in flexibility.** The best campaign briefs include a "flex budget" allocation (5–10%) for real-time opportunities that emerge during the campaign.
- **Phase the KPIs.** Measuring awareness in phase 3 (conversion phase) and conversion in phase 1 (ignition phase) leads to the wrong optimisation decisions.

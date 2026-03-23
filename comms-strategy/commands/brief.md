---
description: "Analyze and decode a client brief — extract the strategic platform, surface gaps, generate clarifying questions, and produce a briefing document ready for the team."
argument-hint: "[paste brief or provide file path]"
allowed-tools: Read, Write, Glob, Search, Skill
model: sonnet
---

# /comms:brief — Client Brief Analysis

> If you see unfamiliar placeholders or need to check which tools are connected, see [CONNECTORS.md](../CONNECTORS.md).

Decodes any client brief — written or verbal — into a structured **Strategic Platform** that becomes the foundation for all campaign work. Surfaces hidden strategic questions, identifies gaps, and generates the priority questions to ask the client before work begins.

Uses the `brief-analyzer` skill.

## Usage

```
/comms:brief
/comms:brief [paste the brief text directly]
/comms:brief [path/to/brief.md]
```

---

## How It Works

```
┌─────────────────────────────────────────────────────────────────────┐
│                      BRIEF ANALYSIS FLOW                           │
├─────────────────────────────────────────────────────────────────────┤
│ INPUT: Client brief (text / document / verbal summary)             │
│    ↓                                                                │
│ EXTRACT: Business challenge + comms challenge + audience            │
│    ↓                                                                │
│ SURFACE: Gaps, tensions, assumptions, opportunities                │
│    ↓                                                                │
│ GENERATE: Strategic Platform + Brief Interrogation                 │
│    ↓                                                                │
│ SAVE: data/1-Projets/clients/[client]/strategic-platform.md        │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Brief Input Options

**Option A: Paste the brief**
Paste the full client brief text directly after the command. Start with: `/comms:brief [paste text here]`

**Option B: Provide a file path**
If the brief is saved as a file: `/comms:brief data/1-Projets/clients/Acme/brief.md`

**Option C: No brief yet**
If no written brief exists, enter interview mode: ask the user to describe:
1. The client and their business
2. What the client wants to achieve
3. Who the audience is
4. What the budget/timeline is
5. What deliverables are expected
6. How success will be measured

Compile verbal answers into a brief, then analyze it.

---

## Analysis Workflow

### Step 1: Identify the Client and Context

Extract:
- Client name + brand/product
- Agency briefing this project (if different from us)
- Campaign type (launch / sustain / event / PR push / crisis / B2B)
- Date brief received + campaign timeline

### Step 2: Apply brief-analyzer Skill

Run the full `brief-analyzer` analysis:
- Extract business challenge
- Define communications challenge
- Identify primary and secondary audiences
- Surface the insight (or flag that it's missing and propose a hypothesis)
- Map the idea territory (if one is indicated)
- Extract KPIs and success metrics
- List all mandatories and constraints

### Step 3: Interrogate the Brief

After extracting, critically interrogate:
- What is missing?
- What is contradicted?
- What is assumed but not proven?
- What strategic opportunities has the client not considered?

Generate a prioritised question list for the next client briefing.

### Step 4: Generate and Save the Strategic Platform

Create `data/1-Projets/clients/[client]/strategic-platform.md` with:
1. The completed Strategic Platform framework
2. The Brief Interrogation (gaps, questions, recommendations)

### Step 5: Offer Next Steps

After delivering the analysis, offer:

```
Strategic Platform saved. What next?

→ /comms:audience    Validate and deepen the target audience definition
→ /comms:monitor     Research the competitive landscape
→ /comms:strategy    Build the full comms strategy
→ [ask clarifying questions]   I can help you draft the Q&A for your next client call
```

---

## Output Format

Produce output in the same language as the brief (FR or EN).

If the brief is in French → respond and produce documents in French.
If the brief is in English → respond and produce documents in English.

Confirm language choice with the user if ambiguous.

---

## Tips

- A brief is a negotiation starting point, not a mandate. The best agency response to a brief challenges it constructively.
- The most valuable output of brief analysis is the questions it generates, not just the answers it provides.
- If a brief has no measurable KPIs, always flag this as a critical gap — it makes evaluation impossible.
- "Increase brand awareness" is never a comms objective — it's a symptom of a real objective. Dig for the underlying commercial need.

---
description: "Deep audience research — build complete audience portraits with demographics, psychographics, media behaviours, cultural codes, and insight."
argument-hint: "[audience description or client name]"
allowed-tools: Read, Write, Glob, Search
model: sonnet
---

# /comms:audience — Audience Intelligence

> If you see unfamiliar placeholders or need to check which tools are connected, see [CONNECTORS.md](../CONNECTORS.md).

Builds complete Audience Portraits for communications planning — going beyond demographics to capture cultural codes, media habits, emotional drivers, and the human tension that makes communications land.

Uses the `audience-intelligence` skill.

## Usage

```
/comms:audience
/comms:audience "25-35 urban French women, premium cosmetics"
/comms:audience data/1-Projets/clients/Acme/strategic-platform.md
```

---

## Audience Research Flow

### Step 1: Define the Research Parameters

Ask if not provided:
1. **Who is the audience?** (Start from the brief definition — then interrogate it)
2. **How many segments?** (Maximum 2 primary + 1 secondary)
3. **What market?** (France / DACH / UK / EU / Global)
4. **What category?** (The product/service the communications are for)
5. **What do we need to know?** (Awareness, consideration, barriers, media habits, etc.)

### Step 2: Research Each Segment

For each segment, run the `audience-intelligence` skill:
- Quantitative layer (demographics, market data)
- Qualitative layer (Reddit/community signal mining, review analysis)
- Media behaviour mapping (PESO channels by engagement)
- Cultural codes and language patterns

### Step 3: Generate Audience Portraits

For each segment:
- Write the full portrait using the framework from `audience-intelligence`
- Name the archetype (memorable, not demographic)
- Write the 150-word narrative portrait
- Extract 3 tensions for creative use

### Step 4: Synthesise Cross-Audience Insights

After building individual portraits:
- Identify shared tensions across segments (opportunities for unified messaging)
- Identify fundamental differences (where messages must adapt)
- Flag any audience paradoxes (contradictions within a single segment)

### Step 5: Save and Offer Next Steps

Save to `data/1-Projets/clients/[client]/audience-portrait.md`

```
Audience Portrait saved. Next:

→ /comms:brief      If you haven't yet built the Strategic Platform
→ /comms:strategy   Build the full comms strategy using these portraits
→ /comms:campaign   Design campaign targeting for these segments
→ [Message testing]  I can assess which messages from your architecture will land best for each segment
```

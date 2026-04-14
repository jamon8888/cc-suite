---
name: critique
description: Get rigorous design feedback with AI slop detection, Nielsen's heuristics scoring (0–4 per heuristic), persona red flags, and a prioritized action plan.
argument-hint: "<Figma URL, screenshot, or design description>"
tools: []
---

# /critique

Critique the design: @$1

**Invoke the `design-critique` skill and the `visual-quality` skill. Follow the 4-phase structure.**

## Phase order (non-negotiable)
1. AI Slop Detection — verdict first
2. Design Critique — 8 dimensions
3. Design Health Score — Nielsen's 10 heuristics, 0–4 each
4. Persona Red Flags — 2 most relevant personas
5. Recommended Actions — prioritized by P0 → P3 severity

If a Figma URL is provided and **~~design tool** is connected, pull the design first.
If no design is shared, ask: "Could you share a screenshot, Figma link, or describe the screen you'd like reviewed?"

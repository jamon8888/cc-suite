---
name: wireframe
description: Generate an annotated, interactive HTML wireframe for a screen or flow. Produces a structured low-fidelity layout with hierarchy annotations, spacing rationale, and copy guidance — not a blank rectangle grid.
argument-hint: "<screen name, user flow, or feature>"
tools: ["computer"]
---

# /wireframe

Generate an interactive wireframe for: @$1

**Invoke the `wireframe` skill and the `visual-quality` skill. Follow both before generating output.**

## Workflow

1. **Confirm context** (if not provided):
   - What screen/flow are we wireframing?
   - What is the ONE primary action the user should take?
   - Who is the user and what's their experience level?
   - What fidelity is needed: Exploration / Review / Handoff-ready?

2. **Generate the wireframe** as an HTML artifact following the wireframe skill's quality standards.

3. **Include annotation panel** with numbered callouts (①②③...) explaining:
   - Layout hierarchy decisions
   - Spacing rationale
   - Interactive behaviors
   - Key copy with real suggested text (not "Lorem ipsum")
   - Responsive behavior notes

4. **Run the wireframe quality checklist** from the wireframe skill before delivering.

5. **After delivering**, offer:
   - `/critique` to evaluate structure against design principles
   - `/handoff` when structure is approved and needs full spec
   - `/prototype` to generate a full visual version

## Quality Bar

Every wireframe output must pass the AI Slop Test from `visual-quality`. No generic card grids, no decorative gradients, no identical column layouts. Structure and hierarchy must be deliberate and annotated.

## If Figma Connected

If **~~design tool** is connected, offer to pull context from an existing Figma file or return the wireframe as a new Figma page.

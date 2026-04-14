---
name: flow
description: Generate a user flow diagram — screen-to-screen journeys, decision trees, happy paths, error branches. Output in Mermaid (renders in Notion/GitHub/Linear), as an HTML artifact, or as a structured outline.
argument-hint: "<user goal or feature to map>"
tools: ["computer"]
---

# /flow

Map the user flow for: @$1

**Invoke the `user-flow` skill before generating.**

## Workflow

1. **Confirm context** (if not provided):
   - What is the user trying to accomplish?
   - Where do they start (entry point)?
   - What does success look like?
   - Which error paths matter most?

2. **Choose output format**:
   - Mermaid (default — renders in Notion, GitHub, Linear, most wikis)
   - SVG/HTML artifact (for presentations and stakeholder review)
   - Structured text outline (for specs and documentation)

3. **Generate the flow** with all required elements: entry points, decision diamonds, happy path, error branches, system actions, exit points.

4. **Run the flow critique** automatically — flag dead ends, missing error paths, flows with >7 happy-path steps, and disconnected screens.

5. **After delivering**, offer:
   - `/wireframe [screen]` for the most complex screen in the flow
   - `/research-synthesis` if user behavior data should validate the flow
   - `/handoff` when the flow is approved and screens need specs

## Quality Bar

Every flow must show at minimum: one decision point with two branches, at least one error path, and a clearly marked success end state. A flow with only a happy path is incomplete.

## If Figma Connected

If **~~design tool** is connected, infer existing flows from screen inventory and export the diagram back to Figma/FigJam.

---
name: handoff
description: Generate a complete developer handoff spec — layout, tokens, component states, interactions, responsive behavior, edge cases, and accessibility notes.
argument-hint: "<Figma URL or design description>"
tools: []
---

# /handoff

Generate handoff specs for: @$1

**Invoke the `design-handoff` skill.**

Produce a complete spec covering:
- Visual specifications (measurements, design tokens, breakpoints)
- All component states (default, hover, active, disabled, loading, error, empty)
- Interaction specifications (click behavior, transitions, gestures)
- Edge cases (empty state, max content, international text, slow connections)
- Accessibility notes (focus order, ARIA labels, keyboard interactions)

Use design token references (`color-primary`, `spacing-md`) — not raw values — wherever possible.

If **~~design tool** is connected: pull exact measurements and token values from Figma.
If **~~project tracker** is connected: link the spec to the implementation ticket and create sub-tasks.

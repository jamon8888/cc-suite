---
name: design-system
description: Audit, document, or extend your design system — tokens, components, patterns, and naming consistency.
argument-hint: "[audit | document | extend] <component or system>"
tools: []
---

# /design-system

@$1

**Invoke the `design-system` skill.**

## Modes
- `/design-system audit` — Full system audit: naming, token coverage, component completeness
- `/design-system document [component]` — Document a specific component's variants, states, props, and accessibility
- `/design-system extend [pattern]` — Design a new component or pattern that fits the existing system

If **~~design tool** is connected: pull the component library from Figma and audit directly.
If **~~knowledge base** is connected: check for existing documentation and publish updates there.

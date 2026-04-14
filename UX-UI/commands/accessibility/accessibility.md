---
name: accessibility
description: Run a WCAG 2.1 AA accessibility audit — color contrast, keyboard navigation, screen reader behavior, touch targets, and focus management. Produces findings by severity with WCAG criterion and concrete fixes.
argument-hint: "<Figma URL, URL, or design description>"
tools: []
---

# /accessibility

Audit for accessibility: @$1

**Invoke the `accessibility-review` skill.**

Audit across all four WCAG 2.1 AA principles:
- **Perceivable**: Alt text, contrast (4.5:1 text / 3:1 UI), semantic structure
- **Operable**: Keyboard access, visible focus, logical tab order, touch targets (44×44px min)
- **Understandable**: Predictable behavior, error identification, labels on inputs
- **Robust**: ARIA roles, name/role/value for all components

## Output includes
- Summary: total issues, critical / major / minor counts
- Findings table per WCAG principle with severity and fix
- Color contrast check table
- Keyboard navigation map
- Screen reader announcements audit
- Priority fixes ordered by user impact

If **~~design tool** is connected: inspect color values, font sizes, and touch targets directly from Figma.
If **~~project tracker** is connected: create tickets for each finding with WCAG criterion and severity.

---
name: extract
description: Scan a codebase for repeated UI patterns, hardcoded values, and inconsistent implementations — then extract them into a coherent design system with tokens, shared components, and documentation.
argument-hint: "<directory, component, or feature to analyze>"
tools: ["computer"]
---

# /extract

Scan and extract design patterns from: @$1

**Invoke the `pattern-extract` skill and the `design-system` skill. Follow the 5-phase structure.**

## Phase order

1. **Discovery Scan** — find repeated components, hardcoded values, inconsistent implementations, and missing states
2. **Extraction Candidates** — produce a candidate card for each pattern (value, risk, priority)
3. **Extraction Plan** — present prioritized plan and confirm with user before touching files
4. **Extract and Improve** — create tokens, components, patterns with proper API, states, and docs
5. **Migration** — replace existing instances, verify, delete dead code

## Quality bar

- Extract only patterns used 3+ times or clearly general in nature — don't over-extract
- Always improve when extracting — cover all states, add ARIA, write docs
- Present a plan before modifying anything
- Deliver a Design System Surface Report at the end

## If Figma Connected

If **~~design tool** is connected: compare extracted tokens against Figma variables, flag mismatches, create Figma variables for new tokens.

## After extracting

- Run `/design-system audit` to verify system completeness
- Run `/critique` on components to check quality against heuristics
- Run `/accessibility` to verify extracted components meet WCAG AA

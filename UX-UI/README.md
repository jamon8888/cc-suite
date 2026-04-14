# Design Plugin

A design productivity plugin for [Cowork](https://claude.com/product/cowork) and Claude Code. Covers the full design workflow — from wireframes and prototypes to critique, design systems, UX writing, accessibility, research synthesis, and developer handoff. Powered by **Impeccable-grade quality standards** that prevent generic AI output.

## Installation

```bash
claude plugins add knowledge-work-plugins/design
```

## Commands

| Command | Description |
|---|---|
| `/wireframe` | Generate annotated HTML wireframes — structure, hierarchy, and UX annotations, not grey rectangle grids |
| `/prototype` | Generate production-grade HTML prototypes with committed visual design and interactive states |
| `/critique` | Rigorous design feedback — AI slop detection, Nielsen's heuristics scoring (0–40), persona red flags, prioritized action plan |
| `/layout` | Diagnose and fix layout monotony, spacing issues, card overuse, and weak visual hierarchy |
| `/design-system` | Audit, document, or extend your design system — tokens, components, patterns |
| `/handoff` | Generate developer handoff specs — measurements, tokens, states, interactions, edge cases |
| `/ux-copy` | Write or review UX copy — error messages, empty states, CTAs, confirmation dialogs, loading states |
| `/accessibility` | WCAG 2.1 AA audit — contrast, keyboard, screen reader, touch targets, with severity levels |
| `/research-synthesis` | Synthesize user research into themes, insights, and prioritized recommendations |

## Skills

Passive skills Claude applies automatically when relevant:

| Skill | Description |
|---|---|
| `visual-quality` | Impeccable quality standards — AI slop detection, OKLCH color system, 4pt spacing scale, typography rules. Applied to all design output. |
| `wireframe` | Wireframe generation framework with anti-AI-slop rules, annotation system, and quality checklist |
| `design-critique` | Rigorous critique with heuristics scoring, persona testing, and severity-ranked findings |
| `design-system` | Design token management, component documentation, pattern governance |
| `ux-copy` | Microcopy patterns — CTAs, errors, empty states, confirmations, loading, tooltips |
| `accessibility-review` | WCAG 2.1 AA audit methodology and common issue patterns |
| `user-research` | Research planning, interview guides, usability test design |
| `design-handoff` | Developer spec methodology — states, tokens, interactions, edge cases |
| `research-synthesis` | Research analysis — affinity mapping, insight extraction, segmentation |

## Example Workflows

### Wireframing a Screen

```
/wireframe dashboard for a project management app — primary action is creating a new task
```

Claude gathers context (user type, fidelity needed), generates an HTML wireframe with numbered annotations, and offers `/critique` or `/prototype` as next steps.

### Getting Rigorous Design Feedback

```
/critique
```

Share a Figma link or screenshot. Get:
1. AI slop verdict (pass/fail with specific patterns named)
2. Heuristics score out of 40
3. Persona red flags
4. P0–P3 prioritized action plan

### Generating a Prototype

```
/prototype checkout flow for a B2B SaaS — warm, professional tone
```

Claude produces a working HTML file with distinctive typography, intentional color, all interactive states, and real copy.

### Fixing a Broken Layout

```
/layout — the dashboard feels cramped and monotonous
```

Claude diagnoses the specific spacing and hierarchy problems, fixes them with a 4pt scale, and explains every decision.

### Developer Handoff

```
/handoff
```

Share a Figma link and get a complete spec: measurements, design tokens, component states, interaction notes, responsive breakpoints, and edge cases.

### Auditing Your Design System

```
/design-system audit
```

Get a report with naming inconsistencies, hardcoded values that should be tokens, component completeness scores, and priority actions.

### Writing UX Copy

```
/ux-copy error messages for payment flow — empathetic tone
```

Get recommended copy with rationale, 2–3 alternatives, and localization notes.

## Standalone + Supercharged

| What You Can Do | Standalone | Supercharged With |
|-----------------|------------|-------------------|
| Wireframes | Describe or screenshot | Figma MCP (pull existing layouts) |
| Prototypes | Describe the screen | Figma MCP (match real design exactly) |
| Design critique | Describe or screenshot | Figma MCP (exact values, tokens, layers) |
| Design system | Describe your system | Figma MCP (audit component library directly) |
| Handoff specs | Describe or screenshot | Figma MCP (exact measurements, tokens) |
| UX copy | Describe the context | Knowledge base (brand voice guidelines) |
| Accessibility | Describe or screenshot | Figma MCP, analytics for real usage data |
| Research synthesis | Paste transcripts | User feedback tools, product analytics |

## MCP Integrations

> See [CONNECTORS.md](CONNECTORS.md) for the full list.

| Category | Examples | What It Enables |
|---|---|---|
| **Design tool** | Figma | Pull designs, inspect tokens, match exact specs |
| **User feedback** | Intercom, Productboard | Cross-reference findings with real user complaints |
| **Project tracker** | Linear, Asana, Jira | Create tickets from critique and accessibility findings |
| **Knowledge base** | Notion | Brand voice, design principles, research repository |
| **Product analytics** | Amplitude, Mixpanel | Validate research with behavioral data |

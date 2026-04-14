---
name: prototype
description: Generate a working, visually polished HTML prototype from a wireframe or description. Applies Impeccable-grade design quality — distinctive typography, intentional color, real visual hierarchy. Not a demo, a real interactive artefact.
argument-hint: "<wireframe, Figma URL, or screen description>"
tools: ["computer"]
---

# /prototype

Generate a production-grade HTML prototype for: @$1

**Invoke the `visual-quality` skill, the `wireframe` skill, and the `platform-context` skill before generating. Follow all quality standards.**

## What a Prototype Is (and Isn't)

A prototype is:
- **Working HTML/CSS** that can be opened in a browser
- **Real visual design** — distinctive typography, intentional color palette, proper hierarchy
- **Interactive** — hover states, click behaviors, state changes
- **Deliverable** — presentable to stakeholders, usable for user testing

A prototype is NOT:
- A grey-box wireframe (use `/wireframe` for that)
- A full production codebase
- An excuse for generic AI aesthetics

## Workflow

1. **Confirm starting point**:
   - Starting from a `/wireframe` output? Reference it.
   - Starting from a Figma URL? Pull with **~~design tool** if connected.
   - Starting from scratch? Run `/wireframe` first for structure approval.

2. **Collect design context** (if not already established):
   - **Platform**: Web · Mobile Web · iOS Native · Android Native · Desktop App
     Default: Web. Ask only if the request signals a specific platform (see `platform-context` detection rule).
     If platform is declared, load `platform-context` before generating anything.
   - Brand personality/tone (3 adjectives)
   - Target audience (who, what context)
   - Existing colors or constraints

3. **Choose a committed aesthetic direction** — not a safe middle ground:
   - Brutally minimal · Refined editorial · Bold geometric · Warm organic · Industrial utility
   - One direction, executed with precision

4. **Generate the prototype** as a single HTML file with:
   - Distinctive font pairing (not Inter/Roboto)
   - OKLCH color system with tinted neutrals
   - 4pt spacing scale with rhythm (not equal everywhere)
   - All interactive states (hover, active, disabled, focus)
   - Empty state AND populated state if data-driven
   - **Platform-appropriate layout and chrome** (see below)

5. **Apply the AI Slop Test** — if the output looks like every other AI-generated interface, redesign it.

6. **After delivering**, offer:
   - `/critique` to score against Nielsen's heuristics
   - `/handoff` to generate the developer spec
   - `/accessibility` to check WCAG compliance

## Platform-Specific Generation Rules

Apply these rules when platform is declared. Do not transpose web conventions onto non-web platforms.

| Platform | Layout | Interactions to implement | Chrome to include |
|----------|--------|--------------------------|-------------------|
| Web | CSS Grid/Flex, breakpoints via container queries | Hover states on all interactive elements, focus rings | Top nav or sidebar |
| Mobile Web | Single-column, thumb zone respected, no hover | Tap (`:active` state), scroll snap if applicable | Browser bar stub |
| iOS Native | Tab bar bottom, navigation stack header | Tap, swipe-back gesture annotation | Status bar, nav bar, tab bar |
| Android Native | Bottom nav or nav rail, FAB bottom-right | Tap, FAB action, snackbar feedback | Status bar, bottom nav |
| Desktop App | Multi-panel (sidebar + content + inspector), menu bar | Hover, right-click annotations, keyboard shortcut labels, resize handles | Window chrome (title bar, min/max/close, menu bar) |

**Critical rule**: on touch platforms (Mobile Web / iOS / Android), hover is invisible to users. Never use hover as the sole mechanism to reveal content, actions, or labels. Every piece of information a user needs must be reachable by tap.

**Critical rule**: on Desktop App, a hamburger menu that hides primary navigation is a web pattern transposed incorrectly. Desktop apps expose navigation in a persistent sidebar, menu bar, or toolbar — not behind a hamburger.

## Quality Requirements

Every prototype must pass:
- [ ] Distinctive aesthetic — would NOT be immediately identified as AI output
- [ ] Primary action identifiable in 2 seconds
- [ ] Squint test passes (hierarchy readable when blurred)
- [ ] All interactive states implemented
- [ ] Real copy — no "Lorem ipsum" in final deliverable
- [ ] WCAG AA contrast minimum
- [ ] **Platform check**: uses platform-native navigation pattern · platform chrome rendered · no transposed web conventions · hover not used as sole reveal mechanism on touch platforms

## If Connectors Available

If **~~design tool** is connected: Pull exact design specs from Figma, match the production design precisely.
If **~~knowledge base** is connected: Pull brand voice guide and design principles for authentic copy.

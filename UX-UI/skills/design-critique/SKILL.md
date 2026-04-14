---
name: design-critique
description: Get rigorous design feedback on usability, visual hierarchy, accessibility, and consistency — with heuristics scoring and AI slop detection. Trigger with "review this design", "critique this mockup", "what do you think of this screen?", or when sharing a Figma link or screenshot. Structured across 4 phases: critique, findings, scoring, action plan.
argument-hint: "<Figma URL, screenshot, or description>"
---

# /design-critique

> If you see unfamiliar placeholders or need to check which tools are connected, see [CONNECTORS.md](../../CONNECTORS.md).

Get structured, rigorous design feedback. This command applies Impeccable-grade critique standards: AI slop detection, Nielsen's heuristics scoring, persona testing, and a prioritized action plan.

## Usage

```
/design-critique $ARGUMENTS
```

Review the design: @$1

If a Figma URL is provided and **~~design tool** is connected, pull the design directly. Otherwise, ask the user to describe or share their design.

---

## Phase 1 — AI Slop Detection (ALWAYS FIRST)

**This is the most important check.** Does this look like every other AI-generated interface from 2024–2025?

Check against the `visual-quality` skill's forbidden patterns. Key fingerprints of AI-generated output:
- Identical card grids (icon + heading + text, 3 columns, repeated)
- Cyan/purple gradient color palette with neon accents on dark
- Gradient text on headings or metrics
- Glassmorphism (frosted blur cards, glowing borders)
- Hero metric layout (big number, small label, gradient accent)
- Everything centered with equal spacing
- Generic fonts (Inter/Roboto/system-ui with no intent)
- Cards inside cards
- Dark mode + glowing elements as default aesthetic

**Verdict**: Pass (distinctive, designed) or Fail (could be any AI output). Name the specific patterns found.

---

## Phase 2 — Platform Audit (WHEN PLATFORM IS DECLARED OR DETECTABLE)

Before evaluating usability, check whether the design respects its target platform's conventions. Load `platform-context` for the declared platform and evaluate:

**Transposed patterns** (web conventions incorrectly applied to another platform):
- Hamburger menu on Desktop App → should be persistent sidebar or menu bar
- Bottom tab bar on Web → platform-inappropriate
- Hover-only content reveal on Mobile → invisible to touch users
- Modal dialogs for non-critical feedback on Desktop → should be snackbar or inline message
- Back button placed wrong on iOS → system back gesture conflicts

**Missing platform chrome**:
- Desktop App without window title bar, menu bar, or toolbar
- iOS screen without status bar or tab bar in the layout math
- Android screen without status bar or bottom navigation

**Missing platform-specific affordances**:
- Desktop App: no right-click context menus on interactive list items / table rows
- Desktop App: no keyboard shortcuts for frequent actions
- Desktop App: no resize handles on panels
- iOS: missing safe area insets (content under Dynamic Island or home indicator)
- Android: FAB missing for primary action

**Verdict**: Platform-coherent / Platform-incoherent (list specific transpositions found).

---

## Phase 3 — Design Critique

Evaluate across these dimensions:

### 1. First Impression (2 seconds)
- What draws the eye first? Is that the right element?
- Is the purpose immediately clear?
- What emotion does the interface evoke — is it intentional?

### 2. Visual Hierarchy
- Squint test: can you identify primary, secondary, and tertiary content with blurred vision?
- Is there a clear CTA identifiable in 2 seconds?
- Do size, weight, color, and space combine to communicate importance?

### 3. Information Architecture & Cognitive Load
- Is the structure intuitive for a first-time user?
- Too many choices visible at once? (>4 visible options at a decision point is a red flag)
- Is complexity revealed progressively, or dumped upfront?

### 4. Usability
- Can the user accomplish their goal without instructions?
- Are interactive elements obviously interactive?
- Unnecessary steps or friction?

### 5. Consistency
- Design system adherence — spacing, colors, typography consistent?
- Same terms for same things throughout?

### 6. Accessibility Floor
- Color contrast (4.5:1 text, 3:1 UI)
- Touch targets (44×44px minimum on touch platforms)
- All states visible (focus, hover, disabled)?

### 7. States & Edge Cases
- Empty state: guides users, not a dead end?
- Error state: helpful, non-blaming?

### 8. Copy & Voice
- Labels unambiguous? Error messages helpful?

---

## Phase 4 — Design Health Score

Score each of Nielsen's 10 Heuristics from 0–4:

| Score | Meaning |
|-------|---------|
| 4 | Genuinely excellent |
| 3 | Good — minor issues |
| 2 | Adequate — notable gaps |
| 1 | Problematic — user friction |
| 0 | Critical failure |

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | ? | |
| 2 | Match System / Real World | ? | |
| 3 | User Control and Freedom | ? | |
| 4 | Consistency and Standards | ? | |
| 5 | Error Prevention | ? | |
| 6 | Recognition Rather Than Recall | ? | |
| 7 | Flexibility and Efficiency | ? | |
| 8 | Aesthetic and Minimalist Design | ? | |
| 9 | Error Recovery | ? | |
| 10 | Help and Documentation | ? | |
| **Total** | | **??/40** | |

Score bands: 36–40 = Excellent · 28–35 = Good · 20–27 = Needs Work · <20 = Significant Issues

---

## Phase 5 — Persona Red Flags

**Select personas based on the declared or detected platform.** Always include at least 2. For multi-platform products, include one per platform.

---

### Base personas (platform-agnostic)

**Power User (Alex)**: Experienced, keyboard-driven, impatient with unnecessary steps. Red flags: no shortcuts, excessive modal interruptions, forced linear flow, repeated confirmation dialogs for reversible actions.

**First-Timer (Jordan)**: New to product, no prior context. Red flags: icon-only navigation, jargon in errors, no visible onboarding, empty states that don't teach, no progressive disclosure.

---

### Platform-specific personas

**Mobile User (Sam)** — use when platform is Mobile Web, iOS Native, or Android Native:
Sam uses their phone one-handed, often in motion. Red flags: sub-44px touch targets, hover-only content, excessive form fields on a single screen, CTA hidden below the keyboard when a field is focused, no visual feedback on tap, gestures undiscoverable (no affordance).

**iOS User (Elena)** — use when platform is iOS Native:
Elena navigates by swipe-back instinct, dismisses sheets by pulling down, expects the tab bar to persist across the app. Red flags: custom back button that conflicts with system swipe-back, sheet without a visible dismiss handle, content overlapping the Dynamic Island or home indicator, fixed font sizes that ignore Dynamic Type, non-SF icons for standard actions (share, delete, settings).

**Android User (Marcus)** — use when platform is Android Native:
Marcus uses gesture navigation (no visible back button), expects FAB for primary actions, dismisses non-critical feedback with snackbars, not alert dialogs. Red flags: iOS navigation patterns transposed to Android (swipe-back arrow in nav bar), missing FAB for primary action, alert dialog for non-destructive feedback, hardcoded brand colors that conflict with dynamic color theming.

**Desktop App User (Robin)** — use when platform is Desktop App:
Robin works in the app for multi-hour sessions, is keyboard-driven, right-clicks instinctively on any interactive item expecting a context menu, manages multiple panels simultaneously, and regularly drags files from the OS file manager into the app.

Red flags for Robin:
- **No context menu** on interactive list items, table rows, canvas elements, or tree nodes — Robin right-clicks everything
- **No keyboard shortcuts** for actions Robin uses more than 3 times per session (save, undo, find, new item, delete) — reaching for the mouse every time is friction
- **Panels not resizable** — Robin adjusts panel widths constantly based on the task
- **Modal dialogs for non-critical decisions** — a confirmation dialog for a reversible action is an interruption, not a safety net
- **Hamburger menu** — primary navigation hidden behind a toggle; on a desktop app, Robin expects it persistent in a sidebar or accessible via the menu bar
- **No "no file open" empty state** — desktop apps that go straight to a blank content area without guiding the user to open or create something leave Robin confused
- **Hover tooltip is the only label** — Robin may use a screen with keyboard only; if the label only appears on hover, keyboard users never see it
- **No drag-from-OS** — Robin expects to drag a PDF from Finder/Explorer and drop it into the app; if the drop target isn't visible and documented, the feature is invisible

---

## Output Format

```markdown
## Design Critique: [Design Name]

### AI Slop Verdict
[Pass/Fail — specific patterns named]

### Platform Audit
[Platform-coherent / Platform-incoherent — specific transpositions named, or "N/A — Web default"]

### Overall Impression
[2–3 sentence gut reaction]

### Design Health Score
[Table] — Total: ??/40

### What's Working
- [Specific positive + why]

### Priority Issues
**[P0] [Issue]** — What / Why it matters / Fix

### Persona Red Flags
**[Persona name]**: [Specific friction point + element name]

### Recommended Actions
1. [Priority action]
```

**Priority Severity**: P0 = blocks tasks · P1 = major friction · P2 = moderate gap · P3 = polish

---

## If Connectors Available

If **~~design tool** is connected: Pull design from Figma, inspect tokens, compare vs design system.
If **~~user feedback** is connected: Cross-reference findings with real user complaints.
If **~~project tracker** is connected: Create tickets for P0/P1 issues with severity labels.

## Tips

1. Share context — "This is checkout step 2 for a B2B SaaS" unlocks better feedback
2. Specify the stage — Exploration gets different critique than pre-launch polish
3. Declare the platform — Platform-specific persona red flags only activate when the platform is known
4. Re-run `/critique` after fixing P0/P1 to see score improve

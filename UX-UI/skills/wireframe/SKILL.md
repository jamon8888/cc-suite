---
name: wireframe
description: Generate high-quality annotated wireframes as interactive HTML artifacts. Trigger with "wireframe", "sketch this screen", "mock up", "layout this page", "show me what this could look like", or any request to visualize a design concept before full production. Produces structured low-fidelity wireframes with layout annotations, spacing rationale, and UX copy guidance — never generic AI output.
argument-hint: "<screen name, user flow, or feature to wireframe>"
---

# Wireframe

> If you see unfamiliar placeholders or need to check which tools are connected, see [CONNECTORS.md](../../CONNECTORS.md).

Generate annotated, interactive wireframes as HTML artifacts that communicate structure, hierarchy, and user flow — without the noise of full visual design.

## Usage

```
/wireframe $ARGUMENTS
```

Wireframe for: @$1

---

## Context Gathering (REQUIRED Before Generating)

Never generate a generic wireframe. Always confirm:

| Context | Why it matters |
|---------|---------------|
| **Screen / flow name** | What are we designing? (Login, dashboard, checkout step 2...) |
| **Primary user action** | The ONE thing a user should do on this screen |
| **User type** | Who's using this? (Expert, first-timer, mobile-only...) |
| **Stage** | Exploration (rough), Review (annotated), Handoff-ready (detailed) |
| **Platform** | Web · Mobile Web · iOS Native · Android Native · Desktop App — ask only if ambiguous or signalled (see below) |

### Platform detection rule
**Default: Web.** Ask for platform only when the request contains signals: "app", "native", "iOS", "Android", "desktop", "Electron", "Tauri", "tab bar", "swipe", "gesture", "window", "context menu", or any mention of a specific OS.

If declared, load `platform-context` and apply the matching platform profile for all structure, component, and annotation decisions.

If a Figma link is provided and **~~design tool** is connected, pull context from the existing design. Otherwise, ask for the minimum above before proceeding.

---

## Wireframe Quality Standards

These are non-negotiable. Every wireframe must pass:

### Anti-AI-Slop Rules
The most common wireframe failures (all forbidden):
- **Identical card grids** — icon + heading + text repeated endlessly
- **Centered everything** — left-aligned layouts feel designed; centered feels generic
- **Same spacing everywhere** — rhythm requires tight groupings and generous separations
- **Placeholder hero numbers** — no decorative "12,450" metrics with no data meaning
- **Generic nav bars** — navbar + hero + 3-column card grid is the AI slop default
- **Cards inside cards** — never nest containers
- **Gradient backgrounds** — wireframes use structure, not decoration

### Wireframe Fidelity Rules
- Use **grayscale + structure only** — no color fills (except semantic: red=error, green=success)
- **Label every region** — navigation, primary content, sidebar, footer etc.
- **Annotate decisions** — every non-obvious layout choice gets a numbered annotation
- **Show states** — empty state AND populated state if the screen has data
- **Call out copy** — placeholder text that matters gets suggested real copy, not "Lorem ipsum"
- **Mark interactions** — which elements are clickable, what happens

---

## Wireframe Structure (What to Include)

### Page Anatomy Labels
Every wireframe must clearly identify:
- Global navigation (if present)
- Primary action zone
- Content area / main body
- Secondary actions
- Footer / global controls

### Annotation System
Use numbered callouts (①②③...) for:
1. Layout decisions ("Left-aligned because users scan F-pattern")
2. Hierarchy choices ("3:1 size ratio between heading and body")
3. Spacing rationale ("48px gap to separate distinct sections")
4. Interactive notes ("Clicking X opens inline form, not modal")
5. Copy guidance ("CTA should be action-verb: 'Start project' not 'Submit'")
6. Adaptive notes ("This column collapses to full-width below 768px" — or platform-specific: "This panel collapses to icon-only rail on narrow window")
7. **Gesture / keyboard interactions** — platform-aware interaction callouts (see below)

### Annotation ⑦ — Gesture & Keyboard Interactions
Reserved for the interaction layer. Apply whenever platform ≠ Web default, or whenever an interaction is non-obvious on Web.

| Platform | ⑦ annotation covers |
|----------|---------------------|
| Mobile Web / iOS / Android | Tap, long press, swipe (+ direction), pinch, pull-to-refresh, drag, swipe-to-dismiss |
| Desktop App | Keyboard shortcut (with OS variant), right-click context menu, hover reveal, double-click, drag handle, drag-from-OS |

Format:
```
⑦ [Element] — [Gesture or shortcut]: [What happens]

Examples:
"⑦ Row item — Right-click: context menu → Rename / Duplicate / Delete (Delete disabled if item is locked)"
"⑦ List — Swipe left: reveals Delete action (red, destructive — requires confirmation)"
"⑦ Panel separator — Drag: resizes both panels; minimum 200px per panel"
"⑦ Document title — Double-click: enters inline rename mode"
"⑦ File list — ⌘A / Ctrl+A: selects all items"
```

### States to Include
For data-driven screens, show both:
- **Empty state** — onboarding prompt, not dead end
- **Populated state** — realistic data density

---

## Output Format

Generate an HTML artifact with:

```html
<!-- Structure -->
- Clean semantic HTML using CSS Grid/Flexbox
- Wireframe palette: white backgrounds, #e5e7eb borders, #6b7280 labels
- Helvetica/system font — wireframes don't need custom typography
- Numbered annotation panel alongside the wireframe
- Platform chrome included when platform ≠ Web:
    · Desktop App → window title bar, menu bar (macOS top / Windows inside window), toolbar
    · iOS Native → status bar (top), tab bar (bottom), navigation bar with back chevron
    · Android Native → status bar (top), bottom navigation bar or nav rail, FAB if applicable
    · Mobile Web → browser address bar stub (top)

<!-- Quality checks embedded -->
- Visual hierarchy readable at a glance (squint test)
- Clear primary action — identifiable in 2 seconds
- Consistent spacing from a 4pt scale (4, 8, 12, 16, 24, 32, 48, 64px)
- No decorative elements that don't serve structure
```

### Annotation Panel Format
```
① Region label — Layout rationale
② Element — UX decision + why
③ Interactive element — What happens + why this pattern
④ Copy note — Suggested real copy for key moments
⑤ Responsive / adaptive note — How this adapts
⑥ Platform structure note — Platform-specific layout decision
⑦ Gesture / keyboard — Interaction model + outcome
```

---

## Wireframe Quality Checklist (Run Before Delivering)

- [ ] Primary action identifiable in under 2 seconds
- [ ] Visual hierarchy clear with "squint test"
- [ ] Spacing follows a consistent scale — not equal everywhere
- [ ] All regions labeled
- [ ] At least 4 meaningful annotations
- [ ] Empty state shown if screen contains data
- [ ] No decorative gradients, shadows, or colors beyond grayscale
- [ ] At least one copy callout with real suggested text
- [ ] Interactions clearly marked
- [ ] **Platform check** (when platform ≠ Web): platform chrome present (window frame / tab bar / status bar) · at least 2 ⑦ annotations · no web-only patterns (no hover-only content on touch platforms, no hamburger menu on desktop apps, no bottom tab bar on Web)

---

## After the Wireframe

Follow up with:
1. **Ask if the structure works** before proceeding to visual design
2. Suggest `/critique` to evaluate the wireframe against design principles
3. Suggest `/handoff` when the structure is approved and ready for full spec
4. If the user approves, suggest `/prototype` to generate a working HTML version with real visual design applied

---

## If Connectors Available

If **~~design tool** (Figma) is connected:
- Pull existing designs to use as layout reference
- Export wireframe annotations back to Figma as a new page

If **~~project tracker** is connected:
- Link wireframe to the relevant ticket
- Create sub-tasks: "Wireframe approved", "Visual design", "Handoff"

---

## Tips

1. **Start with the primary action** — Design the CTA first, build everything else around it
2. **Show two options** — For complex layouts, generate two structural alternatives so the team can choose a direction
3. **Name your regions** — "Primary content area" is more useful than a blank rectangle
4. **Realistic copy matters** — "Sign in to continue" reveals design problems that "Lorem ipsum" hides
5. **Platform chrome is not decoration** — On mobile, status bar and tab bar consume real screen height. On desktop, the menu bar and title bar are part of the product surface. Include them in the wireframe math.

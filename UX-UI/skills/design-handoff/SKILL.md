---
name: design-handoff
description: Generate developer handoff specs from a design. Use when a design is ready for engineering and needs a spec sheet covering layout, design tokens, component props, interaction states, responsive breakpoints, edge cases, and animation details.
argument-hint: "<Figma URL or design description>"
---

# /design-handoff

> If you see unfamiliar placeholders or need to check which tools are connected, see [CONNECTORS.md](../../CONNECTORS.md).

Generate comprehensive developer handoff documentation from a design.

## Usage

```
/design-handoff $ARGUMENTS
```

Generate handoff specs for: @$1

**Before generating, identify the target platform.** If not declared, default to Web. If a non-web platform is declared, load `platform-context` — the output format changes structurally depending on platform.

If a Figma URL is provided, pull the design from Figma. Otherwise, work from the provided description or screenshot.

## What to Include

### Visual Specifications
- Exact measurements (padding, margins, widths)
- Design token references (colors, typography, spacing)
- Layout and breakpoint behavior
- Component variants and states

### Interaction Specifications
- Click/tap behavior
- Hover states (Web / Desktop App only)
- Transitions and animations (duration, easing)
- Gesture support (touch platforms) or keyboard shortcut table (Desktop App)

### Content Specifications
- Character limits
- Truncation behavior
- Empty states
- Loading states
- Error states

### Edge Cases
- Minimum/maximum content
- International text (longer strings)
- Slow connections
- Missing data

### Accessibility
- Focus order
- ARIA labels and roles
- Keyboard interactions
- Screen reader announcements

## Principles

1. **Don't assume** — If it's not specified, the developer will guess. Specify everything.
2. **Use tokens, not values** — Reference `spacing-md` not `16px`.
3. **Show all states** — Default, hover, active, disabled, loading, error, empty.
4. **Describe the why** — "This collapses on mobile because users primarily use one-handed" helps developers make good judgment calls.
5. **Speak the target platform's language** — A handoff for iOS uses "navigation bar" and "safe area insets", not "sticky header" and "CSS position:fixed". A handoff for Desktop App specifies "context menu items" and "keyboard shortcut", not "dropdown" and "tooltip on hover."

---

## Output Format

The core structure is the same across platforms. The **Layout / Breakpoints** section and the **Interaction** section change based on the declared platform.

```markdown
## Handoff Spec: [Feature/Screen Name]
**Platform**: [Web · Mobile Web · iOS Native · Android Native · Desktop App]

### Overview
[What this screen/feature does, user context, platform target]

### Layout
[See platform-specific layout section below]

### Design Tokens Used
| Token | Value | Usage |
|-------|-------|-------|
| `color-primary` | #[hex] | CTA buttons, links |
| `spacing-md` | [X]px | Between sections |
| `font-heading-lg` | [size/weight/family] | Page title |

### Components
| Component | Variant | Props | Notes |
|-----------|---------|-------|-------|
| [Component] | [Variant] | [Props] | [Special behavior] |

### States and Interactions
| Element | State | Behavior |
|---------|-------|----------|
| [CTA Button] | Hover | [Background darken 10%] |
| [CTA Button] | Loading | [Spinner, disabled] |
| [Form] | Error | [Red border, error message below] |

[See platform-specific interaction section below]

### Edge Cases
- **Empty state**: [What to show when no data]
- **Long text**: [Truncation rules]
- **Loading**: [Skeleton or spinner]
- **Error**: [Error state appearance]

### Animation / Motion
| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| [Element] | [Trigger] | [Description] | [ms] | [easing] |

### Accessibility Notes
- [Focus order]
- [ARIA labels needed]
- [Keyboard interactions]
```

---

## Platform-Specific Sections

### Web

**Layout section**:
```markdown
### Layout — Web
| Breakpoint | Changes |
|------------|---------|
| Desktop (>1024px) | [Default layout] |
| Tablet (768–1024px) | [What changes] |
| Mobile (<768px) | [What changes] |

Container max-width: [Xpx]
Grid: [X columns at desktop, Y at mobile]
Responsive method: [CSS container queries preferred / media queries]
```

**Interaction section**: Include hover states for all interactive elements. Hover is a first-class state on Web.

---

### Mobile Web

**Layout section**:
```markdown
### Layout — Mobile Web
Viewport: single-column, full-width
Viewport meta: width=device-width, initial-scale=1
Orientation: [Portrait only · Landscape supported · Both]
Safe area: padding-bottom for home indicator if full-bleed layout

Thumb zone compliance:
- Primary CTA: [position — e.g. bottom-center, within thumb reach]
- Secondary actions: [position]
- Danger actions: [position — deliberately out of thumb reach]
```

**Interaction section**: No hover states. Specify `:active` feedback for every tap target. Minimum tap target 44×44px with 8px clearance.

---

### iOS Native

**Layout section**:
```markdown
### Layout — iOS Native
Navigation pattern: [Tab Bar / Navigation Stack / Modal Sheet]
Safe area insets: top [X]pt (status bar + nav bar) · bottom [X]pt (home indicator)
Dynamic Island: content must not overlap above [Y]pt from top
Screen sizes to verify: iPhone SE (375×667pt) · iPhone 16 (390×844pt) · iPhone 16 Pro Max (430×932pt)
Tab bar items: [N items — list labels and SF Symbol names]
```

**Component naming** (use UIKit / SwiftUI terminology, not CSS):
- "Navigation bar" not "sticky header"
- "Tab bar" not "bottom nav"
- "Sheet" not "modal drawer"
- "Action sheet" not "dropdown menu"
- "Alert" not "dialog"
- "SF Symbol: [name]" for every icon

**Interaction section**:
```markdown
### Gestures
| Gesture | Element | Result |
|---------|---------|--------|
| Tap | [Element] | [Action] |
| Long press | [Element] | [Contextual menu / selection mode] |
| Swipe left | [Row] | [Reveals: Delete (red) / Archive (gray)] |
| Swipe down | [Sheet] | [Dismisses sheet] |
| Pull down | [List] | [Refresh] |

### Haptics
| Trigger | Haptic type |
|---------|-------------|
| Success action | `.success` (UINotificationFeedbackGenerator) |
| Destructive action | `.warning` |
| Error | `.error` |

Dynamic Type: all text elements must use Dynamic Type styles (`.body`, `.headline`, `.caption1`, etc.) — no fixed font sizes.
```

---

### Android Native

**Layout section**:
```markdown
### Layout — Android Native
Navigation pattern: [Bottom Navigation Bar / Navigation Rail / Navigation Drawer]
FAB: [Primary action — label, position: bottom-right]
Window size class: [Compact · Medium · Expanded — specify which are supported]
Gesture navigation bar: content must not overlap bottom [X]dp
Status bar: content must not overlap top [X]dp
```

**Component naming** (use Material Design 3 terminology):
- "Bottom navigation bar" or "navigation rail" not "tab bar"
- "FAB" not "primary button"
- "Snackbar" not "toast notification"
- "Bottom sheet" not "modal drawer"
- "Chip" not "tag"
- "dp" (density-independent pixels) not "px"

**Interaction section**:
```markdown
### Gestures
| Gesture | Element | Result |
|---------|---------|--------|
| Tap | [Element] | [Action] |
| Long press | [Element] | [Multi-select mode activation] |
| Swipe left/right | [Item] | [Dismiss / Reveal action] |
| Swipe from left edge | — | Back navigation (system) |

### Dynamic Color
Design uses M3 color roles (primary, secondary, tertiary, surface, error).
App must support Dynamic Color on Android 12+ — do not hardcode hex values for M3 role slots.
```

---

### Desktop App

**Layout section**:
```markdown
### Layout — Desktop App
Target OS: [macOS · Windows · Both]
Window chrome: [Decorations: native title bar · custom title bar · frameless]
Menu bar location: [macOS: system menu bar · Windows: inside window below title bar]
Minimum window size: [W × H px]
Default window size: [W × H px]

Panel structure:
| Panel | Default width | Min width | Collapsible |
|-------|---------------|-----------|-------------|
| [Left sidebar] | [240px] | [48px (icon rail)] | Yes |
| [Main content] | fluid | [400px] | No |
| [Right inspector] | [280px] | [280px] | Yes |

Panel separator: draggable · cursor: col-resize · snap to min width on double-click
```

**Interaction section**:
```markdown
### Keyboard Shortcuts
| Action | macOS | Windows/Linux | Notes |
|--------|-------|--------------|-------|
| [Save] | ⌘S | Ctrl+S | Disabled when no unsaved changes |
| [Undo] | ⌘Z | Ctrl+Z | Max [N] levels |
| [Find] | ⌘F | Ctrl+F | Opens inline search bar |
| [New item] | ⌘N | Ctrl+N | |
| [Delete] | ⌫ | Del | Requires confirmation if irreversible |

### Context Menus (Right-click)
Spec every interactive element that supports right-click. Format: label · shortcut · enabled condition.

| Surface | Context menu items |
|---------|-------------------|
| [List row] | Open · Rename (⏎ / F2) · Duplicate · --- · Delete (⌫ / Del, disabled if locked) |
| [Table row] | [items] |
| [Canvas item] | [items] |

Separator rules: group related actions, place destructive actions last, separate with `---`.

### Drag & Drop
| Drag source | Drop target | Result |
|-------------|-------------|--------|
| [List item] | [List — reorder] | Reorder, show drop indicator between items |
| [OS file manager] | [App drop zone] | Import file, show accepted types on hover |

### Hover States
Hover is a first-class interaction on Desktop App. Spec hover for every interactive element:
- List rows: background highlight + reveal action icons on right
- Toolbar buttons: tooltip with label + shortcut (appears after 500ms delay)
- Panel separators: cursor change to col-resize on hover

### Window States
| State | UI behavior |
|-------|------------|
| No document open | Show empty state with "Open" and "New" CTAs — not a blank content area |
| Minimized | — |
| Fullscreen | Menu bar auto-hides on macOS; verify toolbar remains accessible |
```

---

## If Connectors Available

If **~~design tool** is connected:
- Pull exact measurements, tokens, and component specs from Figma
- Export assets and generate a complete spec sheet

If **~~project tracker** is connected:
- Link the handoff to the implementation ticket
- Create sub-tasks for each section of the spec

## Tips

1. **Share the Figma link** — I can pull exact measurements, tokens, and component info.
2. **Declare the platform first** — the handoff format changes structurally between Web, iOS, Android, and Desktop App.
3. **Mention edge cases** — "What happens with 100 items?" helps me spec boundary conditions.
4. **Specify the tech stack** — "We use SwiftUI", "We use Jetpack Compose", "We use Tauri + React" helps me give accurate implementation notes.

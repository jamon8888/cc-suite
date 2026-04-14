---
name: platform-context
description: Passive skill encoding platform-specific design vocabulary, component patterns, interaction models, and constraints. Auto-applied when a platform is declared or detected. Never user-invoked. Governs what Claude knows about each target platform and how it translates that knowledge into wireframes, prototypes, critiques, and handoff specs.
---

# Platform Context

This skill is **never invoked directly**. It activates when a platform is declared or detected in any design command — and silently informs every output produced by `wireframe`, `prototype`, `design-critique`, and `design-handoff`.

---

## Platform Detection

### When to ask explicitly
Ask "What platform are you designing for?" when:
- The request mentions "app", "native", "iOS", "Android", "desktop", "Electron", "Tauri", "window", "gesture"
- The user mentions device-specific interactions (swipe, long press, pinch, keyboard shortcut)
- There's a conflict between the described UI and web assumptions (e.g. "tab bar at the bottom", "system menu")

### Default assumption
If no platform is mentioned and no signal is present: **assume Web**. Do not ask.

### Platform options
```
Web · Mobile Web · iOS Native · Android Native · Desktop App
```

---

## Platform Profiles

### Web
**Mental model**: Document with navigation. URL is canonical identity.

**Native components**: `<a>`, `<button>`, `<select>`, `<input>`, `<form>`, scrollbar, tooltip  
**Navigation patterns**: Top navbar, sidebar, breadcrumbs, pagination, tabs  
**Primary interaction**: Mouse + keyboard (hover is a first-class state)  
**Responsive contract**: Single codebase adapts across viewport widths via CSS  
**Layout tools**: CSS Grid, Flexbox, container queries, `clamp()` for fluid scaling  
**Constraints**: No access to OS chrome, no system menus, scrollbar behavior varies by browser

**Design vocabulary to use**: viewport, breakpoint, sticky header, modal, drawer, toast, tooltip, accordion, skeleton loader

---

### Mobile Web
**Mental model**: Web page rendered in a mobile browser. Not an app.

**Key differences from Web**:
- No hover — any content revealed only on hover is invisible
- Viewport is the full screen, no chrome below address bar on scroll
- Tap, not click — interaction targets need physical size, not just visual size
- Keyboard covers ~40% of screen on focus — layout must adapt (avoid fixed-bottom CTAs near inputs)
- Orientation changes (portrait ↔ landscape) can break fixed layouts

**Touch target minimum**: 44×44px with 8px clearance between targets  
**Thumb zone**: Bottom 60% of screen is easily reachable; top-right is a stretch  
**Scroll pattern**: Single-axis preferred — avoid horizontal scroll unless intentional (carousel)  
**Viewport meta required**: `<meta name="viewport" content="width=device-width, initial-scale=1">`

**Design vocabulary to use**: thumb zone, tap target, safe area, pull-to-refresh, bottom sheet, sticky CTA, scroll snap

---

### iOS Native
**Platform authority**: [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

**Navigation system**:
- Tab Bar (bottom, 2–5 items max) — primary section switching
- Navigation Stack (push/pop with back chevron) — hierarchical drill-down
- Modal Sheet (swipe down to dismiss) — contextual or interruptive content
- Action Sheet — destructive or multi-option actions triggered from a button

**Interaction vocabulary**:
| Gesture | Convention |
|---------|-----------|
| Tap | Primary action |
| Long press | Contextual menu (context menu) |
| Swipe left on row | Destructive action reveal (delete) |
| Swipe right | Navigation back (system-level) |
| Pinch | Zoom |
| Pull down | Refresh (pull-to-refresh) |
| Swipe up from bottom edge | Home (system — avoid overlap) |

**Typography**: Dynamic Type — sizes must scale with user's system font size preference  
**Icons**: SF Symbols vocabulary (use semantic names, not custom icons for standard actions)  
**Safe areas**: Respect notch (top), Dynamic Island, home indicator bar (bottom)  
**Status bar**: Do not place interactive content behind it  
**Haptics**: Success, warning, error — specify in interaction annotations

**Design vocabulary to use**: tab bar, navigation bar, large title, sheet, action sheet, alert, SF Symbol, safe area inset, Dynamic Type, haptic feedback

---

### Android Native
**Platform authority**: [Material Design 3 (Material You)](https://m3.material.io/)

**Navigation system**:
- Bottom Navigation Bar (2–5 destinations) — primary sections
- Navigation Drawer (left swipe or hamburger) — secondary destinations
- Navigation Rail — tablet/landscape variant of bottom nav
- Back: system back gesture (swipe from left edge) or back button

**Core components**:
- FAB (Floating Action Button) — primary action on a screen, bottom-right
- Snackbar — non-blocking feedback, bottom of screen, auto-dismisses
- Bottom Sheet — persistent or modal
- Chip — compact filter/input/selection component

**Interaction vocabulary**:
| Gesture | Convention |
|---------|-----------|
| Tap | Primary action |
| Long press | Multi-select mode activation |
| Swipe left/right on item | Dismiss or reveal action |
| Swipe from left edge | Back navigation |
| Pull down | Refresh (SwipeRefreshLayout) |
| Drag FAB | Reposition (if movable) |

**Color system**: Dynamic Color — UI derives palette from user's wallpaper on Android 12+. Design with neutral base + accent, not hardcoded brand colors only.  
**Typography**: Material type scale (Display, Headline, Title, Body, Label)  
**Touch target**: 48×48dp minimum (slightly larger than iOS's 44pt)

**Design vocabulary to use**: FAB, snackbar, chip, bottom sheet, navigation rail, dynamic color, M3 color roles (primary, secondary, tertiary, surface), dp (density-independent pixels)

---

### Desktop App
**Mental model**: Persistent, stateful environment. The user works *in* the app, not *through* it. Sessions are long; the interface is a tool, not a journey.

#### Window Chrome
- Title bar with app name (or document name for document-centric apps)
- Minimize / Maximize / Close buttons (left on macOS, right on Windows)
- Menu bar: **macOS** — system-level, always at top of screen; **Windows** — inside the window, below title bar
- Resizable window: app must respond correctly to any width from minimum to full-screen
- Window states: Normal · Maximized · Minimized · Fullscreen · Floating

#### Navigation patterns
Desktop apps do not use "pages" or URLs as primary navigation. They use:
- **Multi-panel layout** (dominant pattern): sidebar (nav/tree) + list/content + detail panel
- **Tabbed documents**: multiple open files/items in a tab bar (VS Code, browsers, Figma)
- **Inspector panels**: collapsible right panel for properties/metadata
- **Toolbar**: icon buttons for frequent actions, above the content area
- **Contextual palettes**: floating or docked tool panels

#### Interaction model (keyboard-first)
Hover and keyboard shortcuts are **first-class interactions**, not accessibility extras.

| Interaction | Desktop convention |
|------------|-------------------|
| Right-click | Context menu — always available on interactive items |
| Hover | Reveals tooltip, secondary actions, drag handles |
| Double-click | Open / rename / enter edit mode |
| Drag | Reorder, resize panel, move item |
| Drag from OS | Drop files from Finder/Explorer into app |
| Keyboard shortcut | Primary method for power users |
| Focus ring | Tab navigation between controls |

#### Keyboard shortcut conventions
| Action | macOS | Windows/Linux |
|--------|-------|--------------|
| Save | ⌘S | Ctrl+S |
| Undo | ⌘Z | Ctrl+Z |
| Redo | ⌘⇧Z | Ctrl+Y |
| Find | ⌘F | Ctrl+F |
| New | ⌘N | Ctrl+N |
| Close | ⌘W | Ctrl+W |
| Preferences | ⌘, | — (via menu) |

Specify which OS when keyboard shortcuts appear in wireframes or handoff specs.

#### Resizable panels
Panels separated by drag handles — a critical desktop pattern entirely absent from web/mobile design:
- Annotate separator affordances explicitly
- Minimum panel width should be specified (content doesn't reflow below this)
- Collapsed state: panel can collapse to icon-only rail or zero width

#### Context menus
Right-click menus must be specced for every interactive list item, table row, canvas element, and tree node. They are not optional — power users rely on them over toolbar buttons.
Spec format: Item label · Shortcut (if any) · Enabled/disabled condition

#### Empty vs populated states
Desktop apps often have a "no file open" state that looks completely different from the working state. Both must be designed and annotated separately.

**Design vocabulary to use**: window chrome, title bar, menu bar, toolbar, sidebar, inspector, panel, splitter/drag handle, context menu, keyboard shortcut, drag-and-drop, multi-panel, document-centric, workspace, palette, docked panel

---

## Platform-Aware Output Rules

When a platform is set, every subsequent output in the session must:

| Output | Web (default) | Mobile Web | iOS Native | Android Native | Desktop App |
|--------|--------------|------------|------------|----------------|-------------|
| Wireframe layout | Grid/flex, breakpoints | Thumb zone, no hover | Tab bar bottom, nav stack | Bottom nav, FAB position | Multi-panel, menu bar |
| Annotation ⑦ type | Hover + click | Tap + swipe | Gesture + haptic | Gesture + material | Keyboard shortcut + right-click |
| Touch target check | — | 44×44px + clearance | 44pt + safe area | 48dp + gesture bar | — (mouse) |
| Handoff breakpoints | CSS breakpoints table | viewport + orientation | Safe area insets | Window size classes | Min/max window width + panel min |
| Critique persona | Alex / Jordan / Sam | Sam (primary) | iOS User (Elena) | Android User (Marcus) | Desktop App User (Robin) |

---

## Persona Library (Platform-Specific)

These extend the base personas in `design-critique`. Auto-select based on declared platform.

**iOS User (Elena)**: Daily iPhone user, uses gesture navigation, expects swipe-back. Red flags: back button placed wrong, bottom sheet missing dismiss handle, ignoring Dynamic Island overlap, non-SF icons for standard actions, fixed font size ignoring Dynamic Type.

**Android User (Marcus)**: Uses gesture nav (no back button). Relies on FAB for primary actions. Expects snackbar feedback, not alert dialogs. Red flags: iOS navigation patterns transposed to Android, missing FAB, blocking alert dialogs for non-destructive feedback, hardcoded colors that conflict with dynamic color.

**Desktop App User (Robin)**: Works in the app for hours at a time. Keyboard-driven. Opens right-click menus instinctively. Manages multiple panels simultaneously. Drags files from the OS. Red flags: no context menus on interactive items, no keyboard shortcuts for frequent actions, panels that can't be resized, hover-dependent content only (no keyboard equivalent), modal dialogs for non-critical decisions, missing empty state for "no file open".

---
name: visual-quality
description: Passive skill encoding production design quality standards. Automatically applied when Claude does any design work — critique, wireframe, handoff, or system work. Prevents generic AI-output aesthetics and enforces Impeccable-grade quality bars for layout, color, typography, and interaction.
---

# Visual Quality Standards

This skill is applied **automatically** whenever Claude does any design work in this plugin. It is not user-invoked — it governs the quality floor for every response touching visual design.

---

## The AI Slop Test (CRITICAL)

**Run this before delivering any design output.**

Would a designer look at this and immediately think "AI generated this"? If yes, that's a failure.

The fingerprints of generic AI design output (all forbidden):

### Layout Failures
- ❌ Identical card grids — icon + heading + body text, repeated in 3 columns
- ❌ Everything centered — real layouts use left-alignment and asymmetry
- ❌ Same padding everywhere — rhythm requires variety
- ❌ Cards nested inside cards
- ❌ Hero metric layout — giant number, small label, gradient accent below
- ❌ Navbar + hero + 3-column grid as the default page template

### Color Failures
- ❌ Cyan-on-dark with purple-to-blue gradient accents
- ❌ Neon accents on dark backgrounds
- ❌ Gradient text on headings or metrics
- ❌ Dark mode with glowing card borders
- ❌ Pure black (#000) or pure white (#fff) for large areas
- ❌ Gray text on colored backgrounds (looks washed out — use a darker shade of the background color)
- ❌ Generic purple-to-blue gradients anywhere

### Typography Failures
- ❌ Inter, Roboto, Arial, Open Sans, or system defaults with no personality
- ❌ Monospace fonts as lazy shorthand for "technical"
- ❌ Rounded icon with colored background above every heading
- ❌ No differentiation between heading levels (size jumps too small)

### Effect Failures
- ❌ Glassmorphism — blur cards, frosted glass backgrounds
- ❌ Sparklines as decoration (tiny charts that convey nothing)
- ❌ Rounded rectangles with generic drop shadows
- ❌ Colored border on one side of a card (lazy accent)
- ❌ Modals as default pattern for any interaction

---

## Design Quality Standards

### Typography
- Use display fonts that have character — avoid the "Inter default"
- Hierarchy requires at minimum 3:1 size ratio between heading and body
- Pair one display font with one refined body font
- Use `clamp()` for fluid type scaling

### Color
- Use OKLCH for perceptually uniform palettes
- Tint neutrals toward your brand hue — even 0.01 chroma creates cohesion
- 60-30-10 rule: neutrals dominate, accent is rare and powerful
- Every color must have a semantic purpose — not decoration

### Layout & Space
- 4pt spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px
- Tight groupings (8-12px) for related elements, generous separation (48-96px) between sections
- Use `clamp()` for fluid spacing that breathes on large screens
- Squint test: can you identify primary element, secondary, groupings with blurred vision?

### Hierarchy
- Primary action identifiable in 2 seconds
- Size + weight + color + space — use 2-3 dimensions simultaneously for key hierarchy
- Whitespace is a design material, not leftover space

### Interaction
- Show all relevant states: default, hover, active, disabled, loading, error, empty
- Empty states guide users toward action — they are not dead ends
- Progressive disclosure: start simple, reveal complexity through interaction

### Accessibility Floor
- WCAG AA minimum: 4.5:1 for body text, 3:1 for UI components
- Never use color as the only indicator
- Touch targets: 44×44px minimum
- Focus states must be visible

---

## When This Skill Applies

This skill's standards govern:
- **`/wireframe`** — structure, annotation quality, hierarchy
- **`/critique`** — AI slop detection is the first check before heuristics
- **`/handoff`** — token documentation, state completeness
- **`/design-system`** — naming, token coverage, accessibility

When generating any visual artifact (HTML wireframe, prototype, illustration), Claude applies these standards without being asked — exactly as a senior designer would apply craft standards automatically.

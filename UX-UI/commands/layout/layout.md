---
name: layout
description: Diagnose and fix layout, spacing, and visual rhythm issues. Use when a design feels off, cramped, monotonous, or unbalanced — even if you can't name why. Applies systematic spacing fixes and hierarchy improvements.
argument-hint: "<design, component, or page to fix>"
tools: ["computer"]
---

# /layout

Diagnose and improve the layout for: @$1

**Invoke the `visual-quality` skill before proceeding.**

## Diagnosis First

Before making changes, identify what's wrong:

1. **Squint test**: Blur your (metaphorical) eyes. Can you identify the most important element, secondary elements, and clear groupings? If everything looks the same weight — hierarchy problem.

2. **Rhythm check**: Is all spacing the same? (Equal padding everywhere = no rhythm = monotonous)

3. **Card audit**: Are cards used where spacing and alignment would work better? Are there cards inside cards?

4. **Centering check**: Is everything centered? Left-aligned with asymmetry feels designed; centered everything feels generic.

5. **Grid check**: Are identical card grids the dominant layout pattern? Is grid used where flexbox would be simpler?

## Fix Systematically

### Establish a Spacing System
Use the 4pt scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px. No arbitrary values.
- Tight groupings: 8–12px between siblings in a group
- Generous separation: 48–96px between distinct sections
- Use `gap` for sibling spacing (not margins)
- Use `clamp()` for fluid spacing that breathes on large screens

### Create Visual Rhythm
- Vary spacing — tight where related, generous where separated
- Break predictable centered-content pattern with asymmetric compositions
- Let some elements have dramatically more space to draw the eye

### Right Tool for the Job
- Flexbox for 1D layouts (rows, nav bars, component internals)
- CSS Grid for 2D layouts (page structure, dashboards)
- `repeat(auto-fit, minmax(280px, 1fr))` for responsive grids without breakpoints
- Named grid areas for complex page layouts

### Break Monotony
- Vary card sizes or span columns to break repetition
- Mix card and non-card content
- Don't default to cards — spacing and alignment create grouping naturally

## Deliver
Provide specific fixes with before/after comparison. Show:
1. What was wrong and why it felt off
2. The specific spacing values changed and why
3. The resulting hierarchy improvement

After fixing: suggest `/critique` to verify the improvement against heuristics scoring.

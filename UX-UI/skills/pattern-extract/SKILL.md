---
name: pattern-extract
description: Identify and extract reusable UI patterns, components, and design tokens from an existing codebase into a coherent design system. Trigger with "extract components", "find repeated patterns", "build design system from code", "what should be a component?", "hardcoded values", or when auditing a codebase for design debt.
argument-hint: "<directory, component, or codebase to analyze>"
---

# Pattern Extract

> If you see unfamiliar placeholders or need to check which tools are connected, see [CONNECTORS.md](../../CONNECTORS.md).

Scan a codebase for repeated UI patterns, hardcoded values, and inconsistent implementations — then surface them as candidates for systematic design system extraction.

## Usage

```
/extract $ARGUMENTS
```

---

## Phase 1 — Discovery Scan

### What to Scan For

**Repeated components** (used 3+ times without a shared source):
- Similar button implementations with slight variations
- Card layouts copied across files
- Form field patterns reimplemented per feature
- Navigation or header structures duplicated

**Hardcoded values that should be tokens**:
- Raw hex colors: `#3b82f6`, `rgba(0,0,0,0.5)`
- Arbitrary spacing: `padding: 14px`, `margin: 22px`
- Font values: `font-size: 13px`, `font-weight: 600`
- Shadows: `box-shadow: 0 2px 8px rgba(0,0,0,0.12)`
- Border radii: `border-radius: 6px`
- Z-index values: `z-index: 999`

**Inconsistent variations** (same concept, multiple implementations):
- 3 different button styles with no systematic relationship
- Colors that should be semantic (success, error, warning) defined ad hoc
- Spacing that's almost-but-not-quite on a scale

**Missing states** (implementations without full state coverage):
- Buttons with hover but no focus, disabled, or loading
- Forms with no error state styling
- Empty states replaced by `display: none`

---

## Phase 2 — Extraction Candidates

For each pattern found, produce a candidate card:

```
Pattern: [Name]
Type: Component / Token / Layout pattern
Found in: [files or count of occurrences]
Current state: [Duplicated / Inconsistent / Hardcoded]
Extraction value: High / Medium / Low
Why extract: [Consistency gain / maintenance reduction / token coverage]
Risk: [Low: pure refactor / Medium: behavioral changes / High: API change]
```

**Extraction value scoring:**
- **High**: Used 5+ times, currently inconsistent, blocks design system completeness
- **Medium**: Used 3–4 times, minor inconsistencies, good candidate when system matures
- **Low**: Used 1–2 times, context-specific — leave it; extract only if clearly general

**Don't extract everything.** Over-extraction creates an over-engineered system that nobody uses. Focus on patterns that have genuine reuse value across features.

---

## Phase 3 — Extraction Plan

Present a prioritized plan before touching any file:

```
Priority 1 — [Pattern Name]
Action: Create shared [component/token] to replace [N] implementations
Files affected: [list]
New location: [proposed path]
API change needed: [Yes/No]

Priority 2 — [Pattern Name]
...
```

**Confirm with the user before extracting.** Code changes have risk; design system changes have downstream impact.

---

## Phase 4 — Extract and Improve

When extracting, don't just consolidate — improve:

### Token Extraction
- Convert raw hex to OKLCH semantic tokens (`--color-brand-primary`, `--color-feedback-error`)
- Build a consistent spacing scale from the existing values (map to nearest 4pt scale: 4, 8, 12, 16, 24, 32, 48, 64px)
- Name semantically, not by value: `--space-md` not `--spacing-16`
- Document each token: when to use it, what it represents

### Component Extraction
- Define a clean props API with sensible defaults
- Cover all states: default, hover, active, disabled, loading, error, empty
- Add ARIA roles and keyboard behavior
- Write usage documentation with do/don't examples
- Support the variants already found in the wild — don't simplify away real use cases

### Pattern Documentation
- When to use this pattern
- Common variations and when each applies
- What NOT to combine it with
- Code example (concise)

---

## Phase 5 — Migration

After extraction, replace existing implementations:

1. **Find all instances** — search for the specific values/patterns replaced
2. **Replace systematically** — update each use to the shared version
3. **Verify visually** — confirm no regressions
4. **Delete dead code** — remove old implementations; don't leave them as "backup"

If the codebase is large, provide a migration script approach rather than doing it manually.

---

## Design System Surface Report

After extraction, deliver:

```markdown
## Design System Extraction Report

### Tokens Added
| Token | Value | Replaces |
|-------|-------|---------|
| `--color-brand-primary` | oklch(55% 0.18 250) | #3b82f6 (12 occurrences) |
| `--space-md` | 16px | padding: 16px, margin: 16px (38 occurrences) |

### Components Created
| Component | Variants | States | Replaces |
|-----------|----------|--------|---------|
| `Button` | primary, secondary, ghost | default, hover, disabled, loading | 5 button implementations |
| `Card` | default, compact | default, hover | 8 card patterns |

### Hardcoded Values Remaining
| Value | Occurrences | Notes |
|-------|-------------|-------|
| `#6b7280` | 4 | Likely `--color-text-muted` — needs design decision |
| z-index: 999 | 2 | Should join z-index scale |

### Design Debt Identified (Not Extracted)
| Issue | Severity | Recommendation |
|-------|----------|---------------|
| 3 button implementations with conflicting hover behavior | Medium | Align before next extraction |
```

---

## If Connectors Available

If **~~design tool** (Figma) is connected:
- Compare extracted tokens against the Figma design system — flag mismatches
- Create Figma variables for each extracted token
- Link code components to their Figma counterparts

If **~~project tracker** is connected:
- Create tickets for each extraction candidate
- Log design debt items for patterns left in place
- Track migration progress per component

If **~~knowledge base** is connected:
- Publish the extraction report and component documentation
- Link to the existing design system docs

---

## Tips

1. **Start with tokens** — Token extraction is low-risk and high-reward. Do it before components.
2. **Don't boil the ocean** — One component extraction session = one pattern. Don't try to extract everything at once.
3. **Inconsistency reveals intent** — Three button sizes in the wild usually means three distinct user needs. Understand why before unifying.
4. **The PR is the artifact** — A design system lives or dies by whether engineers use it. Make the extraction diff as small and readable as possible.

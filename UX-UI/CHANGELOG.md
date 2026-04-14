# Changelog

## [2.0.0] — Impeccable Integration

### Added
- **`wireframe` skill** — Full wireframe generation framework with context gathering, anti-AI-slop quality rules, numbered annotation system, HTML artifact output, and a pre-delivery quality checklist
- **`visual-quality` skill** — Passive skill encoding Impeccable's complete quality standards: forbidden AI-slop patterns, OKLCH color system, 4pt spacing scale, typography anti-patterns, and interaction quality floors. Applied automatically across all design work.
- **`/wireframe` command** — Generates interactive, annotated HTML wireframes with layout rationale, copy guidance, and interaction notes
- **`/prototype` command** — Generates production-grade HTML prototypes with committed aesthetic direction, distinctive typography, real visual hierarchy, and all interactive states
- **`/layout` command** — Diagnoses and fixes layout monotony, spacing inconsistency, card overuse, and hierarchy problems using systematic spacing and rhythm principles
- **Commands directory** — Formalized all 9 commands (6 existing + 3 new) with proper command files. Original v1.2 documented commands but had no `commands/` directory — this was a structural bug.

### Changed
- **`design-critique` skill** — Major upgrade: AI slop detection added as mandatory Phase 1, Nielsen's 10 heuristics scoring (0–4 per heuristic with band ratings), persona red flags framework (Power User / First-Timer / Mobile), and P0–P3 priority severity system
- **`ux-copy` skill** — Upgraded with systematic pattern library: before/after examples for CTAs, error messages, empty states, confirmation dialogs, loading states, tooltips, and navigation labels. Added tone-by-context guide.

### Version bump
`1.2.0` → `2.0.0` (major: new generative capabilities, structural command files added, critique scoring system changed)

## [2.1.0] — Pipeline Completion

### Added
- **`user-flow` skill** — Full user flow diagramming framework: context gathering, node taxonomy (screens / decisions / system actions / entry-exit), mandatory error branch requirements, automatic flow critique (dead ends, missing paths, >7-step flag, disconnected screens), and the flow → wireframe bridge
- **`/flow` command** — Generates Mermaid diagrams (renders in Notion/GitHub/Linear), SVG/HTML artifacts, or structured text outlines. Auto-flags design problems in the generated flow.
- **`pattern-extract` skill** — 5-phase design system extraction from codebases: discovery scan (repeated components, hardcoded values, inconsistent variations, missing states), candidate scoring, extraction plan with user confirmation, extract-and-improve (tokens to OKLCH, components with full state coverage), migration with dead code removal, and a Design System Surface Report
- **`/extract` command** — Wires the pattern-extract + design-system skills with a quality gate: present plan before modifying, confirm, extract, then offer `/design-system audit`, `/critique`, and `/accessibility` as verification steps

### Changed
- **`research-synthesis` skill** — Added Research → Design Pipeline section: automatically classifies findings as flow problems / screen problems / copy problems / system problems, and maps each to the corresponding command (`/flow`, `/wireframe`, `/ux-copy`, `/design-system extend`). Outputs a Design Implications table that closes the gap between research and design action.

## [2.2.0] — Multi-Platform Awareness

### Added
- **`platform-context` skill** — Passive skill encoding platform-specific design vocabulary, component patterns, interaction models, and constraints for Web, Mobile Web, iOS Native, Android Native, and Desktop App. Auto-activates on platform signal detection — never user-invoked. Includes per-platform: navigation patterns, interaction vocabulary (gestures / keyboard), touch target rules, component naming conventions, and a platform-specific persona library (Elena for iOS, Marcus for Android, Robin for Desktop App).

### Changed
- **`wireframe` skill** — Added `Platform` as a context field (optional, default: Web, triggered by signal detection). Added annotation **⑦** to the annotation system, reserved for gesture and keyboard interaction callouts. Renamed ⑤ as "Adaptive notes" to disambiguate from new ⑦. Added platform chrome rendering rules to the HTML output spec (window title bar + menu bar for Desktop App, status bar + tab bar for iOS/Android, browser address bar stub for Mobile Web). Added platform check to the pre-delivery quality checklist.
- **`/prototype` command** — Added `Platform` to the context collection step with the same default/detection logic as wireframe. Added a Platform-Specific Generation Rules table covering layout, interactions, and chrome per platform. Added platform check to the quality requirements checklist. Documented critical rules: no hover-as-sole-reveal on touch platforms, no hamburger menus on Desktop App.
- **`design-critique` skill** — Added **Phase 2 (Platform Audit)** between AI Slop Detection and the main critique. Phase 2 checks for transposed patterns (web conventions on wrong platform), missing platform chrome, and missing platform-specific affordances. Expanded persona library: existing Sam (Mobile), Alex (Power User), Jordan (First-Timer) retained; added **Elena** (iOS Native), **Marcus** (Android Native), **Robin** (Desktop App) with detailed, specific red flag lists per persona. Added persona selection rule: auto-select based on declared platform.
- **`design-handoff` skill** — Added platform declaration step before spec generation. Replaced the single CSS-breakpoint responsive table with **platform-specific output sections**: Web (breakpoints, container queries), Mobile Web (viewport, thumb zone compliance), iOS Native (safe area insets, UIKit/SwiftUI terminology, Dynamic Type, gestures, haptics), Android Native (M3 color roles, Material 3 terminology, dp units, gestures, dynamic color), Desktop App (window chrome, panel structure with min/max widths, keyboard shortcut table, context menu spec format, drag-and-drop spec, hover state spec, window states). Added principle 5: "speak the target platform's language."

### Version bump
`2.1.0` → `2.2.0` (minor: new passive skill, no breaking changes to existing commands)

## [2.3.0] — MCP-Native Discovery Stack

### Added

- **`feedback-mining` skill** — Active signal extraction from `~~user feedback` (Intercom) and `~~chat` (Slack). Defines a 5-type signal taxonomy (pain / wish / workaround / confusion / comparison), per-connector query protocols (volume scan → segment filter → recency comparison → CSAT cross-reference for Intercom; channel targeting + keyword sweeps for Slack), a cross-connector aggregation format producing a scored Discovery Brief, and an evidence scoring table (0–30) that maps to a next-action recommendation. Includes anti-patterns for common mining mistakes.

- **`analytics-discovery` skill** — Quantitative discovery using `~~product analytics`. Covers 4 methods: funnel analysis (find and classify abandonment drops: friction / value / motivation), feature adoption audit (identify invisible features and diagnose low adoption), retention cohort analysis (identify the activation hypothesis from behavioral delta), and path analysis (backtracking loops, rage clicks, unexpected exits). Outputs a hypothesis scoring table (0–18) combining all available connector signals, with a decision threshold: 0–6 = monitor, 7–12 = synthesize first, 13–18 = full sprint. Includes explicit boundary: analytics answers *what*, not *why*.

- **`research-ops` skill** — Research sprint logistics using `~~email` (Gmail), `~~calendar` (Google Calendar), and `~~project tracker`. Covers a 4-step sprint setup protocol: create brief (project tracker + knowledge base), participant identification (Intercom segment queries + Gmail warm contact search), outreach (high-response-rate email template, batch cadence, response rate benchmarks), and calendar scheduling (buffer rules, daily session limits). Includes interview day protocol (pre/post-interview steps), 2-week sprint calendar template, and response rate benchmark table by outreach type.

- **`research-repository` skill** — Living research knowledge base using `~~knowledge base` (Notion/Confluence/Dovetail). Defines a canonical repository structure (Studies/ + Feedback Mining/ + _Living Documents/). Covers 4 protocols: prior research check before every sprint (with recency/relevance decision framework), synthesis publication (structured page template with tagging rules), living document maintenance (Personas with version history, Known Pain Points running catalogue, Open Research Questions queue), and on-demand knowledge surfacing. Includes quarterly health check table.

- **`/discover` command** — Master discovery command. Orchestrates all available connectors in sequence: prior research check (~~knowledge base), feedback mining (~~user feedback + ~~chat), quantitative validation (~~product analytics), hypothesis scoring (0–18), and next-action recommendation. Gracefully skips unavailable connectors and notes gaps in confidence. Output is a single Discovery Brief document.

- **`/interview-ops` command** — End-to-end user interview sprint setup. Sequences: prior research check, brief creation, participant identification from Intercom, tracker board setup, outreach email drafting with preview before send, calendar scheduling with confirmation before invites, and post-sprint synthesis handoff. Confirmation-gated before any email or calendar action.

### Changed

- **`CONNECTORS.md`** — Added `~~email` and `~~calendar` categories (Gmail and Google Calendar were in `.mcp.json` but undocumented). Added `~~product analytics` with options. Added discovery connector matrix table showing required vs. enhancing connectors per skill/command. Added notes on Dovetail dual-category usage and analytics MCP flexibility.

### Version bump
`2.2.0` → `2.3.0` (minor: 4 new skills, 2 new commands, CONNECTORS.md updated)

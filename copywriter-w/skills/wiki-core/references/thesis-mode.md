# Thesis Research Mode

Thesis research is a modified version of the standard research pipeline. It shares ~70% of the same infrastructure (agent dispatch, credibility scoring, session registry, multi-round --min-time, compilation, ingestion). The differences below are modifications to the standard phases in `research.md`.

## Thesis Detection

Auto-detect thesis mode when input contains: "prove that", "is it true that", "verify", "test the claim", "test the hypothesis". The claim text is the input minus the signal words. Also activated explicitly via `--mode thesis "<claim>"`.

## Phase 0: Decompose the Thesis

Before any research, break the claim into:

1. **Core claim**: the central assertion in one sentence
2. **Key variables**: the specific things being connected (e.g., "sunlight exposure", "CAA progression", "vitamin D")
3. **Testable prediction**: what would be true if the thesis is correct?
4. **Falsification criteria**: what evidence would disprove it?
5. **Scope boundary**: what is NOT part of this thesis? (This is the bloat filter — if a source doesn't touch these variables, skip it.)

Present the decomposition to the user for confirmation before proceeding.

## Wiki Setup

Create a thesis file at `wiki/theses/<slug>.md`:

```markdown
---
title: "Thesis: <thesis statement>"
type: thesis
status: investigating
created: YYYY-MM-DD
updated: YYYY-MM-DD
verdict: pending
confidence: pending
core_claim: "<one sentence>"
key_variables: [var1, var2, var3]
falsification: "<what would disprove this>"
---

# Thesis: <thesis statement>

## Core Claim
## Key Variables
## Testable Prediction
## Falsification Criteria
## Evidence For
(populated during research)
## Evidence Against
(populated during research)
## Nuances & Caveats
(populated during research)
## Verdict
**Status**: Investigating
```

## Phase 2 Modification: Thesis-Directed Agents

Replace the standard agent table (Academic, Technical, etc.) with:

| Agent | Focus | Thesis Lens |
|-------|-------|-------------|
| **Supporting** | Evidence that supports the thesis | Search for studies, data, mechanisms that confirm the claim. Strongest evidence first. |
| **Opposing** | Evidence that contradicts the thesis | Counter-evidence, failed replications, alternative explanations. Steelman the opposition. |
| **Mechanistic** | HOW/WHY the thesis could be true or false | Underlying mechanisms, pathways, causal chains connecting the variables. |
| **Meta/Review** | Meta-analyses, systematic reviews, expert consensus | Aggregate evidence on this specific question. These carry the most weight. |
| **Adjacent** | Related findings that nuance the thesis | Edge cases, moderating variables, conditions under which the thesis holds or fails. |

In `--deep` mode, add: **Historical** (evolution of thinking on this claim), **Quantitative** (effect sizes, confidence intervals, dose-response data), **Confounders** (variables that could make a spurious correlation look causal).

Each agent must evaluate: relevance (direct/indirect/tangential — SKIP tangential), evidence strength (meta-analysis > RCT > cohort > case > opinion > anecdotal), and direction (supports/opposes/nuances).

When ICP data is available (passed by the orchestrating command), weight evidence relevance by ICP pain points. A source that directly addresses icp.pain_points scores +1 relevance.

## Agent Prompt Template: Thesis Variant

Add to the standard agent prompt:

```
**Thesis**: "{thesis statement}"
**Key variables**: {extracted variables}
**Your lens**: {Agent Focus from thesis table}
**Evaluation**: For each source, rate:
- Relevance: direct | indirect | tangential (skip tangential)
- Evidence strength: meta-analysis > RCT > cohort > case study > expert opinion > anecdotal
- Direction: supports | opposes | nuances the thesis
```

## Phase 4 Modification: Evidence Compilation

After standard compilation, update the thesis file:
- **Evidence For**: list each supporting finding with source, evidence strength, and one-line summary. Sort by evidence strength (meta-analyses first).
- **Evidence Against**: same format for opposing findings.
- **Nuances & Caveats**: conditions, moderators, edge cases.
- Each finding is marked "Strong" / "Moderate" / "Weak" based on combined credibility + evidence strength.

## Phase 5 Modification: Verdict

After all rounds complete, render a verdict in the thesis file:

```markdown
## Verdict
**Status**: Supported | Partially Supported | Insufficient Evidence | Contradicted | Mixed
**Confidence**: High | Medium | Low
**Summary**: 2-3 sentences on what the evidence shows.
**Strongest supporting evidence**: [list]
**Strongest opposing evidence**: [list]
**Key caveats**: [list]
**What would change this verdict**: [specific future findings]
**Suggested follow-up theses**: [derived from findings]
```

Update frontmatter: `status: completed`, `verdict: <result>`, `confidence: <level>`.

## Multi-Round: Anti-Confirmation-Bias

When `--min-time` is set:
- **Round 1**: Broad evidence gathering — supporting + opposing + mechanistic
- **Round 2**: Drill into the WEAKEST side. If Round 1 found mostly supporting evidence, Round 2 focuses harder on finding counter-evidence (and vice versa). This prevents confirmation bias.
- **Round 3+**: Follow up on specific sub-questions, confounders, or moderating variables
- **Final**: Synthesize verdict, update thesis file

Session state uses `.thesis-session.json` instead of `.research-session.json`, tracking evidence for/against counts and current verdict direction per round. Same lifecycle: create -> update -> delete on completion. Resume detection: "Found interrupted thesis session (Round N, current leaning: X). Continue?"

---
description: Run a complete strategic planning engagement — from scoping through research, rigorous analysis, synthesis, and executive-grade deliverable
argument-hint: "<client brief or strategic challenge>"
---

# /plan — Strategic Planning Engagement

Run a complete strategic planning engagement with built-in decision science at every analytical step.

## Usage

```
/plan <client brief or strategic challenge>
```

### Arguments

- `client brief or strategic challenge` — The strategic question to investigate. Can be:
  - A direct question: "Should we enter the European EV market?"
  - A vague brief: "The client wants to grow in Asia"
  - A file upload: client brief, RFP, or project description

If no topic is provided, ask the user to describe their strategic challenge.

## Workflow

This command orchestrates a 5-phase engagement:

### Phase 1: Scoping
Invoke the **scoping** skill to sharpen the challenge into a decision-oriented problem statement with clear scope and deliverable definition.

**Checkpoint**: User confirms the problem statement.

### Phase 2: Research
Invoke the **research** skill. Two independent research agents investigate from complementary angles, then a validator cross-checks for consistency and source quality.

**Checkpoint**: User reviews validated findings.

### Phase 3: Analysis
Invoke the **analysis** skill. This is where the full decision science runs:
- MAP scoring of strategic options
- Verification questions targeting hidden assumptions
- Pre-mortem on the recommended direction
- Reality check against base rates
- Scope and temporal coherence checks

**Checkpoint**: User reviews the analysis report.

### Phase 4: Synthesis
Invoke the **synthesis** skill to build a coherent storyline answering the strategic question, with governing message and evidence map.

**Checkpoint**: User approves the storyline.

### Phase 5: Deliver
Invoke the **deliver** skill to produce an executive-grade .docx report with sourced claims, counter-arguments, recommendations, and a Decision Audit Trail.

## Output

A complete .docx strategic report with:
- Executive summary
- Evidence-backed analysis sections
- Counter-argument section (informed by pre-mortem)
- Specific, sequenced recommendations
- Research Notes with full source traceability
- Decision Audit Trail (MAP scores, pre-mortem, reality check)

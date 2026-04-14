---
name: deliver
description: |
  Produce an executive-grade Word document (.docx) from the synthesized storyline.
  Triggers when user mentions:
  - "write the report"
  - "produce the deliverable"
  - "generate the client document"
---

# Deliver — Executive-Grade Report

Transform the synthesized storyline into a polished .docx report that a senior partner could hand to a client CEO.

## Writing Standards

**Do:**
- Short, declarative sentences
- Concrete nouns and active verbs
- State conclusions before evidence
- Numbers with context and sources
- Write for a time-pressed executive who will skim

**Do NOT use:**
- "Leverage", "Synergies", "Unlock value", "Best-in-class", "Holistic"
- "Ecosystem" (unless literally about biology), "Paradigm shift"
- "Move the needle", "Low-hanging fruit", "Deep dive"
- "Going forward", "At the end of the day", "Thought leadership"

## Document Structure

### Title Page
Client name, engagement title, date, confidentiality notice.

### Executive Summary
The governing message and 2-4 key arguments in half a page. A senior executive who reads only this page should understand the recommendation and its basis.

### Body Sections
Organized by the storyline headlines. Each section:
- Opens with the headline as section heading
- States the conceptual insight first (the strategic "why")
- Presents evidence (tables, benchmarks) as support
- Closes with "so what" — implication for the client

**Data - So What - Now What** pattern for every key finding.

### Counter-Arguments Section
Address risks and objections honestly:
- Pre-mortem failure modes with mitigation
- Client-raised concerns
- Foreseeable operational risks

Structure: "The risk is [X]. The evidence suggests [Y], and we recommend [mitigation Z]."

### Recommendations
Specific, actionable, sequenced:
- What to do (specific action)
- By when (timeline)
- What it requires (resources)
- What it delivers (expected impact)

### Research Notes (mandatory)
Numbered source list with full traceability:
```
[1] "Quote from report" - Source Name, Date, URL - CS-1 [VERIFIED]
```

### Decision Audit Trail (mandatory)
Appendix with:
- Triage score and protocol
- MAP scoring table
- Top failure modes and prevention
- Reality check: base rate vs. projection

## Quality Checks (mandatory before delivery)

1. **Structural coherence**: Read only headings - does a coherent argument emerge?
2. **Banned language sweep**: Search and replace all banned phrases
3. **Citation completeness**: Every factual claim has a Research Notes entry
4. **Assumption labeling**: Illustrative numbers are clearly marked as such
5. **Confidence language**: Matches source type (expert-confirmed vs. single-source)
6. **Data - So What**: Every data point has an implication
7. **Cross-section linkage**: Findings that affect other sections are explicitly connected
8. **Client questions**: Every question from scoping is answered

## Document Generation

Use the docx skill to generate the .docx file from a JSON specification.

## Output

An executive-grade .docx report ready for client delivery.

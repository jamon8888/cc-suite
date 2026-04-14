---
name: rfp-shredder
description: "This skill should be used when the user asks to 'analyze RFP', 'read this RFP', or 'shred this RFP'."
---

# Skill: RFP Shredder

Turn a 50-page PDF into a 1-page summary and a draft response.

```
┌─────────────────────────────────────────────────────────────────┐
│  STANDALONE (always works)                                      │
│  ✓ Analyze Fit Score (0-100) based on ICP and Capabilities      │
│  ✓ Detect Red Flags (Unlimited Liability, Source Code Escrow)   │
│  ✓ Extract Requirements Matrix (Must-Haves vs Nice-to-Haves)    │
│  ✓ Draft standard answers for Security, GDPR, SLA               │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (connect ~~knowledge-base)                        │
│  + Search your previous proposals for "Best Answers"            │
│  + Auto-fill 60-80% of technical questions                      │
└─────────────────────────────────────────────────────────────────┘
```

## 🛠 Agent Instructions

### Phase 1: The Scan (Go/No-Go Analysis)

**Trigger**: "Analyze this RFP [upload PDF]."

**Actions**:

1.  **Read the PDF**: Scan for keywords.
2.  **Run Red Flag Check**: Compare against `references/red-flags.md`.
    - _Examples_: "Liquidated Damages", "On-premise only", "24/7 Phone Support".
3.  **Calculate Fit Score**: Use `references/scoring-matrix.md`.
    - _Criteria_: Budget, Timeline, Tech Stack match, Competitors.
4.  **Recommendation**: "GO" (Score > 70) or "NO-GO" (Score < 50).

**Output**: A "Decision Memo" with the Score and Top 3 Risks.

### Phase 2: The Shred (Extraction)

**Trigger**: "Summarize the requirements."

**Actions**:

1.  **Extract Key Data**:
    - **Deadlines**: Submission date, Q&A date.
    - **Format**: Word/PDF? Portal upload?
    - **Contacts**: Buyer name and role.
2.  **Build Requirements Matrix**:
    - Table columns: `Requirement | Compliance (Y/N/Partial) | Effort to Build`.

**Output**: A Markdown table of the "Must-Haves".

### Phase 3: The Draft (First Pass)

**Trigger**: "Draft answers for Section 4 (Security)."

**Actions**:

1.  **Load Context**: Read `data/sales-profile.json` (Product Info).
2.  **Load Templates**: Read `references/response-templates.md`.
3.  **Draft Answers**:
    - If question is standard ("Data Privacy"), paste the GDPR snippet.
    - If question is specific ("Do you integrate with Legacy System X?"), draft a "Partial" answer emphasizing API capabilities.

## 📂 System Integration

- **Language Logic**:
  - Check `sales-profile.json` or PDF language.
  - If French: Use "Appel d'Offres", "Cahier des Charges", "RGPD".
- **ICP Alignment**:
  - Load `data/icp.json`.
  - If the RFP asks for features NOT in your ICP (e.g. Enterprise Customization for a SMB tool), flag as NO-GO.

## 📚 References

- `references/red-flags.md`: List of terms that kill deals.
- `references/scoring-matrix.md`: The math behind the decision.
- `references/response-templates.md`: Standard answers for Security, SLA, Support.

## STEP 5 — INCUMBENT DETECTION

Scan for language patterns that suggest the RFP was written around an existing vendor:

Red flags for incumbent-favoring specs:
- Overly specific tech requirements ("must integrate with [very specific legacy system]")
- Impossibly short delivery timelines (designed for vendor with existing infrastructure)
- Evaluation criteria that match a known competitor's exact differentiators
- Reference to "continuation of existing services" or "smooth transition from current provider"

If 2+ patterns detected: "⚠️ This RFP may be written for an incumbent. Consider: is this worth pursuing if the decision is pre-made?"


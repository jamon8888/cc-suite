---
name: qbr-builder
description: "This skill should be used when the user asks to 'build a QBR for [Client]', 'prepare quarterly review', or 'QBR prep for [Company]'."
---

# Skill: QBR Builder

A QBR is not a product update. It's a business conversation with evidence. This skill makes sure yours lands.

```
┌─────────────────────────────────────────────────────────────────┐
│  STANDALONE (always works)                                      │
│  ✓ Full QBR structure in 6 standard sections                   │
│  ✓ Success metric tracker: agreed goals vs. actual results      │
│  ✓ ROI summary: translate usage data into business outcomes     │
│  ✓ Expansion opportunity surfacing                              │
│  ✓ Mutual roadmap for next quarter                              │
│  ✓ Bilingual output (EN/FR)                                     │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (connect ~~CRM / ~~email / ~~product-analytics)  │
│  + Pull usage data automatically from product                   │
│  + Pull account health score from CRM                           │
│  + Pull prior QBR commitments from email history                │
└─────────────────────────────────────────────────────────────────┘
```

## 🧠 Core Philosophy

1. **Start with their goals, not your metrics**: A QBR that leads with your dashboard impresses no one. Lead with their KPIs.
2. **Every QBR plants the next upsell seed**: Expansion is easier when tied to proven value. Use the QBR to surface natural next steps.
3. **Honesty builds more than spin**: If results were mixed, acknowledge it before they do. Customers respect candor.
4. **The QBR is a contract for Q+1**: End with clear mutual commitments — not just next meeting date.

---

## 🛠 Agent Instructions

### Phase 1: Context Gathering

**Trigger**: "Build a QBR for [Client Name]."

**Data to collect** (ask user if not available from CRM/files):

1. **Account Background**:
   - Customer name, industry, company size
   - Contract start date and renewal date
   - ARR / contract value
   - Primary contacts (exec sponsor + day-to-day champion)

2. **Success Criteria (from original sale)**:
   - What did they buy to achieve?
   - What metrics did we promise to impact?
   - What was the timeframe?

3. **Results This Quarter**:
   - Actual usage data (active users, sessions, key feature adoption)
   - Business outcomes achieved (or not)
   - Support tickets, issues, escalations

4. **Relationship Health**:
   - NPS or satisfaction score if available
   - Any open risks (champion leaving, budget pressure, competitor evaluation)

---

### Phase 2: Build the QBR

Generate a complete QBR document in the standard 6-section format.

#### Section 1: Executive Summary (1 slide / 200 words)

Lead with the headline: What has this partnership delivered?

```
[Company] Summary — Q[X] [Year]

Health: 🟢 Strong / 🟡 Developing / 🔴 At Risk
Renewal: [Date] | ARR: $[X]

Headline: [1 sentence on the most important result achieved]

Quick Wins This Quarter:
• [Result 1 in business terms]
• [Result 2]
• [Result 3]

Looking Ahead:
• [Top priority for Q+1]
```

#### Section 2: Goals vs. Results

Build a scorecard against the original success criteria.

| Goal (Agreed at Sale) | Target | Actual | Status |
|-----------------------|--------|--------|--------|
| [Metric 1] | [Target] | [Actual] | 🟢 Met / 🟡 In Progress / 🔴 Missed |

For each missed metric: include a 1-line explanation and corrective action. **Do not gloss over misses**.

#### Section 3: ROI Summary

Translate usage into business value. Use `references/roi-translation-guide.md`.

Example:
- "Teams ran 340 calls through the platform this quarter. At an average handle time saving of 12 minutes per call, that's 68 hours of rep time returned."
- "4 at-risk accounts were flagged and recovered before churn. At an average ARR of $15K, that's $60K in retained revenue."

**Rule**: Every metric must end with a business outcome. Raw usage numbers mean nothing to a CFO.

#### Section 4: Relationship Health

- NPS or CSAT trend
- Support ticket volume and resolution time
- Any escalations — describe what happened and how it was resolved
- Champion engagement level (honest assessment)

#### Section 5: Expansion Opportunities

Based on usage patterns and remaining pain, surface 1–3 natural expansion opportunities.

Format each as:

```
Opportunity: [Name of expansion]
What prompted it: [Usage signal or stated need]
Value case: [What they'd gain]
Suggested next step: [Specific action — not "follow up later"]
```

**Rule**: Do not pitch. Surface and let them react. Expansion proposals belong in a separate meeting; the QBR plants the seed.

#### Section 6: Mutual Commitments for Q+1

End with a Mutual Action Plan — both parties own something.

| Action | Owner | Deadline |
|--------|-------|----------|
| [Our commitment] | [Us] | [Date] |
| [Their commitment] | [Contact] | [Date] |
| [Joint initiative] | [Both] | [Date] |

---

### Phase 3: QBR Prep — Executive Briefing

If an exec sponsor is attending, prepare a separate 1-page brief:

- What they care about: business impact and strategic alignment
- What they don't care about: product features, UI changes, support tickets
- How to handle the "should we renew?" question if it comes up
- Potential landmines to anticipate based on account history

---

## 📄 Output Format

Produce in Markdown by default. Flag if the user wants slides (suggest exporting to solo-studio for Remotion/Figma output).

---

## 📂 System Integration

- **Output**: Save to `data/1-Projets/clients/[Client]/QBR-Q[X]-[Year].md`
- **Renewal Flag**: If renewal is < 90 days, flag in pipeline review as high-priority
- **Expansion Pipeline**: Add expansion opportunities to `data/1-Projets/active-deals/` as new opportunities

## 📚 References

- `references/qbr-template.md`: Full QBR template with field-by-field guidance.
- `references/roi-translation-guide.md`: Formulas for converting product usage into business outcomes.
- `references/expansion-signals.md`: Behavioral and usage patterns that indicate expansion readiness.

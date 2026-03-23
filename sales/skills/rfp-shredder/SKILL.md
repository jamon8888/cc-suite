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

1.  **Load Context**: Read `data/2-Domaines/sales-profile.json` (Product Info).
2.  **Load Templates**: Read `references/response-templates.md`.
3.  **Draft Answers**:
    - If question is standard ("Data Privacy"), paste the GDPR snippet.
    - If question is specific ("Do you integrate with Legacy System X?"), draft a "Partial" answer emphasizing API capabilities.

## 📂 System Integration

- **Language Logic**:
  - Check `sales-profile.json` or PDF language.
  - If French: Use "Appel d'Offres", "Cahier des Charges", "RGPD".
- **ICP Alignment**:
  - Load `data/2-Domaines/icp.json`.
  - If the RFP asks for features NOT in your ICP (e.g. Enterprise Customization for a SMB tool), flag as NO-GO.

## 📚 References

- `references/red-flags.md`: List of terms that kill deals.
- `references/scoring-matrix.md`: The math behind the decision.
- `references/response-templates.md`: Standard answers for Security, SLA, Support.

---

## 🔬 Sentinel Integration (when installed)

```python
SENTINEL_ROOT = "${CLAUDE_PLUGIN_ROOT}/../sentinel-v8"
sentinel_installed = file_exists(f"{SENTINEL_ROOT}/.claude-plugin/plugin.json")
```

Skip this section entirely if `sentinel_installed` is False. RFP Shredder works identically without it.

### Trigger condition
Activate only when Phase 1 produces a **borderline score (50–79)**. 
- Score ≥ 80: Clear GO — Sentinel overhead not justified, proceed to Phase 2
- Score < 50: Clear NO-GO — Sentinel can't rescue a bad fit
- Score 50–79: Decision is genuinely uncertain — this is where bias causes the most damage

### What to run

**Step 1 — questioner (bid/no-bid bias check)**

Load bias IDs: `[7, 14, 18, 1]`
- ID 7: Sunk Cost ("we already spent 2 hours reading this")
- ID 14: Overconfidence ("we can make this work")
- ID 18: Status Quo ("we usually bid on RFPs like this")
- ID 1: Anchoring (score of 65 anchors team to "borderline GO")

Generate 3–4 questions targeting the real bid/no-bid factors:
- "Is there an incumbent? What evidence do you have that the buyer is genuinely open to switching?"
- "Who wrote this RFP — a real buyer or a procurement process? Have you spoken to anyone at this company?"
- "If you hadn't already read 30 pages of this RFP, would you bid on it based on this summary?"
- "What's your win rate on RFPs from buyers you've never met? Is that rate acceptable for the time investment here?"

**Step 2 — failure-finder (bid pre-mortem)**

For borderline GO decisions, invoke `failure-finder`:

> "You submitted the proposal. It's 90 days later. You lost. What happened?"

Generate 4 failure modes specific to RFP contexts:
- Hidden incumbent (RFP was written for someone else, you were never a real option)
- Relationship deficit (evaluation was won before the RFP was published, through conversations you weren't part of)
- Requirements mismatch (a must-have you marked Partial was actually disqualifying)
- Resource overcommit (team was stretched writing the response, quality suffered)

**Step 3 — calibration record**

For every GO decision (including clear GOs), record a calibration prediction:
> "Confidence you will win this RFP: [X%]"

Write to `../sentinel-v8/data/decision-ledger.json` via `calibration-coach`.
After 10+ RFPs: run `/sentinel-review` to see your actual win rate vs. stated confidence.

### Output format addition

For borderline scores, insert a **Bid Hygiene** section between the score and the recommendation:

```
## Bid Hygiene (Sentinel) — Score: [X]/100

Questions to answer before committing:
1. [questioner question — relationship status]
2. [questioner question — sunk cost check]
3. [questioner question — incumbent signal]

Pre-mortem top risk:
→ [highest likelihood failure mode] — Early warning: [signal to watch]

Decision: [GO / NO-GO]
Confidence recorded: [X%] — tracked for win-rate calibration.
```

### Standalone output (Sentinel not installed)
Standard Decision Memo with fit score, red flags, and GO / NO-GO recommendation. No change.

---

## 🛡️ Sentinel Integration

```python
SENTINEL_ROOT      = "${CLAUDE_PLUGIN_ROOT}/../sentinel-v8"
sentinel_installed = file_exists(f"{SENTINEL_ROOT}/.claude-plugin/plugin.json")
```

**Trigger**: After Phase 1 score is calculated, if score is 50–80 (borderline GO) OR any time score > 80 and a red flag was detected.
**Standalone mode**: Decision memo stands as-is.

### If Sentinel installed — Bid/no-bid hygiene check

**Step A — questioner** (`../sentinel-v8/agents/questioner.md`)

Pass `bias_ids: [7, 14, 18, 29]` (Sunk Cost, Overconfidence, Status Quo, Groupthink).

Ask 3 questions targeting bid/no-bid traps:

1. **Sunk cost check**: "You've read the RFP. That investment of time creates pull toward GO. If you received this RFP today and hadn't read it yet — knowing only the score and red flags — would you decide to read it?"

2. **Incumbent check**: "Is there any signal in the RFP that it was written with a specific vendor in mind? Custom requirements, specific certifications, unusual scoring weights?" (RFPs written around an incumbent account for ~40% of lost bids.)

3. **Relationship check**: "Do you have a contact at the buying organization who can tell you whether this is a real open competition or a compliance exercise?" If no: flag RISK.

**Step B — failure-finder** (`../sentinel-v8/agents/failure-finder.md`)

Mode 1 (pre-mortem) for any GO decision. Frame:
> "It's 90 days after submission. You lost the bid. What happened?"

Generate 4 failure modes specific to RFP sales:
- `incumbent_advantage` — the winner had a relationship you didn't know about
- `scope_mismatch` — you bid on what they asked, not what they actually need
- `price_miscalibration` — your price was outside their unstated budget ceiling
- `team_thin` — the proposal was strong but your delivery team didn't match the evaluation criteria

For each: likelihood (HIGH/MEDIUM/LOW) + prevent_by action you can take before submission.

**Step C — calibration record**

For every GO decision, record:
```json
{
  "decision": "RFP bid: [client/project]",
  "prediction": "Will win this bid",
  "confidence": <fit_score / 100 as float>,
  "review_date": "<expected award date>",
  "plugin": "sales/rfp-shredder"
}
```

Over time, calibration-coach tracks your actual RFP win rate vs your confidence scores — revealing whether your fit-score model is calibrated.

**Output integration** — insert between Phase 1 Decision Memo and Phase 2 Extraction:

```
## Bid/No-Go Hygiene (Sentinel)

**Pre-bid questions to answer before proceeding:**
1. [Sunk cost question]
2. [Incumbent signal question]
3. [Relationship question]

**Pre-mortem failure modes:**
| Risk | Likelihood | Prevention |
|------|-----------|------------|
| [Mode 1] | HIGH | [Action] |
| [Mode 2] | MEDIUM | [Action] |

**Prediction recorded** — win confidence: [fit_score]% — review: [award date]

---
```


## STEP 5 — SENTINEL INTEGRATION (after GO/borderline score)

```python
if sentinel_installed and fit_score >= 50:  # GO or borderline
    invoke("sentinel-v8: questioner")    → challenge the fit assumptions
    invoke("sentinel-v8: failure-finder") → surface why this RFP could blow up
```

Present before committing: "Sentinel raised: [top 2 challenges]. How do you respond before we invest in the full response?"

## STEP 6 — INCUMBENT DETECTION

Scan for language patterns that suggest the RFP was written around an existing vendor:

Red flags for incumbent-favoring specs:
- Overly specific tech requirements ("must integrate with [very specific legacy system]")
- Impossibly short delivery timelines (designed for vendor with existing infrastructure)
- Evaluation criteria that match a known competitor's exact differentiators
- Reference to "continuation of existing services" or "smooth transition from current provider"

If 2+ patterns detected: "⚠️ This RFP may be written for an incumbent. Consider: is this worth pursuing if the decision is pre-made?"


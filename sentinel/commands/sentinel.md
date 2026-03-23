---
name: sentinel
description: >
  Main decision analysis command. Routes to the right protocol based on
  stakes and complexity. Always starts with structure (MAP), adds layers
  as complexity increases. Questions and pre-mortem are complements,
  not the core.
allowed-tools: Read, Write
model: sonnet
---


<example>
user: "/sentinel Should I accept this acquisition offer for $18M?"
assistant: "[Runs triage -> FULL protocol -> structure-builder first, then questioner, reality-checker, failure-finder in parallel, then synthesis with calibration prediction]"
</example>

<example>
user: "/sentinel Which restaurant for the team dinner?"
assistant: "[Triage -> QUICK -> just asks 2-3 clarifying questions, no heavy analysis]"
</example>

# /sentinel - Decision Analysis

## Step 1: Triage — score inline

Assess the 5 dimensions from the user's description (score 1–5 each):

- **stakes** : How bad is a wrong decision? (1=trivial, 5=catastrophic)
- **complexity** : How many interdependent factors? (1=simple, 5=very complex)
- **time_pressure** : How urgent? (1=plenty of time, 5=deciding right now)
- **expertise** : How well does the user know this domain? (1=expert, 5=novice)
- **reversibility** : How hard to undo? (1=easy to reverse, 5=permanent)

**Optional modifiers:**
- **group** : Multiple decision-makers? (true/false) → +8.0 if true
- **advocacy_mode** : User is pitching rather than evaluating? → +5.0 if true
- **novelty** : How unprecedented is this decision? (1–5) → +(novelty−1) × 1.5
- **commitment_horizon** : Duration of commitment (1=days, 5=years+) → +(horizon−1) × 2.0

**Formula:**
```
expertise_score = 6 − expertise

total = (stakes × 3) + (complexity × 2) + (time_pressure × 1)
      + (expertise_score × 1.5) + (reversibility × 2)
      + modifiers

normalized = (total / 74.5) × 100
```

**Routing:**
```
time_pressure ≥ 5  →  RAPID_STRUCTURE
normalized ≥ 78    →  FULL
normalized ≥ 60    →  STANDARD
normalized ≥ 40    →  LITE
normalized ≥ 20    →  QUICK
otherwise          →  NO_PROTOCOL (just answer directly)
```

**Note on thresholds:** The cutoffs 40/60/78 are calibrated heuristics, not empirically derived boundaries. A decision scoring 59 is not meaningfully different from one scoring 61. Use the routing as a starting point — if context suggests a higher protocol is warranted (e.g., a LITE-scoring decision with an irreversible consequence), escalate. The triage score surfaces the relevant dimensions; the routing is a default, not a rule.

**Agent flags to activate:**
- `activate_group_facilitator` if group = true
- `activate_temporal_auditor` if commitment_horizon ≥ 2 OR protocol is FULL/STANDARD
- `activate_scope_checker` if protocol is FULL or STANDARD
- `reduce_reality_checker_confidence` if novelty ≥ 4
- `advocacy_mode_warning` if advocacy_mode = true

**Show triage result:**
```
Triage: stakes=[n] complexity=[n] time=[n] expertise=[n] reversibility=[n]
Score: [raw] → [normalized]%  |  Protocol: [RAPID_STRUCTURE / FULL / STANDARD / LITE / QUICK]
[active flags]
```

**Personal profile:** Read `data/bias-profile.json` if it exists.
Apply `always_add` bias IDs to pre-selection, `confidence_deflation` to MAP scores,
`timeline_multiplier` to estimates. Announce blind spot domain if relevant.

## Step 2: Route to protocol

Before routing, pre-select 7 bias IDs relevant to this decision and pass them to the questioner agent as context. Use this mapping (expanded in v8.1 with full Wikipedia catalog):

| Decision type signals | Bias IDs to pass |
|---|---|
| Financial / investment | 1 (Anchoring), 7 (Sunk Cost), 23 (Loss Aversion), 9 (Planning Fallacy), 44 (Optimism Bias), 59 (Disposition Effect), 63 (Escalation of Commitment) |
| M&A / acquisition | 1 (Anchoring), 44 (Optimism Bias), 9 (Planning Fallacy), 63 (Escalation), 76 (Survivorship Bias), 81 (Pro-Innovation Bias), 85 (G.I. Joe Fallacy) |
| People / hiring / team | 17 (Halo Effect), 15 (Groupthink), 27 (Attribution Error), 3 (Representativeness), 86 (Ingroup Bias), 48 (False Consensus), 66 (Shared Information Bias) |
| Strategy / expansion | 9 (Planning Fallacy), 6 (Narrow Framing), 15 (Groupthink), 1 (Anchoring), 71 (Groupshift), 76 (Survivorship Bias), 82 (System Justification) |
| Product / build-buy | 7 (Sunk Cost), 1 (Anchoring), 8 (Overconfidence), 51 (Default Effect), 57 (Additive Bias), 73 (Quantification Bias), 63 (Escalation) |
| Risk / crisis / emergency | 65 (Normalcy Bias), 18 (Neglect of Probability), 74 (Salience Bias), 84 (Ostrich Effect), 55 (Risk Compensation), 5 (Framing Asymmetry), 79 (Illusion of Control) |
| Innovation / technology | 81 (Pro-Innovation Bias), 50 (Automation Bias), 41 (Dunning-Kruger), 37 (Attribute Substitution), 72 (Illusion of Explanatory Depth), 68 (Availability Cascade), 57 (Additive Bias) |
| Group / committee decision | 15 (Groupthink), 71 (Groupshift), 66 (Shared Information Bias), 87 (Bandwagon Effect), 89 (Courtesy Bias), 48 (False Consensus), 95 (Bias Blind Spot) |
| Post-decision review | 92 (Hindsight Bias), 91 (Choice-Supportive Bias), 93 (Recency Bias), 14 (Outcome Bias), 28 (Self-Serving Bias), 85 (G.I. Joe Fallacy), 94 (Rosy Retrospection) |
| Default (unclear) | 1 (Anchoring), 7 (Sunk Cost), 8 (Overconfidence), 9 (Planning Fallacy), 15 (Groupthink), 44 (Optimism Bias), 95 (Bias Blind Spot) |

Pass the selected IDs to questioner as: `bias_ids: [n, n, n, n, n, n, n]`

**Merge personal profile overrides** (if bias-profile.json exists):
Add `always_add` bias IDs from profile to the pre-selected set.
Apply `confidence_deflation` and `timeline_multiplier` to all MAP outputs.
Announce blind spot domain if the decision falls in that category.

---

### RAPID_STRUCTURE — time_pressure ≥ 5 (REPLACES old QUICK_CHECK emergency override)

High time pressure = maximum bias risk. Structure is MORE needed, not less.
Target completion: 8-10 minutes.

1. **Framing neutralization**: One neutral sentence restatement of the decision
2. **scope-checker**: Quick proportionality test — is the response sized right?
3. **structure-builder**: 3 most critical dimensions only. Score independently.
4. **questioner**: Exactly 2 questions — the highest-risk assumption and the kill condition
5. **failure-finder**: 3 failure modes only (not 5-7 — time is genuinely short)
6. **Single decision gate**: "What one thing, if wrong, makes this clearly incorrect? Is it knowable now?"
7. Output: decision or "acquire X first"

Do NOT add temporal-auditor or group-facilitator in RAPID_STRUCTURE.
Do NOT run reality-checker (base rates take time to present properly).

---

### QUICK (normalized_score < 40)
Low-stakes, reversible, simple.

1. **questioner**: 2-3 quick verification questions
2. Done. Don't over-analyze small decisions.

---

### LITE (normalized_score 40-60)

1. **questioner**: 3-4 targeted questions
2. **scope-checker**: Proportionality check (lightweight)
3. Record prediction if stakes ≥ 3: Read `data/decision-ledger.json`, append entry, Write `data/decision-ledger.json`

---

### STANDARD (normalized_score 60-78)

1. **structure-builder**: 3-4 dimensions, MAP scoring
2. **questioner**: 4-5 questions targeting lowest-confidence dimensions + logic check
3. **scope-checker**: Full proportionality test
4. **temporal-auditor**: If `activate_temporal_auditor = true` (commitment_horizon ≥ 2)
5. Record prediction: Read `data/decision-ledger.json`, append entry with predicted_probability + review_date, Write `data/decision-ledger.json`. Then surface to the user: "Prediction recorded. Review date: [date]. Run `/sentinel-post [decision-id]` then to close the loop."

Output: structured comparison + key questions + prediction

---

### FULL (normalized_score ≥ 78)

1. **structure-builder**: 4-5 dimensions, full MAP scoring (PARALLEL with questioner)
2. **questioner**: 5-7 questions + logic check + explanatory depth probe
3. **reality-checker**: Base rates + survivorship audit + reference class + sources
4. **failure-finder**: Full pre-mortem (5-7 failure modes) + steelman of losing option
5. **scope-checker**: Full proportionality test
6. **temporal-auditor**: Always on FULL (commitment horizon audit)
7. **group-facilitator**: If `activate_group_facilitator = true` — generate Phase 1 sheets + meeting guide
8. **noise-calculator**: If 3+ options with numeric MAP scores diverging by > 2 points
9. **Disruption mode**: Apply one random disruption intervention (see CLAUDE.md)
10. Record prediction + set review date: Read `data/decision-ledger.json`, append entry, Write `data/decision-ledger.json`. Surface to user: "Prediction recorded (confidence: [X]%). Review date: [date]. Run `/sentinel-post [decision-id]` then."

Output: Full analysis with synthesis

> NOTE: logic-tester is NO LONGER a separate step in FULL protocol. questioner now includes a
> `logic_check` section covering the strongest argument's hidden premises.
> Invoke logic-tester as a standalone agent only if the user explicitly asks for argument verification.

---

### New agent activation summary (v8.1)

| Agent | When activated |
|---|---|
| temporal-auditor | FULL always; STANDARD if horizon ≥ 2; any commitment > 12 months |
| group-facilitator | `group=true` flag; or /sentinel-group command |
| scope-checker | STANDARD + FULL; any resource allocation decision |
| [disruption mode] | FULL always (one random intervention) |



## Step 3: Synthesis

After all agents run, provide a SYNTHESIS that:
- States the MAP result (scores + confidence)
- Highlights the most important QUESTIONS (from questioner)
- Shows the reality gap (from reality-checker)
- Lists top 3 failure modes (from failure-finder)
- Ends with: "Before deciding, answer these [2-3] questions first."

**Template offer (always append after synthesis):**
Based on the active domain skill, offer the most relevant template to fill out:

| Active domain | Primary template to offer | Read from |
|---|---|---|
| hiring | candidate-scorecard | `skills/hiring/templates/candidate-scorecard.md` |
| ma | ma-target-evaluation | `skills/ma/templates/ma-target-evaluation.md` |
| ma (committee) | noise-audit-committee | `skills/ma/templates/noise-audit-committee.md` |
| ma (integration) | integration-premortem | `skills/ma/templates/integration-premortem.md` |
| product-management | feature-scorecard | `skills/product-management/templates/feature-scorecard.md` |
| retrospective | postmortem-scorecard | `skills/retrospective/templates/postmortem-scorecard.md` |
| strategy-marketing | campaign-premortem | `skills/strategy-marketing/templates/campaign-premortem.md` |
| none / generic | decision-record | `templates/decision-record.md` |

After synthesis output, add:
```
📋 TEMPLATE AVAILABLE
Based on this analysis, I can fill in [template-name] using the MAP scores and
failure modes above. Say "fill the template" to generate a completed document,
or "skip" to continue without it.
```

When user says "fill the template": Read the template file, populate all fields
using data from the session (MAP scores, failure modes, predictions, questions),
and Write the completed document to `data/1-Projets/[decision-id]-[template-name].md`.

## CRITICAL: Structure FIRST, questions SECOND

The structure-builder (MAP) runs BEFORE or IN PARALLEL with the questioner.
This is the key architectural choice: the structure forces independent
evaluation, and the questions fill in the gaps the structure reveals.

Previous versions ran bias-scanning first. That's backwards.
Choice architecture first, debiasing questions second.

## Language
Detect and respond in the user's language.

## Honesty clause
If the decision is obvious and doesn't need analysis, say so:
"This doesn't need Sentinel. Just [do X]."
Don't over-process simple choices.

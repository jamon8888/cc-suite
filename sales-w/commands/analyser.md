---
description: "Analyse win/loss -> compilee dans ta base wiki. Detecte les patterns."
argument-hint: "[company name] or 'patterns'"
allowed-tools: Read, Write, Glob
model: sonnet
---

# /sales:analyser

Turn every closed deal into institutional knowledge. Run a single deal post-mortem or analyze patterns across multiple outcomes.

## Usage

```
/sales:analyser                         # Prompts for a deal to analyze
/sales:analyser Acme                    # Post-mortem on a specific deal
/sales:analyser patterns                # Pattern analysis across all closed deals
/sales:analyser playbook                # View or update the win-loss playbook
```

---

## How It Works

```
+------------------------------------------------------------------+
|                        WIN-LOSS ANALYZER                          |
+------------------------------------------------------------------+
|  ALWAYS (works standalone)                                        |
|  * 5-question debrief: fast, structured post-mortem              |
|  * Root cause analysis: 5 Whys + 6 loss categories               |
|  * Last Recoverable Moment: when could you have changed it?      |
|  * Lessons saved to win-loss-playbook.md                         |
|  * Pattern analysis across 5+ deals                              |
+------------------------------------------------------------------+
|  SUPERCHARGED (when you connect your CRM)                         |
|  + Pull deal history automatically                                |
|  + Statistical patterns across 50+ deals                         |
|  + Segment by rep, vertical, deal size, competitor               |
+------------------------------------------------------------------+
```

---

### Prelude: Resolve Wiki

1. **HUB**: Try `$HOME/sales-wiki/_index.md`. If exists -> HUB = `$HOME/sales-wiki`. Else read `~/.config/llm-sales-wiki/config.json` and use `resolved_path`. If no config -> HUB = `$HOME/sales-wiki`.
2. **Wiki**: `--wiki <name>` -> lookup `HUB/wikis.json` | else -> HUB.
3. If wiki missing: proceed without wiki enrichment, but suggest creating wiki for pattern storage.

---

## Mode 1: Single Deal Post-Mortem

Run immediately after a deal closes. Takes 5-10 minutes.

**I'll ask you**:
1. The outcome (Won / Lost / No Decision)
2. The deal size and stage at close
3. The stated reason for the outcome
4. Who the competition was (if applicable)
5. One thing you'd do differently

**You'll get**:
- Root cause classification (which of the 6 categories)
- The Last Recoverable Moment -- when could you have changed the outcome?
- 3 actionable lessons
- Competitive intel flagged for the competitive matrix
- A saved post-mortem in `data/4-Archives/win-loss/`

---

## Mode 2: Pattern Analysis

Run at the end of each quarter, or whenever you want to understand why you're winning and losing at the rate you are.

**What you provide**:
- Option A: Description of 5+ recent outcomes (brief summaries)
- Option B: CSV export from your CRM
- Option C: "Use the deal files already in `data/4-Archives/win-loss/`"

**You'll get**:
- Loss category distribution (where are deals dying and why?)
- Competitive win rate matrix
- Ideal deal profile (ICP insight from wins)
- Top 3 recommended process changes

---

## Mode 3: Playbook Review

```
/sales:analyser playbook
```

Opens the win-loss playbook (`data/win-loss-playbook.md`) and offers to:
- Summarize current lessons
- Identify gaps (categories with < 3 data points)
- Suggest which skill to practice based on current loss patterns

---

## Output Examples

### After a loss

```
# Post-Mortem: TechCorp
Status: Lost to Competitor X
Deal Size: $45K

Root Cause: Access Gap -- we never reached the CFO.
Our champion (VP Engineering) could not defend our price
without financial framing at the executive level.

Last Recoverable Moment: Week 6, after the second demo.
We had the opportunity to request an executive briefing
but didn't push for it.

Lessons:
1. Ask for the exec meeting by week 4 on deals > $25K
2. Build the ROI model before proposal, not after
3. When champion goes quiet for > 5 days, run champion-builder assessment

Competitive Intel: Competitor X claimed native ERP integration.
Flagged for competitive-intelligence refresh.
```

---

## Related Skills

- **win-loss-analyzer** -- The underlying skill powering this command
- **competitive-intelligence** -- Gets updated with competitor data from post-mortems
- **icp-creator** -- Gets updated when win patterns suggest ICP drift
- **roleplay-dojo-agent** -- Practice the scenarios that match your recurring loss patterns

---

### Wiki Compilation

After win-loss analysis is complete:
1. Ingest the analysis into `raw/notes/YYYY-MM-DD-winloss-<deal>.md` as a wiki source
2. If 5+ analyses accumulated, compile into wiki articles (patterns, recurring objections, winning segments)
3. Archive deal project to `output/projects/.archive/<deal>/`
4. Report: "Analyse ingeree dans ta base wiki. Apres N+ analyses, les patterns emergent."

---
description: "Vue pipeline + sante des deals."
argument-hint: "[review | forecast | stale | board-deck]"
allowed-tools: Read, Write, Glob
model: sonnet
---

# /sales:pipeline

The **Pipeline Guardian** acts as your fractional VP of Sales. It audits deal health, forecasts revenue with weighted probabilities, and prepares you for board/team reviews.

It operates in **Hybrid Mode**:

- **Offline**: Reads `data/1-Projets/active-deals/`.
- **Online**: Syncs with CRM (HubSpot, Pipedrive) if connected.

---

## Usage

```
/sales:pipeline review       # Full Deal Health Audit
/sales:pipeline forecast     # Revenue Projection (Commit vs Upside)
/sales:pipeline stale        # "Fix or Kill" Analysis (Deals >14 days inactive)
/sales:pipeline board-deck   # Generate slides text for QBR/Weekly meeting
```

---

## How It Works

```
+------------------------------------------------------------------+
|                    PIPELINE GUARDIAN                               |
+------------------------------------------------------------------+
|  STANDALONE (always works)                                        |
|  * Health Scoring: Velocity, Recency, and Depth analysis         |
|  * Markdown Tracker: Local deal management in PARA structure     |
|  * Risk Detection: Auto-flagging of stale or single-thread deals |
|  * Review Prep: Auto-generated agenda for deal reviews           |
|  * Prioritization: rank deals by impact and closability          |
|  * Hygiene audit: missing data, bad close dates, single-thread   |
|  * Weekly action plan: what to focus on                          |
+------------------------------------------------------------------+
|  SUPERCHARGED (when you connect your tools)                       |
|  + CRM: Bi-directional sync with HubSpot/Pipedrive              |
|  + email: Scan inbox for "Ghosting" signals                      |
|  + calendar: Auto-schedule "Rescue Calls" for at-risk deals      |
|  + Activity data for engagement scoring                          |
|  + Historical patterns for risk prediction                       |
+------------------------------------------------------------------+
```

---

### Prelude: Resolve Wiki

1. **HUB**: Try `$HOME/sales-wiki/_index.md`. If exists -> HUB = `$HOME/sales-wiki`. Else read `~/.config/llm-sales-wiki/config.json` and use `resolved_path`. If no config -> HUB = `$HOME/sales-wiki`.
2. **Wiki**: `--wiki <name>` -> lookup `HUB/wikis.json` | else -> HUB.
3. If wiki missing: proceed with local deal data only.

### Wiki Enrichment

For each deal in the pipeline:
1. Check `output/projects/<deal>/` for wiki research files
2. Grep wiki `topics/` for account name and related terms
3. Attach wiki confidence scores and freshness to deal health assessment
4. Flag deals with stale or missing wiki research: "Recherche obsolete sur [compte]. Relancer /sales:recherche ?"

---

## /sales:pipeline review

**The Monday Morning Audit.**

### Pipeline Health Score

| Dimension | Score | Issue |
|-----------|-------|-------|
| **Stage Progression** | [X]/25 | [X] deals stuck in same stage 30+ days |
| **Activity Recency** | [X]/25 | [X] deals with no activity in 14+ days |
| **Close Date Accuracy** | [X]/25 | [X] deals with close date in past |
| **Contact Coverage** | [X]/25 | [X] deals single-threaded |

### Output Example

```markdown
PIPELINE HEALTH CHECK — [Date]

SCORES

- Total Pipeline: $185,000
- Weighted Forecast: $62,500
- Average Health Score: 72/100

CRITICAL RISKS (Action Required)

| Deal      | Value | Risk Factor     | Recommendation                                                   |
| :-------- | :---- | :-------------- | :--------------------------------------------------------------- |
| Acme Corp | $45k  | Single-Threaded | You only know Sarah. Action: Ask Sarah for intro to CFO.         |
| Beta Inc  | $15k  | Stale (14d)     | No reply to proposal. Action: Send "Breakup Email".              |
| Gamma Co  | $80k  | Push Date       | Close date changed 3x. Action: Re-qualify valid business reason. |

HEALTHY DEALS

- Delta Ltd ($25k): Contract in legal. Close expected Feb 28.
- Epsilon ($10k): Demo scheduled with decision maker.

Suggestion: Run `/sales:negocier` on Acme Corp to fix the single-threading?
```

---

## /sales:pipeline review (Deep Review Mode)

### What I Need From You

**Option A: Upload a CSV**
Export your pipeline from your CRM (e.g. Salesforce, HubSpot). Helpful fields:
- Deal/Opportunity name, Account name, Amount, Stage
- Close date, Created date, Last activity date
- Owner (if reviewing a team), Primary contact

**Option B: Paste your deals**
```
Acme Corp - $50K - Negotiation - closes Jan 31 - last activity Jan 20
TechStart - $25K - Demo scheduled - closes Feb 15 - no activity in 3 weeks
```

**Option C: Describe your pipeline**
"I have 12 deals. Two big ones in negotiation that I'm confident about..."

### Priority Actions This Week

### 1. [Highest Priority Deal]
**Why:** [Reason -- large, closing soon, at risk, etc.]
**Action:** [Specific next step]
**Impact:** $[X] if you close it

### Deal Prioritization Matrix

#### Close This Week (Focus Time Here)
| Deal | Amount | Stage | Close Date | Next Action |
|------|--------|-------|------------|-------------|

#### Close This Month (Keep Warm)
| Deal | Amount | Stage | Close Date | Status |
|------|--------|-------|------------|--------|

#### Nurture (Check-in Periodically)
| Deal | Amount | Stage | Close Date | Status |
|------|--------|-------|------------|--------|

### Risk Flags

#### Stale Deals (No Activity 14+ Days)
| Deal | Amount | Last Activity | Days Silent | Recommendation |
|------|--------|---------------|-------------|----------------|

#### Stuck Deals (Same Stage 30+ Days)
| Deal | Amount | Stage | Days in Stage | Recommendation |
|------|--------|-------|---------------|----------------|

#### Past Close Date
| Deal | Amount | Close Date | Days Overdue | Recommendation |
|------|--------|------------|--------------|----------------|

#### Single-Threaded (Only One Contact)
| Deal | Amount | Contact | Risk | Recommendation |
|------|--------|---------|------|----------------|

### Hygiene Issues

| Issue | Count | Deals | Action |
|-------|-------|-------|--------|
| Missing close date | [X] | [List] | Add realistic close dates |
| Missing amount | [X] | [List] | Estimate or qualify |
| Missing next step | [X] | [List] | Define next action |

### Pipeline Shape

#### By Stage
| Stage | # Deals | Value | % of Pipeline |
|-------|---------|-------|---------------|

#### By Close Month
| Month | # Deals | Value |
|-------|---------|-------|

#### By Deal Size
| Size | # Deals | Value |
|------|---------|-------|

### Deals to Consider Removing

| Deal | Amount | Reason | Recommendation |
|------|--------|--------|----------------|

---

## /sales:pipeline forecast

**The Revenue Call.**

### Output Example

```markdown
Q1 FORECAST (Conservative View)

| Category | Deals Included | Total Value | Weighted |
| :------- | :------------- | :---------- | :------- |
| COMMIT   | Delta, Zeta    | $45,000     | $42,500  |
| UPSIDE   | Acme, Gamma    | $125,000    | $50,000  |
| PIPE     | Beta, Epsilon  | $25,000     | $5,000   |
| TOTAL    |                | $195,000    | $97,500  |

TARGET ANALYSIS

- Quota: $100,000
- Forecast (Commit + Upside): $92,500
- Gap: -$7,500

Strategy: You are slightly short.

1. Pull Gamma ($80k) forward? (Low probability)
2. Converting Beta ($15k) is safer. Focus there.
```

---

## Prioritization Framework

| Factor | Weight | What I Look For |
|--------|--------|-----------------|
| **Close Date** | 30% | Deals closing soonest get priority |
| **Deal Size** | 25% | Bigger deals = more focus |
| **Stage** | 20% | Later stage = more focus |
| **Activity** | 15% | Active deals get prioritized |
| **Risk** | 10% | Lower risk = safer bet |

You can tell me to weight differently: "Focus on big deals over soon deals" or "I need quick wins, prioritize close dates."

---

## Agent Instructions

### Health Scoring Algorithm

```python
def calculate_deal_health(deal):
    score = 100

    # 1. Activity Decay
    days_since_touch = (today - deal.last_activity).days
    if days_since_touch > 7: score -= 10
    if days_since_touch > 14: score -= 20

    # 2. Stakeholder Risk
    if deal.contacts_count < 2 and deal.stage > "Discovery":
        score -= 20 # Single thread risk

    # 3. Velocity Risk
    if deal.time_in_stage > avg_time_in_stage[deal.stage]:
        score -= 15 # Stalled

    return score
```

### Stale Deal Remediation

If a deal is marked "Stale":

1.  **Check Phase**:
    - If Early Stage -> "Did I miss the mark" email.
    - If Late Stage -> "File Close" (Breakup) email.
2.  **Auto-Draft**: The agent should offer to draft this email immediately.
3.  **CRM Sync**: If connected, verify if activity happened but wasn't logged.

---

## Connectors (Advanced)

If you have `hubspot-sync` enabled in `.mcp.json`:

- The agent will pull `deal_stage`, `amount`, `close_date` from HubSpot.
- It will **Push** any changes you make in the Markdown files back to HubSpot.
- It will NOT overwrite your notes unless explicitly told to.

---

## Tips

1.  **Sandbagging**: Don't put deals in "Commit" until they are virtually signed.
2.  **The "Why"**: For every deal in Commit, ask: "Why would they buy NOW?" If you can't answer, it's Upside.
3.  **Clean Data**: Garbage in, garbage out. If close dates are in the past, the forecast is useless.
4.  **Review weekly**: Pipeline health decays fast. Weekly reviews catch issues early.
5.  **Kill dead deals**: Stale opportunities inflate your pipeline and distort forecasts.
6.  **Multi-thread everything**: If one person goes dark, you need a backup contact.
7.  **Close dates should mean something**: A close date is when you expect signature, not when you hope for one.

---

## Skills Used

- `pipeline-guardian` — The health scoring engine.
- `financial-health` — The math module.
- `hubspot-sync` — The integration layer.

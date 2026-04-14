---
name: territory-planner
description: "This skill should be used when the user asks to 'plan my territory', 'segment my accounts', or 'who should I focus on'."
---

# Skill: Territory Planner

Stop working every account equally. Build a system that tells you exactly where to spend your time.

```
┌─────────────────────────────────────────────────────────────────┐
│  STANDALONE (always works)                                      │
│  ✓ Account segmentation: Tier accounts by fit + potential       │
│  ✓ Coverage gap analysis: Find whitespace in your territory     │
│  ✓ Workload balancing: Right number of accounts per rep         │
│  ✓ Attack plan: Weekly/monthly focus priorities                 │
│  ✓ Bilingual (EN/FR): adapts to sales-profile.json language    │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (connect ~~hubspot / ~~close / ~~clay)            │
│  + Pull live account data (no manual input)                     │
│  + Enrich with firmographic signals (headcount, funding, tech)  │
│  + Auto-assign accounts based on rep capacity                   │
│  + Track territory performance over time                        │
└─────────────────────────────────────────────────────────────────┘
```

## 🧠 Core Philosophy

1. **Not all accounts are equal**: 20% of your territory will generate 80% of revenue. Find them first.
2. **Coverage ≠ Activity**: Sending emails is not the same as covering a territory. Coverage means a deliberate decision about every account.
3. **A territory plan is a bet**: You are betting your time on certain accounts. Make the bet explicit and revisit it quarterly.
4. **Whitespace is opportunity**: Accounts with no recent activity and high fit score are your fastest wins.

---

## 🛠 Agent Instructions

### Phase 1: Account Segmentation

**Trigger**: "Segment my accounts." / "Tier my territory."

**Steps**:

1. **Load Account Data automatically**:
   ```python
   deals = glob("data/1-Projets/active-deals/*.md")   # read all existing deal files
   icp   = read("data/icp.json")
   ```
   Report: "Found [N] accounts in active-deals/. Scoring them now."
   
   Only ask user for accounts if no deal files exist: "No accounts found — paste a list (Name, Industry, Size, Last Contact) to get started."
   
   Add quarterly review trigger at end of output:
   > "Territory plan valid through [date + 90 days]. Set a reminder for Q+1 review: `/sales:pipeline territory`"


2. **Score Each Account** using the ICP Fit × Potential Matrix (see `references/scoring-matrix.md`):

   ```python
   def score_account(account, icp):
       fit_score = calculate_icp_fit(account, icp)       # 0-100: how well they match ideal profile
       potential_score = calculate_potential(account)    # 0-100: revenue upside
       recency_score = calculate_recency(account)        # 0-100: engagement freshness

       # Weighted composite
       total = (fit_score * 0.45) + (potential_score * 0.35) + (recency_score * 0.20)
       return round(total, 1)

   def calculate_icp_fit(account, icp):
       signals = []
       if matches_industry(account, icp): signals.append(25)
       if matches_size(account, icp):     signals.append(25)
       if matches_geography(account, icp): signals.append(20)
       if matches_tech_stack(account, icp): signals.append(20)
       if has_pain_signals(account, icp): signals.append(10)
       return sum(signals)

   def calculate_potential(account):
       # Proxy signals when no CRM data
       size_proxy = map_headcount_to_score(account.headcount)
       growth_proxy = 20 if account.funding_stage in ["Series B", "Series C", "Growth"] else 0
       budget_proxy = 20 if account.industry in high_budget_industries else 0
       return min(size_proxy + growth_proxy + budget_proxy, 100)
   ```

3. **Assign Tier**:

   | Tier | Score | Label | Cadence |
   |------|-------|-------|---------|
   | **T1** | 75–100 | Must Win | Weekly touchpoint |
   | **T2** | 50–74 | Should Win | Bi-weekly touchpoint |
   | **T3** | 25–49 | Could Win | Monthly touchpoint |
   | **T4** | 0–24 | Nurture/Drop | Quarterly or drop |

4. **Output**: Account Tier Map. See output format in Phase 4.

---

### Phase 2: Coverage Gap Analysis

**Trigger**: "Find my coverage gaps." / "Where am I not covering?"

**Steps**:

1. **Map Current State**:
   ```python
   all_accounts = load_all_accounts()
   active_accounts = [a for a in all_accounts if a.last_contact_days < 30]
   dormant_accounts = [a for a in all_accounts if a.last_contact_days >= 60]
   never_touched = [a for a in all_accounts if a.last_contact is None]

   # The gap = high-fit accounts with no recent activity
   whitespace = [a for a in dormant_accounts + never_touched
                 if calculate_icp_fit(a, icp) >= 60]
   ```

2. **Identify Gap Types** (see `references/coverage-playbook.md`):
   - **Whitespace**: High-fit, never contacted → fastest ROI to close
   - **Dormant Champions**: Previously engaged, gone quiet → re-engage with trigger event
   - **Shallow Coverage**: Active but only 1 contact in a multi-stakeholder account → expand
   - **Wrong-Level Coverage**: Only talking to end users, not Economic Buyers → elevate

3. **Prioritize Gaps**: Sort whitespace by ICP Fit Score descending. Top 10 = immediate outreach queue.

4. **Output**: Gap report with accounts grouped by gap type and recommended next action per account.

---

### Phase 3: Workload Balancing (Team Use)

**Trigger**: "Balance the territory across the team." / "Assign accounts to reps."

**Steps**:

1. **Define Capacity**:
   ```python
   capacity_per_rep = {
       "T1_accounts": 15,    # Maximum T1 accounts a rep can work well
       "T2_accounts": 30,    # T2 accounts
       "T3_accounts": 60,    # T3 accounts (lighter touch)
       "total_cap": 105      # Approximate total
   }
   ```

2. **Load Rep Profiles**: From `data/sales-profile.json` or user input:
   - Skills (hunter vs. farmer)
   - Existing relationships in accounts
   - Geographic proximity (if relevant)
   - Industry expertise

3. **Assign Logic**:
   - Match T1 accounts to reps with highest relevant industry expertise
   - Distribute T2/T3 evenly by geography or vertical
   - Flag overloaded reps (> 110% capacity) and underloaded reps (< 70% capacity)

4. **Output**: Assignment table with capacity utilization % per rep and flag for imbalances.

---

### Phase 4: Attack Plan Generation

**Trigger**: "Build my territory plan." / "What should I focus on this month?"

**Steps**:

1. **Combine all prior phases** into a single strategic document.

2. **Generate Focus List**:
   ```python
   this_week = T1_accounts[:5]           # 5 T1 accounts, active pipeline moves
   this_month_new = whitespace[:10]       # 10 whitespace accounts to open
   this_month_reactivate = dormant[:5]    # 5 dormant champions to revive
   ```

3. **Time Allocation Recommendation**:

   | Focus Area | % of Week | Hours (40hr week) |
   |------------|-----------|-------------------|
   | T1 pipeline advancement | 40% | 16h |
   | New whitespace outreach | 25% | 10h |
   | Dormant reactivation | 15% | 6h |
   | T2 nurture | 10% | 4h |
   | Admin + CRM hygiene | 10% | 4h |

4. **Save Plan**: Write to `data/territory-plan-[YYYY-MM].md`.

---

## 📄 Output Format

### Territory Tier Map

```markdown
# Territory Plan — [Rep Name] — [Month YYYY]

**Total Accounts**: [N]
**Coverage**: [N] active / [N] dormant / [N] untouched

---

## Tier 1 — Must Win ([N] accounts)
| Account | ICP Fit | Potential | Last Contact | Next Action |
|---------|---------|-----------|--------------|-------------|
| Acme Corp | 92 | High | 5 days ago | Send proposal by Friday |
| BetaCo | 88 | High | 12 days ago | Book exec alignment call |

## Tier 2 — Should Win ([N] accounts)
| Account | ICP Fit | Potential | Last Contact | Next Action |
|---------|---------|-----------|--------------|-------------|
| ...     | ...     | ...       | ...          | ...         |

## Whitespace (Top 10 — Immediate Outreach)
| Account | ICP Fit | Why Now | Recommended Opener |
|---------|---------|---------|-------------------|
| ...     | ...     | ...     | ...               |

---

## ⚠️ Alerts
- [Account X]: T1, no activity in 21 days — at risk of going cold
- [Account Y]: Champion left company — re-map stakeholders
- [Rep Z]: 127 accounts assigned — overloaded, recommend offloading 20 T3s

---

## This Week's Focus (Top 5 Actions)
1. [Action — Account — Why]
2. ...
```

---

## 📂 System Integration

- **ICP**: Load `data/icp.json` for fit scoring criteria
- **Sales Profile**: Load `data/sales-profile.json` for language + methodology
- **Deals**: Read `data/1-Projets/active-deals/` for pipeline context
- **Output**: Save plan to `data/territory-plan-[YYYY-MM].md`
- **Quarterly Review**: Flag for `win-loss-analyzer` if territory plan assumptions diverge from actual outcomes after 90 days

---

## 📚 References

- `references/scoring-matrix.md`: Full ICP Fit × Potential scoring rubric with weightings.
- `references/coverage-playbook.md`: Gap types, re-engagement scripts, and whitespace prioritization.
- `references/territory-plan-template.md`: Standard output format for monthly territory plans.

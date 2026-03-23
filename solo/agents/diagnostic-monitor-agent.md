---
name: diagnostic-monitor-agent
description: >
  Weekly diagnostic intelligence agent. Scans all active diagnostics, surfaces new
  responses, flags routing actions, and delivers a diagnostic digest to monday-morning-agent.
  Runs every Monday at 8:45 AM — 15 minutes before monday-morning-agent fires.
model: sonnet
tools: ["Read", "Write", "Glob"]
color: purple
---

# Agent: Diagnostic Monitor

Runs at 8:45 AM Monday — 15 minutes before monday-morning-agent. Output is written to disk so monday-morning-agent can read it at 9:00 AM.

## STEP 0 — DISCOVER ACTIVE DIAGNOSTICS

```python
# Scan — do not ask user to name diagnostics
active_diagnostics = glob("data/2-Domaines/diagnostics/*.json")
response_files     = glob("data/1-Projets/diagnostics/responses/*.md")
last_run_timestamp = read("data/1-Projets/diagnostics/last-run.txt")
```

If no diagnostics found: write to digest file "No active diagnostics found." and exit.

Report:
```
Active diagnostics found: [N]
Response files to process: [N total] | [N new since last run]
Last run: [timestamp or "first run"]
```

## STEP 1 — PROCESS NEW RESPONSES (since last run)

For each response file newer than last_run_timestamp:

```
Score against diagnostic framework:
  - Total score: [N/100]
  - Band: [High / Medium / Low / Disqualified]
  - Dimension breakdown: [per dimension score]
  - Key finding: [the dimension scoring lowest/highest]
```

Update `data/1-Projets/diagnostics/last-run.txt` with current timestamp.

## STEP 2 — ROUTE BY BAND

| Band | Score | Routing action |
|------|-------|---------------|
| **High** | >70 | → Add to pipeline (Prospect stage), flag for outreach today |
| **Medium** | 40-70 | → Add to nurture sequence, scheduled outreach in 7 days |
| **Low** | 20-40 | → Long-term nurture only, no direct outreach |
| **Disqualified** | <20 | → Remove from active pipeline, archive |

For High-band responses: generate outreach draft based on their lowest-scoring dimension.
"Your response shows [X] is your biggest challenge. Here's how I typically help with that: [2-3 specific approaches]. Worth 20 minutes?"

## STEP 3 — AGGREGATE PATTERNS (if 5+ total responses)

When there are 5+ responses, surface patterns across the dataset:

```
Pattern analysis:
  Most common weak dimension: [Dimension X — N% of responses score <40 here]
  Most common trigger to respond: [if trackable from source field]
  Avg score: [N/100] → [above/below lead-qualifier threshold of 50]

Content implication: "[Dimension X] is a consistent pain — consider a LinkedIn post or newsletter on this topic to attract more of this audience."
```

## STEP 4 — CLIENT HEALTH DIAGNOSTICS

If any responses are from existing clients (check against clients/ folder):

```
Client health signal:
  [Client name] scored [N/100] on health diagnostic
  Weakest dimension: [X]
  Flag: [🔴 At-risk if <40 / 🟡 Watch if 40-60 / 🟢 Healthy if >60]
  Recommended action: [proactive check-in within [N] days]
```

## STEP 5 — WRITE DIGEST FOR MONDAY-MORNING-AGENT

**This is the primary output.** Write to disk so monday-morning-agent reads it at 9:00 AM.

```
WRITE data/1-Projets/diagnostics/digest-latest.md
```

```markdown
# Diagnostic Digest — [Date]
Generated: [timestamp] — for monday-morning-agent

## Summary
New responses processed: [N]
High-band leads: [N] — [names/companies]
At-risk clients flagged: [N] — [names]

## High-Band Leads (action required today)
[Per lead: company, score, weakest dimension, outreach draft]

## Client Health Flags
[Per client: name, score, flag level, recommended action]

## Patterns This Week
[If 5+ responses: dimension patterns + content opportunity]

## Pipeline Actions
[Specific entries to add to pipeline.md]
```

## STEP 6 — CONSOLE SUMMARY

```
✅ Diagnostic monitor complete — [time]
Processed: [N] new responses
High-band: [N] leads flagged
At-risk: [N] clients flagged
Digest written: data/1-Projets/diagnostics/digest-latest.md
→ monday-morning-agent will read this in [N] minutes
```

---

## Operational Rules
- Auto-discover diagnostics from filesystem — never ask user to name them
- Write digest to disk — the monday-morning-agent handoff depends on this file existing
- Pattern analysis only when ≥5 responses — never extrapolate from 1-2
- High-band outreach draft is specific to their lowest dimension, not generic

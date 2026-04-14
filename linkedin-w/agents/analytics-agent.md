---
name: analytics-agent
description: >
  Scrapes engagement stats via Chrome, runs learning engine analysis, handles
  autoresearch experiments. Trigger with "analyser", "analytics", "performance",
  "experiment".
model: sonnet
tools: ["Read", "Write"]
color: red
---

# Analytics Agent

## Parse Arguments

- No args or "stats": Run engagement scraping + learning analysis
- "experiment" or "test": Run autoresearch experiment
- "experiment --auto": Schedule weekly experiment cycle

## Workflow 1: Engagement Scraping + Learning

### Step 1: Scrape

1. Read `${CLAUDE_PLUGIN_ROOT}/data/linkedin-profile.json` → profile_url
2. Invoke chrome-linkedin Procedure 3 (Scrape Engagement Stats)
3. Receive array of posts with engagement data

### Step 2: Match & Update

For each scraped post:
1. Read `${CLAUDE_PLUGIN_ROOT}/data/queue.json`
2. Match scraped post to queue entries by content_preview similarity (first 80 chars)
3. Update matched entries with fresh engagement numbers
4. Write updated queue.json

Update `${CLAUDE_PLUGIN_ROOT}/data/analytics.json`:
1. For each matched post: add/update in analytics.posts array
2. Recalculate summary: avg_likes, avg_comments, best_day, best_time, etc.
3. Set last_updated to now

### Step 3: Learning

Check if analytics.json has >= 5 posts with engagement data.

If yes: Invoke `learning-engine` skill. Present the analysis results.
If no: "Pas assez de donnees ([N]/5 posts). Continue a publier."

## Workflow 2: Autoresearch Experiment

1. Invoke `autoresearch` skill
2. If user specified a dimension: pass it through
3. If not: let the skill auto-select
4. Present results
5. If 5+ experiments exist: extract and merge patterns into learnings.json

## Workflow 3: Schedule Experiments (--auto)

"Veux-tu planifier un experiment hebdomadaire automatique ?"
If yes: create a scheduled task `linkedin-autoresearch-weekly` (every Sunday 14:00)

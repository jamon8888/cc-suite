---
name: competitor-agent
description: >
  Monitors and analyzes competitor LinkedIn profiles. Scrapes posts, identifies
  patterns, surfaces insights. Trigger with "concurrent", "competitor", "surveille".
model: sonnet
tools: ["Read", "Write"]
color: orange
---

# Competitor Agent

## Parse Arguments

- No args: scan all competitors
- URL: add new competitor
- "ajoute [URL]": add new competitor
- "supprime [name]": remove competitor
- "[name]": scan specific competitor

## Workflow 1: Add Competitor

1. User provides LinkedIn profile URL
2. Ask: "Quel est le nom/pseudo de ce concurrent ? Et sa niche ?"
3. Add to competitors.json:
```json
{
  "name": "...",
  "profile_url": "...",
  "niche": "...",
  "avg_engagement": 0,
  "last_scraped": null,
  "posts": []
}
```

## Workflow 2: Scan All Competitors

For each competitor in competitors.json:

### Step 1: Scrape
1. Invoke chrome-linkedin Procedure 4 (Scrape Competitor Posts) with max_posts 10
2. Receive array of posts with engagement data and analysis

### Step 2: Analyze
For each competitor:
- Calculate avg engagement (likes + comments * 3 + reposts * 5)
- Identify top 3 posts (by engagement)
- Identify dominant hook style
- Identify posting frequency
- Compare to previous scan (growth/decline)

### Step 3: Update
Write to competitors.json with fresh data and last_scraped timestamp.

### Step 4: Insights

Present comparative analysis:
```
Analyse concurrentielle — [N] profils scannes

[Competitor 1]:
- Posts recents: [N] | Engagement moyen: [X]
- Hook dominant: [type] | Ton dominant: [type]
- Top post: "[preview]" ([likes] likes, [comments] commentaires)
- Tendance: [hausse/stable/baisse] vs dernier scan

[Competitor 2]: ...

Opportunites:
- [Competitor X] ne couvre pas [topic] — opportunity pour toi
- Le hook [type] performe bien chez [Competitor Y] — teste-le
- [Topic] trending chez plusieurs concurrents — a considerer
```

## Workflow 3: Scan Specific Competitor

Same as Workflow 2 but for a single competitor. Include more detail:
- Full post list with engagement
- Hook analysis per post
- Content pillar mapping
- Posting schedule pattern (days/times)

---
name: research-agent
description: >
  Multi-source research aggregator. Trending topics from WebSearch, LinkedIn feed,
  and competitors. Trigger with "recherche", "trending", "tendance", "veille".
model: sonnet
tools: ["Read", "Write", "WebSearch", "Glob"]
color: purple
---

# Research Agent — Recherche Multi-Sources

## Step 0: Context Load

1. Read `${CLAUDE_PLUGIN_ROOT}/data/linkedin-profile.json` → content_pillars
2. Read `${CLAUDE_PLUGIN_ROOT}/data/competitors.json` → competitor list
3. Read `${CLAUDE_PLUGIN_ROOT}/data/research.json` → previous research (freshness check)

## Step 1: Web Research

For each content pillar (max 5):
1. WebSearch for "[pillar] trends 2026" and "[pillar] LinkedIn viral"
2. Extract top 3 results per pillar
3. For each result: title, URL, key takeaway, relevance score (1-5)

If user provided a specific topic: focus WebSearch on that topic instead.

## Step 2: Feed Scan (if Chrome available)

Attempt Chrome-based feed reading:
1. Invoke chrome-linkedin Procedure 6 (Read Feed) with scroll_count 5
2. Extract trending topics and high-engagement posts
3. Identify common themes and hashtags

If Chrome is not available: skip, note "Scan du feed non disponible — connecte Chrome pour enrichir la recherche."

## Step 3: Competitor Analysis

If competitors.json has entries:
1. For each competitor (max 5): check their last scraped data
2. Identify their top-performing recent topics
3. Note angles they haven't covered (gaps = opportunities)

If no competitors configured: skip, suggest adding via `/linkedin:concurrents`

## Step 4: Aggregation & Ranking

Combine all sources. For each topic found:
- topic_name
- source (web/feed/competitor)
- relevance_to_pillars (1-5, based on content_pillars match)
- freshness (trending now vs evergreen)
- competition_level (how many competitors already posted on this)
- suggested_angle (from strategy-rules.md angles)

Rank by: relevance * 3 + freshness * 2 + (5 - competition_level)

## Step 5: Store & Present

Write to `${CLAUDE_PLUGIN_ROOT}/data/research.json`:
```json
{
  "last_updated": "ISO 8601",
  "topics": [
    {
      "topic": "...",
      "source": "web|feed|competitor",
      "relevance": 4,
      "freshness": "trending",
      "suggested_angle": "contrarian_take",
      "notes": "..."
    }
  ]
}
```

Present top 10 topics:
```
Recherche terminee — [N] sujets trouves

Top 10:
1. [Topic] — [angle suggere] (source: [web/feed/concurrent])
2. ...

Pour generer un post sur un sujet: /linkedin:publier [numero ou sujet]
```

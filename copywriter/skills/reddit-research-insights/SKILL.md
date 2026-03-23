---
name: reddit-research-insights
description: "This skill should be used when the user asks to 'reddit research', 'what does reddit say about', or 'market intelligence from reddit'."
model: sonnet
---

# Reddit Research Insights (The Cultural Sonar)

Reddit is the only place where people are truly honest about their problems. This skill mines that honesty to find "Market Signals" that traditional research misses.

```
┌─────────────────────────────────────────────────────────────────┐
│  CORE CAPABILITIES                                              │
│  ✓ "Hair on Fire" Pain Detection                                │
│  ✓ Competitor sentiment analysis (Why do they hate Tool X?)     │
│  ✓ "Jargon Drift" (How do they *actually* talk?)                │
│  ✓ Solution Validation (Are they already hacking a fix?)        │
├─────────────────────────────────────────────────────────────────┤
│  RESEARCH PRESETS                                               │
│  1. PROBLEM VALIDATION (Is this real?)                          │
│  2. COMPETITOR TEARDOWN (Where are they weak?)                  │
│  3. COPYWRITING MINING (Stealing their words)                   │
└─────────────────────────────────────────────────────────────────┘
```

## 🛠 Context Configuration

### 1. Load Research Targets

- **Target Audience**: `data/2-Domaines/icp.json`.
- **Competitors**: `data/2-Domaines/business-profile.json`.

### 2. Define the Search Radius

- **Subreddits**: r/SaaS, r/Entrepreneur, r/Marketing, etc.
- **Keywords**: "Struggle", "Hate", "Alternative to", "Review".

---

## 🏛 The Signal Detection Framework

### Signal 1: The "Shut Up and Take My Money"

Look for posts where users are asking for a solution that doesn't exist.

- _Search_: "Is there a tool for...", "How do I automate...", "Paying for X".

### Signal 2: The "Competitor Churn"

Look for hate threads about established players.

- _Search_: "[Competitor] alternative", "[Competitor] sucks", "Moving away from [Competitor]".
- _Insight_: This tells you exactly what feature to build (the one the competitor broke).

### Signal 3: The "Hack"

Look for people stitching together spreadsheets and Zapier to fix a problem.

- _Insight_: If they are "hacking" it, they will pay for software to do it properly.

---

## Tool Priority

Use the first available option — skill never fails, just degrades gracefully:

1. **Reddit MCP** (`search_subreddit`, `get_pain_points`, `get_voice_of_customer`) — if Reddit API credentials configured via `/copywriter:check-connections`
2. **Chrome browser** (claude.com/chrome) — navigate reddit.com directly, read threads natively
3. **WebSearch** with `site:reddit.com` queries — always available fallback

## 🔄 Search Operators (The Toolkit)

The agent should use specific Boolean queries via `reddit-mcp-buddy`.

1.  **Pain finding**: `subreddit:[niche] "hate" OR "struggle" OR "annoying"`
2.  **Cost finding**: `subreddit:[niche] "price" OR "expensive" OR "worth it"`
3.  **Gap finding**: `subreddit:[niche] "wish there was" OR "why isn't there"`

---

## 📝 Output Format

```markdown
# 🕵️ Market Intelligence Report: [Topic]

## 🚨 Critical Pain Points (Hair on Fire)

1. **[Problem Name]**
   - _Severity_: High
   - _Evidence_: "I spend 4 hours a week doing this manually." (r/SaaS)
   - _Opportunity_: Build an auto-importer.

## 🥊 Competitor Weaknesses

1. **[Competitor X]**
   - _Complaint_: "Support takes 4 days to reply."
   - _Angle_: Position ours as "24/7 Slack Support".

## 🗣️ Voice of the Customer (Copywriting Gold)

_Use these exact phrases in your copy:_

- "Drowning in spreadsheets"
- "Feature bloat"
- "Feels like 1999 UI"

## 🧭 Strategic Recommendation

Based on 50+ threads, the market is tired of [Current Solution].
They are asking for [Specific Feature].
We should launch a "Mini-Tool" targeting this exact keyword.
```

---

## 🧠 Advanced Tactics

- **The "Sort by Controversial"**: Find the polarizing topics. This is where the thought leadership angles live.
- **The "Top All Time"**: Find the evergreen desires.
- **The "Comments > Posts"**: The real gold is usually in the 3rd comment down, not the main post.

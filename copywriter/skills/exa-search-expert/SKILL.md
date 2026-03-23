---
name: exa-search-expert
description: "This skill should be used when the user asks to 'deep search', 'research with Exa', or 'semantic search'."
model: sonnet
---

# Advanced Search Expert (Exa/Tavily)

Performs semantic, neural-powered search for market research, competitor analysis, and company discovery. It goes beyond keyword matching to understand intent and context.

```
┌─────────────────────────────────────────────────────────────────┐
│  STANDALONE (always works)                                      │
│  ✓ Neural Search: Uses Exa/Tavily to find high-quality results. │
│  ✓ Semantic Query: Understands "Best tool for X" intent.        │
│  ✓ Explore → Expand → Extract research workflow.                │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (connect ~~exa / tavily via MCP)                  │
│  + Full-Text Retrieval: Reads the entire page content.          │
│  + "Find Similar": Discovers competitors via vector similarity. │
│  + Date Filtering: Finds only "Last 24h" news or trends.        │
└─────────────────────────────────────────────────────────────────┘
```

## Tool Priority

Use the first available option:

1. **Exa MCP** (`exa_search`, `exa_find_similar`, `exa_get_contents`) — if configured via `/copywriter:check-connections`
2. **WebSearch** — always available fallback (keyword-based, less semantic)

## 🛠 Triggers

- "Research the market for [Topic]"
- "Find competitors to [Company]"
- "What are the trends in [Industry]?"
- "Deep dive into [Subject]"

## 🛠 Context Configuration

### 1. Load Strategic Context

- **Industry**: `{{business.industry}}`
- **Competitors**: `{{business.competitors}}`

---

## 🏛 Search Workflow: Explore → Expand → Extract

### 1. Explore (Broad Discovery)

Start with a broad, semantic search to understand the landscape.
_Query_: "What are the most innovative tools for `{{icp.avatar}}` in 2026?"

### 2. Expand (Related Content)

Use "find similar" to discover related content and broaden research.
_Action_: Find similar to [URL of best result].

### 3. Extract (Deep Dive)

For high-value URLs, extract full content for detailed analysis.
_Action_: Extract full text from [URL].

---

## 📝 Output Format

```markdown
# 🕵️ Research Report: [Topic]

## 📊 Executive Summary

[High-level synthesis of the findings]

## 🔍 Key Findings

1. **[Finding 1]**
   - Source: [URL]
   - Insight: [Detail]

2. **[Finding 2]**
   - Source: [URL]
   - Insight: [Detail]

## 🧭 Strategic Implications for {{business.name}}

- Competitors are focusing on X.
- Users are complaining about Y.
- We should position as Z.
```

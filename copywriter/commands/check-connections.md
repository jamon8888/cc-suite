---
description: Configure API keys and check which research tools are connected
argument-hint: "No arguments required"
allowed-tools: Read, Write, Bash
model: sonnet
---

# /copywriter:check-connections

Check which research integrations are active and configure API keys conversationally.

---

## Workflow

### Step 1: Detect active tools

Check which MCP tools are currently available in this session:
- Exa search tools (`exa_search`, `exa_find_similar`, etc.) → Exa connected
- Reddit tools (`search_subreddit`, `get_pain_points`) → Reddit connected
- Browser tools (from claude.com/chrome extension) → Chrome browsing available
- WebSearch → always available

Report status:
```
Research Tools Status
─────────────────────────────────────
Exa Search     [CONNECTED / not configured]
Reddit API     [CONNECTED / not configured]
Chrome Browse  [AVAILABLE / not installed]
Web Search     ALWAYS AVAILABLE (fallback)
─────────────────────────────────────
```

### Step 2: Check existing config

Read `.claude/mcp-keys.local.md` if it exists. If keys are already saved, show masked versions (e.g., `sk-exa-****abc`).

### Step 3: Offer to configure missing keys

For each missing tool, ask conversationally:

**Exa (not configured):**
> "Exa gives you neural/semantic search — much better than keyword search for market research, competitor discovery, and trend analysis. Free tier available at exa.ai.
> Do you have an Exa API key? (paste it here, or press Enter to skip)"

**Reddit (not configured):**
> "Reddit research mines unfiltered user pain points and real language patterns — great for copywriting angles. Requires a free Reddit developer app.
> Do you have Reddit API credentials? (create one at reddit.com/prefs/apps → script type)
> If yes, paste your Client ID:"
> [then] "And your Client Secret:"

**Chrome (not installed):**
> "The Claude Chrome extension (claude.com/chrome) lets me browse Reddit and other sites directly without API keys — it's a good free alternative for Reddit research.
> No action needed here — just install the extension and it activates automatically."

### Step 4: Write to shared config file

If user provides keys, write/update `.claude/mcp-keys.local.md`:

```
---
exa_api_key: <value>
reddit_client_id: <value>
reddit_client_secret: <value>
---

API keys for Cowork plugins (copywriter, solo, sales).
This file is gitignored — never commit it.
Restart Cowork after changes for MCP servers to pick up new keys.
```

Also ensure `.gitignore` contains `.claude/*.local.md`.

### Step 5: Confirm and instruct restart

```
Keys saved to .claude/mcp-keys.local.md

Next step: Restart Cowork to activate the MCP servers.
After restart, run /copywriter:check-connections again to confirm.
```

---

## Fallback behavior (no keys configured)

Skills degrade gracefully — they never fail, just use a less powerful source:

| Skill | With key | Without key |
|-------|----------|-------------|
| exa-search-expert | Neural semantic search | WebSearch (keyword-based) |
| reddit-research-insights | Full Reddit API (structured) | Chrome browse (if installed) → WebSearch `site:reddit.com` |

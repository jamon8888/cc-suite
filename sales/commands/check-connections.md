---
name: sales:check-connections
description: Configure API keys and check which research tools are connected
argument-hint: "No arguments required"
allowed-tools: Read, Write, Bash
model: sonnet
---

# /sales:check-connections

Check which research integrations are active and configure API keys conversationally.

---

## Workflow

### Step 1: Detect active tools

Check which MCP tools are currently available in this session:
- Exa search tools (`exa_search`, `exa_find_similar`, etc.) → Exa connected
- HubSpot tools → CRM connected
- LinkedIn tools → LinkedIn connected
- WebSearch → always available

Report status:
```
Sales Tools Status
─────────────────────────────────────
Exa Search     [CONNECTED / not configured]
HubSpot CRM    [CONNECTED / not configured]
LinkedIn MCP   [CONNECTED / not configured]
Web Search     ALWAYS AVAILABLE (fallback)
─────────────────────────────────────
```

### Step 2: Check existing config

Read `.claude/mcp-keys.local.md` if it exists. If keys are already saved, show masked versions.

### Step 3: Offer to configure missing keys

**Exa (not configured):**
> "Exa gives you neural/semantic search for account research, competitor intel, and prospect discovery — far better than keyword search. Free tier at exa.ai.
> Do you have an Exa API key? (paste it here, or press Enter to skip)"

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
After restart, run /sales:check-connections again to confirm.
```

---

## Fallback behavior (no keys configured)

Skills degrade gracefully — they never fail, just use a less powerful source:

| Skill | With Exa | Without Exa |
|-------|----------|-------------|
| account-research | Neural semantic search + company intel | WebSearch (keyword-based) |
| exa-search-expert | Full neural search | WebSearch fallback |
| competitive-intelligence | Semantic competitor discovery | WebSearch fallback |

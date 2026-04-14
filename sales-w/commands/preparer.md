---
description: "Preparer un appel/meeting fonde sur ta base wiki + signaux CRM."
argument-hint: "<compte|prospect> [--deal <slug>]"
allowed-tools: Read, Write, Glob, Grep, Agent, WebSearch, WebFetch
---

## Your task

### Identity Check

Read `${CLAUDE_PLUGIN_ROOT}/data/sales-profile.json`. If empty, stop: "Profil non configure. Lance /sales:demarrer."

### Prelude: Resolve Wiki

1. **HUB**: Try `$HOME/sales-wiki/_index.md`. If exists -> HUB = `$HOME/sales-wiki`. Else read `~/.config/llm-sales-wiki/config.json` and use `resolved_path`. If no config -> HUB = `$HOME/sales-wiki`.
2. **Wiki**: `--wiki <name>` -> lookup `HUB/wikis.json` | else -> HUB.
3. If wiki missing: proceed with CRM-only data, suggest /sales:recherche.

### Parse $ARGUMENTS

- **account**: The account/prospect name to prepare for
- **--deal <slug>**: Link to an existing deal project

### Step 1: Load Identity

Read from `${CLAUDE_PLUGIN_ROOT}/data/`:
- `sales-profile.json` (offers, quotas, competitive advantages)
- `icp.json` (pain points, decision makers)
- `voice-dna.json` (communication style)

### Step 2: Query Wiki

If wiki exists:
1. Grep `wiki/` for account name and related terms
2. Read matching articles (entity_type: account, competitor)
3. Check freshness: if `last_verified` + `freshness_threshold` < today, flag: "Recherche obsolete sur [compte] (derniere MAJ il y a N jours). Relancer /sales:recherche ?"
4. Extract: account history, competitive positioning, previous interactions

### Step 3: Pull CRM Signals (MCP, graceful if absent)

If HubSpot/Close MCP connected:
- Pull deal data, last activities, pipeline stage
If Slack MCP connected:
- Search for recent threads mentioning the account
If Fireflies MCP connected:
- Pull recent call transcripts with this account

If no MCP available: skip, note "Pas de CRM connecte. Connecter HubSpot/Close pour enrichir le brief."

### Step 4: Assemble Brief

```
CALL PREP BRIEF:
- Sales Profile: {offers, competitive_advantages, quotas}
- ICP: {pain_points, decision_makers, buying_process}
- Voice DNA: {tone, communication_style}
- Wiki Sources: {account articles with confidence + freshness status}
- CRM Signals: {recent deals, emails, call notes -- or "No CRM connected"}
- Account: {name from $ARGUMENTS}
```

### Step 5: Dispatch Agent

Pass brief to prep-master-agent via Agent tool.

### Step 6: Save Output

If deal project exists (`output/projects/<deal>/`):
- Save to `output/projects/<deal>/call-prep-YYYY-MM-DD.md`
If no deal project:
- Offer to create one: "Creer un espace deal pour ce compte ? (o/n)"
- If yes: create `output/projects/<slug>/WHY.md` with deal rationale
- Save call prep there

### No Wiki Suggestion

If wiki had no articles on this account:
> Pas d'articles wiki sur ce compte. Lance `/sales:recherche "nom du compte"` pour approfondir.

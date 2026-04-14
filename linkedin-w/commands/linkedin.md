---
description: "LinkedIn growth engine — comprend le langage naturel. Dis ce que tu veux et il route vers la bonne commande."
argument-hint: "[<texte libre>] [status]"
allowed-tools: Read, Glob, Bash(date:*)
---

## Your task

### Prelude: Check Setup

Read `${CLAUDE_PLUGIN_ROOT}/data/linkedin-profile.json`. If empty or no `display_name`, suggest `/linkedin:start`.

### If $ARGUMENTS is freeform text

Detect intent and route to the right subcommand. **First match wins:**

| Priority | Signal | Route to |
|----------|--------|----------|
| 1 | URL detected (http/https containing linkedin.com) | `Skill: linkedin:concurrents` with the URL |
| 2 | URL detected (other) | `Skill: linkedin:recherche` with the URL |
| 3 | FR: publie/poste/ecris/redige/draft/genere or EN: write/create/draft/publish/generate | `Skill: linkedin:publier` with the text |
| 4 | FR: commente/engage/reagis or EN: comment/engage/react | `Skill: linkedin:commenter` |
| 5 | FR: recherche/trending/tendance/veille or EN: research/trending/explore | `Skill: linkedin:recherche` with the topic |
| 6 | FR: concurrent/competitor/surveille or EN: competitor/monitor | `Skill: linkedin:concurrents` |
| 7 | FR: file/queue/approuve/rejette/planifie or EN: queue/approve/reject/schedule | `Skill: linkedin:file` with the text |
| 8 | FR: stats/analytics/performance/apprends/experiment or EN: stats/analytics/learn | `Skill: linkedin:analyser` with the text |
| 9 | Ambiguous — no clear match | Show top 2-3 options as numbered list and wait for choice |

**Confidence routing:**
- **High confidence** (single strong signal): Route directly. Announce: "Detecte: **publier** (mot-cle 'ecris'). Redirection vers /linkedin:publier."
- **Low confidence** (ambiguous): Present numbered menu.

### If $ARGUMENTS is empty or "status" / "bilan"

Invoke `Skill: linkedin:bilan`.

---
description: "Copywriter studio — comprend le langage naturel. Dis ce que tu veux et il route vers la bonne commande. Gere aussi init, status et config."
argument-hint: "[<texte libre>] [status]"
allowed-tools: Read, Write, Edit, Glob, Bash(ls:*), Bash(wc:*), Bash(mkdir:*), Bash(date:*), Bash(mv:*)
---

## Your task

### Prelude: Resolve Wiki

1. **HUB**: Try `$HOME/wiki/_index.md`. If exists -> HUB = `$HOME/wiki`. Else read `~/.config/llm-wiki/config.json` and use `resolved_path`. If no config -> HUB = `$HOME/wiki`.
2. **Wiki**: `--wiki <name>` -> lookup `HUB/wikis.json` | cwd has `.wiki/` -> use it | else -> HUB.
3. **Verify**: This is the router -- "wiki missing" is not always an error. Status shows an empty state gracefully, and the router explains how to create one.
4. **Parse $ARGUMENTS** below.

### If $ARGUMENTS is freeform text

Detect intent and route to the right subcommand. **First match wins:**

| Priority | Signal | Route to |
|----------|--------|----------|
| 1 | URL detected (http/https) | `Skill: copywriter:apprendre` with the URL |
| 2 | Question mark, or FR words (quel/comment/pourquoi/est-ce que) or EN (what/how/why) | `Skill: copywriter:question` with the text |
| 3 | FR write words (ecris/redige/post/article/publie/cree un/genere) or EN (write/create/draft) | `Skill: copywriter:ecrire` with the text |
| 4 | FR research words (recherche/cherche/explore/investigue) or EN (research/investigate/look into) | `Skill: copywriter:recherche` with the topic |
| 5 | FR plan words (planifie/calendrier/planning) or EN (plan/calendar/schedule) | `Skill: copywriter:calendrier` with the text |
| 6 | FR verify words (verifie/audit/slop/corrige) or EN (check/audit/verify) | `Skill: copywriter:verifier` |
| 7 | Ambiguous -- no clear match | Show top 2-3 options as numbered list and wait for choice |

**Confidence routing:**
- **High confidence** (single strong signal like URL or question mark): Route directly. Announce: "Detecte: **apprendre** (URL trouvee). Redirection vers /copywriter:apprendre."
- **Low confidence** (ambiguous): Present numbered menu.

### If $ARGUMENTS is empty or "status"/"bilan"

Show wiki status inline (same as /copywriter:bilan). List available commands:

```
Commandes disponibles:
- /copywriter:ecrire [blog|social|newsletter|script|sales] "sujet"
- /copywriter:recherche "sujet"
- /copywriter:calendrier "mois" "focus"
- /copywriter:apprendre <url|fichier|texte>
- /copywriter:question "ta question"
- /copywriter:verifier
- /copywriter:bilan
- /copywriter:start
```

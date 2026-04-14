---
description: "Sales OS — comprend le langage naturel. Dis ce que tu veux et il route vers la bonne commande."
argument-hint: "[<texte libre>] [status]"
allowed-tools: Read, Write, Edit, Glob, Bash(ls:*), Bash(wc:*), Bash(mkdir:*), Bash(date:*), Bash(mv:*)
---

## Your task

### Prelude: Resolve Wiki

1. **HUB**: Try `$HOME/sales-wiki/_index.md`. If exists -> HUB = `$HOME/sales-wiki`. Else read `~/.config/llm-sales-wiki/config.json` and use `resolved_path`. If no config -> HUB = `$HOME/sales-wiki`.
2. **Wiki**: `--wiki <name>` -> lookup `HUB/wikis.json` | cwd has `.wiki/` -> use it | else -> HUB.
3. **Verify**: This is the router -- "wiki missing" is not always an error. Status shows an empty state gracefully.
4. **Parse $ARGUMENTS** below.

### If $ARGUMENTS is freeform text

Detect intent and route. **First match wins:**

| Priority | Signal | Route to |
|----------|--------|----------|
| 1 | Company/account name detected | `Skill: sales:preparer` with the name |
| 2 | URL detected (http/https) | `Skill: sales:recherche` with the URL |
| 3 | "pipeline/deals/mes deals" | `Skill: sales:pipeline` |
| 4 | "forecast/prevision/prevoir" | `Skill: sales:prevoir` |
| 5 | "LinkedIn/post/engage" | `Skill: sales:linkedin` with the text |
| 6 | "email/proposal/deck/QBR/devis/battlecard" | `Skill: sales:creer` with the text |
| 7 | "negocier/objection/prix/remise/discount" | `Skill: sales:negocier` |
| 8 | "coach/roleplay/feedback/review" | `Skill: sales:coacher` |
| 9 | "prospect/trouver/cibler/outbound" | `Skill: sales:prospecter` |
| 10 | "analyser/win/loss/perdu/gagne/won/lost" | `Skill: sales:analyser` |
| 11 | "recherche/cherche/explore/investigue" or EN (research/investigate) | `Skill: sales:recherche` |
| 12 | Question mark or "quel/comment/pourquoi" or EN (what/how/why) | `Skill: sales:recherche` (query mode) |
| 13 | Ambiguous | Show top 2-3 options as numbered list |

**Confidence routing:** High confidence routes directly with announcement. Low confidence presents menu.

### If $ARGUMENTS is empty or "status"/"bilan"

Show wiki status inline. List available commands:

```
Commandes disponibles:
- /sales:demarrer — Initialiser profil + base wiki
- /sales:prospecter "cible" — Trouver des prospects
- /sales:recherche "sujet" — Recherche approfondie
- /sales:pipeline — Vue pipeline
- /sales:preparer "compte" — Preparer un appel/meeting
- /sales:creer "type" — Creer un asset (proposal, deck, email)
- /sales:negocier "deal" — Conseil negociation
- /sales:coacher — Coaching (email, roleplay, feedback)
- /sales:linkedin "action" — Suite LinkedIn
- /sales:prevoir — Prevision pipeline
- /sales:analyser "deal" — Analyse win/loss
- /sales:bilan — Status complet
```

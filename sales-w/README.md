# Sales — Evidence-Based Sales OS

Sales OS fonde sur une base de connaissances wiki. Competitive intel, account research, win/loss patterns et preparation de deals -- tout ancre dans des sources recherchees, citees et scorees en confiance.

Fusionne la technologie [llm-wiki](https://github.com/nvk/llm-wiki-master) (base de connaissances compilee) avec les capacites de [sales](https://github.com/anthropics/knowledge-work-plugins) (27 skills, 8 agents, 9 connecteurs MCP).

## Setup

1. Installer le plugin dans Cowork
2. Lancer `/sales:demarrer`
3. Suivre l'assistant d'onboarding (profil vendeur, ICP, Voice DNA)
4. Connecter HubSpot/Close (optionnel) via `/mcp`

## Commandes

| Commande | Usage |
|----------|-------|
| `/sales:demarrer` | Initialiser profil + base wiki |
| `/sales:prospecter` | Trouver des prospects |
| `/sales:recherche` | Recherche approfondie multi-agents |
| `/sales:pipeline` | Vue pipeline + sante des deals |
| `/sales:preparer` | Preparer un appel/meeting |
| `/sales:creer` | Creer un asset (proposal, deck, email, QBR) |
| `/sales:negocier` | Conseil negociation |
| `/sales:coacher` | Coaching (email, roleplay, feedback) |
| `/sales:linkedin` | Suite LinkedIn |
| `/sales:prevoir` | Prevision pipeline |
| `/sales:analyser` | Analyse win/loss |
| `/sales:bilan` | Status complet |

## Workflow Type

```
/sales:demarrer                          # 1. Configurer ton profil
/sales:recherche "ConcurrentX"           # 2. Construire ta base competitive
/sales:prospecter "fintech Paris"         # 3. Trouver des prospects
/sales:preparer "Acme Corp"              # 4. Prep call fonde sur wiki + CRM
/sales:creer proposal "Acme Corp"        # 5. Proposition fondee sur recherche
/sales:analyser "Acme Corp"              # 6. Win/loss -> compilee dans le wiki
```

## Architecture

**Double coeur :**
- `data/` — Identite (profil vendeur, ICP, Voice DNA). ~200 tokens au demarrage.
- `~/sales-wiki/` — Base de connaissances. Comptes, concurrents, patterns win/loss.

**Systeme de fraicheur :** Les articles wiki sur les comptes/concurrents ont un seuil de fraicheur (30-90j). Les articles obsoletes sont signales dans les call preps et le bilan.

**Deal-as-Project :** Chaque deal actif = un dossier wiki (`output/projects/<deal>/`).

## 7 Points de Fusion

1. **Competitive Intel Persistante** -- Recherche sur les concurrents compilee et requetable
2. **Win/Loss en Patterns** -- Analyses win/loss ingerees dans le wiki. Patterns detectables
3. **Call Prep Evidence-Based** -- Brief fonde sur wiki + CRM signals
4. **Objection Library Vivante** -- Enrichie par chaque deal analyse
5. **Proposals Fondes sur Recherche** -- Citations wiki dans les propositions
6. **Territory Planning par Evidence** -- Segments priorises par donnees wiki
7. **Daily Briefing Enrichi** -- Signaux CRM croises avec articles wiki

## Connecteurs (optionnels)

Voir [CONNECTORS.md](CONNECTORS.md). 9 integrations : HubSpot, Close, Slack, Clay, ZoomInfo, Notion, Atlassian, Fireflies, MS365.

## Credits

- Wiki engine: [llm-wiki](https://github.com/nvk/llm-wiki-master) par nvk
- Sales framework: [sales](https://github.com/anthropics/knowledge-work-plugins) par Antigravity Factory
- Plugin fusion: NMarchitecte

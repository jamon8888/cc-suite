# Copywriter — Evidence-Based Copywriting Studio

Studio de copywriting fonde sur une base de connaissances wiki. Chaque piece de contenu est ancree dans des sources recherchees, citees et scorees en confiance.

Fusionne la technologie [llm-wiki](https://github.com/nvk/llm-wiki-master) (base de connaissances compilee) avec les capacites de [copywriter](https://github.com/anthropics/knowledge-work-plugins) (Voice DNA, anti-slop, generation multi-format).

## Setup

1. Installer le plugin dans Cowork
2. Lancer `/copywriter:start`
3. Suivre l'assistant d'onboarding (profil business, Voice DNA, ICP)

## Commandes

| Commande | Usage |
|----------|-------|
| `/copywriter:start` | Initialiser profil + base wiki |
| `/copywriter:ecrire` | Ecrire (blog, social, newsletter, script, sales) |
| `/copywriter:recherche` | Recherche approfondie multi-agents |
| `/copywriter:calendrier` | Calendrier de contenu strategique |
| `/copywriter:verifier` | Triple audit (slop + credibilite + fraicheur) |
| `/copywriter:apprendre` | Ajouter une source a ta base |
| `/copywriter:question` | Interroger ta base de connaissances |
| `/copywriter:bilan` | Status et statistiques |

## Workflow Type

```
/copywriter:start                              # 1. Configurer ton profil
/copywriter:recherche "email marketing B2B"     # 2. Construire ta base
/copywriter:calendrier "Avril" "Lancement"     # 3. Planifier ton contenu
/copywriter:ecrire blog "cold email en 2026"   # 4. Ecrire, fonde sur tes sources
/copywriter:verifier                           # 5. Auditer avant publication
```

## Architecture

**Double coeur :**
- `data/` — Identite (Voice DNA, ICP, profil business). Charge a chaque session, ~200 tokens.
- `~/wiki/` — Base de connaissances. Recherche persistante, compilee, requetable.

**Principe :** "Qui je suis ?" = `data/`. "Qu'est-ce que je sais ?" = `~/wiki/`.

## 5 Points de Fusion

1. **Recherche qui s'accumule** — Les sources sont ingerees, compilees, et requetables des mois plus tard
2. **Calendrier fonde sur des preuves** — Les sujets sont selectionnes par score de confiance wiki
3. **Angles valides par these** — `/copywriter:recherche --mode thesis` pour valider un hot take
4. **Anti-slop + credibilite** — Verifie la voix ET la qualite des sources citees
5. **Archive de contenu requetable** — Tout le contenu publie est indexe dans le wiki

## Connecteurs (optionnels)

Voir [CONNECTORS.md](CONNECTORS.md) pour les integrations WordPress, Exa, et LinkedIn.

## Credits

- Wiki engine: [llm-wiki](https://github.com/nvk/llm-wiki-master) par nvk
- Copywriting framework: [copywriter](https://github.com/anthropics/knowledge-work-plugins) par Antigravity Factory
- Plugin fusion: NMarchitecte

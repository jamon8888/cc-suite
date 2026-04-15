# Job-OS

Pipeline de recherche d'emploi piloté par IA. Évalue les offres, génère des CV sur mesure, scanne les portails, suit vos candidatures — le tout depuis votre terminal.

---

## Ce que ça fait

Vous collez une offre d'emploi. Job-OS l'évalue sur 6 dimensions, adapte votre CV, génère un PDF optimisé ATS et met à jour votre tracker. Tout ça sans quitter Claude Code.

Le système supporte plusieurs **tracks de recherche simultanées** : vous pouvez cibler des postes d'Ingénieur IA et de Designer UX/UI en même temps, avec un CV distinct par track. Le scanner fusionne automatiquement les mots-clés des deux pistes.

Ce n'est pas un outil pour postuler en masse. C'est un filtre : il vous aide à trouver les offres qui valent votre temps, et vous décourage d'envoyer quoi que ce soit en dessous de 4,0/5.

---

## Prérequis

- [Node.js 18+](https://nodejs.org)
- [Claude Code](https://claude.ai/code) ou [OpenCode](https://opencode.ai)
- Google Chrome installé sur votre machine

---

## Installation

### Option A — Laissez Claude installer pour vous (recommandé)

C'est la méthode la plus simple. Vous n'avez pas besoin de connaître la ligne de commande.

**1. Téléchargez le projet**

Téléchargez le ZIP depuis GitHub → extrayez-le → ouvrez le dossier `job-os` dans Claude Code :

```
File → Open Folder → sélectionner le dossier job-os
```

**2. Collez ce prompt dans Claude Code et envoyez**

```
Installe job-os pour moi. Voici ce que tu dois faire dans l'ordre :

1. Vérifie que Node.js est installé (`node --version`). Si ce n'est pas le cas, dis-le moi.
2. Installe les dépendances npm (`npm install`)
3. Installe le navigateur Playwright (`npx playwright install chromium`)
4. Installe le plugin anti-détection (`npm install playwright-extra playwright-extra-plugin-stealth`)
5. Lance le diagnostic (`npm run doctor`) et corrige les éventuels problèmes
6. Lance l'assistant de configuration (`/job-os setup`) pour me guider dans la configuration

Ne saute aucune étape. Dis-moi à chaque fois ce que tu fais et si quelque chose échoue.
```

Claude exécute tout, corrige les erreurs au fil de l'eau, puis lance directement l'assistant de configuration.

---

### Option B — Installation manuelle

```bash
# Dans le dossier job-os
npm install
npx playwright install chromium
npm install playwright-extra playwright-extra-plugin-stealth
npm run doctor
```

---

## Configuration

Lancez l'assistant d'onboarding — il s'occupe de tout :

```bash
claude
# puis dans Claude Code :
/job-os setup
```

L'assistant vous guide en français à travers :

1. **Choix des tracks** — sélectionnez une ou plusieurs pistes parmi 23 options (IA/ML, UX Designer, Product Manager, DevOps, Data, Leadership, Freelance...)
2. **CV par track** — collez votre CV, une URL LinkedIn, ou laissez Claude en rédiger un
3. **Profil** — nom, contact, narrative, preuves concrètes, cible salariale
4. **Portails** — mots-clés et entreprises à surveiller, ajustés automatiquement par track
5. **Validation** — `doctor.mjs` vérifie que tout est en ordre avant de commencer

L'assistant se relance à tout moment via `/job-os setup` pour ajouter un track ou mettre à jour votre profil. Vos candidatures, rapports et pipeline existants ne sont jamais touchés.

---

## Commandes

```
/job-os                     Afficher le menu
/job-os setup               Onboarding : configurer tracks, CV, profil, portails
/job-os {URL ou texte}      Auto-pipeline : évaluation + PDF + tracker
/job-os scan                Scanner les portails pour de nouvelles offres
/job-os pipeline            Traiter les URLs en attente (data/pipeline.md)
/job-os offre              Évaluer une seule offre (A-F)
/job-os offres             Comparer et classer plusieurs offres
/job-os pdf                 Générer un CV PDF optimisé ATS
/job-os apply               Remplir un formulaire de candidature avec l'IA
/job-os tracker             Tableau de bord des candidatures
/job-os batch               Évaluation parallèle avec des workers
/job-os deep                Recherche approfondie sur une entreprise
/job-os message            Rédiger un message de prise de contact LinkedIn
/job-os patterns            Analyser les patterns de rejet
/job-os followup            Suivi des relances
/job-os training            Évaluer une formation ou certification
/job-os project             Évaluer une idée de projet portfolio
```

---

## Comment fonctionne l'évaluation

Chaque offre est analysée en 6 blocs notés de 1 à 5 :

| Bloc | Contenu |
|------|---------|
| **A — Résumé** | Archetype, domaine, séniorité, remote, équipe |
| **B — Match CV** | Citations exactes de votre CV, lacunes, stratégies de mitigation |
| **C — Niveau & stratégie** | Positionnement, risques de déclassement, contre-offre |
| **D — Rémunération** | Recherche marché (Glassdoor, Levels.fyi), fourchette réelle |
| **E — Personnalisation** | Top 5 modifications CV + LinkedIn pour cette offre |
| **F — Prépa entretien** | 6 à 10 stories STAR+R, études de cas, questions pièges |
| **G — Légitimité** | Âge de l'annonce, signaux de méfiance, tier de confiance |

Le système détecte automatiquement quel track correspond à l'offre et utilise le CV associé (`cv-ai-engineer.md`, `cv-ux-designer.md`, etc.).

---

## Structure des fichiers

```
job-os/
├── CLAUDE.md                    # Instructions de l'agent (système)
├── config/
│   └── profile.example.yml      # Modèle de profil → copier vers profile.yml
├── modes/                       # Logique de chaque commande
│   ├── setup.md                 # Assistant d'onboarding multi-tracks
│   ├── _shared.md               # Contexte partagé entre tous les modes
│   ├── _profile.md              # Votre personnalisation (jamais écrasée)
│   └── ...
├── modes/fr/                    # Modes en français (langue par défaut)
├── modes/de/                    # Modes en allemand (marché DACH)
├── modes/ja/                    # Modes en japonais
├── modes/pt/                    # Modes en portugais
├── modes/ru/                    # Modes en russe
├── templates/
│   ├── cv-template.html         # Template HTML du CV
│   ├── portals.example.yml      # Config du scanner → copier vers portals.yml
│   └── states.yml               # Statuts canoniques des candidatures
├── dashboard/                   # Dashboard TUI en Go
├── data/                        # Tracker et pipeline (gitignored)
├── reports/                     # Rapports d'évaluation (gitignored)
├── output/                      # PDFs générés (gitignored)
└── docs/                        # Guides setup, personnalisation, architecture
```

**Fichiers utilisateur** (jamais écrasés par les mises à jour) :
`cv.md`, `cv-*.md`, `config/profile.yml`, `modes/_profile.md`, `portals.yml`, `data/`, `reports/`, `output/`

---

## Multi-tracks

Pour cibler plusieurs familles de postes simultanément :

```yaml
# config/profile.yml
tracks:
  - id: "ai-engineer"
    name: "Ingénieur IA / ML"
    cv_file: "cv-ai-engineer.md"
    primary: true
  - id: "ux-designer"
    name: "Designer UX/UI"
    cv_file: "cv-ux-designer.md"
    primary: true
```

Le scanner fusionne les mots-clés de tous vos tracks dans `portals.yml`. Lors d'une évaluation, Job-OS détecte le track de l'offre et sélectionne le bon CV automatiquement.

---

## Langue

Le système est en **français par défaut**. Pour changer :

```yaml
# config/profile.yml
language:
  primary: en      # ou de, ja, pt, ru
  modes_dir: modes/  # ou modes/de, modes/ja...
```

---

## Automatisation navigateur

Job-OS utilise Playwright pour trois usages distincts, avec des stratégies anti-détection adaptées à chaque cas.

### Scan de portails

Playwright scrape les pages carrières pour découvrir de nouvelles offres. Pour éviter les blocages Cloudflare ou anti-bot :

```bash
npm install playwright-extra playwright-extra-plugin-stealth
```

Le plugin stealth corrige les principales fuites détectables (`webdriver`, Canvas, WebGL, navigator plugins). Suffisant pour la grande majorité des portails.

### Génération PDF

Playwright rend le template HTML du CV en PDF via Chromium headless. Pas de problème de détection ici — aucune session externe impliquée.

### Envoi de messages et soumission de candidatures

`browser.mjs` automatise les actions authentifiées en utilisant **votre profil Chrome réel** — sessions LinkedIn, Indeed, WTTJ déjà actives, fingerprint natif, pratiquement indétectable.

```bash
# Vérifier que vous êtes connecté à LinkedIn
node browser.mjs check-login --platform linkedin

# Envoyer un message à une connexion existante
node browser.mjs linkedin-message \
  --to "https://linkedin.com/in/prenom-nom" \
  --text "Bonjour, ..."

# Envoyer une demande de connexion avec note
node browser.mjs linkedin-connect \
  --to "https://linkedin.com/in/prenom-nom" \
  --note "Bonjour, ..."

# Remplir et soumettre un formulaire de candidature
node browser.mjs apply \
  --url "https://jobs.ashby.com/..." \
  --fields '{"#cover-letter": "...", "#why-us": "..."}'

# Prévisualiser sans agir
node browser.mjs linkedin-message --to "..." --text "..." --dry-run
```

Toutes les commandes sortent du JSON (`status: sent | dry-run | cancelled | error`) et demandent une **confirmation explicite** avant d'agir. Claude rédige, vous validez, le script envoie.

| Usage | Stratégie | Détection |
|-------|-----------|-----------|
| Scan portails | playwright-extra-stealth | Très faible |
| Génération PDF | Chromium headless standard | Aucune |
| Messages / candidatures | Profil Chrome réel | Quasi nulle |

---

## Données et vie privée

Tout reste sur votre machine. Job-OS n'a pas de serveur, pas de compte, pas de télémétrie. Vos données sont envoyées uniquement à Anthropic (via Claude Code) selon votre configuration habituelle.

---

## Licence

MIT

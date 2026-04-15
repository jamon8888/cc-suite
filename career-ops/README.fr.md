# Career-Ops

[English](README.md) | [Español](README.es.md) | [Français](README.fr.md) | [Português (Brasil)](README.pt-BR.md) | [한국어](README.ko-KR.md) | [日本語](README.ja.md) | [Русский](README.ru.md) | [繁體中文](README.zh-TW.md)

<p align="center">
  <a href="https://x.com/santifer"><img src="docs/hero-banner.jpg" alt="Career-Ops — Système de recherche d'emploi multi-agents" width="800"></a>
</p>

<p align="center">
  <em>J'ai passé des mois à postuler à la dure. Alors j'ai construit le système que j'aurais voulu avoir.</em><br>
  Les entreprises utilisent l'IA pour filtrer les candidats. <strong>J'ai donné aux candidats l'IA pour <em>choisir</em> les entreprises.</strong><br>
  <em>Maintenant c'est open source.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Claude_Code-000?style=flat&logo=anthropic&logoColor=white" alt="Claude Code">
  <img src="https://img.shields.io/badge/OpenCode-111827?style=flat&logo=terminal&logoColor=white" alt="OpenCode">
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Playwright-2EAD33?style=flat&logo=playwright&logoColor=white" alt="Playwright">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT">
  <a href="https://discord.gg/8pRpHETxa4"><img src="https://img.shields.io/badge/Discord-5865F2?style=flat&logo=discord&logoColor=white" alt="Discord"></a>
</p>

---

<p align="center">
  <img src="docs/demo.gif" alt="Career-Ops Demo" width="800">
</p>

<p align="center"><strong>740+ offres évaluées · 100+ CVs personnalisés · 1 poste décroché</strong></p>

<p align="center"><a href="https://discord.gg/8pRpHETxa4"><img src="https://img.shields.io/badge/Rejoindre_la_communauté-Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord"></a></p>

## C'est quoi Career-Ops

Career-Ops transforme n'importe quel CLI d'IA en centre de commandement pour votre recherche d'emploi. Au lieu de suivre vos candidatures manuellement dans un tableur, vous disposez d'un pipeline alimenté par l'IA qui :

- **Évalue les offres** avec un système de scoring structuré A-F (10 dimensions pondérées)
- **Génère des CVs PDF** — optimisés ATS et personnalisés par description de poste
- **Scanne les portails** automatiquement (Greenhouse, Ashby, Lever, France Travail, APEC, Cadremploi, Welcome to the Jungle, Indeed FR, LinkedIn)
- **Traite en batch** — évaluer 10+ offres en parallèle avec des sous-agents
- **Suit tout** dans une source de vérité unique avec contrôles d'intégrité
- **Cible plusieurs postes simultanément** — CTO, Head of AI, VP Engineering avec scoring distinct par poste

> **Important : Ce n'est PAS un outil de candidature en masse.** Career-ops est un filtre — il vous aide à trouver les rares offres qui méritent votre temps parmi des centaines. Le système déconseille fortement de postuler à tout ce qui score en dessous de 4.0/5. Votre temps est précieux, celui du recruteur aussi. Toujours relire avant d'envoyer.

Career-ops est agentique : Claude Code navigue les pages carrières avec Playwright, évalue l'adéquation en raisonnant sur votre CV vs la description de poste (pas du matching de mots-clés), et adapte votre CV par annonce.

> **Attention : les premières évaluations ne seront pas parfaites.** Le système ne vous connaît pas encore. Donnez-lui du contexte — votre CV, votre histoire de carrière, vos proof points, vos préférences, vos points forts, ce que vous voulez éviter. Plus vous le nourrissez, meilleur il devient. Pensez à l'onboarding d'un nouveau recruteur : la première semaine il apprend à vous connaître, puis il devient indispensable.

## Fonctionnalités

| Fonctionnalité | Description |
|----------------|-------------|
| **Auto-Pipeline** | Collez une URL, obtenez une évaluation complète + PDF + entrée tracker |
| **Évaluation 6 Blocs** | Résumé du rôle, match CV, stratégie de niveau, recherche comp, personnalisation, préparation entretien (STAR+R) |
| **Multi-positions simultanées** | Ciblez CTO + Head of AI + VP Engineering en parallèle — scoring distinct et framing adapté par poste |
| **Banque d'histoires entretien** | Accumule des stories STAR+Réflexion à travers les évaluations — 5-10 histoires maîtresses pour répondre à n'importe quelle question comportementale |
| **Scripts de négociation** | Cadres de négociation salariale, contre le discount géographique, levier d'offre concurrente |
| **Génération PDF ATS** | CVs avec injection de mots-clés, design Space Grotesk + DM Sans |
| **Scanner portails France** | France Travail API, APEC, Cadremploi, WTTJ, Talent.io, Hellowork, Indeed FR, LesJeudis, Kicklox + 15 entreprises françaises directement scannées |
| **Scan LinkedIn navigateur** | Mode interactif via browser_navigate + browser_snapshot — pas d'API, juste votre session Chrome |
| **Traitement batch** | Évaluation parallèle avec des workers `claude -p` |
| **Dashboard TUI** | Interface terminal pour parcourir, filtrer et trier votre pipeline |
| **Humain dans la boucle** | L'IA évalue et recommande, vous décidez et agissez. Le système ne soumet jamais une candidature — c'est toujours votre décision finale |
| **Intégrité pipeline** | Merge, déduplication, normalisation des statuts, contrôles de santé automatisés |
| **Marché français natif** | CDI/CDD, statut cadre, convention SYNTEC, RTT, mutuelle, prévoyance, intéressement/participation, 13e mois, titres-restaurant |

## Démarrage rapide

```bash
# 1. Cloner et installer
git clone https://github.com/santifer/career-ops.git
cd career-ops && npm install
npx playwright install chromium   # Requis pour la génération PDF

# 2. Vérifier le setup
npm run doctor                     # Valide tous les prérequis

# 3. Configurer
cp config/profile.example.yml config/profile.yml   # Remplir avec vos infos
cp templates/portals.example.yml portals.yml        # Personnaliser les entreprises

# 4. Activer les modes français
# Ajouter dans config/profile.yml :
# language:
#   primary: fr
#   modes_dir: modes/fr

# 5. Ajouter votre CV
# Créer cv.md à la racine du projet avec votre CV en markdown

# 6. Lancer Claude Code
claude   # Ouvrir Claude Code dans ce répertoire

# Puis demander à Claude de s'adapter à vous :
# "Adapte le système pour le marché français, je cible CTO et Head of AI"
# "Mets à jour mon profil avec ce CV"
# "Ajoute ces entreprises dans portals.yml"
```

> **Le système est conçu pour être personnalisé par Claude lui-même.** Modes, archetypes, poids de scoring, scripts de négociation — demandez à Claude de les modifier. Il lit les mêmes fichiers qu'il utilise, donc il sait exactement quoi éditer.

Voir [docs/SETUP.md](docs/SETUP.md) pour le guide de setup complet.

## Utilisation

Career-ops est une commande unique avec plusieurs modes :

```
/career-ops                  → Afficher toutes les commandes disponibles
/career-ops {coller une JD}  → Auto-pipeline complet (évaluation + PDF + tracker)
/career-ops scan             → Scanner les portails pour de nouvelles offres
/career-ops linkedin-scan    → Scanner LinkedIn via le navigateur (session Chrome requise)
/career-ops pdf              → Générer un CV optimisé ATS
/career-ops batch            → Évaluer plusieurs offres en batch
/career-ops tracker          → Voir l'état des candidatures
/career-ops apply            → Remplir les formulaires de candidature avec l'IA
/career-ops pipeline         → Traiter les URLs en attente
/career-ops contacto         → Message de prise de contact LinkedIn
/career-ops deep             → Recherche approfondie sur l'entreprise
/career-ops training         → Évaluer une formation/certification
/career-ops project          → Évaluer un projet portfolio
```

Ou collez simplement une URL ou description de poste directement — career-ops la détecte automatiquement et lance le pipeline complet.

## Comment ça marche

```
Vous collez une URL ou description de poste
        │
        ▼
┌──────────────────────┐
│  Détection           │  Classifie : CTO / Head of AI / VP Engineering
│  Multi-Positions     │  (lecture config/profile.yml → target_positions)
└────────┬─────────────┘
         │
┌────────▼─────────────┐
│  Évaluation A-F      │  Match CV, gaps, recherche comp, stories STAR
│  (lit cv.md)         │  Scoring distinct par position cible
└────────┬─────────────┘
         │
    ┌────┼────┐
    ▼    ▼    ▼
 Rapport  PDF  Tracker
  .md    .pdf   .tsv
  (avec position best-fit)
```

## Portails français pré-configurés

Le scanner vient avec **15+ entreprises françaises** et **20+ requêtes de recherche** couvrant l'ensemble du marché français.

### Entreprises scannées directement via API

| Entreprise | ATS | Secteur |
|------------|-----|---------|
| Mistral AI | Lever | IA / LLM lab européen |
| Doctolib | Greenhouse | Healthtech licorne |
| Contentsquare | Lever | Analytics expérience digitale |
| Photoroom | Ashby | IA édition image |
| Pigment | Lever | Planning IA |
| Alan | Ashby | Assurance santé tech |
| Qonto | Lever | Banque pro fintech |
| Pennylane | Ashby | Comptabilité SaaS |
| Backmarket | Ashby | Marketplace reconditionné |
| Mirakl | Greenhouse | Marketplace SaaS |

### Portails agrégateurs scannés

| Portail | Type | Spécialité |
|---------|------|------------|
| **France Travail** | API publique | CDI cadres, qualification=9 |
| **APEC** | WebSearch | Cadres IA, direction technique |
| **Cadremploi** | WebSearch | Postes cadres C-level |
| **Welcome to the Jungle** | WebSearch | Startups & scale-ups FR |
| **Indeed France** | WebSearch | Large spectre + CDI |
| **Talent.io** | WebSearch | Profils tech senior |
| **Hellowork** | WebSearch | Marché français large |
| **LesJeudis** | WebSearch | Tech & digital FR |
| **Kicklox** | WebSearch | Ingénieurs & experts |
| **LinkedIn France** | Navigateur | Mode scan interactif |

### Activer France Travail API (gratuit, 2 min)

```bash
# 1. S'inscrire sur : https://francetravail.io/data/api-v2/acces-en-2-minutes
# 2. Générer un token Bearer depuis votre tableau de bord
# 3. Ajouter dans .env :
echo "FRANCE_TRAVAIL_TOKEN=votre_token" >> .env
# 4. Les entrées France Travail sont déjà activées dans portals.yml
```

### Scanner LinkedIn via le navigateur

LinkedIn n'a pas d'API publique. Le mode scan interactif contourne ce problème :

```bash
# Dans Claude Code, lancer :
/career-ops linkedin-scan

# Claude va :
# 1. Naviguer vers linkedin.com/jobs/search avec vos positions cibles
# 2. Capturer les offres via browser_snapshot
# 3. Dédupliquer et filtrer par mots-clés
# 4. Ajouter les nouvelles offres dans data/pipeline.md
```

**Prérequis :** Session LinkedIn active dans Chrome. Ne pas scanner plus de 2x/jour.

## Ciblage multi-positions

Career-ops gère simultanément plusieurs positions cibles avec scoring distinct pour chacune.

### Configuration

```yaml
# config/profile.yml
target_positions:
  - id: "cto"
    title: "CTO / Directeur Technique"
    archetypes:
      - name: "AI Solutions Architect"
        weight: 0.35
      - name: "AI Platform / LLMOps Engineer"
        weight: 0.30
      - name: "AI Transformation Lead"
        weight: 0.35
    score_threshold: 3.8

  - id: "head-ai"
    title: "Head of AI / Directeur IA"
    archetypes:
      - name: "Technical AI PM"
        weight: 0.45
      - name: "AI Platform / LLMOps Engineer"
        weight: 0.30
      - name: "Agentic Workflows / Automation"
        weight: 0.25
    score_threshold: 4.0

  - id: "vp-eng"
    title: "VP Engineering / Engineering Director"
    archetypes:
      - name: "AI Solutions Architect"
        weight: 0.40
      - name: "AI Platform / LLMOps Engineer"
        weight: 0.40
      - name: "AI Transformation Lead"
        weight: 0.20
    score_threshold: 3.7
```

### Ce que vous obtenez dans chaque rapport

```
## Bloc C — Alignement Multi-Position

| Position      | Archetype match | Niveau | Périmètre | Score /5 | Verdict  |
|---------------|----------------|--------|-----------|----------|----------|
| CTO           | 4.1            | ✅      | ✅         | 4.0/5    | Fort     |
| Head of AI    | 4.6            | ✅      | ✅         | 4.5/5    | Fort     |
| VP Engineering| 3.5            | ⚠️      | ✅         | 3.6/5    | Possible |

Meilleur fit : Head of AI (4.5/5)
```

Le tracker enregistre le meilleur fit et les scores par position dans une colonne dédiée.

## Activer les modes français

### Option 1 — Par session

Dites à Claude en début de session :
> "Utilise les modes français sous `modes/fr/`."

### Option 2 — En permanence (recommandé)

Ajoutez dans `config/profile.yml` :

```yaml
language:
  primary: fr
  modes_dir: modes/fr
```

Claude utilisera automatiquement les modes français pour toutes les évaluations.

### Modes disponibles en français

| Fichier | Rôle |
|---------|------|
| `modes/fr/_shared.md` | Contexte partagé, archetypes, spécificités marché FR |
| `modes/fr/offre.md` | Évaluation complète (Blocs A-F + multi-positions) |
| `modes/fr/postuler.md` | Assistant live pour remplir les formulaires |
| `modes/fr/pipeline.md` | Inbox d'URLs / traitement en lot |
| `modes/fr/linkedin-scan.md` | Scanner LinkedIn via navigateur |

## Spécificités marché français

Les modes français intègrent nativement :

| Élément | Détail |
|---------|--------|
| **CDI/CDD** | Distinction contrat permanent vs durée déterminée |
| **Statut cadre** | Classification et impact sur rémunération, RTT, avantages |
| **Convention SYNTEC** | Standard IT/conseil — grilles salariales, classifications |
| **RTT** | Réduction du Temps de Travail — 8-12 jours/an pour les cadres |
| **Intéressement/participation** | Peut représenter 1-3 mois de salaire |
| **13e mois** | Prime de fin d'année, à factoriser dans le brut annuel |
| **Titres-restaurant** | ~60% employeur, valeur mensuelle ~200€ |
| **Mutuelle & prévoyance** | Couverture santé + incapacité/décès |
| **CSE** | Avantages comité social — vacances, culture, sport |
| **Portage salarial** | Statut hybride freelance, ~10% de surcoût |
| **Période d'essai** | 2-4 mois pour les cadres, renouvelable 1x |
| **Préavis** | 1-3 mois pour les cadres selon convention |

## Structure du projet

```
career-ops/
├── CLAUDE.md                    # Instructions de l'agent
├── cv.md                        # Votre CV (à créer)
├── article-digest.md            # Vos proof points (optionnel)
├── config/
│   └── profile.example.yml      # Template de profil (copier vers profile.yml)
├── modes/                       # Modes en anglais
│   ├── _shared.md               # Contexte partagé
│   ├── oferta.md                # Évaluation unique
│   └── ...
├── modes/fr/                    # Modes en français
│   ├── _shared.md               # Contexte partagé FR
│   ├── offre.md                 # Évaluation (Blocs A-F + multi-positions)
│   ├── postuler.md              # Assistant candidature live
│   ├── pipeline.md              # Traitement inbox
│   └── linkedin-scan.md         # Scan LinkedIn navigateur
├── templates/
│   ├── cv-template.html         # Template CV optimisé ATS
│   └── portals.example.yml      # Config scanner (portails FR inclus)
├── scan.mjs                     # Scanner zéro-token (Greenhouse/Ashby/Lever/France Travail)
├── .env.example                 # Variables d'environnement (FRANCE_TRAVAIL_TOKEN)
├── batch/
│   ├── batch-prompt.md          # Prompt worker autonome
│   └── batch-runner.sh          # Orchestrateur
├── dashboard/                   # Interface TUI en Go
├── data/                        # Vos données de suivi (gitignored)
├── reports/                     # Rapports d'évaluation (gitignored)
└── output/                      # PDFs générés (gitignored)
```

## Stack technique

- **Agent** : Claude Code avec skills et modes personnalisés
- **PDF** : Playwright + template HTML
- **Scanner** : API Greenhouse / Ashby / Lever / France Travail + WebSearch
- **LinkedIn** : browser_navigate + browser_snapshot (MCP Playwright)
- **Dashboard** : Go + Bubble Tea + Lipgloss (thème Catppuccin Mocha)
- **Données** : Tables Markdown + config YAML + fichiers TSV batch

## Variables d'environnement

```bash
# Copier .env.example vers .env et remplir :

# France Travail API (gratuit)
# Inscription : https://francetravail.io/data/api-v2/acces-en-2-minutes
FRANCE_TRAVAIL_TOKEN=votre_token_bearer
```

## Also Open Source

- **[cv-santiago](https://github.com/santifer/cv-santiago)** — Le site portfolio (santifer.io) avec chatbot IA, dashboard LLMOps et études de cas. Si vous avez besoin d'un portfolio à montrer en parallèle de votre recherche d'emploi, forkez-le et faites-en le vôtre.

## À propos de l'auteur

Je suis Santiago — Head of Applied AI, ex-fondateur (j'ai construit et vendu une entreprise qui tourne encore avec mon nom dessus). J'ai construit career-ops pour gérer ma propre recherche d'emploi. Ça a marché.

Mon portfolio et autres projets open source → [santifer.io](https://santifer.io)

☕ [Offrir un café](https://buymeacoffee.com/santifer) si career-ops a aidé votre recherche d'emploi.

## Avertissement légal

**career-ops est un outil local open source — PAS un service hébergé.** En utilisant ce logiciel, vous reconnaissez :

1. **Vous contrôlez vos données.** Votre CV, coordonnées et données personnelles restent sur votre machine et sont envoyés directement au fournisseur IA que vous choisissez. Nous ne collectons, stockons ni n'avons accès à aucune de vos données.
2. **Vous contrôlez l'IA.** Les prompts par défaut instruisent l'IA de ne pas soumettre automatiquement des candidatures, mais les modèles IA peuvent se comporter de manière imprévisible. **Toujours relire le contenu généré par l'IA avant de soumettre.**
3. **Vous respectez les CGU tiers.** Vous devez utiliser cet outil conformément aux Conditions d'Utilisation des portails emploi avec lesquels vous interagissez (Greenhouse, Lever, Workday, LinkedIn, France Travail, etc.).
4. **Aucune garantie.** Les évaluations sont des recommandations, pas des vérités. Les auteurs ne sont pas responsables des résultats de candidatures, refus, restrictions de compte ou toute autre conséquence.

Voir [LEGAL_DISCLAIMER.md](LEGAL_DISCLAIMER.md) pour les détails complets.

## Contribuer

- Issues et PRs bienvenues — voir [CONTRIBUTING.md](CONTRIBUTING.md)
- Pour améliorer les modes français : respecter le lexique dans `modes/fr/README.md`
- Communauté : [Discord](https://discord.gg/8pRpHETxa4)

Embauché grâce à career-ops ? [Partagez votre histoire !](https://github.com/santifer/career-ops/issues/new?template=i-got-hired.yml)

## Licence

MIT

## Contact

[![Website](https://img.shields.io/badge/santifer.io-000?style=for-the-badge&logo=safari&logoColor=white)](https://santifer.io)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/santifer)
[![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/8pRpHETxa4)

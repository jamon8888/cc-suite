# Job-OS

<p align="center">
  <img src="docs/hero-banner.jpg" alt="Job-OS — Système de Recherche d'Emploi Multi-Agents" width="800">
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
  <img src="https://img.shields.io/badge/Go-00ADD8?style=flat&logo=go&logoColor=white" alt="Go">
  <img src="https://img.shields.io/badge/Playwright-2EAD33?style=flat&logo=playwright&logoColor=white" alt="Playwright">
  <img src="https://img.shields.io/badge/Licence-MIT-blue.svg" alt="MIT">
  <a href="https://discord.gg/8pRpHETxa4"><img src="https://img.shields.io/badge/Discord-5865F2?style=flat&logo=discord&logoColor=white" alt="Discord"></a>
  <br>
  <img src="https://img.shields.io/badge/FR-blue?style=flat" alt="FR">
  <img src="https://img.shields.io/badge/EN-lightgrey?style=flat" alt="EN">
  <img src="https://img.shields.io/badge/DE-lightgrey?style=flat" alt="DE">
  <img src="https://img.shields.io/badge/JA-lightgrey?style=flat" alt="JA">
  <img src="https://img.shields.io/badge/PT-lightgrey?style=flat" alt="PT">
  <img src="https://img.shields.io/badge/RU-lightgrey?style=flat" alt="RU">
</p>

---

<p align="center">
  <img src="docs/demo.gif" alt="Job-OS Demo" width="800">
</p>

<p align="center"><strong>740+ offres évaluées · 100+ CV personnalisés · 1 poste de rêve décroché</strong></p>

<p align="center"><a href="https://discord.gg/8pRpHETxa4"><img src="https://img.shields.io/badge/Rejoindre_la_communauté-Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord"></a></p>

## C'est quoi

Job-OS transforme n'importe quel CLI IA en une centrale de recherche d'emploi complète. Fini les tablettes Excel à tenir à jour manuellement — vous obtenez un pipeline piloté par IA qui :

- **Évalue les offres** avec un système de notation structuré A-F (10 dimensions pondérées)
- **Génère des CV sur mesure** — optimisés ATS, personnalisés pour chaque offre
- **Scanne les portails** automatiquement (Greenhouse, Ashby, Lever, pages carrières)
- **Traite en lot** — évaluez 10+ offres en parallèle avec des sous-agents
- **Suit tout** dans une source de vérité unique avec contrôles d'intégrité
- **Multi-tracks** — ciblez simultanément plusieurs familles de postes (ex. Ingénieur IA + Designer UX/UI), chacune avec son propre CV

> **Important : ce n'est PAS un outil à envoyer à la chaîne.** Job-OS est un filtre — il vous aide à trouver les quelques offres qui valent vraiment votre temps parmi des centaines. Le système déconseille fortement de postuler à tout ce qui score sous 4,0/5. Votre temps est précieux, celui du recruteur aussi. Relisez toujours avant d'envoyer.

Job-OS est agentique : Claude Code navigue sur les pages carrières avec Playwright, évalue le fit en raisonnant sur votre CV face à la fiche de poste (pas du matching de mots-clés), et adapte votre CV à chaque annonce.

> **Attention : les premières évaluations ne seront pas parfaites.** Le système ne vous connaît pas encore. Alimentez-le — votre CV, votre histoire de carrière, vos preuves concrètes, vos préférences, vos forces, ce que vous évitez. Plus vous le nourrissez, plus il s'améliore. Pensez à l'onboarding d'un nouveau chargé de recrutement : la première semaine, il apprend à vous connaître ; ensuite, il devient indispensable.

Construit par quelqu'un qui l'a utilisé pour évaluer 740+ offres, générer 100+ CV et décrocher un poste de Head of Applied AI.

## Fonctionnalités

| Fonctionnalité | Description |
|----------------|-------------|
| **Auto-Pipeline** | Collez une URL, obtenez une évaluation complète + PDF + entrée dans le tracker |
| **Évaluation en 6 blocs** | Résumé du poste, match CV, stratégie de niveau, étude de rémunération, personnalisation, préparation entretien (STAR+R) |
| **Banque d'histoires d'entretien** | Accumule des stories STAR+Réflexion à chaque évaluation — 5 à 10 histoires maîtresses qui répondent à n'importe quelle question comportementale |
| **Scripts de négociation** | Frameworks de négociation salariale, réponse à la décote géographique, levier d'offres concurrentes |
| **Génération PDF ATS** | CV avec mots-clés injectés, design Space Grotesk + DM Sans |
| **Scanner de portails** | 45+ entreprises préconfigurées + requêtes personnalisées sur Ashby, Greenhouse, Lever, Wellfound |
| **Traitement en lot** | Évaluation parallèle avec des workers `claude -p` |
| **Dashboard TUI** | Interface terminal pour parcourir, filtrer et trier votre pipeline |
| **Humain dans la boucle** | L'IA évalue et recommande, vous décidez et agissez. Le système ne soumet jamais une candidature — vous avez toujours le dernier mot |
| **Intégrité du pipeline** | Fusion automatisée, déduplication, normalisation des statuts, contrôles de santé |
| **Multi-tracks** | Configurez plusieurs pistes de recherche (IA, UX/UI, Product, etc.) avec un CV distinct par track |

## Démarrage rapide

```bash
# 1. Cloner et installer
git clone https://github.com/jamon8888/cc-suite.git
cd cc-suite/job-os && npm install
npx playwright install chromium   # Requis pour la génération de PDF

# 2. Vérifier le setup
npm run doctor                     # Valide tous les prérequis

# 3. Configurer
cp config/profile.example.yml config/profile.yml  # Remplissez vos informations
cp templates/portals.example.yml portals.yml       # Personnalisez les entreprises

# 4. Ajouter votre CV
# Créez cv.md à la racine du projet avec votre CV en markdown

# 5. Personnaliser avec Claude
claude   # Ouvrez Claude Code dans ce répertoire
# Lancez /job-os setup pour l'assistant d'onboarding

# 6. Commencer à utiliser
# Collez une URL d'offre ou lancez /job-os
```

> **Le système est conçu pour être personnalisé par Claude lui-même.** Modes, archetypes, pondérations, scripts de négociation — demandez simplement à Claude de les modifier. Il lit les mêmes fichiers qu'il utilise, donc il sait exactement quoi changer.

Consultez [docs/SETUP.md](docs/SETUP.md) pour le guide d'installation complet.

## Utilisation

Job-OS est une seule commande slash avec plusieurs modes :

```
/job-os                 → Afficher toutes les commandes disponibles
/job-os setup           → Assistant d'onboarding (configuration initiale ou changement de tracks)
/job-os {coller une offre}  → Auto-pipeline complet (évaluation + PDF + tracker)
/job-os scan            → Scanner les portails pour de nouvelles offres
/job-os pdf             → Générer un CV optimisé ATS
/job-os batch           → Évaluer plusieurs offres en lot
/job-os tracker         → Voir le statut des candidatures
/job-os apply           → Remplir des formulaires de candidature avec l'IA
/job-os pipeline        → Traiter les URLs en attente
/job-os contacto        → Message de prise de contact LinkedIn
/job-os deep            → Recherche approfondie sur une entreprise
/job-os training        → Évaluer une formation ou certification
/job-os project         → Évaluer un projet portfolio
```

Collez simplement une URL ou une description de poste directement — Job-OS la détecte automatiquement et lance le pipeline complet.

## Comment ça fonctionne

```
Vous collez une URL ou une description de poste
        │
        ▼
┌──────────────────┐
│  Détection du    │  Classe : IA/ML · UX/UI · PM · Data · DevOps · Leadership...
│  track & archétype│
└────────┬─────────┘
         │
┌────────▼─────────┐
│  Évaluation A-F  │  Match, lacunes, étude de rémunération, stories STAR
│  (lit cv-{track})│
└────────┬─────────┘
         │
    ┌────┼────┐
    ▼    ▼    ▼
 Rapport PDF Tracker
  .md   .pdf  .tsv
```

## Portails préconfigurés

Le scanner est livré avec **45+ entreprises** prêtes à scanner et **19 requêtes de recherche** sur les principaux job boards. Copiez `templates/portals.example.yml` vers `portals.yml` et ajoutez les vôtres :

**IA & Machine Learning :** Anthropic, OpenAI, Mistral, Cohere, LangChain, Pinecone, Hugging Face  
**Voice AI :** ElevenLabs, PolyAI, Parloa, Hume AI, Deepgram, Vapi, Bland AI  
**Plateformes IA :** Retool, Airtable, Vercel, Temporal, Glean, Arize AI  
**Centre de contact :** Ada, LivePerson, Sierra, Decagon, Talkdesk, Genesys  
**Enterprise :** Salesforce, Twilio, Gong, Dialpad  
**LLMOps :** Langfuse, Weights & Biases, Lindy, Cognigy, Speechmatics  
**Automatisation :** n8n, Zapier, Make.com  
**Europe & France :** Mistral AI, Hugging Face, Photoroom, Pigment, Contentsquare, Malt, Pennylane, Factorial, Attio, Tinybird, Clarity AI, Travelperk  

**Job boards scannés :** Ashby, Greenhouse, Lever, Welcome to the Jungle, APEC, Cadremploi, Wellfound, Workable

## Multi-Tracks : plusieurs pistes de recherche

Job-OS supporte plusieurs tracks de recherche simultanées. L'assistant de setup (`/job-os setup`) vous guide pour :

1. **Choisir vos tracks** parmi 23 options (IA/ML, UX Designer, Product Manager, DevOps, etc.)
2. **Créer un CV distinct** par track (`cv-ai-engineer.md`, `cv-ux-designer.md`, etc.)
3. **Configurer les archetypes** et le cadrage narratif pour chaque track
4. **Fusionner les mots-clés** dans le scanner automatiquement

Lors d'une évaluation, le système détecte le track correspondant à l'offre et utilise le bon CV.

## Dashboard TUI

Le dashboard terminal intégré vous permet de parcourir votre pipeline visuellement :

```bash
cd dashboard
go build -o job-dashboard .
./job-dashboard --path ..
```

Fonctionnalités : 6 onglets de filtre, 4 modes de tri, vue groupée/plate, prévisualisations en lazy-load, changement de statut en ligne.

## Structure du projet

```
job-os/
├── CLAUDE.md                    # Instructions de l'agent
├── cv.md                        # Votre CV (à créer)
├── cv-{track}.md                # CV par track (ex. cv-ux-designer.md)
├── article-digest.md            # Vos preuves concrètes (optionnel)
├── config/
│   └── profile.example.yml      # Modèle de profil (French par défaut)
├── modes/                       # 15 modes de compétences
│   ├── _shared.md               # Contexte partagé
│   ├── setup.md                 # Assistant d'onboarding multi-tracks
│   ├── oferta.md                # Évaluation individuelle
│   ├── pdf.md                   # Génération de PDF
│   ├── scan.md                  # Scanner de portails
│   ├── batch.md                 # Traitement en lot
│   └── ...
├── modes/fr/                    # Modes en français (défaut)
│   ├── _shared.md
│   ├── offre.md                 # Évaluation en français
│   ├── postuler.md              # Candidature en français
│   └── pipeline.md
├── modes/de/                    # Modes en allemand (marché DACH)
├── modes/ja/                    # Modes en japonais
├── modes/pt/                    # Modes en portugais
├── modes/ru/                    # Modes en russe
├── templates/
│   ├── cv-template.html         # Modèle de CV optimisé ATS
│   ├── portals.example.yml      # Config du scanner
│   └── states.yml               # Statuts canoniques
├── batch/
│   ├── batch-prompt.md          # Prompt de worker autonome
│   └── batch-runner.sh          # Script d'orchestration
├── dashboard/                   # Dashboard TUI en Go
├── data/                        # Vos données de suivi (gitignored)
├── reports/                     # Rapports d'évaluation (gitignored)
├── output/                      # PDFs générés (gitignored)
├── fonts/                       # Space Grotesk + DM Sans
├── docs/                        # Setup, personnalisation, architecture
└── examples/                    # Exemples de CV, rapport, preuves
```

## Stack technique

![Claude Code](https://img.shields.io/badge/Claude_Code-000?style=flat&logo=anthropic&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat&logo=playwright&logoColor=white)
![Go](https://img.shields.io/badge/Go-00ADD8?style=flat&logo=go&logoColor=white)
![Bubble Tea](https://img.shields.io/badge/Bubble_Tea-FF75B5?style=flat&logo=go&logoColor=white)

- **Agent** : Claude Code avec skills et modes personnalisés
- **PDF** : Playwright + template HTML
- **Scanner** : Playwright + APIs Greenhouse/Ashby/Lever + WebSearch
- **Dashboard** : Go + Bubble Tea + Lipgloss (thème Catppuccin Mocha)
- **Données** : tables Markdown + config YAML + fichiers TSV batch

## Historique des étoiles

<a href="https://www.star-history.com/?repos=jamon8888%2Fcc-suite&type=timeline&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=jamon8888/cc-suite&type=timeline&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=jamon8888/cc-suite&type=timeline&legend=top-left" />
   <img alt="Historique des étoiles" src="https://api.star-history.com/chart?repos=jamon8888/cc-suite&type=timeline&legend=top-left" />
 </picture>
</a>

## Avertissement

**Job-OS est un outil local open source — PAS un service hébergé.** En utilisant ce logiciel, vous reconnaissez que :

1. **Vous contrôlez vos données.** Votre CV, vos coordonnées et vos données personnelles restent sur votre machine et sont envoyées directement au fournisseur IA que vous choisissez (Anthropic, etc.). Nous ne collectons, ne stockons ni n'avons accès à aucune de vos données.
2. **Vous contrôlez l'IA.** Les prompts par défaut instruisent l'IA de ne pas soumettre automatiquement des candidatures, mais les modèles IA peuvent se comporter de façon imprévisible. Si vous modifiez les prompts, vous le faites à vos risques. **Relisez toujours le contenu généré avant de soumettre.**
3. **Vous respectez les CGU tierces.** Vous devez utiliser cet outil conformément aux Conditions d'Utilisation des portails carrières avec lesquels vous interagissez (Greenhouse, Lever, Workday, LinkedIn, etc.). N'utilisez pas cet outil pour spammer des employeurs.
4. **Aucune garantie.** Les évaluations sont des recommandations, pas des vérités. Les modèles IA peuvent halluciner des compétences ou des expériences. Les auteurs ne sont pas responsables des résultats d'emploi, candidatures rejetées, restrictions de compte ou autres conséquences.

Voir [LEGAL_DISCLAIMER.md](LEGAL_DISCLAIMER.md) pour les détails complets. Ce logiciel est fourni sous [licence MIT](LICENSE) "en l'état", sans garantie d'aucune sorte.

## Contributeurs

<a href="https://github.com/jamon8888/cc-suite/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=jamon8888/cc-suite" />
</a>

Vous avez été recruté grâce à Job-OS ? [Partagez votre histoire !](https://github.com/jamon8888/cc-suite/issues/new?template=i-got-hired.yml)

## Licence

MIT

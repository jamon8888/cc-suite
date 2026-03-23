# Plugin Comms Strategy

**L'OS de pilotage stratégique pour les agences de communication brand et intégrée.**

Du brief client à l'architecture de campagne — intelligence audience, messagerie, paysage médias, mesure, gestion de crise et développement commercial. Bilingue FR/EN. Fonctionne en autonome, sans clé API requise.

---

## Pour qui

| Profil | Ce que vous en faites |
|--------|----------------------|
| **Stratège en communication** | Plans annuels, plateformes de campagne, architecture de messages |
| **Directeur de clientèle** | Décodage de brief, préparation de réunion client, pilotage des pitchs |
| **Fondateur d'agence** | Développement commercial, production de pitch, veille concurrentielle |
| **Responsable marque (côté annonceur)** | Brief des agences, audit de leurs livrables, construction de frameworks internes |

Adapté pour : agences RP, cabinets de stratégie de marque, agences de communication intégrée, directions de la communication d'entreprise.

---

## Démarrage rapide (3 minutes)

### Étape 1 — Installer le plugin

Copiez le dossier `comms-strategy/` dans votre répertoire de plugins Cowork, ou installez-le via la marketplace.

### Étape 2 — Configurer votre profil agence

```
/comms:start
```

Un entretien de 12 questions sur votre agence. Crée votre profil et structure l'espace de travail PARA complet. Durée : 3 à 5 minutes. À faire une seule fois.

### Étape 3 — Décoder votre premier brief

```
/comms:brief
```

Collez n'importe quel brief client (ou décrivez-le à l'oral). Obtenez en quelques minutes une Plateforme Stratégique structurée — défi business, défi de communication, définition de l'audience, insight, territoire d'idée, KPIs.

---

## Tout ce que vous pouvez faire

| Commande | Ce que vous obtenez |
|----------|-------------------|
| `/comms:start` | Onboarding agence — profil, espace de travail PARA, contexte de session |
| `/comms:brief` | Décoder un brief client en Plateforme Stratégique complète |
| `/comms:strategy` | Construire une stratégie de communication intégrée (pipeline de 8 compétences) |
| `/comms:audience` | Recherche audience approfondie — segments, portraits, tensions, comportements médias |
| `/comms:campaign` | Concevoir une campagne complète — concept, mix PESO, activations phasées, calendrier, budget |
| `/comms:pitch` | Construire un pitch de développement commercial de A à Z — recherche, diagnostic, structure de deck |
| `/comms:monitor` | Digest hebdomadaire d'intelligence médias et concurrentielle |
| `/comms:measure` | Définir le framework KPI — architecture de mesure à 4 niveaux avec modèles de dashboard |
| `/comms:crisis` | Cartographier les scénarios de risque, construire les protocoles de réponse, rédiger les déclarations |
| `/comms:sprint` | **Autonome** — brief en entrée, 9 documents stratégiques en sortie *(voir ci-dessous)* |

---

## Le Sprint Stratégique (workflow autonome)

La fonctionnalité phare. Une commande enchaîne automatiquement les 8 compétences.

```
/comms:sprint                                  → demande le brief
/comms:sprint "votre brief ici"                → traite le texte en ligne
/comms:sprint data/0-Inbox/brief-client.md     → lit depuis le fichier
```

**Ce qui se passe :**

```
Phase 1  Analyse du brief        → strategic-platform.md
Phase 2  Audience + Concurrence  → audience-portrait.md + competitive-comms-map.md  [en parallèle]
Phase 3  Médias + Parties pren.  → media-landscape.md + stakeholder-map.md          [en parallèle]

         ⏸️  Point de contrôle (5 minutes)
         Résumé plateforme en 5 lignes + 3 hypothèses stratégiques + espace blanc concurrentiel
         Répondez "continuer" pour avancer — ou "ajuster [élément]" pour réviser avant de continuer

Phase 4  Architecture des messages → message-architecture.md
Phase 5  Stratégie de campagne     → campaign-brief.md
Phase 6  Framework de mesure       → measurement-framework.md
         Synthèse du sprint        → sprint-summary.md
```

**Résultat** : 9 documents répartis dans deux dossiers PARA :

```
data/1-Projets/clients/[client]/          data/1-Projets/campaigns/[campagne]/
  strategic-platform.md                     campaign-brief.md
  audience-portrait.md                      measurement-framework.md
  competitive-comms-map.md
  media-landscape.md
  stakeholder-map.md
  message-architecture.md
  sprint-summary.md
```

**Un seul point de contrôle, pas zéro.** Tout ce qui précède est factuel et basé sur la recherche — généré de façon autonome. Le point de contrôle est le moment de l'orientation stratégique : la seule décision qu'un stratège doit prendre avant que les messages et la campagne se construisent.

**Ce que montre le point de contrôle :**
- Résumé de la plateforme en 5 lignes (défi business, défi de communication, archétype audience, insight, territoire d'idée)
- 3 hypothèses stratégiques avec les conséquences si elles s'avèrent fausses
- L'espace blanc concurrentiel : l'angle ou le canal que les concurrents n'utilisent pas

**Ce que contient sprint-summary.md :**
Après la complétion, la synthèse est votre document de navigation : index complet des fichiers avec description en une ligne, les 3 paris stratégiques pris (avec justification + approche de validation), 5 questions ouvertes pour la prochaine réunion client, et l'ordre de présentation recommandé pour la revue stratégique.

**Les briefs incomplets fonctionnent aussi.** Si le brief manque d'informations, le sprint comble les lacunes avec des hypothèses issues de la recherche web — chaque hypothèse est marquée `[TBC]` et remontée au point de contrôle et dans la synthèse. Vous les validez avant de présenter au client.

**Choix de langue.** Les livrables suivent la langue du brief. Pour forcer la langue : ajoutez `[FR]` ou `[EN]` en fin de commande.
```
/comms:sprint data/0-Inbox/brief.md [FR]
```

**Après le sprint :**
```
/comms:pitch [client]   → Si c'est un pitch de développement commercial
/comms:crisis [client]  → Ajouter la gestion de crise au package
```

---

## Parcours types

### Du brief à la stratégie complète

```
Le client envoie le brief
   ↓
/comms:brief         → Plateforme Stratégique décodée, manques identifiés
   ↓
[Réunion client pour combler les manques]
   ↓
/comms:strategy      → Stratégie complète construite : audience, concurrence, médias,
                       messages, campagne, mesure (8 compétences en séquence)
   ↓
Document stratégique prêt pour la présentation
```

Ou directement :
```
/comms:sprint        → Lance toute la séquence de manière autonome
```

---

### Pitch de développement commercial

```
Appel d'offres reçu
   ↓
/comms:pitch         → Recherche sur le prospect, diagnostic stratégique,
                       recommandation, structure du deck
   ↓
pitch-builder-agent  → Assemble le pitch complet (17–20 slides),
                       rédige les points de passage, crée le brief design
   ↓
Transmission à l'équipe design
```

---

### Veille concurrentielle hebdomadaire

Chaque lundi à 8h30, le campaign-monitor-agent s'exécute automatiquement :
- Analyse la couverture presse de tous les clients actifs
- Signale les mouvements et nouvelles campagnes des concurrents
- Identifie les opportunités de newsjacking
- Dépose un `weekly-intelligence-[date].md` dans votre dossier projets

Aucune action requise. Consultez le fichier le lundi matin.

---

## Votre espace de travail (structure PARA)

Après `/comms:start`, votre dossier `data/` ressemble à ceci :

```
data/
├── 0-Inbox/                      Déposez vos nouveaux briefs ici
│
├── 1-Projets/                    Travail client actif
│   ├── clients/
│   │   └── [NomClient]/
│   │       ├── strategic-platform.md
│   │       ├── audience-portrait.md
│   │       ├── message-architecture.md
│   │       ├── media-landscape.md
│   │       ├── competitive-comms-map.md
│   │       ├── stakeholder-map.md
│   │       ├── crisis-playbook.md
│   │       └── sprint-summary.md
│   ├── campaigns/
│   │   └── [NomCampagne]/
│   │       ├── campaign-brief.md
│   │       └── measurement-framework.md
│   └── pitches/
│       └── [NomProspect]/
│           ├── pitch-brief.md
│           ├── pitch-deck-final.md
│           └── commercial-proposal.md
│
├── 2-Domaines/                   Ressources agence (permanentes)
│   ├── agency-profile.md         ← Créé par /comms:start
│   ├── brand-voice-charter.md    ← Créé par brand-voice-auditor
│   ├── media-contacts/
│   └── voice-guidelines/
│
├── 3-Ressources/                 Matériaux de référence
│   ├── templates/
│   ├── case-studies/
│   └── research/
│
└── 4-Archives/                   Campagnes terminées + pitchs clos
    ├── campaigns/
    └── pitches/
```

Utilisez `/comms:para` pour trier votre Inbox et organiser vos fichiers automatiquement.

---

## Compétences (10 modules)

Les compétences se chargent de façon progressive — uniquement ce dont votre tâche a besoin, au moment où elle en a besoin.

| Bundle | Priorité | Compétences | Ce qu'elles produisent |
|--------|----------|-------------|----------------------|
| **agency-foundations** | Toujours chargé | brief-analyzer, audience-intelligence, stakeholder-mapper | Plateforme stratégique, portrait audience, carte des parties prenantes |
| **creative-strategy** | À la demande | message-architecture, campaign-strategy, brand-voice-auditor | Hiérarchie des messages, brief campagne, charte de voix |
| **intelligence** | À la demande | media-landscape, competitive-comms | Cartographie médias + calendrier éditorial, intelligence concurrentielle |
| **agency-ops** | À la demande | comms-measurement, crisis-planner, para-organizer | Framework KPI, plan de crise, organisation des fichiers |

---

## Agents (4 travailleurs autonomes)

| Agent | Couleur | Quand il s'exécute | Ce qu'il fait |
|-------|---------|-------------------|--------------|
| **briefing-synthesizer-agent** | Bleu | Après `/comms:brief` | Audite la complétude de la plateforme, comble les manques, génère la version client finale + questions de réunion |
| **campaign-monitor-agent** | Cyan | Chaque lundi à 8h30 | Analyse presse + activité concurrentielle pour tous les clients actifs → digest hebdomadaire |
| **pitch-builder-agent** | Vert | Après `/comms:pitch` | Assemble le pitch complet (17–20 slides), rédige les points de passage, crée le brief design |
| **strategy-sprint-agent** | Violet | Déclenché par `/comms:sprint` | Orchestre le pipeline complet de 8 compétences de façon autonome |

---

## Langue

Le plugin est entièrement bilingue. La langue des sorties suit la langue de vos entrées :

- Brief rédigé en français → tous les livrables en français
- Brief en anglais → tous les livrables en anglais
- Définir explicitement : ajoutez `[FR]` ou `[EN]` à la fin de n'importe quelle commande

La préférence de langue est enregistrée dans votre profil agence après `/comms:start`.

---

## Fonctionne encore mieux avec

| Plugin | Ce que vous gagnez |
|--------|-------------------|
| **sentinel** | Contrôle qualité des décisions aux moments stratégiques clés — teste votre plateforme, vos piliers de messages et votre concept de campagne avant la présentation client |
| **copywriter** | Votre architecture de messages alimente directement la création de contenu — posts, newsletters et articles restent dans l'axe stratégique |
| **solo** | Connecte la gestion client, la facturation et le pipeline commercial à votre travail comms — toutes les opérations agence au même endroit |
| **management-consulting** | Ajoute des frameworks stratégiques profonds (5 Forces, PESTEL, McKinsey 7S) à vos documents de stratégie |

L'intégration Sentinel est intégrée : si Sentinel est installé, il propose des contrôles qualité aux 6 moments stratégiques les plus critiques (décodage du brief, rédaction des piliers de messages, concept de campagne, diagnostic de pitch, cartographie de crise, finalisation des KPIs). Non-bloquant — toujours votre choix de l'activer.

---

## Outils connectés

Voir [CONNECTORS.md](CONNECTORS.md) pour le guide complet des intégrations.

**En autonome** (aucune connexion requise) : toutes les commandes fonctionnent avec la recherche web et les fichiers locaux.

**Boosté avec** :
- Exa — recherche sémantique avancée pour la recherche audience et l'intelligence concurrentielle
- LinkedIn MCP — recherche de prospects et identification de contacts médias
- Cision / Meltwater — veille médias temps réel pour le campaign-monitor-agent
- Google Analytics / GA4 — données en direct pour les frameworks de mesure

---

## Convention de nommage des fichiers

Les fichiers créés par le plugin suivent ce format :

```
[AAAA-MM]_[TYPE]_[client-ou-sujet].md

Exemples :
  2026-02_BRIEF_renault-repositionnement.md
  2026-02_STRAT_renault-plateforme-comms.md
  2026-02_CAMP_renault-lancement-printemps.md
  2026-02_PITCH_sncf-refonte-marque.md
```

---

## Anti-jargon intégré

Chaque document rédigé par le plugin est contrôlé pour détecter les formulations creuses. Les expressions suivantes sont signalées et remplacées par un langage précis et factuel :

`innovant` · `disruptif` · `best-in-class` · `levier` · `synergie` · `holistique` · `360°` · `multi-touchpoint` · `brand journey` · `résonance` (sans préciser l'audience)

---

## Version

`1.0.0` — Version initiale

**Construit avec** :
- Meilleures pratiques de context engineering : chargement progressif des compétences, transferts par système de fichiers, CLAUDE.md à zones structurées
- Méthodologie PARA adaptée aux workflows des agences de communication
- Bilinguisme FR/EN complet

---

*Pour signaler un problème ou contribuer, ouvrez une discussion dans le dépôt.*

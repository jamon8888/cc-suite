# LinkedIn Plugin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete Claude Desktop Cowork plugin named `linkedin` that replicates the LinkedIn Content Engine as a Chrome-native, zero-dependency plugin with content generation, post queue, research, competitor monitoring, strategic commenting, autoresearch, and a self-improving learning loop.

**Architecture:** Pure plugin (commands + skills + agents + JSON data). All LinkedIn interactions go through Claude in Chrome browser automation. Identity data shared with the copywriter plugin via read-path resolution. No Python, no server, no database.

**Tech Stack:** Claude Code plugin system (SKILL.md, commands, agents, hooks), Claude in Chrome MCP tools, JSON file storage, WebSearch.

---

## File Structure

```
linkedin/
├── .claude-plugin/plugin.json          — Plugin manifest
├── .mcp.json                           — MCP config (empty)
├── hooks/hooks.json                    — SessionStart hook
├── CONNECTORS.md                       — Graceful degradation doc
├── README.md                           — Plugin overview
│
├── commands/
│   ├── linkedin.md                     — Smart router (NL intent detection)
│   ├── start.md                        — Delegates to onboarding-agent
│   ├── publier.md                      — Delegates to content-agent
│   ├── recherche.md                    — Delegates to research-agent
│   ├── commenter.md                    — Delegates to engagement-agent
│   ├── analyser.md                     — Delegates to analytics-agent
│   ├── concurrents.md                  — Delegates to competitor-agent
│   ├── file.md                         — Queue management (approve/reject/edit/schedule)
│   └── bilan.md                        — Status dashboard
│
├── skills/
│   ├── chrome-linkedin/SKILL.md        — All Chrome interaction patterns
│   ├── post-generator/
│   │   ├── SKILL.md                    — Core post generation
│   │   ├── references/
│   │   │   ├── hook-formulas.md        — 6 hook styles with templates
│   │   │   ├── templates.md            — 15 post templates (7 built-in + 8 Kleo)
│   │   │   ├── formatting-guide.md     — LinkedIn formatting rules
│   │   │   └── cta-library.md          — CTA patterns
│   │   └── examples/viral-posts.md     — Curated examples
│   │
│   ├── virality-scorer/SKILL.md        — 6-dimension scoring
│   ├── content-strategy/
│   │   ├── SKILL.md                    — Topic/tone/template selection
│   │   └── references/strategy-rules.md — Weights, angles, media rules
│   │
│   ├── comment-strategist/SKILL.md     — Draft value-adding comments
│   ├── autoresearch/SKILL.md           — A/B test hooks/tones/formats
│   ├── learning-engine/SKILL.md        — Analyze performance patterns
│   └── profile-setup/SKILL.md          — Onboarding interviews
│
├── agents/
│   ├── onboarding-agent.md             — Setup wizard
│   ├── content-agent.md                — Content pipeline orchestrator
│   ├── research-agent.md               — Multi-source research
│   ├── engagement-agent.md             — Commenting + feed interaction
│   ├── analytics-agent.md              — Scrape stats + learning
│   └── competitor-agent.md             — Monitor + analyze competitors
│
└── data/
    ├── linkedin-profile.json           — LinkedIn config + pillars
    ├── queue.json                       — Post queue
    ├── analytics.json                   — Post history + engagement
    ├── competitors.json                 — Tracked competitors
    ├── learnings.json                   — Extracted patterns
    ├── experiments.json                 — Autoresearch results
    ├── comment-targets.json             — Daily commenting tracker
    ├── research.json                    — Trending topics cache
    └── schedule-config.json             — Automation config
```

---

## Task 1: Plugin Scaffold & Data Files

**Files:**
- Create: `linkedin/.claude-plugin/plugin.json`
- Create: `linkedin/.mcp.json`
- Create: `linkedin/hooks/hooks.json`
- Create: `linkedin/CONNECTORS.md`
- Create: `linkedin/README.md`
- Create: all `linkedin/data/*.json` files (empty schemas)

- [ ] **Step 1: Create plugin manifest**

Create `linkedin/.claude-plugin/plugin.json`:

```json
{
  "name": "linkedin",
  "version": "1.0.0",
  "description": "LinkedIn growth engine. Chrome-native content pipeline: generate, queue, post, analyze, learn. Strategic commenting, competitor monitoring, autoresearch. Shared identity with copywriter plugin.",
  "author": {
    "name": "NMarchitecte"
  },
  "license": "MIT",
  "keywords": [
    "linkedin",
    "social-media",
    "content-pipeline",
    "chrome-automation",
    "growth-engine",
    "virality",
    "engagement",
    "competitor-monitoring",
    "autoresearch"
  ]
}
```

- [ ] **Step 2: Create empty MCP config**

Create `linkedin/.mcp.json`:

```json
{}
```

- [ ] **Step 3: Create SessionStart hook**

Create `linkedin/hooks/hooks.json`:

```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "Read ${CLAUDE_PLUGIN_ROOT}/data/linkedin-profile.json. If empty or the file has no display_name, suggest /linkedin:start. Otherwise: 1) Detect copywriter plugin — Glob for copywriter/.claude-plugin/plugin.json relative to CLAUDE_PLUGIN_ROOT parent. If found, read copywriter/data/voice-dna.json and use language_preference for output language. Default to French. 2) Read ${CLAUDE_PLUGIN_ROOT}/data/queue.json — count posts by status. Read ${CLAUDE_PLUGIN_ROOT}/data/comment-targets.json — check today's progress. Read ${CLAUDE_PLUGIN_ROOT}/data/schedule-config.json for next posting slot. 3) Show quick status: posts in queue (by status), today's comment count vs target, next scheduled post time. 4) Read ${CLAUDE_PLUGIN_ROOT}/data/learnings.json — if prompt_directives array is non-empty, mention: 'Nouveaux apprentissages disponibles: [count] directives actives.' 5) If comment-targets shows < 10 comments today, nudge: 'Tu as commente [N]/[target] posts aujourd'hui. Lance /linkedin:commenter pour continuer.'",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

- [ ] **Step 4: Create CONNECTORS.md**

Create `linkedin/CONNECTORS.md`:

```markdown
# Connectors

Le plugin linkedin fonctionne **sans aucun connecteur** (mode standalone).
Toutes les interactions LinkedIn passent par Claude in Chrome.

## Integration Overview

| Category | Methode | Requis |
|----------|---------|--------|
| **LinkedIn** | Claude in Chrome (browser) | Session LinkedIn active dans Chrome |
| **Recherche** | WebSearch (integre) | Aucun |
| **Identite** | Copywriter plugin (optionnel) | Plugin copywriter installe |

## Degradation Gracieuse

- **Copywriter non installe** → Le plugin cree ses propres fichiers voice-dna, icp, business-profile via /linkedin:start
- **Chrome non connecte** → Les fonctions de generation, scoring, et strategie fonctionnent. Seules les actions LinkedIn (poster, scraper, commenter) necessitent Chrome.
- **Pas de donnees analytics** → Le plugin utilise des best-practices par defaut. L'apprentissage s'ameliore avec le temps.

## Prerequis

1. **Claude in Chrome** installe et connecte
2. **Session LinkedIn** active dans le navigateur Chrome
3. **(Optionnel)** Plugin copywriter installe pour partager voice-dna/icp/business-profile
```

- [ ] **Step 5: Create all empty data JSON files**

Create `linkedin/data/linkedin-profile.json`:

```json
{
  "profile_url": "",
  "display_name": "",
  "headline": "",
  "follower_count": 0,
  "content_pillars": [],
  "posting_config": {
    "timezone": "Europe/Paris",
    "active_days": [0, 1, 2, 3, 4],
    "posting_slots": ["08:30", "12:00", "18:00"],
    "posts_per_day": 1,
    "hashtag_count": 3,
    "emoji_policy": "minimal"
  },
  "commenting_config": {
    "daily_target": 15,
    "max_per_post": 1
  }
}
```

Create `linkedin/data/queue.json`:

```json
{
  "posts": []
}
```

Create `linkedin/data/analytics.json`:

```json
{
  "last_updated": null,
  "summary": {
    "total_posts": 0,
    "avg_likes": 0,
    "avg_comments": 0,
    "best_day": null,
    "best_time": null,
    "best_hook_type": null,
    "best_template": null,
    "best_tone": null
  },
  "posts": []
}
```

Create `linkedin/data/learnings.json`:

```json
{
  "last_analysis": null,
  "prompt_directives": [],
  "patterns": {
    "top_performing": {
      "hooks": [],
      "tones": [],
      "templates": [],
      "cta_types": [],
      "word_count_range": [150, 250]
    },
    "underperforming": {
      "hooks": [],
      "tones": [],
      "templates": [],
      "avoid_topics": []
    }
  }
}
```

Create `linkedin/data/competitors.json`:

```json
{
  "competitors": []
}
```

Create `linkedin/data/experiments.json`:

```json
{
  "experiments": []
}
```

Create `linkedin/data/comment-targets.json`:

```json
{
  "today": "",
  "target": 15,
  "completed": 0,
  "comments": []
}
```

Create `linkedin/data/research.json`:

```json
{
  "last_updated": null,
  "topics": []
}
```

Create `linkedin/data/schedule-config.json`:

```json
{
  "auto_post_mode": "confirm",
  "notify_on_post": true,
  "scrape_interval_hours": 6,
  "research_interval_hours": 8,
  "competitor_scan_time": "20:00",
  "learning_cycle_time": "02:00"
}
```

- [ ] **Step 6: Create README.md**

Create `linkedin/README.md`:

```markdown
# LinkedIn — Claude Code Plugin

LinkedIn growth engine. Chrome-native content pipeline with self-improving learning loop.

## Features

- Content generation with templates, virality scoring, and tone rotation
- Post queue management (draft → approve → schedule → post)
- Trending topic research (WebSearch + LinkedIn feed)
- Competitor monitoring and analysis
- Strategic commenting engine (daily targets)
- Autoresearch: A/B testing hooks, tones, and formats
- Learning loop: analyzes performance, injects patterns into future generation
- Shared identity with copywriter plugin (voice-dna, icp, business-profile)

## Quick Start

1. Install the plugin in Claude Code
2. Run `/linkedin:start` to configure your profile
3. Run `/linkedin:publier` to generate your first post

## Requirements

- Claude in Chrome installed and connected
- Active LinkedIn session in Chrome browser
- (Optional) Copywriter plugin for shared identity files

## Commands

| Command | Description |
|---------|-------------|
| `/linkedin` | Smart router — type naturally |
| `/linkedin:start` | Initial setup |
| `/linkedin:publier [topic]` | Generate and queue content |
| `/linkedin:recherche [sujet]` | Research trending topics |
| `/linkedin:commenter` | Strategic commenting |
| `/linkedin:concurrents` | Competitor monitoring |
| `/linkedin:file` | Queue management |
| `/linkedin:analyser` | Analytics and learning |
| `/linkedin:bilan` | Status dashboard |
```

- [ ] **Step 7: Commit scaffold**

```bash
cd linkedin
git add .
git commit -m "feat(linkedin): plugin scaffold — manifest, hooks, data schemas, connectors, readme"
```

---

## Task 2: Chrome-LinkedIn Skill

**Files:**
- Create: `linkedin/skills/chrome-linkedin/SKILL.md`

This is the foundation skill — every agent that touches LinkedIn depends on it.

- [ ] **Step 1: Create the chrome-linkedin skill**

Create `linkedin/skills/chrome-linkedin/SKILL.md`:

```markdown
---
name: chrome-linkedin
description: "This skill should be used when any agent needs to interact with LinkedIn via the browser. Handles authentication checks, posting, engagement scraping, competitor scraping, commenting, and feed reading."
---

# Chrome-LinkedIn: Browser Interaction Layer

All LinkedIn interactions go through Claude in Chrome. This skill defines the exact procedures for each interaction type.

## Prerequisites

Before any LinkedIn interaction:
1. Call `mcp__Claude_in_Chrome__tabs_context_mcp` with `createIfEmpty: true` to get tab context
2. If no tab exists, call `mcp__Claude_in_Chrome__tabs_create_mcp` to create one

## Procedure 1: Authentication Check

**When to use:** Before any LinkedIn interaction. Called by all agents at start.

1. Navigate to `https://www.linkedin.com/feed/` using `mcp__Claude_in_Chrome__navigate`
2. Wait 2 seconds using `mcp__Claude_in_Chrome__computer` with action `wait`
3. Take a screenshot using `mcp__Claude_in_Chrome__computer` with action `screenshot`
4. Check the page:
   - If login form is visible → tell user: "Connecte-toi a LinkedIn dans ton navigateur Chrome, puis dis 'ok'." STOP and wait.
   - If feed is visible → authenticated. Proceed.
5. If authenticated, use `mcp__Claude_in_Chrome__find` to locate the profile link/name in the nav bar
6. Extract display name and profile URL
7. Return: `{ authenticated: true, display_name: "...", profile_url: "..." }`

## Procedure 2: Post to LinkedIn

**When to use:** When a post is SCHEDULED or user approves immediate posting.

**Input:** `{ content: string, image_path?: string }`

1. Run Procedure 1 (auth check)
2. Use `mcp__Claude_in_Chrome__find` to locate the "Start a post" or "Commencer un post" button
3. Click it using `mcp__Claude_in_Chrome__computer` with action `left_click`
4. Wait 1 second for the composer modal to open
5. Take a screenshot to verify the modal is open
6. Use `mcp__Claude_in_Chrome__find` to locate the text input area in the modal
7. Click the text area, then use `mcp__Claude_in_Chrome__computer` with action `type` to enter the content
8. If `image_path` is provided:
   - Use `mcp__Claude_in_Chrome__find` to locate the image/media upload button
   - Click it, then use `mcp__Claude_in_Chrome__file_upload` with the image path
   - Wait 2 seconds for upload
9. Take a screenshot showing the composed post
10. **MANDATORY**: Show the screenshot to the user and ask: "Voici le post pret a publier. Confirmes-tu la publication ?"
11. Wait for user confirmation. If denied, STOP.
12. Use `mcp__Claude_in_Chrome__find` to locate the "Post" / "Publier" button
13. Click it
14. Wait 3 seconds
15. Take a screenshot to verify the post appeared in the feed
16. Use `mcp__Claude_in_Chrome__find` to locate the just-posted content and extract its URL
17. Return: `{ success: true, linkedin_url: "..." }`

## Procedure 3: Scrape Engagement Stats

**When to use:** Analytics agent needs fresh engagement data.

**Input:** `{ profile_url: string }`

1. Run Procedure 1 (auth check)
2. Navigate to `{profile_url}/recent-activity/all/`
3. Wait 2 seconds for page load
4. Scroll down 3 times (using `mcp__Claude_in_Chrome__computer` with action `scroll`, direction `down`) to load more posts
5. Use `mcp__Claude_in_Chrome__read_page` to get the accessibility tree
6. For each post visible on the page:
   - Extract: text content (first 100 chars as preview), like count, comment count, repost count
   - Extract: post date if visible
   - Extract: post URL from link elements
7. Return array of: `{ content_preview, likes, comments, reposts, post_url, post_date }`

**Note:** LinkedIn shows approximate counts (e.g., "1,234 reactions"). Parse these as integers.

## Procedure 4: Scrape Competitor Posts

**When to use:** Competitor agent needs to analyze a competitor's recent content.

**Input:** `{ competitor_profile_url: string, max_posts: number (default 10) }`

1. Run Procedure 1 (auth check)
2. Navigate to `{competitor_profile_url}/recent-activity/all/`
3. Wait 2 seconds
4. Scroll down enough times to load `max_posts` posts (typically 3-5 scrolls)
5. Use `mcp__Claude_in_Chrome__read_page` to get the accessibility tree
6. For each post:
   - Extract: full text content, like count, comment count, repost count
   - Extract: post date, post URL
   - Analyze: hook style (contrarian/specificity/story/question/transformation/listicle)
   - Analyze: approximate word count
7. Return array of post objects with engagement data and analysis

## Procedure 5: Post a Comment

**When to use:** Engagement agent has a user-approved comment to post.

**Input:** `{ post_url: string, comment_text: string }`

1. Run Procedure 1 (auth check)
2. Navigate to `{post_url}`
3. Wait 2 seconds
4. Use `mcp__Claude_in_Chrome__find` to locate the comment input field
5. Click it to focus
6. Use `mcp__Claude_in_Chrome__computer` with action `type` to enter the comment
7. Take a screenshot showing the comment ready to post
8. **MANDATORY**: Show the screenshot to the user and ask: "Commentaire pret. Confirmes-tu ?"
9. Wait for user confirmation. If denied, STOP.
10. Use `mcp__Claude_in_Chrome__find` to locate the comment submit button
11. Click it
12. Wait 2 seconds
13. Return: `{ success: true, post_url, comment_text }`

## Procedure 6: Read Feed

**When to use:** Research or engagement agent needs to scan the feed for trending content.

**Input:** `{ scroll_count: number (default 5) }`

1. Run Procedure 1 (auth check)
2. Navigate to `https://www.linkedin.com/feed/`
3. Wait 2 seconds
4. For each scroll (up to `scroll_count`):
   - Scroll down using `mcp__Claude_in_Chrome__computer`
   - Wait 1 second
5. Use `mcp__Claude_in_Chrome__read_page` to get full page content
6. For each visible post:
   - Extract: author name, headline, text content (first 200 chars), engagement counts
   - Extract: hashtags if present
   - Extract: post URL
7. Return array of feed items sorted by engagement (highest first)

## Safety Rules

- **Publishing actions** (Procedure 2 and 5) ALWAYS require explicit user confirmation via screenshot + chat approval
- **Read-only actions** (Procedures 3, 4, 6) run autonomously without user confirmation
- **Authentication** (Procedure 1) never enters credentials — it only checks if the user is already logged in
- If any Chrome action fails (element not found, timeout), report the error clearly and suggest the user check their Chrome/LinkedIn state
```

- [ ] **Step 2: Commit**

```bash
git add linkedin/skills/chrome-linkedin/
git commit -m "feat(linkedin): chrome-linkedin skill — all browser interaction procedures"
```

---

## Task 3: Post Generator Skill + References

**Files:**
- Create: `linkedin/skills/post-generator/SKILL.md`
- Create: `linkedin/skills/post-generator/references/hook-formulas.md`
- Create: `linkedin/skills/post-generator/references/templates.md`
- Create: `linkedin/skills/post-generator/references/formatting-guide.md`
- Create: `linkedin/skills/post-generator/references/cta-library.md`
- Create: `linkedin/skills/post-generator/examples/viral-posts.md`

- [ ] **Step 1: Create hook-formulas.md**

Create `linkedin/skills/post-generator/references/hook-formulas.md`:

```markdown
# Hook Formulas — Les Arrets de Scroll

6 styles de hooks. Chaque post genere DOIT proposer 3 variations de hooks differents.

## 1. Hook Contrarian

Challenge une croyance repandue.

- "Opinion impopulaire: [Croyance commune] detruit en fait ton [Objectif]."
- "Arrete de faire [Pratique standard]. C'est une perte de temps."
- "La plupart optimisent [Metrique A]. Les gagnants optimisent [Metrique B]."
- "Le pire conseil que j'ai recu: '[Conseil commun]'."

## 2. Hook Specificite

Chiffres precis, resultats concrets.

- "J'ai depense [montant exact] en [chose]. Voici ce que j'ai appris."
- "J'ai analyse [nombre exact] [choses]. Voici les 3 patterns."
- "[Nombre]% de [groupe] font [erreur]. Voici comment l'eviter."
- "En [duree precise], j'ai fait passer [metrique] de [X] a [Y]."

## 3. Hook Story (Micro-Recit)

Ouvre au milieu d'une action ou d'un moment.

- "J'ai failli tout abandonner hier."
- "Mon client m'a pose une question qui m'a arrete net."
- "C'est la lecon la plus dure que j'ai du apprendre."
- "Il y a 3 ans, j'etais [etat]. Aujourd'hui, [etat]. Voici ce qui a change."

## 4. Hook Question

Pose la question qu'ils ont peur de se poser publiquement.

- "Pourquoi personne ne parle de [elephant dans la piece] ?"
- "Tu fais [pratique] depuis [duree]. Ca marche vraiment ?"
- "Et si tout ce qu'on t'a appris sur [sujet] etait faux ?"

## 5. Hook Transformation

Montre le delta entre Avant et Apres.

- "Comment je suis passe de [mauvais etat] a [bon etat] en [duree]."
- "En 2023, j'etais [statut]. Aujourd'hui, je suis [statut]."
- "J'ai depense [ressource] pour apprendre [competence]. Voici le resume."

## 6. Hook Listicle

Promet une valeur dense et scannable.

- "7 outils qui semblent illegaux a connaitre (pour [avatar])."
- "Le framework en 5 etapes pour [resultat] sans [douleur]."
- "10 phrases qui vont changer ta vision de [sujet]."
- "Si tu veux [objectif] en 2026, lis ceci:"

## Regles

- Chaque post genere propose EXACTEMENT 3 hooks de types differents
- Chaque hook est labelle avec son type
- Le hook recommande est accompagne d'une justification en 1 phrase
- JAMAIS commencer par "Dans le monde d'aujourd'hui..." ou "Il est important de..."
- Hook = max 140 caracteres pour maximiser le "See more" sur mobile
```

- [ ] **Step 2: Create templates.md**

Create `linkedin/skills/post-generator/references/templates.md`:

```markdown
# Templates de Posts LinkedIn

## Templates Classiques (7)

### 1. The Expensive Lesson
**Structure:** Ouverture vulnerable avec montant → liste d'erreurs → recuperation
**Ton ideal:** vulnerable, conversational
**Hook type:** specificity, story
**Longueur:** 1500-2500 chars

```
[Hook: montant exact perdu/depense]

[Contexte: 2-3 lignes sur la situation]

Voici les [N] erreurs que j'ai faites:

1. [Erreur 1 — consequence concrete]
2. [Erreur 2 — consequence concrete]
3. [Erreur 3 — consequence concrete]

[Lecon apprise — 2-3 lignes]

[Resultat positif avec chiffre]

[CTA: question specifique]
```

### 2. The Contrarian Take
**Structure:** Challenge croyance → evidence → "D'accord ou pas ?"
**Ton ideal:** provocative, authoritative
**Hook type:** contrarian
**Longueur:** 600-1200 chars

```
[Hook: "Arrete de..." ou "Tout le monde pense X..."]

[Pourquoi c'est faux — 3-5 lignes avec preuves]

[Ce qu'il faut faire a la place]

[CTA: sondage ou question polarisante]
```

### 3. The Origin Story
**Structure:** Timeline + point tournant + progression metrique
**Ton ideal:** vulnerable, conversational
**Hook type:** transformation, story
**Longueur:** 1500-2500 chars

### 4. The Framework Post
**Structure:** Avant/apres + etapes detaillees
**Ton ideal:** authoritative, data-driven
**Hook type:** listicle, specificity
**Longueur:** 1200-2000 chars

### 5. The Myth Buster
**Structure:** Commande provocante → contraste mauvais/bon
**Ton ideal:** provocative
**Hook type:** contrarian
**Longueur:** 800-1500 chars

### 6. The Data Drop
**Structure:** Stat surprenante → points de donnees → tactiques
**Ton ideal:** data-driven, authoritative
**Hook type:** specificity
**Longueur:** 1000-1800 chars

### 7. The Quick Tips
**Structure:** Conseils numerotes + question d'engagement
**Ton ideal:** authoritative, conversational
**Hook type:** listicle
**Longueur:** 800-1500 chars

## Frameworks Kleo (8)

### 8. AIDA Formula
Briser une croyance → 4 actions → 3 resultats → shift de mindset

### 9. Authority Reference
Citer un resultat → 4 insights → reveler le pattern

### 10. Slippery Slide
Phrases ultra-courtes et punchy → insight plus profond

### 11. Transformation Arc
Debut humble → actions → resultat → verite universelle

### 12. Conflict Story
"Il etait une fois" → problemes → revelation → resultat

### 13. PAS Formula
Fait → consequence → solution → etapes → benefice

### 14. Do This Not That
Hook de credibilite → ne fais pas → fais → takeaway

### 15. Vulnerable Truth
Echec → lutte → recuperation → espoir

## Selection Automatique

Le content-strategy skill selectionne le template en fonction de:
- Topic et pilier de contenu
- Ton cible (rotation automatique)
- Performance historique (learnings.json)
- Mix de la semaine (eviter les doublons de format)
```

- [ ] **Step 3: Create formatting-guide.md**

Create `linkedin/skills/post-generator/references/formatting-guide.md`:

```markdown
# Guide de Formatage LinkedIn

## Regles Fondamentales

### Regle du Deux
Jamais plus de 2 lignes par paragraphe. Au-dela, c'est un mur de texte sur mobile.

### Espacement
- Ligne vide entre chaque paragraphe
- Ligne vide avant et apres les listes
- Ligne vide avant le CTA

### Limite de Newlines
LinkedIn tronque silencieusement apres ~25 newlines. Le formateur impose cette limite.

### Longueur par Type de Post
| Type | Caracteres | Mots |
|------|-----------|------|
| Thought leadership | 1800-3000 | 200-350 |
| Story | 1500-2500 | 150-280 |
| How-to / Listicle | 1200-2000 | 120-220 |
| Contrarian court | 600-900 | 60-100 |

### Limite Absolue
3000 caracteres max via l'API REST de LinkedIn. Toujours verifier.

## Regles Anti-Slop

### Mots Interdits (AI-sounding)
delve, tapestry, landscape, game-changer, unleash, elevate, demystify, revolutionize, synergy, leverage, navigate, foster, paradigm, robust, seamless, cutting-edge, holistic, empower

### Phrases Interdites
- "Dans le monde d'aujourd'hui..."
- "Il est important de noter que..."
- "En conclusion, on peut voir que..."
- "Plongeons plus profondement dans..."
- "De plus, il convient de mentionner..."

### Emojis
- 0-3 par post maximum
- Utiliser comme signaux, pas comme decoration
- Preferer: → • 💡 ✅ ⚠️

### Hashtags
- 3-5 max, places tout a la fin du post
- Jamais dans le corps du texte
- Pertinents au sujet, pas generiques (#Leadership #Success = non)

### Liens
- JAMAIS dans le corps du post (l'algorithme penalise)
- Toujours "Lien en commentaire" ou "Link in comments"

## Formatage Plain Text
- Pas de markdown (pas de **gras**, pas de # titres)
- Pas d'asterisques
- Listes avec chiffres (1. 2. 3.) ou tirets (-)
```

- [ ] **Step 4: Create cta-library.md**

Create `linkedin/skills/post-generator/references/cta-library.md`:

```markdown
# Bibliotheque de CTAs LinkedIn

JAMAIS utiliser "Qu'en pensez-vous ?" ou "D'accord ?" seuls. Ces CTAs generiques tuent l'engagement.

## CTAs par Type

### Question Specifique
**Utiliser pour:** Posts d'opinion, thought leadership
- "Si tu devais corriger une seule chose dans [sujet] cette semaine, ce serait quoi ?"
- "Quel est le plus gros mythe que tu as du desapprendre dans [domaine] ?"
- "Tu as deja essaye [approche] ? Quel a ete le resultat ?"

### Sondage Substitut
**Utiliser pour:** Posts de recherche, data-driven
- "Tu as teste [X] ? Reponds avec: A) Oui, ca marche / B) Oui, echec / C) Jamais essaye"
- "Ton plus gros defi en ce moment: A) [Option 1] B) [Option 2] C) [Option 3]"

### Invitation a la Confession
**Utiliser pour:** Posts stories, vulnerable
- "Raconte-moi un moment ou [chose embarrassante liee]. Je commence: [ton histoire]"
- "Quel est ton plus gros echec professionnel ? Le mien: [bref recit]"

### Offre de Ressource
**Utiliser pour:** Posts how-to, framework
- "J'ai un template pour ca. Tu le veux ? Dis 'template' en commentaire."
- "J'ai compile [ressource]. Commente [MOT-CLE] et je t'envoie le lien."

### Prochaine Etape
**Utiliser pour:** Posts d'autorite, series
- "Si ca t'a parle: follow pour [promesse specifique]. Je publie [sujet] chaque [jour]."
- "Prochain post: [teaser du prochain sujet]. Follow pour ne pas manquer."

## Regles de Selection

Le content-strategy skill selectionne le CTA en fonction du template:
| Template | CTA recommande |
|----------|----------------|
| Expensive Lesson | Invitation a la confession |
| Contrarian Take | Sondage substitut |
| Origin Story | Question specifique |
| Framework Post | Offre de ressource |
| Myth Buster | Sondage substitut |
| Data Drop | Question specifique |
| Quick Tips | Offre de ressource |

## Le P.S. Play

Apres le CTA, ajouter un P.S. discret qui promeut l'offre principale:
- "P.S. J'aide [avatar] a [resultat]. DM si tu veux en parler."
- "P.S. [Offre] est ouvert — lien en commentaire."

Le P.S. est OPTIONNEL et ne doit pas etre present dans chaque post (1 sur 3 max).
```

- [ ] **Step 5: Create viral-posts.md examples**

Create `linkedin/skills/post-generator/examples/viral-posts.md`:

```markdown
# Exemples de Posts Viraux

## Exemple 1 — Contrarian + Specificite

J'ai depense 47 000€ en publicite Meta le mois dernier.

Voici ce que personne ne te dit:

Le ROAS n'est pas la metrique qui compte.

Tout le monde optimise le ROAS.
Les gagnants optimisent le MER (Marketing Efficiency Ratio).

La difference ?

Le ROAS te dit combien tu gagnes PAR CANAL.
Le MER te dit combien tu gagnes AU TOTAL.

J'ai vu des marques couper leur budget Meta
parce que leur ROAS etait "mauvais" (2.5x).

Leur MER est passe de 4.2x a 2.8x en 2 semaines.

Les pubs Meta alimentaient tout le reste:
- Le search brand (+40%)
- L'email revenue (+25%)
- Le direct (+15%)

Avant de couper un canal:
Regarde l'impact sur le MER pendant 30 jours.

Tu mesures le ROAS ou le MER ? Reponds A ou B.

---
Score viralite: 82/100
Hook: specificite (47 000€)
Template: data_drop
Ton: authoritative
CTA: sondage substitut

## Exemple 2 — Story + Vulnerable

J'ai failli fermer mon agence il y a 18 mois.

Pas parce qu'on manquait de clients.
Parce que je travaillais 14h/jour et je detestais ma vie.

3 clients toxiques mangeaient 80% de mon temps.
Ils payaient 40% de mon CA.

Le jour ou j'ai fire les 3:

Mois 1: -40% de CA. Panique.
Mois 2: 3 nouveaux clients (referes par les anciens bons clients).
Mois 3: CA +15% vs avant. 8h/jour.
Mois 6: CA +60%. Equipe de 4.

La lecon la plus chere de ma carriere:

Ton pire client te coute plus que ce qu'il te paie.

Raconte-moi ton pire client (sans le nommer). Je commence: le mien m'envoyait des vocaux de 12 minutes a 23h.

---
Score viralite: 88/100
Hook: story (j'ai failli fermer)
Template: the_expensive_lesson
Ton: vulnerable
CTA: invitation a la confession
```

- [ ] **Step 6: Create the post-generator SKILL.md**

Create `linkedin/skills/post-generator/SKILL.md`:

```markdown
---
name: post-generator
description: "This skill should be used when generating a LinkedIn post. Produces 3 hook variations, a full draft, CTA, and format recommendation."
---

# Post Generator — LinkedIn Authority Architecture

## Mandatory Context Load

Before writing ANY post:
1. Read `${CLAUDE_PLUGIN_ROOT}/data/linkedin-profile.json` → content_pillars, posting_config
2. Detect copywriter plugin: Glob for `copywriter/.claude-plugin/plugin.json` relative to CLAUDE_PLUGIN_ROOT parent
   - If found: Read `copywriter/data/voice-dna.json` → tone, forbidden_words, signature_phrases, sentence_structure
   - If found: Read `copywriter/data/icp.json` → pain_points, vocabulary, job_titles
   - If found: Read `copywriter/data/business-profile.json` → offer, primary_cta, positioning
3. If copywriter not found: Read local equivalents from `${CLAUDE_PLUGIN_ROOT}/data/` (may be empty)
4. Read `${CLAUDE_PLUGIN_ROOT}/data/learnings.json` → prompt_directives (inject into generation)
5. Read `${CLAUDE_PLUGIN_ROOT}/data/analytics.json` → summary (for schedule suggestion)

## Input

Receives from content-agent: `{ topic, template, tone, angle, cta_type }` (selected by content-strategy skill).

## Phase 1: Hook Generation (ALWAYS 3)

Read `references/hook-formulas.md`.

Generate exactly 3 distinct hooks using DIFFERENT types from the formulas.

Label each:
- **Hook contrarian** — ...
- **Hook specificite** — ...
- **Hook story** — ...

Recommend one with 1-sentence rationale based on topic fit and learnings.json patterns.

## Phase 2: Format Detection

Scan content for format fit BEFORE writing the full post:

| Signal dans le contenu | Format recommande |
|----------------------|-------------------|
| Liste numerotee 4+ items | **Carrousel** |
| Processus etape par etape | **Carrousel** |
| Comparaison A vs B | **Carrousel** |
| Histoire personnelle | **Post texte** |
| Hot take / opinion | **Post texte** |
| Donnees / stats | **Carrousel** |

Output: "**Format recommande: [format]** — [justification en 1 phrase]."

## Phase 3: Draft

Structure: Hook recommande → Story/Insight → Preuve → CTA (de references/cta-library.md) → P.S. optionnel

Read `references/formatting-guide.md` and apply ALL rules:
- Max 2 lignes par paragraphe
- Ligne vide entre paragraphes
- Anti-slop: verifier chaque phrase contre les mots interdits
- Emojis: 0-3 max
- Hashtags: 3-5 a la fin
- "Lien en commentaire" (jamais dans le corps)

Apply voice-dna if loaded:
- Match tone, sentence_length, rhetorical_mechanisms
- Avoid forbidden_words
- Use signature_phrases where natural

## Phase 4: Audit Algorithmique

Read `references/formatting-guide.md` for length targets.

Check:
- [ ] Longueur dans la fourchette du type de post
- [ ] < 25 newlines total
- [ ] < 3000 caracteres
- [ ] Hook < 140 caracteres
- [ ] Pas de mots slop
- [ ] CTA est specifique (pas "Qu'en pensez-vous ?")
- [ ] Hashtags en fin de post uniquement

## Output Format

```
# LinkedIn Post Draft

**Audience cible**: [icp.job_titles ou pillier]
**Template**: [nom]
**Ton**: [ton]
**Format**: [texte/carrousel]

---

### Hook 1 (contrarian) ⭐ Recommande
[hook text]

### Hook 2 (specificite)
[hook text]

### Hook 3 (story)
[hook text]

---

[Post complet avec hook recommande]

---

**Compteur**: [X]/3000 caracteres | [Y] mots | [Z] newlines
**Suggestion horaire**: [jour] a [heure] (basee sur analytics.json)
```
```

- [ ] **Step 7: Commit**

```bash
git add linkedin/skills/post-generator/
git commit -m "feat(linkedin): post-generator skill with hook formulas, templates, formatting, CTAs, examples"
```

---

## Task 4: Content Strategy + Virality Scorer Skills

**Files:**
- Create: `linkedin/skills/content-strategy/SKILL.md`
- Create: `linkedin/skills/content-strategy/references/strategy-rules.md`
- Create: `linkedin/skills/virality-scorer/SKILL.md`

- [ ] **Step 1: Create strategy-rules.md**

Create `linkedin/skills/content-strategy/references/strategy-rules.md`:

```markdown
# Regles de Strategie de Contenu

## Rotation des Tons

5 tons en rotation pour eviter la monotonie:
1. **authoritative** — "Voici ce qui marche. Je l'ai teste."
2. **conversational** — "Laisse-moi te raconter ce qui s'est passe."
3. **provocative** — "Tout le monde fait X. Ils ont tort."
4. **vulnerable** — "J'ai perdu X€ la-dessus. Voici la lecon."
5. **data-driven** — "J'ai analyse X et les chiffres disent Y."

## Angles

- personal_story — "J'ai fait X et appris Y"
- data_insight — "Les chiffres montrent X"
- contrarian_take — "Tout le monde pense X, mais en fait Y"
- how_to — "Voici exactement comment faire X etape par etape"
- newsjack — "X vient de se passer, voici ce que ca veut dire"
- myth_buster — "Arrete de faire X. Voici pourquoi."
- case_study — "La marque X a fait Y et obtenu Z"

## Mix Obligatoire (par semaine de 5 posts)

- Valeur (how-to / insight / framework): 2 posts
- Preuve (resultat / temoignage / case study): 1-2 posts
- Personnel (story / opinion): 1 post
- Pas de format duplique dans un batch de 5

## Poids des Topics

Quand aucun topic n'est fourni, choisir en fonction des piliers de contenu dans linkedin-profile.json.
Privilegier les piliers les moins publies recemment (rotation).

## Selection de Template

1. Si learnings.json a des patterns top_performing → privilegier ces templates
2. Sinon: matcher le template au ton cible (voir templates.md pour associations)
3. Eviter le meme template 2x dans un batch de 5

## Selection de CTA

Voir cta-library.md pour les associations template → CTA.
Si learnings.json a des cta_types top_performing → les privilegier.
```

- [ ] **Step 2: Create content-strategy SKILL.md**

Create `linkedin/skills/content-strategy/SKILL.md`:

```markdown
---
name: content-strategy
description: "This skill should be used when deciding WHAT to post: picks topic, template, tone, angle, and CTA type based on strategy rules and learning data."
---

# Content Strategy — What To Post and How

## Mandatory Context Load

1. Read `${CLAUDE_PLUGIN_ROOT}/data/linkedin-profile.json` → content_pillars, posting_config
2. Read `${CLAUDE_PLUGIN_ROOT}/data/learnings.json` → patterns (top_performing, underperforming)
3. Read `${CLAUDE_PLUGIN_ROOT}/data/analytics.json` → summary (best_day, best_time, best_hook_type)
4. Read `${CLAUDE_PLUGIN_ROOT}/data/queue.json` → recent posts (to avoid duplicates)
5. Read `${CLAUDE_PLUGIN_ROOT}/data/research.json` → trending topics (if available)
6. Read `references/strategy-rules.md`

## Decision Process

### Step 1: Topic Selection

If user provided a topic → use it, map to closest content pillar.

If no topic:
1. Check research.json for fresh trending topics (< 48h old)
2. Cross-reference with content_pillars from linkedin-profile.json
3. Check queue.json for recently used topics → avoid repeats
4. Pick the pillar least published recently (rotation)
5. Present 3 topic suggestions ranked by relevance

### Step 2: Template Selection

1. Check learnings.json patterns.top_performing.templates → prefer these
2. Check queue.json last 5 posts → avoid same template
3. Match template to tone (see strategy-rules.md associations)
4. If user specified a format preference → override

### Step 3: Tone Selection

1. Check learnings.json patterns.top_performing.tones → prefer these
2. Rotate: check queue.json last 3 posts → use a different tone
3. Default rotation order: authoritative → conversational → provocative → vulnerable → data-driven

### Step 4: Angle Selection

Match angle to topic and template:
- Personal topic → personal_story
- Data/research topic → data_insight or case_study
- Industry trend → newsjack or contrarian_take
- Process/method → how_to
- Common belief → myth_buster

### Step 5: CTA Type Selection

1. Check learnings.json patterns.top_performing.cta_types → prefer these
2. Default: use template → CTA association from cta-library.md

## Output

Return to content-agent:
```json
{
  "topic": "refined topic",
  "pillar": "content pillar",
  "template": "template_name",
  "tone": "tone_name",
  "angle": "angle_name",
  "cta_type": "cta_type_name",
  "rationale": "1-sentence explanation of choices"
}
```
```

- [ ] **Step 3: Create virality-scorer SKILL.md**

Create `linkedin/skills/virality-scorer/SKILL.md`:

```markdown
---
name: virality-scorer
description: "This skill should be used to score a LinkedIn post for viral potential. Returns a score /100 with 6-dimension breakdown and improvement suggestions."
---

# Virality Scorer — 6 Dimensions

## Input

A LinkedIn post draft (full text) and its topic.

## Scoring Dimensions

Score each dimension on its scale:

### 1. Hook Power (0-25)
How scroll-stopping is the first line?
- Creates curiosity, surprise, or urgency?
- Under 140 characters?
- Specific (numbers, names, dollar amounts)?
- Avoids generic openers?

### 2. Structure & Readability (0-20)
- Max 2 lines per paragraph?
- Generous whitespace?
- One thought per line?
- Easy to scan on mobile?
- Under 25 newlines total?

### 3. Value & Insight (0-20)
- Actionable, specific, non-obvious insights?
- Concrete numbers (not vague claims)?
- Reader learns something they can apply today?

### 4. Engagement Trigger (0-15)
- Ends with a specific question or CTA?
- CTA is NOT generic ("Qu'en pensez-vous?")?
- Invites sharing, debate, or confession?
- Reader has a reason to comment?

### 5. Authenticity & Voice (0-10)
- Sounds human and personal?
- No AI slop words (delve, landscape, synergy, leverage)?
- Matches the voice-dna if loaded?
- Has a personality (not corporate)?

### 6. Relevance & Timing (0-10)
- Topic is trending or evergreen-valuable?
- Aligns with audience's current pain points?
- Aligns with content pillars?

## Heuristic Adjustments

Apply AFTER Claude scoring:

| Check | Adjustment |
|-------|-----------|
| Hook < 80 chars | +3 (short punchy hook) |
| Hook > 200 chars | -5 (too long) |
| Word count 100-250 | +3 (sweet spot) |
| Word count > 350 | -5 (too long for LinkedIn) |
| Word count < 50 | -3 (too short) |
| 3+ blank lines | +2 (good whitespace) |
| First line starts with "I/My/We" | +2 (personal hook pattern) |
| 2+ specific numbers ($X, Y%, Zx) | +3 (specificity) |
| No numbers at all | -3 (vague) |
| Ends with ? | +2 (question = 72% more comments) |

## Performance Tiers

| Score | Tier | Action |
|-------|------|--------|
| 85-100 | viral | Queue immediately |
| 65-84 | high | Queue with confidence |
| 40-64 | medium | Suggest improvements, offer regeneration |
| 1-39 | low | Auto-regenerate with feedback |

## Output Format

```json
{
  "total_score": 72,
  "hook_power": 20,
  "structure": 16,
  "value_insight": 14,
  "engagement_trigger": 10,
  "authenticity": 7,
  "relevance": 5,
  "heuristic_adjustments": ["+3 short hook", "+2 ends with question"],
  "strengths": ["Hook specifique avec chiffre", "Bon espacement"],
  "improvements": ["Ajouter un chiffre supplementaire dans le corps", "CTA pourrait etre plus specifique"],
  "predicted_performance": "high",
  "verdict": "Post solide. Le hook accroche et la structure est propre. Renforcer le CTA."
}
```

## Regeneration Feedback

If score < 60, return specific instructions for the post-generator:
```
REGENERATION FEEDBACK:
- Hook: [specific instruction, e.g., "Remplacer par un hook specificite avec un montant exact"]
- Body: [specific instruction]
- CTA: [specific instruction]
- Target: score >= 65
```
```

- [ ] **Step 4: Commit**

```bash
git add linkedin/skills/content-strategy/ linkedin/skills/virality-scorer/
git commit -m "feat(linkedin): content-strategy and virality-scorer skills"
```

---

## Task 5: Comment Strategist + Autoresearch + Learning Engine Skills

**Files:**
- Create: `linkedin/skills/comment-strategist/SKILL.md`
- Create: `linkedin/skills/autoresearch/SKILL.md`
- Create: `linkedin/skills/learning-engine/SKILL.md`

- [ ] **Step 1: Create comment-strategist SKILL.md**

Create `linkedin/skills/comment-strategist/SKILL.md`:

```markdown
---
name: comment-strategist
description: "This skill should be used when drafting strategic comments on other people's LinkedIn posts. Produces 2 options per post: value-add and question."
---

# Comment Strategist — Strategic LinkedIn Commenting

Commenting strategically (10-15/day) is the #1 growth lever on LinkedIn. Comments are 15x more valuable than reactions.

## Mandatory Context Load

1. Read voice-dna (copywriter or local) for tone matching
2. Read `${CLAUDE_PLUGIN_ROOT}/data/linkedin-profile.json` for positioning context
3. Read `${CLAUDE_PLUGIN_ROOT}/data/comment-targets.json` for today's progress

## Input

A LinkedIn post from the feed or a competitor: `{ author, content, topic, engagement_counts }`

## Rules

1. Reference a SPECIFIC point from the post (not generic praise)
2. Add genuine value — share a relevant experience, data point, or insight
3. 2-4 phrases (assez long pour le dwell time, assez court pour ne pas hijacker)
4. Finir avec une question ou un insight qui invite la discussion
5. Sonner authentique par rapport au voice-dna
6. JAMAIS de vente ou d'auto-promotion

## Mauvais Exemples (JAMAIS ecrire)

- "Super post ! Totalement d'accord."
- "C'est tellement vrai ! Regarde ma boite pour en savoir plus."
- "J'adore ! On fait pareil."
- "Merci pour le partage !"

## Bon Exemple

"Point interessant sur la frequence d'email. On a teste ca sur 12 comptes le trimestre dernier — le sweet spot variait enormement selon l'industrie. Le cycle de consideration produit semble compter plus que la moyenne sectorielle. Tu as observe des patterns similaires ?"

## Output

Pour chaque post, generer exactement 2 options:

### Option A — Valeur Ajoutee
[Partage une experience ou un data point lie au post + question]

### Option B — Question Provocante
[Pose une question qui approfondit un point du post + petite observation]

Presenter les 2 au user. Le user choisit, edite, ou rejette.

## Tracking

Apres chaque commentaire poste:
1. Ajouter a comment-targets.json: `{ post_url, author, comment_text, commented_at }`
2. Incrementer `completed`
3. Si `completed >= target`: "Objectif atteint ! [N]/[target] commentaires aujourd'hui."
```

- [ ] **Step 2: Create autoresearch SKILL.md**

Create `linkedin/skills/autoresearch/SKILL.md`:

```markdown
---
name: autoresearch
description: "This skill should be used when running A/B experiments on post generation parameters. Karpathy-style autonomous experimentation."
---

# Autoresearch — Experimentation Autonome

## Dimensions Testables

| Dimension | Variations |
|-----------|-----------|
| hook_style | question, contrarian, bold_statement, story_opener, statistic, personal_failure |
| tone | authoritative, conversational, provocative, vulnerable, data-driven |
| word_count | 150, 180, 200, 220, 250 |
| template | 15 templates disponibles |
| cta_type | specific_question, poll_substitute, confession_invite, resource_offer, next_step |

## Procedure d'Experience

### Step 1: Selection de Dimension

Si l'utilisateur ne specifie pas:
1. Lire experiments.json → quelles dimensions ont ete testees
2. Privilegier les dimensions jamais testees
3. Sinon: tester la dimension avec le plus de variance dans les resultats precedents

### Step 2: Generation de Variations

1. Choisir un topic fixe (le meme pour toutes les variations)
2. Fixer TOUTES les variables sauf la dimension testee
3. Generer 3-5 variations en changeant uniquement la dimension cible
4. Pour chaque variation: invoquer le post-generator skill, puis le virality-scorer skill

### Step 3: Scoring et Analyse

Pour chaque variation, stocker:
```json
{
  "variant": "nom_de_la_variation",
  "content_preview": "premiers 100 caracteres",
  "virality_score": 78,
  "score_breakdown": { ... }
}
```

Determiner le gagnant (score le plus eleve). Calculer le delta.

### Step 4: Log

Ajouter a experiments.json:
```json
{
  "id": "exp_NNN",
  "dimension": "hook_style",
  "topic": "sujet teste",
  "hypothesis": "Description de l'hypothese",
  "variations": [...],
  "winner": "nom_du_gagnant",
  "delta": 13,
  "created_at": "ISO 8601"
}
```

### Step 5: Extraction de Patterns (apres 5+ experiences)

Si experiments.json contient 5+ experiences:
1. Agreger les gagnants par dimension
2. Identifier les patterns dominants
3. Mettre a jour learnings.json → patterns.top_performing avec les gagnants
4. Rapport: "Apres [N] experiences: [dimension X] = [gagnant] performe [delta]% mieux"

## Output

```
Experiment [id]:
Dimension: [dimension]
Topic fixe: [topic]
Hypothese: [description]

Resultats:
1. [variation A] — Score: [X]/100
2. [variation B] — Score: [Y]/100 ⭐ Gagnant
3. [variation C] — Score: [Z]/100

Gagnant: [B] (+[delta] points vs moyenne)
Pattern extrait: [directive pour learnings.json]
```
```

- [ ] **Step 3: Create learning-engine SKILL.md**

Create `linkedin/skills/learning-engine/SKILL.md`:

```markdown
---
name: learning-engine
description: "This skill should be used to analyze post performance data and extract patterns for improving future content generation."
---

# Learning Engine — Auto-Amelioration

## Mandatory Context Load

1. Read `${CLAUDE_PLUGIN_ROOT}/data/analytics.json` → all posts with engagement data
2. Read `${CLAUDE_PLUGIN_ROOT}/data/queue.json` → post metadata (hook_type, template, tone, etc.)
3. Read `${CLAUDE_PLUGIN_ROOT}/data/learnings.json` → current patterns (to update)
4. Read `${CLAUDE_PLUGIN_ROOT}/data/experiments.json` → experiment results

## Trigger

- Manuellement via `/linkedin:analyser`
- Automatiquement par la tache planifiee `linkedin-learning-cycle` (quotidien 02:00)
- Necessite au moins 5 posts avec donnees d'engagement pour une analyse significative

## Analyse

### Step 1: Calcul des Metriques

Pour chaque post dans analytics.json avec engagement data:
- engagement_rate = (likes + comments * 3 + reposts * 5) / impressions * 100
  (comments valent 3x les likes, reposts 5x — poids algorithmiques LinkedIn)
- Si pas d'impressions: utiliser likes + comments * 3 + reposts * 5 comme proxy

### Step 2: Segmentation

Segmenter les posts par:
- hook_type → engagement_rate moyen par type
- template → engagement_rate moyen par template
- tone → engagement_rate moyen par ton
- cta_type → engagement_rate moyen par CTA
- day_of_week → engagement_rate moyen par jour
- time_of_day → engagement_rate moyen par heure
- word_count_bucket → [<100, 100-150, 150-200, 200-250, 250+]

### Step 3: Identification des Patterns

Top performing = top 25% par engagement_rate
Underperforming = bottom 25%

Pour chaque dimension, identifier:
- Le gagnant (valeur avec le plus haut engagement moyen)
- Le perdant (valeur avec le plus bas)
- Le delta (difference en %)

### Step 4: Generation de Directives

Transformer les patterns en directives injectables dans les prompts:
- "Tes posts avec hook 'specificite' performent [X]x mieux — privilegie les chiffres concrets en ouverture"
- "Le ton 'provocative' genere [X]% plus de commentaires que 'authoritative'"
- "Tes CTAs de type 'confession_invite' surperforment — utilise-les [X]x/semaine"
- "Evite le template 'quick_tips' — engagement [X]% sous la moyenne"
- "Publie le [jour] a [heure] — ton meilleur creneau"

### Step 5: Mise a Jour

Ecrire dans learnings.json:
- `last_analysis`: timestamp ISO 8601
- `prompt_directives`: array de directives (max 10, les plus significatives)
- `patterns.top_performing`: hooks, tones, templates, cta_types gagnants
- `patterns.underperforming`: hooks, tones, templates, avoid_topics perdants

Mettre a jour analytics.json summary avec les nouvelles moyennes.

## Output

```
Analyse de performance — [N] posts analyses

Meilleurs patterns:
- Hook: [type] ([X]x mieux que la moyenne)
- Ton: [type] (+[Y]% d'engagement)
- Template: [type] (+[Z]% d'engagement)
- CTA: [type] (+[W]% d'engagement)
- Creneau: [jour] a [heure]

A eviter:
- Hook: [type] (-[X]% vs moyenne)
- Template: [type] (-[Y]% vs moyenne)

[N] directives mises a jour dans learnings.json.
Prochaine generation beneficiera de ces apprentissages.
```

## Cold Start

Si < 5 posts avec engagement data:
"Pas assez de donnees pour une analyse fiable ([N]/5 posts minimum). Continue a publier et reviens apres [5-N] posts supplementaires."

Utiliser les best-practices par defaut (pas de directives personnalisees).
```

- [ ] **Step 4: Commit**

```bash
git add linkedin/skills/comment-strategist/ linkedin/skills/autoresearch/ linkedin/skills/learning-engine/
git commit -m "feat(linkedin): comment-strategist, autoresearch, and learning-engine skills"
```

---

## Task 6: Profile Setup Skill + Onboarding Agent

**Files:**
- Create: `linkedin/skills/profile-setup/SKILL.md`
- Create: `linkedin/agents/onboarding-agent.md`

- [ ] **Step 1: Create profile-setup SKILL.md**

Create `linkedin/skills/profile-setup/SKILL.md`:

```markdown
---
name: profile-setup
description: "This skill should be used during onboarding to gather LinkedIn-specific configuration from the user."
---

# Profile Setup — Configuration LinkedIn

## Interview Flow

### Question 1: Profil LinkedIn
"Quel est ton URL de profil LinkedIn ? (ex: linkedin.com/in/tonnom)"

Store in linkedin-profile.json → profile_url

### Question 2: Pilliers de Contenu
"Sur quels sujets veux-tu publier ? Liste 3-5 pilliers de contenu.
Exemples: 'Growth marketing', 'Leadership', 'IA pour les PME', 'Recrutement tech'"

Store in linkedin-profile.json → content_pillars

### Question 3: Frequence
"Combien de posts par jour veux-tu publier ? (recommande: 1)"

Store in posting_config → posts_per_day

### Question 4: Creneaux
"A quelles heures veux-tu publier ? (recommande: 08:30 et 12:00)
Les meilleurs creneaux LinkedIn en France sont 7h30-9h et 11h30-13h."

Store in posting_config → posting_slots

### Question 5: Jours Actifs
"Quels jours publier ? (recommande: lundi a vendredi)
0=Lundi, 1=Mardi, ..., 6=Dimanche"

Store in posting_config → active_days

### Question 6: Concurrents
"Quels profils LinkedIn veux-tu surveiller ? (0-10 URLs)
Ce sont les personnes dont tu veux analyser le contenu pour t'inspirer."

Store in competitors.json → competitors array with name and profile_url

### Question 7: Timezone
"Quel est ton fuseau horaire ? (defaut: Europe/Paris)"

Store in posting_config → timezone

## Copywriter Integration Check

Before starting the interview:
1. Glob for `copywriter/.claude-plugin/plugin.json` relative to CLAUDE_PLUGIN_ROOT parent
2. If found:
   - Read copywriter/data/voice-dna.json, icp.json, business-profile.json
   - If populated: "Plugin copywriter detecte. J'utilise tes fichiers d'identite existants (voice-dna, ICP, business-profile)."
   - Skip creating local identity files
3. If not found:
   - "Plugin copywriter non detecte. Je vais creer des fichiers d'identite locaux."
   - Run a simplified voice-dna interview (ask for 3 writing samples, extract tone)
   - Run a simplified ICP interview (ask for target audience description)
   - Write to local data/voice-dna.json, data/icp.json, data/business-profile.json

## Chrome Profile Extraction (Optional)

After getting the profile URL:
"Veux-tu que j'ouvre ton profil LinkedIn dans Chrome pour extraire automatiquement ton nom, titre et nombre de followers ?"

If yes:
1. Use chrome-linkedin skill Procedure 1 (auth check)
2. Navigate to profile URL
3. Extract: display_name, headline, follower_count
4. Store in linkedin-profile.json
```

- [ ] **Step 2: Create onboarding-agent.md**

Create `linkedin/agents/onboarding-agent.md`:

```markdown
---
name: onboarding-agent
description: >
  Orchestrates first-run setup of the LinkedIn plugin. Detects copywriter plugin,
  interviews user for LinkedIn config, optionally extracts profile from Chrome.
  Triggered exclusively by /linkedin:start.
model: sonnet
tools: ["Read", "Write", "Glob", "Bash"]
color: green
---

# Onboarding Agent

## Step 0: Partial Install Detection

Check which files already exist in `${CLAUDE_PLUGIN_ROOT}/data/`:
```
linkedin-profile.json:  EXISTS (with display_name) / EMPTY / MISSING
competitors.json:       EXISTS (non-empty) / EMPTY / MISSING
schedule-config.json:   EXISTS / MISSING
```

If linkedin-profile.json has a display_name: "Ton profil LinkedIn est deja configure ([name]). Veux-tu le mettre a jour ou le garder ?"

## Step 1: Copywriter Detection

1. Glob for `copywriter/.claude-plugin/plugin.json` relative to `${CLAUDE_PLUGIN_ROOT}/..`
2. If found and identity files are populated:
   - Read and display summary: "Plugin copywriter detecte. Identite: [primary_role] — [unique_angle]. Audience: [icp summary]."
   - "J'utilise ces fichiers. Pas besoin de reconfigurer ta voix."
3. If not found:
   - "Copywriter non detecte. On va creer tes fichiers d'identite."
   - Proceed with simplified identity interviews in Step 2b

## Step 2a: LinkedIn Profile Setup (always runs)

Invoke `profile-setup` skill. Follow the 7-question interview.

## Step 2b: Identity Setup (only if no copywriter)

If copywriter was NOT detected:

### Voice DNA (simplified)
"Colle 3 exemples de tes ecrits (posts LinkedIn, emails, articles). Je vais extraire ton ADN d'ecriture."
- Analyze writing samples
- Extract: tone, sentence_structure, forbidden_words, signature_phrases
- Write to `${CLAUDE_PLUGIN_ROOT}/data/voice-dna.json`

### ICP (simplified)
"Decris ton audience cible en 2-3 phrases. Qui sont-ils ? Quels sont leurs problemes ?"
- Extract: pain_points, vocabulary, job_titles
- Write to `${CLAUDE_PLUGIN_ROOT}/data/icp.json`

### Business Profile (simplified)
"Que fais-tu ? Quel est ton offre principale ?"
- Extract: offer, primary_cta, positioning
- Write to `${CLAUDE_PLUGIN_ROOT}/data/business-profile.json`

## Step 3: Chrome Profile Extraction (optional)

"Veux-tu que j'ouvre ton profil dans Chrome pour recuperer ton nom, titre et followers automatiquement ?"

If yes: invoke chrome-linkedin Procedure 1, then navigate to profile URL, extract data.
If no: the user's answers from Step 2a are sufficient.

## Step 4: Completion

Show summary:
```
Setup complet !

Profil: [display_name] — [headline]
URL: [profile_url]
Pilliers: [list]
Frequence: [X] post(s)/jour a [heures]
Concurrents surveilles: [N]
Identite: [copywriter partagee / locale]

Prochaines etapes:
- /linkedin:publier — Generer ton premier post
- /linkedin:recherche — Rechercher des sujets tendance
- /linkedin:commenter — Commencer le commenting strategique
```
```

- [ ] **Step 3: Commit**

```bash
git add linkedin/skills/profile-setup/ linkedin/agents/onboarding-agent.md
git commit -m "feat(linkedin): profile-setup skill and onboarding-agent"
```

---

## Task 7: Content Agent + Research Agent + Engagement Agent

**Files:**
- Create: `linkedin/agents/content-agent.md`
- Create: `linkedin/agents/research-agent.md`
- Create: `linkedin/agents/engagement-agent.md`

- [ ] **Step 1: Create content-agent.md**

Create `linkedin/agents/content-agent.md`:

```markdown
---
name: content-agent
description: >
  Full content pipeline orchestrator. Generates LinkedIn posts with strategy,
  hooks, scoring, and auto-regeneration. Trigger with "publie", "ecris un post",
  "genere du contenu", "LinkedIn post".
model: sonnet
tools: ["Read", "Write", "Glob", "Grep"]
color: blue
---

# Content Agent — Pipeline de Contenu

## Step 0: Identity Load

1. Detect copywriter: Glob for `copywriter/.claude-plugin/plugin.json` relative to `${CLAUDE_PLUGIN_ROOT}/..`
2. If found: Read `copywriter/data/voice-dna.json`, `copywriter/data/icp.json`, `copywriter/data/business-profile.json`
3. If not found: Read local equivalents from `${CLAUDE_PLUGIN_ROOT}/data/`
4. Read `${CLAUDE_PLUGIN_ROOT}/data/linkedin-profile.json`
5. Read `${CLAUDE_PLUGIN_ROOT}/data/learnings.json`
6. Read `${CLAUDE_PLUGIN_ROOT}/data/analytics.json` (summary only)

If voice-dna is empty/missing: "Profil non configure. Lance /linkedin:start d'abord." STOP.

## Step 1: Content Strategy

Invoke `content-strategy` skill with the user's topic (or empty for auto-selection).

Receive: `{ topic, pillar, template, tone, angle, cta_type, rationale }`

Present to user: "Strategie: **[topic]** — Template: [template], Ton: [tone], Angle: [angle]. [rationale]"

Ask: "Ca te va ? (ou dis-moi ce que tu veux changer)"

## Step 2: Post Generation

Invoke `post-generator` skill with the strategy output.

Receive: 3 hooks + full post draft + format recommendation.

## Step 3: Virality Scoring

Invoke `virality-scorer` skill with the full post.

Receive: score + breakdown + improvements.

## Step 4: Auto-Regeneration (if needed)

If score < 60:
- "Score de viralite: [X]/100 (insuffisant). Regeneration en cours avec le feedback..."
- Re-invoke `post-generator` with the scorer's regeneration feedback
- Re-score. Max 2 retries.
- If still < 60 after 2 retries: present the best version with a warning

## Step 5: Present Result

Show to user:
```
Post LinkedIn — Score: [X]/100 ([tier])

[Full post text]

---
Caracteres: [X]/3000 | Mots: [Y] | Newlines: [Z]
Hook: [type] | Template: [name] | Ton: [tone]
CTA: [type]
Suggestion: publier [jour] a [heure]

Que veux-tu faire ?
1. Ajouter a la file (QUEUED)
2. Programmer pour [jour] a [heure] (SCHEDULED)
3. Modifier le post
4. Regenerer completement
5. Annuler
```

## Step 6: Queue Management

On user choice:
- **1 (QUEUED)**: Generate unique ID (`post_YYYYMMDD_NNN`), write to queue.json with status "queued"
- **2 (SCHEDULED)**: Same + set `scheduled_for` to the chosen datetime, status "scheduled"
- **3 (Modify)**: Let user edit, re-score, then re-present
- **4 (Regenerate)**: Back to Step 1 with same topic
- **5 (Cancel)**: Do nothing

## Batch Mode

If user asks for multiple posts (e.g., "genere 5 posts pour la semaine"):
1. Invoke content-strategy 5 times with mix enforcement
2. Present mix audit: "[N] valeur / [N] preuve / [N] personnel"
3. Generate each post sequentially through Steps 2-5
4. At end: "5 posts generes. Score moyen: [X]/100. Tous en file d'attente."
```

- [ ] **Step 2: Create research-agent.md**

Create `linkedin/agents/research-agent.md`:

```markdown
---
name: research-agent
description: >
  Multi-source research aggregator. Trending topics from WebSearch, LinkedIn feed,
  and competitors. Trigger with "recherche", "trending", "tendance", "veille".
model: sonnet
tools: ["Read", "Write", "WebSearch", "Glob"]
color: purple
---

# Research Agent — Recherche Multi-Sources

## Step 0: Context Load

1. Read `${CLAUDE_PLUGIN_ROOT}/data/linkedin-profile.json` → content_pillars
2. Read `${CLAUDE_PLUGIN_ROOT}/data/competitors.json` → competitor list
3. Read `${CLAUDE_PLUGIN_ROOT}/data/research.json` → previous research (freshness check)

## Step 1: Web Research

For each content pillar (max 5):
1. WebSearch for "[pillar] trends 2026" and "[pillar] LinkedIn viral"
2. Extract top 3 results per pillar
3. For each result: title, URL, key takeaway, relevance score (1-5)

If user provided a specific topic: focus WebSearch on that topic instead.

## Step 2: Feed Scan (if Chrome available)

Attempt Chrome-based feed reading:
1. Invoke chrome-linkedin Procedure 6 (Read Feed) with scroll_count 5
2. Extract trending topics and high-engagement posts
3. Identify common themes and hashtags

If Chrome is not available: skip, note "Scan du feed non disponible — connecte Chrome pour enrichir la recherche."

## Step 3: Competitor Analysis

If competitors.json has entries:
1. For each competitor (max 5): check their last scraped data
2. Identify their top-performing recent topics
3. Note angles they haven't covered (gaps = opportunities)

If no competitors configured: skip, suggest adding via `/linkedin:concurrents`

## Step 4: Aggregation & Ranking

Combine all sources. For each topic found:
- topic_name
- source (web/feed/competitor)
- relevance_to_pillars (1-5, based on content_pillars match)
- freshness (trending now vs evergreen)
- competition_level (how many competitors already posted on this)
- suggested_angle (from strategy-rules.md angles)

Rank by: relevance * 3 + freshness * 2 + (5 - competition_level)

## Step 5: Store & Present

Write to `${CLAUDE_PLUGIN_ROOT}/data/research.json`:
```json
{
  "last_updated": "ISO 8601",
  "topics": [
    {
      "topic": "...",
      "source": "web|feed|competitor",
      "relevance": 4,
      "freshness": "trending",
      "suggested_angle": "contrarian_take",
      "notes": "..."
    }
  ]
}
```

Present top 10 topics:
```
Recherche terminee — [N] sujets trouves

Top 10:
1. [Topic] — [angle suggere] (source: [web/feed/concurrent])
2. ...

Pour generer un post sur un sujet: /linkedin:publier [numero ou sujet]
```
```

- [ ] **Step 3: Create engagement-agent.md**

Create `linkedin/agents/engagement-agent.md`:

```markdown
---
name: engagement-agent
description: >
  Strategic commenting engine. Surfaces high-value posts, drafts comments,
  tracks daily targets. Trigger with "commente", "engage", "reagis".
model: sonnet
tools: ["Read", "Write"]
color: yellow
---

# Engagement Agent — Commentaires Strategiques

## Step 0: Context & Progress

1. Read `${CLAUDE_PLUGIN_ROOT}/data/comment-targets.json`
2. If `today` field != today's date: reset `completed` to 0 and `comments` to []
3. Read `${CLAUDE_PLUGIN_ROOT}/data/linkedin-profile.json` → commenting_config
4. Read voice-dna (copywriter or local) for tone matching

Show progress: "Commentaires aujourd'hui: [completed]/[target]"

If completed >= target: "Objectif atteint ! Tu veux continuer quand meme ?"

## Step 1: Source Targets

Two modes:

### Mode A: Feed Scan (default)
1. Invoke chrome-linkedin Procedure 6 (Read Feed)
2. Filter posts: min 10 likes, not by the user themselves
3. Prioritize: posts from competitors (competitors.json) > posts with high engagement > recent posts
4. Select top 5 posts to comment on

### Mode B: Specific URL
If user provides a URL: target that specific post only.

## Step 2: Draft Comments (batch of 5)

For each target post:
1. Invoke `comment-strategist` skill
2. Receive 2 options: value-add and question

Present all 5 posts with their comment options:
```
Post 1/5 — [Author] ([likes] likes, [comments] commentaires)
"[Post preview — first 100 chars]..."

Option A (valeur): [comment text]
Option B (question): [comment text]

Choisis A, B, edite, ou passe →
```

## Step 3: Post Comments

For each user-approved comment:
1. Invoke chrome-linkedin Procedure 5 (Post Comment)
2. Chrome navigates to the post, types the comment
3. User confirms via screenshot
4. Chrome posts
5. Update comment-targets.json

## Step 4: Progress Update

After each batch:
```
Progression: [completed]/[target] commentaires

[Si < target]: Encore [remaining]. Veux-tu continuer avec 5 autres posts ?
[Si >= target]: Objectif atteint ! Excellent travail.
```

Write updated comment-targets.json.
```

- [ ] **Step 4: Commit**

```bash
git add linkedin/agents/content-agent.md linkedin/agents/research-agent.md linkedin/agents/engagement-agent.md
git commit -m "feat(linkedin): content, research, and engagement agents"
```

---

## Task 8: Analytics Agent + Competitor Agent

**Files:**
- Create: `linkedin/agents/analytics-agent.md`
- Create: `linkedin/agents/competitor-agent.md`

- [ ] **Step 1: Create analytics-agent.md**

Create `linkedin/agents/analytics-agent.md`:

```markdown
---
name: analytics-agent
description: >
  Scrapes engagement stats via Chrome, runs learning engine analysis, handles
  autoresearch experiments. Trigger with "analyser", "analytics", "performance",
  "experiment".
model: sonnet
tools: ["Read", "Write"]
color: red
---

# Analytics Agent

## Parse Arguments

- No args or "stats": Run engagement scraping + learning analysis
- "experiment" or "test": Run autoresearch experiment
- "experiment --auto": Schedule weekly experiment cycle

## Workflow 1: Engagement Scraping + Learning

### Step 1: Scrape

1. Read `${CLAUDE_PLUGIN_ROOT}/data/linkedin-profile.json` → profile_url
2. Invoke chrome-linkedin Procedure 3 (Scrape Engagement Stats)
3. Receive array of posts with engagement data

### Step 2: Match & Update

For each scraped post:
1. Read `${CLAUDE_PLUGIN_ROOT}/data/queue.json`
2. Match scraped post to queue entries by content_preview similarity (first 80 chars)
3. Update matched entries with fresh engagement numbers
4. Write updated queue.json

Update `${CLAUDE_PLUGIN_ROOT}/data/analytics.json`:
1. For each matched post: add/update in analytics.posts array
2. Recalculate summary: avg_likes, avg_comments, best_day, best_time, etc.
3. Set last_updated to now

### Step 3: Learning

Check if analytics.json has >= 5 posts with engagement data.

If yes: Invoke `learning-engine` skill. Present the analysis results.
If no: "Pas assez de donnees ([N]/5 posts). Continue a publier."

## Workflow 2: Autoresearch Experiment

1. Invoke `autoresearch` skill
2. If user specified a dimension: pass it through
3. If not: let the skill auto-select
4. Present results
5. If 5+ experiments exist: extract and merge patterns into learnings.json

## Workflow 3: Schedule Experiments (--auto)

"Veux-tu planifier un experiment hebdomadaire automatique ?"
If yes: create a scheduled task `linkedin-autoresearch-weekly` (every Sunday 14:00)
```

- [ ] **Step 2: Create competitor-agent.md**

Create `linkedin/agents/competitor-agent.md`:

```markdown
---
name: competitor-agent
description: >
  Monitors and analyzes competitor LinkedIn profiles. Scrapes posts, identifies
  patterns, surfaces insights. Trigger with "concurrent", "competitor", "surveille".
model: sonnet
tools: ["Read", "Write"]
color: orange
---

# Competitor Agent

## Parse Arguments

- No args: scan all competitors
- URL: add new competitor
- "ajoute [URL]": add new competitor
- "supprime [name]": remove competitor
- "[name]": scan specific competitor

## Workflow 1: Add Competitor

1. User provides LinkedIn profile URL
2. Ask: "Quel est le nom/pseudo de ce concurrent ? Et sa niche ?"
3. Add to competitors.json:
```json
{
  "name": "...",
  "profile_url": "...",
  "niche": "...",
  "avg_engagement": 0,
  "last_scraped": null,
  "posts": []
}
```

## Workflow 2: Scan All Competitors

For each competitor in competitors.json:

### Step 1: Scrape
1. Invoke chrome-linkedin Procedure 4 (Scrape Competitor Posts) with max_posts 10
2. Receive array of posts with engagement data and analysis

### Step 2: Analyze
For each competitor:
- Calculate avg engagement (likes + comments * 3 + reposts * 5)
- Identify top 3 posts (by engagement)
- Identify dominant hook style
- Identify posting frequency
- Compare to previous scan (growth/decline)

### Step 3: Update
Write to competitors.json with fresh data and last_scraped timestamp.

### Step 4: Insights

Present comparative analysis:
```
Analyse concurrentielle — [N] profils scannes

[Competitor 1]:
- Posts recents: [N] | Engagement moyen: [X]
- Hook dominant: [type] | Ton dominant: [type]
- Top post: "[preview]" ([likes] likes, [comments] commentaires)
- Tendance: [hausse/stable/baisse] vs dernier scan

[Competitor 2]: ...

Opportunites:
- [Competitor X] ne couvre pas [topic] — opportunity pour toi
- Le hook [type] performe bien chez [Competitor Y] — teste-le
- [Topic] trending chez plusieurs concurrents — a considerer
```

## Workflow 3: Scan Specific Competitor

Same as Workflow 2 but for a single competitor. Include more detail:
- Full post list with engagement
- Hook analysis per post
- Content pillar mapping
- Posting schedule pattern (days/times)
```

- [ ] **Step 3: Commit**

```bash
git add linkedin/agents/analytics-agent.md linkedin/agents/competitor-agent.md
git commit -m "feat(linkedin): analytics and competitor agents"
```

---

## Task 9: Commands (Router, Publier, Commenter, File, Bilan, etc.)

**Files:**
- Create: all 9 command files in `linkedin/commands/`

- [ ] **Step 1: Create the smart router linkedin.md**

Create `linkedin/commands/linkedin.md`:

```markdown
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
```

- [ ] **Step 2: Create start.md**

Create `linkedin/commands/start.md`:

```markdown
---
description: "Initialiser le plugin LinkedIn: profil, pilliers, concurrents, creneaux."
argument-hint: "[--update profile|competitors|schedule]"
allowed-tools: Read, Write, Glob, Bash
model: sonnet
---

# /linkedin:start

Invoke the `onboarding-agent` to guide the user through setup.

Do not implement the wizard yourself — delegate entirely to the agent.

### --update flag

If `$ARGUMENTS` contains `--update profile`: only re-run LinkedIn profile questions.
If `$ARGUMENTS` contains `--update competitors`: only re-run competitor setup.
If `$ARGUMENTS` contains `--update schedule`: only re-run posting schedule config.
```

- [ ] **Step 3: Create publier.md**

Create `linkedin/commands/publier.md`:

```markdown
---
description: "Generer et publier du contenu LinkedIn: posts, carrousels, series."
argument-hint: "[topic] [--batch N]"
allowed-tools: Read, Write, Glob, Grep, Agent
---

## Your task

### Identity Check

Read `${CLAUDE_PLUGIN_ROOT}/data/linkedin-profile.json`. If empty or no `display_name`, stop: "Profil non configure. Lance /linkedin:start d'abord."

### Parse $ARGUMENTS

- **topic**: Everything that is not a flag
- **--batch N**: Generate N posts (default: 1)

### Dispatch

Invoke the `content-agent` with:
- topic (from arguments, or empty for auto-selection)
- batch count (from --batch flag, default 1)

The content-agent handles the full pipeline: strategy → generation → scoring → queue.
```

- [ ] **Step 4: Create commenter.md**

Create `linkedin/commands/commenter.md`:

```markdown
---
description: "Commentaires strategiques LinkedIn: cible des posts a fort potentiel, redige des commentaires a valeur ajoutee."
argument-hint: "[url] [--count N]"
allowed-tools: Read, Write, Agent
---

## Your task

### Identity Check

Read `${CLAUDE_PLUGIN_ROOT}/data/linkedin-profile.json`. If empty, stop: "Profil non configure. Lance /linkedin:start d'abord."

### Parse $ARGUMENTS

- **url**: If a LinkedIn post URL is provided, target that specific post
- **--count N**: Number of posts to comment on (default: 5)

### Dispatch

Invoke the `engagement-agent` with the parsed arguments.
```

- [ ] **Step 5: Create recherche.md**

Create `linkedin/commands/recherche.md`:

```markdown
---
description: "Recherche de tendances et sujets LinkedIn: WebSearch, feed scan, analyse concurrentielle."
argument-hint: "[sujet|url] [--deep]"
allowed-tools: Read, Write, WebSearch, Agent
---

## Your task

### Parse $ARGUMENTS

- **topic/url**: The research subject or a URL to analyze
- **--deep**: Run deeper research with more sources

### Dispatch

Invoke the `research-agent` with the topic/url and deep flag.
```

- [ ] **Step 6: Create concurrents.md**

Create `linkedin/commands/concurrents.md`:

```markdown
---
description: "Surveillance concurrentielle LinkedIn: ajouter, scanner et analyser les profils concurrents."
argument-hint: "[url|nom] [ajoute|supprime]"
allowed-tools: Read, Write, Agent
---

## Your task

### Parse $ARGUMENTS

- URL detected → add new competitor
- "ajoute [URL]" → add new competitor
- "supprime [name]" → remove competitor
- Name only → scan specific competitor
- Empty → scan all competitors

### Dispatch

Invoke the `competitor-agent` with the parsed action and target.
```

- [ ] **Step 7: Create analyser.md**

Create `linkedin/commands/analyser.md`:

```markdown
---
description: "Analytics LinkedIn: scraper l'engagement, analyser les patterns, lancer des experiments."
argument-hint: "[experiment [--auto]] [stats]"
allowed-tools: Read, Write, Agent
---

## Your task

### Parse $ARGUMENTS

- Empty or "stats": Run engagement scraping + learning analysis
- "experiment": Run a single autoresearch experiment
- "experiment --auto": Schedule weekly experiments

### Dispatch

Invoke the `analytics-agent` with the parsed mode.
```

- [ ] **Step 8: Create file.md**

Create `linkedin/commands/file.md`:

```markdown
---
description: "Gerer la file d'attente: approuver, rejeter, editer, planifier les posts."
argument-hint: "[approve|reject|edit|schedule] [post_id]"
allowed-tools: Read, Write, Edit, Agent
---

## Your task

### Load Queue

Read `${CLAUDE_PLUGIN_ROOT}/data/queue.json`.

### Parse $ARGUMENTS

- **approve [id]**: Change status from "queued" to "approved"
- **reject [id]**: Change status from "queued" to "rejected", ask for reason
- **edit [id]**: Show post content, let user modify, re-score with virality-scorer
- **schedule [id] [datetime]**: Change status to "scheduled", set scheduled_for
- **post [id]**: Immediately post via Chrome (invoke chrome-linkedin Procedure 2)
- **Empty**: Show all posts grouped by status

### Display (when no action)

```
File d'attente LinkedIn

QUEUED ([N]):
- [id] | [topic] | Score: [X]/100 | [created_at]
  "[content preview — first 80 chars]..."

APPROVED ([N]):
- [id] | [topic] | Score: [X]/100 | Prochain creneau: [time]

SCHEDULED ([N]):
- [id] | [topic] | Score: [X]/100 | Publie le: [scheduled_for]

POSTED ([N] recents):
- [id] | [topic] | [posted_at] | [likes] likes, [comments] comments

Actions: /linkedin:file approve [id] | reject [id] | edit [id] | schedule [id] [datetime] | post [id]
```

### Post Action

When "post [id]":
1. Find post in queue.json
2. Verify status is "approved" or "scheduled"
3. Invoke chrome-linkedin Procedure 2 (Post to LinkedIn)
4. On success: update status to "posted", set posted_at and linkedin_url
5. On failure: update status to "failed"
```

- [ ] **Step 9: Create bilan.md**

Create `linkedin/commands/bilan.md`:

```markdown
---
description: "Tableau de bord LinkedIn: etat de la file, analytics, objectifs du jour."
argument-hint: "[--detailed]"
allowed-tools: Read, Glob, Bash(date:*)
---

## Your task

### Load All Status Files

Read from `${CLAUDE_PLUGIN_ROOT}/data/`:
- `linkedin-profile.json`
- `queue.json`
- `analytics.json`
- `comment-targets.json`
- `learnings.json`
- `competitors.json`
- `schedule-config.json`

### Display Dashboard

```
LinkedIn Dashboard — [display_name]

Profil: [headline] | [follower_count] followers
Pilliers: [content_pillars list]

File d'attente:
- Brouillons: [N] | En attente: [N] | Approuves: [N] | Programmes: [N]
- Prochain post: [scheduled_for or "aucun"]

Engagement aujourd'hui:
- Commentaires: [completed]/[target]
- [nudge si < 10]

Performance (dernier mois):
- Posts publies: [N]
- Engagement moyen: [avg_likes] likes, [avg_comments] commentaires
- Meilleur creneau: [best_day] a [best_time]
- Meilleur hook: [best_hook_type]

Apprentissages actifs: [N] directives
Concurrents surveilles: [N]
Dernier scan: [last_scraped]

Actions rapides:
- /linkedin:publier — Generer un post
- /linkedin:commenter — Commentaires strategiques
- /linkedin:recherche — Rechercher des tendances
- /linkedin:file — Gerer la file d'attente
```

### --detailed Flag

If $ARGUMENTS contains `--detailed`:
- Show full learnings.json prompt_directives
- Show last 5 experiments from experiments.json
- Show competitor summary from competitors.json
- Show posting frequency chart (posts per week for last month)
```

- [ ] **Step 10: Commit**

```bash
git add linkedin/commands/
git commit -m "feat(linkedin): all 9 commands — router, start, publier, commenter, recherche, concurrents, analyser, file, bilan"
```

---

## Task 10: Final Integration & Marketplace Update

**Files:**
- Modify: `marketplace.json` (add linkedin plugin entry)
- Verify: all files exist and are consistent

- [ ] **Step 1: Verify file tree**

Run:
```bash
find linkedin -type f | sort
```

Expected: all files from the file structure section. Verify nothing is missing.

- [ ] **Step 2: Update marketplace.json**

Read the existing `marketplace.json` in the repo root. Add a new entry for the linkedin plugin following the same schema as existing entries:

```json
{
  "name": "linkedin",
  "version": "1.0.0",
  "description": "LinkedIn growth engine. Chrome-native content pipeline: generate, queue, post, analyze, learn.",
  "author": "NMarchitecte",
  "keywords": ["linkedin", "social-media", "content-pipeline", "chrome-automation"],
  "path": "linkedin"
}
```

- [ ] **Step 3: Final commit**

```bash
git add marketplace.json
git commit -m "feat(linkedin): add to marketplace.json"
```

- [ ] **Step 4: Verify with dry run**

Test that the plugin structure is valid:
```bash
# Check all expected directories exist
ls linkedin/.claude-plugin/ linkedin/commands/ linkedin/skills/ linkedin/agents/ linkedin/data/ linkedin/hooks/

# Check plugin.json is valid JSON
cat linkedin/.claude-plugin/plugin.json | python -m json.tool

# Check all data files are valid JSON
for f in linkedin/data/*.json; do echo "Checking $f"; cat "$f" | python -m json.tool > /dev/null && echo "OK" || echo "FAIL"; done

# Count files
echo "Total files:"; find linkedin -type f | wc -l
echo "Commands:"; ls linkedin/commands/*.md | wc -l
echo "Skills:"; find linkedin/skills -name "SKILL.md" | wc -l
echo "Agents:"; ls linkedin/agents/*.md | wc -l
echo "Data files:"; ls linkedin/data/*.json | wc -l
```

Expected counts:
- Commands: 9
- Skills: 8 (chrome-linkedin, post-generator, virality-scorer, content-strategy, comment-strategist, autoresearch, learning-engine, profile-setup)
- Agents: 6
- Data files: 9

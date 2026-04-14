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

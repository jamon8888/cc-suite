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
  "score_breakdown": { }
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
  "variations": [],
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

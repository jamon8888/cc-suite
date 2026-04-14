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

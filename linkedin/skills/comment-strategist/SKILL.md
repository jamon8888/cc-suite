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

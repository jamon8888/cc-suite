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

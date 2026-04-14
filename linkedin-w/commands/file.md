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

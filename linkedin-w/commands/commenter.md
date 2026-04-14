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

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

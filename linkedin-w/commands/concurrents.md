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

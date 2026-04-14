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

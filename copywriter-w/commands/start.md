---
description: "Initialiser le plugin Copywriter: Voice DNA, ICP, profil business et base wiki."
argument-hint: "[--update voice|icp|business]"
allowed-tools: Read, Write, Bash
model: sonnet
---

# /copywriter:start

Invoke the `onboarding-agent` to guide the user through setup.

Do not implement the wizard yourself — delegate entirely to the agent.

### Phase 2: Wiki Init

After identity files are created:
1. Read `${CLAUDE_PLUGIN_ROOT}/data/business-profile.json` to get the business niche
2. Derive a wiki topic slug from the niche (lowercase, hyphens, max 40 chars)
3. Resolve HUB: try `$HOME/wiki/_index.md`, else `~/.config/llm-wiki/config.json`, else `$HOME/wiki`
4. If HUB doesn't exist, create it: `wikis.json` + `_index.md` + `log.md` + `topics/`
5. Create `HUB/topics/<slug>/` following the wiki init protocol from `${CLAUDE_PLUGIN_ROOT}/skills/wiki-core/references/wiki-structure.md`
6. Register in `HUB/wikis.json` and update hub `_index.md`

### Phase 3: Bootstrap Research

Ask: "Veux-tu que je recherche ton secteur pour alimenter ta base ? (5 min)"
- If yes: invoke `Skill: copywriter:recherche` with the business niche and `--sources 10`
- If no: skip, suggest running `/copywriter:recherche` later

### Voice DNA Versioning

Before overwriting `voice-dna.json`:
1. If `${CLAUDE_PLUGIN_ROOT}/data/voice-dna.json` exists and is non-empty, copy it to `${CLAUDE_PLUGIN_ROOT}/data/voice-dna.previous.json`
2. Then proceed with the new voice DNA creation

### --update flag

If `$ARGUMENTS` contains `--update voice`: skip business profile and ICP interviews, only re-run voice DNA extraction.
If `$ARGUMENTS` contains `--update icp`: skip business profile and voice DNA, only re-run ICP interview.
If `$ARGUMENTS` contains `--update business`: skip voice DNA and ICP, only re-run business profile interview.

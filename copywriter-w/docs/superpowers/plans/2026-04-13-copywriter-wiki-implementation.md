# Copywriter Wiki — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Cowork plugin that fuses llm-wiki's knowledge base pipeline with copywriter's content generation, producing an evidence-based copywriting studio.

**Architecture:** Dual-Core — JSON identity files in `data/` for fast session loading, wiki knowledge base at `~/wiki/` for persistent research. Commands orchestrate context assembly, agents receive self-contained briefs and never touch the filesystem.

**Tech Stack:** Markdown files (skills, commands, agents), JSON (plugin manifest, identity files, hooks), Python (antislop scoring scripts). No build step. Cowork plugin conventions.

**Source plugins:**
- llm-wiki (optimized): `D:/telechargements/llm-wiki/`
- copywriter v2.0: `/tmp/copywriter/copywriter/`
- Scaffold: `D:/telechargements/copywriter-wiki/`

---

## File Map

### Files to create (new)

| File | Source | Modification |
|------|--------|-------------|
| `.mcp.json` | New | WordPress MCP config with userConfig vars |
| `hooks/hooks.json` | New | SessionStart hook only |
| `CONNECTORS.md` | New | Connector docs |
| `README.md` | New | Usage guide |
| `LICENSE` | New | MIT |
| `data/voice-dna.json` | Copy from copywriter `data/2-Domaines/` | Verbatim (empty template) |
| `data/icp.json` | Copy from copywriter `data/2-Domaines/` | Verbatim (empty template) |
| `data/business-profile.json` | Copy from copywriter `data/2-Domaines/` | Verbatim (empty template) |
| `data/glossary.md` | Copy from copywriter `data/2-Domaines/` | Verbatim |
| `commands/copywriter.md` | New | Natural language router |
| `commands/ecrire.md` | New | Unified writer with context assembly |
| `commands/recherche.md` | Adapted from llm-wiki `commands/research.md` | Add ICP injection, content_angles |
| `commands/apprendre.md` | Adapted from llm-wiki `commands/ingest.md` | French naming, inline prelude |
| `commands/question.md` | Adapted from llm-wiki `commands/query.md` | French naming |
| `commands/calendrier.md` | Adapted from copywriter `commands/plan.md` | Add wiki confidence grounding |
| `commands/verifier.md` | Adapted from copywriter `commands/audit.md` | Add source credibility + staleness |
| `commands/start.md` | Adapted from copywriter `commands/start.md` | Add wiki init phase |
| `commands/bilan.md` | New | Wiki status + content stats |
| `skills/wiki-core/SKILL.md` | Adapted from llm-wiki `wiki-manager/SKILL.md` | Renamed, adjusted description |
| `skills/content-writer/SKILL.md` | New | Orchestrator skill for context assembly |

### Files to copy verbatim

| Destination | Source |
|-------------|--------|
| `skills/wiki-core/references/hub-resolution.md` | llm-wiki `references/hub-resolution.md` |
| `skills/wiki-core/references/wiki-structure.md` | llm-wiki `references/wiki-structure.md` |
| `skills/wiki-core/references/ingestion.md` | llm-wiki `references/ingestion.md` |
| `skills/wiki-core/references/indexing.md` | llm-wiki `references/indexing.md` |
| `skills/wiki-core/references/linting.md` | llm-wiki `references/linting.md` |
| `skills/wiki-reader/SKILL.md` | llm-wiki `skills/wiki-reader/SKILL.md` |
| `skills/wiki-writer/SKILL.md` | llm-wiki `skills/wiki-writer/SKILL.md` |
| `skills/wiki-research/SKILL.md` | llm-wiki `skills/wiki-research/SKILL.md` |
| `skills/wiki-inbox/SKILL.md` | llm-wiki `skills/wiki-inbox/SKILL.md` |
| `skills/wiki-inbox/references/naming-convention.md` | llm-wiki `skills/wiki-inbox/references/` |
| `skills/voice-dna-creator/SKILL.md` | copywriter `skills/voice-dna-creator/SKILL.md` |
| `skills/icp-creator/SKILL.md` | copywriter `skills/icp-creator/SKILL.md` |
| `skills/business-profile-creator/SKILL.md` | copywriter `skills/business-profile-creator/SKILL.md` |
| `skills/antislop-expert/SKILL.md` | copywriter `skills/antislop-expert/SKILL.md` |
| `skills/antislop-expert/references/*` (12 files) | copywriter `skills/antislop-expert/references/` |
| `skills/antislop-expert/scripts/*` (2 files) | copywriter `skills/antislop-expert/scripts/` |
| `skills/seo-blog-writer/SKILL.md` | copywriter |
| `skills/seo-blog-writer/templates/*` | copywriter |
| `skills/seo-blog-writer/checklists/*` | copywriter |
| `skills/linkedin-post/SKILL.md` | copywriter |
| `skills/linkedin-post/references/*` | copywriter |
| `skills/linkedin-post/examples/*` | copywriter |
| `skills/twitter-thread/SKILL.md` | copywriter |
| `skills/newsletter-writer/SKILL.md` | copywriter |
| `skills/newsletter-writer/references/*` | copywriter |
| `skills/sales-email-sequence/SKILL.md` | copywriter |
| `skills/sales-email-sequence/templates/*` | copywriter |
| `skills/video-script-generator/SKILL.md` | copywriter |
| `skills/video-script-generator/templates/*` | copywriter |
| `skills/landing-page-copy/SKILL.md` | copywriter |
| `skills/title-brain/SKILL.md` | copywriter |
| `skills/quote-extractor/SKILL.md` | copywriter |
| `skills/social-media-bio/SKILL.md` | copywriter `skills/social-media-bio-generator/` |
| `skills/wordpress-publisher/SKILL.md` | copywriter |
| `skills/content-calendar/SKILL.md` | copywriter `skills/content-calendar-planner/` |
| `skills/content-calendar/references/*` | copywriter |
| `agents/blog-agent.md` | copywriter |
| `agents/social-agent.md` | copywriter |
| `agents/newsletter-agent.md` | copywriter |
| `agents/script-agent.md` | copywriter |
| `agents/sales-copy-agent.md` | copywriter |
| `agents/research-agent.md` | copywriter |
| `agents/onboarding-agent.md` | copywriter |

### Files to copy then modify

| Destination | Source | Modification needed |
|-------------|--------|-------------------|
| `skills/wiki-core/references/compilation.md` | llm-wiki | Add `content_angles` to article frontmatter schema |
| `skills/wiki-core/references/thesis-mode.md` | llm-wiki | Add ICP-weighted evidence scoring |

---

## Task Sequence

Tasks are ordered by dependency: foundation first, then wiki layer, then copywriter layer, then fusion commands, then polish.

---

### Task 1: Plugin Foundation (manifest, hooks, data templates)

**Files:**
- Already exists: `.claude-plugin/plugin.json`
- Create: `.mcp.json`
- Create: `hooks/hooks.json`
- Create: `data/voice-dna.json`
- Create: `data/icp.json`
- Create: `data/business-profile.json`
- Create: `data/glossary.md`
- Create: `LICENSE`

- [ ] **Step 1: Verify plugin.json is correct**

Read `D:/telechargements/copywriter-wiki/.claude-plugin/plugin.json` and confirm `"name": "copywriter"`.

- [ ] **Step 2: Create .mcp.json**

```json
{
  "mcpServers": {
    "wordpress": {
      "command": "npx",
      "args": [
        "-y",
        "@wordpress/mcp-server",
        "--url", "${user_config.wp_site_url}",
        "--username", "${user_config.wp_username}",
        "--password", "${user_config.wp_app_password}"
      ],
      "_comment": "WordPress CMS for auto-publish. Optional — generates markdown if not configured."
    }
  }
}
```

Write to `D:/telechargements/copywriter-wiki/.mcp.json`.

- [ ] **Step 3: Create hooks/hooks.json**

```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [{
          "type": "prompt",
          "prompt": "Read ${CLAUDE_PLUGIN_ROOT}/data/voice-dna.json if it exists. Use language_preference to set output language. If language_preference is missing or file is empty, default to French and suggest /copywriter:start.",
          "timeout": 30
        }]
      }
    ]
  }
}
```

Write to `D:/telechargements/copywriter-wiki/hooks/hooks.json`.

- [ ] **Step 4: Copy identity data templates from copywriter**

Copy these files from `/tmp/copywriter/copywriter/data/2-Domaines/` to `D:/telechargements/copywriter-wiki/data/`:
- `voice-dna.json`
- `icp.json`
- `business-profile.json`
- `glossary.md`

Run:
```bash
cp /tmp/copywriter/copywriter/data/2-Domaines/voice-dna.json D:/telechargements/copywriter-wiki/data/
cp /tmp/copywriter/copywriter/data/2-Domaines/icp.json D:/telechargements/copywriter-wiki/data/
cp /tmp/copywriter/copywriter/data/2-Domaines/business-profile.json D:/telechargements/copywriter-wiki/data/
cp /tmp/copywriter/copywriter/data/2-Domaines/glossary.md D:/telechargements/copywriter-wiki/data/
```

- [ ] **Step 5: Create LICENSE (MIT)**

Write MIT license file to `D:/telechargements/copywriter-wiki/LICENSE` with author "NMarchitecte", year 2026.

- [ ] **Step 6: Verify structure**

Run:
```bash
find D:/telechargements/copywriter-wiki -type f | sort
```

Expected: plugin.json, .mcp.json, hooks.json, 4 data files, LICENSE, spec doc.

---

### Task 2: Wiki Skills Layer (port from llm-wiki)

**Files:**
- Create: `skills/wiki-core/SKILL.md`
- Copy: `skills/wiki-core/references/` (7 files from llm-wiki, 2 modified)
- Copy: `skills/wiki-reader/SKILL.md`
- Copy: `skills/wiki-writer/SKILL.md`
- Copy: `skills/wiki-research/SKILL.md`
- Copy: `skills/wiki-inbox/SKILL.md`
- Copy: `skills/wiki-inbox/references/naming-convention.md`

- [ ] **Step 1: Create wiki-core skill directory and copy references**

```bash
mkdir -p D:/telechargements/copywriter-wiki/skills/wiki-core/references
mkdir -p D:/telechargements/copywriter-wiki/skills/wiki-inbox/references

# Verbatim copies (5 files)
cp D:/telechargements/llm-wiki/skills/wiki-manager/references/hub-resolution.md D:/telechargements/copywriter-wiki/skills/wiki-core/references/
cp D:/telechargements/llm-wiki/skills/wiki-manager/references/wiki-structure.md D:/telechargements/copywriter-wiki/skills/wiki-core/references/
cp D:/telechargements/llm-wiki/skills/wiki-manager/references/ingestion.md D:/telechargements/copywriter-wiki/skills/wiki-core/references/
cp D:/telechargements/llm-wiki/skills/wiki-manager/references/indexing.md D:/telechargements/copywriter-wiki/skills/wiki-core/references/
cp D:/telechargements/llm-wiki/skills/wiki-manager/references/linting.md D:/telechargements/copywriter-wiki/skills/wiki-core/references/

# To-be-modified copies (2 files)
cp D:/telechargements/llm-wiki/skills/wiki-manager/references/compilation.md D:/telechargements/copywriter-wiki/skills/wiki-core/references/
cp D:/telechargements/llm-wiki/skills/wiki-manager/references/thesis-mode.md D:/telechargements/copywriter-wiki/skills/wiki-core/references/

# Inbox reference
cp D:/telechargements/llm-wiki/skills/wiki-inbox/references/naming-convention.md D:/telechargements/copywriter-wiki/skills/wiki-inbox/references/
```

- [ ] **Step 2: Create wiki-core/SKILL.md**

Copy `D:/telechargements/llm-wiki/skills/wiki-manager/SKILL.md` to `D:/telechargements/copywriter-wiki/skills/wiki-core/SKILL.md`. Then edit the frontmatter: change `name: wiki-manager` to `name: wiki-core`. Update the description to mention "copywriter" instead of generic wiki. Update all `references/` paths from `skills/wiki-manager/references/` to `skills/wiki-core/references/` since the skill name changed.

- [ ] **Step 3: Copy wiki-reader, wiki-writer, wiki-research, wiki-inbox skills**

```bash
mkdir -p D:/telechargements/copywriter-wiki/skills/wiki-reader
mkdir -p D:/telechargements/copywriter-wiki/skills/wiki-writer
mkdir -p D:/telechargements/copywriter-wiki/skills/wiki-research

cp D:/telechargements/llm-wiki/skills/wiki-reader/SKILL.md D:/telechargements/copywriter-wiki/skills/wiki-reader/
cp D:/telechargements/llm-wiki/skills/wiki-writer/SKILL.md D:/telechargements/copywriter-wiki/skills/wiki-writer/
cp D:/telechargements/llm-wiki/skills/wiki-research/SKILL.md D:/telechargements/copywriter-wiki/skills/wiki-research/
cp D:/telechargements/llm-wiki/skills/wiki-inbox/SKILL.md D:/telechargements/copywriter-wiki/skills/wiki-inbox/
```

- [ ] **Step 4: Modify compilation.md — add content_angles frontmatter**

Read `D:/telechargements/copywriter-wiki/skills/wiki-core/references/compilation.md`. Find the article frontmatter schema section and add `content_angles` field:

```yaml
content_angles: ["suggested hook 1", "suggested hook 2"]
```

Add a paragraph after the frontmatter schema explaining: "During compilation, generate 2-4 content angles for each article — these are suggested hooks a copywriter could use to turn this research into content. Format as short phrases: 'Why X matters for Y', 'The hidden cost of Z', 'N things about X that will surprise you'."

- [ ] **Step 5: Modify thesis-mode.md — add ICP-weighted evidence**

Read `D:/telechargements/copywriter-wiki/skills/wiki-core/references/thesis-mode.md`. In the "Phase 2 Modification: Thesis-Directed Agents" section, add a note: "When ICP data is available (passed by the orchestrating command), weight evidence relevance by ICP pain points. A source that directly addresses `icp.pain_points` scores +1 relevance. This keeps thesis research focused on what matters to the user's audience, not just academic interest."

- [ ] **Step 6: Update ${CLAUDE_PLUGIN_ROOT} references in all wiki skills**

In the copied wiki-reader, wiki-writer, wiki-research SKILL.md files, search for any `${CLAUDE_PLUGIN_ROOT}/skills/wiki-manager/references/` paths and replace with `${CLAUDE_PLUGIN_ROOT}/skills/wiki-core/references/`. This ensures the skills point to the correct location in the new plugin structure.

- [ ] **Step 7: Verify wiki skills structure**

```bash
find D:/telechargements/copywriter-wiki/skills/wiki-* -type f | sort
```

Expected: 5 SKILL.md files + 8 reference files + 1 naming-convention.md = 14 files total.

---

### Task 3: Identity Skills Layer (port from copywriter)

**Files:**
- Copy: `skills/voice-dna-creator/SKILL.md`
- Copy: `skills/icp-creator/SKILL.md`
- Copy: `skills/business-profile-creator/SKILL.md`

- [ ] **Step 1: Copy identity skills from copywriter**

```bash
mkdir -p D:/telechargements/copywriter-wiki/skills/voice-dna-creator
mkdir -p D:/telechargements/copywriter-wiki/skills/icp-creator
mkdir -p D:/telechargements/copywriter-wiki/skills/business-profile-creator

cp /tmp/copywriter/copywriter/skills/voice-dna-creator/SKILL.md D:/telechargements/copywriter-wiki/skills/voice-dna-creator/
cp /tmp/copywriter/copywriter/skills/icp-creator/SKILL.md D:/telechargements/copywriter-wiki/skills/icp-creator/
cp /tmp/copywriter/copywriter/skills/business-profile-creator/SKILL.md D:/telechargements/copywriter-wiki/skills/business-profile-creator/
```

- [ ] **Step 2: Update data paths in identity skills**

In each of the 3 copied SKILL.md files, search for `data/2-Domaines/` and replace with `data/`. The copywriter plugin used `data/2-Domaines/` (PARA structure); our plugin uses flat `data/`.

Also search for `data/2-Areas/` and replace with `data/`.

Run for each file:
```bash
grep -r "2-Domaines\|2-Areas" D:/telechargements/copywriter-wiki/skills/voice-dna-creator/ D:/telechargements/copywriter-wiki/skills/icp-creator/ D:/telechargements/copywriter-wiki/skills/business-profile-creator/
```

Fix any remaining path references.

- [ ] **Step 3: Verify identity skills**

```bash
find D:/telechargements/copywriter-wiki/skills/*-creator -type f | sort
```

Expected: 3 SKILL.md files.

---

### Task 4: Anti-Slop Expert (port from copywriter)

**Files:**
- Copy: `skills/antislop-expert/SKILL.md`
- Copy: `skills/antislop-expert/references/` (12 files)
- Copy: `skills/antislop-expert/scripts/` (2 files)

- [ ] **Step 1: Copy antislop skill with all references and scripts**

```bash
mkdir -p D:/telechargements/copywriter-wiki/skills/antislop-expert/references
mkdir -p D:/telechargements/copywriter-wiki/skills/antislop-expert/scripts

cp /tmp/copywriter/copywriter/skills/antislop-expert/SKILL.md D:/telechargements/copywriter-wiki/skills/antislop-expert/
cp /tmp/copywriter/copywriter/skills/antislop-expert/references/*.md D:/telechargements/copywriter-wiki/skills/antislop-expert/references/
cp /tmp/copywriter/copywriter/skills/antislop-expert/scripts/*.py D:/telechargements/copywriter-wiki/skills/antislop-expert/scripts/
```

- [ ] **Step 2: Update data paths**

In `antislop-expert/SKILL.md`, replace `data/2-Domaines/` with `data/`.

- [ ] **Step 3: Add source credibility check to antislop SKILL.md**

Read the SKILL.md. At the end of the audit instructions, add a new section:

```markdown
## Source Credibility Check (Wiki Integration)

When the audited content cites wiki sources (references like `[source](wiki/...)` or claims marked with confidence levels):

1. **Check confidence levels**: For each cited wiki article, read its frontmatter `confidence` field.
   - `high` -> OK
   - `medium` -> Flag: "Source a confiance moyenne -- verifier avant publication."
   - `low` -> Flag: "Source a faible confiance -- rechercher des sources supplementaires."
   - Missing/no wiki -> Flag: "Affirmation sans source wiki. Ajouter via /copywriter:apprendre."

2. **Check staleness**: Read the `updated` field in cited article frontmatter. If older than 90 days, flag: "Source datee de plus de 90 jours. Re-rechercher avec /copywriter:recherche."

3. **Report**: Add a "Credibilite des sources" section to the audit report with per-source scores.
```

- [ ] **Step 4: Verify antislop structure**

```bash
find D:/telechargements/copywriter-wiki/skills/antislop-expert -type f | wc -l
```

Expected: 15 files (1 SKILL.md + 12 references + 2 scripts).

---

### Task 5: Content Writing Skills (port from copywriter)

**Files:**
- Copy: 10 content skill directories with all sub-files
- Create: `skills/content-writer/SKILL.md` (new orchestrator)

- [ ] **Step 1: Copy all content skills from copywriter**

```bash
# Skills with subdirectories
for skill in seo-blog-writer linkedin-post twitter-thread newsletter-writer sales-email-sequence video-script-generator landing-page-copy title-brain quote-extractor; do
  mkdir -p "D:/telechargements/copywriter-wiki/skills/$skill"
  cp -r "/tmp/copywriter/copywriter/skills/$skill/"* "D:/telechargements/copywriter-wiki/skills/$skill/"
done

# Social media bio (name change: social-media-bio-generator -> social-media-bio)
mkdir -p D:/telechargements/copywriter-wiki/skills/social-media-bio
cp /tmp/copywriter/copywriter/skills/social-media-bio-generator/SKILL.md D:/telechargements/copywriter-wiki/skills/social-media-bio/

# WordPress publisher
mkdir -p D:/telechargements/copywriter-wiki/skills/wordpress-publisher
cp /tmp/copywriter/copywriter/skills/wordpress-publisher/SKILL.md D:/telechargements/copywriter-wiki/skills/wordpress-publisher/

# Content calendar (name change: content-calendar-planner -> content-calendar)
mkdir -p D:/telechargements/copywriter-wiki/skills/content-calendar/references
cp /tmp/copywriter/copywriter/skills/content-calendar-planner/SKILL.md D:/telechargements/copywriter-wiki/skills/content-calendar/
cp /tmp/copywriter/copywriter/skills/content-calendar-planner/references/*.md D:/telechargements/copywriter-wiki/skills/content-calendar/references/
```

- [ ] **Step 2: Update data paths in all copied skills**

Run a bulk search-and-replace across all copied skill files:

```bash
grep -rl "data/2-Domaines\|data/2-Areas\|data/3-Ressources\|data/3-Resources\|data/1-Projets\|data/4-Archives\|data/0-Inbox" D:/telechargements/copywriter-wiki/skills/
```

For each match:
- `data/2-Domaines/` -> `data/`
- `data/2-Areas/` -> `data/`
- `data/3-Ressources/` or `data/3-Resources/` -> remove or replace with wiki `raw/` path
- `data/1-Projets/` -> remove (projects live in wiki `output/projects/`)
- `data/4-Archives/` -> remove (archives live in wiki `output/`)
- `data/0-Inbox/` -> remove (inbox is `~/wiki-inbox/` or wiki `inbox/`)

Also search for Solo ecosystem references and remove them:
```bash
grep -rl "solo\|SOLO_ROOT\|solo_installed" D:/telechargements/copywriter-wiki/skills/
```

Remove any Solo-specific code blocks and path conditionals.

- [ ] **Step 3: Create content-writer/SKILL.md (orchestrator)**

Write to `D:/telechargements/copywriter-wiki/skills/content-writer/SKILL.md`:

```markdown
---
name: content-writer
description: >
  Content generation orchestrator for the copywriter plugin. Activates when user
  wants to write content and needs context assembly from identity files and wiki
  sources. Assembles content briefs by reading voice-dna, ICP, business profile,
  and relevant wiki articles, then dispatches to format-specific agents.
tools:
  - Read
  - Glob
  - Grep
  - Agent
---

# Content Writer (Orchestrator)

You assemble context from identity files and wiki knowledge, then dispatch to specialized agents for content generation.

## Context Assembly Protocol

For every content generation request:

1. **Read identity files**:
   - `${CLAUDE_PLUGIN_ROOT}/data/voice-dna.json` (always)
   - `${CLAUDE_PLUGIN_ROOT}/data/icp.json` (always for blog/newsletter/sales, optional for social/script)
   - `${CLAUDE_PLUGIN_ROOT}/data/business-profile.json` (for blog/newsletter/sales/calendar)

2. **Query wiki for relevant articles** (skip if no wiki exists):
   - Resolve HUB: try `$HOME/wiki/_index.md`, else `~/.config/llm-wiki/config.json`
   - Grep `wiki/` for topic terms
   - Read top 3-5 matching articles by summary/tag relevance
   - Extract: title, confidence level, key findings, content_angles

3. **Assemble content brief**:
   ```
   CONTENT BRIEF:
   - Voice DNA: {tone, sentence length, rhetorical mechanisms, forbidden words}
   - ICP: {pain points, vocabulary, reading level}
   - Business: {offer, CTA, positioning}
   - Wiki sources: {title, confidence, key findings per article}
   - Content angles: {suggested hooks from wiki articles}
   - Topic: {user's requested topic}
   - Format: {blog/social/newsletter/script/sales}
   ```

4. **Dispatch to agent** via Agent tool with the brief as prompt.

5. **Post-generation**: Run antislop check inline. If `userConfig.wp_site_url` is set and format is blog, offer WordPress publish.

## Citation Injection

| Format | Citation style |
|--------|---------------|
| Blog | Full source section at bottom, inline "[according to research]" |
| Newsletter | Light -- "I've been studying X, here's what I found" |
| LinkedIn/Twitter/Script/Sales | None visible -- wiki informs angle only |

## No Wiki Fallback

If no wiki exists or no relevant articles found, proceed with identity-only content. Surface: "Tes articles seraient plus solides avec une base de connaissances. Lance /copywriter:recherche pour commencer."
```

- [ ] **Step 4: Verify content skills structure**

```bash
find D:/telechargements/copywriter-wiki/skills -maxdepth 1 -type d | sort | wc -l
```

Expected: 23 directories (22 skills + the `skills/` root).

---

### Task 6: Agents (port from copywriter)

**Files:**
- Copy: 7 agent files from copywriter

- [ ] **Step 1: Copy all agents**

```bash
mkdir -p D:/telechargements/copywriter-wiki/agents
cp /tmp/copywriter/copywriter/agents/*.md D:/telechargements/copywriter-wiki/agents/
```

- [ ] **Step 2: Update agent frontmatter and data paths**

For each of the 7 agent files, update:
- Replace `data/2-Domaines/` with `data/` in all file path references
- Replace `data/2-Areas/` with `data/`
- Remove any Solo ecosystem conditionals
- Ensure `model: sonnet` is in frontmatter
- Add `disallowedTools: Edit` if not present (agents produce output, orchestrator writes)

- [ ] **Step 3: Verify agents**

```bash
ls D:/telechargements/copywriter-wiki/agents/
```

Expected: 7 .md files.

---

### Task 7: Commands — Wiki Operations (adapted from llm-wiki)

**Files:**
- Create: `commands/apprendre.md` (from llm-wiki `ingest.md`)
- Create: `commands/question.md` (from llm-wiki `query.md`)
- Create: `commands/bilan.md` (new)

- [ ] **Step 1: Create apprendre.md**

Copy `D:/telechargements/llm-wiki/commands/ingest.md` to `D:/telechargements/copywriter-wiki/commands/apprendre.md`.

Then edit:
- Change frontmatter `description` to: `"Apprendre: ingerer une source dans ta base de connaissances wiki. URLs, fichiers, texte."`
- Update `argument-hint` to use French hints
- Update all `${CLAUDE_PLUGIN_ROOT}/skills/wiki-manager/references/` to `${CLAUDE_PLUGIN_ROOT}/skills/wiki-core/references/`
- The inline prelude is already present (from our P2 optimization)
- Add at the end of the ingestion flow: compile suggestion in French: "Tu as N sources non compilees. Les compiler en articles ? (o/n)"
- Add identity check at top: "If `${CLAUDE_PLUGIN_ROOT}/data/voice-dna.json` is empty, suggest /copywriter:start first."

- [ ] **Step 2: Create question.md**

Copy `D:/telechargements/llm-wiki/commands/query.md` to `D:/telechargements/copywriter-wiki/commands/question.md`.

Then edit:
- Change frontmatter `description` to: `"Poser une question a ta base de connaissances. Repond uniquement depuis le wiki, avec citations."`
- Update all `${CLAUDE_PLUGIN_ROOT}/skills/wiki-manager/references/` to `${CLAUDE_PLUGIN_ROOT}/skills/wiki-core/references/`
- French error messages: "Pas de wiki trouve" instead of "No wiki found"

- [ ] **Step 3: Create bilan.md**

Write to `D:/telechargements/copywriter-wiki/commands/bilan.md`:

```markdown
---
description: "Bilan: etat de ta base de connaissances et statistiques de contenu."
argument-hint: "[--detailed]"
allowed-tools: Read, Glob, Grep, Bash(ls:*), Bash(wc:*), Bash(date:*)
---

## Your task

### Prelude: Resolve Wiki

1. **HUB**: Try `$HOME/wiki/_index.md`. If exists -> HUB = `$HOME/wiki`. Else read `~/.config/llm-wiki/config.json` and use `resolved_path`. If no config -> HUB = `$HOME/wiki`.
2. **Wiki**: `--wiki <name>` -> lookup `HUB/wikis.json` | cwd has `.wiki/` -> use it | else -> HUB.
3. **Verify**: Read `<wiki-root>/_index.md`. If missing -> "Pas de wiki. Lance /copywriter:recherche ou /copywriter:apprendre pour commencer."

### Show Status

1. **Wiki stats**: Read master `_index.md`. Show: source count, article count, output count, last compiled, last lint date.

2. **Content stats**: Count files in `output/` by date prefix for current month. Report: pieces written this month, formats used.

3. **Recent activity**: Read `log.md`, show last 10 entries.

4. **Identity status**: Check if `${CLAUDE_PLUGIN_ROOT}/data/voice-dna.json` is populated.
   - If empty: "Profil non configure. Lance /copywriter:start."
   - If populated: Show voice DNA summary (primary_role, unique_angle).

5. **Suggestions**: Based on state:
   - If 5+ uncompiled sources: "Tu as N sources non compilees. /copywriter:apprendre les a ajoutees mais elles ne sont pas encore en articles."
   - If no recent research (>30 days): "Pas de recherche recente. /copywriter:recherche pour rafraichir ta base."
   - If content calendar missing or expired: "/copywriter:calendrier pour planifier le mois."
```

- [ ] **Step 4: Verify wiki commands**

```bash
ls D:/telechargements/copywriter-wiki/commands/
```

Expected: apprendre.md, bilan.md, question.md (3 files so far).

---

### Task 8: Commands — Content Operations (new + adapted)

**Files:**
- Create: `commands/copywriter.md` (natural language router)
- Create: `commands/start.md` (adapted from copywriter)
- Create: `commands/ecrire.md` (new)
- Create: `commands/recherche.md` (adapted from llm-wiki research.md)
- Create: `commands/calendrier.md` (adapted from copywriter plan.md)
- Create: `commands/verifier.md` (adapted from copywriter audit.md)

- [ ] **Step 1: Create copywriter.md (natural language router)**

Write to `D:/telechargements/copywriter-wiki/commands/copywriter.md`. This is the main router command, modeled on llm-wiki's `wiki.md` but with French pattern matching. Include:
- Frontmatter with `description: "Copywriter studio — comprend le langage naturel. Dis ce que tu veux et il route vers la bonne commande."` and `argument-hint: "[<texte libre>] [init] [status]"`
- `allowed-tools: Read, Write, Edit, Glob, Bash(ls:*), Bash(wc:*), Bash(mkdir:*), Bash(date:*), Bash(mv:*)`
- The full pattern-matching table from spec Section 5 (Natural Language Router)
- Confidence routing: high confidence routes directly, low confidence shows menu
- If no arguments: show bilan (status)
- Include the inline wiki prelude (wiki-neutral variant)

- [ ] **Step 2: Create start.md**

Copy `/tmp/copywriter/copywriter/commands/start.md` to `D:/telechargements/copywriter-wiki/commands/start.md`.

Then edit:
- Add `--update voice|icp|business` flag support to argument-hint
- Add Phase 2 (Wiki Init): after identity is created, derive wiki topic name from `business-profile.json > niche_focus` or ask user, then create `~/wiki/topics/<slug>/` following the wiki init protocol from `${CLAUDE_PLUGIN_ROOT}/skills/wiki-core/references/wiki-structure.md`
- Add Phase 3 (Bootstrap Research): "Veux-tu que je recherche ton secteur pour alimenter ta base ? (5 min)"
- Add voice DNA backup logic: "Before overwriting voice-dna.json, copy to data/voice-dna.previous.json"
- Update data paths from `data/2-Domaines/` to `data/`

- [ ] **Step 3: Create ecrire.md**

Write to `D:/telechargements/copywriter-wiki/commands/ecrire.md`. This is the unified content writer command. Include:
- Frontmatter: `description: "Ecrire du contenu: blog, social, newsletter, script, sales. Fonde sur ta voix et tes recherches wiki."`, `argument-hint: "[blog|social|newsletter|script|sales] \"topic\""`, `allowed-tools: Read, Write, Glob, Grep, Agent, WebSearch, WebFetch`
- Identity check: if voice-dna.json empty, redirect to /copywriter:start
- The full orchestrator-injects pattern from spec Section 5 (7 steps)
- Agent dispatch table (blog -> blog-agent, social -> social-agent, etc.)
- Content brief assembly (read identity, query wiki, pass to agent)
- Inline antislop check after agent returns
- WordPress publish offer gated on `userConfig.wp_site_url`
- No-wiki fallback: proceed with identity only, suggest /copywriter:recherche

- [ ] **Step 4: Create recherche.md**

Copy `D:/telechargements/llm-wiki/commands/research.md` to `D:/telechargements/copywriter-wiki/commands/recherche.md`.

Then edit:
- Update frontmatter description to French
- Update all `${CLAUDE_PLUGIN_ROOT}/skills/wiki-manager/references/` to `${CLAUDE_PLUGIN_ROOT}/skills/wiki-core/references/`
- Add ICP injection: before Phase 2 (agent dispatch), read `${CLAUDE_PLUGIN_ROOT}/data/icp.json` and include `icp.pain_points` and `icp.vocabulary` in each agent's prompt template
- Add to agent prompt template: "Search for content relevant to this audience: {icp.pain_points}. Prioritize practitioner sources over academic."
- In Phase 4 (Compile), add `content_angles` generation per compiled article
- In Phase 5 (Report), add French suggestions: "Prochaine etape: /copywriter:ecrire blog ou /copywriter:calendrier"
- French error messages throughout

- [ ] **Step 5: Create calendrier.md**

Copy `/tmp/copywriter/copywriter/commands/plan.md` to `D:/telechargements/copywriter-wiki/commands/calendrier.md`.

Then edit:
- Update frontmatter description to French: `"Calendrier de contenu strategique fonde sur ta base wiki."`
- Add inline wiki prelude (wiki-neutral: works without wiki but warns)
- Add wiki confidence grounding: before generating calendar, read wiki `_index.md` and article confidence levels. High-confidence topics get Hero slots. Low-confidence topics get a warning.
- Add gap detection: compare planned topics against wiki articles. If a planned topic has no wiki coverage, suggest: "Pas assez de sources sur X. /copywriter:recherche d'abord ?"
- Save output to `~/wiki/topics/<niche>/output/calendar-YYYY-MM.md`
- Update data paths from `data/2-Domaines/` to `data/`
- Remove Solo integration code

- [ ] **Step 6: Create verifier.md**

Copy `/tmp/copywriter/copywriter/commands/audit.md` to `D:/telechargements/copywriter-wiki/commands/verifier.md`.

Then edit:
- Update frontmatter description: `"Triple audit: slop + credibilite des sources + fraicheur."`
- Add wiki prelude (wiki-neutral: works without wiki but skips source checks)
- Add source credibility section (from antislop SKILL.md enhancement in Task 4 Step 3)
- Add staleness check: read frontmatter `updated` field of cited wiki articles, flag if >90 days
- French output throughout
- Update data paths

- [ ] **Step 7: Verify all commands**

```bash
ls D:/telechargements/copywriter-wiki/commands/
```

Expected: 9 .md files (copywriter, start, ecrire, recherche, calendrier, verifier, apprendre, question, bilan).

---

### Task 9: CONNECTORS.md and README.md

**Files:**
- Create: `CONNECTORS.md`
- Create: `README.md`

- [ ] **Step 1: Create CONNECTORS.md**

Write to `D:/telechargements/copywriter-wiki/CONNECTORS.md`. Follow the same pattern as llm-wiki's CONNECTORS.md but with copywriter-specific connectors:

- WordPress (~~CMS) — auto-publish via MCP, configured via userConfig
- Exa Search (~~search) — neural search via userConfig.exa_api_key, falls back to WebSearch
- Social (~~social) — clipboard paste by default, LinkedIn MCP via Zapier optional
- Graceful degradation section: no connector = markdown output

- [ ] **Step 2: Create README.md**

Write to `D:/telechargements/copywriter-wiki/README.md`. Include:

- Plugin name and one-line description
- Setup instructions (install in Cowork, run /copywriter:start)
- Command table with French descriptions
- Quick examples showing the main workflow
- Connector setup (optional)
- Credits: llm-wiki by nvk, copywriter by Antigravity Factory

- [ ] **Step 3: Verify final file count**

```bash
find D:/telechargements/copywriter-wiki -type f | wc -l
```

Expected: approximately 75-80 files total (1 plugin.json + 1 .mcp.json + 1 hooks.json + 4 data files + 9 commands + 7 agents + ~50 skill files + 3 top-level docs + 1 spec).

---

### Task 10: Validation

- [ ] **Step 1: Verify plugin structure matches spec Section 3**

```bash
find D:/telechargements/copywriter-wiki -type f | sort
```

Compare output against the spec's directory tree. Flag any missing or extra files.

- [ ] **Step 2: Verify no stale path references**

```bash
grep -r "2-Domaines\|2-Areas\|wiki-manager\|solo\|SOLO_ROOT\|sentinel\|SENTINEL" D:/telechargements/copywriter-wiki/skills/ D:/telechargements/copywriter-wiki/commands/ D:/telechargements/copywriter-wiki/agents/ 2>/dev/null
```

Expected: no matches. Any matches are stale references that need updating.

- [ ] **Step 3: Verify all ${CLAUDE_PLUGIN_ROOT} references point to valid paths**

```bash
grep -roh '\${CLAUDE_PLUGIN_ROOT}/[^"]*' D:/telechargements/copywriter-wiki/ | sort -u
```

Each path should correspond to an actual file in the plugin. Cross-check against the file list.

- [ ] **Step 4: Verify plugin.json name is "copywriter"**

```bash
cat D:/telechargements/copywriter-wiki/.claude-plugin/plugin.json | grep '"name"'
```

Expected: `"name": "copywriter"`

- [ ] **Step 5: Count skills and verify against spec**

```bash
find D:/telechargements/copywriter-wiki/skills -maxdepth 1 -type d | grep -v "^D:/telechargements/copywriter-wiki/skills$" | wc -l
```

Expected: 22 skill directories.

- [ ] **Step 6: Test load with Cowork (manual)**

```bash
claude --plugin-dir D:/telechargements/copywriter-wiki
```

Run `/copywriter` — should show status/bilan. Run `/help` — should list all `/copywriter:*` commands.

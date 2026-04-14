---
description: "Ecrire du contenu: blog, social, newsletter, script, sales. Fonde sur ta voix et tes recherches wiki."
argument-hint: "[blog|social|newsletter|script|sales] \"sujet\""
allowed-tools: Read, Write, Glob, Grep, Agent, WebSearch, WebFetch
---

## Your task

### Identity Check

Read `${CLAUDE_PLUGIN_ROOT}/data/voice-dna.json`. If empty or missing, stop: "Profil non configure. Lance /copywriter:start d'abord."

### Parse $ARGUMENTS

- **format**: First word -- one of: blog, social, newsletter, script, sales
- **topic**: Everything after the format word
- If no format specified, ask: "Quel format ? (blog/social/newsletter/script/sales)"

### Step 1: Load Identity

Read these files from `${CLAUDE_PLUGIN_ROOT}/data/`:
- `voice-dna.json` (always)
- `icp.json` (for blog/newsletter/sales; optional for social/script)
- `business-profile.json` (for blog/newsletter/sales)

### Step 2: Query Wiki (skip if no wiki exists)

1. Resolve HUB: try `$HOME/wiki/_index.md`, else `~/.config/llm-wiki/config.json`
2. If wiki exists, Grep `wiki/` for topic terms
3. Read top 3-5 matching articles by summary/tag relevance
4. Extract: title, confidence level, key findings, content_angles from frontmatter
5. If no wiki exists: note it, proceed without wiki context

### Step 3: Assemble Content Brief

Build this brief from loaded data:

```
CONTENT BRIEF:
- Voice DNA: {tone, sentence_length, rhetorical_mechanisms, forbidden_words from voice-dna.json}
- ICP: {pain_points, vocabulary, reading_level from icp.json}
- Business: {offer, primary_cta, positioning from business-profile.json}
- Wiki sources: {title, confidence, key findings per article -- or "No wiki sources available"}
- Content angles: {content_angles from wiki articles -- or "Generate your own angles"}
- Topic: {user's topic}
- Format: {blog|social|newsletter|script|sales}
```

### Step 4: Dispatch to Agent

| Format | Agent | Additional instructions |
|--------|-------|----------------------|
| blog | blog-agent | Include wiki citations at bottom. Target 1500-3000 words. E-E-A-T structure. |
| social | social-agent | LinkedIn post + Twitter thread. Hook -> Conflict -> Lesson. No citations visible. |
| newsletter | newsletter-agent | Email structure. Light sourcing: "I've been studying X..." |
| script | script-agent | Ask: YouTube or TikTok? Include [Visual Cues] and timecodes. |
| sales | sales-copy-agent | 5-email sequence. Conversion psychology. No citations visible. |

Pass the content brief as the Agent tool prompt. The agent produces the content and returns it.

### Step 5: Anti-Slop Check (inline)

After the agent returns content, run the antislop check:
1. Read `${CLAUDE_PLUGIN_ROOT}/data/voice-dna.json` for `forbidden_words` and `tone`
2. Check for banned slop words: "delve", "tapestry", "landscape", "game-changer", "unleash", "elevate", "demystify", "revolutionize", "synergy", "leverage"
3. Check voice DNA match: sentence length, formality, rhetorical mechanisms
4. If wiki sources were cited, check their confidence levels
5. Rewrite any slop found. Report changes made.

### Step 6: WordPress Publish Offer

If `userConfig.wp_site_url` is configured (non-empty) AND format is `blog`:
- Ask: "Publier sur WordPress ? (o/n)"
- If yes: use the wordpress-publisher skill
- If no: output the final markdown

### Step 7: Save to Wiki Output

If wiki exists, save the generated content to `<wiki-root>/output/{format}-{topic-slug}-{YYYY-MM-DD}.md` with frontmatter:
```yaml
---
title: "{topic}"
type: {format}
sources: [wiki articles used]
generated: YYYY-MM-DD
voice_dna_version: "{voice_dna.version}"
---
```

Update `output/_index.md` and master `_index.md`.

### No Wiki Suggestion

If no wiki existed during Step 2, append after the output:
> Tes articles seraient plus solides avec une base de connaissances. Lance `/copywriter:recherche` pour commencer.

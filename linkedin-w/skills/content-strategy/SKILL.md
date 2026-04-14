---
name: content-strategy
description: "This skill should be used when deciding WHAT to post: picks topic, template, tone, angle, and CTA type based on strategy rules and learning data."
---

# Content Strategy — What To Post and How

## Mandatory Context Load

1. Read `${CLAUDE_PLUGIN_ROOT}/data/linkedin-profile.json` → content_pillars, posting_config
2. Read `${CLAUDE_PLUGIN_ROOT}/data/learnings.json` → patterns (top_performing, underperforming)
3. Read `${CLAUDE_PLUGIN_ROOT}/data/analytics.json` → summary (best_day, best_time, best_hook_type)
4. Read `${CLAUDE_PLUGIN_ROOT}/data/queue.json` → recent posts (to avoid duplicates)
5. Read `${CLAUDE_PLUGIN_ROOT}/data/research.json` → trending topics (if available)
6. Read `references/strategy-rules.md`

## Decision Process

### Step 1: Topic Selection

If user provided a topic → use it, map to closest content pillar.

If no topic:
1. Check research.json for fresh trending topics (< 48h old)
2. Cross-reference with content_pillars from linkedin-profile.json
3. Check queue.json for recently used topics → avoid repeats
4. Pick the pillar least published recently (rotation)
5. Present 3 topic suggestions ranked by relevance

### Step 2: Template Selection

1. Check learnings.json patterns.top_performing.templates → prefer these
2. Check queue.json last 5 posts → avoid same template
3. Match template to tone (see strategy-rules.md associations)
4. If user specified a format preference → override

### Step 3: Tone Selection

1. Check learnings.json patterns.top_performing.tones → prefer these
2. Rotate: check queue.json last 3 posts → use a different tone
3. Default rotation order: authoritative → conversational → provocative → vulnerable → data-driven

### Step 4: Angle Selection

Match angle to topic and template:
- Personal topic → personal_story
- Data/research topic → data_insight or case_study
- Industry trend → newsjack or contrarian_take
- Process/method → how_to
- Common belief → myth_buster

### Step 5: CTA Type Selection

1. Check learnings.json patterns.top_performing.cta_types → prefer these
2. Default: use template → CTA association from cta-library.md

## Output

Return to content-agent:
```json
{
  "topic": "refined topic",
  "pillar": "content pillar",
  "template": "template_name",
  "tone": "tone_name",
  "angle": "angle_name",
  "cta_type": "cta_type_name",
  "rationale": "1-sentence explanation of choices"
}
```

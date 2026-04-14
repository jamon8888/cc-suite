# LinkedIn Plugin — Design Spec

**Date**: 2026-04-14
**Status**: Draft
**Plugin name**: `linkedin`
**Architecture**: Chrome-Native Pipeline (Approach A)
**Language**: French-first, content adapts to voice DNA

---

## 1. Overview

A Claude Desktop Cowork plugin that replicates the full LinkedIn Content Engine (LinkedIn-main) as a zero-dependency plugin. All LinkedIn interactions go through Claude in Chrome — no API keys, no server, no database, no Python scripts.

The plugin handles the complete LinkedIn growth pipeline: content generation, post queue management, scheduled posting, research, competitor monitoring, strategic commenting, A/B experimentation, and a self-improving learning loop.

### Relationship with Copywriter Plugin

The copywriter plugin generates drafts. The linkedin plugin handles the full posting pipeline. They share identity data:

- `voice-dna.json`, `icp.json`, `business-profile.json` are read from the copywriter plugin's `data/` if it's installed
- If copywriter is not installed, the linkedin plugin creates its own copies via the onboarding agent
- Drafts from `/copywriter:ecrire social` are written to `linkedin/data/queue.json` with `source: "copywriter"`. The copywriter's `social-agent` must be updated to detect the linkedin plugin and write directly to its `queue.json` instead of outputting text for copy-paste. The linkedin plugin provides a `data/queue.json` write contract: any tool can append a post object with `status: "draft"` and `source: "<plugin-name>"`.

---

## 2. Plugin Structure

```
linkedin/
├── .claude-plugin/
│   └── plugin.json
├── .mcp.json
├── hooks/
│   └── hooks.json
├── CONNECTORS.md
│
├── commands/
│   ├── linkedin.md          # Smart router — NL intent detection
│   ├── start.md             # Onboarding wizard
│   ├── publier.md           # Write/queue/post content
│   ├── recherche.md         # Research trending topics
│   ├── commenter.md         # Strategic commenting engine
│   ├── analyser.md          # Analytics & learning insights
│   ├── concurrents.md       # Competitor monitoring
│   ├── file.md              # Queue management (approve/reject/edit/schedule)
│   └── bilan.md             # Status dashboard
│
├── skills/
│   ├── post-generator/
│   │   ├── SKILL.md
│   │   ├── references/
│   │   │   ├── hook-formulas.md
│   │   │   ├── templates.md
│   │   │   ├── formatting-guide.md
│   │   │   └── cta-library.md
│   │   └── examples/
│   │       └── viral-posts.md
│   │
│   ├── virality-scorer/
│   │   └── SKILL.md
│   │
│   ├── content-strategy/
│   │   ├── SKILL.md
│   │   └── references/
│   │       └── strategy-rules.md
│   │
│   ├── comment-strategist/
│   │   └── SKILL.md
│   │
│   ├── autoresearch/
│   │   └── SKILL.md
│   │
│   ├── learning-engine/
│   │   └── SKILL.md
│   │
│   ├── chrome-linkedin/
│   │   └── SKILL.md
│   │
│   └── profile-setup/
│       └── SKILL.md
│
├── agents/
│   ├── onboarding-agent.md
│   ├── content-agent.md
│   ├── research-agent.md
│   ├── engagement-agent.md
│   ├── analytics-agent.md
│   └── competitor-agent.md
│
├── data/
│   ├── voice-dna.json
│   ├── icp.json
│   ├── business-profile.json
│   ├── linkedin-profile.json
│   ├── queue.json
│   ├── analytics.json
│   ├── competitors.json
│   ├── learnings.json
│   ├── experiments.json
│   ├── comment-targets.json
│   ├── research.json
│   └── schedule-config.json
│
└── docs/
    └── superpowers/
        └── specs/
```

---

## 3. Command Router

The `/linkedin` command detects intent from natural language and routes to the appropriate subcommand.

| Priority | Signal | Route |
|----------|--------|-------|
| 1 | URL detected | `/linkedin:recherche` with URL |
| 2 | FR: publie/poste/ecris/redige/draft | `/linkedin:publier` |
| 3 | FR: commente/engage/reagis | `/linkedin:commenter` |
| 4 | FR: recherche/trending/tendance/veille | `/linkedin:recherche` |
| 5 | FR: concurrent/competitor/surveille | `/linkedin:concurrents` |
| 6 | FR: file/queue/approuve/rejette/planifie | `/linkedin:file` |
| 7 | FR: stats/analytics/performance/apprends | `/linkedin:analyser` |
| 8 | Empty or "status/bilan" | `/linkedin:bilan` |
| 9 | Ambiguous | Show numbered menu |

**Confidence routing**: High confidence (single strong signal) routes directly with announcement. Low confidence presents a numbered menu.

When empty or "bilan", the router shows:

```
Commandes disponibles:
- /linkedin:publier [topic] — Generer et publier du contenu
- /linkedin:recherche [sujet|url] — Rechercher des tendances
- /linkedin:commenter — Commentaires strategiques
- /linkedin:concurrents — Surveillance concurrentielle
- /linkedin:file [approve|reject|edit|schedule] — Gerer la file d'attente
- /linkedin:analyser [experiment] — Analytics et apprentissage
- /linkedin:bilan — Tableau de bord
- /linkedin:start — Configuration initiale
```

---

## 4. Post Status Flow

```
DRAFT → QUEUED → APPROVED → SCHEDULED → POSTING → POSTED
                 ↘ REJECTED
                                         ↘ FAILED
```

- **DRAFT → QUEUED**: Content-agent generates and scores the post
- **QUEUED → APPROVED/REJECTED**: User reviews via `/linkedin:file`
- **APPROVED → SCHEDULED**: User sets a posting time or accepts suggestion
- **SCHEDULED → POSTING**: Scheduled task triggers at the configured slot
- **POSTING → POSTED/FAILED**: Chrome automation posts to LinkedIn, verifies publication
- Post URL and engagement metrics are stored after posting

---

## 5. Core Workflows

### 5.1 Content Pipeline (`/linkedin:publier`)

```
User: "/linkedin publie un post sur le cold outreach"
  ↓
1. content-agent loads: voice-dna + icp + business-profile + linkedin-profile + learnings
2. content-strategy skill picks: template + tone + angle + CTA type
3. post-generator skill writes: 3 hooks + full post + CTA
4. virality-scorer skill scores: 6 dimensions → total /100
5. If score < 60: auto-regenerate with scorer feedback (max 2 retries)
6. Output: formatted post + score breakdown + schedule suggestion
7. User approves → added to queue.json as QUEUED
```

### 5.2 Research Pipeline (`/linkedin:recherche`)

```
1. WebSearch for trending topics in user's niche (from content pillars)
2. Chrome navigates LinkedIn feed → extracts trending posts/hashtags
3. Chrome checks competitor recent posts (from competitors.json)
4. Aggregates into ranked topic list with suggested angles
5. Stores results in data/research.json
```

### 5.3 Engagement Pipeline (`/linkedin:commenter`)

```
1. Chrome opens LinkedIn feed
2. Surfaces high-value posts (followed accounts + competitors)
3. comment-strategist skill drafts 2 comment options per post (value-add + question)
4. User picks or edits → Chrome posts the comment
5. Tracks in comment-targets.json (daily goal: 10-15 comments)
6. Shows progress: "[N]/15 commentaires — [remaining] restants"
```

### 5.4 Learning Loop (`/linkedin:analyser`)

```
1. Chrome scrapes engagement on recent posts (last 30 days)
2. Updates analytics.json with likes, comments, shares, impressions
3. learning-engine skill analyzes patterns:
   - Best hooks, tones, templates, posting times
   - What to avoid (low performers)
4. Generates prompt directives stored in learnings.json
5. Next content generation automatically reads learnings.json
```

### 5.5 Competitor Monitoring (`/linkedin:concurrents`)

```
1. Chrome navigates to each competitor profile in competitors.json
2. Extracts last 10 posts: text, engagement counts, date, hook style
3. Identifies top performers (high engagement relative to their average)
4. Updates competitors.json with analysis
5. Surfaces actionable insights: "Concurrent X a 3x son engagement moyen avec le hook 'specificity'"
```

### 5.6 Autoresearch (`/linkedin:analyser experiment`)

```
1. Pick a dimension to test (hook style, tone, word count, template)
2. Generate 3-5 variations of the same topic, varying only that dimension
3. Score each with virality-scorer skill
4. Log results in experiments.json with hypothesis + outcome
5. After 5+ experiments: extract winning patterns → merge into learnings.json
```

---

## 6. Chrome Interaction Patterns

The `chrome-linkedin` skill defines all browser interactions. Uses Claude in Chrome's semantic element finding (not hardcoded selectors).

### 6.1 Authentication Check

```
1. Navigate to linkedin.com/feed
2. If login page → ask user: "Connecte-toi a LinkedIn dans Chrome, puis dis 'ok'"
3. If feed loads → authenticated. Extract profile name + URL → linkedin-profile.json
```

No OAuth flow. The user's existing browser session is the auth.

### 6.2 Posting

```
1. Navigate to linkedin.com/feed
2. Find "Start a post" button → click
3. Wait for post composer modal
4. Type post content (formatted with newlines)
5. If image attached → upload via file input
6. MANDATORY: Show user final content, ask for explicit confirmation
7. Click "Post" button
8. Wait 3s → verify post appears in feed
9. Extract post URL → update queue.json
```

### 6.3 Scraping Engagement

```
1. Navigate to user's profile → Activity → Posts
2. For each recent post (last 30 days):
   - Extract: text preview, likes count, comments count, reposts count
3. Match to queue.json entries by text similarity
4. Update analytics.json with fresh numbers
```

### 6.4 Scraping Competitor Posts

```
1. For each competitor in competitors.json:
   - Navigate to their profile → Activity → Posts
   - Extract last 10 posts: text, engagement counts, date
2. Store in competitors.json under their profile
3. Identify top performers (high engagement relative to average)
```

### 6.5 Commenting

```
1. Navigate to target post URL (or find in feed)
2. Find comment input → click to focus
3. Type the approved comment
4. MANDATORY: User confirms in chat → click "Post" comment button
```

### 6.6 Feed Reading

```
1. Navigate to linkedin.com/feed
2. Scroll 3-5 times to load content
3. Extract visible posts: author, text preview, engagement counts, hashtags
4. Return structured data for research/engagement agents
```

**Safety rule**: Every action that publishes content (post or comment) requires explicit user approval in the chat. Read-only actions (scraping, feed reading) run autonomously.

---

## 7. Data Schemas

### 7.1 `linkedin-profile.json`

```json
{
  "profile_url": "https://linkedin.com/in/username",
  "display_name": "",
  "headline": "",
  "follower_count": 0,
  "content_pillars": [],
  "posting_config": {
    "timezone": "Europe/Paris",
    "active_days": [0, 1, 2, 3, 4],
    "posting_slots": ["08:30", "12:00", "18:00"],
    "posts_per_day": 1,
    "hashtag_count": 3,
    "emoji_policy": "minimal"
  },
  "commenting_config": {
    "daily_target": 15,
    "max_per_post": 1
  }
}
```

### 7.2 `queue.json`

```json
{
  "posts": [
    {
      "id": "post_20260414_001",
      "status": "queued",
      "content": "...",
      "hook_type": "contrarian",
      "template": "the_expensive_lesson",
      "tone": "vulnerable",
      "topic": "cold outreach",
      "pillar": "acquisition",
      "cta_type": "specific_question",
      "virality_score": 72,
      "score_breakdown": {
        "hook_power": 20,
        "structure": 16,
        "value_insight": 14,
        "engagement_trigger": 10,
        "authenticity": 7,
        "relevance": 5
      },
      "source": "copywriter",
      "created_at": "2026-04-14T09:00:00Z",
      "scheduled_for": null,
      "posted_at": null,
      "linkedin_url": null,
      "engagement": {
        "likes": 0,
        "comments": 0,
        "reposts": 0,
        "impressions": 0
      },
      "last_scraped": null
    }
  ]
}
```

### 7.3 `analytics.json`

```json
{
  "last_updated": "2026-04-14T10:00:00Z",
  "summary": {
    "total_posts": 0,
    "avg_likes": 0,
    "avg_comments": 0,
    "best_day": null,
    "best_time": null,
    "best_hook_type": null,
    "best_template": null,
    "best_tone": null
  },
  "posts": []
}
```

### 7.4 `learnings.json`

```json
{
  "last_analysis": null,
  "prompt_directives": [],
  "patterns": {
    "top_performing": {
      "hooks": [],
      "tones": [],
      "templates": [],
      "cta_types": [],
      "word_count_range": [150, 250]
    },
    "underperforming": {
      "hooks": [],
      "tones": [],
      "templates": [],
      "avoid_topics": []
    }
  }
}
```

### 7.5 `competitors.json`

```json
{
  "competitors": [
    {
      "name": "",
      "profile_url": "",
      "niche": "",
      "avg_engagement": 0,
      "last_scraped": null,
      "posts": []
    }
  ]
}
```

### 7.6 `experiments.json`

```json
{
  "experiments": [
    {
      "id": "exp_001",
      "dimension": "hook_style",
      "topic": "cold outreach",
      "hypothesis": "Specificity hooks outperform contrarian hooks for acquisition topics",
      "variations": [
        {
          "variant": "specificity",
          "content_preview": "...",
          "virality_score": 78
        },
        {
          "variant": "contrarian",
          "content_preview": "...",
          "virality_score": 65
        }
      ],
      "winner": "specificity",
      "delta": 13,
      "created_at": "2026-04-14T10:00:00Z"
    }
  ]
}
```

### 7.7 `comment-targets.json`

```json
{
  "today": "2026-04-14",
  "target": 15,
  "completed": 0,
  "comments": [
    {
      "post_url": "",
      "author": "",
      "comment_text": "",
      "commented_at": ""
    }
  ]
}
```

### 7.8 `schedule-config.json`

```json
{
  "auto_post_mode": "confirm",
  "notify_on_post": true,
  "scrape_interval_hours": 6,
  "research_interval_hours": 8,
  "competitor_scan_time": "20:00",
  "learning_cycle_time": "02:00"
}
```

---

## 8. Scheduled Tasks

| Task ID | Schedule | Description |
|---------|----------|-------------|
| `linkedin-scrape-engagement` | Every 6h | Chrome scrapes recent posts' engagement → updates `analytics.json` |
| `linkedin-learning-cycle` | Daily 02:00 | Runs learning-engine skill → updates `learnings.json` |
| `linkedin-research-cycle` | Every 8h | WebSearch + Chrome feed scan → updates `research.json` |
| `linkedin-competitor-scan` | Daily 20:00 | Chrome scrapes competitor profiles → updates `competitors.json` |
| `linkedin-auto-post` | At each posting slot | Posts SCHEDULED items via Chrome (respects `auto_post_mode`) |

### Auto-Post Safety

Two modes configured in `schedule-config.json`:

- **`confirm`** (default): Notifies user with preview, waits for approval before posting
- **`auto`**: Posts automatically, notifies after publication with link

### Commenting Reminder

Not a scheduled task. The SessionStart hook checks `comment-targets.json` and nudges:
> "Tu as commente [N]/15 posts aujourd'hui. Lance /linkedin:commenter pour continuer."

---

## 9. Agents

### 9.1 `onboarding-agent`

Triggered by `/linkedin:start`. Interviews user for LinkedIn-specific config. Reads copywriter identity files if available. Creates `linkedin-profile.json` with pillars, posting config, competitor list.

### 9.2 `content-agent`

Triggered by `/linkedin:publier`. Orchestrates the full content pipeline:
1. Loads all context files (voice-dna, icp, linkedin-profile, learnings, analytics)
2. Invokes `content-strategy` skill → picks template, tone, angle, CTA
3. Invokes `post-generator` skill → 3 hooks + full post
4. Invokes `virality-scorer` skill → score + breakdown
5. If score < 60: regenerates with feedback (max 2 retries)
6. Presents result to user → on approval, writes to `queue.json`

### 9.3 `research-agent`

Triggered by `/linkedin:recherche`. Aggregates trending topics from WebSearch, Chrome feed scan, and competitor analysis. Ranks topics by relevance to user's content pillars.

### 9.4 `engagement-agent`

Triggered by `/linkedin:commenter`. Opens LinkedIn feed via Chrome, surfaces high-value posts, invokes `comment-strategist` for drafts, presents options to user, posts approved comments.

### 9.5 `analytics-agent`

Triggered by `/linkedin:analyser`. Scrapes engagement via Chrome, runs learning-engine analysis, updates `learnings.json`. Also handles autoresearch experiments when called with `experiment` argument.

### 9.6 `competitor-agent`

Triggered by `/linkedin:concurrents`. Scrapes competitor profiles via Chrome, analyzes posting patterns, identifies top-performing content, surfaces actionable insights.

---

## 10. SessionStart Hook

```json
{
  "hooks": {
    "SessionStart": [{
      "hooks": [{
        "type": "prompt",
        "prompt": "Read linkedin/data/linkedin-profile.json. If empty or missing, suggest /linkedin:start. Otherwise: 1) Set language from voice-dna language_preference (default: French). 2) Show quick status: posts in queue, today's comment count, next scheduled post. 3) If learnings.json has new directives since last session, mention them. 4) If comment-targets.json shows < 10 comments today, nudge.",
        "timeout": 30
      }]
    }]
  }
}
```

---

## 11. Copywriter Integration Flow

```
Copywriter                              LinkedIn
-----------                             --------
voice-dna.json      ──reads──→          SessionStart hook
icp.json            ──reads──→          content-strategy skill
business-profile    ──reads──→          post-generator skill

/copywriter:ecrire social
  └── generates draft ──writes──→       data/queue.json (source: "copywriter")
                                          ↓
                                        /linkedin:file approve
                                          ↓
                                        Chrome posts to LinkedIn
                                          ↓
                                        analytics.json ──feeds──→ learnings.json
                                          ↓
                                        Next generation is smarter
```

---

## 12. Key Design Decisions

1. **No Python, no server, no database**: Everything is Claude reasoning + JSON files + Chrome automation
2. **Chrome as the API layer**: All LinkedIn interactions through Claude in Chrome browser automation. No API keys or developer app needed.
3. **User confirmation for publishing**: Every post and comment requires explicit user approval before Chrome clicks "Post"
4. **Shared identity, separate pipeline**: Copywriter owns voice/ICP/profile. LinkedIn owns the posting pipeline.
5. **Virality scoring is pure Claude**: 6-dimension scoring via Claude reasoning, plus heuristic adjustments (hook length, word count, whitespace, numbers, CTA presence)
6. **Learning is file-based**: `analytics.json` → `learnings.json` → injected into next generation. No database needed.
7. **Graceful cold start**: All data files start empty. The plugin works from day 1 with best-practice defaults. Learning improves over time.

---

## 13. Feature Parity Matrix

| LinkedIn-main Feature | Plugin Equivalent | Implementation |
|-----------------------|-------------------|----------------|
| OAuth + REST API | Chrome browser session | `chrome-linkedin` skill |
| SQLite database | JSON files in `data/` | Read/Write tools |
| FastAPI dashboard | `/linkedin:bilan` + chat UI | Command + SessionStart |
| APScheduler jobs | Claude scheduled tasks | 5 scheduled tasks |
| Claude API calls | Claude reasoning (native) | Skills invoke Claude directly |
| Content templates | `references/templates.md` | post-generator skill |
| Virality scorer | `virality-scorer` skill | Pure Claude + heuristics |
| Learning context | `learnings.json` + directives | learning-engine skill |
| Autoresearch | `autoresearch` skill | Experiment loop |
| Comment helper | `comment-strategist` skill | engagement-agent |
| Competitor scraper | Chrome profile scraping | competitor-agent |
| Post formatter | `formatting-guide.md` rules | post-generator skill |
| soul.md | voice-dna.json (shared) | Copywriter integration |

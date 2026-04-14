---
name: wiki-reader
description: >
  Query and search the LLM wiki knowledge base. Activates when user asks
  questions about wiki content, wants to search articles, browse the knowledge
  base, resume a previous session, or asks a factual question in a directory
  containing .wiki/ or when ~/wiki/ exists. Also activates on "what do we know
  about", "tell me about", "explain", "search wiki", "query".
tools:
  - Read
  - Glob
  - Grep
  - Bash
  - Edit
---

# Wiki Reader

You answer questions from the LLM wiki knowledge base. All answers come ONLY from wiki content — never from training data.

## Ambient Behavior

When this skill activates outside of an explicit `/wiki:*` command:

1. Resolve the hub path: try `$HOME/wiki/_index.md`, else read `~/.config/llm-wiki/config.json`
2. Check if `HUB/_index.md` or `.wiki/_index.md` exists
3. Read the master `_index.md` to assess if the wiki might cover the user's question
4. If relevant content exists -> read relevant articles and answer with citations
5. If no relevant content -> answer normally, optionally suggest `/wiki:ingest`
6. When peeking at sibling wikis, only read their `_index.md` — do not read full articles unless asked

## Query Depth Levels

- **Quick** (`--quick`): Answer from index summaries only. No full article reads.
- **Standard** (default): Navigate via indexes (3-hop), read 3-8 relevant articles, Grep for key terms, synthesize with citations.
- **Deep** (`--deep`): Full index scan, read ALL related articles, follow ALL links, search `raw/`, peek sibling wikis.

## Resume Mode (`--resume`)

Context reload for new sessions:
1. Check for interrupted sessions (`.research-session.json`, `.thesis-session.json`)
2. Read last 10 log entries from `log.md`
3. Read master `_index.md` for stats
4. Show 3 most recently updated articles
5. Suggest next steps based on findings

## Multi-Wiki Peek

When querying, answer from the primary wiki first. Then peek at sibling wiki indexes (via `HUB/wikis.json`) for relevant overlap. Flag connections but never merge content across wikis.

## Supplementary Wikis (`--with`)

`--with <wiki>` loads a supplementary wiki as additional context. The primary wiki provides the subject; `--with` wikis provide craft/skill knowledge.

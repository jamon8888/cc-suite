---
name: wiki-research
description: >
  Deep research using the LLM wiki. Activates when user wants to research a
  topic, investigate a thesis, assess a repo against the wiki, or generate
  a research-backed implementation plan. Also activates on "research",
  "investigate", "deep dive", "find out about", "prove that", "assess".
tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
  - WebFetch
  - WebSearch
  - Agent
---

# Wiki Research

You conduct deep research using parallel agent swarms, ingest findings, and compile them into wiki articles.

## Research Modes

- **Topic**: Standard multi-agent research on a subject area.
- **Question**: Decompose into sub-questions, one agent per sub-question, produce a playbook.
- **Thesis** (`--mode thesis`): For/against evidence framing with verdict. Read `${CLAUDE_PLUGIN_ROOT}/skills/wiki-core/references/thesis-mode.md`.

## Agent Dispatch

Research uses parallel agents (via Agent tool) to maximize coverage:

| Mode | Standard | Deep | Retardmax |
|------|----------|------|-----------|
| Agents | 5 | 8 | 10 |
| Searches/agent | 2-3 | 2-3 | 4-5 |
| Sources target | 5 | 5 | 15 |

> **Cowork fallback**: If Agent tool is unavailable, execute sequentially. Continue without error.

Agent roles: Academic, Technical, Applied, News/Trends, Contrarian. Deep adds: Historical, Adjacent, Data/Stats. Retardmax adds: 2 Rabbit Hole agents.

## Session Management

### Research Sessions (`--min-time`)

When `--min-time` is set, create `<wiki-root>/.research-session.json` for crash recovery:
- Created at session start, updated after each round, deleted on completion
- Resume detection: if file exists with `status: "in_progress"`, offer to continue or restart
- Session files are ephemeral — never committed to git

### Thesis Sessions

Uses `.thesis-session.json` instead, tracking evidence for/against counts and current verdict direction per round. Same lifecycle as research sessions.

### Stale Session Cleanup

If a session file has `start_time` > 7 days ago -> warn: "Stale session found. Clean up or delete manually."

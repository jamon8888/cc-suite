---
name: wiki-core
description: >
  Sales plugin's knowledge base core. Activates when user works with wiki
  directories, mentions knowledge base management, or uses /wiki commands.
  Also activates when user says "wiki", "knowledge base", or when ~/sales-wiki/
  exists or the configured hub path exists.
tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
  - WebFetch
  - WebSearch
---

# LLM Wiki Manager (Core)

You manage an LLM-compiled knowledge base. Source documents are ingested into `raw/`, then incrementally compiled into a wiki of interconnected markdown articles.

## Hub Path

The hub defaults to `~/sales-wiki/`. If `~/sales-wiki/_index.md` exists, HUB = `$HOME/sales-wiki` — done. Otherwise read `~/.config/llm-sales-wiki/config.json` and use `resolved_path`. If no config exists, HUB = `$HOME/sales-wiki` (for initialization). See `references/hub-resolution.md` for edge cases (iCloud, spaces, symlinks).

## Wiki Location

1. `--local` flag -> `.wiki/` in current project
2. `--wiki <name>` flag -> named wiki from `HUB/wikis.json`
3. Current directory has `.wiki/` -> use it
4. Otherwise -> HUB (the hub)

Topic sub-wikis are the default. HUB is a hub — content lives in `HUB/topics/<name>/`. See `references/wiki-structure.md` for the complete directory layout and file format conventions.

## Core Principles

1. **Indexes are derived cache.** `_index.md` files rebuilt on read when stale (file count vs row count). See `references/indexing.md`.
2. **Raw is immutable.** Sources in `raw/` are never modified after ingestion.
3. **Articles are synthesized, not copied.** Wiki articles draw from multiple sources, contextualize, and connect.
4. **Dual-linking.** Cross-references use `[[wikilink]]` + `[text](path)` on the same line for Obsidian + Claude.
5. **Frontmatter is structured data.** Every `.md` file has YAML frontmatter (title, summary, tags, dates).
6. **Incremental over wholesale.** Compilation processes only new sources by default.
7. **Honest gaps.** Never hallucinate. Say when the wiki doesn't have the answer.
8. **Multi-wiki awareness.** Answer from primary wiki first, peek sibling indexes for overlap.

## Workflows

- **Ingestion**: Source -> fetch/read -> extract metadata -> write `raw/{type}/` -> update indexes. See `references/ingestion.md`.
- **Compilation**: Survey uncompiled sources -> plan articles -> classify -> write/update with cross-refs -> update indexes. See `references/compilation.md`.
- **Query**: Read indexes -> identify relevant articles -> read -> follow links -> Grep -> synthesize with citations.
- **Linting**: Check structure -> indexes -> links -> content -> coverage -> report. See `references/linting.md`.
- **Output**: Gather articles -> generate artifact -> save to `output/`. See `references/wiki-structure.md`.
- **Research**: Existing check -> parallel agent search -> credibility review -> ingest -> compile -> report gaps.

## Activity Log

Every operation appends to `log.md`. Format: `## [YYYY-MM-DD] operation | Description`. Append-only, never edit existing entries. Concurrent writes safe.

---
name: wiki-inbox
description: >
  Automatic inbox processor for the LLM wiki knowledge base. Activates when
  the user says "process my inbox", "ingest inbox", "what's new in inbox",
  "scan wiki inbox", or when running as a scheduled task. Also activates when
  the user drops files and wants them added to the wiki automatically.
  Use to process ~/wiki-inbox/ and add everything to the right topic wiki.
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

# Wiki Inbox Processor

You process the `~/wiki-inbox/` drop zone and ingest everything into the correct topic wiki under `~/wiki/`. This skill is designed to run both on-demand and as a scheduled task.

## Inbox Structure

```
~/wiki-inbox/
├── .processed/          # Files moved here after ingestion (never delete)
├── .failed/             # Files that couldn't be processed (with error notes)
├── .log                 # Ingestion log (append-only)
└── <files>              # Anything the user dropped here
```

Create these directories if they don't exist yet.

## Supported File Types

| Extension | Treatment |
|---|---|
| `.pdf` | Read full text, extract title/author/date from metadata or first page |
| `.md`, `.txt` | Read as-is, use filename as title fallback |
| `.html` | Extract main content, strip nav/footer/ads |
| `.docx`, `.doc` | Read text content |
| `.url`, `.webloc` | Extract URL, fetch page content via WebFetch |
| `.csv`, `.json` | Describe schema + sample rows, type = data |
| `.png`, `.jpg`, `.jpeg` | Describe visible content (type = notes) |
| `*.txt` containing a URL | Treat as URL ingestion |

## Execution Protocol

### Step 1 — Resolve inbox path

Check `~/wiki-inbox/`. If it doesn't exist, create it with the subdirectory structure above and tell the user:
> Inbox created at `~/wiki-inbox/`. Drop files there and I'll process them automatically.

### Step 2 — Scan for new files

List all files in `~/wiki-inbox/` (not in `.processed/` or `.failed/`):

```bash
find ~/wiki-inbox -maxdepth 1 -type f | sort
```

If no files found:
> Inbox is empty — nothing to process.
> Drop files into `~/wiki-inbox/` and run this again, or wait for the next scheduled run.

### Step 3 — Resolve HUB

Follow the hub resolution protocol from `${CLAUDE_PLUGIN_ROOT}/skills/wiki-core/references/hub-resolution.md`.

Short version: check `~/wiki/_index.md` → if exists, HUB = `~/wiki/`. Otherwise read `~/.config/llm-wiki/config.json`.

If no HUB exists at all:
> No wiki found. Run `/wiki init <topic>` first to create a knowledge base, then I can process your inbox.

### Step 4 — Determine target wiki for each file

For each file, determine which topic wiki it belongs to using this priority order:

1. **Filename prefix**: `bitcoin__article.pdf` → topic = `bitcoin` (double underscore separator)
2. **Subdirectory**: `~/wiki-inbox/bitcoin/article.pdf` → topic = `bitcoin`
3. **Content analysis**: read the file, infer topic from content (compare against `HUB/wikis.json` registered topics)
4. **Single wiki**: if only one topic wiki exists → use it automatically
5. **Ambiguous**: present top 2 matches to the user and ask which to use

**Batch processing**: group files by resolved topic to minimize wiki-switching overhead.

### Step 5 — Ingest each file

For each file, following the ingestion protocol from `${CLAUDE_PLUGIN_ROOT}/skills/wiki-core/references/ingestion.md`:

1. Read/fetch the file content
2. Extract: title, author (if available), date (if available), type
3. Generate a slug: `YYYY-MM-DD-title-slug.md`
4. Write to `<wiki-root>/raw/<type>/<slug>.md` with frontmatter:

```yaml
---
title: "<extracted or inferred title>"
source: "<original filename or URL>"
type: articles|papers|repos|notes|data
tags: []
ingested: YYYY-MM-DD
confidence: medium
summary: "<2-3 sentence summary>"
inbox_origin: true
---
```

5. Update `raw/<type>/_index.md` and `raw/_index.md`
6. Update master `_index.md` source count

### Step 6 — Move to .processed/

After successful ingestion:

```bash
mv ~/wiki-inbox/<file> ~/wiki-inbox/.processed/YYYY-MM-DD-<file>
```

Prefix with today's date so the archive is chronologically sorted.

### Step 7 — Log the run

Append to `~/wiki-inbox/.log`:

```
[YYYY-MM-DD HH:MM] processed: N files → wiki/<topic> | skipped: M | failed: K
  ✓ filename.pdf → raw/articles/2026-04-12-slug.md
  ✓ notes.txt → raw/notes/2026-04-12-slug.md
  ✗ corrupt.pdf → .failed/ (could not extract text)
```

Append the same summary to `<wiki-root>/log.md`.

### Step 8 — Compile nudge

After ingestion, count total uncompiled sources across all affected wikis. If 3 or more:

> ✅ Processed N files into your wiki.
> You now have X uncompiled sources. Run `/wiki:compile` to turn them into wiki articles, or I'll do it automatically in the next scheduled run if compile mode is enabled.

### Step 9 — Report

Show a clean summary table:

```
📥 Inbox run — 2026-04-12 09:00
─────────────────────────────────────
✓  bitcoin-whitepaper.pdf   → wiki/bitcoin  (papers)
✓  defi-notes.txt           → wiki/bitcoin  (notes)
✓  macro-outlook.pdf        → wiki/macro    (articles)
✗  corrupted.pdf            → .failed/      (unreadable)
─────────────────────────────────────
3 ingested · 1 failed · 0 skipped
Next: run /wiki:compile to synthesize new sources
```

## Auto-Compile Mode

If the user runs with `--compile` flag or if more than 10 uncompiled sources accumulate, automatically run compilation after ingestion:

> Auto-compiling 12 new sources into wiki articles...

Then follow `${CLAUDE_PLUGIN_ROOT}/skills/wiki-core/references/compilation.md`.

## Scheduled Task Configuration

This skill is designed to run as a Cowork scheduled task. Recommended setup:

**Daily at 9:00** — process inbox + compile if needed:
> "Process my wiki inbox and compile any new sources. Use /schedule to run this daily."

**Weekly on Monday** — full processing + lint:
> "Process my wiki inbox, compile new sources, and run a health check on the wiki."

To set up: type `/schedule` in Cowork and describe the task using the wording above.

## Error Handling

- **Unreadable file**: move to `.failed/YYYY-MM-DD-<file>`, create a `.failed/<file>.error.txt` explaining why, continue with next file
- **No wiki match**: hold file in inbox, report it in the summary, ask user to specify topic
- **Partial failure**: always process what can be processed, never abort the whole run for one bad file
- **Duplicate detection**: before ingesting, check if a file with the same name or very similar content already exists in `raw/`. If so, skip and note "already ingested".

## Connector-Aware Mode

When cloud connectors are available, the inbox skill can also pull directly from connected tools — not just from `~/wiki-inbox/`. This is handled by `/wiki:sync`.

Connector availability is checked at runtime:
- `mcp__googledrive__*` → ~~cloud storage available
- `mcp__notion__*` → ~~notes app available
- `mcp__github__*` → ~~code repository available
- `mcp__slack__*` → ~~chat available
- `mcp__gmail__*` → ~~email available

When processing the inbox, if a `.url` or `.webloc` file points to a Google Drive or Notion URL and the corresponding connector is active, read the document directly via the connector instead of WebFetch. This gives cleaner content extraction (no HTML stripping needed) and preserves document metadata (author, date, last editor).

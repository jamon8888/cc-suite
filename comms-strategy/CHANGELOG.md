# Changelog

## [2.0.1] — Sentinel integration fix

### Fixed — CLAUDE.md
- Sentinel detection: `${CLAUDE_PLUGIN_ROOT}/../sentinel-v8` (bash variable, unresolvable in Cowork)
  → `Read ../sentinel-cowork/.claude-plugin/plugin.json` (Cowork-native file read)
- Folder name: `sentinel-v8` → `sentinel-cowork` (matches migrated plugin name)
- Decision ledger path: `../sentinel-v8/data/decision-ledger.json`
  → `../sentinel-cowork/data/decision-ledger.json`

### Changed — CONNECTORS.md
- Sentinel entry updated with correct install name and 7 trigger points
- Added full Sentinel integration section with trigger table and shared ledger documentation

## [2.0.0] — Previous version
- Original release

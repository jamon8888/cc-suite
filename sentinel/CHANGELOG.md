# Changelog

## [8.2.0] — Cowork migration

### Breaking changes
- Removed all Python/Bash execution — Cowork does not support `python3` or shell scripts
- `skills_loading`, `default_bundle`, `bundles` removed from plugin.json (unsupported by Cowork)

### Changed — Agents (10 files)
- All agents: `allowed-tools:` → `tools: []` (JSON array, Cowork schema)
- All agents: `model: sonnet` → `model: inherit`
- `calibration-coach`: bash call to calibration.py replaced by inline Brier score formula
- `noise-calculator`: bash calls to noise.py replaced by inline divergence/CV/IQR algorithms; description updated (no longer claims "scripts only" — Claude calculates inline)
- `group-facilitator`: Bash removed

### Changed — Commands (8 files)
- `sentinel.md`: Steps 1–2 (bash triage.py) replaced by inline triage formula with full scoring logic
- `sentinel-post.md`, `sentinel-blind.md`, `sentinel-group.md`, `sentinel-review.md`: bash calibration.py calls replaced by Read/Write file ops + delegation to calibration-coach agent
- `sentinel-diverge.md`, `sentinel-reframe.md`, `sentinel-setup.md`: `allowed-tools: None` removed (invalid in Cowork)
- All `$CLAUDE_PLUGIN_ROOT/data/` paths → `data/` (relative)

### Changed — hooks/hooks.json
- Removed `PostToolUse` hooks (unsupported in Cowork)
- Kept Schedule hook as a documented Scheduled Task with Cowork setup instructions

### Changed — CLAUDE.md
- Ecosystem detection block: Python code → prose file-read instructions
- Added comms-strategy-final to ecosystem detection
- `LEDGER_PATH` python variable → plain text relative path reference
- `PROFILE_PATH` python variable → plain text relative path reference

### Changed — Skills
- Domain skills moved from `domains/` into `skills/` for Cowork compatibility
- `skills/decision-hygiene/scripts/` renamed to `scripts-claude-code-only/` with README

### Fixed
- plugin.json: version 8.0.0 → 8.2.0
- plugin.json: agent count 7 → 10 (scope-checker, temporal-auditor, group-facilitator were missing)
- plugin.json: removed unsupported fields (skills_loading, default_bundle, bundles)
- All agent tools fields converted from comma-string to JSON array

## [8.1.0] — (previous)
- v8.1 internal release — see original README

## [8.2.1] — Eval-driven corrections

### Eval results
- Skill trigger rate: 9/21 (43%) → 21/21 (100%) after description rewrites
- Agent quality: 31/31 (100%) — all agents pass on first run

### Changed — Skills (6 descriptions rewritten)
- `decision-hygiene`: jargon-only → natural language triggers (FR + EN), body updated to
  remove Python scripts references
- `hiring`: added "on hésite à recruter", "we're torn between candidates", "finalist"
- `ma`: added "on a reçu une offre de rachat", "should we acquire this"
- `product-management`: added "on doit prioriser le backlog", "help me decide what to build"
- `retrospective`: added "pourquoi notre lancement a-t-il raté", natural FR phrases
- `strategy-marketing`: added "on prépare notre plan de communication", "which channel",
  "comms plan", "GTM"

### Changed — Agents
- `noise-calculator`: removed "You exist because Claude approximates math; scripts don't"
  (Cowork: inline algorithms, not scripts)

### Version
plugin.json bumped to 8.2.1 (patch: description fixes, no API change)

## [8.3.0] — Science-grounded improvements

### Changed — agents/failure-finder.md
- Removed "The most empirically validated technique" from description — overclaim
- Section "The science": added explicit limit on solo LLM use vs original group context
  (Klein's social competition mechanism does not operate when Claude generates the pre-mortem alone)
- `likelihood: HIGH/MEDIUM/LOW` → `plausibility:` throughout, with note that these are
  pattern-based estimates, not calibrated probabilities

### Changed — agents/noise-calculator.md
- "When to activate" rewritten to distinguish group use (genuine inter-rater variance,
  Kahneman/Sunstein sense) vs solo use (internal consistency check on LLM outputs)

### Changed — commands/sentinel.md
- temporal-auditor activation: STANDARD threshold `commitment_horizon ≥ 3` → `≥ 2`
  (12-18 month decisions are the peak risk zone for hyperbolic discounting)
- Agent activation summary table updated accordingly
- STANDARD/FULL prediction recording: now surfaces review_date and `/sentinel-post [id]`
  explicitly to user (closes the feedback loop architecturally)
- Triage routing: added epistemics note that 40/60/78 thresholds are calibrated
  heuristics, not empirically derived boundaries

### Changed — commands/sentinel-review.md
- "Overdue reviews" block now leads the output — surfaces all unresolved predictions
  past their review_date before calibration stats

### Changed — CLAUDE.md (3 changes)
- §2 Anti-sycophancy: passive constraint → active reformulation counter with 3-step
  escalation (flag at 2nd restatement, stop re-running at 3rd, cite Perez et al. 2022)
- §3 Confidence caps: added epistemics note — thresholds are heuristics; MAP confidence
  scores are relative signals, not statistically calibrated probabilities
- §6 Session isolation: passive note → blocking prompt requiring explicit acknowledgement
  before analysis proceeds in a contaminated session

### Version
8.3.0 — MINOR: new agent behaviours, architectural changes to protocol routing

## [8.4.0] — Templates and domains fully wired

### Problem fixed
Templates, domain biases (biases.yaml), and domain frameworks (frameworks.yaml)
were referenced but never read. `${SKILL_DIR}` and `$CLAUDE_PLUGIN_ROOT` were
unresolvable variables — content was packaged but invisible to the protocol.

### Changed — All 5 domain SKILL.md files
- `${SKILL_DIR}/` → actual relative paths (`skills/[domain]/`)
  in all biases, frameworks, and template references

### Changed — agents/questioner.md
- Now reads `skills/[domain]/biases.yaml` when a domain skill is active
- Domain-specific bias questions (H1-H3, MA1-MA8, PM1-PM8, SM1-SM8) take
  priority in question ranking over generic catalog entries
- `$CLAUDE_PLUGIN_ROOT/` path → `skills/` relative path

### Changed — agents/group-facilitator.md
- Last remaining bash/noise.py call → delegation to noise-calculator agent

### Changed — agents/logic-tester.md
- `$CLAUDE_PLUGIN_ROOT/` → `skills/` relative path for fallacy-catalog.yaml

### Changed — commands/sentinel.md (Step 3 Synthesis)
- Template offer added at end of every synthesis: reads correct domain template,
  offers "fill the template" to populate with MAP scores and failure modes,
  writes completed document to data/

### Changed — CLAUDE.md Skills Discovery Protocol
- Bundle system (Claude Code artefact) → proper Cowork relative-path loading table
- Resource files (biases.yaml, frameworks.yaml, templates) documented with
  correct read paths and conditions

### Changed — skills/ma/SKILL.md
- Templates section: filenames → full read paths + when-to-use
- Lawyer mode: explicit read instructions for lawyer-biases.yaml and lawyer-frameworks.yaml

### Changed — skills/ma/frameworks.yaml
- `script_call: python3 ${SENTINEL_ROOT}/...` → `calculation:` delegation to noise-calculator agent

### Added — skills/retrospective/templates/
- `attribution-audit.md` (was referenced but missing)
- `plan-continuation-review.md` (was referenced but missing)

### Fixed — 5 template files (strategy-marketing + ma + product-management)
- `noise-audit-comex.md`, `budget-challenge.md`, `campaign-calibration.md`,
  `noise-audit-committee.md`, `noise-audit-pm.md`
- bash/python3 script calls → inline delegation to noise-calculator or calibration-coach agent

### Fixed — templates/pre-mortem.md (root)
- `likelihood:` column → `plausibility:` (consistent with failure-finder v8.3 change)

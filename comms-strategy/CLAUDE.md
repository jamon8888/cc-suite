# Comms Strategy Plugin — Context Memory
# Version: 2.0.0

<!-- ═══════════════════════════════════════════════════════════
     ZONE 1 — STATIC CONFIG (never changes between sessions)
     Fully cacheable. Do not place dynamic content in this zone.
     ═══════════════════════════════════════════════════════════ -->

## Standalone Mode

Comms Strategy is a standalone plugin. Data lives in its own PARA tree at `data/`.

Agency profile: `data/2-Domaines/agency-profile.md`. If missing or empty, prompt user to run `/comms:start` before proceeding. Never invent agency context.

## Language Directive

Check `data/2-Domaines/agency-profile.md` → `language_preference` field:
- `"fr"` → All outputs in French
- `"en"` → All outputs in English
- `"bilingual"` → Match the language of the user's request
- Missing → Default English, ask preference at session start

## Anti-Slop Guard

Reject the following phrases in all outputs — replace with specific, concrete language:

**Universal slop**: "leverage", "synergy", "seamlessly", "game-changer", "robust", "holistic", "cutting-edge", "transformative", "innovative"

**Comms-specific slop**: "360°" (say "fully integrated" or specify channels), "integrated" used as a stand-alone buzzword, "multi-touchpoint", "brand journey", "storytelling" without specifying format or channel, "resonates" without specifying audience segment

## Sentinel Integration (Decision Hygiene)

At session start, check whether Sentinel is installed by reading its manifest:
- Read `../sentinel-cowork/.claude-plugin/plugin.json` → if found: `sentinel_installed = true`

If Sentinel is installed, announce once at session start: "Sentinel active — strategic decision quality available for comms workflows."

If Sentinel is not installed, proceed silently — no mention, no warning.

**Non-blocking design**: Sentinel is offered, never mandatory. At each trigger point, offer in one line. If user replies "continue" (or any acknowledgment to skip), proceed immediately without invoking Sentinel.

Offer pattern: *"Sentinel available to pressure-test this [Platform / message hierarchy / concept] before locking in. Run check? (or 'continue')"*

| Skill / Command | Trigger point | Sentinel agents offered |
|----------------|--------------|------------------------|
| `brief-analyzer` | After Strategic Platform decoded | `questioner`, `reality-checker` |
| `message-architecture` | After message pillars drafted | `structure-builder`, `questioner` |
| `behavioral-strategy` | After Real Why + CEP mapping complete | `questioner` (challenge the insight), `reality-checker` (are these biases actually in play?) |
| `campaign-strategy` | After campaign concept generated | `failure-finder`, `questioner` |
| `pitch-builder-agent` (Step 2) | After strategic diagnosis drafted | `questioner`, `failure-finder` |
| `crisis-planner` | After risk scenarios mapped | `questioner`, `reality-checker` |
| `comms-measurement` | Before KPI framework finalised | `calibration-coach`, `reality-checker` |

**Decision ledger**: When recording comms predictions (campaign KPI forecasts, media coverage estimates, pitch outcomes), write to `../sentinel-cowork/data/decision-ledger.json` so calibration-coach can track accuracy across sessions.

## Token Budget

| Category              | Target  | Max     |
|-----------------------|---------|---------|
| System + agency refs  | 2,000   | 3,000   |
| Active skill content  | 3,000   | 5,000   |
| Tool outputs (recent) | 4,000   | 8,000   |
| Message history       | 5,000   | 10,000  |
| Reserved buffer       | 2,000   | —       |

Trigger context compression when message history exceeds 10,000 tokens.

## Observation Masking

Tool outputs that are 3+ turns old AND whose purpose has been served:
- Replace with: `[Ref: <tool_name> result turn N — key finding: <1 sentence>]`
- Never mask: current turn outputs, agency-profile reads, active brief data
- Always mask: repeated glob results, boilerplate reads already applied

## Context Compression

At 70-80% utilization, generate an Anchored Iterative Summary:

### Session Intent
### Files Modified
### Decisions Made
### Current State
### Next Steps

## Degradation Indicators

### Failure Symptoms
- **Brief drift**: Downstream deliverables diverge from the Strategic Platform as session lengthens. Symptom: messages or campaign concepts that no longer match the original brief insight or platform. Recovery: re-read `data/1-Projets/[client]/strategic-platform.md` to re-anchor before continuing.
- **Lost-in-middle**: Information placed in context middle receives 10-40% lower recall — keep brief anchor and platform statement at start/end positions.
- **Context poisoning**: Contradictory brief versions in context causing oscillating outputs. Identify offending turn, truncate, restart from verified brief only.

### Recovery Protocol
1. If brief drift detected: re-read strategic platform file, summarize it in 3 lines, prepend to next response
2. If poisoning suspected: identify conflicting version, discard older one explicitly
3. Never retry the same prompt on a poisoned context

## Memory Layers

| Layer | Persistence | What lives here |
|-------|-------------|----------------|
| **Working** | Context window | Active brief / deliverable being worked this turn |
| **Short-term** | Session-scoped | Draft outputs, in-progress strategic frameworks |
| **Long-term** | Cross-session | `data/2-Domaines/agency-profile.md`, `data/1-Projets/clients/` |
| **Entity** | Cross-session | Client + prospect identities (consistent across briefs, pitches, campaigns) |

Load only the active client's data slice per session. Never load all client data at start.

## Context Isolation Protocol

Sub-agents isolate context. Each receives only what its specific subtask requires.

| Agent | Receives | Does not receive |
|-------|----------|-----------------|
| `briefing-synthesizer-agent` | Brief analysis outputs for this brief only | Full client history, other briefs |
| `campaign-monitor-agent` | Reads `data/1-Projets/` directly (file system handoff) | Full session history |
| `pitch-builder-agent` | Prospect profile + diagnosis only | Full agency context, other client data |

## Anti-Patterns

### Comms-specific
- **Brief drift**: Strategic platform written at session start is ignored by turn 8. Compress and re-anchor before generating downstream deliverables.
- **Message dilution**: Pillars crafted for primary audience are weakened when adapted for secondary audiences. Each adaptation must be validated against the master hierarchy.
- **Pitch scope creep**: Strategic diagnosis keeps expanding to cover topics not in the brief. Lock scope at diagnosis phase before generating recommendations.

### Context Management
- **Stuffing everything into context**: Load only the active brief and relevant audience data. Long contexts degrade strategic coherence.
- **No compression before degradation**: Apply at 70-80% — not 90%. Brief drift accelerates with context saturation.

## Sprint Workflow

Single-command autonomous strategy production: `/comms:sprint [brief]`

Execution order: `brief-analyzer → (audience-intelligence ∥ competitive-comms) → (behavioral-strategy ∥ media-landscape ∥ stakeholder-mapper) → **checkpoint** → message-architecture → campaign-strategy → comms-measurement → sprint-summary`

One human checkpoint: after Phase 3, before messaging begins. Agent presents 5-line platform summary + 3 assumptions + competitive white space. User says "proceed" or "adjust [X]".

Output: 8 files — `data/1-Projets/clients/[client]/` (6 files + sprint-summary) and `data/1-Projets/campaigns/[campaign]/` (campaign-brief + measurement-framework).

Token note: sprint sessions compress each completed phase to a 3-line summary before proceeding. Never hold full file contents of prior phases in active context.

## Skills Discovery Protocol

On session start: reference bundle names and descriptions only. Load full skill content only when a specific skill is activated.

| Bundle | Priority | Skills |
|--------|----------|--------|
| `agency-foundations` | 1 (always pre-loaded) | brief-analyzer, audience-intelligence, stakeholder-mapper |
| `creative-strategy` | 2 | message-architecture, campaign-strategy, brand-voice-auditor |
| `behavioral-science` | 2 | behavioral-strategy (+ references: kahneman-biases, sutherland-psychologic, how-brands-grow) |
| `intelligence` | 3 | media-landscape, competitive-comms |
| `agency-ops` | 4 | comms-measurement, crisis-planner, para-organizer |

## Glossary

| Term | Meaning |
|------|---------|
| Strategic Platform | Core insight + brand territory that anchors all deliverables |
| Brief drift | When deliverables diverge from the platform over a long session |
| Message hierarchy | Primary claim + supporting pillars + proof points |
| Standalone | Comms Strategy works fully without Solo or other plugins |

---

<!-- ═══════════════════════════════════════════════════════════
     ZONE 2 — SEMI-STATIC STATE (set once by /comms:start)
     Rarely changes. Update only when agency profile changes.
     ═══════════════════════════════════════════════════════════ -->

## Agency Profile

[Waiting for onboarding via /comms:start. Run this command to initialize your agency profile.]

---

<!-- ═══════════════════════════════════════════════════════════
     ZONE 3 — DYNAMIC SESSION MEMORY (per-session state)
     Always last. High churn — never cache this zone.
     ═══════════════════════════════════════════════════════════ -->

## Active Clients & Campaigns

- [No active clients. Add one via /comms:brief]

## Current Briefs

- [No briefs in progress.]

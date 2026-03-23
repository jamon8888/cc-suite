---
name: onboarding-agent
description: >
  Orchestrates the first-run setup of the Copywriter plugin (Voice DNA, ICP, Business Profile).
  Triggered exclusively by the /copywriter:start command — do not trigger on conversational phrases.
model: sonnet
tools: ["Read", "Write", "Bash", "Glob"]
color: green
---

# Onboarding Agent

## STEP 0 — FILESYSTEM PREP

```bash
mkdir -p data/2-Domaines data/1-Projects data/1-Projets data/3-Resources data/3-Ressources data/4-Archives
```

## STEP 0b — SOLO ECOSYSTEM DETECTION

Before asking the user anything, check for Solo:

```python
SOLO_ROOT = "${CLAUDE_PLUGIN_ROOT}/../solo"
solo_installed = file_exists(f"{SOLO_ROOT}/.claude-plugin/plugin.json")

if solo_installed:
    solo_dna = file_exists(f"{SOLO_ROOT}/data/2-Areas/voice-dna.json") or
               file_exists(f"{SOLO_ROOT}/data/2-Domaines/voice-dna.json")
```

**If Solo is installed AND has DNA files:**
> "I detected Solo is installed and has Voice DNA files. Do you want to:
> A) Import your Solo profiles (faster — no re-setup needed)
> B) Create separate Copywriter profiles (use this if you want different positioning)
>
> Most users choose A."

If A: copy Solo DNA files to `data/2-Domaines/` and skip to Step 4 (ICP only).
If B: proceed with full setup below.

**If Solo is installed but has no DNA files:**
> "Solo is installed but I don't see DNA files yet. Run `/solo:start` first to create them, then come back here — or proceed with Copywriter standalone setup."

---

## STEP 0c — PARTIAL INSTALL DETECTION

Check which files already exist:
```
voice-dna.json:       EXISTS / MISSING
icp.json:             EXISTS / MISSING
business-profile.json: EXISTS / MISSING
```

If some exist: "Your [profile X] already exists (created [date if available]). Do you want to update it or keep it?"
Skip setup for files already present.

---

## STEP 1 — LANGUAGE

"Do you prefer English or Français?"
Store in `business-profile.json` as `language_preference: "fr" | "en"`.

---

## STEP 2 — BUSINESS PROFILE

Trigger `business-profile-creator`.
Ensure `language_preference` is set in the output JSON.

---

## STEP 3 — VOICE DNA

Trigger `voice-dna-creator`.

Before asking for samples, state the requirement:
"I need at least **5 writing samples** of different types (post + email + article + response + any other) to build a reliable DNA. Fewer samples = lower confidence score.
Paste them directly or share file paths."

If user provides < 5 samples:
"I have [N] samples. I'll build a preliminary DNA (confidence: Low). I recommend gathering [5-N] more and re-running this step. Proceed with preliminary?"

---

## STEP 4 — ICP

Trigger `icp-creator`.
Confirm B2B or B2C before building. B2B requires buying committee (the ICP is a committee, not a person).

---

## STEP 5 — CONNECTOR SETUP (mandatory step, not optional)

After profiles are created:
"Your profiles are ready. Two connectors unlock more power:

**Exa** (semantic search for research-agent): [Setup instructions]
**WordPress MCP** (publishing via blog-agent): [Setup instructions]

Want to configure these now? (5 min each, or skip and configure later)"

---

## STEP 6 — COMPLETION

Once all 3 files exist in `data/2-Domaines/`:

Show a summary:
```
✅ Setup complete

Files created:
• data/2-Domaines/voice-dna.json   — [confidence level] confidence
• data/2-Domaines/icp.json         — [B2C/B2B], [N fields completed]
• data/2-Domaines/business-profile.json — [offer name] @ [€price]

Ready to create content.
```

First task suggestion (based on what was learned):
- If no existing content: "Shall I write your first blog post on [topic from ICP pain points]?"
- If existing content: "Want me to audit an existing piece with antislop-expert?"

---

## Operational Rules

- **Solo detection is mandatory** — always check before asking the user to re-enter data they've already given Solo
- **Partial state detection** — never restart what already exists
- **Connector setup** — always surface at completion, never skip
- **Sample count** — always enforce minimum 5 samples for Voice DNA, flag if below

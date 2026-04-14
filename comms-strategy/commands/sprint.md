---
name: comms:sprint
description: "Run a full autonomous strategy sprint — brief in, complete 8-document strategy package out. Chains all 8 strategy skills in sequence with one human checkpoint to validate strategic direction before messaging begins."
argument-hint: "[brief text or file path — optional, will prompt if not provided]"
allowed-tools: Read, Write, Glob, WebSearch
model: sonnet
---

# /comms:sprint — Autonomous Strategy Sprint

> The full strategy pipeline in one command. Brief in, complete strategy package out.

Chains `brief-analyzer → audience-intelligence → competitive-comms → media-landscape → stakeholder-mapper → message-architecture → campaign-strategy → comms-measurement` autonomously, with one checkpoint at the midpoint to validate strategic direction before messaging begins.

**Output**: 8 documents, fully populated, filed in the correct PARA locations.

---

## Usage

```
/comms:sprint
/comms:sprint "paste brief text here"
/comms:sprint data/0-Inbox/brief-client.md
```

---

## What to do

### Step 1: Handle the brief input

**If a file path is provided:**
```python
brief_text = read_file(argument)
if not brief_text:
    error(f"File not found: {argument}. Check the path and try again.")
```

**If brief text is provided inline:**
```python
brief_text = argument  # Use directly
```

**If no argument:**
```
Ask: "Paste the client brief here, or provide a file path (e.g. data/0-Inbox/brief-client.md)"
```

### Step 2: Check prerequisites

```python
# Agency profile must exist
if not file_exists("data/2-Domaines/agency-profile.md"):
    stop("""
No agency profile found.

Run /comms:start first to set up your agency profile.
Takes 3–5 minutes — you only do it once.
""")
```

### Step 3: Launch the strategy-sprint-agent

Pass the brief text and trigger the strategy-sprint-agent to run the full pipeline.

Show the user upfront what is about to happen:

```
🚀 Starting Strategy Sprint
━━━━━━━━━━━━━━━━━━━━━━━━━━

This sprint will produce 8 strategy documents:

  Phase 1   Brief analysis
  Phase 2   Audience portrait + Competitive map        [parallel]
  Phase 3   Media landscape + Stakeholder map          [parallel]
  ⏸️         Strategic direction checkpoint (~5 min)
  Phase 4   Message architecture
  Phase 5   Campaign strategy
  Phase 6   Measurement framework
             Sprint summary

One checkpoint midway. You'll review the strategic platform summary,
3 key assumptions, and the competitive white space before messaging begins.
Say "proceed" to continue or "adjust [item]" to revise.

Launching now...
```

---

## Sprint Modes

### From file (recommended for full briefs)

```
/comms:sprint data/0-Inbox/brief-renault.md
```

The file should contain the raw client brief. Any format works — Word export, email copy-paste, or structured markdown.

### Inline (for quick tests or short briefs)

```
/comms:sprint "Renault wants to reposition their electric vehicle range for a younger urban audience in France. Launch campaign targeting 25–35 urban professionals. Budget TBC. Q3 2026."
```

### Interactive (no argument)

```
/comms:sprint
```

Prompts for brief input, then launches the sprint.

---

## The Checkpoint

The sprint pauses once — after Phase 3 (research complete) and before Phase 4 (messaging begins). You'll see:

- **5-line platform summary** (business challenge, comms challenge, audience, insight, idea territory)
- **3 strategic assumptions** with consequences if wrong
- **Competitive white space** — the angle or channel competitors are not using

Reply:
- `"proceed"` → sprint continues automatically to Phase 4–6
- `"adjust [item]"` → revise that element, then proceed

This is the only moment that requires your input. Everything else runs without prompting.

---

## What Gets Produced

```
data/1-Projets/clients/[client]/
  strategic-platform.md        Brief analysis — the strategic foundation
  audience-portrait.md         Audience segments, tensions, media behaviours
  competitive-comms-map.md     Competitor messaging, SOV, white space
  media-landscape.md           Earned/owned/paid media map + editorial calendar
  stakeholder-map.md           Priority stakeholders, attitudes, engagement plan
  message-architecture.md      Message pillars, narrative, audience adaptations
  sprint-summary.md            Navigation doc — bets, questions, presentation flow

data/1-Projets/campaigns/[campaign]/
  campaign-brief.md            Concept, PESO mix, phased activations, timeline
  measurement-framework.md     4-level KPIs, dashboard templates, data sources
```

---

## After the Sprint

Open `sprint-summary.md` — it contains:
- The full file index with one-line descriptions
- 3 strategic bets (directional choices made, with risk + validation approach)
- 5 open questions for the next client meeting
- Recommended presentation order for the strategy review

**Next steps:**
```
/comms:pitch [client]   → If this is for a new business pitch
/comms:crisis [client]  → Add crisis planning to the package
/comms:para             → Triage and organise Inbox after sprint
```

---

## Tips

**Thin briefs work too.** If the brief has gaps, the sprint runs with hypotheses — every assumption is flagged `[TBC]` and surfaced at the checkpoint and in sprint-summary.md. The research phases (Phase 2–3) compensate for brief gaps by scanning secondary sources.

**One client per sprint.** Each sprint creates a dedicated client folder. Run the command again for a different client — previous clients are untouched.

**Re-running the sprint.** If you re-run the sprint for an existing client, files are overwritten with the new outputs. Archive the previous version first if you need to keep it.

**Language.** Sprint outputs follow the language of the brief. A French brief → all 8 documents in French. Add `[FR]` or `[EN]` at the end of the command to override.

```
/comms:sprint data/0-Inbox/brief.md [FR]
```

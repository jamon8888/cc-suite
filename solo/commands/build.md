---
name: solo:build
description: "Run the full product pipeline — from discovery to launch"
argument-hint: "[discover | validate | design | prototype | launch | status]"
allowed-tools: Read, Write, Bash, Glob, Skill
model: sonnet
---

# /solo:build

> If you see unfamiliar placeholders or need to check which tools are connected, see [CONNECTORS.md](../CONNECTORS.md).

Run the complete product development pipeline — from initial discovery through validation, design, prototyping, and launch. Each phase builds on the previous one, with validation checkpoints to ensure you're building the right thing.

## Usage

```
/solo:build discover    # Start discovery phase
/solo:build validate    # Run validation + competitive analysis
/solo:build design      # Create PRD, design brief, and pricing model
/solo:build prototype   # Generate working prototype (solo-studio)
/solo:build launch      # Plan and execute the launch
/solo:build status      # Check pipeline progress
```

---

## How It Works

```
┌──────────────────────────────────────────────────────────────────┐
│                    PRODUCT PIPELINE                               │
├──────────────────────────────────────────────────────────────────┤
│  STANDALONE (always works)                                        │
│  ✓ Discover: Interview-based persona, problem, journey           │
│  ✓ Validate: competitive map + idea-test checkpoint              │
│  ✓ Design: PRD, user stories, design brief, pricing model        │
│  ✓ Launch: landing page copy, launch plan, channel strategy      │
│  ✓ Status tracking: local markdown files in PARA structure       │
│  → Prototype: install solo-studio, then /solo-studio:build       │
├──────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (when you connect your tools)                       │
│  + ~~search: Competitive research and market intelligence        │
│  + ~~analytics: Real-time launch signal tracking                 │
│  + ~~knowledge base: Pull existing research and user feedback    │
│  + ~~project tracker: Auto-create tasks from user stories        │
└──────────────────────────────────────────────────────────────────┘
```

---

## Pipeline Phases

### Phase 1: DISCOVER

**Goal:** Understand your users and their problems deeply before building anything.

**What I'll create:**
- Proto-persona (who are your users?)
- Customer journey map (where are the pain points?)
- Problem statement (what specific problem are you solving?)

**What I need from you:**
- Describe your target user in 2-3 sentences
- What problem do you think they have?
- (Optional) Any existing user research, interviews, or feedback

**Output:**
```
data/1-Projets/[your-project]/
├── persona.md           # User profile with goals, pains, context
├── journey.md           # Customer journey with pain points
├── problem.md           # Clear problem statement
└── pipeline-status.md   # Phase tracking
```

**Time:** 15–30 minutes interactive session

---

### Phase 2: VALIDATE

**Goal:** Map the market and test your assumptions before investing time in building.

**What I'll do:**

**Step 1 — Competitive analysis (new)**
Run `competitive-analyzer` to map 5-8 alternatives, build the value gap matrix, and extract real user frustrations from reviews. This produces the positioning foundation and feeds your landing page copy.

**Step 2 — Validation test**
Use `idea-test` to recommend the cheapest test that reveals the hardest truth.

Validation methods:
- **Smoke Test / Fake Door:** Do users care? (landing page, signup form)
- **Concierge:** Will they use it manually? (do the job by hand for real users)
- **Wizard of Oz:** Does the experience work? (human-powered simulation)
- **Narrative / Video:** Can you explain it compellingly? (demo video, pitch)
- **Spike:** Can you actually build it? (technical feasibility check)

**What I need from you:**
- Run the recommended validation test
- Share results (signups, feedback, data)

**Output:**
```
data/1-Projets/[your-project]/
├── competitive-analysis-[date].md   # Market map + value gap matrix
└── validation-results.md            # Test method, results, GO/NO-GO/PIVOT
```

**Decision tree:**
- **GO** → Proceed to Design
- **NO-GO** → Archive project, save learnings
- **PIVOT** → Return to Discover with new insights

**Time:** 2–4 days (competitive research + test execution + analysis)

---

### Phase 3: DESIGN

**Goal:** Translate validated insights into a concrete product specification — including how you'll make money.

**What I'll create:**
- Product Requirements Document (PRD)
- User stories with acceptance criteria
- Design brief for prototyping
- **Pricing model (new):** choose from 5 product revenue models (one-time, subscription, freemium, usage-based, LTD), design tier structure with cannibalization guard

**What I need from you:**
- Confirm scope (MVP vs. full vision)
- Prioritize features (must-have vs. nice-to-have)
- Revenue model preference (or I'll recommend based on product type)

**Output:**
```
data/1-Projets/[your-project]/
├── PRD.md                      # Full product specification
├── stories.md                  # User stories with acceptance criteria
├── DESIGN-BRIEF.md             # Visual and interaction requirements
└── pricing-model-[date].md     # Revenue model + tier structure
```

**Time:** 30–45 minutes interactive session

---

### Phase 4: PROTOTYPE

**Goal:** Create a working prototype you can test with users.

This phase is handled by the **solo-studio** plugin.

```
/solo-studio:build mockup   # AI-generated screens (always works)
/solo-studio:build figma    # Interactive prototype (requires ~~design)
/solo-studio:build video    # Demo video MP4 (requires ~~video)
```

solo-studio reads the `DESIGN-BRIEF.md` from Phase 3 and outputs prototype files to `data/1-Projets/[project]/prototype/`.

---

### Phase 5: LAUNCH

**Goal:** Recruit the first 10 users manually, then activate targeted channels to reach 100.

**What I'll create:**

**Landing page copy** (via `landing-page-builder`)
Full copy for: hero, problem, solution, features, pricing, FAQ, final CTA. Built from your competitive analysis (frustrations → objections), your positioning (→ headline), and your pricing model (→ pricing section).

**Launch plan** (via `launch-planner`)
Day-by-day D-14 → D+30 calendar with specific tasks, sequenced across 3 horizons:
```
Horizon 1: First 10 users — manual recruitment (always)
Horizon 2: 10 → 100 — 2-3 targeted channels selected for your ICP
Horizon 3: 100+ — decided after channel signals emerge
```

**Channel strategy**
Selection grid matching your ICP to 2-3 priority channels with exact tactics per channel.

**Outreach messages** (via `draft-outreach`)
Personalized recruitment messages for each Horizon 1 source and launch channel.

**Auto-triggered at launch day:**
`launch-signal-agent` activates and runs every Monday for 60 days, tracking traction signals, onboarding friction, and product-market fit indicators. Deactivates automatically at day 60.

**What I need from you:**
- Target launch date
- Channels you're already active on (if any)
- Existing audience (newsletter subscribers, social following)

**Output:**
```
data/1-Projets/[your-project]/
├── landing-page-copy-[date].md   # Full landing page copy
├── launch-plan-[date].md         # D-14 → D+30 calendar
└── launch-signals/               # Weekly signal reports (auto-generated)
    ├── signal-week-1.md
    ├── signal-week-2.md
    └── final-report.md           # Generated at day 60
```

**Time:** 1–2 hours to build all launch materials, then execution over D-14 → D+30

---

## /solo:build status

Check your current pipeline progress at any point.

**Output:**
```
📦 PROJECT: [Your Project Name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Phase Progress:
[✓] DISCOVER ──> [✓] VALIDATE ──> [✓] DESIGN ──> [►] LAUNCH
     Jan 15-18       Jan 19-24      Jan 25-27      Jan 28 (current)

Current Phase: LAUNCH
Status: In Progress — D-11 countdown (launch date: Feb 8)

Completed Outputs:
  ✓ persona.md
  ✓ problem.md
  ✓ competitive-analysis-[date].md (8 alternatives mapped)
  ✓ validation-results.md (GO — 19% waitlist conversion)
  ✓ PRD.md
  ✓ pricing-model-[date].md (Freemium + Pro $19/mo)
  ✓ DESIGN-BRIEF.md

In Progress:
  ► landing-page-copy-[date].md (hero draft done, FAQ pending)
  ○ launch-plan-[date].md (not started)

Next Steps:
  1. Complete landing page FAQ section
  2. Generate D-14 → D+30 launch calendar
  3. Draft Horizon 1 outreach messages (10 contacts)

Commands:
  /solo:build launch plan    # Generate full launch calendar
  /solo:build launch page    # Resume landing page copy
  /solo:build launch status  # Launch countdown + signal overview
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Agent Instructions

### Execution Flow

1. **Detect project context**

   ```python
   project_name = ask("What's your project name?")
   project_path = f"data/1-Projets/{project_name}"
   status_file = f"{project_path}/pipeline-status.md"

   if file_exists(status_file):
       current_phase = read_pipeline_status(status_file)
       ask(f"Resume {project_name} at {current_phase} phase? [Yes/No/Restart]")
   else:
       create_project_directory(project_path)
       current_phase = "DISCOVER"
   ```

2. **Phase-specific workflows**

   **DISCOVER:**
   ```python
   invoke_skill("proto-persona", output=f"{project_path}/persona.md")
   invoke_skill("customer-journey-map", output=f"{project_path}/journey.md")
   invoke_skill("problem-statement", inputs=[persona, journey],
                output=f"{project_path}/problem.md")
   update_pipeline_status(phase="DISCOVER", status="COMPLETE")
   suggest("Ready to validate? Run: /solo:build validate")
   ```

   **VALIDATE:**
   ```python
   persona = read(f"{project_path}/persona.md")
   problem = read(f"{project_path}/problem.md")

   # Step 1: Competitive analysis
   invoke_skill("competitive-analyzer", context=[persona, problem],
                output=f"{project_path}/competitive-analysis-{today()}.md")

   # Step 2: Validation test
   competitive = read(f"{project_path}/competitive-analysis-{today()}.md")
   invoke_skill("idea-test", context=[persona, problem, competitive],
                output=f"{project_path}/validation-results.md")

   decision = parse_decision(validation_results)
   if decision == "GO":
       suggest("Validation passed! Run: /solo:build design")
   elif decision == "PIVOT":
       suggest("Pivot recommended. Run: /solo:build discover --pivot")
   else:
       suggest("NO-GO. Consider archiving or pivoting to a different problem.")
   ```

   **DESIGN:**
   ```python
   problem = read(f"{project_path}/problem.md")
   validation = read(f"{project_path}/validation-results.md")
   competitive = read(f"{project_path}/competitive-analysis-*.md")

   invoke_skill("prd-development", context=[problem, validation],
                output=f"{project_path}/PRD.md")
   invoke_skill("user-story", context=[PRD],
                output=f"{project_path}/stories.md")
   invoke_skill("design-brief-generator", context=[PRD, stories],
                output=f"{project_path}/DESIGN-BRIEF.md")
   invoke_skill("product-pricing-model", context=[PRD, competitive, persona],
                output=f"{project_path}/pricing-model-{today()}.md")

   update_pipeline_status(phase="DESIGN", status="COMPLETE")
   suggest("Design complete! Run: /solo:build prototype (via solo-studio) or /solo:build launch")
   ```

   **LAUNCH:**
   ```python
   persona = read(f"{project_path}/persona.md")
   competitive = read(f"{project_path}/competitive-analysis-*.md")
   pricing = read(f"{project_path}/pricing-model-*.md")
   positioning = read(f"{project_path}/positioning-statement.md") if exists else None

   # Landing page copy
   invoke_skill("landing-page-builder",
                context=[persona, competitive, pricing, positioning],
                output=f"{project_path}/landing-page-copy-{today()}.md")

   # Launch plan + channel strategy
   launch_date = ask("What's your target launch date?")
   existing_channels = ask("Which channels are you already active on?")
   invoke_skill("launch-planner",
                context=[persona, pricing, launch_date, existing_channels],
                output=f"{project_path}/launch-plan-{today()}.md")

   # Horizon 1 outreach messages
   invoke_skill("draft-outreach",
                context=["beta recruitment", persona],
                output=f"{project_path}/horizon1-outreach.md")

   update_pipeline_status(phase="LAUNCH", status="IN_PROGRESS",
                           launch_date=launch_date)
   suggest(f"Launch materials ready. D-14 countdown starts now. Launch date: {launch_date}")
   suggest("launch-signal-agent will auto-activate on launch day and run for 60 days.")
   ```

---

## Error Handling

**Missing prerequisites:**
```
❌ Cannot start VALIDATE phase

DISCOVER phase incomplete. Required files missing:
  - persona.md
  - problem.md

Run: /solo:build discover
```

**Validation failure:**
```
⚠️  Validation Result: NO-GO

Your test showed insufficient demand (2% conversion, target was 10%).

Options:
  1. Pivot to a different problem: /solo:build discover --pivot
  2. Archive and move on: /solo:build archive
  3. Continue anyway (not recommended): /solo:build design --force
```

---

## Tips

1. **Don't skip competitive analysis** — Understanding who already exists and where they fall short is the fastest way to find your positioning. It also reveals real user language for your copy.

2. **Don't skip discovery** — 80% of product failures come from building the wrong thing. The discover phase takes 30 minutes and can save months.

3. **Validate cheaply** — `idea-test` will suggest the fastest, cheapest test. Don't build a full prototype to validate an assumption.

4. **Pricing before landing page** — Know your revenue model before writing copy. The pricing structure shapes every message on the page.

5. **Horizon 1 is always manual** — The first 10 users come from direct outreach, not channels. Don't skip this because it feels slow. The feedback from those 10 conversations is worth more than 1,000 passive signups.

6. **Let the signal agent run** — 60 days of weekly signals will tell you whether you have traction or need to course-correct. Don't turn it off early.

---

## Skills Used by Phase

| Phase | Skills |
|-------|--------|
| Discover | `proto-persona`, `customer-journey-map`, `problem-statement` |
| Validate | **`competitive-analyzer`** (new), `idea-test` |
| Design | `prd-development`, `user-story`, `design-brief-generator`, **`product-pricing-model`** (new) |
| Prototype | Handled by `solo-studio` plugin |
| Launch | **`landing-page-builder`** (new), **`launch-planner`** (new), `draft-outreach` |
| Post-launch | **`launch-signal-agent`** auto-runs for 60 days |

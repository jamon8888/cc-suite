# Mode: setup — Onboarding Wizard

Interactive wizard that configures job-os from scratch or updates tracks on an existing install. Writes `config/profile.yml`, `portals.yml`, `modes/_profile.md`, and per-track CV stubs. Validates with `doctor.mjs` at the end.

**Run automatically** when setup files are missing. **Run anytime** via `/job-os setup`.

---

## Before Starting

Check which files already exist:

```
config/profile.yml     → profile configured?
modes/_profile.md      → archetypes configured?
portals.yml            → portal scanner configured?
cv.md or cv-*.md       → at least one CV exists?
data/applications.md   → tracker initialized?
```

Read current values from any existing files — show them as defaults during the wizard so re-runs are non-destructive. **Never delete or overwrite `data/`, `reports/`, `output/`, `interview-prep/`.**

---

## Step 1: Welcome

Display:

```
job-os setup wizard
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Let's configure your job search pipeline.

This wizard will:
  ✓ Set up your career tracks (AI Engineer, UX Designer, etc.)
  ✓ Create a CV for each track
  ✓ Build your profile and targeting narrative
  ✓ Configure the portal scanner with the right keywords
  ✓ Validate everything with a health check

[Re-run mode: existing data (applications, reports, pipeline) will NOT be touched.]

Ready? Let's start with your target roles.
```

(Skip the `[Re-run mode]` line on fresh installs.)

---

## Step 2: Track Selection

Display the full track menu grouped by domain:

```
What kind of roles are you targeting?
Pick one or more — I'll configure each track separately.

TECHNICAL
  1.  AI / ML Engineer
  2.  Software Engineer (Backend / Full-stack / Frontend)
  3.  Data Engineer
  4.  Data Scientist / Analyst
  5.  DevOps / Platform / SRE
  6.  Security Engineer
  7.  Solutions Architect

DESIGN
  8.  UX / UI Designer
  9.  Product Designer
  10. Design Systems
  11. UX Researcher
  12. Motion / Brand Designer

PRODUCT & STRATEGY
  13. Product Manager
  14. Technical Product Manager
  15. AI Product Manager
  16. Program / Project Manager
  17. Business Analyst

LEADERSHIP & TRANSFORMATION
  18. Engineering Manager
  19. Head of AI / CTO
  20. AI Transformation Lead
  21. Digital Transformation Lead

FREELANCE / AGENCY
  22. Freelance Consultant
  23. Design Agency / Studio

  C.  Custom role (type it in)

Enter numbers separated by commas (e.g. 1, 8) or type C for custom:
```

**Track ID mapping** (used for CV filenames and internal slugs):

| # | Name | ID | CV file |
|---|------|----|---------|
| 1 | AI / ML Engineer | `ai-engineer` | `cv-ai-engineer.md` |
| 2 | Software Engineer | `software-engineer` | `cv-software-engineer.md` |
| 3 | Data Engineer | `data-engineer` | `cv-data-engineer.md` |
| 4 | Data Scientist / Analyst | `data-scientist` | `cv-data-scientist.md` |
| 5 | DevOps / Platform / SRE | `devops` | `cv-devops.md` |
| 6 | Security Engineer | `security-engineer` | `cv-security-engineer.md` |
| 7 | Solutions Architect | `solutions-architect` | `cv-solutions-architect.md` |
| 8 | UX / UI Designer | `ux-designer` | `cv-ux-designer.md` |
| 9 | Product Designer | `product-designer` | `cv-product-designer.md` |
| 10 | Design Systems | `design-systems` | `cv-design-systems.md` |
| 11 | UX Researcher | `ux-researcher` | `cv-ux-researcher.md` |
| 12 | Motion / Brand Designer | `motion-designer` | `cv-motion-designer.md` |
| 13 | Product Manager | `product-manager` | `cv-product-manager.md` |
| 14 | Technical PM | `technical-pm` | `cv-technical-pm.md` |
| 15 | AI Product Manager | `ai-pm` | `cv-ai-pm.md` |
| 16 | Program / Project Manager | `program-manager` | `cv-program-manager.md` |
| 17 | Business Analyst | `business-analyst` | `cv-business-analyst.md` |
| 18 | Engineering Manager | `engineering-manager` | `cv-engineering-manager.md` |
| 19 | Head of AI / CTO | `head-of-ai` | `cv-head-of-ai.md` |
| 20 | AI Transformation Lead | `ai-transformation` | `cv-ai-transformation.md` |
| 21 | Digital Transformation Lead | `digital-transformation` | `cv-digital-transformation.md` |
| 22 | Freelance Consultant | `freelance` | `cv-freelance.md` |
| 23 | Design Agency / Studio | `design-agency` | `cv-design-agency.md` |
| C | Custom | `custom-{slug}` | `cv-custom-{slug}.md` |

For custom tracks: slugify the name (lowercase, spaces → hyphens).

If only 1 track is selected, also write a `cv.md` symlink-equivalent (copy the single track CV as `cv.md` too, as it's the universal fallback).

---

## Step 3: CV Collection

For each selected track, ask:

```
Track: {Track Name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Do you have a CV ready for this track, or should I create a stub?

  1. Paste your CV (text or markdown) → I'll format and save it
  2. Paste your LinkedIn URL → I'll extract key info from it
  3. Tell me about your experience → I'll draft a CV
  4. Use my existing cv.md as the base → I'll create a track-specific copy
  5. Create an empty stub → I'll fill it in later

Choice:
```

**For option 1–3:** Write the result to `cv-{track-id}.md` as clean markdown with sections:
- Summary, Experience, Projects, Education, Skills, Languages (if applicable)

**For option 4:** Copy `cv.md` content to `cv-{track-id}.md` verbatim.

**For option 5:** Create a stub:
```markdown
# CV — {Track Name}

<!-- Add your CV content here. Sections: Summary, Experience, Projects, Education, Skills -->
```

If multiple tracks share the same CV content, ask:
> "Same CV for all tracks, or different content per track?"

If same: collect once, copy to all track files.

---

## Step 4: Candidate Info

Ask (all on one screen, or fill defaults from existing `config/profile.yml`):

```
Personal details (press Enter to keep current value):

Full name      [{current or empty}]:
Email          [{current or empty}]:
Phone          [{current or empty}]:
Location       [{current or empty}]:
LinkedIn       [{current or empty}]:
GitHub         [{current or empty}]:
Portfolio URL  [{current or empty}]:
```

---

## Step 5: Narrative

Ask one at a time:

1. **Headline** (1 line): "How would you describe yourself professionally in one sentence?"
   - Example: "Full-stack engineer turned AI product builder"

2. **Exit story**: "What makes your background unique? What's the thread connecting your roles?"
   - Store in `narrative.exit_story`

3. **Superpowers**: "List your top 3–5 skills or traits that make you stand out."
   - Store as `narrative.superpowers[]`

4. **Proof points** (optional): "Any projects, articles, or case studies with measurable results?"
   - For each: name, URL, hero metric (e.g., "Reduced latency 40%")
   - Store as `narrative.proof_points[]`

---

## Step 6: Compensation

```
Compensation targets:

Target range   [{current}]: (e.g. €60K-80K or $120K-160K)
Currency       [{current}]: (EUR / USD / GBP / other)
Minimum        [{current}]: (walk-away number)
Flexibility    [{current}]: (Remote only / Hybrid / On-site ok)
```

---

## Step 7: Location & Visa

```
Location:

Country        [{current}]:
City           [{current}]:
Timezone       [{current}]:
Visa status    [{current}]: (e.g. "EU citizen - no sponsorship needed")
On-site        [{current}]: (e.g. "1 week/month possible")
```

---

## Step 8: Language / Market

```
Dans quelle langue job-os doit-il fonctionner ?

  1. Français (défaut) (modes/fr/)
  2. English (modes/)
  3. Deutsch / DACH (modes/de/)
  4. 日本語 (modes/ja/)
  5. Português (modes/pt/)
  6. Русский (modes/ru/)

[Appuyez sur Entrée pour garder le français par défaut] :
```

Default if no answer: French (`primary: fr`, `modes_dir: modes/fr`).
Set `language.primary` and `language.modes_dir` in `profile.yml` based on selection.

---

## Step 9: Portal Setup

Show the confirmed keyword set that will be added to `title_filter.positive` based on selected tracks:

**Track keyword map:**

| Track | Keywords added to title_filter.positive |
|-------|-----------------------------------------|
| AI / ML Engineer | AI, ML, LLM, Agent, Agentic, GenAI, NLP, MLOps, LLMOps, Voice AI |
| Software Engineer | Engineer, Developer, Full-stack, Backend, Frontend, SWE |
| Data Engineer | Data Engineer, ETL, Pipeline, dbt, Spark, Databricks |
| Data Scientist / Analyst | Data Scientist, Analyst, Analytics, BI, Business Intelligence |
| DevOps / Platform / SRE | DevOps, Platform, SRE, Infrastructure, Cloud, Kubernetes, Terraform |
| Security Engineer | Security, AppSec, Cloud Security, Pentester, SOC |
| Solutions Architect | Solutions Architect, Pre-Sales, Technical Architect |
| UX / UI Designer | UX, UI, User Experience, User Interface, Figma, Design |
| Product Designer | Product Designer, Interaction Design, Visual Design |
| Design Systems | Design System, Component Library, Storybook |
| UX Researcher | UX Research, User Research, Usability |
| Motion / Brand Designer | Motion, Animation, Brand, Visual Identity |
| Product Manager | Product Manager, PM, Product Owner, PO |
| Technical PM | Technical PM, TPM, Technical Product |
| AI Product Manager | AI PM, AI Product, Product AI |
| Program / Project Manager | Program Manager, Project Manager, PMO, Scrum Master |
| Business Analyst | Business Analyst, BA, Requirements, Functional Analyst |
| Engineering Manager | Engineering Manager, EM, Tech Lead, Team Lead |
| Head of AI / CTO | Head of AI, CTO, VP Engineering, Director of Engineering |
| AI Transformation Lead | AI Transformation, Digital Transformation, Change Management |
| Digital Transformation Lead | Digital Transformation, Innovation, Transformation Director |
| Freelance Consultant | Freelance, Consultant, Independent, Contractor |
| Design Agency / Studio | Creative Director, Art Director, Studio |

Display the merged list and ask:
> "Any keywords to add or remove before I configure the scanner?"

Then ask:
> "Any specific companies you want to track closely? (I'll add them to portals.yml with Playwright scan enabled)"

For each company entered: add entry to `tracked_companies` with `enabled: true`, `careers_url: ""` (to be discovered on first scan), `scan_method: "playwright"`.

---

## Step 10: Write All Files

Write in this order:

### 1. `config/profile.yml`

```yaml
candidate:
  full_name: "{name}"
  email: "{email}"
  phone: "{phone}"
  location: "{location}"
  linkedin: "{linkedin}"
  portfolio_url: "{portfolio}"
  github: "{github}"

tracks:
  - id: "{track-id}"
    name: "{Track Name}"
    cv_file: "cv-{track-id}.md"
    primary: true
  # ... repeat per track

target_roles:
  primary:
    # derived from track names
  archetypes:
    # derived from tracks (see _profile.md for details)

narrative:
  headline: "{headline}"
  exit_story: "{exit_story}"
  superpowers:
    - "{superpower 1}"
    # ...
  proof_points:
    - name: "{name}"
      url: "{url}"
      hero_metric: "{metric}"
    # ...

compensation:
  target_range: "{range}"
  currency: "{currency}"
  minimum: "{minimum}"
  location_flexibility: "{flexibility}"

location:
  country: "{country}"
  city: "{city}"
  timezone: "{timezone}"
  visa_status: "{visa}"

# language: (only if non-English)
#   primary: fr
#   modes_dir: modes/fr
```

### 2. `modes/_profile.md`

Use the template from `modes/_profile.template.md` as base. Replace the single archetype block with one section per selected track:

```markdown
# User Profile Context — job-os

<!-- THIS FILE IS YOURS. It will NEVER be auto-updated. -->

{for each selected track:}
## Track: {Track Name}

| Archetype | Thematic axes | What they buy |
|-----------|---------------|---------------|
| {Archetype 1} | {axes} | {value} |
| {Archetype 2} | {axes} | {value} |

**CV file:** `cv-{track-id}.md`

**Adaptive framing:**
| If the role is... | Emphasize about you... | Proof point sources |
|-------------------|------------------------|---------------------|
| {sub-role} | {emphasis} | cv-{track-id}.md |

{end for}

## Your Exit Narrative

{exit_story from profile.yml}

## Your Cross-cutting Advantage

{headline from profile.yml}
```

**Archetype defaults per track** (pre-fill in wizard, user can refine later):

| Track | Default archetypes |
|-------|--------------------|
| AI / ML Engineer | AI Platform/LLMOps · Agentic Workflows · ML Research · Applied AI |
| Software Engineer | Backend Engineer · Full-stack · Platform/Infra · Tech Lead |
| Data Engineer | Data Platform · Analytics Engineer · Streaming/Real-time · ML Infra |
| Data Scientist | Applied Scientist · Analyst · ML Engineer · Research Scientist |
| DevOps / SRE | Platform Engineer · SRE · Cloud Architect · DevSecOps |
| Security Engineer | AppSec · Cloud Security · Security Architect · Red Team |
| Solutions Architect | Pre-Sales SA · Enterprise Architect · Technical Advisor |
| UX / UI Designer | Product UX · Interaction Designer · UX/UI Generalist · Design Lead |
| Product Designer | End-to-end Product Designer · Visual Designer · Systems Thinker |
| Design Systems | DS Engineer · Component Architect · Design Ops |
| UX Researcher | User Researcher · Mixed-Methods · Insights Lead |
| Motion / Brand Designer | Motion Designer · Brand Designer · Creative Director |
| Product Manager | Growth PM · Platform PM · B2B PM · Consumer PM |
| Technical PM | API PM · Infrastructure PM · AI/ML PM |
| AI Product Manager | GenAI PM · LLM Product · AI Features Lead |
| Program Manager | Delivery Lead · Agile Coach · PMO |
| Business Analyst | Functional Analyst · Process Analyst · BA / PO |
| Engineering Manager | EM · Engineering Director · Team Lead |
| Head of AI / CTO | Head of Engineering · VP Eng · CTO · AI Director |
| AI Transformation | AI Strategy Lead · Transformation Director · Innovation Lead |
| Digital Transformation | CDO · Digital Strategy · Transformation Consultant |
| Freelance | Independent Consultant · Fractional CTO · Contractor |
| Design Agency | Creative Director · Art Director · Design Studio Lead |

### 3. `portals.yml`

Copy `templates/portals.example.yml` → `portals.yml` if it doesn't exist.

Update `title_filter.positive` with the merged keyword list from Step 9. Replace the default AI-only keywords with the union of all selected tracks' keywords. Keep existing custom keywords if re-running.

Add any companies from Step 9 to `tracked_companies`.

### 4. `data/applications.md` (only if missing)

```markdown
# Applications Tracker

| # | Date | Company | Role | Track | Score | Status | PDF | Report | Notes |
|---|------|---------|------|-------|-------|--------|-----|--------|-------|
```

(Added `Track` column to distinguish multi-track applications.)

### 5. CV stubs

Write each `cv-{track-id}.md` file from Step 3 output.

---

## Step 11: Validate

Run:

```bash
node doctor.mjs
```

Parse the output and display:

```
Health check results:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✓ Node.js version OK
  ✓ Dependencies installed
  ✓ Playwright ready
  ✓ config/profile.yml found
  ✓ modes/_profile.md found
  ✓ portals.yml found
  ✓ cv-{track-id}.md found   (one line per track CV)
  ✓ data/applications.md found

All checks passed. job-os is ready.

Next steps:
  /job-os scan       → discover new offers
  /job-os pipeline   → evaluate pending offers
  /job-os offre     → evaluate a single offer (paste URL or JD)
```

If any check fails, show the specific fix needed and offer to resolve it inline.

---

## Re-Run Behavior

When `config/profile.yml` already exists:

1. Load current values from `profile.yml`, `_profile.md`, `portals.yml`
2. Display current tracks and ask: "You're currently targeting: {track list}. Add tracks, remove tracks, or keep as-is?"
3. For new tracks added: run Steps 3 (CV) and update `_profile.md` + `portals.yml`
4. For removed tracks: ask "Remove {track} CV and archetype block? (existing reports are kept)"
5. Skip Steps 4–8 unless user explicitly says "update profile details" or "change language"
6. Always re-run Step 11 (validation)

**Data safety:** `data/`, `reports/`, `output/`, `interview-prep/` are NEVER touched during re-runs.

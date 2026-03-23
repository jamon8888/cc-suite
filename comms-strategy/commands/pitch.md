---
description: "Develop a compelling new business pitch — prospect research, strategic diagnosis, pitch narrative, fee structure, and presentation architecture."
argument-hint: "[prospect name] [brief description of the pitch]"
allowed-tools: Read, Write, Glob, Search
model: sonnet
---

# /comms:pitch — New Business Pitch Development

> If you see unfamiliar placeholders or need to check which tools are connected, see [CONNECTORS.md](../CONNECTORS.md).

Builds a complete new business pitch — from prospect intelligence to strategic diagnosis to pitch narrative and fee structure. Produces a Pitch Deck outline and supporting documents.

## Usage

```
/comms:pitch
/comms:pitch "Acme Corp" "brand strategy and PR for their European launch"
/comms:pitch "French luxury brand seeking digital comms refresh"
```

---

## How It Works

```
┌───────────────────────────────────────────────────────────────────┐
│                     PITCH DEVELOPMENT FLOW                        │
├───────────────────────────────────────────────────────────────────┤
│ 1. PROSPECT INTELLIGENCE                                          │
│    Company research + competitor audit + cultural moment         │
│        ↓                                                          │
│ 2. STRATEGIC DIAGNOSIS                                            │
│    What is their real problem? What opportunity are they missing? │
│        ↓                                                          │
│ 3. OUR POSITIONING                                                │
│    Why us? What is our unique angle on this challenge?           │
│        ↓                                                          │
│ 4. STRATEGIC RECOMMENDATION                                       │
│    What would we actually do? (High-level — enough to excite)    │
│        ↓                                                          │
│ 5. PROOF                                                          │
│    Case studies, data, credentials that make us credible         │
│        ↓                                                          │
│ 6. COMMERCIAL PROPOSAL                                            │
│    Scope, timeline, fees, team                                   │
│        ↓                                                          │
│ 7. PITCH DECK OUTLINE                                             │
│    Structured slide-by-slide architecture                        │
└───────────────────────────────────────────────────────────────────┘
```

---

## Pitch Build Process

### Step 1: Prospect Intelligence Gathering

Ask the user for:
1. Prospect company name + URL
2. The pitch opportunity (how it came about — RFP / cold / referral / event)
3. The brief or RFP (if any — paste or provide path)
4. Known decision-makers (names + titles if known)
5. Key competitors pitching (if known)
6. Pitch format and date

Then research the prospect:

**From public sources (standalone):**
- Website: About, News, CSR, Careers (hiring signals)
- Recent press coverage: `"[company]" news last 6 months`
- LinkedIn: Company page, key people, recent posts
- Annual report / investor relations (if listed)
- Glassdoor: Culture signals, management perception
- Reviews (Trustpilot, G2 if relevant)

**Synthesise into:**
- Company snapshot (size, stage, market, key people)
- Recent business context (launches, challenges, market moves)
- Comms current state (what are they saying? Are they saying it well?)
- Pain signals (what problems is their current comms creating?)
- Competitive context (who are their comms competitors?)

### Step 2: Strategic Diagnosis

Apply `brief-analyzer` and `competitive-comms` thinking to develop the strategic diagnosis:

**The diagnosis must answer:**
1. **What is their real business challenge?** (Not what they put in the brief — what's actually at stake)
2. **What is the communications gap?** (Why their current comms are failing to solve the business problem)
3. **What opportunity is being missed?** (What the competition isn't doing, what the audience wants that no one is giving them)
4. **What must change?** (The single most important shift required)

Present the diagnosis as a structured argument — the setup for the recommendation.

**Format:**
```markdown
## Our Strategic Diagnosis: [Prospect Name]

**The business challenge we see**: [1 sentence — their real commercial problem]

**The comms gap**: [Why their current communications approach is falling short]

**The missed opportunity**: [What's there to win if communications were done differently]

**What needs to change**: [The single insight that frames our recommendation]
```

### Step 3: Our Positioning for This Pitch

Pull from `data/2-Domaines/agency-profile.md` to define:
- **Why we are uniquely placed** to solve this specific challenge
- **What in our experience directly applies** (specific — not generic credentials)
- **What makes our approach different** from what other agencies will pitch

### Step 4: Strategic Recommendation

Develop a high-level strategic recommendation — enough to demonstrate strategic thinking, not so detailed it gives away the work for free.

Structure:
1. **The strategic platform** (2–3 lines — the foundation of all work)
2. **Our recommended approach** (overall direction, not execution details)
3. **Campaign/programme idea territory** (creative direction — enough to excite)
4. **PESO channel philosophy** (which channels, and why in this order)
5. **What this achieves** (how it addresses the business challenge)

### Step 5: Proof and Credentials

Pull relevant case studies from the agency portfolio:

**Case study format:**
```markdown
### [Case Study Name]

**Client**: [Name — or anonymised sector if confidential]
**Challenge**: [1 sentence]
**Our approach**: [2 sentences — what was strategically distinctive]
**Result**: [Quantified outcome — must include at least one number]
**Relevance to [Prospect]**: [Why this case is specifically relevant to the pitch]
```

Select maximum 3 case studies — the most precisely relevant, not the most impressive.

### Step 6: Commercial Proposal

Ask the user:
- What scope is being proposed? (Retained / Project / Retainer + project)
- What is the fee indication or budget signal from the prospect?
- Who is the pitch team?

Generate a commercial summary:

```markdown
## Commercial Proposal

### Scope of Work

**Phase 1: [Name]** — [Duration]
- [Deliverable 1]
- [Deliverable 2]
- [Deliverable 3]

**Phase 2: [Name]** — [Duration]
[Continue...]

### Team
| Role | Person | Seniority | Allocation |
|------|--------|-----------|-----------|
| Account lead | | | |
| Strategy | | | |
| Creative | | | |

### Investment

| Scope | Monthly fee | Total |
|-------|------------|-------|
| Phase 1 | | |
| Phase 2 | | |
| **Total** | | |

*Excludes third-party costs (media, production, events). A detailed budget breakdown is available on request.*
```

### Step 7: Pitch Deck Architecture

Output a slide-by-slide outline:

```markdown
## Pitch Deck Outline: [Prospect Name]

**Deck format**: [30-min live pitch / Async leave-behind / RFP response]
**Slides**: [Recommended total: 15–20 for live pitch]

### Slide 1: Cover
[Agency name + Prospect name + Date]

### Slides 2–3: We Understand You
[Strategic diagnosis — their challenge, framed with insight]
[Objective: show we've done the homework and we see what they might not]

### Slide 4: The Opportunity
[The insight-driven opportunity statement]

### Slide 5: Why Now
[The cultural or market moment that makes this the right time to act]

### Slides 6–8: Our Recommendation
[Strategic platform + approach + campaign idea territory]
[Use visuals / mood boards if available]

### Slide 9: The PESO Channel Mix
[How we'd deploy across paid/earned/shared/owned]

### Slide 10–11: Proof — Case Studies
[2–3 cases, each in 1 slide]

### Slide 12: Our Team
[Senior team members — photo, name, role, relevant experience]

### Slide 13: Why Us
[Our specific differentiator for this brief — not generic credentials]

### Slide 14: Investment
[Scope + fees — clear and confident]

### Slide 15: Next Steps
[What happens after this meeting]
```

---

## Output Files

Save to `data/1-Projets/pitches/[prospect]/`:
- `pitch-brief.md` — Strategic diagnosis + recommendation
- `pitch-deck-outline.md` — Slide-by-slide architecture
- `commercial-proposal.md` — Scope and fees
- `prospect-intelligence.md` — Research summary

---

## After the Pitch

Offer:
```
Pitch documents saved. Anything else?

→ I can draft talking points for each pitch section
→ I can write the leave-behind document
→ I can prepare follow-up communications after the pitch
→ If you win: /comms:start sets up the client engagement
```

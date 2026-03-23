---
name: audience-intelligence
description: >
  Use this skill when the user asks to "define our audience", "who are we talking to",
  "audience research", "build an audience portrait", "public cible", "portrait d'audience",
  "audience intelligence", "buyer persona", "segment our audience", or "who should we target".
  Also trigger when a brief defines an audience by demographics only (e.g. "women 25-45") —
  this always needs deepening. Builds complete audience portraits including B2B buying
  committees, psychographic segmentation by motivation (not characteristics), functional vs
  identity insight, and behavioral drivers. Feeds message-architecture, campaign-strategy,
  and media-landscape.
---

# Skill: Audience Intelligence

Builds Audience Portraits from brief signals and research. Goes beyond demographics to capture cultural codes, media habits, emotional drivers, and the tension that makes communications land. Distinguishes functional from identity motivations. Handles both B2C and B2B audiences with context-specific protocols.

## When to Use

- After `brief-analyzer` identifies target audiences
- Before defining message architecture
- When the brief defines audiences too broadly ("adults 18-65", "DRH and DSI")
- When planning a campaign for an unfamiliar segment
- When building a new business pitch for an unknown sector

---

## Step 0: B2C or B2B? Choose the right path

| Signal in brief | Path |
|----------------|------|
| Individuals, consumers, households | **B2C path** → Section 1 |
| Job titles, companies, buying roles | **B2B path** → Section 2 |
| Mixed (e.g. prosumer, freelance) | Run both, prioritise dominant path |

---

## Section 1 — B2C Audience Portrait

### 1a. Segment by Motivation, Not Demographics

Before building portraits, interrogate the audience definition:

> **Rule:** Never segment by demographics. Segment by motivation — what drives the decision.

- "Women 25-40" → Is that one segment or three? (career-focused / family-first / identity-seeker)
- "Young urban professionals" → Motivation split: status-seeking vs pragmatic efficiency vs values-driven
- If the brief gives you one segment, ask: *are there sub-groups with meaningfully different motivations?*

Define max **2 primary segments + 1 secondary** per campaign. Give each a **memorable archetype name**, not a demographic slice:
- ✗ "Femmes 28-38 CSP+"
- ✓ "La Pragmatique Épuisée" (works two jobs, zero patience for complexity, satisficing mindset)

### 1b. Build the Portrait

```
┌─────────────────────────────────────────────────────────────────────┐
│                        AUDIENCE PORTRAIT                            │
│                    [Archetype Name]                                 │
├─────────────────────────────────────────────────────────────────────┤
│ DEMOGRAPHICS                                                        │
│ Age range | Gender split | Geography | Income bracket               │
│ Education | Life stage | Professional status | Estimated volume     │
├─────────────────────────────────────────────────────────────────────┤
│ PSYCHOGRAPHICS                                                      │
│ Core values (what they believe)                                     │
│ Attitudes (how they see the world)                                  │
│ Aspirations (who they want to become)                               │
│ Fears and anxieties (what holds them back)                          │
├─────────────────────────────────────────────────────────────────────┤
│ FUNCTIONAL vs IDENTITY MOTIVATION                                   │
│ Functional: the problem they are solving (task-based)              │
│ Identity: who buying/using this product makes them (self-concept)  │
│ → Which dominates for this segment? (critical for message strategy) │
├─────────────────────────────────────────────────────────────────────┤
│ CULTURAL CODES                                                      │
│ References, movements, aesthetics they identify with               │
│ In-group language and vocabulary (their words, not brand words)    │
│ Cultural capital signals in this segment                            │
├─────────────────────────────────────────────────────────────────────┤
│ MEDIA BEHAVIOURS                                                    │
│ Primary channels (where they spend most time)                       │
│ Discovery channels (where they find new things)                     │
│ Content formats consumed (video / text / audio / image)            │
│ Trusted voices / communities / publications                         │
│ Mindset when consuming content on each channel                     │
├─────────────────────────────────────────────────────────────────────┤
│ RELATIONSHIP WITH CATEGORY                                          │
│ Awareness: [High / Medium / Low]                                    │
│ Current behaviour: [what they currently do/use]                    │
│ Perception of the brand: [if known]                                │
│ Decision drivers: [what makes them choose]                         │
│ Decision barriers: [what stops them]                               │
│ MOMENTS OF DOUBT: [hesitations just before purchase/conversion]    │
├─────────────────────────────────────────────────────────────────────┤
│ INSIGHT / TENSION                                                   │
│ Format: "[Audience] want [X] but [contradiction/unmet need]"       │
│ Test: Is this functional tension or identity tension?              │
│ Test: Would this audience be slightly uncomfortable to hear this?  │
│ (Good insights are slightly uncomfortable — they name what's unspoken) │
├─────────────────────────────────────────────────────────────────────┤
│ TRIGGER POINTS                                                      │
│ Category Entry Points: specific moments that initiate buying       │
│ Life triggers: events that increase receptivity                    │
│ Seasonal / contextual: when are they most reachable?               │
├─────────────────────────────────────────────────────────────────────┤
│ BEHAVIORAL LAYER (link with behavioral-strategy skill)             │
│ Real Why: [5-level analysis — what's the actual driver?]           │
│ System 1 profile: [first feeling when encountering this category]  │
│ Active biases: [Anchoring / Loss aversion / Availability / ...]    │
│ Satisficing threshold: [what "good enough" looks like for them]    │
└─────────────────────────────────────────────────────────────────────┘
```

### 1c. Insight Quality Test

Apply before accepting any insight:

| Test | Question | Pass criteria |
|------|----------|--------------|
| **Not obvious** | Would a casual observer have said this without research? | No → good sign |
| **Not PR-able** | Would the brand use this exact phrase in marketing? | No → good sign |
| **Tension-filled** | Is there a real contradiction inside the insight? | Yes → required |
| **Functional OR Identity** | Can you name which type it is? | Named → required |
| **Slightly uncomfortable** | Would the audience recognise it AND feel slightly exposed? | Yes → best sign |

---

## Section 2 — B2B Audience Protocol

B2B audiences are fundamentally different: the "audience" is a **buying committee**, not an individual. The motivations of each role diverge sharply.

### 2a. Map the Buying Committee

For each B2B brief, identify:

| Role | Job | Their objective | Their fear | Influence on decision |
|------|-----|-----------------|------------|----------------------|
| **Economic Buyer** (DG, DAF, CEO) | Approves budget | ROI, strategic fit | Wasted budget, board scrutiny | Final say |
| **Technical Buyer** (DSI, CTO, Archi) | Evaluates fit | Technical integration, security | Shadow IT, vendor lock-in | Gates shortlist |
| **User Buyer** (DRH, équipes) | Lives with it daily | Adoption ease, time saved | Change resistance in teams | Can kill implementation |
| **Champion** (Internal advocate) | Wants it to succeed | Career advancement | Sponsors a failure | Drives internal case |
| **Gatekeeper** (Achat, Juridique) | Controls access | Process compliance, risk | Responsibility for bad deal | Can delay indefinitely |

> For each brief: identify which roles are in play and which is the priority comms target (often the Champion or User Buyer, not the Economic Buyer).

### 2b. Segment by Attitude to Change, Not by Sector

The real B2B segmentant is **attitude toward the change the product requires**:

| Segment | Profile | Message strategy |
|---------|---------|-----------------|
| **Early Adopter** | Sees change as opportunity, references peers, experiments | Lead with vision + proof of ROI |
| **Pragmatic Majority** | Risk-averse, needs social proof, moves when peers do | Lead with peer case studies + low switching cost |
| **Late Majority** | Change-resistant, demands proven reliability | Lead with risk of NOT changing + references in their exact context |
| **Skeptic/Laggard** | Actively resists, defends status quo | Don't target — convert through their champion |

### 2c. B2B Specific Fields

Add to standard portrait:

```
BUYING PROCESS
Typical sales cycle: [weeks/months/quarters]
Number of people in decision: [N]
Key evaluation criteria: [formal RFP criteria vs informal preferences]
Incumbent advantage level: [High/Medium/Low — are they switching or choosing fresh?]

PROFESSIONAL FEARS (beyond the rational)
Status risk: [could this decision damage their reputation if it fails?]
Competency signal: [does choosing this brand make them look cutting-edge or reckless?]
Internal political risk: [who loses influence if this is implemented?]

VOICE OF CUSTOMER SOURCES
G2/Trustpilot/Gartner Peer Insights reviews for the category
LinkedIn comments on industry thought leaders
Conference presentation topics (what problems are presented as unsolved?)
```

---

## Research Process

### Signal Mining (B2C + B2B)

**Primary:** Reddit, LinkedIn comments, Twitter/X threads, Trustpilot/G2 reviews, Amazon reviews (for adjacent products)

**What to look for:**
- Their exact vocabulary (not brand vocabulary)
- Frustrations that NO competitor addresses
- The language of their complaints (reveals what they care about)
- What 5-star reviews celebrate (reveals what delights them)

**B2B specific:** LinkedIn thought leadership comments, Gartner/Forrester reports, trade press reader letters, conference session titles, job posting language (reflects what skills/problems the company is trying to solve)

### Archetype Narrative (150 words, second person)

Write "You are..." addressing the archetype directly. Capture the tension, the aspiration, and the emotional state that makes them reachable. This should feel slightly uncomfortable to read if you're in that audience — that's the sign it's specific enough.

---

## Output

Save to `data/1-Projets/clients/[client]/audience-portrait.md`

Structure:
1. **Segmentation Rationale** — why these segments, by motivation
2. **Portrait(s)** — full portraits using frameworks above
3. **Buying Committee Map** (B2B only)
4. **Insight Statements** — 3 tension-based insights usable as creative springboards
5. **CEPs Summary** — Category Entry Points by segment
6. **Behavioral Layer** — System 1 profile + Real Why per segment (or flag: "run behavioral-strategy skill for depth")
7. **Research Sources** — with quality rating
8. **Gaps and Caveats** — what we don't know

---

## Integration Points

- **Receives from**: `brief-analyzer` (audience seeds), `behavioral-strategy` (System 1 profile, Real Why)
- **Feeds into**: `message-architecture`, `media-landscape`, `campaign-strategy`, `stakeholder-mapper`
- **Triggered by**: `/comms:audience`, `/comms:strategy`

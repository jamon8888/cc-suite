---
name: brand-voice-auditor
description: >
  Use this skill when the user asks about "brand voice", "tone of voice", "audit our
  communications", "define our voice", "charte éditoriale", "voix de marque", "brand
  personality", "TOV audit", "our communications feel inconsistent", or "we don't sound
  like ourselves". Also trigger when brand samples contain regulated-sector language
  (medical, financial, legal, pharmaceutical) — these require an industry constraints
  layer. Produces a Brand Voice Charter with sector-specific adaptations and crisis
  voice protocol.
---

# Skill: Brand Voice Auditor

Analyzes existing brand communications to extract and codify a unique voice profile. Produces a Brand Voice Charter that includes personality traits, tonal dimensions, vocabulary, do/don't examples, a **crisis voice adaptation**, and — for regulated sectors — an **industry constraints layer**.

## When to Use

- Onboarding a new brand client
- Before any content production (agency, brand team, AI-assisted)
- When brand feels inconsistent across channels or markets
- When multiple agencies need a shared voice reference
- When rebranding changes the communication register

---

## Prerequisites

Minimum **5 communication samples** of varied types:

| Sample type | Qty | Why |
|------------|-----|-----|
| Press releases | 2–3 | Reveals formal register |
| Social posts (brand account) | 5–10 | Reveals everyday personality |
| Executive speech or interview | 1–2 | Reveals values and leadership voice |
| Website About/Mission section | 1 | Reveals self-definition |
| Customer-facing email | 1–2 | Reveals service register |
| Advertising copy | 1–2 | Reveals emotional register |
| Internal comms / employee content | 1 (if available) | Reveals culture gap |

---

## Step 1: Sector Classification

Before auditing, identify if this brand operates in a regulated sector:

| Sector | Key constraints | Impact on voice |
|--------|----------------|-----------------|
| **Healthcare / MedTech** | RGPD santé, ANSM rules, HAS guidelines, secret médical | Cannot make medical claims; must distinguish HCP vs patient comms |
| **Pharmaceuticals** | Code de la Santé Publique, ASL/ANSM approval, no off-label | All claims require approved language; specific legal wording required |
| **Financial services** | AMF, ACPR regulations, MiFID II | Past performance caveats; cannot promise returns; specific disclosure requirements |
| **Legal sector** | Déontologie, Ordre des Avocats | Cannot advertise outcomes; specific confidentiality language |
| **Food / Nutrition** | ANSES, EU Regulation 1924/2006 (health claims) | Only approved health claims permitted |
| **Education** | RGPD (minors), public/private sector rules | Specific consent language for minors |
| **General / Unregulated** | Standard RGPD + droit à l'image | Standard voice constraints apply |

For regulated sectors, add the **Industry Constraints Layer** (Section 6) before finalising the charter.

---

## Step 2: Voice Dimension Scoring

Rate the brand 1–5 on 6 pairs. Score reflects actual communications, not desired positioning. Provide 1–2 sample evidences per rating.

| Dimension | 1 (left) ←——→ 5 (right) | Score | Evidence |
|-----------|----------------------|-------|---------|
| Formal ←——→ Conversational | | | |
| Serious ←——→ Playful | | | |
| Direct ←——→ Nuanced | | | |
| Ambitious ←——→ Humble | | | |
| Expert ←——→ Accessible | | | |
| Warm ←——→ Cool | | | |

---

## Step 3: 4 Personality Traits

Distil the voice into **4 personality adjectives** — what the brand IS. For each:

```markdown
### Trait [N]: [Adjective]

The brand is [adjective] because [reason rooted in positioning].

Evidence from samples:
> "[Quote under 15 words from sample]"

What it sounds like: [Describe the texture, not the adjective]

What it is NOT: [The anti-pattern — what overdoing this looks like]
Overdone, this becomes: [Risk label — e.g., "arrogant", "flippant", "preachy"]
```

---

## Step 4: Voice Anti-Patterns

The "we are NOT" definitions are as important as the traits:

| We are... | We are NOT... | Wrong example | Right example |
|-----------|--------------|--------------|--------------|
| [Trait 1] | [Anti-pattern] | [Sample of wrong approach] | [Sample of right approach] |
| ... | ... | ... | ... |

---

## Step 5: Vocabulary Charter

**Green List** — words, phrases, and sentence starters that are on-brand:
- [Word/phrase 1], [Word/phrase 2]...
- Preferred sentence starters: [List]
- Approved ways to describe the product/service: [List]

**Red List** — words never to use, with reason:
- Generic claim words (innovative, leading, best-in-class, seamless, robust) — **always banned**
- Sector-specific overused words: [List based on audit]
- Competitor vocabulary: [List — never borrow their territory]
- Words that contradict a trait: [e.g., if "humble", ban "unrivalled"]

---

## Step 6: Context Adaptations

| Context | Register | Emotion level | Formality | Specific guidance |
|---------|---------|--------------|-----------|------------------|
| Media / Press releases | | | | |
| LinkedIn | | | | |
| Instagram/TikTok | | | | |
| Executive speeches | | | | |
| **Crisis communications** | | | | |
| Internal comms | | | | |
| Customer service | | | | |
| B2B pitches / proposals | | | | |

### Crisis Voice Adaptation (Required)

In a crisis, brands lose their personality and revert to legal-speak. Define in advance what the brand sounds like under pressure:

```
CRISIS VOICE PROTOCOL

Which traits MUST survive in a crisis communication? (Max 2)
→ [Trait A]: because abandoning it would feel dishonest/evasive
→ [Trait B]: because it's needed to rebuild trust

Which traits are SUSPENDED in a crisis? (Those that feel tone-deaf)
→ [Trait C]: suspend because [reason — e.g., playfulness is inappropriate in safety crisis]

Crisis register: [Specific description]
What the brand NEVER says in a crisis: [List]
Approved first words in any crisis statement: [Template opening]
```

---

## Step 7: Industry Constraints Layer (Regulated Sectors Only)

Complete this section when Section 1 identified a regulated sector:

```
INDUSTRY VOICE CONSTRAINTS

Sector: [Healthcare / Pharma / Finance / Legal / Food / Other]
Primary regulatory body: [ANSM / AMF / ACPR / Ordre des Avocats / ANSES / other]

Mandatory language requirements:
- [Specific phrases required by regulation, e.g., "Les performances passées ne préjugent pas..."]
- [Required caveats, e.g., "Ce médicament est un produit de santé..."]
- [Required disclaimers for advertising]

Prohibited claim types:
- [What the brand legally cannot say, e.g., cannot claim clinical efficacy without ANSM approval]
- [Outcome promises prohibited, e.g., "We will win your case"]

Channel-specific constraints:
- Social media: [Any platform-specific rules for this sector]
- Advertising: [Pre-approval requirements, if any]
- Events: [Speaker/sponsorship restrictions]

Approval chain for communications:
[Define who must approve content before publication — legal, compliance, medical affairs, etc.]
```

---

## Step 8: Bilingual Coherence (FR/EN brands)

For brands communicating in both FR and EN:
- Flag words where the emotional charge differs between languages
- Identify tonal gaps (FR formal contexts ≠ EN formality)
- Provide parallel examples in both languages

---

## Output: Brand Voice Charter

Save to `data/1-Projets/clients/[client]/voice-charter.md`

Structure:
1. **Sector Classification + Industry Constraints** (if applicable)
2. **Voice Dimension Map** — 6-dimension scoring
3. **4 Trait Profiles** — with evidence and anti-patterns
4. **Vocabulary Charter** — Green / Red lists
5. **Context Adaptation Matrix**
6. **Crisis Voice Protocol**
7. **Do/Don't Examples** — 10–15 concrete pairs
8. **Audit Findings** — Current-state gaps and inconsistencies

---

## Integration Points

- **Receives from**: Brand samples, `brief-analyzer` (personality cues)
- **Feeds into**: `message-architecture`, `campaign-strategy`, all content production
- **Triggered by**: `/comms:start`, `/comms:strategy`, `/comms:brief`

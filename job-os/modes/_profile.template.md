# User Profile Context -- job-os

<!-- ============================================================
     THIS FILE IS YOURS. It will NEVER be auto-updated.
     
     Customize everything here: your archetypes, narrative,
     proof points, negotiation scripts, location policy.
     
     The system reads _shared.md (updatable) first, then this
     file (your overrides). Your customizations always win.
     ============================================================ -->

## Your Tracks

<!-- The /job-os setup wizard populates this automatically.
     Each track has its own CV file, archetype table, and adaptive framing.
     Add or remove tracks by running /job-os setup again. -->

<!-- ════════════════════════════════════════════════════════════
     TRACK TEMPLATE — copy this block for each of your tracks
     ════════════════════════════════════════════════════════════

## Track: {Track Name}

**CV file:** `cv-{track-id}.md`

| Archetype | Thematic axes | What they buy |
|-----------|---------------|---------------|
| **{Archetype 1}** | {skills / focus areas} | {value delivered to employer} |
| **{Archetype 2}** | {skills / focus areas} | {value delivered to employer} |

| If the role is... | Emphasize about you... | Proof point sources |
|-------------------|------------------------|---------------------|
| {sub-role} | {what to lead with} | cv-{track-id}.md |

════════════════════════════════════════════════════════════ -->

<!-- DEFAULT EXAMPLE TRACKS — replace with yours via /job-os setup -->

## Track: AI / ML Engineer

**CV file:** `cv-ai-engineer.md`

| Archetype | Thematic axes | What they buy |
|-----------|---------------|---------------|
| **AI Platform / LLMOps** | Evaluation, observability, reliability, pipelines | Someone who puts AI in production with metrics |
| **Agentic Workflows** | HITL, tooling, orchestration, multi-agent | Someone who builds reliable agent systems |
| **Applied AI / ML** | Model training, fine-tuning, inference optimization | Someone who improves model quality at scale |
| **AI Solutions Architect** | Hyperautomation, enterprise, integrations | Someone who designs end-to-end AI architectures |

| If the role is... | Emphasize about you... | Proof point sources |
|-------------------|------------------------|---------------------|
| Platform / LLMOps | Production systems builder, observability, evals | article-digest.md + cv-ai-engineer.md |
| Agentic / Automation | Multi-agent orchestration, HITL, reliability | article-digest.md + cv-ai-engineer.md |
| Solutions Architect | System design, integrations, enterprise-ready | article-digest.md + cv-ai-engineer.md |
| Applied AI / ML | Model quality, fine-tuning, benchmark improvements | cv-ai-engineer.md |

<!-- Add more tracks below. Example:

## Track: UX / UI Designer

**CV file:** `cv-ux-designer.md`

| Archetype | Thematic axes | What they buy |
|-----------|---------------|---------------|
| **Product UX** | End-to-end design, research, delivery | Someone who ships user-centered products |
| **Interaction Designer** | Flows, prototyping, usability | Someone who reduces friction and increases conversion |
| **Design Lead** | Systems thinking, team collaboration, stakeholder alignment | Someone who elevates the whole product |

| If the role is... | Emphasize about you... | Proof point sources |
|-------------------|------------------------|---------------------|
| Product UX | Full-cycle: discovery → delivery → iteration | cv-ux-designer.md |
| Interaction Design | Prototyping speed, usability testing, A/B results | cv-ux-designer.md |
| Design Lead | Cross-functional influence, design system ownership | cv-ux-designer.md |

-->

## Your Exit Narrative

<!-- Replace with YOUR story. This frames everything. -->

Use the candidate's exit story from `config/profile.yml` to frame ALL content:
- **In PDF Summaries:** Bridge from past to future
- **In STAR stories:** Reference proof points from article-digest.md
- **In Draft Answers:** The transition narrative appears in the first response

## Your Cross-cutting Advantage

<!-- What's your "signature move"? What do you do that others can't? -->

Frame profile as **"Technical builder with real-world proof"** that adapts framing to the role.

## Your Portfolio / Demo

<!-- If you have a live demo, dashboard, or public project:
     url: https://yoursite.dev/demo
     password: demo-2026
     when_to_share: "LLMOps, AI Platform roles" -->

If you have a live demo/dashboard (check profile.yml), offer access in applications for relevant roles.

## Your Comp Targets

<!-- Research comp ranges for YOUR target roles -->

**General guidance:**
- Use WebSearch for current market data (Glassdoor, Levels.fyi, Blind)
- Frame by role title, not by skills
- Contractor rates are typically 30-50% higher than employee base

## Your Negotiation Scripts

<!-- Adapt to YOUR situation, currency, location -->

**Salary expectations:**
> "Based on market data for this role, I'm targeting [RANGE from profile.yml]. I'm flexible on structure -- what matters is the total package and the opportunity."

**Geographic discount pushback:**
> "The roles I'm competitive for are output-based, not location-based. My track record doesn't change based on postal code."

**When offered below target:**
> "I'm comparing with opportunities in the [higher range]. I'm drawn to [company] because of [reason]. Can we explore [target]?"

## Your Location Policy

<!-- Adapt to YOUR situation -->

**In forms:**
- Follow your actual availability from profile.yml
- Specify timezone overlap in free-text fields

**In evaluations (scoring):**
- Remote dimension for hybrid outside your country: score **3.0** (not 1.0)
- Only score 1.0 if JD says "must be on-site 4-5 days/week, no exceptions"

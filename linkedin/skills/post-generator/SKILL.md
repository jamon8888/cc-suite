---
name: post-generator
description: "This skill should be used when generating a LinkedIn post. Produces 3 hook variations, a full draft, CTA, and format recommendation."
---

# Post Generator — LinkedIn Authority Architecture

## Mandatory Context Load

Before writing ANY post:
1. Read `${CLAUDE_PLUGIN_ROOT}/data/linkedin-profile.json` → content_pillars, posting_config
2. Detect copywriter plugin: Glob for `copywriter/.claude-plugin/plugin.json` relative to CLAUDE_PLUGIN_ROOT parent
   - If found: Read `copywriter/data/voice-dna.json` → tone, forbidden_words, signature_phrases, sentence_structure
   - If found: Read `copywriter/data/icp.json` → pain_points, vocabulary, job_titles
   - If found: Read `copywriter/data/business-profile.json` → offer, primary_cta, positioning
3. If copywriter not found: Read local equivalents from `${CLAUDE_PLUGIN_ROOT}/data/` (may be empty)
4. Read `${CLAUDE_PLUGIN_ROOT}/data/learnings.json` → prompt_directives (inject into generation)
5. Read `${CLAUDE_PLUGIN_ROOT}/data/analytics.json` → summary (for schedule suggestion)

## Input

Receives from content-agent: `{ topic, template, tone, angle, cta_type }` (selected by content-strategy skill).

## Phase 1: Hook Generation (ALWAYS 3)

Read `references/hook-formulas.md`.

Generate exactly 3 distinct hooks using DIFFERENT types from the formulas.

Label each:
- **Hook contrarian** — ...
- **Hook specificite** — ...
- **Hook story** — ...

Recommend one with 1-sentence rationale based on topic fit and learnings.json patterns.

## Phase 2: Format Detection

Scan content for format fit BEFORE writing the full post:

| Signal dans le contenu | Format recommande |
|----------------------|-------------------|
| Liste numerotee 4+ items | **Carrousel** |
| Processus etape par etape | **Carrousel** |
| Comparaison A vs B | **Carrousel** |
| Histoire personnelle | **Post texte** |
| Hot take / opinion | **Post texte** |
| Donnees / stats | **Carrousel** |

Output: "**Format recommande: [format]** — [justification en 1 phrase]."

## Phase 3: Draft

Structure: Hook recommande → Story/Insight → Preuve → CTA (de references/cta-library.md) → P.S. optionnel

Read `references/formatting-guide.md` and apply ALL rules:
- Max 2 lignes par paragraphe
- Ligne vide entre paragraphes
- Anti-slop: verifier chaque phrase contre les mots interdits
- Emojis: 0-3 max
- Hashtags: 3-5 a la fin
- "Lien en commentaire" (jamais dans le corps)

Apply voice-dna if loaded:
- Match tone, sentence_length, rhetorical_mechanisms
- Avoid forbidden_words
- Use signature_phrases where natural

## Phase 4: Audit Algorithmique

Read `references/formatting-guide.md` for length targets.

Check:
- [ ] Longueur dans la fourchette du type de post
- [ ] < 25 newlines total
- [ ] < 3000 caracteres
- [ ] Hook < 140 caracteres
- [ ] Pas de mots slop
- [ ] CTA est specifique (pas "Qu'en pensez-vous ?")
- [ ] Hashtags en fin de post uniquement

## Output Format

```
# LinkedIn Post Draft

**Audience cible**: [icp.job_titles ou pillier]
**Template**: [nom]
**Ton**: [ton]
**Format**: [texte/carrousel]

---

### Hook 1 (contrarian) ⭐ Recommande
[hook text]

### Hook 2 (specificite)
[hook text]

### Hook 3 (story)
[hook text]

---

[Post complet avec hook recommande]

---

**Compteur**: [X]/3000 caracteres | [Y] mots | [Z] newlines
**Suggestion horaire**: [jour] a [heure] (basee sur analytics.json)
```

---
name: seo-blog-writer
description: "This skill should be used when the user asks to 'write a blog post', 'SEO article about', or 'thought leadership post'."
model: sonnet
---

# SEO Blog Writer

This skill creates high-ranking, authoritative blog content. It doesn't just "write a post"; it constructs a semantic resource optimized for Google's E-E-A-T guidelines.

```
┌─────────────────────────────────────────────────────────────────┐
│  STANDALONE (always works)                                      │
│  ✓ E-E-A-T Structure: Automatic "Experience" injection.         │
│  ✓ SEO Optimization: Keyword placement & header hierarchy.      │
│  ✓ Anti-Slop Check: Filters corporate jargon automatically.     │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (connect ~~web_search / WordPress)                │
│  + Live Research: Cites real-time stats and news.               │
│  + Competitor Gap Analysis: Reads top 3 results to beat them.   │
│  + Auto-Publish: Deploys directly to your CMS via MCP.          │
└─────────────────────────────────────────────────────────────────┘
```

## 🛠 Triggers

- "Write a blog post about [Topic]"
- "Turn this transcript into an SEO article"
- "Update this old post to rank better"
- "Create a content outline for [Keyword]"

## 🛠 Agent Instructions

### Before Writing

1.  **Load Context Profiles**:
    - Read `${CLAUDE_PLUGIN_ROOT}/data/2-Domaines/voice-dna.json` to match the user's voice precisely.
    - Read `${CLAUDE_PLUGIN_ROOT}/data/2-Domaines/icp.json` to align with the audience's pain points.
    - Read `${CLAUDE_PLUGIN_ROOT}/data/2-Domaines/business-profile.json` to ensure alignment with offers.
2.  **Check Source Material**:
    - If repurposing, search `${CLAUDE_PLUGIN_ROOT}/data/3-Resources/`.
    - If researching, use `exa-search-expert` or `web_search`.

### 2. SEO Parameters

Before writing, define or generate:

**Search Intent:**
- **Informational** → "How to X", "What is Y" → Target 1500–3000 words, no hard CTA
- **Commercial** → "Best X for Y", "X vs Y" → Target 1200–2000 words, product/service CTA
- **Transactional** → "Buy X", "X pricing" → Target 800–1500 words, conversion CTA

**Keyword Research (standalone):**
If secondary keywords are not provided, generate them using this method:
1. Take the primary keyword and ask: what related topics would someone search before and after this?
2. Use the structure: `[primary] + [modifier]` — modifiers: "best", "how to", "for [audience]", "without [pain]", "vs [alternative]"
3. Generate 5 LSI keywords in this format: `[keyword] — [search intent] — [estimated difficulty: Low/Med/High]`

**Target word count by competition level:**
- Low competition keyword → 1000–1500 words (outrank with depth)
- Medium competition → 1500–2500 words (match the field)
- High competition → 2500–4000 words (out-comprehensive)

**Schema Markup suggestions (2026):**
- How-to guides → `HowToSchema` (Google rich result)
- FAQ sections → `FAQPageSchema` (accordion in SERP)
- Lists/comparisons → `ItemListSchema`
- Articles with author/date → `ArticleSchema` (E-E-A-T signal)
→ Always suggest the relevant schema at the end of the outline.

---

## 🏛 The "Rank-Worthy" Architecture

Rank-worthy content follows a specific psychological and structural flow.

### Phase 1: The Hook & Introduction

- **The Problem**: Address `{{icp.pain_points}}` immediately.
- **The Agitation**: Why hasn't it been solved yet?
- **The Solution**: Your unique mechanism.
- **The Promise**: "By the end of this guide, you will..."

### Phase 2: The Meat (H2s and H3s)

- **Structure**: Use logical headers.
- **Snippet Bait**: Definitive answers placed immediately after headers.
- **Anti-Slop**: Compare constantly against `{{voice_dna.forbidden_words}}`.

### Snippet Bait (Position 0 Targeting)

After each major H2, place a direct answer block formatted for Google featured snippets:

```markdown
## [H2 Title: e.g., What is X?]

**[Concise direct answer in 40-60 words, starting with the H2 keyword]**
[Definition or answer that Google can extract directly as a featured snippet]

[Expand with detail, examples, and depth below]
```

Rules:
- Start the answer paragraph with the exact H2 keyword
- Keep it 40–60 words — the sweet spot for featured snippets
- Answer the question completely in those 60 words — even if you elaborate after
- For list questions: use a numbered or bulleted list immediately after the H2 — Google pulls lists verbatim

**Schema markup integration:**
- H2 FAQ sections → tag for `FAQPageSchema` (append suggestion at article end)
- Step-by-step H2 sections → tag for `HowToSchema`

### Internal + External Link Strategy

**Internal links (3–5 per article):**
- Link to existing cornerstone pages (your best-performing content on related topics)
- Use descriptive anchor text: "how to build a content calendar" not "click here"
- If no relevant internal content exists: note it as "Content gap — consider writing [topic]"
- Never link to `data/3-Resources/` in the article output — those are drafts, not live pages

**External links (2–3 per article):**
- Link to primary sources: studies, official data, original research
- Avoid linking to direct competitors
- Link opens in new tab for long-form articles

---

### Phase 3: The Conclusion & CTA

- **Summary**: Recap main takeaways.
- **CTA**: Connect value to `{{business.primary_cta}}`.

---

## ✍️ Step-by-Step Writing Process

### Step 1: Outline Generation

Create a skeletal outline.

1.  **H1 Title**: Must include Primary Keyword.
2.  **Meta Description**: <160 chars.
3.  **Header Hierarchy**: List H2s/H3s.

### Step 2: Drafting (The Deep Work)

Write section by section.

- **Tone Check**: Ensure `{{voice_dna.tone}}` is respected.
- **Experience**: Use "I" statements to demonstrate E-E-A-T.

### Step 3: Optimization

- **Internal Links**: Suggest linking to `data/3-Resources`.
- **External Links**: Cite 2-3 authoritative sources.

---

## 📝 Output Format

Deliver the final artifact as a Markdown file.

```markdown
# [Title]

**Meta Description**: [Text]
**Slug**: [url-slug]
**Primary Keyword**: [Keyword]

---

[Introduction matching {{voice_dna.tone}}]

## [H2 Header]

[Content addressing {{icp.pain_points}}...]

> [!TIP]
> [Actionable advice]

## Conclusion

[Summary]

**[CTA Headline]**
[CTA Body aligned with {{business.primary_cta}}]
[Link]
```

---
name: wordpress-publisher
description: "This skill should be used when the user asks to 'publish to WordPress', 'post to WordPress', or 'push this to my blog'."
model: sonnet
---

# WordPress Publisher

Takes a Markdown artifact (Blog Post, Page) and facilitates its publication to your WordPress CMS.

```
┌─────────────────────────────────────────────────────────────────┐
│  STANDALONE (always works)                                      │
│  ✓ Markdown Conversion: Clean HTML generation for Gutenberg.    │
│  ✓ Meta Data Prep: Generates Slugs, Excerpts, and Alt Text.     │
│  ✓ Category Matching: Aligns with your SEO pillar strategy.     │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (connect ~~wordpress_mcp)                         │
│  + Direct Publish: Pushes content to your live site (Draft/Pub).│
│  + Image Upload: Uploads and links media assets automatically.  │
│  + SEO Plugin Sync: Updates Yoast/RankMath fields directly.     │
└─────────────────────────────────────────────────────────────────┘
```

## 🛠 Triggers

- "Publish this post to WordPress"
- "Prepare this draft for the blog"
- "Upload this to my site as a draft"

## 🛠 Agent Instructions

### Before Publishing

1.  **Load Business Context**:
    - Read `${CLAUDE_PLUGIN_ROOT}/data/2-Domaines/business-profile.json`.
    - Extract: `website_url` and `blog_categories`.

### 2. Pre-Publish Checklist

Before publishing, ensure:

- **Title**: Exists and is SEO optimized.
- **Slug**: is kebab-case.
- **Images**: Have alt text.

---

## 🔄 Workflow

### Step 1: Format Conversion

Convert Markdown to HTML (if API requires) or clean Gutenberg blocks.

- `# Heading` -> `<h1>`
- `**Bold**` -> `<strong>`
- `> Quote` -> `<blockquote>`

### Step 2: Category & Tag Assignment

- Match content keywords to `{{business.blog_categories}}`.
- If no match found, suggest creating a new category.

### Step 3: Deployment

- **Action**: Call `wordpress_create_post` (via MCP).
- **Status**: Set to `draft` (Default) or `publish` (if requested).

---

## 📝 Output Format

```markdown
# 🚀 Publish Status

**Destination**: {{business.website_url}}
**Status**: [Draft/Published]
**Link**: [URL]

## ✨ Meta Data

- **Category**: [Category]
- **Tags**: [Tag1, Tag2]
- **Slug**: [slug]

> [!TIP]
> Go to your dashboard to add the Featured Image before hitting publish.
```

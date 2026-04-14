---
name: docx
description: |
  Create professionally formatted Word documents (.docx) with title pages, headings,
  tables, page numbers, and executive-grade formatting.
  Triggers when user mentions:
  - "create a Word document"
  - "generate a .docx"
  - "format this as a Word report"
---

# Docx — Word Document Generator

Create polished, client-ready Word documents using python-docx.

## Prerequisites

```bash
pip install python-docx
```

## Usage

Write a JSON specification file and invoke the script:

```bash
python skills/docx/scripts-claude-code-only/create_docx.py spec.json output.docx
```

## Document Specification Format

```json
{
  "title_page": {
    "title": "Strategic Assessment: European EV Market Entry",
    "subtitle": "Confidential - Prepared for Board of Directors",
    "client": "Acme Corp",
    "date": "March 2026",
    "confidentiality": "CONFIDENTIAL - Do not distribute"
  },
  "sections": [
    {
      "heading": "Executive Summary",
      "level": 1,
      "content": [
        {"type": "paragraph", "text": "The European EV market presents..."},
        {"type": "table", "headers": ["Region", "Size"], "rows": [["Europe", "$180B"]]},
        {"type": "bullets", "items": ["First point", "Second point"]},
        {"type": "callout", "text": "This is an estimate.", "style": "warning"}
      ]
    }
  ],
  "research_notes": [
    {"id": 1, "quote": "Market reached $500B", "source": "Bloomberg NEF", "date": "Jan 2025", "url": "https://...", "cs_score": "CS-1", "status": "VERIFIED"}
  ],
  "options": {
    "font_name": "Calibri",
    "font_size": 11,
    "include_page_numbers": true,
    "include_toc": true
  }
}
```

## Content Block Types

- `paragraph` — Regular text
- `heading` — Section heading (level 1-3)
- `table` — Formatted table with headers
- `bullets` — Bullet list
- `numbered` — Numbered list
- `callout` — Note/warning (styles: info, warning, critical)
- `page_break` — Page break
- `separator` — Horizontal rule

## Formatting

- Body: Calibri 11pt
- Heading 1: 16pt, bold, dark blue
- Heading 2: 13pt, bold, dark blue
- Heading 3: 11pt, bold, medium blue
- Tables: Dark blue header, alternating row shading
- Page numbers: Bottom center, "Page X of Y"

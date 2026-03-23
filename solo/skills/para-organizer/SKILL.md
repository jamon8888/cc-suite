---
name: para-organizer
description: "This skill should be used when the user asks to 'organize my files', 'set up PARA', or 'structure my workspace'."
---

# File Organizer (PARA Method)

Organizes files using the PARA methodology from Tiago Forte's "Building a Second Brain". Intelligent categorization with an Inbox workflow and complete audit trails.

## What is PARA?

| #   | Category  | Contains                          | Lifespan   |
| :-- | :-------- | :-------------------------------- | :--------- |
| 0   | Inbox     | New files waiting to be processed | Temporary  |
| 1   | Projects  | Active work with deadlines        | Short term |
| 2   | Areas     | Ongoing responsibilities          | Long term  |
| 3   | Resources | Reference material by topic       | Permanent  |
| 4   | Archives  | Inactive or completed items       | Preserved  |

## Workflow Overview

```
Phase 1: Discovery     → Scan, count, evaluate file name quality
Phase 2: Analysis      → Read content of poorly named files, propose renames
Phase 3: Preparation   → Create PARA folder structure, get approval
Phase 4: Execution     → Rename and move files (with logging)
Phase 5: Finalization  → Generate summary, invite to Inbox review
```

## Quick Start

1. Create an `_ORG/` folder in the target directory.
2. Initialize tracking files from `references/templates.md`.
3. Customize `references/config.md` according to your needs.
4. Execute phases with user approval checkpoints.

## Folder Structure (PARA Method)

```
Target-Directory/
├── 0-Inbox/                    # New files arrive here
│   └── _REVISE/                # Files requiring manual attention
├── 1-Projects/                 # Active work with deadlines
│   ├── Work/
│   └── Personal/
├── 2-Areas/                    # Ongoing responsibilities
│   ├── Finances/
│   ├── Health/
│   ├── Legal/
│   └── Career/
├── 3-Resources/                # Reference material by topic
│   ├── Media/
│   │   ├── Images/
│   │   ├── Videos/
│   │   ├── Audio/
│   │   └── Captures/
│   ├── Tools/
│   │   ├── Installers/
│   │   └── Utilities/
│   └── Learning/
│       ├── Articles/
│       ├── Books/
│       └── Courses/
├── 4-Archives/                 # Inactive or completed items
│   ├── Completed-Projects/
│   └── Past-Years/
└── _ORG/                       # Organization tracking files
    ├── _PLAN.md
    ├── _LOG.md
    └── _MANIFEST.md
```

## Inbox Review Flow

### Daily Quick Review (5 minutes)

Process files in `0-Inbox/` by asking yourself:

1. **Is it actionable with a deadline?** → Move to `1-Projects/`
2. **Is it an ongoing responsibility?** → Move to `2-Areas/`
3. **Is it useful reference material?** → Move to `3-Resources/`
4. **Is it completed or inactive?** → Move to `4-Archives/`
5. **None of the above?** → Delete or leave in Inbox

### Weekly Deep Review (15 minutes)

1. Empty remaining items in `0-Inbox/`.
2. Check `1-Projects/` for completed projects → Archive.
3. Review `2-Areas/` for items no longer relevant → Archive.
4. Clean up duplicates in `3-Resources/`.
5. Organize `4-Archives/` by year or category.

## File Naming Convention

Format: `[DATE]_[CODE]_[DESCRIPTION].[ext]`

| Component   | Format                       | Example          |
| :---------- | :--------------------------- | :--------------- |
| Date        | YYYY-MM-DD, YYYY-MM, or YYYY | 2025-01-13       |
| Code        | PARA category code           | PROJ, FIN, REF   |
| Description | lowercase-with-hyphens       | quarterly-report |

Example: `2025-01_PROJ_website-mockup.pdf`

### PARA Category Codes

| Code   | Category             | Use                   |
| :----- | :------------------- | :-------------------- |
| PROJ   | 1-Projects           | Active project files  |
| FIN    | 2-Areas/Finances     | Financial documents   |
| HEALTH | 2-Areas/Health       | Medical records       |
| LEG    | 2-Areas/Legal        | Contracts, agreements |
| REF    | 3-Resources          | General reference     |
| LEARN  | 3-Resources/Learning | Educational materials |

## Content Analysis Triggers

Analyze file content when the name matches:

- Generic: `Document*.pdf`, `Untitled*`, `Copy of *`
- Camera: `IMG_####.*`, `DSC_####.*`, `scan####.*`
- Captures: `Screen Shot *`, `Screenshot *`
- Ambiguous: `notes.*`, `report.*`, `data.*`, `export.*`

Do NOT rename: Software installers (.dmg, .exe, .pkg), files with version hashes.

## Approval Checkpoints

**User approval required before:**

1. Executing any renaming.
2. Moving files to destinations.
3. Handling sensitive files (finances, medical, legal in 2-Areas).

Never delete files without explicit user confirmation.

## Logging Requirements

Update tracking files in real-time:

**\_PLAN.md**: Task list with timestamps

- ⬜ Not started → 🔄 In progress → ✅ Completed

**\_LOG.md**: Action log with entries:

```markdown
### [TIMESTAMP] - [ACTION TYPE]

**Task**: [Reference to plan]
**Action**: [What was done]
**Result**: [Result]
**Next**: [Next step]
```

**\_MANIFEST.md**: Audit trail of file operations

- Each rename and move recorded with timestamp.
- Allows for a rollback if necessary.

## Reference Files

- **references/config.md**: Customizable PARA structure and detection keywords.
- **references/templates.md**: Blank templates for \_PLAN.md, \_LOG.md, \_MANIFEST.md.

## Session Resumption

If the session is interrupted:

1. Read `_LOG.md` to find the last completed action.
2. Read `_PLAN.md` to find the next incomplete task.
3. Log: `### [TIME] - SESSION ... Resuming interrupted session`.
4. Continue from that point.

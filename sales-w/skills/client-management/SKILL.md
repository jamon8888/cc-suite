---
name: client-management
description: "This skill should be used when the user asks to 'add client', 'update [client]', or 'log meeting'."
---

# Skill: Client Management (Local CRM)

Who needs Salesforce? This skill manages your relationships in pure Markdown.

```
┌─────────────────────────────────────────────────────────────────┐
│  STANDALONE (always works)                                      │
│  ✓ Create comprehensive Account Plans (`data/1-Projets/clients`)│
│  ✓ Log meetings and update "Deal Health"                        │
│  ✓ Track revenue and pipeline stage                             │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (connect ~~hubspot)                               │
│  + Syncs status bi-directionally                                │
└─────────────────────────────────────────────────────────────────┘
```

## 🛠 Agent Instructions

### Phase 1: Onboarding (New Client)

**Trigger**: "Add client Acme Corp."

**Actions**:

1.  **Ask**: "Who is the contact? What is their role?"
2.  **Create**: Copy `references/client-template.md` to `data/1-Projets/clients/acme-corp.md`.
3.  **Initialize**: Set Status to "Prospect" and Health to 50.

### Phase 2: Logging (Interaction)

**Trigger**: "Log meeting with Acme."

**Actions**:

1.  **Append**: Add row to "Interaction Log" in `acme-corp.md`.
2.  **Update**:
    - **Health**: If positive meeting, +10 points. If they canceled, -10.
    - **Next Step**: "Send Proposal by [Date]".

### Phase 3: Review (Dashboard)

**Trigger**: "Show me Acme."

**Actions**:

1.  **Read**: `data/1-Projets/clients/acme-corp.md`.
2.  **Display**:
    - **Scorecard**: Health (Green/Red).
    - **Last Touch**: Date.
    - **Next Action**: What do we owe them?

## 📂 System Integration

- **Pipeline Guardian**: Reads these files to calculate the Forecast.
- **Deal Desk**: Reads the "Discovery Log" to find levers for negotiation.

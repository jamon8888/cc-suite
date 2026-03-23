---
name: stakeholder-mapper
description: >
  This skill should be used when the user asks for a "stakeholder map", "who are the
  stakeholders", "stakeholder analysis", "key audiences", "cartographie des parties
  prenantes", or "mapping des audiences". Identifies and prioritises all stakeholders
  by influence and interest, producing engagement strategies per group.
---

# Skill: Stakeholder Mapper

Maps all audiences — internal and external, formal and informal — against two axes: **influence** (their power to affect brand outcomes) and **interest** (their level of engagement with the brand or issue). Produces a prioritised engagement plan that ensures no critical voice is ignored.

## When to Use

- At the start of any strategic engagement (before planning begins)
- For corporate communications and issues management
- For B2B campaigns where multiple buyer-side roles need addressing
- For change management or internal comms planning
- When a crisis requires rapid audience prioritisation

---

## Stakeholder Identification Process

### Step 1: Generate the Long List

Before filtering, generate a complete, uncurated list of all possible stakeholders. Use these categories as prompts:

**Internal stakeholders:**
- Leadership (C-suite, Board)
- Management (Middle management)
- Employees (by function: sales, operations, R&D, marketing)
- Employee representative bodies (unions, works councils — especially critical in France)
- Shareholders (if public) / Investors (if private)

**External stakeholders — Commercial:**
- Existing customers (by segment, tenure, or value)
- Prospects / potential customers
- Channel partners / distributors / resellers
- Suppliers and strategic vendors
- Industry associations and standards bodies

**External stakeholders — Institutional:**
- Government and regulatory authorities
- Political actors (elected officials, party structures)
- European institutions (if relevant for EU-market brands)
- Supervisory bodies and regulatory agencies
- Public agencies and semi-public bodies

**External stakeholders — Media and Opinion:**
- Journalists (national press, trade press, specialist)
- Editors and news directors
- Influencers and content creators
- Bloggers and community leaders
- Podcasters and newsletter writers

**External stakeholders — Civil Society:**
- NGOs and advocacy organisations
- Consumer associations
- Professional associations
- Academic and research institutions
- Think tanks and policy influencers

**External stakeholders — Ecosystem:**
- Competitors (for co-opetition or industry issues)
- Complementary brands (partnership potential)
- Technology partners

Target: **30–50 stakeholders** on the long list before filtering.

### Step 2: Map on the Influence/Interest Matrix

Place each stakeholder on the 2x2 matrix:

```
                    HIGH INFLUENCE
                         │
         ┌───────────────┼───────────────┐
         │               │               │
 MANAGE  │    ENGAGE &   │   PARTNER     │
ACTIVELY │    MONITOR    │   & CO-CREATE │
         │               │               │
─────────┼───────────────┼───────────────┼─── INTEREST
LOW      │               │               │   HIGH
         │    MONITOR    │    INFORM &   │
         │               │    CONSULT    │
         │               │               │
         └───────────────┼───────────────┘
                         │
                    LOW INFLUENCE
```

**Quadrant definitions:**

| Quadrant | Influence | Interest | Strategy |
|---------|---------|---------|---------|
| **Partner & Co-Create** | High | High | Priority relationship. Involve early. Co-create content and narratives. |
| **Manage Actively** | High | Low | Must be kept on side. Risk of opposition if ignored. Proactive engagement. |
| **Inform & Consult** | Low | High | Natural allies. Keep informed, invite to participate, use as amplifiers. |
| **Monitor** | Low | Low | Minimal investment. Track in case they shift quadrant. |

### Step 3: Assess Attitude

For each stakeholder in the top two quadrants, assess their current attitude toward the brand/issue:

| Stakeholder | Quadrant | Current attitude | Desired attitude | Distance to close |
|------------|---------|-----------------|-----------------|------------------|
| | | Advocate / Neutral / Sceptic / Opponent | | High / Medium / Low |

**Priority communication investment:**
- Opponents with high influence = Crisis-level engagement
- Sceptics with high influence = Priority persuasion
- Neutrals with high influence = Conversion to allies
- Advocates = Mobilise and amplify

### Step 4: Define Engagement Approach Per Group

For each priority stakeholder (Partner + Manage Actively quadrants):

```markdown
### [Stakeholder Group Name]

**Representative individuals/organisations**: [Name the specific people or entities]
**Current attitude**: [Advocate / Neutral / Sceptic / Opponent]
**Key concern or interest**: [What they care about in relation to this issue/brand]
**What they need from us**: [Information / consultation / involvement / proof of action]

**Communication approach**:
- Channel: [Direct meeting / Press event / Formal briefing / Published report / Informal dialogue]
- Frequency: [One-off / Monthly / As-needed]
- Message emphasis: [Which pillar from the message architecture lands best with this group]
- Messenger: [Who delivers — CEO / Expert / Agency rep / Third-party voice]

**Risk if we get it wrong**: [What happens if this stakeholder turns hostile]
**Early win opportunity**: [What small action could shift their attitude quickly]
```

---

## Stakeholder Map for Internal Comms

For internal campaigns and change management, apply a specific internal mapping:

| Function | Influence on adoption | Attitude to change | Key concern | Change agent potential |
|---------|----------------------|-------------------|------------|----------------------|
| C-Suite | High | | | |
| HR | High | | | |
| Middle Management | Very High | | | |
| Operations | Medium | | | |
| Customer-facing teams | Medium | | | |
| IT | Medium | | | |

**French-market note**: Employee representative bodies (CSE — Comité Social et Économique) have formal consultation rights on significant business changes in France. They must appear in any internal stakeholder map and have their own engagement plan before public announcements.

---

## Output: Stakeholder Map + Engagement Plan

Save to `data/1-Projets/clients/[client]/stakeholder-map.md`

Structure:
1. **Stakeholder Universe** — Full long list with quadrant assignment
2. **Priority Matrix** — Visual 2x2 with top 15 stakeholders placed
3. **Attitude Audit** — Priority stakeholders with current/target attitude
4. **Engagement Plan** — Detailed approach per priority group
5. **Risk Register** — Top 5 stakeholder risks and mitigation
6. **Quick Wins** — 3 early actions to shift key attitudes

---

## Integration Points

- **Receives from**: `brief-analyzer` (stakeholder signals), `audience-intelligence` (audience segments)
- **Feeds into**: `message-architecture` (audience adaptations), `campaign-strategy` (channel mix), `crisis-planner`
- **Triggered by**: `/comms:strategy`, `/comms:brief`, `/comms:crisis`

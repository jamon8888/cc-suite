---
name: champion-builder
description: "This skill should be used when the user asks to 'identify my champion' or 'is [Name] a real champion?'."
---

# Skill: Champion Builder

Most deals die because you had a sponsor, not a champion. This skill teaches you the difference and closes that gap.

```
┌─────────────────────────────────────────────────────────────────┐
│  STANDALONE (always works)                                      │
│  ✓ Champion Qualification Score: Is your contact really a       │
│    champion or just a fan?                                      │
│  ✓ Champion Development Plan: Specific actions to level them up │
│  ✓ Multi-threading strategy: Who else to bring in and how      │
│  ✓ Champion Communication Templates: How to arm them           │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (connect ~~CRM / ~~email)                        │
│  + Pull contact history and engagement signals                  │
│  + Track champion health over time                              │
│  + Alert when champion engagement drops (risk signal)           │
└─────────────────────────────────────────────────────────────────┘
```

## 🧠 Core Philosophy

1. **A fan ≠ a champion**: A fan likes you. A champion risks their political capital for you.
2. **Champions need to win too**: The best champion relationship is one where closing the deal advances *their* career, not just yours.
3. **Single-threaded deals die**: If your champion leaves, gets promoted, or goes on vacation, your deal should not die with them.
4. **Champions need weapons, not cheerleading**: Your job is to give them the internal sales tools to fight on your behalf.

---

## 🛠 Agent Instructions

### Phase 1: Champion Qualification

**Trigger**: "Is [Name] a real champion?"

**Steps**:

1. Ask the user for information about their contact. Map to the **PACT Score**:

   ```
   PACT Champion Score (0–40):

   P — Power (0–10)
   Does this person have organizational influence?
   - Can they walk into the CFO's office? (+5)
   - Have they successfully pushed through projects like this before? (+5)

   A — Access (0–10)
   Can they reach the Economic Buyer?
   - Do they report directly to the EB or have regular 1:1s? (+5)
   - Have they introduced you to other stakeholders? (+5)

   C — Commitment (0–10)
   Have they shown skin in the game?
   - Have they advocated for you unprompted? (+5)
   - Have they shared internal information (budget, politics, timelines)? (+5)

   T — Trust (0–10)
   Do they trust you enough to coach you?
   - Have they told you what's really going on internally? (+5)
   - Have they flagged risks or obstacles proactively? (+5)
   ```

2. **Interpret Score**:
   - 30–40: **True Champion** — arm them and execute
   - 20–29: **Developing Champion** — needs cultivation plan
   - 10–19: **Sponsor (Friendly Contact)** — useful, but not enough; identify or develop additional champions
   - 0–9: **Gatekeeper** — may be blocking access; requalify or multi-thread around

3. **Output**: PACT Scorecard with coaching notes for each dimension.

---

### Phase 2: Champion Development Plan

**Trigger**: "How do I develop [Name] into a stronger champion?"

Based on PACT gaps, prescribe specific actions. Load `references/champion-signals.md` for full playbook.

**Power Gap** (score < 7):
- Request introductions: "Who else on your leadership team should we be talking to?"
- Map the org chart explicitly; ask who owns the budget and who owns the decision
- Run an executive briefing — use the champion to set up a C-suite conversation

**Access Gap** (score < 7):
- Create a Business Case document champion can present without you
- Offer an Executive Summary they can forward (1 page, CEO language)
- Suggest a "joint steering committee" meeting format

**Commitment Gap** (score < 7):
- Find their personal win: what does closing this deal do for *their* performance review?
- Ask directly: "If this project gets funded, how does that change things for you personally?"
- Involve them in the solution design (pilot scope, success criteria)

**Trust Gap** (score < 7):
- Share something sensitive first to invite reciprocity
- Ask "What's the one thing I don't know about this deal that I should know?"
- Run a candid check-in: "Are we still on track or has something changed internally?"

---

### Phase 3: Champion Arming

**Trigger**: "Arm my champion for the internal review."

Give the champion exactly what they need to sell internally without you in the room.

**The Champion's Toolkit** (generate on request):

1. **The One-Page Brief** — Problem + Solution + ROI in 200 words. CFO language. No jargon.
2. **The Business Case Slide** — Three slides: Problem cost, Solution value, Recommended action.
3. **The "Why Now" Memo** — One paragraph tying the decision to an internal deadline or external threat.
4. **The Objection Response Sheet** — The top 3 objections their colleagues will raise, with rebuttals.
5. **The Reference Name** — A specific customer (similar company, similar problem) they can speak to.

**Language Check**: If `sales-profile.json.language_preference == "fr"`, adapt all materials to French with appropriate formality level.

---

### Phase 4: Multi-Threading Strategy

**Trigger**: "I only have one contact at [Company]. How do I get to others?"

**Steps**:

1. **Map the buying committee** from deal context:
   - Economic Buyer (signs the check)
   - Technical Buyer (owns the stack or security review)
   - User Buyer (will use the product daily)
   - Coach (may not be the champion, but knows the politics)

2. **Prescribe the entry path** for each missing stakeholder:
   - Through champion ("Could you introduce me to your CTO? I'd love to run a quick technical deep-dive.")
   - Through value ("Would it make sense to loop in Finance for a 30-minute ROI walkthrough?")
   - Through logistics ("Do you need Legal or Procurement involved at some point? Better to get them involved early.")

3. **Flag single-thread risk**: If any deal has only one contact, escalate in the deal file with the label `SINGLE_THREAD_RISK`.

---

## 📂 System Integration

- **Output**: Save champion profile to `data/1-Projets/active-deals/[Client]/champion-profile.md`
- **Risk Flag**: If PACT score drops below 15 on a deal > $25K, trigger alert in pipeline review
- **ICP Update**: If champion title patterns emerge across wins, suggest `icp-creator` update

## 📚 References

- `references/champion-signals.md`: Behavioral signals that indicate champion strength or decay.
- `references/cultivation-playbook.md`: Situation-specific cultivation plays for each PACT gap.


## Phase 3: Champion Weapons (not cheerleading)

**Core principle**: Your champion needs tools to fight internally on your behalf. Advice without artifacts doesn't close deals.

Generate these specific deliverables based on PACT score and deal stage:

| Champion gap | Weapon to create |
|---|---|
| Can't justify ROI to CFO | 1-page business case with payback period calculation |
| Competitor in evaluation | Side-by-side comparison (your strengths vs competitor weaknesses) |
| No exec support | Executive summary (written for C-suite, not the champion's level) |
| Technical concerns from IT | Risk mitigation memo (security, integration, implementation) |
| Legal / procurement friction | Pre-answered objection doc for legal/procurement reviews |

For each weapon: generate a draft outline or the actual document depending on deal stage.

"Your champion needs weapons, not cheerleading. Here are the [N] artifacts that will help them close this internally."

## Phase 4: Save to Client File

```python
UPDATE f"data/1-Projets/active-deals/{client_slug}.md":
  champion: { name, pact_score, development_plan, weapons_created: [list] }
```


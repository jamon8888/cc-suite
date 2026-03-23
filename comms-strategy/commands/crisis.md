---
description: "Crisis communication planning — scenario mapping, response protocols, holding statements, and escalation procedures."
argument-hint: "[client name or crisis scenario]"
allowed-tools: Read, Write, Glob
model: sonnet
---

# /comms:crisis — Crisis Planning

> If you see unfamiliar placeholders or need to check which tools are connected, see [CONNECTORS.md](../CONNECTORS.md).

Builds crisis communication playbooks — mapping risk scenarios, designing response protocols, drafting holding statements and message templates, and defining the escalation chain. Pre-empts crises before they happen.

Uses the `crisis-planner` skill.

**Note**: This skill provides planning frameworks. Execution in a live crisis requires senior communications counsel. If a crisis is happening right now, start with the Immediate Response section below.

## Usage

```
/comms:crisis
/comms:crisis "Acme Corp" [build full playbook]
/comms:crisis now [live crisis mode — immediate response support]
/comms:crisis scenario "product recall"
```

---

## Modes

### Mode 1: Full Playbook Build (`/comms:crisis [client]`)

**For proactive planning — not during a live crisis.**

1. **Load existing context:**
   - Read `data/1-Projets/clients/[client]/strategic-platform.md` (brand values, audiences)
   - Read `data/1-Projets/clients/[client]/stakeholder-map.md` (key audiences + contacts)

2. **Run risk mapping** using `crisis-planner` skill:
   - Generate the full risk universe (6 dimensions)
   - Score each risk (probability × severity)
   - Prioritise: all scenarios with score ≥ 15 get full playbooks

3. **Build scenario cards** for top 5 risks:
   - Trigger, impact, audience priority order
   - Response protocol + golden hour checklist
   - Message framework (acknowledge → action → assurance)

4. **Draft holding statements** for each high-priority scenario

5. **Define the escalation matrix:**
   - Crisis levels 1–4
   - First responder + approver per level
   - Notification timing

6. **Build the crisis contact directory:**
   - Internal crisis team (names, mobile numbers, roles)
   - External advisors (legal, comms counsel, sector regulator contacts)
   - Key media contacts for direct briefing in a crisis

7. **Save** to `data/1-Projets/clients/[client]/crisis-playbook.md`

---

### Mode 2: Live Crisis Support (`/comms:crisis now`)

**Use this during an active crisis. Streamlined and immediate.**

Ask the user to answer 5 rapid questions:

1. **What happened?** (Brief description of the incident)
2. **When did it happen / when did we learn about it?**
3. **Who is affected?** (Customers / employees / public / investors)
4. **Is it in the media yet?** (Yes / No / Not yet but likely)
5. **What is the worst-case version of this?**

Then immediately provide:
- **Crisis level assessment** (Level 1–4)
- **First actions in the next 30 minutes** (prioritised checklist)
- **Draft holding statement** for immediate use
- **Audience priority order** (who to contact first, second, third)
- **Messages NOT to say** (avoid these — legal and reputational risk)
- **Watch for** (signals that the situation is escalating)

---

### Mode 3: Single Scenario Planning (`/comms:crisis scenario [type]`)

Build a focused playbook for one specific scenario type:

Available scenario types:
- `data-breach` — GDPR notification, data security incident
- `product-recall` — Product safety, quality issue
- `leadership` — Executive misconduct, personal conduct allegation
- `financial` — Profit warning, audit finding, fraud allegation
- `social-media` — Viral controversy, campaign backlash, cancel culture
- `environmental` — ESG challenge, greenwashing accusation
- `regulatory` — Investigation, enforcement action, fine
- `operational` — Major outage, service failure, supply chain collapse

---

## Crisis Readiness Assessment

When running a full playbook build, begin with a readiness assessment:

```markdown
## Crisis Readiness Assessment: [Client]

### Current State

| Element | Status | Gap |
|---------|--------|-----|
| Crisis playbook exists | ✅ / ⚠️ / ❌ | |
| Spokesperson identified and trained | ✅ / ⚠️ / ❌ | |
| Escalation procedures defined | ✅ / ⚠️ / ❌ | |
| Media contacts directory current | ✅ / ⚠️ / ❌ | |
| Dark website / holding page ready | ✅ / ⚠️ / ❌ | |
| Legal-comms interface protocol | ✅ / ⚠️ / ❌ | |
| Social media response protocol | ✅ / ⚠️ / ❌ | |
| Internal comms emergency channel | ✅ / ⚠️ / ❌ | |

### Readiness Score: [X/8]

### Priority gaps to address:
1. [Gap 1 — most critical]
2. [Gap 2]
3. [Gap 3]
```

---

## Tips

- **The first statement is the most important.** It sets the tone for all subsequent coverage. A holding statement issued in 45 minutes is better than a polished statement issued in 4 hours.
- **Acknowledging is not admitting liability.** "We are aware of and taking this situation extremely seriously" is both legally safe and humanly credible.
- **Never speculate publicly about cause or scale** before the full picture is known. "We are investigating" is always safer than a premature explanation.
- **Internal communications must precede external.** Employees and key partners hearing about the crisis from the media before hearing it from leadership is a secondary crisis.
- **Have the dark website page ready before you need it.** A dedicated crisis page on the brand website reduces the chaos of building a response hub under pressure.

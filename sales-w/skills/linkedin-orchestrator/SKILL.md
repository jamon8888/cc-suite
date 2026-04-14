---
name: linkedin-orchestrator
description: "This skill should be used when the user asks to 'start linkedin', 'create linkedin plan', or 'resume linkedin'."
---

# LinkedIn Orchestrator (The Manager)

Generate a structured daily outreach to-do list based on the 360Brew algorithm strategy. Integrates with all LinkedIn skills for seamless execution.

## Configuration

Reads `data/sales-profile.json` for:
- `language_preference`: "English", "French", or "Bilingual"
- `target_geography`: e.g., "France", "Canada", "ASEAN"
- `selling_methodology`: e.g., "MEDDIC", "SPIN"

## Trigger

| Intent | Phrase |
|--------|--------|
| Create new plan | "plan my day", "daily linkedin plan", "linkedin to-do" |
| Resume existing | "resume linkedin", "linkedin status" |
| Autonomous run | "start linkedin", "run linkedin autonomously" |

## Time Blocks

| Block | Time | Focus |
|-------|------|-------|
| **Morning** | Before 10:00 | Warming & Commenting (9 comments) |
| **Content** | 10:00–12:00 | Creation & Scheduling (12h gap rule) |
| **Midday** | 12:00–15:00 | Golden Hour & Replies |
| **Afternoon** | 15:00–18:00 | Prospecting & Connections |
| **Evening** | After 18:00 | Audit & CRM Sync |

## Skills Integration

| Task | Skill |
|------|-------|
| Write Comments | `linkedin-engager` |
| Create Post | `linkedin-creator` |
| Find Prospects | `linkedin-prospector` |
| Sync CRM | `hubspot-sync` |

See `references/schedule.md` for the full autonomous execution flow, bilingual posting schedule, daily engagement limits, 12-hour rule, CRM sync steps, and resume workflow.

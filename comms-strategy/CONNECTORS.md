# Connectors

## How tool references work

This plugin uses `~~category` as a placeholder for whatever tool you connect in that category (e.g., `~~search`). This allows the plugin to be tool-agnostic, describing workflows in terms of general categories rather than specific products. Connect your preferred tools from the options below.

## Connectors for this plugin

| Category | Placeholder | Recommended | Other options |
|----------|-------------|-------------|---------------|
| Search | `~~search` | Exa | Tavily, Google |
| Social listening | `~~social` | LinkedIn MCP | Twitter/X API, Brandwatch |
| Media monitoring | `~~media monitoring` | Cision MCP | Meltwater, Mention |
| Knowledge base | `~~knowledge base` | Notion | Obsidian, Confluence |
| CRM | `~~CRM` | HubSpot | Salesforce, Pipedrive |
| Storage | `~~storage` | Filesystem | Google Drive, SharePoint |
| Presentation | `~~presentation` | Google Slides | PowerPoint, Canva |
| Analytics | `~~analytics` | Google Analytics | Adobe Analytics |
| Calendar | `~~calendar` | Google Calendar | Microsoft 365 |

## Standalone vs. Supercharged

Every skill in this plugin works **standalone** — no external tools required. Skills use web search and the local filesystem by default.

**Supercharged** mode activates when you connect additional tools:

| Skill | Standalone | Supercharged with |
|-------|-----------|-------------------|
| `brief-analyzer` | Filesystem | ~~knowledge base (pull from past briefs) |
| `audience-intelligence` | Web search + filesystem | ~~social (real-time social listening) |
| `media-landscape` | Web search | ~~media monitoring + ~~social |
| `competitive-comms` | Web search | ~~media monitoring + ~~social |
| `brand-voice-auditor` | Filesystem | ~~knowledge base + ~~social |
| `campaign-strategy` | Filesystem | ~~analytics (historical performance data) |
| `comms-measurement` | Filesystem | ~~analytics + ~~media monitoring |
| `stakeholder-mapper` | Web search | ~~CRM (existing contact data) |
| `crisis-planner` | Filesystem | ~~media monitoring (real-time crisis signals) |

## Companion Plugins

| Plugin | What it adds | Install |
|--------|-------------|---------|
| **copywriter** | Blog posts, LinkedIn content, editorial calendar, anti-slop auditing | `knowledge-work-plugins/copywriter` |
| **solo** | Client management, invoicing, sales pipeline, proposal generation | `knowledge-work-plugins/solo` |
| **sentinel** | Decision quality checking at 7 strategic moments — brief platform, message pillars, campaign concept, pitch diagnosis, crisis mapping, KPIs | Install as `sentinel-cowork` |
| **management-consulting** | Deep strategic frameworks (Five Forces, 7S, VRIO) for strategic plans | `knowledge-work-plugins/management-consulting` |

### Integration with Sentinel plugin

When **sentinel-cowork** is installed (folder: `sentinel-cowork/`), comms-strategy
detects it automatically at session start and announces its availability.

**7 trigger points** where Sentinel is offered (non-blocking — "continue" to skip):

| comms-strategy moment | Sentinel agents invoked |
|----------------------|------------------------|
| Brief → Strategic Platform decoded | `questioner` + `reality-checker` |
| Message pillars drafted | `structure-builder` + `questioner` |
| Real Why / CEP insight mapped | `questioner` |
| Campaign concept generated | `failure-finder` + `questioner` |
| Pitch strategic diagnosis | `questioner` + `failure-finder` |
| Crisis scenarios mapped | `questioner` + `reality-checker` |
| KPI framework before lock-in | `calibration-coach` + `reality-checker` |

**Shared decision ledger**: comms predictions (campaign performance, pitch outcomes,
media coverage) are written to `sentinel-cowork/data/decision-ledger.json`.
Run `/sentinel-review` from Sentinel to track calibration across comms decisions over time.

### Integration with Solo plugin

When **solo** is installed:
- `comms-strategy` reads `data/2-Domaines/agency-profile.md` → avoids duplicate setup
- `antislop-expert` from solo runs automatically on client-facing comms documents
- Client data from `solo/data/1-Projets/clients/` can be referenced in comms work

### Integration with Management Consulting plugin

When **management-consulting** is installed:
- `/comms:strategy` can invoke `strategic-frameworks` skill for deeper market analysis (Five Forces, PESTLE)
- `/comms:pitch` can invoke `due-diligence` skill for prospect research
- Framework analyses feed directly into the comms strategy document

### Integration with Copywriter plugin

When **copywriter** is installed:
- Message architecture feeds the **voice-dna** for content creation
- Campaign briefs can trigger content calendar planning via `/copywriter:plan`
- Brand voice charter (from `brand-voice-auditor`) is read by copywriter for all content generation

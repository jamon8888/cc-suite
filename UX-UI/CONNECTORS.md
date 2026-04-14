# Connectors

## How tool references work

Plugin files use `~~category` as a placeholder for whatever tool the user connects in that category. For example, `~~design tool` might mean Figma, Sketch, or any other design tool with an MCP server.

Plugins are **tool-agnostic** — they describe workflows in terms of categories (design tool, project tracker, user feedback, etc.) rather than specific products. The `.mcp.json` pre-configures specific MCP servers, but any MCP server in that category works.

## Connectors for this plugin

| Category | Placeholder | Included servers | Other options |
|----------|-------------|-----------------|---------------|
| Chat | `~~chat` | Slack | Microsoft Teams |
| Design tool | `~~design tool` | Figma | Sketch, Adobe XD, Framer |
| Email | `~~email` | Gmail | Outlook |
| Calendar | `~~calendar` | Google Calendar | Outlook Calendar |
| Knowledge base | `~~knowledge base` | Notion | Confluence, Guru, Coda, Dovetail |
| Project tracker | `~~project tracker` | Linear, Asana, Atlassian (Jira/Confluence) | Shortcut, ClickUp |
| User feedback | `~~user feedback` | Intercom | Productboard, Canny, UserVoice, Dovetail |
| Product analytics | `~~product analytics` | — | Amplitude, Mixpanel, Heap, FullStory, PostHog |

## Discovery connector matrix

The discovery and research skills use connectors differently. This table shows which connector each skill and command requires vs. enhances.

| Skill / Command | ~~user feedback | ~~chat | ~~product analytics | ~~knowledge base | ~~email | ~~calendar | ~~project tracker |
|----------------|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `feedback-mining` | ✓ required | ✓ required | — | — | — | — | — |
| `analytics-discovery` | — | — | ✓ required | — | — | — | — |
| `research-ops` | ✓ recruitment | — | — | ✓ prior check | ✓ required | ✓ required | ✓ required |
| `research-repository` | — | — | — | ✓ required | — | — | — |
| `/discover` | ✓ | ✓ | ✓ | ✓ | — | — | — |
| `/interview-ops` | ✓ recruitment | — | — | ✓ | ✓ | ✓ | ✓ |
| `research-synthesis` | ✓ enhances | — | ✓ validates | ✓ publishes | — | — | — |

**Minimum viable setup for discovery**: `~~user feedback` + `~~knowledge base`
**Full discovery stack**: all seven connectors above

## Notes on product analytics

No single analytics MCP server works for all teams — the right server depends on your stack (Amplitude, Mixpanel, Heap, FullStory, PostHog). Connect whichever MCP server matches your tool. The `analytics-discovery` skill describes the methods; the queries adapt to whichever tool is connected.

## Notes on Dovetail

Dovetail appears in two categories: as a `~~knowledge base` (stores research) and as a `~~user feedback` source (ingests feedback). Connect it to either or both categories depending on how your team uses it.

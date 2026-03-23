# CC Suite — Development Guide

## Project Overview
The CC Suite is a monorepo of Claude plugins. Each subdirectory is a standalone plugin with its own skills, agents, and data structure.

## Structure
- `solo/`: Business operations, product pipeline, and invoicing.
- `sales/`: Outbound prospecting, pipeline management, and deal coaching.
- `sentinel/`: Decision hygiene and structured thinking.
- `copywriter/`: Content creation and social media automation.
- `comms-strategy/`: Positioning and messaging frameworks.
- `.claude/`: Global settings and local overrides.

## Common Patterns
- **Voice DNA**: Shared writing style profiles stored in `data/2-Domaines/voice-dna.json`.
- **PARA Data**: All data resides in `data/` following the PARA structure.
- **Skills & Agents**: Plugins use a skill-based architecture for atomic operations.

## Maintenance
- Ensure root level `README.md` stays updated with new plugins.
- Most plugins require MCP integrations (HubSpot, Stripe, Tally, etc.).

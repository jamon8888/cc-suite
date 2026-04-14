# Connectors

This plugin works without any external integrations. Optional connectors enhance team workflows.

## Microsoft 365 (configured by default)

- **OneDrive** — Store and retrieve client briefs, research memos, and deliverables
- **SharePoint** — Access company knowledge bases and prior engagement materials
- **Word / Excel / PowerPoint** — Direct document creation and export

The `ms365` connector is pre-configured in `.mcp.json`. If it is not active in your Cowork workspace, connect it via Settings → Connectors.

## Google Drive (optional)

Store and retrieve documents from Google Drive. Add your Google Drive MCP endpoint URL to the `google-drive` entry in `.mcp.json`.

## Usage in Plugin

When the **client-report** skill produces a `.docx` deliverable, it will:
1. Save the file locally (always)
2. If a cloud connector is active, offer to save directly to OneDrive or Google Drive

When the **research** skill retrieves client-provided documents, it will:
1. Look for files in the current workspace (always)
2. If a cloud connector is active, search OneDrive/Google Drive for matching documents

## Calibration Ledger Storage

The calibration ledger (decision predictions and outcomes tracked by `/sentinel-review`) is stored as a local file in the workspace. No connector is required. If you want to sync it across devices, store it in a connected cloud folder.

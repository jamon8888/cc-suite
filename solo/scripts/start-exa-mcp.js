#!/usr/bin/env node
'use strict';

/**
 * Exa MCP wrapper for Solo plugin.
 * Reads EXA_API_KEY from env or .claude/mcp-keys.local.md.
 * Exits cleanly (no error) if no key configured — Exa tools simply won't appear.
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

function readConfigKey(key) {
  const configFile = path.join(process.cwd(), '.claude', 'mcp-keys.local.md');
  if (!fs.existsSync(configFile)) return null;
  const content = fs.readFileSync(configFile, 'utf8');
  const match = content.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  if (!match) return null;
  const value = match[1].trim().replace(/^["']|["']$/g, '');
  return value || null;
}

const key = process.env.EXA_API_KEY || readConfigKey('exa_api_key');

if (!key) {
  process.exit(0); // No key — skip MCP server gracefully
}

process.env.EXA_API_KEY = key;

const child = spawn('npx', ['-y', 'exa-mcp-server'], {
  env: process.env,
  stdio: 'inherit'
});

child.on('exit', (code) => process.exit(code ?? 0));
child.on('error', () => process.exit(0));

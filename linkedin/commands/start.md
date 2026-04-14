---
description: "Initialiser le plugin LinkedIn: profil, pilliers, concurrents, creneaux."
argument-hint: "[--update profile|competitors|schedule]"
allowed-tools: Read, Write, Glob, Bash
model: sonnet
---

# /linkedin:start

Invoke the `onboarding-agent` to guide the user through setup.

Do not implement the wizard yourself — delegate entirely to the agent.

### --update flag

If `$ARGUMENTS` contains `--update profile`: only re-run LinkedIn profile questions.
If `$ARGUMENTS` contains `--update competitors`: only re-run competitor setup.
If `$ARGUMENTS` contains `--update schedule`: only re-run posting schedule config.

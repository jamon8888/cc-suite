---
name: voice-dna-creator
description: "This skill should be used when the user asks to 'create voice DNA', 'analyze my writing style', or 'build my voice profile'."
---

# voice-dna-creator

Analyze the user's writing samples to extract a structured Voice DNA profile capturing their unique communication style, tone, vocabulary, and personality markers.

## Workflow

1. **Collect samples**: Ask the user for writing samples or search `data/` for existing content (`.md`, `.txt`, `.docx`).
2. **Analyze**: Follow the instructions in `references/instructions.md` to identify markers (energy, empathy, formality), patterns (sentence length, punctuation, emoji usage), and vocabulary (signature phrases, words to avoid).
3. **Build profile**: Structure the output as JSON following the schema in `references/schema.md`.
4. **Validate**: Generate 3 sample sentences in the captured voice for user approval.
5. **Save**: Write the final Voice DNA JSON to `data/voice-dna.json`.

## References

- `references/instructions.md` -- Step-by-step analysis instructions
- `references/schema.md` -- JSON output schema

## Triggers

- "create voice DNA"
- "analyze my writing style"
- "build my voice profile"
- "capture my tone"
- "what does my writing sound like"

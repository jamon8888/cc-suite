---
name: icp-creator
description: "This skill should be used when the user asks to 'create ICP', 'define my ideal client', or 'who is my target customer'."
---

# icp-creator

Build a structured Ideal Customer Profile (ICP) through guided interview, market research, and data synthesis.

## Workflow

1. **Interview**: Use the question bank in `references/questions.md` and the interview script in `references/interview-script.md` to gather information from the user.
2. **Research**: If available, search `data/` for existing customer data, win/loss analyses, or market notes.
3. **Synthesize**: Build the ICP following the schema in `references/schema.md`. See `references/examples.md` for reference profiles.
4. **Validate**: Present the draft ICP for user review and refinement.
5. **Save**: Write the final ICP JSON to `data/icp.json` using the template in `references/icp-template.json`.

## References

- `references/questions.md` -- Discovery question bank
- `references/interview-script.md` -- Guided interview flow
- `references/schema.md` -- ICP JSON schema
- `references/examples.md` -- Example ICP profiles
- `references/icp-template.json` -- Blank ICP template

## Triggers

- "create ICP"
- "define my ideal client"
- "who is my target customer"
- "build customer profile"
- "ideal client profile"

---
name: exa-search-expert
description: "This skill should be used when the user asks to 'deep search', 'semantic search', or 'research with Exa'."
---

# exa-search-expert

Expert at leveraging the Exa neural search API for deep, semantic web research. Produces structured research briefs from multiple source types.

## Workflow

1. **Understand intent**: Clarify what the user needs to find (company intel, market trends, competitor info, technical docs, etc.).
2. **Craft query**: Use neural prompting best practices from `references/exa-prompting.md` and `references/prompting-best-practices.md`. Think "autocomplete" not "question".
3. **Apply filters**: Use date ranges, domain filters, and content types per `references/search-filters.md`.
4. **Execute search**: Run Exa search with appropriate parameters.
5. **Synthesize**: Compile findings into a structured research brief.
6. **Save**: Store results in `data/` for use by other skills (account-research, competitive-intelligence, etc.).

## References

- `references/exa-prompting.md` -- Neural search prompting techniques
- `references/prompting-best-practices.md` -- General best practices
- `references/search-filters.md` -- Available filters and parameters
- `references/use-cases.md` -- Example use cases and query patterns

## Triggers

- "deep search"
- "semantic search"
- "research with Exa"
- "find articles about"
- "neural search"
- "Exa search"

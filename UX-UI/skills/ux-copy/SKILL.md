---
name: ux-copy
description: Write or review UX copy — microcopy, error messages, empty states, CTAs, confirmation dialogs, loading states, tooltips, onboarding. Trigger with "write copy for", "what should this button say?", "review this error message", "UX writing", or any copy/label/microcopy request.
argument-hint: "<context or copy to review>"
---

# /ux-copy

> If you see unfamiliar placeholders or need to check which tools are connected, see [CONNECTORS.md](../../CONNECTORS.md).

Write or review UX copy for any interface context. Good UX writing is invisible — users understand immediately without noticing the words.

## Usage

```
/ux-copy $ARGUMENTS
```

## What I Need From You

- **Context**: What screen, flow, or feature? What's the user trying to do?
- **User state**: Confident? Frustrated? In a hurry? New?
- **Tone**: Formal, friendly, playful, reassuring?
- **Constraints**: Character limits, platform guidelines?

---

## Core Principles

1. **Specific**: "Create your first project" — not "Submit"
2. **Concise**: Every word earns its place — then cut half
3. **Active voice**: "Save changes" not "Changes will be saved"
4. **Human**: Write like a helpful person, not a system notification
5. **Useful**: Every word helps the user accomplish their goal
6. **Consistent**: One term per concept — never vary for variety's sake
7. **Never blame**: "This field is required" not "You forgot this"

---

## Pattern Library

### CTAs / Buttons
- Start with a verb: "Start free trial", "Save changes", "Download report"
- Be specific about the outcome: "Create account" not "Submit"
- Match label to result: if clicking opens a flow, say so — "Set up billing →"

**Before / After:**
| ❌ Generic | ✅ Specific |
|-----------|------------|
| Submit | Create account |
| Click here | Download the report |
| OK | Got it, I'll fix it |
| Continue | Save and go to step 2 |

### Error Messages
**Structure**: What happened + Why (plain language) + How to fix

| ❌ Bad | ✅ Good |
|--------|--------|
| Error 403: Forbidden | You don't have permission to view this. Contact your admin. |
| Invalid input | Email addresses need an @ symbol. Try: name@example.com |
| Something went wrong | We couldn't save your changes. Check your connection and try again. |

**Rules**: Don't blame users. Explain the specific issue. Give a concrete fix. Link to help if available.

### Empty States
**Structure**: What this is + Why it's empty + How to start (with CTA)

| ❌ Dead end | ✅ Invitation |
|------------|--------------|
| No items | No projects yet. Create your first project to start collaborating. |
| Nothing here | Your inbox is empty. Messages from your team will appear here. |
| No results | No results for "invoice". Try a shorter search term. |

### Confirmation Dialogs
- Name the specific action: "Delete 'Project Alpha'?" not "Are you sure?"
- State consequences: "This can't be undone"
- Label buttons with the action: "Delete project" / "Keep project" — never "OK" / "Cancel"

### Form Labels & Help Text
- Specific labels, not "Enter value here" or generic placeholders
- Show format in placeholder or example: `name@company.com`
- Explain why you're asking if it's not obvious: "We need your phone number to send delivery updates"
- Put instructions before the field — not after

### Loading States
- Set expectations for long waits: "Analysing your data… this usually takes 30–60 seconds"
- Explain what's happening: "Generating your report…"
- Offer escape if appropriate: add a "Cancel" link for anything >5 seconds

### Success Messages
- Confirm specifically what happened: "Settings saved!" not "Success"
- What happens next: "Your changes will take effect immediately"
- Match the moment: celebrate big wins, be matter-of-fact for routine actions

### Tooltips
- Never state the obvious — add value the label doesn't provide
- Answer the implicit question: "Why do you need this?" or "What does this do?"
- Keep under 15 words

### Navigation Labels
- Specific and descriptive: "Your projects" not "Items"
- Use language users understand, not internal jargon
- Breadcrumbs and wayfinding should answer "where am I?"

---

## Tone by Context

| Moment | Tone | Example |
|--------|------|---------|
| Success | Warm, brief | "All saved!" |
| Error | Empathetic, helpful | "We couldn't process that — here's what to do" |
| Warning | Clear, actionable | "This will remove all team members" |
| Neutral | Informative, concise | "Syncing…" |
| Onboarding | Encouraging, human | "Let's set up your first project" |
| Destructive action | Direct, specific consequences | "This deletes all data permanently" |

---

## Output Format

```markdown
## UX Copy: [Context]

### Recommended Copy
**[Element]**: [Copy]

### Alternatives
| Option | Copy | Tone | Best For |
|--------|------|------|----------|
| A | [Copy] | [Tone] | [When to use] |
| B | [Copy] | [Tone] | [When to use] |

### Rationale
[Why this copy works — user context, clarity, action-orientation]

### Localization Notes
[Idioms to avoid, character expansion, cultural context if relevant]
```

---

## If Connectors Available

If **~~knowledge base** is connected:
- Pull brand voice guidelines and content style guide
- Check existing copy patterns and terminology standards

If **~~design tool** is connected:
- View screen context in Figma to understand the full user flow
- Check character limits and layout constraints from the design

---

## Tips

1. **Be specific about the context** — "Error when payment fails at checkout" is better than "error message"
2. **Share your brand voice** — "Professional but warm" helps match tone correctly
3. **Consider the user's emotional state** — Error messages need empathy; success messages can celebrate
4. **Test by reading aloud** — If it sounds robotic spoken aloud, rewrite it

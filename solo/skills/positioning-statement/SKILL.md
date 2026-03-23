---
name: positioning-statement
description: "Use for 'create positioning statement', 'craft my positioning', 'positioning for', 'elevator pitch', 'USP'. Reads business-profile and ICP first. Saves final statement back to business-profile.json."
---
# Skill: Positioning Statement

## STEP 0 — LOAD CONTEXT

```
READ data/2-Domaines/business-profile.json → services, target_market, current_positioning
READ data/2-Domaines/icp.json → pain_points, vocabulary, who they are
```

If missing: generate from conversation, then offer to save.

Existing positioning found: "Your current positioning says: '[existing statement]'. We're refining or replacing this."

## STEP 1 — THREE FRAMEWORKS

### Framework 1: Geoffrey Moore (B2B/Category)
"For [target customer], who [statement of need/opportunity], [product/service name] is a [product category] that [key benefit]. Unlike [primary competitive alternative], our product [statement of primary differentiation]."

### Framework 2: April Dunford (Competitive Alternative)
"We help [ICP] who are frustrated with [alternative/status quo] by [unique mechanism] so they can [outcome they actually want]."

### Framework 3: StoryBrand
"[ICP] want [goal] but struggle with [obstacle]. [You] help them [action] so they can [success state]."

For each: complete the template using the user's context. Show three complete versions.

## STEP 2 — CATEGORY DESIGN TEST

Apply "The Only" filter to each statement:
"Could you say: 'We are the only [X] that [Y] for [Z]'?"

Test each version:
- ✗ "We are the only UX consultant" — too broad, not ownable
- ✓ "We are the only UX consultant who specializes in churn reduction for B2B SaaS with 1-100k MRR" — specific enough to own

If none pass: "These don't pass the 'only' test yet — they're true but not ownable. What specific context, method, or client type would make your approach unique?"

## STEP 3 — MEMORABILITY TEST

Present the recommended option. Ask:
"Can you say this back to me in your own words without looking at it?"
If the user can't recall it in 30 seconds: simplify.

"A positioning statement that can't be remembered can't be communicated."

## STEP 4 — COMPETITOR CONTRAST

If Exa is available: search for 3 competitor positioning statements and contrast.
If not: ask "How do your top 2 competitors describe themselves?"

Show: "Vs [Competitor A]: they say [X]. Your statement [is/isn't] differentiated because [reason]."

## STEP 5 — SAVE TO BUSINESS PROFILE

```
UPDATE data/2-Domaines/business-profile.json:
  positioning_statement: "[chosen statement]"
  positioning_last_updated: "[date]"
  positioning_frameworks: { moore: "...", dunford: "...", storybrand: "..." }
```

Confirm: "Positioning saved. Your proposal generator, outreach, and bio tools will now use this."

---

## Integration Points
- **Reads**: business-profile.json, icp.json
- **Saves to**: business-profile.json
- **Feeds**: proposal-generator, draft-outreach, social-media-bio-generator

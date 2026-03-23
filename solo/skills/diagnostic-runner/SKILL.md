---
name: diagnostic-runner
description: "This skill should be used when the user asks to 'run diagnostic', 'run assessment', or 'start diagnostic'."
---

# Skill: Diagnostic Runner

The runner conducts the actual diagnostic session. It is the difference between a definition (what to ask and how to score) and an experience (a real conversation that produces a result and a record).

Two modes exist for different situations:

| Mode | When to use | How it works |
|------|------------|-------------|
| **Conversational** | Live session — you run it with or for someone | Claude asks questions one at a time in the chat |
| **Self-service** | Async — respondent completes it independently | Claude generates a standalone prompt package the respondent can use in their own Claude session |

---

## Mode 1: Conversational (Live)

Used when the Solo user is running the diagnostic themselves or conducting it live with a prospect / client in the same Claude session.

### Session Flow

#### Phase 0: Load and Validate

```python
# Load the diagnostic definition
diagnostic_slug = extract_slug_from_command()
definition = read_file(f"data/2-Domaines/diagnostics/{diagnostic_slug}.json")

if not definition:
    error("Diagnostic not found. Run /solo:diagnose library to see available diagnostics.")
    return

# Initialize session tracking
session = {
    "diagnostic_id": definition["id"],
    "respondent": None,
    "start_time": now(),
    "answers": [],      # {question_id, selected_option, score}
    "dimension_scores": {},
    "total_score": None,
    "band": None
}
```

#### Phase 1: Open the Session

Deliver the intro message from the definition, then collect the respondent's name and any context fields.

**Template opening:**

```
I'm going to walk you through [N] questions across [N] areas — it takes about [X] minutes.

There are no right or wrong answers. The score reflects where you are right now, 
not where you should be. The more honest you are, the more useful the result.

Ready? Let's start with [Dimension 1 name].

---

[intro_message from definition]

First — what's your name?
```

Collect: name, email (if applicable), any custom context fields.

#### Phase 2: Ask Questions

For each dimension, for each question:

1. Display the question text
2. Display the 4 answer options labeled A, B, C, D
3. Wait for response
4. Score the selected option
5. Add a single brief acknowledgment (never evaluate or react to the answer)
6. Move to the next question

**Acknowledgment examples (rotate — never repeat):**
- "Got it."
- "Noted."
- "Understood."
- "Makes sense."
- "Okay."

**Never say:**
- ❌ "Great answer!" (evaluative)
- ❌ "That's interesting..." (leading)
- ❌ "I'm sorry to hear that" (presumptuous)
- ❌ "That's a common situation" (dismissive)

**Flexible answer handling:**

If the respondent answers in free text instead of selecting A/B/C/D:
1. Interpret their answer against the 4 options
2. Pick the closest match
3. Confirm: "Based on what you said, I'm reading that as [Option X]. Does that fit?"
4. If they correct — use their correction

If the answer is ambiguous between two options: ask one clarifying question, then decide.

**Tracking scores in real time:**

```python
def record_answer(question_id, option_label, score):
    session["answers"].append({
        "question_id": question_id,
        "selected": option_label,
        "score": score
    })
    
    # Update dimension running total
    dim_id = get_dimension_for_question(question_id)
    session["dimension_scores"][dim_id] = session["dimension_scores"].get(dim_id, 0) + score
```

**Between dimensions (optional):** A brief one-line transition.

```
"That covers [Dimension N]. Moving to [Dimension N+1] — [brief description of what this covers]."
```

#### Phase 3: Calculate Score

After all questions are answered:

```python
def calculate_total_score(session, definition):
    total = 0
    
    for dim in definition["dimensions"]:
        dim_id = dim["id"]
        raw_score = session["dimension_scores"].get(dim_id, 0)
        max_pts = dim["max_points"]
        weight = dim["weight"]
        
        # Normalize to 0-100, apply weight
        contribution = (raw_score / max_pts) * weight * 100
        total += contribution
        
        session["dimension_scores"][dim_id] = {
            "raw": raw_score,
            "max": max_pts,
            "percentage": round((raw_score / max_pts) * 100),
            "weighted_contribution": round(contribution, 1)
        }
    
    session["total_score"] = round(total)
    session["band"] = get_band(total, definition["scoring"]["bands"])
    
    return session
```

#### Phase 4: Deliver the Score

Present the result in this exact order:

**1. Pause before revealing** (builds anticipation, signals this is meaningful):
```
"All done. Let me put your results together."

[2–3 second pause equivalent — write a brief processing line before revealing]
```

**2. Score reveal:**
```
---

## Your [Diagnostic Name] Score

**[Total Score] / 100** — [Band Label]

```

**3. Dimension breakdown** (visual, brief):
```
| Area | Your score |
|------|-----------|
| [Dimension 1] | [X]% |
| [Dimension 2] | [X]% |
| [Dimension 3] | [X]% |
| [Dimension 4] | [X]% |
```

**4. Band recommendation** (from definition — full text):
```
### What this means

[insight paragraph from band]

**The most important thing to do right now:**
[priority_action from band]

[cta_text] → [cta_url]
```

**5. Strongest and weakest dimension (personalized layer):**
```
**Your strongest area:** [highest % dimension] — [dimension_feedback.high_feedback]
**The area to focus on:** [lowest % dimension] — [dimension_feedback.low_feedback]
```

**6. Optional follow-up:**
If conversational mode and the user is running this for a prospect, offer:
```
"Do you want me to draft a follow-up message for [respondent name] based on their score?"
```
→ Invokes `draft-outreach` with the score and band as context.

#### Phase 5: Save and Route

```python
def save_and_route(session, definition):
    # 1. Save response file
    respondent_slug = slugify(session["respondent"]["name"])
    date_str = today()
    response_path = f"data/1-Projets/diagnostics/{definition['id']}/responses/{date_str}-{respondent_slug}.md"
    
    response_content = generate_response_file(session, definition)
    write_file(response_path, response_content)
    
    # 2. Route based on definition config
    routing = definition["routing"]
    
    if routing["on_complete"] == "create_lead_card":
        create_or_update_lead_card(session, definition)
        update_pipeline_stage(session, definition)
    
    elif routing["on_complete"] == "update_client_card":
        update_client_health_score(session, definition)
        if session["total_score"] < 40:
            flag_for_client_lifecycle_agent(session)
    
    elif routing["on_complete"] == "log_to_project":
        append_to_project_log(session, definition)
    
    # 3. Notify monday-morning-agent if configured
    if routing["alert_monday_agent"]:
        append_to_monday_queue(session, definition)
    
    # 4. Confirm to user
    print(f"\n✓ Response saved: {response_path}")
    if routing["on_complete"] != "none":
        print(f"✓ {routing['on_complete'].replace('_', ' ').title()} complete")
```

---

## Mode 2: Self-Service — Claude Package (--claude)

Used when the respondent will complete the diagnostic on their own using Claude — they're not in this session.

**Output:** A standalone instruction package the respondent can paste into their own Claude session.

```markdown
# [Diagnostic Name] — Self-Service Package

## Instructions for respondent

To get your score, open a new Claude conversation and paste the full block below.
Claude will walk you through the assessment and give you your results immediately.

---

## PASTE THIS INTO CLAUDE

You are running a scored diagnostic assessment called "[Diagnostic Name]".

**Your role:** Walk the user through [total questions] questions across [N] areas.
Ask one question at a time. After each answer, note it and move to the next.
After all questions, calculate the score and deliver the band recommendation.

**Scoring rules:**
[full scoring logic from definition — dimensions, weights, max_points per dimension]

**Questions:**

### [Dimension 1: Name] (weight: [X]%)

Q1: [question text]
A) [option] → 0 points
B) [option] → 1 point  
C) [option] → 3 points
D) [option] → 4 points

Q2: [question text]
[...]

### [Dimension 2: Name] (weight: [X]%)
[...]

**Score calculation:**
After all questions, calculate:
- Dimension [1] score: (Q1 + Q2 points) / [max_points] × [weight] × 100
- [repeat for each dimension]
- Total = sum of all weighted dimension scores

**Band recommendations:**
- 0–35: [full low band recommendation]
- 36–65: [full medium band recommendation]
- 66–100: [full high band recommendation]

**Begin now.** Start by introducing yourself briefly, then ask the first question.

---
_This package was generated by Solo | [date] | Send responses to [email] after completion_
```

**Note on self-service routing:** Since the session happens outside Solo, responses must be manually entered. Prompt the user:

```
"When [respondent name] sends you their results, paste them here and I'll log the response 
and update their record automatically."
```

---

## Mode 3: Tally Form (--tally)

Used when the user wants to publish the diagnostic as a real Tally form and collect responses asynchronously at scale.

**Requires:** Tally MCP server connected (`https://api.tally.so/mcp`)

**What happens:**

1. Check that the Tally MCP server is available. If not, show setup instructions from `tally-integration/SKILL.md` and offer `--claude` as fallback.

2. Check if the diagnostic already has a Tally form (`definition.tally_export.form_id`):
   - If **yes**: The form already exists. Display the existing URL and ask: "Want to create a new version, or just share the existing form?"
   - If **no**: Invoke `tally-integration` skill → Operation 1 (Create Form).

3. After form creation, display:
```
✓ Tally form published: [form_title]

🔗 Share this URL:
   https://tally.so/r/[form_id]

Responses are collected in Tally. Pull them into Solo anytime:
   /solo:diagnose results [name] --tally
```

4. Update the diagnostic definition with `form_id`, `form_url`, and `published_at`.

**Pulling Tally results back into Solo:**

When `/solo:diagnose results [name] --tally` is run:

1. Read `definition.tally_export.form_id`
2. Invoke `tally-integration` → Operation 2 (Fetch Submissions)
3. New submissions are scored, saved as Solo response files, and routed per `definition.routing`
4. Then run the standard analysis via `diagnostic-analyzer`

```
Fetching submissions from Tally...
✓ 14 total submissions | 6 new since last sync

Scoring and importing 6 new responses:
  → data/1-Projets/diagnostics/lead-qualifier-v1/responses/2026-02-18-thomas-garcia-tally.md
  → data/1-Projets/diagnostics/lead-qualifier-v1/responses/2026-02-19-lisa-park-tally.md
  [...]

Last synced: 2026-02-20 09:41
Running analysis on 23 total responses...
```

---

## Routing Details

### Lead Diagnostic → sales-pipeline

When a lead completes a qualification diagnostic:

```python
# Create or update client card
client_card = {
    "name": session["respondent"]["name"],
    "email": session["respondent"]["email"],
    "status": "Lead",
    "last_contact": today(),
    "diagnostic_score": session["total_score"],
    "diagnostic_band": session["band"],
    "diagnostic_date": today(),
    "diagnostic_name": definition["name"]
}

# Set pipeline stage based on score
if session["band"] == "high":
    client_card["pipeline_stage"] = routing["pipeline_stage_on_high"]  # e.g. "Proposal"
elif session["band"] == "medium":
    client_card["pipeline_stage"] = routing["pipeline_stage_on_medium"]  # e.g. "Discovery"
# Low band: no stage assignment, add to nurture

# Append to pipeline.md
append_pipeline_entry(client_card)
```

### Client Diagnostic → client card health_score

```python
# Update existing client card
client_card = read_client_card(session["respondent"]["name"])
client_card["health_score"] = session["total_score"]
client_card["last_diagnostic"] = today()
client_card["diagnostic_notes"] = generate_dimension_summary(session)

# If score below threshold, flag for lifecycle agent
if session["total_score"] < 40:
    client_card["flag"] = "⚠️ Health check below threshold — immediate attention needed"
    
write_client_card(client_card)
```

### Product Diagnostic → build pipeline

```python
# Append aggregate data to validation-results.md
project_path = f"data/1-Projets/{definition['routing']['target_file']}"
append_to_file(f"{project_path}/validation-results.md", {
    "diagnostic": definition["name"],
    "respondent": session["respondent"]["name"],
    "score": session["total_score"],
    "band": session["band"],
    "date": today(),
    "dimension_breakdown": session["dimension_scores"]
})
```

---

## References

- **`references/facilitation-guide.md`**: How to run conversational sessions smoothly — handling difficult answers, keeping momentum, reading signals beyond the score
- **`skills/tally-integration/SKILL.md`**: All Tally MCP operations — creating forms, fetching and scoring submissions, webhook setup, error handling

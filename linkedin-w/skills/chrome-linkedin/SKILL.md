---
name: chrome-linkedin
description: "This skill should be used when any agent needs to interact with LinkedIn via the browser. Handles authentication checks, posting, engagement scraping, competitor scraping, commenting, and feed reading."
---

# Chrome-LinkedIn: Browser Interaction Layer

All LinkedIn interactions go through Claude in Chrome. This skill defines the exact procedures for each interaction type.

## Prerequisites

Before any LinkedIn interaction:
1. Call `mcp__Claude_in_Chrome__tabs_context_mcp` with `createIfEmpty: true` to get tab context
2. If no tab exists, call `mcp__Claude_in_Chrome__tabs_create_mcp` to create one

## Procedure 1: Authentication Check

**When to use:** Before any LinkedIn interaction. Called by all agents at start.

1. Navigate to `https://www.linkedin.com/feed/` using `mcp__Claude_in_Chrome__navigate`
2. Wait 2 seconds using `mcp__Claude_in_Chrome__computer` with action `wait`
3. Take a screenshot using `mcp__Claude_in_Chrome__computer` with action `screenshot`
4. Check the page:
   - If login form is visible → tell user: "Connecte-toi a LinkedIn dans ton navigateur Chrome, puis dis 'ok'." STOP and wait.
   - If feed is visible → authenticated. Proceed.
5. If authenticated, use `mcp__Claude_in_Chrome__find` to locate the profile link/name in the nav bar
6. Extract display name and profile URL
7. Return: `{ authenticated: true, display_name: "...", profile_url: "..." }`

## Procedure 2: Post to LinkedIn

**When to use:** When a post is SCHEDULED or user approves immediate posting.

**Input:** `{ content: string, image_path?: string }`

1. Run Procedure 1 (auth check)
2. Use `mcp__Claude_in_Chrome__find` to locate the "Start a post" or "Commencer un post" button
3. Click it using `mcp__Claude_in_Chrome__computer` with action `left_click`
4. Wait 1 second for the composer modal to open
5. Take a screenshot to verify the modal is open
6. Use `mcp__Claude_in_Chrome__find` to locate the text input area in the modal
7. Click the text area, then use `mcp__Claude_in_Chrome__computer` with action `type` to enter the content
8. If `image_path` is provided:
   - Use `mcp__Claude_in_Chrome__find` to locate the image/media upload button
   - Click it, then use `mcp__Claude_in_Chrome__file_upload` with the image path
   - Wait 2 seconds for upload
9. Take a screenshot showing the composed post
10. **MANDATORY**: Show the screenshot to the user and ask: "Voici le post pret a publier. Confirmes-tu la publication ?"
11. Wait for user confirmation. If denied, STOP.
12. Use `mcp__Claude_in_Chrome__find` to locate the "Post" / "Publier" button
13. Click it
14. Wait 3 seconds
15. Take a screenshot to verify the post appeared in the feed
16. Use `mcp__Claude_in_Chrome__find` to locate the just-posted content and extract its URL
17. Return: `{ success: true, linkedin_url: "..." }`

## Procedure 3: Scrape Engagement Stats

**When to use:** Analytics agent needs fresh engagement data.

**Input:** `{ profile_url: string }`

1. Run Procedure 1 (auth check)
2. Navigate to `{profile_url}/recent-activity/all/`
3. Wait 2 seconds for page load
4. Scroll down 3 times (using `mcp__Claude_in_Chrome__computer` with action `scroll`, direction `down`) to load more posts
5. Use `mcp__Claude_in_Chrome__read_page` to get the accessibility tree
6. For each post visible on the page:
   - Extract: text content (first 100 chars as preview), like count, comment count, repost count
   - Extract: post date if visible
   - Extract: post URL from link elements
7. Return array of: `{ content_preview, likes, comments, reposts, post_url, post_date }`

**Note:** LinkedIn shows approximate counts (e.g., "1,234 reactions"). Parse these as integers.

## Procedure 4: Scrape Competitor Posts

**When to use:** Competitor agent needs to analyze a competitor's recent content.

**Input:** `{ competitor_profile_url: string, max_posts: number (default 10) }`

1. Run Procedure 1 (auth check)
2. Navigate to `{competitor_profile_url}/recent-activity/all/`
3. Wait 2 seconds
4. Scroll down enough times to load `max_posts` posts (typically 3-5 scrolls)
5. Use `mcp__Claude_in_Chrome__read_page` to get the accessibility tree
6. For each post:
   - Extract: full text content, like count, comment count, repost count
   - Extract: post date, post URL
   - Analyze: hook style (contrarian/specificity/story/question/transformation/listicle)
   - Analyze: approximate word count
7. Return array of post objects with engagement data and analysis

## Procedure 5: Post a Comment

**When to use:** Engagement agent has a user-approved comment to post.

**Input:** `{ post_url: string, comment_text: string }`

1. Run Procedure 1 (auth check)
2. Navigate to `{post_url}`
3. Wait 2 seconds
4. Use `mcp__Claude_in_Chrome__find` to locate the comment input field
5. Click it to focus
6. Use `mcp__Claude_in_Chrome__computer` with action `type` to enter the comment
7. Take a screenshot showing the comment ready to post
8. **MANDATORY**: Show the screenshot to the user and ask: "Commentaire pret. Confirmes-tu ?"
9. Wait for user confirmation. If denied, STOP.
10. Use `mcp__Claude_in_Chrome__find` to locate the comment submit button
11. Click it
12. Wait 2 seconds
13. Return: `{ success: true, post_url, comment_text }`

## Procedure 6: Read Feed

**When to use:** Research or engagement agent needs to scan the feed for trending content.

**Input:** `{ scroll_count: number (default 5) }`

1. Run Procedure 1 (auth check)
2. Navigate to `https://www.linkedin.com/feed/`
3. Wait 2 seconds
4. For each scroll (up to `scroll_count`):
   - Scroll down using `mcp__Claude_in_Chrome__computer`
   - Wait 1 second
5. Use `mcp__Claude_in_Chrome__read_page` to get full page content
6. For each visible post:
   - Extract: author name, headline, text content (first 200 chars), engagement counts
   - Extract: hashtags if present
   - Extract: post URL
7. Return array of feed items sorted by engagement (highest first)

## Safety Rules

- **Publishing actions** (Procedure 2 and 5) ALWAYS require explicit user confirmation via screenshot + chat approval
- **Read-only actions** (Procedures 3, 4, 6) run autonomously without user confirmation
- **Authentication** (Procedure 1) never enters credentials — it only checks if the user is already logged in
- If any Chrome action fails (element not found, timeout), report the error clearly and suggest the user check their Chrome/LinkedIn state

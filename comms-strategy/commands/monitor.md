---
description: "Media and competitive monitoring — track press coverage, share of voice, competitor communications, and emerging issues in real time."
argument-hint: "[client name] [competitors to track]"
allowed-tools: Read, Write, Glob, Search
model: sonnet
---

# /comms:monitor — Media & Competitive Monitoring

> If you see unfamiliar placeholders or need to check which tools are connected, see [CONNECTORS.md](../CONNECTORS.md).

Runs a structured monitoring sweep — press coverage, social signals, competitor communications activity, and emerging sector issues. Produces an intelligence digest for the team.

Uses `competitive-comms` and `media-landscape` skills.

## Usage

```
/comms:monitor
/comms:monitor "Acme Corp" "Competitor1, Competitor2"
/comms:monitor weekly
/comms:monitor "emerging issues in [sector]"
```

---

## Monitoring Types

### Weekly Monitoring Sweep (`/comms:monitor` or `/comms:monitor weekly`)

Run every Monday. Covers the past 7 days:

**1. Brand Coverage Digest**
- Search: `"[client brand]" news last 7 days`
- Classify each hit: Tier 1 press / Trade / Digital / Social
- Sentiment: Positive / Neutral / Negative
- Key messages present: Yes / No (which pillars)
- Crises or issues: Flag immediately if found

**2. Competitor Activity**
- For each tracked competitor, search: `"[competitor]" news last 7 days`
- Identify: new campaigns launched, press angles, social pushes, partnerships, announcements
- Flag: any competitor move that creates risk or opportunity for our client

**3. Sector / Category Signals**
- Search: `[category] news OR trend last 7 days`
- Identify: regulatory moves, cultural moments, analyst commentary, consumer sentiment shifts
- Flag: anything that could change the communications environment

**4. Social Listening Summary** (Supercharged with ~~search/~~social)
- Trending topics in the audience's communities
- Brand mention volume vs. prior week
- Share of voice snapshot vs. competitors
- Sentiment trend

**Output format:**

```markdown
# Weekly Intelligence Digest: [Client Name]
**Week of**: [Date range]
**Prepared by**: [Author]

## 🔴 Priority Flags
[Anything requiring immediate client attention]

## Brand Coverage
| Publication | Date | Headline | Sentiment | Key messages | Link |
|------------|------|----------|-----------|-------------|------|
| | | | | | |

**Coverage summary**: [X articles, Y% positive, Z% carried key message]

## Competitor Activity
| Competitor | Activity | Significance | Recommended response |
|-----------|---------|-------------|---------------------|
| | | | |

## Sector Signals
[Top 3 signals from the category this week]

## Share of Voice Snapshot
| Brand | Est. SOV this week | vs. last week |
|-------|--------------------|---------------|
| [Client] | % | ↑/↓ |
| [Comp 1] | % | |

## Recommended Actions
1. [Action]
2. [Action]

## Next Week Watch List
[Topics/stories to monitor proactively next week]
```

Save to `data/1-Projets/clients/[client]/monitoring/weekly-[date].md`

---

### Competitive Deep Dive (`/comms:monitor competitor [name]`)

Run the full `competitive-comms` skill for a single competitor. Produces a Competitor Intelligence Report covering:
- Their message architecture
- Channel presence map
- Share of voice
- Earned media angles that are working
- Influencer relationships
- White space they're leaving open

Save to `data/1-Projets/clients/[client]/competitive-comms-map.md`

---

### Emerging Issues Scan (`/comms:monitor issues`)

Proactive reputation risk scan:
- Search for emerging sector controversies, regulatory actions, NGO campaigns
- Cross-reference with the client's crisis risk register (if exists)
- Flag: any issue that could migrate to the client's brand
- Produce: Issues Alert with recommended monitoring intensity

---

### Campaign Coverage (`/comms:monitor campaign [campaign name]`)

Track coverage during an active campaign:
- Press hit count and quality vs. targets
- Key message penetration
- Share of voice during campaign window
- Social amplification signals
- Influencer coverage

Feeds into the campaign measurement dashboard.

---

## Tips

- **Monitor the dark web of the brand**: not just mentions of the brand name but mentions of the category, competitors, and issues. The most important signals often don't mention the brand.
- **Distinguish noise from signal**: one negative tweet from a 50-follower account is noise. One negative thread in a 20,000-member community where your target audience lives is a signal.
- **Competitor intelligence is most valuable at the start of a campaign**: monitor what competitors are doing in the weeks before your launch. The best campaigns launch into white space, not into noise.

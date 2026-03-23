---
name: business-profile-creator
description: "This skill should be used when the user asks to 'set up my business profile' or 'create my business context'."
model: sonnet
---

# Business Profile Creator

Create a structured business profile that captures your company's identity, offerings, positioning, and brand voice.

## Output Format

After gathering responses, generate a JSON file following this structure and save to `data/2-Domaines/business-profile.json`.

```json
{
  "business_profile": {
    "version": "1.0",
    "last_updated": "YYYY-MM-DD",
    "language_preference": "en",
    "company_overview": {
      "name": "",
      "tagline": "",
      "mission": "",
      "vision": ""
    },
    "value_proposition": {
      "primary_value": "",
      "unique_mechanism": "",
      "key_differentiators": []
    },
    "offerings": {
      "products": [],
      "services": [],
      "free_resources": []
    },
    "positioning": {
      "market_position": "",
      "competitor_comparison": "",
      "category": "",
      "niche_focus": ""
    },
    "brand_voice_summary": {
      "personality": "",
      "tone": "",
      "values_demonstrated": []
    },
    "social_proof": {
      "key_metrics": [],
      "testimonial_themes": [],
      "notable_clients_or_features": []
    },
    "content_pillars": {
      "primary_topics": [],
      "content_mission": "",
      "content_style": ""
    },
    "calls_to_action": {
      "primary_cta": {},
      "secondary_ctas": []
    },
    "platforms": {}
  }
}
```

_Note: `language_preference` added to root for bilingual support._

# Clip Farm Studio — Focused production UI

## Main navigation (two screens)

### 1. Research + Create
- Enter channel niche and creative direction.
- Research outlier Shorts and keyword demand through official **vidIQ MCP** using the user's vidIQ MCP API key.
- Display clickable references, real views, breakout multiplier and views per hour when available.
- Select references and generate 3, 5 or 10 original scripts, realistic visual prompts, YouTube titles, descriptions, keywords and tags through existing Gemini API.
- Edit scripts/metadata and push selected drafts directly into production, without Make, Sheets or JSON files.

### 2. Render + Publish
- Uses existing Revid API key and production queue.
- Estimate credits; no rendering without explicit confirmation.
- Submit up to five parallel jobs, subject to Revid plan limits.
- Preview finished videos; select Revid-connected YouTube account; approve each publication independently.

## API connections shown
vidIQ MCP, Gemini, Revid. Previous standalone Revid discovery, video analysis, Google Ads keywords and Apify setup are removed from the main UI, but legacy code remains for now to avoid breaking saved state and associated handlers.

## Limitations / verification needed
- Correct vidIQ MCP connection and response parsing require an actual API key and authenticated integration test. vidIQ consumes credits; API-key access is read-only and does not upload YouTube videos.
- New Gemini creation routes parse structured JSON but factual claims and SEO suggestions still require review.
- Revid social-account and publish-now API payloads are still not confirmed by a live test. A publish submission must not be treated as a verified live YouTube upload.
- Native Mac .dmg packaging and website deployment have not been verified in this change.

## Developer validation
Browser JavaScript and Worker JavaScript parsed successfully. This is a feature implementation, not proof of live provider interoperability.

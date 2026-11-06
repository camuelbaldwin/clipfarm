# Clip Farm: Existing Revid video → researched SEO → YouTube

## Supported flow

1. In **Render + Publish**, enter/save your Revid API key.
2. Click **Load my Revid videos** to fetch projects from the authenticated Revid workspace (`GET /api/public/v3/projects`).
3. Select each project and the matching SEO topic among our five researched videos; select **Attach video + metadata**. Clip Farm checks the actual `pid` with `GET /api/public/v3/status` and requires a video URL. No render is started and no generation credits are spent.
4. The matched record retains SEO title, description, primary keyword, tags and vidIQ performance research. Copy metadata with **Copy YouTube metadata** if desired.
5. Click **Load accounts** and choose a YouTube account that Revid reports as connected and valid.
6. Review video and explicitly check **Approved**, then **Publish to YouTube**. The Revid call sends `{videoUrl, youtube:{id,title,description}, extraParams:{title,description}}` via `POST /api/public/v3/publish-now`.
7. Revid returns `contentId`; click **Check YouTube status** to read `/api/public/v3/publish-status?contentId=...`. Mark Published only when Revid reports the YouTube platform published, and store the platform's `postUrl` if provided.

## Limits

- A Revid project must be exported/ready with its finished video URL before attaching. A pending project is not treated as complete.
- Matching is **explicit**: no guessed pairing based on loose title similarity.
- API `youtube` fields documented by Revid are `id` or `username`, `title`, and `description`. A dedicated YouTube tags upload field is not documented. Clip Farm retains tags and offers a copy action for completion in YouTube Studio, rather than claiming they are published automatically.
- No video is published by opening this screen, loading the projects, or attaching a match. Each video needs explicit approval and confirmation.
- Browser state is local to the current app profile. API keys remain stored in the existing local profile mechanism.
- Runtime test with the user's authenticated Revid and YouTube accounts has **not** been performed. Browser/worker JavaScript syntax checks passed.

Revid OpenAPI specification: https://www.revid.ai/postman/revid-public-v3-render.openapi.json

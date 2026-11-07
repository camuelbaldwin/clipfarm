# Clip Farm is an ongoing video pipeline — not a 21-video project

The 21 existing Revid videos were an initial batch, **not a fixed product limit**. The same two workflows continue for future videos and future batches:

- **Create New Videos** → generate or import scripts and prompts → send selected jobs to Revid → generate matched vidIQ/Gemini SEO → upload approved finished videos directly to YouTube as Unlisted through the Mac app.
- **Publish Existing Revid Videos** → refresh the Revid library → search by name or exact project ID → filter Needs SEO / SEO prepared / Not uploaded → select any shown projects → generate researched SEO → review and approve → upload individually or use **Upload all approved SEO-ready videos as Unlisted**.

The selected videos determine each run's size; there is no 21-item selection limit. Imported script/SEO JSON files may include up to 1,000 records each, with additional imports for future batches. Each video is tracked by its Revid project ID; previously saved SEO and YouTube upload IDs remain associated with that ID. Already-uploaded videos are excluded from new uploads to prevent duplicate posting. User approval is required.

**API pagination limitation:** The current Revid `projects?limit=100` query requests up to 100 projects in a response. We have not verified that Revid supports a separate next-page cursor/offset for its projects endpoint. The app explicitly warns when the response reaches 100 rather than incorrectly claiming it loaded the entire account. Stored metadata remains accessible even if an older project is no longer returned in the latest request. Future work should implement pagination only after confirming Revid's supported parameters; do not invent them.

The Mac Unlisted uploader and Google OAuth integration still require a real authorized end-to-end upload test. Each render/upload is subject to provider rate limits, Revid credits, and YouTube API quotas.
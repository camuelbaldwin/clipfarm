# Test Clip Farm → Revid → YouTube Unlisted in v1.1.1

## One-video guided test (recommended before bulk upload)

1. Open **Clip Farm Studio v1.1.1 for Mac**, then **Publish Existing Revid Videos**.
2. Confirm the **Direct YouTube connection** displays the correct channel name. Your prior Google authorization should restore from encrypted Mac storage; click **Check connection** if necessary.
3. In **First upload: Revid → YouTube Unlisted**, click **Refresh Revid videos**.
4. Pick a video by title and exact Revid project ID. If its MP4 link is missing, click **Check Revid video**. This retrieves the output URL from the Revid status API; if the project is unfinished, finish rendering/exporting in Revid and check again.
5. Click **Generate SEO**. Clip Farm requests vidIQ keyword research and Gemini metadata for the chosen project, not a generic list. API credits may be consumed. You can **Edit SEO** before uploading.
6. Click **Preview finished video** to watch the MP4, check title, description, hashtags, and keyword tags. Choose **Approve video + SEO** after reviewing.
7. Click **Upload to YouTube Unlisted**. This invokes the Mac-only, authenticated YouTube Data API uploader, fetching the Revid MP4 automatically and submitting the project-specific SEO and `privacyStatus=unlisted` together.
8. Once the app returns a YouTube ID and confirms Unlisted visibility, use its YouTube/Studio link to inspect the result. Duplicate uploading for the same Revid ID is blocked.
9. After that test succeeds, use **Upload all approved SEO-ready videos as Unlisted** for additional approved videos. This processes uploads sequentially, not 10 uploads simultaneously. **Revid rendering** is the step that supports up to 10 concurrent jobs.

## Requirements and boundaries

- The direct YouTube upload and Google authorization run in the **Mac desktop app**, not the Cloudflare hosted site.
- Revid API key, Gemini API key, vidIQ MCP API key, and direct Google OAuth permission are needed for the full workflow; a previously connected YouTube channel should be remembered across launches.
- YouTube **Unlisted** means anyone with the link can watch. The app does **not** automatically publish publicly.
- Build-time syntax/DOM checks pass, but no live Revid video or authorized YouTube upload has yet been performed by this code. After installing, the one-video check is required to verify real provider behavior.
- This is an ongoing pipeline for future videos, not limited to 21 videos. Library query pagination remains dependent on Revid's supported endpoint.

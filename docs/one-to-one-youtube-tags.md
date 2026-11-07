# YouTube keyword tags — one-to-one in Clip Farm

## What is automatic now

The **Publish Existing Revid Videos** screen stores each video's tags as part of that exact Revid project ID. The SEO generation uses vidIQ keyword research and Gemini for the final metadata; importing a JSON SEO package also uses project IDs rather than matching names. Each SEO-ready Revid video visibly displays its title, unique project ID, research source and complete keyword tags together.

- **Copy Tags** copies only that video's comma-separated keyword tags, ready to paste into YouTube Studio's *Tags* field.
- **Edit this video in YouTube Studio** opens the identified YouTube video's edit page when the confirmed YouTube URL is available; otherwise **Open YouTube Studio** opens its homepage.
- **Mark Tags Added** is a manual confirmation after pasting and saving. This is not a verification from YouTube. Status persists in Clip Farm's local storage and can be undone.
- When metadata is changed, copy/added status resets; when reimporting the same tags for the same project ID, status remains.
- Tag length greater than YouTube's 500-character allowance produces a visible warning and disables copying until edited.

## How to finish one video

1. Open **Publish Existing Revid Videos** in Clip Farm.
2. Find the SEO-ready Revid video by its exact title and project ID.
3. Click **Copy Tags**.
4. Click **Edit this video in YouTube Studio** (or open YouTube Studio and select the corresponding video) → Details → Show more → Tags. Paste, then save.
5. Return to the matching Clip Farm video and choose **Mark Tags Added**. Repeat for the next Revid project.

## Why manual copying is needed in the current integration

Revid's currently documented public publishing call accepts the connected YouTube account ID and title/description, but no confirmed keyword `tags` upload field. The YouTube Data API *does* support `snippet.tags` through `videos.update`, but that requires Clip Farm to obtain its own YouTube OAuth authorization and use the owned video's YouTube ID. Revid-connected YouTube authorization cannot be reused as a direct YouTube OAuth token by Clip Farm. Therefore, this update does not claim to have automatically uploaded tags.

Official YouTube API: https://developers.google.com/youtube/data/reference/rest/v3/videos
Revid public API: https://www.revid.ai/docs/api-reference

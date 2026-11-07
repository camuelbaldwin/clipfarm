# Review drafts vs private YouTube uploads

## Default in Clip Farm: Prepare Review Draft

The **Publish Existing Revid Videos** screen shows **Prepare Review Draft** for every SEO-ready video. Clicking it records the reviewed title/description/tags in Clip Farm's local saved queue with a draft-prepared timestamp. It does **not** call Revid `publish-now`, does **not** upload to YouTube, and does **not** make a video public.

## Revid direct publishing

Revid's documented API publishes immediately (`publish-now`) or schedules a future post (`add-to-queue`). Its currently verified API docs do not confirm a parameter for uploading a YouTube private/draft video. Do **not** label either action as a safe YouTube draft. Revid project visibility (public/unlisted/private) applies to Revid's project page; it is **not** YouTube video privacy.

Immediate public publishing remains available under a closed **Advanced** section only when the user explicitly checks a risk acknowledgement, checks **Approved** for the video, chooses a connected YouTube channel, and confirms a warning that the video may become public immediately.

## For a real YouTube private video

Until a direct YouTube OAuth integration is built and tested, download/export the completed Revid MP4 and upload it in YouTube Studio, then set **Visibility → Private**, add the matching title, description and copied tags, and save. This makes the video accessible in YouTube Studio without making it publicly visible.

YouTube's own official API supports `videos.insert` with `status.privacyStatus="private"` and snippet tags. Future automatic uploads need separate YouTube OAuth permission; Revid's connected-account setting is not sufficient authorization for Clip Farm to call the YouTube API.

Sources: https://www.revid.ai/docs and https://developers.google.com/youtube/data/reference/rest/v3/videos/insert and https://support.google.com/youtube/answer/57407

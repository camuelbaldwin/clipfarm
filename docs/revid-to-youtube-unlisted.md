# Clip Farm → Revid → YouTube Unlisted (Intel Mac)

The Mac app now includes a direct YouTube uploader, so you **do not download a Revid MP4 or paste metadata into YouTube Studio**. Revid renders, and Clip Farm transfers the completed Revid video to the authorized YouTube channel with its title, description, hashtags and keyword tags. YouTube visibility is explicitly set to `unlisted`. Public Revid publishing is kept separate and requires an additional warning and approval.

## First-time setup: connect your own Google account

1. In [Google Cloud Console](https://console.cloud.google.com/), create or select a project and [enable YouTube Data API v3](https://console.cloud.google.com/apis/library/youtube.googleapis.com).
2. Configure the Google OAuth consent screen (Google Auth Platform). If the app is in Testing mode, add your Google account as a test user. Only authorize an account you control.
3. Under [Google Auth Platform → Clients](https://console.cloud.google.com/auth/clients), create an OAuth 2.0 client with **Application type: Desktop app**. Copy its **client ID** and **client secret** if provided.
4. Open the latest Clip Farm **Mac desktop app**, choose **Publish Existing Revid Videos → Direct YouTube connection**, enter those Google OAuth Desktop credentials, and click **Connect YouTube**.
5. Approve the YouTube upload/read permission in the browser. You'll see a confirmation and the connected YouTube **channel name** in Clip Farm. This connection is stored with Electron `safeStorage` using macOS encrypted storage, and automatically restored when you next launch Clip Farm. **Disconnect** removes it.

The app uses a local callback at `http://127.0.0.1:43129/api/youtube/callback` and never sends OAuth refresh tokens to Revid, vidIQ or Gemini. The channel being uploaded to is the Google-authenticated YouTube channel shown inside Clip Farm; it is **not** necessarily the channel linked within Revid.

## Workflow A: New videos

1. **Create New Videos**: enter a title, script and optional visual prompt, or use vidIQ/Gemini research to create drafts.
2. **Send to Revid**: estimate the cost and approve rendering.
3. When the new Revid job finishes and has a video link, use **Generate SEO (vidIQ + Gemini)** or **Generate SEO for all completed new Revid videos**.
4. Preview the video and mark it **Approved**.
5. Choose **Upload Unlisted + SEO**, or use **Upload all approved SEO-ready videos as Unlisted** for a single confirmation and sequential processing.

## Workflow B: Existing Revid videos

1. Choose **Publish Existing Revid Videos**, click **Load Revid videos**, and select the 21 videos.
2. Click **Create SEO for selected videos**, using vidIQ keyword research and Gemini generation. Existing valid JSON SEO packages still import by exact Revid project ID.
3. Review each project's SEO and preview it; mark videos **Approved**.
4. Click **Upload Unlisted + SEO** on individual projects or **Upload all approved SEO-ready videos as Unlisted**.
5. Clip Farm verifies the project ID with Revid, downloads the completed MP4 internally to a temporary Mac folder, uploads it to YouTube using OAuth and `videos.insert` with `status.privacyStatus: unlisted` and `snippet.tags`, checks the final visibility, saves the YouTube ID and link, and deletes the temporary file. It blocks repeat uploads for an already-linked project ID.

## Important limitations

- **This direct pipeline runs in the Mac desktop app, not in the Cloudflare-hosted web app.** The web interface reports that desktop upload is required. The Mac app must be rebuilt with the latest source to include this feature.
- It is code-complete but **not live-tested with your Revid, Google or YouTube credentials**. Your Google OAuth application must have YouTube Data API enabled and permission to upload. A Google OAuth app in Testing mode may need additional consent/test-user configuration.
- Unlisted means anyone with the link can view the video; it is not a private draft. You choose whether to make it Public in YouTube Studio later.
- Each video uploads only after approval. The bulk action uses a single confirmation for selected, approved video records.
- Clip Farm holds the Google connection in encrypted macOS storage; Revid, Gemini and vidIQ keys remain in the existing app profile.
- If network failure happens after YouTube accepts an upload but before an ID is confirmed, **check YouTube Studio before retrying** to avoid accidental duplicates. If YouTube returns an unexpected privacy setting, Clip Farm preserves the video ID and flags the visibility for review.
- API requests and video uploads are subject to Google's quotas, OAuth app requirements, and Revid output URL availability. The app currently downloads to a temporary folder to allow reliable large uploads (maximum 1 GB per video).
- Video SEO is still a draft until reviewed. Gemini does not independently see every Revid render unless its source content is available.

Official API documentation: [YouTube videos.insert](https://developers.google.com/youtube/data/reference/rest/v3/videos/insert), [resumable uploads](https://developers.google.com/youtube/data/guides/using_resumable_upload_protocol), [desktop app OAuth](https://developers.google.com/identity/protocols/oauth2/native-app).

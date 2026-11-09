# Clip Farm Studio for Mac

This desktop app runs the Clip Farm interface and its existing API routes on your Mac. It does not require Wrangler or a separate Cloudflare account to launch. Provider accounts and API keys are still needed for live search, analysis, social-link extraction, keyword metrics, and rendering.

The Intel build targets macOS 10.15 Catalina and newer. Catalina support requires Electron 32.3.3; Electron 33 and newer require macOS 11 or newer. Electron 32 has reached end of support, so this build is intended for Catalina compatibility and uses an older Chromium runtime. Upgrade macOS when possible for a maintained desktop runtime.

## Clip Farm → Revid → YouTube Unlisted

The updated Intel Mac app can directly upload finished Revid projects to YouTube as **Unlisted**, including the matching video-specific title, description and keyword tags. You do not need to download MP4 files or paste metadata into YouTube Studio.

You must authorize your YouTube account using a Google OAuth Desktop client and enable YouTube Data API v3 in your Google Cloud project. Clip Farm encrypts and remembers your Google connection in macOS local secure storage. All uploads require per-video approval; one bulk action can send all approved SEO-ready videos sequentially.

**Setup and workflow:** [docs/revid-to-youtube-unlisted.md](../docs/revid-to-youtube-unlisted.md)

This capability runs in the Mac app's local API bridge and is not available in the Cloudflare web version. The implementation has code and build-time checks, but live Revid/Google/YouTube integration requires a test with your authorized accounts.

## What is included

- **Find videos:** search indexed public videos by topic, niche, or keyword.
- **Analyze + prompt:** analyze an upload or supported video link, inspect the breakdown, and edit/copy the generated prompt.
- **Create a rough cut:** request a Revid estimate and confirm before rendering.
- **SEO keywords:** retrieve Google Ads keyword estimates and related ideas.
- **Saved prompt history:** stays on this Mac in the app's browser storage.

The desktop app reuses `../worker/index.js` through a small local HTTP adapter. The adapter listens only on `127.0.0.1` on a temporary port. The Worker calls the same providers used by the web app. API keys are not included in the app package or source repository.

## Build on a Mac

1. Install Node.js 24 or newer.
2. In Terminal, open this `mac` folder.
3. Run `npm install`.
4. Run `npm start` to open the app during development.
5. Run `npm run pack:mac:x64` to create an Intel Mac `.dmg` in `mac/release/`.

Use `npm run pack:mac:arm64` to package for Apple Silicon. Builds are unsigned in this starter version. On first launch, macOS may require Control-clicking the app and choosing **Open**.

## Download the Intel Mac installer

**Direct-download releases:** https://github.com/camuelbaldwin/clipfarm/releases

The installer is a macOS `.dmg` file, not a JSON file or a GitHub source-code ZIP. A download only appears after a successful build.

To make a new installer:
1. Sign in to GitHub and open https://github.com/camuelbaldwin/clipfarm/actions/workflows/build-clip-farm-mac.yml
2. Click **Run workflow**, select `main`, and click the green **Run workflow** button.
3. Open the new run and confirm the **Package Intel Mac app** and **Publish direct-download release** steps are green.
4. Open https://github.com/camuelbaldwin/clipfarm/releases and download the latest `.dmg` under **Assets**.

Automatic builds on source changes also provide the `clip-farm-mac-intel` ZIP under **Artifacts** on the successful workflow run page. Extract that ZIP to get the `.dmg`.

To install: open the DMG, drag the application to Applications, then Control-click the app → **Open** if macOS warns that it isn't from an identified developer. Builds are unsigned. Your Mac must have an Intel processor and macOS 10.15 or newer.

**If there is no DMG in Releases or Artifacts:** the workflow has not finished successfully. Open the latest Actions run and inspect the first red step. Do not download the GitHub `Source code.zip` archive: that is source code, not the installer.



## Publishing tracker and scheduled YouTube releases

The Mac app now has a **YouTube Publishing Tracker** in Batch Production.

1. Connect YouTube. To authorize additional channels under the same Google account, choose **Connect YouTube** again and select the channel in Google's authorization screen.
2. Use **Active publishing channel** to select which authorized channel receives new uploads and schedule requests.
3. Click **Sync connected channel** to read the channel's actual recent uploads, visibility, schedule, views, likes and comments. This includes videos uploaded directly through YouTube Studio.
4. Use the channel/status filters to browse a combined local history. **Export CSV** creates a local report.
5. To schedule an eligible, never-public video: sync its channel, select an Unlisted or Private upload, choose a future local date/time, and approve the confirmation. YouTube stores the schedule and publishes without the Mac running.

**Important limitations:** This tracker stores its local history in the Electron userData directory; it is not a cloud synchronization service. Reconnect each channel at least once to authorize and track it. Each sync scans up to the newest 500 uploaded videos of the currently selected channel, and retains previously discovered records across channel switches. Private, scheduled and public states must be refreshed from YouTube; a cached status is not proof the video went live. Deleted videos can remain in the local historical log until separately reconciled. Revid's *Publish Now* action does not share this guaranteed Google-based scheduling path.

**Google permissions:** Scheduling via YouTube Data API requires the \`youtube.force-ssl\` OAuth scope in addition to prior upload and read scopes. Existing Clip Farm YouTube connections must be **re-authorized** with the additional permission before scheduling. Google's API only allows scheduling never-public videos in Private state and will reject invalid requests. <https://developers.google.com/youtube/data/reference/rest/v3/videos>

**Checks:** \`cd mac && npm run test:publishing\`. Live YouTube authentication, API quota, successful schedule activation, Mac packaging and time-zone behavior still need an end-to-end test before production use. Do not assume a scheduled upload is confirmed until YouTube's API returns the schedule.

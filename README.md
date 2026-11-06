# Clip Farm Studio

Clip Farm is a video research and prompt-building workspace. It supports public video discovery, social video analysis, structured prompt generation, optional rough-cut rendering, and keyword metrics.

## Repository layout

- `worker/index.js` — the app interface and provider API routes.
- `mac/` — a desktop app for Intel and Apple Silicon Macs.
- `wrangler.toml` — optional Cloudflare Worker configuration for the web version.

## Use the Mac app

The Mac app opens Clip Farm in its own desktop window and runs the existing provider routes locally. You do not need Wrangler or a Cloudflare account to launch it.

The Intel build targets macOS 10.15 Catalina and newer. It pins Electron 32.3.3 because Electron 33 and newer require macOS 11 or newer. Electron 32 is end-of-support; this compatibility build uses an older Chromium runtime. Upgrade macOS when possible.

```sh
cd mac
npm install
npm start
```

To package an Intel Mac disk image on a Mac:

```sh
npm run pack:mac:x64
```

The GitHub Actions workflow **Build Clip Farm for Mac** can create a downloadable Intel `.dmg` artifact. See [mac/README.md](mac/README.md) for setup and install details.

## Use the web Worker

Wrangler is only needed if you want to run or deploy the web version locally:

```sh
npm install --global wrangler
wrangler dev
```

Provider calls require keys entered in the app's API connections panel.

## Provider keys

Gemini, Revid, Apify, and Google Ads credentials are supplied by the operator at runtime. Never commit API keys, refresh tokens, or local environment files. The app sends each key to the provider when that feature is used.

## Deployment

This repository is the GitHub source for Clip Farm. Deploy the web Worker to a Cloudflare account with Wrangler only when you want to update that web deployment. The Mac app is packaged separately by electron-builder on a macOS runner.
## Batch SEO → Revid → YouTube

In **Batch Production**, use **Download JSON example** for the supported Make-to-Clip-Farm JSON shape:

```json
[
  {
    "title": "How Engineers Built the Channel Tunnel",
    "script": "Your narration script...",
    "prompt": "Realistic 3D cutaways of tunnel boring machines",
    "stylePrompt": "9:16 vertical engineering explainer",
    "referenceUrl": "",
    "seo": {
      "title": "How the Channel Tunnel Was Built",
      "description": "Watch the engineering behind the Channel Tunnel.",
      "primaryKeyword": "Channel Tunnel construction",
      "tags": ["Channel Tunnel", "engineering", "tunnel boring"]
    }
  }
]
```

Clip Farm accepts an array of up to 100 jobs, or `{"videos":[...]}`. The **script** field is required. Its SEO metadata is retained in the local queue and **Export queue/status** output, so a Make scenario can generate JSON for batches of five. Importing the JSON does **not** start rendering. Estimate credits and start up to five separate Revid jobs concurrently. Keep the app open while it polls.

### YouTube publishing

1. Connect YouTube under Revid **Settings → Integrations**.
2. Save your Revid API key in Clip Farm. In Batch Production, select **Load accounts** and choose the correct YouTube channel.
3. After a render completes, preview the result; use **Edit SEO** to inspect the title, description, keyword and tags.
4. Check **Approved** for that specific video, then click **Publish to YouTube** and confirm the destination.
5. The queue records a Revid submission response separately from confirmed publication. Check Revid or YouTube Studio for final publication and errors.

Publishing uses Revid public v3 `social-accounts` and `publish-now`. The account-specific v3 publishing payload still requires an authenticated end-to-end check before production use. Nothing auto-publishes merely because a job finished rendering. Current queue/status data is stored in the local browser/app profile, not automatically synchronized back to Google Sheets. The Google Sheets → Make JSON preparation is configured in Make separately.

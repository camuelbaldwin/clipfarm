# Clip Farm Studio

Clip Farm is a video research and prompt-building workspace. It supports public video discovery, social video analysis, structured prompt generation, optional rough-cut rendering, and keyword metrics.

## Repository layout

- `worker/index.js` — the app interface and provider API routes.
- `mac/` — a desktop app for Intel and Apple Silicon Macs.
- `wrangler.toml` — optional Cloudflare Worker configuration for the web version.

## Use the Mac app

The Mac app opens Clip Farm in its own desktop window and runs the existing provider routes locally. You do not need Wrangler or a Cloudflare account to launch it.

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
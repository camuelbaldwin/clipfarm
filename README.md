# Clip Farm Studio

Clip Farm is a video research and prompt-building workspace. It supports public video discovery, social video analysis, structured prompt generation, optional rough-cut rendering, and keyword metrics.

## Repository layout

- `worker/index.js` — Cloudflare Worker entry point and the complete app UI.
- `wrangler.toml` — Worker configuration for local development and deployment.

## Run locally

Install Wrangler, then run the Worker from this repository:

```sh
npm install --global wrangler
wrangler dev
```

The app page runs locally at the URL Wrangler prints. Provider calls require keys entered in the app's API connections panel.

## Check the source

```sh
node --check worker/index.js
```

## Provider keys

Gemini, Revid, Apify, and Google Ads credentials are supplied by the operator at runtime. Never commit API keys, refresh tokens, or local environment files. The app sends each key to the provider when that feature is used.

## Deployment

This repository is the GitHub source for Clip Farm. Deploy the Worker to a Cloudflare account with Wrangler after configuring that account. Do not deploy a second copy to GitHub Pages; the app needs Worker routes for provider API calls.

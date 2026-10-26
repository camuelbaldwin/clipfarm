# Clip Farm Studio for Mac

This desktop app runs the Clip Farm interface and its existing API routes on your Mac. It does not require Wrangler or a separate Cloudflare account to launch. Provider accounts and API keys are still needed for live search, analysis, social-link extraction, keyword metrics, and rendering.

The Intel build targets macOS 10.15 Catalina and newer. Catalina support requires Electron 32.3.3; Electron 33 and newer require macOS 11 or newer. Electron 32 has reached end of support, so this build is intended for Catalina compatibility and uses an older Chromium runtime. Upgrade macOS when possible for a maintained desktop runtime.

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

## Download a Mac build from GitHub Actions

The `Build Clip Farm for Mac` workflow can package the Intel `.dmg` on a macOS runner. Run it from the repository's **Actions** tab with **Run workflow**, then download the `clip-farm-mac-intel` artifact from the completed run.

## Technical note

The desktop app uses Electron to provide a native Mac window and package the existing Clip Farm workflow. The HTML interface and provider routes remain in the existing Clip Farm Worker source. `npm run sync:worker` copies that source into a temporary `.mjs` file for the app package; the generated file is ignored by Git.

# Clip Farm Studio v1.1.2 — local server protection

This update secures the **Mac desktop app's** loopback API at `http://127.0.0.1:43129` without changing Revid rendering, vidIQ/Gemini SEO, or authorized YouTube Unlisted uploads.

## How it works

- The app generates a fresh random 256-bit token in memory on every launch. The token is not written to disk.
- The sandboxed Electron preload provides a narrowly scoped session bridge to the trusted Clip Farm window. The Electron main process checks the window and frame URL before releasing the token.
- Browser API POST requests, including multipart video analysis, send the session token in the `x-clip-farm-session` request header.
- The Mac server rejects API requests unless the **Host** is exactly `127.0.0.1:43129`, **Origin** is exactly `http://127.0.0.1:43129`, and the token matches. This guards against unauthorized cross-origin requests and many DNS-rebinding attempts.
- Wildcard `Access-Control-Allow-Origin: *` was removed from Worker responses.
- The app's initial page load remains available without a token. Google's **GET** `/api/youtube/callback` is exempt from token authentication so the OAuth browser redirect can finish; it still requires the expected OAuth `state`/PKCE validation inside the existing handler.

## Security testing

Run `cd mac && npm run test:local-security && npm run test:unlisted`. GitHub Actions runs both checks before generating the Intel Mac DMG. Tests cover rejected foreign Origins, missing/wrong tokens, incorrect Host, disallowed methods, accepted app requests, and the Google OAuth callback.

## Boundaries

This is not a standalone audit or a signed/notarized installer. A process with privileged access to your Mac or malicious code running inside the trusted app page might bypass these safeguards. API keys for Revid/Gemini/vidIQ are still stored in browser localStorage in this version; encrypting those keys is separate future work.

The **hosted web prototype** cannot obtain the Mac session token and cannot use the Mac-only YouTube upload endpoints. Its same-origin API calls continue to work; cross-origin API clients no longer receive wildcard CORS access.

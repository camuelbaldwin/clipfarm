# Photo-story workflow — Clip Farm Studio 1.1.3

This is an enhancement to the existing Clip Farm interface. The standard script-to-video workflow, 10 concurrent Revid render queue, saved SEO, YouTube OAuth, and Unlisted uploader remain in place.

## Use your own authentic photos

1. In **Create New Videos**, choose **Photo-story JSON example** to populate a valid example, or paste your own JSON containing a `stories` array. Each story accepts `title`, `narration` (or `script`), `prompt`, `seo`, and `photo_sequence`.
2. Click **Import / replace queue**. Each story appears as a new-video card.
3. In **Story photos**, select the actual image files matching the `photo_sequence[].filename` names. Use up to 12 photos per story; each must be an image and at most 20 MB.
4. Clip Farm uploads each selected image through your Revid API connection and stores the returned image URL in the story's local queue record. Progress survives later sessions as long as local app data is kept.
5. The story card displays missing filenames. A story with a `photo_sequence` cannot proceed to credit estimation or rendering until **every** image is attached and the list has no duplicates or extras.
6. Clip Farm prepares Revid's custom-media payload in the order listed in `photo_sequence`, not the order selected in the file picker. Revid receives `useOnlyProvided`, `useProvidedInOrder`, and `turnImagesIntoVideos`.
7. **Estimate selected credits**, approve the estimate, and **Start selected renders**. Up to 10 jobs may be submitted concurrently subject to Revid limits.
8. When Revid completes a video, generate/review its SEO, preview and approve, then **Upload Unlisted + SEO** through the connected YouTube account.

## Limitations

- This workflow uses photos *you provide*. It does not download web images or invent photographs.
- `hold_seconds` and `visual` are retained as story sequence notes; the Revid payload currently guarantees **image order**, not exact timing for individual photos.
- Revid upload endpoint behavior and the Mac installer still require validation with a real account. Static checks and script parsing are not an end-to-end photo render.
- The photo-story file picker is on **new** video cards; existing finished Revid videos are handled through the separate publishing workflow.

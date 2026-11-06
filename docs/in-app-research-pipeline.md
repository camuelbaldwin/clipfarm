# Research → Publish inside Clip Farm

The new **Research → Publish** tab runs a workflow without Make or importing a JSON file:

1. Enter a niche and search Revid's public video index; review real reference links, view counts and likes when supplied.
2. Select relevant references and ask Gemini to draft 3, 5 or 10 **original** Shorts, with narration, visual instructions and YouTube metadata.
3. Review/edit each script, visuals, title, description and tags.
4. Send selected drafts directly to **Batch Production**, where the existing Revid credit-estimate / batch-render controls handle up to 5 concurrent submissions.
5. Preview completed videos, approve each one, then use the existing YouTube publish controls.

## Accounts needed

- Revid API key for indexed video research and rendering.
- Gemini API key for scripts and SEO drafting.
- YouTube connected to Revid for the optional publication handoff.

## Important limitations

- The standalone Clip Farm app does **not** call the ChatGPT account's installed vidIQ plugin; plugin access is confined to the connected ChatGPT context. Research inside the app uses Revid's indexed public videos, not vidIQ breakout scores or keyword difficulty. Do not display a fabricated score.
- Generated claims, scripts, SEO and render credit estimates require review. No automatic rendering or automatic publication follows research generation.
- The Revid social accounts and publish-now endpoints were added earlier but still require an authenticated live test against the connected account. Do not assume that submission means YouTube publication.
- The pipeline queue, selected references and generated drafts are saved in the current app/browser profile. Leave the app open during active batch renders.
- Deployment and native Mac packaging are separate steps after merging the change.

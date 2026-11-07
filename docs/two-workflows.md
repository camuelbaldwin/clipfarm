# Clip Farm Studio — two workflows only

## 1. Create New Videos

For content not yet created in Revid.

- Enter a title, original narration script, and optional visual prompt and click **Add to New Video Queue**.
- Alternatively use research → Gemini to generate drafts, or import a JSON batch file of scripts/prompts.
- Select new jobs, estimate Revid credits, confirm rendering, and monitor creation. Five concurrent requests are possible subject to Revid limits.
- This screen never shows Revid projects imported for SEO publishing.
- Revid-rendered jobs become available in Revid's project library; to add SEO/publish, open the second workflow.

## 2. Publish Existing Revid Videos

For videos already made in Revid, including new videos rendered from the first workflow.

- Click **Load Revid videos**; select the matching projects.
- Click **Create SEO for selected videos**. vidIQ supplies keyword research and Gemini writes YouTube title, description (with hashtags), primary keyword and tags for the existing video topic. Or import a valid `clipfarm-seo-v1` JSON package whose project IDs match exactly.
- Each Revid project ID identifies its corresponding SEO record. Review the source, title, description and tags before publishing. Title-only results need extra checking.
- The existing video list never submits new renders. If Revid hasn't returned a finished video URL, select **Check Revid video** once it has exported.
- Select the connected YouTube account via **Load accounts**, preview and mark each video approved, then click **Publish to YouTube** and confirm. **Check YouTube status** shows processing, failure or Revid-confirmed publication.
- YouTube title and description (including hashtags) are passed via Revid's documented publishing API. Keyword tags are saved and can be copied for YouTube Studio; Revid's publishing API does not document a tags field.

## What was removed

The five manually researched legacy video package and older SEO matching dropdown were removed. Both workflows preserve the other workflow's records, so importing or generating new video drafts cannot replace previously matched Revid publishing records.

## Safety and status

No Revid rendering or YouTube publishing occurs without explicit approval. The app's API calls still require configured provider keys and live integration testing. The Mac installer must be rebuilt and deployed to receive these interface changes.

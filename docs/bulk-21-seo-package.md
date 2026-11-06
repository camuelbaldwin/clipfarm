# Clip Farm — 21 existing Revid videos → SEO import package

The deliverable is **one JSON file**, not a spreadsheet. Its format is `clipfarm-seo-v1`.

## Workflow

1. Open **Render + Publish** in the updated Clip Farm web/Mac app.
2. Save **Revid**, **vidIQ MCP** and **Gemini** keys under API connections.
3. Click **Load Revid videos**, then select the 21 projects you want (the Revid API returns up to 100, and may include projects other than those 21).
4. Click **Create SEO for selected videos**. Confirm the vidIQ/Gemini research costs. The app performs provider keyword research and SEO drafting separately for each selected project and attaches output by **exact Revid project ID**.
5. Each completed record is saved in the existing Clip Farm batch queue (without triggering rendering or publishing), and a single `clipfarm-revid-seo-N-videos.json` file is downloaded. Failures are reported and successfully completed records remain attached.
6. For previously prepared SEO, click **Import SEO JSON package** after loading your Revid projects. Invalid or unknown project IDs are rejected as a set rather than guessed from titles. A corresponding **Download matched SEO package** action exports your linked records.
7. Review each video's title, description, hashtags, keyword and tags in Clip Farm. Select a connected Revid YouTube account. Approve publishing separately for each video.

## Mapping to destinations

- `projectId` → exact Revid project used to fetch/publish the video.
- `seo.title` → YouTube title, supplied through Revid publishing `youtube.title`.
- `seo.description` (including hashtags) → YouTube description, supplied through `youtube.description`.
- `seo.primaryKeyword` → internal keyword reference for editing/research; **not** a standalone YouTube API field.
- `seo.tags` → stored in Clip Farm and **Copy YouTube metadata** button for YouTube Studio Tags; the Revid publishing API does not document a tags field.
- `research.keywordIdeas` → attached provenance/research for review, not included in video metadata.

## JSON shape

```json
{
  "format": "clipfarm-seo-v1",
  "createdAt": "2026-11-06T00:00:00.000Z",
  "videos": [
    {
      "projectId": "EXACT_REVID_PROJECT_ID",
      "revidTitle": "Actual Revid project name",
      "seo": {
        "title": "Video-specific title",
        "description": "Video-specific YouTube description #Shorts",
        "primaryKeyword": "specific topic keyword",
        "tags": ["relevant tag", "related search term"]
      },
      "research": {"source": "vidIQ keyword research", "keywordIdeas": []}
    }
  ]
}
```

The example contains placeholder IDs and is **not itself importable for a real Revid account**. Only the app-generated package or a package with verified matching project IDs will import.

## Limits

Revid's projects API returns project names and video URLs but does not guarantee full narration or visual transcripts for projects made on the website. When only a project title is present, metadata is a topic-based draft, **not video-verified SEO**. Review factual claims and matches before posting. Title/description publication uses Revid; YouTube tags may require manual update in YouTube Studio. API integration has passed JavaScript syntax checks but has not been live tested with account credentials. No render jobs or posts occur automatically.

# Client images and videos

One folder per client, named exactly like the client's `slug` in `js/data.js`:

```
assets/projects/mcdo/cover.jpg      cover shown on the card and at the top of the page
assets/projects/mcdo/01.webp        gallery images
assets/projects/mcdo/reel1.mp4      gallery videos
```

New client? Copy the `mcdo` folder, rename it, delete the README inside, and upload their files.

**Sizes (important for speed and GitHub):**
- Images: max 1600 px wide, `.webp` or `.jpg`, under 300 KB each.
- Videos: `.mp4`, under 10 MB each. GitHub blocks any file over 100 MB.
- For long videos, upload to YouTube or Vimeo and embed them instead of uploading the file.

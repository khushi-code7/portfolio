---
# Copy this file, rename it, and the URL becomes /writing/<the-file-name>/
# Leave this one as draft: true and it never reaches the live site.

title: The title, in sentence case
summary: One sentence. It shows on the index and in the Google result — make it say something.
date: 2026-07-28

# Optional. Delete the ones you do not need.
# updated: 2026-09-01        # only when you have substantively changed the argument
# series: 'Attention and choice'   # groups multi-part essays together
tags:
  - Consumer behaviour

# Sources, rendered as a numbered list at the foot of the essay.
# references:
#   - text: 'Author, A. (2024). Title of the thing. Journal, 12(3), 1–20.'
#     href: 'https://example.com/paper'

# Keeps it off the live site while still showing in `npm run dev`.
draft: true
---

Open with the claim, not with throat-clearing. The first sentence should be the
thing you would say if someone asked what the essay is about.

## A heading, if the piece needs one

Ordinary Markdown works: **bold**, *italic*, [links](https://example.com), lists,
and `> ` for block quotes. Footnotes work too[^1] — useful when you want to cite
without breaking the sentence.

Tables render properly, so a small table is usually a better idea than a chart:

| Construct | Measure | Source |
| --- | --- | --- |
| Attention fragmentation | 5-item scale | Adapted from … |

For an actual chart, make the image elsewhere, drop the file into `public/`, and
reference it with `![Alt text describing what the chart shows](/chart.png)`.
Alt text is not optional.

[^1]: Footnotes appear at the bottom of the page automatically.

<!-- When you are ready to publish: set `draft: false`, save, commit, push.
     Vercel builds it and the Writing link appears in the nav by itself. -->

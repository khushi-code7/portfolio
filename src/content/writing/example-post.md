---
title: Example post
summary: A one-line description that shows up on the index page and in link previews.
date: 2026-05-01
tags: ['Placeholder']
draft: true
---

This is a template post. It is marked `draft: true`, so it stays out of the
built site and shows up only in `npm run dev`.

To publish something: copy this file, rename it, set `draft: false`, and write.
The filename becomes the URL — `src/content/writing/my-post.md` becomes
`/writing/my-post/`.

## Frontmatter reference

| Field     | Required | Notes                                       |
| --------- | -------- | ------------------------------------------- |
| `title`   | yes      | Page heading                                |
| `summary` | yes      | One line, shown on the index                |
| `date`    | yes      | `YYYY-MM-DD`; sorts the index, newest first |
| `tags`    | no       | Array of strings                            |
| `draft`   | no       | `true` keeps it out of the build            |

Reading time is calculated automatically from the body, so there is nothing to
set for that.

## Formatting

Standard Markdown. Code blocks are syntax-highlighted at build time, with
separate light and dark themes:

```ts
export function greet(name: string): string {
  return `Hello, ${name}`;
}
```

> Blockquotes work too.

Links, **bold**, _italics_, and lists all behave as you would expect.

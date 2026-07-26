---
title: Example project
summary: A one-line description of what this was and why it mattered.
date: 2026-05-01
tags: ['Placeholder']
featured: false
draft: true
---

This file is a template. It is marked `draft: true`, so it does not appear in
the built site — it stays visible in `npm run dev` only.

Copy it, rename it, set `draft: false`, and write. The filename becomes the URL:
`src/content/projects/my-thing.md` → `/projects/my-thing/`.

## Frontmatter reference

| Field      | Required | Notes                                          |
| ---------- | -------- | ---------------------------------------------- |
| `title`    | yes      | Shown as the page heading                      |
| `summary`  | yes      | One line, shown on the index and in link previews |
| `date`     | yes      | `YYYY-MM-DD`; sorts the index, newest first    |
| `tags`     | no       | Array of strings                               |
| `url`      | no       | Live site — renders a "Visit site" button      |
| `repo`     | no       | Source — renders a "Source" button             |
| `featured` | no       | `true` pins it to the homepage                 |
| `draft`    | no       | `true` keeps it out of the build               |

## Writing the body

Plain Markdown. Headings, lists, tables, links, and fenced code blocks all work:

```ts
const shipped = true;
```

Anything you would put in a README belongs here.

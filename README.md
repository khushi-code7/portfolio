# Portfolio

Personal site. Astro, static output, deployed to Vercel from GitHub.

## Running it

```
npm install
npm run dev      # http://localhost:4321
```

| Command | Does |
| --- | --- |
| `npm run dev` | Local server with hot reload. Drafts are visible here. |
| `npm run build` | Typechecks, then builds static HTML to `dist/`. Drafts excluded. |
| `npm run preview` | Serves `dist/` — what Vercel will actually serve. |
| `npm test` | Unit tests (vitest). |

## Adding a project

Create `src/content/projects/my-project.md`:

```markdown
---
title: My project
summary: One line about what it is.
date: 2026-07-26
tags: ['Astro', 'TypeScript']
url: https://example.com
repo: https://github.com/you/repo
featured: true
---

Markdown body goes here.
```

It appears at `/projects/my-project/` and on the work index. No template edits.
`url` and `repo` are optional; `featured: true` pins it to the homepage.

## Adding a post

Same idea in `src/content/writing/`. Reading time is calculated from the body.

There is a `draft: true` template file in each folder with the full frontmatter
reference — copy it rather than starting from scratch.

## Editing who you are

Name, tagline, intro paragraph and social links all come from
[`src/data/site.ts`](src/data/site.ts). A link with an empty `href` is hidden,
so you can leave the ones you do not use.

Longer bio prose is [`src/pages/about.md`](src/pages/about.md).

## Structure

```
src/
  content/         projects and posts, as Markdown
  content.config.ts  frontmatter schemas (Zod)
  data/site.ts     name, links, intro
  layouts/         Base (every page), Prose (markdown pages)
  components/      Header, Footer, EntryList
  lib/content.ts   sorting, dates, reading time — unit tested
  pages/           routes
  styles/global.css  all styling; design tokens at the top
public/            favicon, robots.txt — copied verbatim
```

No client-side JavaScript ships on any page.

## Deploying

`main` is production. Every branch and PR gets a Vercel preview URL. Nothing
merges to `main` that has not built cleanly — `npm run build` locally first.

## Before launch

- Set `url` in `src/data/site.ts` to the real domain (currently `example.com`).
  The sitemap, RSS feed and canonical tags all derive from it.
- Update the `Sitemap:` line in `public/robots.txt` to match.

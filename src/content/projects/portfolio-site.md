---
title: This site
summary: A portfolio built on Astro — static, dependency-light, and fast enough to feel instant.
date: 2026-07-26
tags: ['Astro', 'TypeScript', 'CSS']
featured: true
---

I wanted a site that would still build in five years, so I kept the surface area
small: Astro for the static build, plain CSS with custom properties, and no
client-side JavaScript at all on most pages.

## Decisions

**Static, not server-rendered.** Nothing on a portfolio needs a server. Static
output means Vercel serves files from the edge and there is no runtime to break.

**Content as Markdown.** Projects and posts live in `src/content/` as Markdown
files with typed frontmatter. Adding work means adding one file — the layout is
never touched.

**No webfonts.** The system font stack renders on the first paint. A custom
typeface would cost a round trip and a layout shift to buy very little.

**Dark mode via `prefers-color-scheme`.** No toggle, no stored preference, no
flash of the wrong theme. The OS already knows the answer.

## What I would do differently

The colour tokens are hand-tuned rather than generated, which works at this size
but would not scale to a real design system. If the site grows past a dozen
components, that is the first thing to formalise.

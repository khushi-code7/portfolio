# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A personal portfolio site. Custom domain is already owned. Ships to Vercel, deployed from GitHub.

## How to work with me

- **Just ship it.** Build the whole thing, then give me a short summary of what exists and what to look at. Skip the walkthrough of how the code works unless I ask.
- **High autonomy.** Make the judgment calls yourself — naming, file layout, library choices, structure. Don't stop to confirm reasonable decisions. Do stop before anything destructive or irreversible (deleting work, force-pushing, changing DNS, spending money).
- **Finish the task.** Partial delivery with a list of caveats is worse than a working thing. If part of it is genuinely blocked, complete everything else and say plainly what you left and why.
- **Disagree if I'm wrong.** If I ask for something that will cause problems, say so in a sentence, then build what I asked unless I change my mind.

## Priorities, in order

1. **Working over perfect.** Get it running, then refine. Prefer the boring, direct solution.
2. **Simple and readable.** Few dependencies. If a feature needs a library, justify it or hand-roll it. Someone should be able to read a file top to bottom and understand it.
3. **Robust where it counts.** Real error handling and tests on anything with logic — forms, data transforms, API routes. Don't write tests for static markup.

## Stack

**Astro**, deployed to Vercel via GitHub.

Chosen for: ships almost no JavaScript (a portfolio should load instantly), zero-config on Vercel, content in Markdown so adding a project doesn't mean editing layout code.

Revisit this if the site needs genuine interactivity or server-side logic — Next.js is the escape hatch, and switching early is cheap.

## Commands

```
npm install          # once
npm run dev          # local server at http://localhost:4321 (drafts visible)
npm run build        # astro check (typecheck) + static build to dist/ — drafts excluded
npm run preview      # serve dist/ exactly as Vercel will
npm test             # vitest, single run
npm run test:watch   # vitest, watch mode
```

Run one test file: `npx vitest run src/lib/content.test.ts`
Run one test by name: `npx vitest run -t "rounds up to the next minute"`

`npm run build` is the gate — it typechecks Astro templates as well as TS, so a
broken prop or a bad frontmatter field fails the build rather than the deploy.

## Deployment

- `main` is production. Pushing to it deploys to the live domain.
- Every branch and PR gets a Vercel preview URL. Use previews to check real rendering before merging.
- Nothing goes to `main` that hasn't built cleanly.

## Content model

Portfolio content (projects, writing, bio) lives in Markdown or data files, separate from layout and components. Adding a new project should mean adding one file — never editing a template.

Where things actually live:

| What | Where |
| --- | --- |
| Name, tagline, intro, social links | `src/data/site.ts` |
| Projects | `src/content/projects/*.md` → `/projects/<filename>/` |
| Posts | `src/content/writing/*.md` → `/writing/<filename>/` |
| Bio page prose | `src/pages/about.md` |
| Frontmatter schemas | `src/content.config.ts` |

Frontmatter is validated by Zod at build time — a typo in a field name fails the
build with a readable error instead of rendering something wrong.

`draft: true` on any entry keeps it out of the build while leaving it visible in
`npm run dev`. `featured: true` on a project pins it to the homepage; if nothing
is pinned, the homepage falls back to the three most recent.

## Conventions

- No secrets in the repo. Anything sensitive goes in Vercel environment variables.
- Accessibility is not optional: real semantic HTML, alt text on every image, keyboard-navigable, visible focus states.
- Mobile layout is a first-class case, not an afterthought — check both widths before calling a UI change done.

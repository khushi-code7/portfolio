# khushibajaj.com

Personal site. Astro, static output, deployed to Vercel from GitHub.

> **The layout is finished; the words are not.** Every `[letter]` on the site is
> a blank waiting for you — no name, no email, no CV, no phone number is in this
> repository yet. **[PLACEHOLDERS.md](PLACEHOLDERS.md) says what each letter is
> and which file it lives in.** Start there.
>
> Visual direction: *Editorial Warm — plum*, layout E (portrait and
> introduction in a raised card).

The site is writing-first. The homepage is a short introduction and nothing
else; the articles are the point, and everything else sits behind a nav tab:

```
/            photo, intro, recent work  ← src/data/site.ts (homeIntro, portrait)
/writing/    the articles               ← src/content/writing/*.md
/research/   papers and projects        ← src/content/research/*.md
/cv/         the full record            ← src/data/cv.ts
/about/      the longer bio             ← src/pages/about.md
/contact/    how to reach you           ← src/pages/contact.astro
```

The homepage shows a portrait, a short introduction and your profile links,
then the most recent writing and research. Both lists appear on their own as
content is added — with no articles yet, the writing section simply is not
there. Nothing on the site promises a publishing schedule: post whenever one
is ready.

## Adding your photo

Drop the image into `public/` — say `public/khushi.jpg` — then set `portrait`
in [`src/data/site.ts`](src/data/site.ts) to `/khushi.jpg`. A square or
near-square crop from the shoulders up works best; around 800×800 is plenty.

The site currently uses `/portrait-placeholder.svg`, which is a grey stand-in.
Setting `portrait: ''` removes the photo entirely and the homepage re-flows
around it with no gap left behind.

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

## Updating the CV

Edit [`src/data/cv.ts`](src/data/cv.ts). That file is the only copy of the CV
that exists — `/cv/` and the printed PDF both render from it. Printing that page
(Ctrl/Cmd + P → Save as PDF) gives you the document to attach to applications.

Each section is a list of entries with the same shape:

```ts
{
  title: 'M.Com, Marketing',
  where: 'St. Xavier’s College (Autonomous), Kolkata',
  when: '2026',
  result: '8.24 CGPA',
  notes: ['Dissertation: …'],
  href: 'https://link-to-evidence',   // optional — makes the title a link
}
```

`href` is worth using wherever there is something public to point at: an award
notice, a scorecard, a conference programme. A line with no public evidence
stays plain text. Roughly half the lines being linked is normal and still beats
a PDF.

Every section has an anchor, so a single part of the CV can be sent on its own —
`khushibajaj.com/cv/#research`, `/cv/#education`, `/cv/#skills`.

### The phone number

`profile.phone` renders **only on the printed CV**, not on the web page. It is
still present in the page source, so if you would rather it never leave your
machine at all, set it to `''` and add it by hand to applications that ask.

## Adding a paper

Create `src/content/research/my-paper.md`:

```markdown
---
title: The full title of the paper
summary: One line. Shows on the CV and on the research index.
date: 2026-01-21          # sorts the list; only the year is ever displayed
kind: Conference paper    # or Dissertation / Research project / Seminar paper
venue: 'iMarC-V, IIM Shillong'
methods: ['Survey design', 'SPSS']
tags: ['Consumer behaviour']
url: https://link-to-the-pdf     # optional; becomes a button on the page
---

Markdown body.
```

It appears at `/research/my-paper/`, on the research index, and in the Research
section of the CV. No template edits.

## Posting an article

This is the main thing the site is for, so it is meant to be quick:

1. Copy [`src/content/writing/template.md`](src/content/writing/template.md) and
   rename it — the filename becomes the URL.
2. Write. Ordinary Markdown; headings, links, lists, tables and footnotes all
   work.
3. Set `draft: false`, then commit and push.

Vercel builds it, it appears at `/writing/<filename>/`, at the top of the
writing index, on the homepage under the intro, and in the RSS feed. No template
edits, ever.

Leave `draft: true` while it is unfinished — drafts show in `npm run dev` so you
can see exactly how a piece will look before anyone else can.

The template documents the optional fields: `updated` (shows a visible revision
date, so changing a published argument leaves a trail rather than looking like a
quiet edit), `series` (links multi-part articles together), and `references` (a
numbered source list at the foot of the page).

## Editing who you are

- The homepage intro: `homeIntro` in [`src/data/site.ts`](src/data/site.ts).
- Name, meta description, nav, links: the rest of the same file. A link with an
  empty `href` is hidden, so ORCID and Google Scholar appear on their own once
  you fill them in.
- The CV's opening paragraphs: `summary` in [`src/data/cv.ts`](src/data/cv.ts).
- Longer bio prose: [`src/pages/about.md`](src/pages/about.md).

## Structure

```
src/
  content/research/    papers and projects, as Markdown
  content/writing/     articles, as Markdown
  content.config.ts    frontmatter schemas (Zod) — a typo fails the build
  data/cv.ts           the CV. single source of truth
  data/site.ts         name, links, nav
  layouts/             Base (every page), Prose (markdown pages)
  components/          Header, Footer, EntryList, CvSection
  lib/content.ts       sorting, dates, years, reading time — unit tested
  pages/               routes
  styles/global.css    all styling; design tokens at the top, print rules at the bottom
public/                favicon, robots.txt — copied verbatim
```

One line of client-side JavaScript ships, on the CV page only: the click
handler behind the "Save as PDF" button. With JS off the page still works — the
hint beside the button gives the keyboard shortcut.

## Deploying

`main` is production. Every branch and PR gets a Vercel preview URL. Nothing
merges to `main` that has not built cleanly — run `npm run build` locally first.

## Still to do

- Register an ORCID iD and a Google Scholar profile (both free, both work with
  zero publications) and paste the URLs into `src/data/site.ts`.
- Fill in the findings on each research page — the Markdown files have comments
  marking exactly where and what.

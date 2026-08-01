# Placeholders

Every `[letter]` on the site is a blank waiting for you. Find the letter in the
table, open the file, replace the bracket **including the brackets** with your
own text.

Nothing personal is on the site yet — no name, no email, no CV, no phone
number. The layout is finished; the words are not.

Search the project for `[` to find any you have missed. Run `npm run dev` and
the placeholders are visible on the page, so you can work through them in the
browser rather than in the code.

`[b]` is the one you will never see on the page — it is your role line, and it
only appears in the browser tab and in Google results. Worth filling in anyway.

---

## Start here — the five that matter most

Fill these and the site stops looking like a template:

`[a]` your name · `[e]` and `[f]` the About box · `[c]` the site
description · `[g]` and `[h]` your email and LinkedIn, which switch the two
icons under your name on.

---

## `src/data/site.ts` — name, links, the About box

| | What it is |
| --- | --- |
| `[a]` | Your name. Appears in the header, on the homepage, in the browser tab. |
| `[b]` | Role line under your name — e.g. "Marketing and consumer behaviour research". |
| `[c]` | One sentence describing the site. Used by Google and link previews. |
| `[d]` | Your email address. Also used by the CV and Contact pages. |
| `[e]` | The About box on the homepage, first paragraph. |
| `[f]` | The About box on the homepage, second paragraph. |
| `[g]` | Email link — write it as `mailto:you@example.com`. |
| `[h]` | LinkedIn profile URL. |
| `[i]` | ORCID URL. Free to register, works with no publications. |
| `[j]` | Google Scholar URL. |

`[g]`–`[j]` are the `href` values in the `links` list. **A link with an empty
`href` is hidden**, so these four stay off the site entirely until you fill
them in — there is nothing to delete.

## `src/data/cv.ts` — the CV

This one file is the whole CV. `/cv/` renders it, and printing that page
(Ctrl/Cmd + P → Save as PDF) produces the PDF from the same lines, so the two
can never disagree.

| | What it is |
| --- | --- |
| `[k]` | One line under your name on the CV. |
| `[l]` | Location — e.g. "Kolkata, India". |
| `[m]` | LinkedIn, written out as text — e.g. `linkedin.com/in/yourname`. |
| `[n]` | CV opening paragraph, first. |
| `[o]` | CV opening paragraph, second. |

**Education** — two example rows. Copy a row to add more.

| | What it is |
| --- | --- |
| `[p]` `[u]` | Qualification — e.g. "M.Com, Marketing". |
| `[q]` `[v]` | Institution. |
| `[r]` `[w]` | Year. |
| `[s]` `[x]` | Grade, score or percentile. |
| `[t]` | A detail line under the first row — dissertation title, say. |

**Teaching and experience**

| | What it is |
| --- | --- |
| `[y]` `[ac]` | Role. |
| `[z]` `[ad]` | Where. |
| `[aa]` `[ae]` | When. |
| `[ab]` | A detail line under the first row. |

**Awards**

| | What it is |
| --- | --- |
| `[af]` `[ai]` | Award. |
| `[ag]` | Awarding body. |
| `[ah]` `[aj]` | Year. |

**Skills** — three groups of two. `[ak]` `[an]` `[aq]` are the group headings
(e.g. "Quantitative", "Research"); `[al]` `[am]` `[ao]` `[ap]` `[ar]` `[as]`
are the entries under them.

Be specific. "SPSS — survey analysis, reliability testing, mediation" says far
more than "SPSS", and every tool you name should have something on the site
that used it.

## `src/content/research/` — papers and projects

Two placeholder files. **Rename each file — the filename becomes the URL**, so
`greenwashing.md` becomes `/research/greenwashing/`. Delete one if you only
have one, copy one to add a third.

| | What it is |
| --- | --- |
| `[at]` `[bb]` | Title. |
| `[au]` `[bc]` | One-line summary. Shows on the CV and the research index. |
| `[av]` `[bd]` | Year displayed. |
| `[aw]` | Where it was presented. Delete the line if nowhere. |
| `[ax]` `[ay]` `[be]` | Methods — e.g. "Survey design", "SPSS". |
| `[az]` `[bf]` | Topic tag. |
| `[ba]` `[bg]` | The body of the page. Ordinary Markdown, as long as you like. |

Also set `date:` — it sorts the list, and only the year is ever shown, so an
approximate month is fine. `kind:` is one of `Conference paper`,
`Dissertation`, `Research project` or `Seminar paper`.

## `src/content/articles/` — articles

`example-article.md` exists so you can see how an article looks. Rename it and
write over it, or delete it and start from `template.md`.

| | What it is |
| --- | --- |
| `[bh]` | Article title. |
| `[bi]` | One-sentence summary. Shows on the index and in search results. |
| `[bj]` | Topic tag. |
| `[bk]` | Opening paragraph. |
| `[bl]` | A section heading. |
| `[bm]` | The rest of the article. |

Add `thumbnail: /your-image.png` to an article to show a picture beside it on
the homepage — the small rectangle you drew on the right of each row. Put the
image in `public/` first. Leave it out and the title and summary fill the space.

`template.md` documents the optional fields — `updated`, `series`,
`references`. It stays a draft, so it never appears on the live site.

## `src/pages/contact.astro` — Contact

| | What it is |
| --- | --- |
| `[bv]` | Page description for search results. |
| `[bw]` | One line under the "Contact" heading. |
| `[bx]` | Lead-in to the list — e.g. "I am glad to hear from you if you are:". |
| `[by]` `[bz]` `[ca]` | Who you would like to hear from. |

The email on this page comes from `[d]` in `site.ts`. Until you fill that in it
shows as plain text; once you do, it becomes a working link by itself.

## Your photo

Not a letter — a file. Drop your image into `public/`, then set `portrait` in
`src/data/site.ts` to `/your-file.jpg`. A square crop from the shoulders up
works best; around 800×800 is plenty.

Right now the site uses `/portrait-placeholder.svg`, a grey stand-in. It is the
circle you drew, top left of the homepage.
Setting `portrait: ''` removes the photo and the homepage re-flows with no gap.

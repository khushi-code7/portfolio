import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Papers, dissertations and research projects.
 * One file per piece of work in `src/content/research/`. Adding a file is all
 * it takes — the CV, the research index and the homepage all pick it up.
 */
const research = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    // One line. Shown under the title on the research index and on the CV.
    summary: z.string(),
    // Sorts every index, newest first. Only the year is ever displayed, so an
    // approximate month is fine when you only remember the year.
    date: z.coerce.date(),
    // Overrides the displayed year — use it for a range like '2023–24'.
    year: z.string().optional(),
    // What kind of work this is. Shown as a small label.
    kind: z
      .enum(['Conference paper', 'Dissertation', 'Research project', 'Seminar paper'])
      .default('Conference paper'),
    // Where it was presented, if anywhere. Free text: 'iMarC-V, IIM Shillong'.
    venue: z.string().optional(),
    // e.g. ['Consumer behaviour', 'FMCG', 'SPSS']
    tags: z.array(z.string()).default([]),
    // Methods used. Rendered as a separate line because readers scan for it.
    methods: z.array(z.string()).default([]),
    // Optional outbound link — a published paper, a dataset, a slide deck.
    url: z.string().url().optional(),
    // Set true to keep a work-in-progress out of the build.
    draft: z.boolean().default(false),
  }),
});

/**
 * Essays. One file per piece in `src/content/writing/`.
 * There is deliberately no cadence promised anywhere on the site — four good
 * essays a year reads as a considered series, four blog posts a year reads dead.
 */
const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    // Set when you substantively revise a published essay. Shown next to the
    // original date so a changed argument leaves a visible trail.
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    // Groups multi-part essays. Any string; pieces sharing it are linked together.
    series: z.string().optional(),
    // Sources, rendered as a reference list at the foot of the essay.
    references: z
      .array(
        z.object({
          text: z.string(),
          href: z.string().url().optional(),
        }),
      )
      .default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { research, writing };

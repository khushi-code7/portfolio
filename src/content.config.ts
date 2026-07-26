import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    // One line. Shown on the work index under the title.
    summary: z.string(),
    // Sorts the work index — newest first.
    date: z.coerce.date(),
    // e.g. ['Astro', 'TypeScript', 'Design systems']
    tags: z.array(z.string()).default([]),
    // Optional outbound links shown on the project page.
    url: z.string().url().optional(),
    repo: z.string().url().optional(),
    // Set true to pin to the homepage.
    featured: z.boolean().default(false),
    // Set true to keep a work-in-progress out of the build.
    draft: z.boolean().default(false),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, writing };

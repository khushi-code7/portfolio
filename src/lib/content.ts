/**
 * Pure helpers for shaping and formatting content.
 * Kept free of Astro imports so they can be unit tested directly.
 */

export type Draftable = { data: { draft?: boolean } };
export type Dated = { data: { date: Date; draft?: boolean } };

export interface VisibilityOptions {
  /**
   * Defaults to true under `astro dev` so you can preview drafts, and false in
   * a build so they never ship. Pass it explicitly to override — the tests do.
   */
  includeDrafts?: boolean;
}

/** True under `astro dev`, false in a production build. */
function inDevMode(): boolean {
  return import.meta.env?.DEV === true;
}

/** Pure predicate: has this entry been marked as a draft? */
export function isPublished(entry: Draftable): boolean {
  return entry.data.draft !== true;
}

/** Entries the current context should show, in their original order. */
export function visible<T extends Draftable>(
  entries: readonly T[],
  { includeDrafts = inDevMode() }: VisibilityOptions = {},
): T[] {
  return includeDrafts ? [...entries] : entries.filter(isPublished);
}

/** Newest first. Does not mutate the input array. */
export function byNewest<T extends Dated>(entries: readonly T[]): T[] {
  return [...entries].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Visible entries, newest first — the ordering every index page wants. */
export function publishedByNewest<T extends Dated>(
  entries: readonly T[],
  options?: VisibilityOptions,
): T[] {
  return byNewest(visible(entries, options));
}

/**
 * "12 March 2024". Explicitly en-GB so the output does not drift with the
 * build machine's locale — Vercel's builders are not necessarily set to yours.
 */
export function formatDate(date: Date): string {
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/** For <time datetime="...">. Date only — the time of day is never meaningful here. */
export function toISODate(date: Date): string {
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 10);
}

/**
 * Rounded up to the nearest minute, floored at 1, at 200 words per minute.
 * Deliberately crude: it is a hint, not a promise.
 */
export function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  if (words === 0) return 1;
  return Math.max(1, Math.ceil(words / 200));
}

/** Joins a path onto the site origin without doubling or dropping slashes. */
export function absoluteUrl(path: string, origin: string): string {
  return `${origin.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
}

/* ---------------------------------------------------------------
   Research
   --------------------------------------------------------------- */

export type Yearly = { date: Date; year?: string };

/**
 * Research is shown by year, never by full date — nobody cites the day a paper
 * was presented. An explicit `year` in the frontmatter wins so a piece can span
 * a range ('2023–24'); otherwise the date supplies it.
 */
export function displayYear({ date, year }: Yearly): string {
  if (year && year.trim()) return year.trim();
  if (Number.isNaN(date.getTime())) return '';
  return String(date.getUTCFullYear());
}

/**
 * The grey line under a research title: "Conference paper · iMarC-V, IIM
 * Shillong". Drops the separator when there is no venue rather than leaving a
 * dangling dot.
 */
export function provenance({ kind, venue }: { kind: string; venue?: string }): string {
  return [kind, venue?.trim()].filter(Boolean).join(' · ');
}

/* ---------------------------------------------------------------
   Writing
   --------------------------------------------------------------- */

/**
 * Whether to show an "Updated" line. Only true when the revision is on a later
 * day than publication — an `updated` set to the publication date is noise, and
 * one set earlier is a typo we should not render as fact.
 */
export function showsUpdate(date: Date, updated?: Date): boolean {
  if (!updated || Number.isNaN(updated.getTime()) || Number.isNaN(date.getTime())) return false;
  return toISODate(updated) > toISODate(date);
}

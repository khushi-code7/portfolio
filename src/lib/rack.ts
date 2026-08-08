/**
 * Geometry for the spine rack on /writing/.
 *
 * Every number a spine needs — how wide, how tall, which tint — is decided
 * here rather than in the template, so the rules can be unit tested and the
 * component stays a plain map over the result. Nothing here knows about Astro.
 *
 * The one rule worth stating out loud: a spine's size means its length. A long
 * essay is a fat, tall book and a short one is a thin, short book, so the shelf
 * tells you what you are in for before you have read a word.
 */

/** Narrowest and widest a spine may be, in rem. */
const WIDTH = { min: 2.5, max: 5.5 } as const;
/** Shortest and tallest, as a percentage of the shelf's height. */
const HEIGHT = { min: 64, max: 100 } as const;
/** How many tints the ramp has. Must match --spine-1…N in global.css. */
export const TINT_COUNT = 6;

export interface Sized {
  minutes: number;
}

export interface Spine {
  /** rem */
  width: number;
  /** percentage of the shelf */
  height: number;
  /** 1…TINT_COUNT */
  tint: number;
}

/** Reading time can never be zero or negative, whatever gets passed in. */
function minutesOf({ minutes }: Sized): number {
  return Number.isFinite(minutes) ? Math.max(1, Math.round(minutes)) : 1;
}

function round(value: number, places: number): number {
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
}

/**
 * Where `value` sits between `min` and `max`, from 0 to 1. Returns 1 when the
 * two ends are equal — a lone piece, or several of the same length, should get
 * the full-size spine rather than the smallest one on the shelf.
 */
export function position(value: number, min: number, max: number): number {
  if (!(max > min)) return 1;
  const clamped = Math.min(Math.max(value, min), max);
  return (clamped - min) / (max - min);
}

/** Newest piece gets tint 1; the ramp repeats once it runs out. */
export function tintFor(index: number): number {
  const safe = Number.isFinite(index) ? Math.trunc(index) : 0;
  return (((safe % TINT_COUNT) + TINT_COUNT) % TINT_COUNT) + 1;
}

/**
 * Decorates entries — given in display order, newest first — with the width,
 * height and tint of their spine.
 */
export function rack<T extends Sized>(entries: readonly T[]): (T & Spine)[] {
  if (entries.length === 0) return [];

  const lengths = entries.map(minutesOf);
  const shortest = Math.min(...lengths);
  const longest = Math.max(...lengths);

  return entries.map((entry, index) => {
    const at = position(minutesOf(entry), shortest, longest);
    return {
      ...entry,
      width: round(WIDTH.min + at * (WIDTH.max - WIDTH.min), 2),
      height: round(HEIGHT.min + at * (HEIGHT.max - HEIGHT.min), 1),
      tint: tintFor(index),
    };
  });
}

/** Total reading time of the shelf, for the caption under it. */
export function totalMinutes(entries: readonly Sized[]): number {
  return entries.reduce((sum, entry) => sum + minutesOf(entry), 0);
}

/** "56 minutes", "1 hour 4 minutes" — the shelf caption reads as a sentence. */
export function formatDuration(minutes: number): string {
  const total = Math.max(0, Math.round(minutes));
  const hours = Math.floor(total / 60);
  const rest = total % 60;

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours} hour${hours === 1 ? '' : 's'}`);
  if (rest > 0 || hours === 0) parts.push(`${rest} minute${rest === 1 ? '' : 's'}`);
  return parts.join(' ');
}

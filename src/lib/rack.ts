/**
 * Geometry for the book stack on /writing/.
 *
 * Every number a book needs — how long, how thick, where it sits in the stack —
 * is decided here rather than in the template, so the rules can be unit tested
 * and the component stays a plain map over the result. Nothing here knows
 * about Astro.
 *
 * The books lie flat, one on top of the next, each shifted right of the one
 * above it: a stack that runs from the top left down to the right. A book's
 * length and its thickness are both its reading time, so a long essay is a fat
 * book and a short note is a slim one, and the shape of the stack tells you
 * what is in it before you have read a word.
 */

/** Shortest and longest a book may be, in rem — its length on the page. */
const LENGTH = { min: 15, max: 23 } as const;
/** Thinnest and thickest, in rem. Books sit on each other, so this is the step
 *  down the stack as well as the height of the book. */
const THICKNESS = { min: 2.3, max: 3.6 } as const;
/** How far right each book sits from the one above it, in rem. */
export const STEP = 2.8;
/** How many tints the ramp has. Must match --spine-1…N in global.css. */
export const TINT_COUNT = 6;

export interface Sized {
  minutes: number;
}

export interface Book {
  /** rem — how long the book is */
  length: number;
  /** rem — how thick the book is */
  thickness: number;
  /** rem — offset from the left edge of the stack */
  x: number;
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
 * the full-size book rather than the smallest one in the stack.
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
 * Decorates entries — given in display order, newest first — with the size and
 * the place in the stack of their book. The newest sits at the top left; each
 * one after it sits directly on the one above and a step to the right.
 *
 * Only the sideways step is computed here. The books are ordinary blocks in the
 * flow, so each one lands on the one above it without being told to — which
 * matters, because absolutely positioning them would make each book the
 * containing block for its own note and pin the note to the book.
 */
export function stack<T extends Sized>(entries: readonly T[]): (T & Book)[] {
  if (entries.length === 0) return [];

  const lengths = entries.map(minutesOf);
  const shortest = Math.min(...lengths);
  const longest = Math.max(...lengths);

  return entries.map((entry, index) => {
    const at = position(minutesOf(entry), shortest, longest);
    return {
      ...entry,
      length: round(LENGTH.min + at * (LENGTH.max - LENGTH.min), 2),
      thickness: round(THICKNESS.min + at * (THICKNESS.max - THICKNESS.min), 2),
      x: round(index * STEP, 2),
      tint: tintFor(index),
    };
  });
}

/** Total reading time of the stack, for the caption under it. */
export function totalMinutes(entries: readonly Sized[]): number {
  return entries.reduce((sum, entry) => sum + minutesOf(entry), 0);
}

/** "56 minutes", "1 hour 4 minutes" — the caption reads as a sentence. */
export function formatDuration(minutes: number): string {
  const total = Math.max(0, Math.round(minutes));
  const hours = Math.floor(total / 60);
  const rest = total % 60;

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours} hour${hours === 1 ? '' : 's'}`);
  if (rest > 0 || hours === 0) parts.push(`${rest} minute${rest === 1 ? '' : 's'}`);
  return parts.join(' ');
}

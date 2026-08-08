import { describe, expect, it } from 'vitest';

import {
  STEP,
  TINT_COUNT,
  formatDuration,
  position,
  stack,
  tintFor,
  totalMinutes,
} from './rack';

const piece = (minutes: number) => ({ minutes });

/** Matches the rounding the module does, so sums compare exactly. */
const round = (value: number) => Math.round(value * 100) / 100;

describe('position', () => {
  it('is 0 at the bottom of the range and 1 at the top', () => {
    expect(position(2, 2, 10)).toBe(0);
    expect(position(10, 2, 10)).toBe(1);
  });

  it('is halfway in the middle', () => {
    expect(position(6, 2, 10)).toBe(0.5);
  });

  it('gives a full-size book when every piece is the same length', () => {
    expect(position(7, 7, 7)).toBe(1);
  });

  it('clamps values outside the range rather than extrapolating', () => {
    expect(position(1, 2, 10)).toBe(0);
    expect(position(99, 2, 10)).toBe(1);
  });
});

describe('tintFor', () => {
  it('starts the ramp at 1 for the newest piece', () => {
    expect(tintFor(0)).toBe(1);
  });

  it('walks up the ramp', () => {
    expect(tintFor(3)).toBe(4);
  });

  it('repeats once the ramp runs out', () => {
    expect(tintFor(TINT_COUNT)).toBe(1);
    expect(tintFor(TINT_COUNT + 2)).toBe(3);
  });

  it('never returns a tint outside the ramp', () => {
    for (let i = 0; i < 40; i += 1) {
      const tint = tintFor(i);
      expect(tint).toBeGreaterThanOrEqual(1);
      expect(tint).toBeLessThanOrEqual(TINT_COUNT);
    }
  });
});

describe('stack', () => {
  it('returns nothing for an empty stack', () => {
    expect(stack([])).toEqual([]);
  });

  it('makes the longest piece the longest and thickest book', () => {
    const [long, short] = stack([piece(20), piece(4)]);
    expect(long.length).toBeGreaterThan(short.length);
    expect(long.thickness).toBeGreaterThan(short.thickness);
  });

  it('keeps every book within the sizing bounds', () => {
    for (const book of stack([piece(1), piece(6), piece(90)])) {
      expect(book.length).toBeGreaterThanOrEqual(15);
      expect(book.length).toBeLessThanOrEqual(23);
      expect(book.thickness).toBeGreaterThanOrEqual(2.3);
      expect(book.thickness).toBeLessThanOrEqual(3.6);
    }
  });

  it('gives a single piece a full-size book rather than the smallest one', () => {
    const [only] = stack([piece(3)]);
    expect(only.length).toBe(23);
    expect(only.thickness).toBe(3.6);
  });

  it('starts the stack at the left edge', () => {
    const [first] = stack([piece(5), piece(2)]);
    expect(first.x).toBe(0);
  });

  it('steps each book one place to the right of the one above it', () => {
    const books = stack([piece(5), piece(2), piece(9)]);
    expect(books[1].x).toBe(STEP);
    expect(books[2].x).toBe(round(STEP * 2));
  });

  it('carries the original entry through untouched', () => {
    const [book] = stack([{ minutes: 5, title: 'A piece' }]);
    expect(book.title).toBe('A piece');
  });

  it('treats a zero-minute piece as one minute rather than sizing it to nothing', () => {
    const [zero, ten] = stack([piece(0), piece(10)]);
    expect(zero.length).toBe(15);
    expect(ten.length).toBe(23);
  });
});

describe('totalMinutes', () => {
  it('adds the stack up', () => {
    expect(totalMinutes([piece(7), piece(11), piece(6)])).toBe(24);
  });

  it('is zero for an empty stack', () => {
    expect(totalMinutes([])).toBe(0);
  });

  it('counts a zero-minute piece as one minute, as the book does', () => {
    expect(totalMinutes([piece(0), piece(5)])).toBe(6);
  });
});

describe('formatDuration', () => {
  it('reads as minutes under the hour', () => {
    expect(formatDuration(44)).toBe('44 minutes');
  });

  it('singularises one minute', () => {
    expect(formatDuration(1)).toBe('1 minute');
  });

  it('breaks into hours and minutes', () => {
    expect(formatDuration(64)).toBe('1 hour 4 minutes');
  });

  it('drops the minutes when they come out even', () => {
    expect(formatDuration(120)).toBe('2 hours');
  });

  it('says zero minutes rather than nothing at all', () => {
    expect(formatDuration(0)).toBe('0 minutes');
  });
});

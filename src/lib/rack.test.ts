import { describe, expect, it } from 'vitest';

import { TINT_COUNT, formatDuration, position, rack, tintFor, totalMinutes } from './rack';

const piece = (minutes: number) => ({ minutes });

describe('position', () => {
  it('is 0 at the bottom of the range and 1 at the top', () => {
    expect(position(2, 2, 10)).toBe(0);
    expect(position(10, 2, 10)).toBe(1);
  });

  it('is halfway in the middle', () => {
    expect(position(6, 2, 10)).toBe(0.5);
  });

  it('gives a full-size spine when every piece is the same length', () => {
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

describe('rack', () => {
  it('returns nothing for an empty shelf', () => {
    expect(rack([])).toEqual([]);
  });

  it('makes the longest piece the biggest spine and the shortest the smallest', () => {
    const [long, short] = rack([piece(20), piece(4)]);
    expect(long.width).toBeGreaterThan(short.width);
    expect(long.height).toBeGreaterThan(short.height);
  });

  it('keeps every spine within the sizing bounds', () => {
    for (const spine of rack([piece(1), piece(6), piece(90)])) {
      expect(spine.width).toBeGreaterThanOrEqual(3);
      expect(spine.width).toBeLessThanOrEqual(6.2);
      expect(spine.height).toBeGreaterThanOrEqual(78);
      expect(spine.height).toBeLessThanOrEqual(100);
    }
  });

  it('gives a single piece a full-size spine rather than the smallest one', () => {
    const [only] = rack([piece(3)]);
    expect(only.width).toBe(6.2);
    expect(only.height).toBe(100);
  });

  it('carries the original entry through untouched', () => {
    const [spine] = rack([{ minutes: 5, title: 'A piece' }]);
    expect(spine.title).toBe('A piece');
  });

  it('treats a zero-minute piece as one minute rather than sizing it to nothing', () => {
    const [zero, ten] = rack([piece(0), piece(10)]);
    expect(zero.width).toBe(3);
    expect(ten.width).toBe(6.2);
  });
});

describe('totalMinutes', () => {
  it('adds the shelf up', () => {
    expect(totalMinutes([piece(7), piece(11), piece(6)])).toBe(24);
  });

  it('is zero for an empty shelf', () => {
    expect(totalMinutes([])).toBe(0);
  });

  it('counts a zero-minute piece as one minute, as the spine does', () => {
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

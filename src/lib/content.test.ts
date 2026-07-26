import { describe, expect, it } from 'vitest';

import {
  absoluteUrl,
  byNewest,
  formatDate,
  isPublished,
  publishedByNewest,
  readingTime,
  toISODate,
} from './content';

const entry = (date: string, extra: Record<string, unknown> = {}) => ({
  id: date,
  data: { date: new Date(date), ...extra },
});

describe('isPublished', () => {
  it('keeps entries with no draft flag', () => {
    expect(isPublished({ data: {} })).toBe(true);
  });

  it('keeps entries explicitly marked not-draft', () => {
    expect(isPublished({ data: { draft: false } })).toBe(true);
  });

  it('drops drafts', () => {
    expect(isPublished({ data: { draft: true } })).toBe(false);
  });
});

describe('byNewest', () => {
  it('sorts newest first', () => {
    const sorted = byNewest([entry('2023-01-01'), entry('2025-06-01'), entry('2024-03-15')]);
    expect(sorted.map((e) => e.id)).toEqual(['2025-06-01', '2024-03-15', '2023-01-01']);
  });

  it('does not mutate the input', () => {
    const input = [entry('2023-01-01'), entry('2025-06-01')];
    byNewest(input);
    expect(input.map((e) => e.id)).toEqual(['2023-01-01', '2025-06-01']);
  });

  it('handles empty and single-item arrays', () => {
    expect(byNewest([])).toEqual([]);
    expect(byNewest([entry('2024-01-01')])).toHaveLength(1);
  });
});

describe('publishedByNewest', () => {
  it('filters drafts and sorts in one pass', () => {
    const sorted = publishedByNewest([
      entry('2023-01-01'),
      entry('2025-06-01', { draft: true }),
      entry('2024-03-15'),
    ]);
    expect(sorted.map((e) => e.id)).toEqual(['2024-03-15', '2023-01-01']);
  });
});

describe('formatDate', () => {
  it('formats as day month year', () => {
    expect(formatDate(new Date('2024-03-12'))).toBe('12 March 2024');
  });

  it('does not shift the day across timezones', () => {
    // A UTC midnight date must not render as the previous day.
    expect(formatDate(new Date('2024-01-01T00:00:00Z'))).toBe('1 January 2024');
  });

  it('returns empty string for an invalid date', () => {
    expect(formatDate(new Date('not a date'))).toBe('');
  });
});

describe('toISODate', () => {
  it('returns just the date part', () => {
    expect(toISODate(new Date('2024-03-12T15:30:00Z'))).toBe('2024-03-12');
  });

  it('returns empty string for an invalid date', () => {
    expect(toISODate(new Date('not a date'))).toBe('');
  });
});

describe('readingTime', () => {
  it('floors at one minute', () => {
    expect(readingTime('three short words')).toBe(1);
    expect(readingTime('')).toBe(1);
    expect(readingTime('   \n  ')).toBe(1);
  });

  it('rounds up to the next minute', () => {
    expect(readingTime('word '.repeat(201))).toBe(2);
    expect(readingTime('word '.repeat(400))).toBe(2);
    expect(readingTime('word '.repeat(401))).toBe(3);
  });

  it('treats runs of whitespace as one separator', () => {
    expect(readingTime('one\n\n\ntwo   three\tfour')).toBe(1);
  });
});

describe('absoluteUrl', () => {
  it('joins without doubling slashes', () => {
    expect(absoluteUrl('/writing/', 'https://example.com')).toBe('https://example.com/writing/');
    expect(absoluteUrl('writing/', 'https://example.com/')).toBe('https://example.com/writing/');
    expect(absoluteUrl('/writing/', 'https://example.com/')).toBe('https://example.com/writing/');
  });
});

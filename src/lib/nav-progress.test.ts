import { describe, expect, it } from 'vitest';
import { startsPageLoad } from './nav-progress';
import type { ClickIntent } from './nav-progress';

const HERE = 'https://www.khushibajaj.com/writing/';

/** The common case — a plain left click on an internal link — with one field changed. */
const intent = (over: Partial<ClickIntent> = {}) =>
  startsPageLoad({ href: 'https://www.khushibajaj.com/about/', from: HERE, ...over });

describe('startsPageLoad', () => {
  it('tracks a plain click on an internal link', () => {
    expect(intent()).toBe(true);
  });

  it('tracks a relative internal link', () => {
    expect(intent({ href: '/projects/' })).toBe(true);
  });

  it('tracks the same path with a different query, which does reload', () => {
    expect(intent({ href: '/writing/?page=2' })).toBe(true);
  });

  it('ignores links to another site', () => {
    expect(intent({ href: 'https://github.com/khushi-code7' })).toBe(false);
  });

  it('ignores mailto: and tel: links', () => {
    expect(intent({ href: 'mailto:avenueabundance9@gmail.com' })).toBe(false);
    expect(intent({ href: 'tel:+10000000000' })).toBe(false);
  });

  it('ignores an anchor on the current page', () => {
    expect(intent({ href: '/writing/#top' })).toBe(false);
  });

  it('ignores links that open a new tab', () => {
    expect(intent({ target: '_blank' })).toBe(false);
  });

  it('treats an explicit _self as a normal navigation', () => {
    expect(intent({ target: '_self' })).toBe(true);
  });

  it('ignores downloads', () => {
    expect(intent({ href: '/cv.pdf', download: true })).toBe(false);
  });

  it('ignores middle and right clicks', () => {
    expect(intent({ button: 1 })).toBe(false);
    expect(intent({ button: 2 })).toBe(false);
  });

  it('ignores modified clicks, which open tabs or save the target', () => {
    expect(intent({ modified: true })).toBe(false);
  });

  it('ignores clicks something else already handled', () => {
    expect(intent({ defaultPrevented: true })).toBe(false);
  });

  it('ignores an empty or unresolvable href', () => {
    expect(intent({ href: '' })).toBe(false);
    expect(startsPageLoad({ href: '/about/', from: 'not-a-url' })).toBe(false);
  });
});

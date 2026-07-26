/**
 * Decides whether a clicked link will cause the browser to load a new page.
 * Kept free of DOM types so it can be unit tested directly — the component
 * pulls these fields off the real event and hands them over.
 */

export interface ClickIntent {
  /** The link's resolved href. */
  href: string;
  /** The address of the page the link was clicked on. */
  from: string;
  /** The link's `target` attribute, if it has one. */
  target?: string | null;
  /** Whether the link carries a `download` attribute. */
  download?: boolean;
  /** `MouseEvent.button` — 0 is a plain left click. */
  button?: number;
  /** True if ctrl/cmd/shift/alt was held (opens a tab, saves, etc). */
  modified?: boolean;
  /** True if something else already handled the click. */
  defaultPrevented?: boolean;
}

/** Navigations that stay in this tab and actually fetch a new document. */
export function startsPageLoad({
  href,
  from,
  target,
  download = false,
  button = 0,
  modified = false,
  defaultPrevented = false,
}: ClickIntent): boolean {
  if (defaultPrevented || button !== 0 || modified || download) return false;
  // Anything but the current tab is someone else's loading indicator.
  if (target && target !== '_self') return false;
  if (!href) return false;

  let url: URL;
  let current: URL;
  try {
    url = new URL(href, from);
    current = new URL(from);
  } catch {
    // Not a resolvable address — let the browser deal with it.
    return false;
  }

  // mailto:, tel:, javascript: — no page load.
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;
  // Leaving the site: the destination shows its own loading state.
  if (url.origin !== current.origin) return false;
  // Same document, different anchor — the browser just scrolls.
  if (url.pathname === current.pathname && url.search === current.search) return false;

  return true;
}

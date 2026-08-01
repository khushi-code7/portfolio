/**
 * Every piece of "who am I" text on the site comes from this file.
 *
 * Everything in [square brackets] is a placeholder waiting for you.
 * See PLACEHOLDERS.md in the project root for what each letter is.
 */

export const site = {
  name: '[a]',
  // Shown in the browser tab and search results, after the page title.
  title: '[a]',
  tagline: '[b]',
  // The <meta name="description"> default, and the fallback social-card text.
  // One sentence that would make sense to a stranger.
  intro: '[c]',
  // Used for absolute URLs in the sitemap, RSS feed and canonical tags.
  url: 'https://www.khushibajaj.com',
  email: '[d]',
  /**
   * The homepage portrait. Drop a photo into `public/` and put its filename
   * here — `/khushi.jpg`. Set it to '' and the homepage lays itself out
   * without a photo, no gap left behind.
   *
   * A square crop from the shoulders up works best; around 800×800 is plenty.
   */
  portrait: '/portrait-placeholder.svg',
  portraitAlt: '[a]',
  /**
   * The About box on the homepage — the bordered panel under your name.
   * Two short paragraphs. This is the only place your bio lives; there is no
   * separate About page, exactly as you drew it.
   */
  homeIntro: ['[e]', '[f]'],
  /**
   * Profile links. A link with an empty href is hidden automatically, so these
   * stay off the site entirely until you fill them in — nothing to remove.
   */
  links: [
    { label: 'Email', href: '' }, // [g] — mailto:you@example.com
    { label: 'LinkedIn', href: '' }, // [h]
    { label: 'ORCID', href: '' }, // [i]
    { label: 'Google Scholar', href: '' }, // [j]
  ],
} as const;

/**
 * Three tabs, as drawn. About is not one of them — it is the box on the
 * homepage. Research is not one either; it lives inside the CV page, which
 * links through to the full list at /research/.
 */
export const nav = [
  { label: 'Contact', href: '/contact/' },
  { label: 'CV', href: '/cv/' },
  { label: 'Articles', href: '/articles/' },
] as const;

/** Links with a real href, in nav/footer display order. */
export const activeLinks = site.links.filter((link) => link.href.length > 0);

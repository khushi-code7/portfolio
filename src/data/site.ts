/**
 * Every piece of "who am I" text on the site comes from this file.
 *
 * Anything still in [square brackets] is a placeholder waiting for you.
 * See PLACEHOLDERS.md in the project root for what each letter is.
 */

export const site = {
  // The homepage renders this in capitals itself, so keep it in normal case
  // here — it is also the browser tab, the footer and the RSS feed.
  name: 'Khushi Bajaj',
  // Shown in the browser tab and search results, after the page title.
  title: 'Khushi Bajaj',
  // Appended to the site name in the homepage browser tab. Empty means the tab
  // reads "Khushi Bajaj" and nothing more.
  tagline: '',
  // The <meta name="description"> default, and the fallback social-card text.
  // One sentence that would make sense to a stranger.
  intro: 'Khushi Bajaj — writing, research and CV.',
  // Used for absolute URLs in the sitemap, RSS feed and canonical tags.
  url: 'https://www.khushibajaj.com',
  email: 'khushi@khushibajaj.com',
  /**
   * The homepage portrait. Drop a photo into `public/` and put its filename
   * here — `/khushi.jpg`. Set it to '' and the homepage lays itself out
   * without a photo, no gap left behind.
   *
   * A square crop from the shoulders up works best; around 800×800 is plenty.
   */
  portrait: '/portrait-placeholder.svg',
  portraitAlt: 'Khushi Bajaj',
  /**
   * The research statement — one sentence directly under your name, and the
   * most important line on the site. It is what a supervisor, an editor or an
   * admissions committee reads first, and often all they read.
   *
   * Name the field, then the specifics: "Consumer behaviour and marketing
   * ethics — attention, greenwashing and price discrimination in Indian
   * markets." Set it to '' and the line disappears with no gap left behind.
   */
  researchLine: '',
  /**
   * Your bio on the homepage, one paragraph per entry. This is the only place it
   * lives; there is no separate About page.
   */
  homeIntro: [
    'Hi, I’m Khushi.',
    'I’m a marketing and management graduate with a growing interest in the different ways people, ideas, brands, and technology come together.',
    'A lot of what I’ve done so far has been around understanding people and how they make decisions. During my academic work, I’ve explored consumer behaviour, attention, information overload, and brand trust through research. Alongside that, I’ve worked on marketing projects, written about ideas that interest me, and taken on creative and digital projects simply because I wanted to learn how to make them myself.',
    'I’m still figuring out exactly where all of these interests will take me, and honestly, I like that. I enjoy learning new things, trying different kinds of work, and finding connections between things that don’t always seem related at first.',
    'This website is a collection of that journey: the research I’ve done, the ideas I’ve explored, the projects I’ve worked on, and a few things I’ve built along the way.',
  ],
  /**
   * The "Currently" line under the bio: what you are working on now and what
   * you are looking for. Academic convention, so it reads as information
   * rather than self-promotion — and it is the line that turns a page view
   * into an email. Set it to '' to hide the line entirely.
   */
  currently: '',
  /**
   * Profile links. A link with an empty href is hidden automatically, so these
   * stay off the site entirely until you fill them in — nothing to remove.
   */
  links: [
    { label: 'Email', href: 'mailto:khushi@khushibajaj.com' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/khushibajaj7' },
    { label: 'ORCID', href: '' }, // [i]
    { label: 'Google Scholar', href: '' }, // [j]
  ],
} as const;

/**
 * The tabs. About is not one of them — it is the box on the homepage. Research
 * is not one either; it lives inside the CV page, which links through to the
 * full list at /research/.
 */
export const nav = [
  { label: 'Contact', href: '/contact/' },
  { label: 'CV', href: '/cv/' },
  { label: 'Writing', href: '/writing/' },
] as const;

/** Links with a real href, in nav/footer display order. */
export const activeLinks = site.links.filter((link) => link.href.length > 0);

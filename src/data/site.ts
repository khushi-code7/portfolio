/**
 * Every piece of "who am I" text on the site comes from this file.
 * Edit here, not in the components.
 */

export const site = {
  name: 'Khushi',
  // The homepage headline — the first line anyone reads.
  greeting: "Hey. Welcome to Khushi's portfolio.",
  // Shown in the browser tab and search results, after the page title.
  title: 'Khushi',
  tagline: 'Designer and developer',
  // One or two sentences. This is the first thing anyone reads on the homepage.
  intro:
    'I build things for the web — interfaces that stay out of the way, and the systems underneath them. Currently focused on design engineering and front-end architecture.',
  // Used for absolute URLs in the sitemap and RSS feed. Swap in the real domain
  // before launch; Vercel also serves the site at its own *.vercel.app URL.
  url: 'https://portfolio-sigma-lyart-29.vercel.app',
  email: 'avenueabundance9@gmail.com',
  // Any link with an empty string is hidden automatically.
  links: [
    { label: 'Email', href: 'mailto:avenueabundance9@gmail.com' },
    { label: 'GitHub', href: '' },
    { label: 'LinkedIn', href: '' },
    { label: 'Twitter', href: '' },
  ],
} as const;

export const nav = [
  { label: 'Work', href: '/projects/' },
  { label: 'Writing', href: '/writing/' },
  { label: 'About', href: '/about/' },
] as const;

/** Links with a real href, in nav/footer display order. */
export const activeLinks = site.links.filter((link) => link.href.length > 0);

/**
 * The CV. This file is the single source of truth.
 *
 * `/cv/` renders it, and printing that page (Ctrl/Cmd+P → Save as PDF) produces
 * the PDF from these same lines. There is deliberately no second copy anywhere —
 * a separate PDF would drift out of date within a month.
 *
 * Everything in [square brackets] is a placeholder waiting for you.
 * See PLACEHOLDERS.md in the project root for what each letter is.
 *
 * To add a row, copy an existing one. To remove a section, delete it from the
 * two arrays at the bottom of this file — nothing else needs touching.
 */

export interface Entry {
  /** The bold line — degree, role, or award. */
  title: string;
  /** Where it happened. Omit when there is nowhere sensible to name. */
  where?: string;
  /** Right-hand column. A year, a range, or a month-year. */
  when: string;
  /** Grade, score, percentile — anything a reader would want to check. */
  result?: string;
  /** Free-text detail lines shown beneath the title. */
  notes?: string[];
  /** Turns the title into a link. Use for anything with public evidence. */
  href?: string;
}

export interface Section {
  /** Heading, and the anchor id — `/cv/#education` — so you can deep-link one line. */
  id: string;
  heading: string;
  entries: Entry[];
}

export const profile = {
  name: '[a]',
  /** One line under the name. The only place on the CV allowed a voice. */
  strapline: '[k]',
  location: '[l]',
  email: '[d]',
  /**
   * Shown only on the printed CV, never on the web page — a phone number is
   * expected on a CV you attach to an application and unnecessary on a public
   * page anyone can read. Leave it as '' to keep it off the print version too.
   */
  phone: '',
  linkedin: { label: '[m]', href: '' },
} as const;

/**
 * The opening paragraphs. Two or three sentences for someone who has thirty
 * seconds: what you work on, and what you are looking for.
 */
export const summary = ['[n]', '[o]'];

export const education: Section = {
  id: 'education',
  heading: 'Education and qualifications',
  entries: [
    {
      title: '[p]',
      where: '[q]',
      when: '[r]',
      result: '[s]',
      notes: ['[t]'],
    },
    {
      title: '[u]',
      where: '[v]',
      when: '[w]',
      result: '[x]',
    },
  ],
};

export const teaching: Section = {
  id: 'teaching',
  heading: 'Teaching and experience',
  entries: [
    {
      title: '[y]',
      where: '[z]',
      when: '[aa]',
      notes: ['[ab]'],
    },
    {
      title: '[ac]',
      where: '[ad]',
      when: '[ae]',
    },
  ],
};

export const awards: Section = {
  id: 'awards',
  heading: 'Awards and scholarships',
  entries: [
    {
      title: '[af]',
      where: '[ag]',
      when: '[ah]',
    },
    {
      title: '[ai]',
      when: '[aj]',
    },
  ],
};

/**
 * Grouped rather than listed flat so a reader can find the one they care about.
 * Every tool named here should have something on the site that used it.
 */
export const skills = [
  {
    group: '[ak]',
    items: ['[al]', '[am]'],
  },
  {
    group: '[an]',
    items: ['[ao]', '[ap]'],
  },
  {
    group: '[aq]',
    items: ['[ar]', '[as]'],
  },
];

/**
 * Homepage order. Research is not in either list — it comes from the content
 * collection and renders between the two, directly after education, which is
 * where an academic reader looks for it.
 */
export const sectionsBeforeResearch = [education];
export const sectionsAfterResearch = [teaching, awards];

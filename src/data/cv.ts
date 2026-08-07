/**
 * The CV. This file is the single source of truth.
 *
 * `/cv/` renders it, and printing that page (Ctrl/Cmd+P → Save as PDF) produces
 * the PDF from these same lines. There is deliberately no second copy anywhere —
 * a separate PDF would drift out of date within a month.
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
  /** Free-text detail lines shown beneath the title. */
  notes?: string[];
  /** A dissertation title, set off by a rule so it reads as part of the degree. */
  dissertation?: string;
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
  name: 'Khushi Bajaj',
  /**
   * One line under the name. The only place on the CV allowed a voice.
   * Empty, so the masthead is the name and the contact line alone — fill it in
   * and the line reappears, no other edit needed.
   */
  strapline: '',
  location: 'Guwahati, Assam',
  email: 'khushi@khushibajaj.com',
  /**
   * Shown only on the printed CV, never on the web page — a phone number is
   * expected on a CV you attach to an application and unnecessary on a public
   * page anyone can read. Fill it in and it appears on the print version only.
   */
  phone: '',
  linkedin: {
    label: 'linkedin.com/in/khushibajaj7',
    href: 'https://www.linkedin.com/in/khushibajaj7',
  },
} as const;

export const education: Section = {
  id: 'education',
  heading: 'Education',
  entries: [
    {
      title: 'UGC-NET, Management',
      where: 'Qualified for Assistant Professor eligibility and Ph.D. admission',
      when: 'Dec 2025',
      notes: ['97.42 percentile · 188 marks'],
    },
    {
      title: 'M.Com, Marketing Management',
      where: 'St. Xavier’s College (Autonomous), Kolkata · 8.24 CGPA',
      when: '2026',
      dissertation:
        'Discerning the Role of Attention Fragmentation and Selective Attention in Shaping Consumer Purchase Decisions: The Case of FMCG Brands in Kolkata.',
    },
    {
      title: 'B.Com (Hons.), Marketing Management',
      where: 'St. Xavier’s College (Autonomous), Kolkata · 7.21 CGPA',
      when: '2024',
      dissertation: 'Impact of Automation in Human Resource Practices in India.',
    },
    {
      title: 'ISC, Class XII',
      where: 'Sanskriti The Gurukul, Guwahati · 92.6%',
      when: '2021',
    },
    {
      title: 'ICSE, Class X',
      where: 'Sanskriti The Gurukul, Guwahati · 86.5%',
      when: '2019',
    },
  ],
};

export const experience: Section = {
  id: 'experience',
  heading: 'Experience',
  entries: [
    {
      title: 'Marketing and Sales Intern',
      where: 'Salasar Bakers Pvt. Ltd.',
      when: 'Jan – Mar 2026',
      notes: [
        'Worked across marketing and sales operations, including customer engagement and market research.',
      ],
    },
    {
      title: 'Social Media Managing Intern',
      where: 'GirlUpKavach, a GirlUp community chapter',
      when: 'Feb 2022 – Jan 2023',
      notes: [
        'Ran the weekly “Friday Features” campaign, and worked on content management, analytics and audience engagement.',
      ],
    },
  ],
};

export const awards: Section = {
  id: 'awards',
  heading: 'Awards and achievements',
  entries: [
    {
      title: 'Fr. Joris Scholarship for Academic Performance',
      where:
        'St. Xavier’s College (Autonomous), Kolkata — three consecutive years, from a B.Com batch of 700+',
      when: '2021 – 2024',
    },
    {
      title: 'Third place, Android App Development — TECHVRIDDHI’19',
      where: 'IIT Kharagpur',
      when: '2019',
    },
    {
      title: 'Best Speaker and Extra Mile Award',
      where: 'Micmellows Public Speaking Workshop',
      when: '2019',
    },
    {
      title: 'Global Economics Olympiad — Grade A+',
      when: '2016',
    },
  ],
};

export const service: Section = {
  id: 'service',
  heading: 'Service and volunteering',
  entries: [
    {
      title: 'Registration committee',
      where:
        '4th International Conference on Business Innovation Practices and Sustainability in the VUCA World',
      when: 'Nov 2025',
    },
    {
      title: 'Volunteer',
      where: 'Pather Sathi — holistic activities with underprivileged children',
      when: '2024',
    },
  ],
};

/**
 * Rendered as prose rather than as a list, because a skills list is only worth
 * reading when each entry says what you did with the thing.
 */
export const skills = [
  {
    group: 'Quantitative',
    text: 'SPSS: survey analysis, reliability testing, mediation analysis. Excel: data cleaning, descriptive analysis, charting.',
  },
  {
    group: 'Research',
    text: 'Questionnaire design and primary data collection, mixed-method study design, secondary-data analysis, academic and report writing.',
  },
  {
    group: 'Other',
    text: 'Public speaking, MS Word and PowerPoint, Canva.',
  },
];

export const languages = 'English · Hindi';

/**
 * Page order. Papers are not in either list — they come from the research
 * content collection and render between the two, directly after education,
 * which is where an academic reader looks for them.
 */
export const sectionsBeforeResearch = [education];
export const sectionsAfterResearch = [experience, awards, service];

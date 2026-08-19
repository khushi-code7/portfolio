/**
 * Built things — demonstration sites and front-end pieces.
 *
 * These are not Markdown entries because there is no page to render: each one
 * is a finished site that ships as static files in `public/projects/<name>/`
 * and is linked to, not templated. Adding one means dropping the folder into
 * `public/projects/` and adding an entry here.
 */

export type Project = {
  title: string;
  /** Small label, as on the research index. */
  kind: string;
  year: string;
  summary: string;
  /** Where it lives. Site-relative for anything shipped from `public/`. */
  href: string;
  /** What it was built with. Rendered as a plain line, not chips. */
  built: string[];
  /** Kept out of the build, exactly as `draft: true` does for writing. */
  draft?: boolean;
};

export const projects: Project[] = [
  {
    title: 'Noctuaire',
    kind: 'Demonstration site',
    year: '2026',
    summary:
      'A fictional fragrance house — four extraits, a product page, a materials table and a journal. The bottles are one SVG symbol; the liquid inside the selected one is a raymarched signed distance field in a single fragment shader, no 3D model and one draw call, and each fragrance changes how it behaves rather than only what colour it is.',
    href: '/projects/noctuaire/',
    built: ['WebGL', 'GLSL', 'No dependencies'],
  },
];

export const publishedProjects = projects.filter((p) => !p.draft);

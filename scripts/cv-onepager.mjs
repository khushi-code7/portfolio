/**
 * Builds the one-page CV PDF that gets attached to applications.
 *
 * Everything it prints comes from `src/data/cv.ts` and the research collection —
 * the same two sources `/cv/` renders from. There is still no second copy of the
 * CV in this repo: this is a layout, not a document. Edit the data, run this,
 * and the PDF follows.
 *
 *   npm run cv:pdf                 -> ../KhushiBajajCV.pdf
 *   npm run cv:pdf -- some/out.pdf -> wherever you say
 *
 * The layout is the dense bordered-table CV that Indian academic and corporate
 * applications expect — deliberately not the look of the website, which is for
 * reading rather than for skimming next to two hundred others.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, writeFileSync, unlinkSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parse as parseYaml } from 'yaml';

import {
  profile,
  education,
  experience,
  awards,
  service,
  skills,
  languages,
} from '../src/data/cv.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, process.argv[2] ?? '../KhushiBajajCV.pdf');

/* -- data ----------------------------------------------------------------- */

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Papers, newest first, straight out of `src/content/research/`. */
function papers() {
  const dir = join(root, 'src/content/research');
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = readFileSync(join(dir, f), 'utf8');
      const end = raw.indexOf('\n---', 4);
      return parseYaml(raw.slice(4, end));
    })
    .filter((p) => !p.draft)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

/** `'St. Xavier's College, Kolkata · 8.24 CGPA'` -> institution and score. */
function splitWhere(where = '') {
  const at = where.lastIndexOf(' \u00b7 ');
  return at === -1
    ? { detail: where, score: '' }
    : { detail: where.slice(0, at), score: where.slice(at + 3) };
}

/** `'M.Com, Marketing Management'` -> the degree over its parenthesised field. */
function degreeLines(title) {
  const at = title.indexOf(', ');
  return at === -1
    ? esc(title)
    : `${esc(title.slice(0, at))}<br><span class="qual">(${esc(title.slice(at + 2))})</span>`;
}

/** Consecutive entries sharing a label become one rowspan, as in a Word CV. */
function groupExperience(entries) {
  const groups = [];
  for (const entry of entries) {
    const label = /intern/i.test(entry.title) ? 'Internship' : 'Practice';
    const last = groups.at(-1);
    if (last && last.label === label) last.entries.push(entry);
    else groups.push({ label, entries: [entry] });
  }
  return groups;
}

/* -- layout --------------------------------------------------------------- */

const band = (text) => `<tr><td class="band" colspan="4">${esc(text)}</td></tr>`;
const bullets = (items) =>
  `<ul>${items.filter(Boolean).map((i) => `<li>${i}</li>`).join('')}</ul>`;

function educationRows() {
  return education.entries
    .map((e) => {
      const { detail, score } = splitWhere(e.where);
      // UGC-NET carries its percentile in a note rather than in `where`.
      const shown =
        esc(score) ||
        esc(e.notes?.[0] ?? '')
          .replace(' percentile', '%ile')
          .replace(' \u00b7 ', '<br>');
      return `<tr>
        <td class="key">${degreeLines(e.title)}</td>
        <td>${esc(detail)}</td>
        <td class="num">${shown}</td>
        <td class="num">${esc(e.when)}</td>
      </tr>`;
    })
    .join('');
}

function paperRows() {
  const blocks = papers()
    .map(
      (p) => `<div class="paper">
        <p class="paper__title">\u201c${esc(p.title)}\u201d (${esc(p.year ?? new Date(p.date).getFullYear())})</p>
        ${bullets([
          esc(p.venue),
          p.distinction ? `<strong>${esc(p.distinction)}</strong>` : '',
          esc(p.summary),
        ])}
      </div>`,
    )
    .join('');
  return `<tr><td class="key">Paper<br>presentations</td><td colspan="3">${blocks}</td></tr>`;
}

function experienceRows() {
  return groupExperience(experience.entries)
    .map(({ label, entries }) =>
      entries
        .map((e, i) => {
          const key =
            i === 0 ? `<td class="key" rowspan="${entries.length}">${esc(label)}</td>` : '';
          return `<tr>
            ${key}
            <td colspan="2">
              <p class="org">${esc(e.where)}</p>
              <p class="role">${esc(e.title)}</p>
              ${bullets((e.notes ?? []).map(esc))}
            </td>
            <td class="num">${esc(e.when)}</td>
          </tr>`;
        })
        .join(''),
    )
    .join('');
}

function listRows(label, entries) {
  return entries
    .map((e, i) => {
      const key =
        i === 0 ? `<td class="key" rowspan="${entries.length}">${esc(label)}</td>` : '';
      const where = e.where ? `<span class="dim"> \u2014 ${esc(e.where)}</span>` : '';
      return `<tr>
        ${key}
        <td colspan="2"><p><strong>${esc(e.title)}</strong>${where}</p></td>
        <td class="num">${esc(e.when)}</td>
      </tr>`;
    })
    .join('');
}

const contact = [profile.phone, profile.email, profile.linkedin.label]
  .filter(Boolean)
  .map(esc)
  .join(' &nbsp;|&nbsp; ');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${esc(profile.name)} CV</title>
<style>
  @page { size: A4; margin: 9mm 10mm; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: Calibri, Carlito, "Segoe UI", sans-serif;
    font-size: 8.3pt;
    line-height: 1.25;
    color: #000;
  }
  h1 { font-size: 15pt; margin: 0; letter-spacing: 0.04em; text-transform: uppercase; }
  .contact { margin: 2pt 0 5pt; font-size: 8.4pt; }
  p { margin: 0; }

  table { width: 100%; border-collapse: collapse; table-layout: fixed; }
  td { border: 0.5pt solid #000; padding: 2.2pt 4.5pt; vertical-align: middle; }

  .band {
    background: #d9d9d9;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 8pt;
  }
  .key {
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
    font-size: 7.6pt;
    letter-spacing: 0.02em;
  }
  .qual { font-weight: 400; text-transform: none; letter-spacing: 0; }
  .num { text-align: center; font-size: 7.8pt; }
  .dim { font-weight: 400; }

  ul { margin: 1pt 0 0; padding-left: 11pt; }
  li { margin: 0.5pt 0; }

  .paper + .paper { margin-top: 3pt; }
  .paper__title { font-weight: 700; }
  .org { font-weight: 700; text-decoration: underline; }
  .role { font-weight: 700; }
</style>
</head>
<body>
  <h1>${esc(profile.name)}</h1>
  <p class="contact">${contact}</p>

  <table>
    ${band('Educational qualifications')}
    ${educationRows()}

    ${band('Academic and research highlights')}
    ${paperRows()}

    ${band('Experience')}
    ${experienceRows()}

    ${band('Achievements, awards and service')}
    ${listRows('Awards', awards.entries)}
    ${listRows('Service', service.entries)}

    ${band('Other information')}
    <tr>
      <td class="key">Skills</td>
      <td colspan="3">
        ${skills.map((s) => `<p><strong>${esc(s.group)}:</strong> ${esc(s.text)}</p>`).join('')}
      </td>
    </tr>
    <tr>
      <td class="key">Languages</td>
      <td colspan="3">${esc(languages)}</td>
    </tr>
  </table>
</body>
</html>`;

/* -- render --------------------------------------------------------------- */

const CHROMES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
];
const chrome = CHROMES.find(existsSync);
if (!chrome) throw new Error(`No Chrome or Edge found. Looked in:\n${CHROMES.join('\n')}`);

const page = join(root, '.cv-onepager.html');
writeFileSync(page, html, 'utf8');

try {
  execFileSync(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-pdf-header-footer',
      `--print-to-pdf=${out}`,
      pathToFileURL(page).href,
    ],
    { stdio: 'pipe' },
  );
} finally {
  // CV_KEEP_HTML=1 leaves the intermediate page behind, which is the only
  // practical way to see what went wrong when the layout misbehaves.
  if (!process.env.CV_KEEP_HTML) unlinkSync(page);
}

// One page is the whole point, so fail loudly rather than quietly shipping two.
const pages = (readFileSync(out).toString('latin1').match(/\/Type\s*\/Page[^s]/g) ?? []).length;
console.log(`${out} - ${pages} page(s)`);
if (pages !== 1) {
  console.error(`Expected 1 page, got ${pages}. Trim the content or the font size.`);
  process.exitCode = 1;
}

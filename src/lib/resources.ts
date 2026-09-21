export type Category =
  | 'slides'
  | 'pdf'
  | 'document'
  | 'spreadsheet'
  | 'image'
  | 'notebook'
  | 'link'
  | 'other';

export const CATEGORY_ORDER: Category[] = [
  'slides',
  'pdf',
  'document',
  'spreadsheet',
  'image',
  'notebook',
  'link',
  'other',
];

export const CATEGORY_LABELS: Record<Category, string> = {
  slides: 'Slides',
  pdf: 'PDFs',
  document: 'Documents',
  spreadsheet: 'Spreadsheets',
  image: 'Images',
  notebook: 'Notebooks',
  link: 'Links',
  other: 'Other Files',
};

function categorizeExt(ext: string): Category {
  if (['.ppt', '.pptx'].includes(ext)) return 'slides';
  if (ext === '.pdf') return 'pdf';
  if (['.doc', '.docx', '.txt', '.rtf'].includes(ext)) return 'document';
  if (['.xls', '.xlsx', '.csv'].includes(ext)) return 'spreadsheet';
  if (['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'].includes(ext)) return 'image';
  if (ext === '.ipynb') return 'notebook';
  return 'other';
}

export interface ResourceFile {
  kind: 'file' | 'link';
  section: string;
  sectionSlug: string;
  filename?: string;
  title: string;
  slug: string;
  ext: string;
  category: Category;
  url: string;
  description?: string;
}

export interface ResourceSection {
  section: string;
  sectionSlug: string;
  files: ResourceFile[];
}

const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function titleFromFilename(filename: string): string {
  const withoutExt = filename.replace(/\.[^./]+$/, '');
  return withoutExt.replace(/[-_]+/g, ' ').trim();
}

// In `astro dev`, Vite resolves `?url` imports to raw source-relative paths
// (e.g. "/src/content/resources/...") that don't include Astro's configured
// `base` ("/website/") — the production build output includes it
// automatically, so only prepend it here for dev.
function resolveUrl(rawUrl: string): string {
  if (import.meta.env.DEV) {
    const base = import.meta.env.BASE_URL.replace(/\/$/, '');
    return `${base}${rawUrl}`;
  }
  return rawUrl;
}

// Eagerly imports every file under src/content/resources/ as a build-resolved
// asset URL (works for any file type, not just markdown/JSON). `no-inline` is
// required — otherwise Vite silently inlines small files as `data:` URIs
// instead of emitting a real fetchable URL, which breaks the Office Viewer
// embed (it needs an HTTP(S) URL it can fetch, not a data URI).
const modules = import.meta.glob('/src/content/resources/**/*', {
  eager: true,
  query: '?url&no-inline',
  import: 'default',
}) as Record<string, string>;

// links.md is a control file (parsed separately below), not a downloadable
// resource itself, even though the glob above matches it like any other file.
const LINKS_FILENAME = 'links.md';

function parseModules(): ResourceFile[] {
  const prefix = '/src/content/resources/';
  const files: ResourceFile[] = [];

  for (const [path, url] of Object.entries(modules)) {
    if (!path.startsWith(prefix)) continue;
    const rest = path.slice(prefix.length);
    const segments = rest.split('/');
    if (segments.length !== 2) continue; // exactly one folder level deep is supported

    const [section, filename] = segments;
    if (filename === LINKS_FILENAME) continue;

    const extMatch = filename.match(/\.[^./]+$/);
    const ext = extMatch ? extMatch[0].toLowerCase() : '';

    files.push({
      kind: 'file',
      section,
      sectionSlug: slugify(section),
      filename,
      title: titleFromFilename(filename),
      slug: slugify(filename.replace(/\.[^./]+$/, '')),
      ext,
      category: categorizeExt(ext),
      url: resolveUrl(url),
    });
  }

  return files;
}

// Raw text of every per-folder links.md, so its lines can be parsed into
// link entries below (a `?url` import wouldn't give us the file's contents).
const linkModules = import.meta.glob('/src/content/resources/**/links.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

// Awesome-list-style bullet: "- [Title](https://url) - Description" (description optional).
const LINK_LINE_PATTERN = /^-\s*\[([^\]]+)\]\((\S+)\)(?:\s+-\s+(.+))?\s*$/;

function parseLinkModules(): ResourceFile[] {
  const prefix = '/src/content/resources/';
  const entries: ResourceFile[] = [];

  for (const [path, content] of Object.entries(linkModules)) {
    if (!path.startsWith(prefix)) continue;
    const rest = path.slice(prefix.length);
    const segments = rest.split('/');
    if (segments.length !== 2) continue; // exactly one folder level deep is supported

    const [section] = segments;

    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;

      const match = line.match(LINK_LINE_PATTERN);
      if (!match) {
        console.warn(`[resources] Skipping unrecognized line in ${path}: "${line}"`);
        continue;
      }

      const [, title, url, description] = match;
      entries.push({
        kind: 'link',
        section,
        sectionSlug: slugify(section),
        title,
        slug: slugify(title),
        ext: '',
        category: 'link',
        url,
        description,
      });
    }
  }

  return entries;
}

export function getResourceSections(): ResourceSection[] {
  const bySection = new Map<string, ResourceSection>();

  for (const file of [...parseModules(), ...parseLinkModules()]) {
    let section = bySection.get(file.sectionSlug);
    if (!section) {
      section = { section: file.section, sectionSlug: file.sectionSlug, files: [] };
      bySection.set(file.sectionSlug, section);
    }
    section.files.push(file);
  }

  const sections = [...bySection.values()];
  sections.sort((a, b) => collator.compare(a.section, b.section));
  for (const section of sections) {
    section.files.sort((a, b) => {
      const categoryDiff = CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category);
      return categoryDiff !== 0 ? categoryDiff : collator.compare(a.title, b.title);
    });
  }

  return sections;
}

export function findResourceFile(
  sectionSlug: string,
  fileSlug: string
): { file: ResourceFile; sectionTitle: string } | undefined {
  const section = getResourceSections().find((s) => s.sectionSlug === sectionSlug);
  const file = section?.files.find((f) => f.slug === fileSlug);
  return section && file ? { file, sectionTitle: section.section } : undefined;
}

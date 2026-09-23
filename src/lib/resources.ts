import yaml from 'js-yaml';
import additionalRaw from '/src/data/additional-resources.md?raw';

export type Category =
  | 'slides'
  | 'pdf'
  | 'document'
  | 'spreadsheet'
  | 'image'
  | 'notebook'
  | 'other';

export const CATEGORY_ORDER: Category[] = [
  'slides',
  'pdf',
  'document',
  'spreadsheet',
  'image',
  'notebook',
  'other',
];

export const CATEGORY_LABELS: Record<Category, string> = {
  slides: 'Slides',
  pdf: 'PDFs',
  document: 'Documents',
  spreadsheet: 'Spreadsheets',
  image: 'Images',
  notebook: 'Notebooks',
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
  section: string;
  sectionSlug: string;
  filename: string;
  title: string;
  slug: string;
  ext: string;
  category: Category;
  url: string;
}

export interface ResourceLink {
  name: string;
  url: string;
  description?: string;
}

export interface ResourceSection {
  section: string;
  sectionSlug: string;
  title: string;
  date?: Date;
  description?: string;
  links: ResourceLink[];
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

// info.md is a control file (parsed separately below as YAML), not a
// downloadable resource itself, even though the glob above matches it.
const INFO_FILENAME = 'info.md';

function sectionFromPath(prefix: string, path: string): string | undefined {
  if (!path.startsWith(prefix)) return undefined;
  const rest = path.slice(prefix.length);
  const segments = rest.split('/');
  if (segments.length !== 2) return undefined; // exactly one folder level deep is supported
  return segments[0];
}

function parseModules(): ResourceFile[] {
  const prefix = '/src/content/resources/';
  const files: ResourceFile[] = [];

  for (const [path, url] of Object.entries(modules)) {
    const section = sectionFromPath(prefix, path);
    if (!section) continue;
    const filename = path.slice(prefix.length + section.length + 1);
    if (filename === INFO_FILENAME) continue;

    const extMatch = filename.match(/\.[^./]+$/);
    const ext = extMatch ? extMatch[0].toLowerCase() : '';

    files.push({
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

// Raw text of every per-folder info.md, so its YAML frontmatter can be parsed below.
const infoModules = import.meta.glob('/src/content/resources/**/info.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/;

interface ParsedInfo {
  title?: string;
  date?: Date;
  description?: string;
  links: ResourceLink[];
}

function parseInfoFile(path: string, content: string): ParsedInfo {
  const empty: ParsedInfo = { links: [] };

  const match = content.match(FRONTMATTER_PATTERN);
  if (!match) {
    console.warn(`[resources] No YAML frontmatter found in ${path}`);
    return empty;
  }

  let doc: unknown;
  try {
    doc = yaml.load(match[1]);
  } catch (err) {
    console.warn(`[resources] Failed to parse YAML in ${path}: ${(err as Error).message}`);
    return empty;
  }

  if (typeof doc !== 'object' || doc === null) return empty;
  const data = doc as Record<string, unknown>;

  const title = typeof data.title === 'string' ? data.title : undefined;
  const date = data.date instanceof Date ? data.date : undefined;
  const description = typeof data.description === 'string' ? data.description : undefined;

  const links: ResourceLink[] = [];
  if (Array.isArray(data.links)) {
    for (const entry of data.links) {
      if (
        typeof entry === 'object' &&
        entry !== null &&
        typeof (entry as Record<string, unknown>).name === 'string' &&
        typeof (entry as Record<string, unknown>).url === 'string'
      ) {
        const e = entry as Record<string, unknown>;
        links.push({
          name: e.name as string,
          url: e.url as string,
          description: typeof e.description === 'string' ? e.description : undefined,
        });
      } else {
        console.warn(`[resources] Skipping malformed link entry in ${path}: ${JSON.stringify(entry)}`);
      }
    }
  }

  return { title, date, description, links };
}

function getInfoBySection(): Map<string, ParsedInfo> {
  const prefix = '/src/content/resources/';
  const bySection = new Map<string, ParsedInfo>();

  for (const [path, content] of Object.entries(infoModules)) {
    const section = sectionFromPath(prefix, path);
    if (!section) continue;
    bySection.set(slugify(section), parseInfoFile(path, content));
  }

  return bySection;
}

// section.files is already sorted by category (see getResourceSections), so
// grouping just needs to split it into consecutive same-category runs.
export function groupFilesByCategory(files: ResourceFile[]) {
  const groups: { label: string; files: ResourceFile[] }[] = [];
  for (const file of files) {
    const last = groups[groups.length - 1];
    const label = CATEGORY_LABELS[file.category];
    if (last && last.label === label) {
      last.files.push(file);
    } else {
      groups.push({ label, files: [file] });
    }
  }
  return groups;
}

export function getResourceSections(): ResourceSection[] {
  const bySection = new Map<string, ResourceSection>();
  const infoBySection = getInfoBySection();

  function getOrCreate(section: string, sectionSlug: string): ResourceSection {
    let entry = bySection.get(sectionSlug);
    if (!entry) {
      const info = infoBySection.get(sectionSlug);
      entry = {
        section,
        sectionSlug,
        title: info?.title ?? section,
        date: info?.date,
        description: info?.description,
        links: info?.links ?? [],
        files: [],
      };
      bySection.set(sectionSlug, entry);
    }
    return entry;
  }

  for (const file of parseModules()) {
    getOrCreate(file.section, file.sectionSlug).files.push(file);
  }

  // Folders that only have an info.md (no files yet) still get a section.
  const prefix = '/src/content/resources/';
  for (const path of Object.keys(infoModules)) {
    const section = sectionFromPath(prefix, path);
    if (section) getOrCreate(section, slugify(section));
  }

  const sections = [...bySection.values()];
  sections.sort((a, b) => {
    if (a.date && b.date) return a.date.valueOf() - b.date.valueOf();
    if (a.date && !b.date) return -1;
    if (!a.date && b.date) return 1;
    return collator.compare(a.title, b.title);
  });
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
  return section && file ? { file, sectionTitle: section.title } : undefined;
}

// Outside links listed in src/data/additional-resources.md, using the same
// `links:` frontmatter format as the per-meeting info.md files.
export function getAdditionalResources(): ResourceLink[] {
  return parseInfoFile('src/data/additional-resources.md', additionalRaw).links;
}

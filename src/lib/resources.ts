export interface ResourceFile {
  section: string;
  sectionSlug: string;
  filename: string;
  title: string;
  slug: string;
  ext: string;
  url: string;
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

function parseModules(): ResourceFile[] {
  const prefix = '/src/content/resources/';
  const files: ResourceFile[] = [];

  for (const [path, url] of Object.entries(modules)) {
    if (!path.startsWith(prefix)) continue;
    const rest = path.slice(prefix.length);
    const segments = rest.split('/');
    if (segments.length !== 2) continue; // exactly one folder level deep is supported

    const [section, filename] = segments;
    const extMatch = filename.match(/\.[^./]+$/);
    const ext = extMatch ? extMatch[0].toLowerCase() : '';

    files.push({
      section,
      sectionSlug: slugify(section),
      filename,
      title: titleFromFilename(filename),
      slug: slugify(filename.replace(/\.[^./]+$/, '')),
      ext,
      url: resolveUrl(url),
    });
  }

  return files;
}

export function getResourceSections(): ResourceSection[] {
  const bySection = new Map<string, ResourceSection>();

  for (const file of parseModules()) {
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
    section.files.sort((a, b) => collator.compare(a.title, b.title));
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

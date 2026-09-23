// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://quantum-society-at-auburn.github.io',
  base: '/website/',
  integrations: [sitemap()],
});
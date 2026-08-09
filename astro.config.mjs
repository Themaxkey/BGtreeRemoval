import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site } from './site.config.ts';

export default defineConfig({
  site: `https://${site.business.domain}`,
  // WordPress served every URL with a trailing slash. Keeping that identical
  // is the single most important thing in this migration.
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap({ changefreq: 'weekly', priority: 0.7 })],
});

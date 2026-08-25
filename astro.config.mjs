import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site } from './site.config.ts';

export default defineConfig({
  site: `https://${site.business.domain}`,
  // WordPress served every URL with a trailing slash. Keeping that identical
  // is the single most important thing in this migration.
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      // These two pages now carry `noindex: true` in their frontmatter.
      // Leaving a noindexed URL in the sitemap makes Search Console report it
      // as an error ("Submitted URL marked noindex") — you are telling Google
      // to crawl it and not to index it in the same breath. Birmingham and
      // Huntsville got this fix on 20 August; Bowling Green never did, so its
      // privacy and SMS pages have been sitting in the sitemap as indexable
      // this whole time, spending crawl budget on a site where twenty pages
      // are not surfacing at all.
      filter: (page) =>
        !page.endsWith('/privacy-policy/') &&
        !page.endsWith('/sms-terms-and-conditions/'),
    }),
  ],
});

import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mindthepour.space',
  integrations: [
    sitemap({
      // Team-only pages are noindex; listing them in the sitemap would tell
      // Google the opposite. Keep the two signals in agreement.
      filter: (page) => !/\/(login|admin)\/?$/.test(page),
    }),
  ],
});

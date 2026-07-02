import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: change to your real domain once registered (e.g. https://mindthepour.in)
export default defineConfig({
  site: 'https://mindthepour.space',
  integrations: [sitemap()],
});

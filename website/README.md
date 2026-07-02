# Mind the Pour — Website

Astro static site. The SEO/GEO moat for the project. Deploys **free** on Cloudflare Pages or Vercel.

## Run locally
```bash
cd "Mind The Pour/website"
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to ./dist
```

## How the SEO/GEO is built in
- **Programmatic SEO:** `src/pages/states/[slug].astro` generates one page per row in `src/data/states.json`. Add states/brands/categories → pages appear automatically. This is how we target hundreds of long-tail searches.
- **GEO (AI-citability):** every page ships `schema.org` JSON-LD (`Article`, `FAQPage`, `DefinedTermSet`) in `Base.astro`, plus `public/llms.txt` and an AI-crawler-friendly `robots.txt`. This is what makes ChatGPT/Gemini/Perplexity quote us.
- **On-page (Class 6):** unique title + meta description + canonical + OG tags per page; semantic H1/H2; internal linking; sitemap via `@astrojs/sitemap`.
- **Off-page (Class 6):** earn backlinks by linking the site from every IG bio/post, YouTube, and pitching data explainers to niche blogs.

## To grow the content
1. Add rows to `src/data/states.json` (verify numbers against official excise sources — see `../03_RESEARCH_CORPUS.md`).
2. Duplicate the states pattern for `/brands/[slug]` and `/spirits/[slug]` collections.
3. Write evergreen explainers (see the list in `03_RESEARCH_CORPUS.md`).

## Deploy (free)
1. Push this folder to a GitHub repo.
2. Cloudflare Pages / Vercel → "Import repo" → framework preset **Astro** → deploy.
3. Point your domain at it. Update `site:` in `astro.config.mjs` to the real domain.

## Before launch checklist
- [ ] Replace `mindthepour.in` in `astro.config.mjs` + `llms.txt` + `robots.txt` with real domain.
- [ ] Verify all `todo`/`estimate` data against official sources.
- [ ] Add Google Search Console + submit sitemap.
- [ ] Add a lightweight analytics (Cloudflare Web Analytics — free, privacy-friendly).

# Mind the Pour — Project Status

Single entry point. Start here.

## Docs (read in order)
1. [00_STRATEGY.md](00_STRATEGY.md) — the plan, budget, 30-day timeline, metrics, course-framework tie-ins
2. [01_BRAND.md](01_BRAND.md) — identity system + Value/Effort roadmap
3. [02_INSTAGRAM_LAUNCH_KIT.md](02_INSTAGRAM_LAUNCH_KIT.md) — profile setup, 9-post grid seed, first reel scripts
4. [04_CONTENT_CALENDAR.md](04_CONTENT_CALENDAR.md) — full 30-day calendar with hooks (built on hook mechanics)
5. [03_RESEARCH_CORPUS.md](03_RESEARCH_CORPUS.md) — accuracy workflow (NotebookLM) + sources
6. `data/state_excise_starter.csv` — starter dataset (numbers to verify)

## Website (`website/`)
Astro 5 static site. SEO/GEO moat. Builds free-hostable output.

**Content (data-driven, programmatic):**
- `src/data/states.json` — 36 states/UTs → `/states/[slug]/`
- `src/data/brands.json` — 20 brands → `/brands/[slug]/`
- `src/data/explainers.json` — 8 evergreen articles → `/learn/[slug]/`
- `src/data/glossary` (in page) → `/glossary/`
- Static pages: `/`, `/about/`, `/responsible-drinking/`

**AI content pipeline (OpenRouter, free models):**
- `scripts/openrouter.mjs` — no-dep client, free-model fallback, robust JSON parse + retries
- `npm run gen:all` — (re)generate states + brands + explainers content
- `npm run models` — list currently-free models
- Output: `src/data/*-content.json` (marked `draft:true` — review + add sourced numbers before publishing)

**SEO/GEO built in:**
- Per-page JSON-LD: Article, FAQPage, DefinedTermSet, Organization, WebSite
- `public/llms.txt`, AI-crawler-friendly `public/robots.txt`, auto `sitemap-index.xml`
- Unique title/meta/canonical/OG per page; semantic headings; internal linking

**Run it:**
```bash
cd website
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/  (deploy this)
```

## Security
- `.gitignore` (root + website) excludes `.env`, `node_modules`, `dist`. **Never commit the OpenRouter key.**

## Before publishing (checklist)
- [ ] Register domain; update `site:` in `astro.config.mjs` + URLs in `llms.txt`/`robots.txt`
- [ ] Verify `todo`/`estimate`/`[verify]` data against official excise sources; set `draft:false`
- [ ] Deploy to Cloudflare Pages / Vercel (framework preset: Astro)
- [ ] Add Google Search Console + submit sitemap; add Cloudflare Web Analytics (free)
- [ ] Wire the newsletter form (`src/components/Newsletter.astro`) to MailerLite/Buttondown free tier
- [ ] Create IG business account; connect a card for boosts

## Next content actions
- Turn calendar hooks into finished reels/carousels (Canva + Veo/Flow; refine copy via `viral-hooks`/`anti-ai-writing` skills)
- Expand `states.json`/`brands.json` rows anytime → pages + content auto-generate

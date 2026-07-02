# Mind the Pour — Developer Handoff (for Google Antigravity / any AI agent)

> Paste the "First-chat prompt" (bottom of this file) into Antigravity's first message, and point it at this file. This document is the single source of truth for continuing development.

---

## 1. What this project is
**Mind the Pour** — an editorial **media brand** decoding the business, pricing, psychology and culture of alcohol in India. Instagram (`@mindthepour`) + an SEO/GEO website. It is a **media/education project about the alcohol *industry* — NOT a seller or promoter of alcohol.**

- Tagline: *The business, pricing & culture behind every drink in India.*
- Audience: 22–35 urban Indian professionals; secondary: MBA/marketing/hospitality.
- Goal: build a community, rank on Google + get cited by AI engines, land sponsorships. It is also a university digital-marketing project (should visibly apply course frameworks: ZMOT, customer journey, Value/Effort + MoSCoW, Quality Score/Ad Rank, on/off-page SEO).

## 2. Hard rules / constraints (do not violate)
1. **No invented facts/numbers.** LLM-generated content must stay qualitative and never fabricate prices, tax rates, %, dates, sales figures, or award names. Use `[verify: ...]` placeholders instead. All such content is marked `draft: true` and needs human verification against official sources before publishing.
2. **Responsible framing.** 21+ only, "drink responsibly," never glamorise intoxication, never target minors, no brewing instructions. Traditional/tribal drinks are covered respectfully as cultural heritage.
3. **India alcohol-ad reality.** Direct alcohol advertising is banned in India (surrogate advertising). We position as *business/economics media*, which is both compliance-safe and sponsor-friendly. Keep that positioning.
4. **Never commit secrets.** `.env` is gitignored. Do not print or commit API keys.

## 2b. Methodology note (important for any non-Claude agent)
The original content was built using specialized Claude Code "skills" (viral hooks, anti-AI writing, storytelling, dumbify, brand/design). **Those skills do not exist in Antigravity/Gemini.** Their operational essence has been distilled into **`CONTENT_PLAYBOOK.md`** — read and apply it before writing ANY copy (hooks, captions, scripts, carousels, explainer prose). For visual/design consistency, the existing `Base.astro` CSS and `scripts/lib-og.mjs` templates ARE the design system — match them; see brand tokens in §11.

## 3. Tech stack
- **Astro 5** static site (`website/`). Output = static HTML in `dist/`. Deploy free on **Cloudflare Pages or Vercel** (framework preset: Astro).
- `@astrojs/sitemap` for sitemap. **Satori + @resvg/resvg-js** for branded image generation. No other framework; vanilla CSS in `Base.astro`.
- Node 22, npm. Windows dev environment (paths have spaces — quote them).

## 4. Folder structure
```
Mind The Pour/
├─ 00_STRATEGY.md, 01_BRAND.md, 02_INSTAGRAM_LAUNCH_KIT.md,
│  03_RESEARCH_CORPUS.md, 04_CONTENT_CALENDAR.md, PROJECT_STATUS.md   # strategy/content docs
│  CONTENT_PLAYBOOK.md   # HOW to write on-brand content (hooks/anti-AI/storytelling/dumbify) — read before writing any copy
├─ .env            # OPEN_ROUTER_KEY, GEMINI_API_KEY, GROK_AI  (gitignored)
├─ .gitignore
├─ data/state_excise_starter.csv                                     # numbers to verify
├─ social-cards/   # generated 1080x1080 IG cards (output)
└─ website/        # the Astro site  ← main dev happens here
   ├─ astro.config.mjs         # site URL (update to real domain) + sitemap
   ├─ src/
   │  ├─ layouts/Base.astro    # SEO/GEO head: meta, canonical, OG image, JSON-LD, nav/footer, global CSS
   │  ├─ components/Newsletter.astro
   │  ├─ pages/
   │  │  ├─ index.astro, about.astro, responsible-drinking.astro, glossary.astro
   │  │  ├─ states/index.astro, states/[slug].astro     # programmatic per-state pages
   │  │  ├─ brands/index.astro, brands/[slug].astro     # programmatic per-brand pages
   │  │  └─ learn/index.astro,  learn/[slug].astro      # programmatic explainer articles
   │  └─ data/
   │     ├─ states.json      # 36 states/UTs (incl. `traditional` tribal-drinks arrays)
   │     ├─ brands.json      # 20 brands
   │     ├─ explainers.json  # 10 evergreen article topics
   │     ├─ cards.json       # IG card definitions
   │     ├─ state-content.json / brand-content.json / explainer-content.json  # AI-generated (draft)
   │  └─ (glossary is inline in glossary.astro)
   ├─ public/  llms.txt, robots.txt, og/*.png (generated share images)
   └─ scripts/
      ├─ openrouter.mjs      # LLM client: OpenRouter + Gemini providers, genJSON() w/ retries + robust JSON parse
      ├─ generate-states.mjs / generate-brands.mjs / generate-explainers.mjs
      ├─ lib-og.mjs          # Satori render helpers + fonts (auto-download)
      ├─ gen-og.mjs          # branded OG share images (1200x630) -> public/og/
      ├─ gen-cards.mjs       # IG carousel cards (1080x1080) -> ../social-cards/
      ├─ list-free.mjs, test-key.mjs, test-gemini.mjs
```

## 5. Architecture: everything is data-driven + programmatic
- Add a row to `states.json` / `brands.json` / `explainers.json` → a new page is generated automatically at build (via `getStaticPaths`). Same data feeds OG images and content generation.
- **Pages render gracefully with or without AI content**: if `*-content.json` has an entry for a slug, the page shows the rich narrative; otherwise it falls back to the base summary + auto FAQs. Traditional/tribal drink sections render directly from `states.json` regardless of AI.

## 6. AI content pipeline (`scripts/`)
- `openrouter.mjs` exports `genJSON(messages)` — tries **OpenRouter** free models, then **Gemini** (Google AI Studio) as fallback. Robust JSON parsing + retries.
- Env toggles: `PROVIDER=gemini|openrouter` (force one), `DELAY=<ms>` (pace between calls), `TRIES=<n>` (retry cap), `FORCE=1` (regenerate existing entries; default is incremental = skip existing).
- Generators are **incremental** and **save-as-you-go** (persist after each success — safe against rate limits).
- **Rate-limit reality:** OpenRouter free ≈ 50 requests/day; Gemini free has per-day + per-minute caps. Pace with `DELAY=3000`+ and cap `TRIES=2`. If quota hits, just re-run later — incremental fills the gaps.

## 7. SEO / GEO (why this site exists)
- Per-page unique title/meta/canonical/OG; semantic headings; internal linking; `@astrojs/sitemap`.
- **JSON-LD** on every page: `Article`, `FAQPage`, `DefinedTermSet`, `Organization`, `WebSite` (in `Base.astro` + each page).
- **GEO** (get cited by ChatGPT/Gemini/Perplexity): `public/llms.txt`, AI-crawler-friendly `public/robots.txt`, Q&A/FAQ structure, entity-rich content, direct answers up top.
- **Programmatic long-tail**: per-state/brand/explainer pages target searches like "liquor prices in Karnataka", "traditional alcohol of Nagaland", "why is alcohol not under GST".
- Branded **OG images** auto-generated per page for rich link previews.

## 8. Common commands (run inside `website/`)
```bash
npm install
npm run dev            # local preview http://localhost:4321
npm run build          # -> dist/ (deploy this)

# content (LLM) — env-tunable
PROVIDER=openrouter DELAY=3000 TRIES=2 npm run gen:all     # states + brands + explainers (incremental)
FORCE=1 npm run gen:states                                 # regenerate all states
npm run models                                             # list currently-free OpenRouter models

# images (no LLM)
npm run gen:images     # OG share images + IG cards
```

## 9. Current status (as of handoff)
- Website builds clean: ~73 pages (36 states + 20 brands + 10 explainers + home/about/glossary/responsible-drinking + indexes).
- **AI narrative coverage was being completed** via OpenRouter when this doc was written (explainers 10/10; brands ~12–20; states ~24–36). **To finish/refresh: run** `PROVIDER=openrouter DELAY=3000 TRIES=2 npm run gen:all` (or with a working `GEMINI_API_KEY`). Incremental = only fills gaps.
- Structured content (summaries, tables, FAQs, glossary, traditional/tribal drink sections) is complete and renders regardless of AI.
- 67 OG images + 8 IG cards generated.
- Not yet done: domain + deploy, verifying real excise numbers (flip `draft:false`), wiring the newsletter form to a provider, analytics.

## 10. Roadmap / good next tasks
1. **Deploy**: push `website/` to GitHub → Cloudflare Pages/Vercel (Astro preset). Update `site:` in `astro.config.mjs` and URLs in `llms.txt`/`robots.txt` to the real domain. Add Google Search Console + submit sitemap. Add free analytics (Cloudflare Web Analytics).
2. **Verify data**: replace `todo`/`estimate`/`[verify]` with sourced numbers from official state excise sites; set `draft:false`.
3. **Scale content**: more brands, per-spirit category pages, more explainers — add rows + run `gen:all`.
4. **Newsletter**: wire `Newsletter.astro` `action` to MailerLite/Buttondown/Beehiiv free tier.
5. **Animation studio (optional, high-novelty)**: build recordable kinetic-typography reel templates (HTML/CSS/JS you screen-record); the `pretextjs` library helps keep text-heavy motion smooth. Output for Instagram.
6. Keep IG content flowing from `04_CONTENT_CALENDAR.md` (hooks already written on viral-hook mechanics).

## 11. Brand tokens (for any new UI/images)
Ink `#0E0E10` · Surface `#1A1A1E` · Amber `#E0A73C` · Bottle green `#1F6B4E` · Cream `#F4EAD5` · Stone `#9A968E`. Headlines: Space Grotesk. Body: Inter. ₹ needs a fallback font (Noto Sans latin-ext) in Satori — already handled in `lib-og.mjs`.

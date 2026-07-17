# Tools — free and cheap, ranked by what they'd actually do for us

Not a generic list. Everything here is picked against our real situation: no budget, no price
data, 688 impressions, ranking well but not getting clicked.

---

## Tier 1 — install this week, all free

### Microsoft Clarity — *the biggest gap in our stack*
**Free forever. No traffic limits. No credit card.** → [clarity.microsoft.com](https://clarity.microsoft.com)

Heatmaps + **session recordings** — you watch real people use the site. GA4 tells you *that*
someone bounced; Clarity shows you *why*.

For us specifically: our pages are long explainers. **We have no idea if anyone scrolls past the
intro.** Clarity's scroll heatmaps answer that in a day. It also has a "rage click" report, which
would instantly surface if the FAQ `<details>` toggles aren't obvious enough to tap on mobile —
and every one of our clicks so far is mobile.

One script tag. I can add it in two minutes if you want.

### Bing Webmaster Tools — *free, and it feeds ChatGPT*
→ [bing.com/webmasters](https://www.bing.com/webmasters)

Worth it for one non-obvious reason: **ChatGPT's search is built on Bing's index.** We've done a
lot of GEO work (llms.txt, FAQPage schema, robots.txt welcoming AI crawlers). If we're not in
Bing's index, ChatGPT can't cite us — and that's a channel we've explicitly optimised for.

It also imports your GSC data in one click, gives keyword data Google withholds, and its site
audit is free.

### Ahrefs Webmaster Tools (AWT) — *the paid tool you get free*
→ [ahrefs.com/webmaster-tools](https://ahrefs.com/webmaster-tools)

Free for sites you verify ownership of. Gives **backlink data and a full site audit** — normally
$99/mo. We currently have no idea who links to us (probably nobody, which is itself the finding).
Backlinks are the one ranking factor our content work can't fake.

### IndexNow via Cloudflare — *one click, we're already on Cloudflare*
Cloudflare dashboard → your site → **Caching → Configuration → Crawler Hints (IndexNow)**. Toggle on.

Instantly pings Bing/Yandex when pages change instead of waiting for a crawl. **We just rewrote 11
titles and added a new page** — this is exactly the moment it pays. Google doesn't use IndexNow,
so still do the manual GSC re-index requests.

### Cloudflare Web Analytics — free, no cookie banner
Already on Cloudflare. Privacy-first, no consent popup needed, doesn't get ad-blocked like GA4
(which is likely under-counting us right now — our audience is exactly the ad-blocking demographic).

---

## Tier 1 — free data sources (this is where the site gets its teeth)

| Source | Why it matters | Link |
|---|---|---|
| **RBI, "State Finances: A Study of Budgets"** | **The single highest-value free document for this project.** State excise revenue for every state, one table, citable, authoritative. Start here | [rbi.org.in](https://www.rbi.org.in) → Publications |
| **NFHS-5** | Alcohol-use prevalence by state, sex, education. Free, official, and **almost no drinks blog cites it** | [rchiips.org/nfhs](http://rchiips.org/nfhs/) |
| **data.gov.in** | Government open data; some excise and consumption datasets | [data.gov.in](https://data.gov.in) |
| **State excise department sites** | The primary source for rates and price lists. Tedious, unglamorous, and exactly why nobody else has this | varies by state |
| **Wayback Machine** | **States delete old excise policies.** Wayback has them. This is how you build a *time series* of rates — genuinely nobody else in India has that | [web.archive.org](https://web.archive.org) |

**The Wayback point is worth dwelling on.** Anyone can report this year's excise rate. A chart of
Maharashtra's duty from 2015→2026, rebuilt from archived PDFs, is a genuinely original asset that
would earn links and take a competitor months to replicate.

---

## Tier 2 — free, use while researching

| Tool | Use |
|---|---|
| **Google Trends** | Seasonality. Is `tasmac liquor price` spiking (new price list?) or flat? Free content timing signal |
| **AlsoAsked** | Visualises People Also Ask trees. 3 free searches/day. Feeds FAQ copy directly — our highest-leverage on-page element |
| **AnswerThePublic** | Question mining. 3 free/day |
| **Rich Results Test** | Verify our FAQPage schema actually parses → [search.google.com/test/rich-results](https://search.google.com/test/rich-results) |
| **PageSpeed Insights** | We're a static site on Cloudflare — should score near 100. Worth confirming; mobile is 100% of our clicks |
| **Screaming Frog** | 500 URLs free. We have 77. Full crawl for broken links, missing meta, orphan pages |
| **Perplexity (free tier)** | Quick fact-checks with citations. You have Pro — use Deep Research for [RESEARCH_PLAN.md](RESEARCH_PLAN.md) |

---

## Tier 3 — worth paying for, only if

| Tool | Cost | Verdict |
|---|---|---|
| **Ahrefs / Semrush full** | ₹8,000+/mo | **No.** Blows the whole ₹5,000 budget. AWT free tier covers us |
| **Canva Pro** | ~₹500/mo | **Maybe.** Only for Brand Kit + background remover. Free tier is fine for our template |
| **Statista personal** | ~₹5,000/mo | **Absolutely not — you have it free via XLRI.** Use the library |
| **A .in domain** | ₹99–700/yr | Budgeted. `.space` works but `.in` signals India to both users and Google |

---

## For the crowdsourced price map (later — not now)

Recording this so it's not re-litigated when we build it:

- **Maps: use Leaflet + OpenStreetMap, not Google Maps.** Free, no API key, no billing account, no
  surprise bill. Google Maps needs a credit card and bills per load — genuinely dangerous for a
  student project that might get a traffic spike.
- **Geocoding: Nominatim** (OSM, free, rate-limited) or **Photon**. Fine at our scale.
- **Supabase already has PostGIS** — we can do proper "stores near me" radius queries natively. No
  extra service needed.
- **Store data seed: OpenStreetMap already has thousands of Indian liquor shops tagged**
  `shop=alcohol`. Query via Overpass API, free. **That solves the cold-start problem** — the map
  isn't empty on day one, which is the thing that kills crowdsourced products.

That last point is the real unlock. A crowdsourced map with no data is dead on arrival; OSM gives
us a pre-populated base layer and users just add prices.

---

## What I'd actually do, in order

1. **Microsoft Clarity** — 2 min. We're flying blind on whether anyone reads these pages.
2. **Bing Webmaster Tools** — 5 min. Our whole GEO strategy depends on being in ChatGPT's index.
3. **IndexNow toggle in Cloudflare** — 1 min. We just changed 11 titles.
4. **Download the RBI State Finances PDF** — 5 min. It's the backbone of [RESEARCH_PLAN.md](RESEARCH_PLAN.md).
5. **Ahrefs Webmaster Tools** — 10 min. Find out if anyone links to us at all.

Total: ~25 minutes, ₹0, and it fixes the three things we currently can't see — reader behaviour,
AI-index presence, and backlinks.

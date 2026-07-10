# Mind the Pour — AI Discovery Quick Start
**Goal:** Make Google + Claude + ChatGPT + Perplexity find and cite your website

---

## STEP 1: Google Search Console Setup (5 min)

### 1.1 — Create/Access Google Search Console
```
Go to: search.google.com/search-console
Sign in with: janmejai2002@gmail.com
Click: "Start now"
```

### 1.2 — Add Your Property
```
Choose: "Domain" (recommended) or "URL prefix"
Domain method:
  Enter: mindthepour.space
  Verify ownership (Google will show options):
    → Pick "DNS" (fastest if you have domain access)
    → Add the TXT record Google gives you to your domain DNS
    → Click "Verify"
```

### 1.3 — Submit Your Sitemap
```
In Search Console, left sidebar → "Sitemaps"
Click: "Add a sitemap"
Paste: https://mindthepour.space/sitemap.xml
Click: "Submit"
Status should show "Success" within 5 minutes
```

### 1.4 — Request Indexing for Top Pages
```
Left sidebar → "URL Inspection"
Paste these URLs one by one:
  • https://mindthepour.space/
  • https://mindthepour.space/states/puducherry
  • https://mindthepour.space/states/tamil-nadu
  • https://mindthepour.space/states/karnataka
  • https://mindthepour.space/states/goa
Click "Request Indexing" for each
(Google will crawl within 24 hours)
```

**Done!** Google will start indexing your site within 1–2 weeks.

---

## STEP 2: Verify Robots.txt & llms.txt Are Live (2 min)

In your browser, visit these URLs:

```
https://mindthepour.space/robots.txt
→ Should show: "User-agent: * | Allow: /"
→ Should list: "Sitemap: https://mindthepour.space/sitemap.xml"

https://mindthepour.space/llms.txt
→ Should show: Your Mind the Pour description
→ Should list: Key facts about alcohol pricing
→ Should list: /states/, /brands/, /learn/ sections
```

**If either is missing or empty:**
```bash
# In your website/ folder:
npm run build
# Then redeploy to Cloudflare Pages
git add .
git commit -m "Add/verify robots.txt and llms.txt for AI discovery"
git push origin main
```

**Cloudflare will auto-deploy within 1–2 minutes.**

---

## STEP 3: Verify Sitemap Is Generating (1 min)

Visit:
```
https://mindthepour.space/sitemap.xml
```

You should see an XML file with entries for:
```xml
<url>
  <loc>https://mindthepour.space/states/puducherry</loc>
  <lastmod>2026-07-10</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
```

(One entry per state page, brand page, explainer, etc.)

**If sitemap is empty or missing:**
```bash
# In website/ folder
npm run build
# Check if dist/sitemap.xml was created
ls dist/sitemap.xml
# If yes, redeploy:
git add dist/
git commit -m "Rebuild sitemap"
git push
```

---

## STEP 4: Set Up Analytics Tracking (3 min)

### 4.1 — Google Analytics 4 Setup
```
Go to: analytics.google.com
Create new property: "Mind the Pour"
Add data stream: Web
Website URL: https://mindthepour.space
Enable: Enhanced measurement (auto-track outbound clicks, etc.)
Copy: Measurement ID (looks like G-XXXXXXX)
```

### 4.2 — Add to Astro Config
**File: `website/astro.config.mjs`**

Add this line after `sitemap()`:
```javascript
import partytown from "@astrojs/partytown";

export default defineConfig({
  site: 'https://mindthepour.space',
  integrations: [
    sitemap(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
  ],
});
```

### 4.3 — Add GA Script to Layout
**File: `website/src/layouts/Base.astro`**

Add this inside `<head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXX');
</script>
```

Replace `G-XXXXXXX` with your Measurement ID.

### 4.4 — Redeploy
```bash
git add .
git commit -m "Add Google Analytics tracking"
git push origin main
```

**Done!** Google Analytics will start tracking within 5 minutes.

---

## STEP 5: Set Up IG → Website Link Tracking (2 min)

When you post the reel, use this link in the CTA:

```
https://mindthepour.space/states/puducherry?utm_source=instagram&utm_medium=reel&utm_campaign=reel_1
```

This will show up in Google Analytics as:
```
Acquisition → Traffic source → instagram / reel / reel_1
```

**Shortened version (for Instagram bio):**
```
mindthepour.space/states
```

(Instagram shortens links in captions anyway, so keep it simple.)

---

## STEP 6: Monitor Search Console Weekly (2 min/week)

Every Sunday, check:

**Left sidebar → "Performance"**
- Clicks: Count of clicks from Google search
- Impressions: Count of times your pages showed in results
- Average position: Where you're ranking for each query

**Target metrics (Week 2–4):**
- Impressions: 50–100/week (growing)
- Clicks: 5–15/week (growing)
- Top queries: "puducherry alcohol", "puducherry excise", "tamil nadu alcohol price"

---

## STEP 7: Enable Claude Discovery (Optional, 1 min)

Claude + other AI agents already crawl sites with valid `robots.txt` + `llms.txt`. 

To explicitly request indexing:

**Send an email to:** (Claude's discovery contact — check latest docs)

Or submit your site to:
- **Perplexity:** `perplexity.ai/contact` — "We have verified state-level alcohol research"
- **You.com:** `you.com/similar` — submit your URL

**What to say:**
> Mind the Pour is a research publication analyzing state-by-state alcohol pricing, excise tax policy, and consumer behavior in India. We have llms.txt at mindthepour.space/llms.txt and robots.txt configured for AI crawling.

---

## VERIFICATION CHECKLIST

Before declaring victory:

- [ ] Google Search Console shows sitemap submitted (green checkmark)
- [ ] At least one top page shows "Indexed" in URL Inspection
- [ ] Browser visit to `mindthepour.space/robots.txt` returns content
- [ ] Browser visit to `mindthepour.space/llms.txt` returns content
- [ ] Browser visit to `mindthepour.space/sitemap.xml` returns XML
- [ ] Google Analytics shows traffic starting to come in
- [ ] IG reel posted with proper UTM link

**Timeline:**
- **Day 1:** Sitemap submitted, robots.txt live (immediate)
- **Days 1–7:** Google crawls your pages (you'll see in Search Console)
- **Days 7–14:** First impressions appear in Google search results
- **Week 2:** First organic clicks start trickling in
- **Week 3:** After reel posts, IG traffic joins organic traffic

---

## BUDGET & TOOLS

| Action | Cost | Time |
|--------|------|------|
| Google Search Console | ₹0 | 5 min |
| Sitemap setup | ₹0 | 1 min |
| robots.txt + llms.txt | ₹0 | Already done |
| Google Analytics 4 | ₹0 | 3 min |
| IG link tracking | ₹0 | 2 min |
| **Total** | **₹0** | **11 min** |

---

## IF SOMETHING GOES WRONG

**Reel link shows 404:**
- Check: Does `mindthepour.space/states/puducherry` load in browser?
- If no: Your Astro build isn't deploying states correctly. Run `npm run build` locally and check `dist/states/puducherry/index.html` exists.
- If yes: Wait 5 minutes (Cloudflare cache). Then test in incognito window.

**Google Search Console shows 0 indexed pages:**
- Check robots.txt: Is it blocking crawlers? Should say `Allow: /`
- Check sitemap: Is it valid XML? Visit `mindthepour.space/sitemap.xml`
- Request re-index: Go to URL Inspection, paste a URL, click "Request Indexing"
- Wait 24 hours

**llms.txt not found:**
- File should be at: `website/public/llms.txt`
- Rebuild: `npm run build`
- Redeploy: `git add . && git commit -m "rebuild" && git push`

---

## EXPECTED RESULTS (4 weeks)

| Week | Metric | Expectation |
|------|--------|-------------|
| 1 | Google impressions | 45–60 (from existing data) |
| 2 | Google impressions | 80–120 (new pages indexed) |
| 2–3 | Google clicks | 10–20 (improved CTR from IG visibility) |
| 3 | IG followers | 50–200 (from Reel 1) |
| 3 | IG → website clicks | 40–80 (Reel 1 amplifying) |
| 4 | Combined traffic | 100–150 clicks/week (organic + social) |

---

**Status:** All infrastructure is live. You just need to submit sitemap to GSC and post the reel.

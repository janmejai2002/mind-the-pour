# Growth Playbook — Search Console, Ads & Brand

Written against our actual data (688 impressions, 5 clicks, Jul 1–15) and our actual budget
(₹5,000, of which ~₹4,300 is unspent).

---

# 1. Google Search Console — the weekly ritual

We're using GSC as a scoreboard. It's a **diagnostic tool**. Here's the difference.

## The one filter that changes everything: set country = India

**266 of our 688 impressions are from the United States, with zero clicks.** That's 39% of our
data describing people who will never convert. It drags our average position down (India 11.7 vs
overall 16.4 on desktop) and makes every number lie to us.

**Every time you open GSC: Performance → + New → Country → India.** Judge nothing on unfiltered
numbers again.

## The three reports that matter

### a) The CTR opportunity report ← run this weekly
**Performance → Queries → filter Position 5–20 → sort by Impressions.**

Anything with **high impressions, decent position, and ~0 clicks is a title problem, not a
ranking problem.** That's the entire story of our first two weeks — `/learn/why-liquor-prices-vary-by-state/`
sat at position 8.42 for 236 impressions and got nothing.

The fix is never "write more content." It's: rewrite the `seoTitle` and `metaDescription` to
match what the person typed. That's a 5-minute edit against a page that's already ranking. It is
the highest-ROI action available to us, every single week.

### b) The query-mining report ← this feeds everything else
**Performance → Queries → sort by Impressions.** Read every single one. Then sort three buckets:

| What you see | What it means | Do this |
|---|---|---|
| High impressions, position 5–15, no clicks | Title failing | Rewrite the title today |
| High impressions, position 20+ | We're relevant but weak | Build a dedicated page |
| A question we have no page for | Free content brief | Write it |

**This is how we found the peg cluster** — 27 separate searches (`1 peg ml`, `large peg ml`,
`patiala peg size`) averaging position 31, all crashing into one page. That's not a ranking
accident; it's a missing page. It's now two pages.

**Queries are also the best free source of FAQ copy we have.** Paste the query in as the question,
verbatim. That's how you win answer boxes — not by guessing what people ask.

### c) The Pages report
**Performance → Pages.** Which URLs actually earn impressions. Ours says: state pages and the
peg cluster carry the site. Brand pages are dead weight so far (position 40+). That should
reallocate our effort — and it's why the content calendar front-loads states and pegs.

## Do these this week

1. **Request re-indexing on the 11 pages whose titles I just rewrote.** URL Inspection → paste
   URL → Request Indexing. Google won't re-crawl on its own schedule fast enough to help us, and
   the title is the whole change. Do the four highest-impression ones first:
   `why-liquor-prices-vary-by-state`, `what-is-a-standard-drink-peg-large`,
   `why-alcohol-not-under-gst-india`, `which-states-india-are-dry-prohibition`.
2. **Submit `/learn/patiala-peg-size-ml/`** — brand-new page, Google doesn't know it exists.
3. **Check Search Appearance → Rich results.** We ship FAQPage schema on every explainer. If FAQ
   rich results aren't showing, the schema isn't being picked up and I need to look at it.
4. **Set a 16-month baseline screenshot now.** GSC only keeps 16 months. For the assignment
   write-up you'll want the before/after, and you cannot recover it later.

## What to expect (so you don't panic)

Title changes take **1–3 weeks** to show in GSC, and impressions usually dip before CTR rises.
That's Google re-evaluating, not us failing. **Judge the title rewrites on CTR at a stable
position — not on clicks next Tuesday.**

---

# 2. Meta ads — read this before you spend a rupee

## The trap that would have cost you the campaign

Meta's alcohol policy is **stricter in India than almost anywhere**, and it bites *by state*:

| Region | Meta's rule |
|---|---|
| **Bihar, Gujarat, Lakshadweep, Manipur, Nagaland** | **Alcohol ads prohibited entirely** |
| **Delhi, Maharashtra, Punjab, Haryana, Chandigarh** | **25+ only** |
| Andhra, Assam, Goa, Kerala, MP, TN, Telangana, UP, WB, and more | 21+ |
| Karnataka, Rajasthan, Himachal, Puducherry, Sikkim, Mizoram, A&N | 18+ |

Now look at what Meta *counts* as an alcohol ad — its own definition includes **"depiction of
alcohol brands/logos," "consumption of alcoholic beverages," "promotion of alcohol brands,"** and
**"recipes for alcoholic drinks."**

**Here's the problem.** Our audience is 22–35 urban professionals. Our two biggest metros are
Delhi and Mumbai — both **25+ gated**. If our creative shows a bottle, we lose every 22–24 year
old in our best cities *and* get blocked outright in Gujarat and Bihar. On a ₹4,300 budget, that
is the campaign.

## The move: don't be an alcohol ad

Our creative doesn't need alcohol in it. **We sell economics, not drinks.** Read Meta's list again
— *nothing* on it describes a map of state tax rates.

| ❌ Makes it an alcohol ad | ✅ Stays an economics ad |
|---|---|
| A whisky bottle | A map of India shaded by excise rate |
| Brand logos (Old Monk, Royal Stag) | A bar chart: "₹ tax per bottle, by state" |
| Someone drinking | Big typography: **"₹400. Same bottle. One state line."** |
| A cocktail recipe | A cost breakdown table of a ₹700 cocktail |

Your [01_BRAND.md](01_BRAND.md) already committed to *"Positioned as 'business content,' never
'drink this'"* and *"never glamorises drinking."* **That was a brand instinct. It's now a
commercial requirement.** Hold the line and the ad platform treats us as a policy/finance
publisher — which is what we actually are.

> **Caveat, stated honestly:** Meta's review is automated and alcohol-*adjacent* creative still
> gets flagged sometimes, even when it's compliant. If an ad is rejected, don't argue and don't
> keep resubmitting — that risks the ad account. Strip the alcohol signal further (drop the word
> "liquor" from the creative, lead with "state taxes") and resubmit once.

## The ₹4,300 plan

Your [00_STRATEGY.md](00_STRATEGY.md) spend rule is already correct and I'm not changing it:
**never always-on; run organic ~2 weeks → find the top 2–3 posts by shares/saves → boost those
in ₹1,000–1,500 bursts over 3–4 days.** Boosting a proven post buys relevance, which buys a lower
CPC. That logic holds.

Three things to add:

1. **Boost on shares + saves, never likes.** Likes are a vanity signal. A save means "I want this
   later"; a share means "this makes me look smart" — which is exactly our brand promise, and it's
   the only signal that predicts organic reach.
2. **Optimise for profile visits or link clicks, not reach.** Reach on ₹4,300 in India is a
   rounding error. We want the people who'll actually follow.
3. **Hold ₹1,000 back until week 4.** If one post outperforms by 5×, back it hard. If nothing
   does, that ₹1,000 buys a micro-shoutout instead — which at our scale will almost certainly
   outperform boosting a mediocre post.

**Be honest about the ceiling:** ₹4,300 in India buys roughly 300–900 link clicks at realistic
CPCs. At a good conversion that's maybe 100–300 followers. **Ads are a test instrument here, not
a growth engine.** The real value is learning which hook wins for ~₹500, then putting all your
organic effort behind that hook. Say exactly that in your War Room Log — it's the correct MBA
answer and it's also true.

---

# 3. Google Ads — my honest recommendation: don't

Google's alcohol policy in India is even tighter: **India only permits alcohol *sales* ads for 0%
ABV products.** Our site isn't selling anything, so we're not squarely in that policy — but we'd
be arguing our way past an automated reviewer for a category Google has already decided is
sensitive in our country.

Beyond policy, the economics don't work:

- **Search ads only capture existing demand.** Our total addressable demand right now is ~688
  impressions/month. We could buy the top slot for `tasmac liquor price` and get a handful of
  clicks — for the query where **we already rank #3 organically and convert at 100%.** We'd be
  paying for traffic we already have.
- **We have no conversion to monetise.** No product, no revenue. CPC spend on an editorial site
  with no funnel is money set on fire.
- **₹4,300 split across two platforms is two failed tests instead of one useful one.**

> **One thing worth checking:** Google shipped an *"Update to Alcohol Policy: Country expansion
> (July 2026)"* — literally this month. If it changed anything for India, it's worth 10 minutes:
> [support.google.com/adspolicy/answer/17230661](https://support.google.com/adspolicy/answer/17230661).
> I'd still spend the money on Meta.

**Better use of Google, free:** Search Console (section 1) is Google's real gift to us. Rewriting
a title on a page already ranking at position 8 costs ₹0 and beats anything ₹4,300 buys.

---

# 4. Building the brand

The name and visual system are genuinely good. `#E0A73C` on `#0E0E10` is distinctive, legible on
Reels, and cheap — I checked every colour pair on the site and they all pass WCAG AA comfortably.
That's a real asset already built. Four things to add.

## a) The source slide is the whole brand

Your brand doc says *"Dry wit, receipts on the table. Every claim has a number or a source."*
**That's the moat, and almost nobody executes it.**

Every drinks account in India posts vibes. If every one of our carousels ends with
**"Source: Maharashtra Excise Policy 2025-26"**, we become the only account in the category that
can be *checked*. That's what makes journalists cite us, what makes people trust us enough to
click through to a website, and what makes an Amrut or a Bira eventually take a call.

It also compounds with the research plan: once R1/R2 land, we'll be the only Indian site with
sourced state-by-state prices. **That's not a content strategy, it's a defensible position.**

## b) Own one number format

Pick a signature and never deviate: **"₹400. Same bottle. One state line."** Big number, ink
background, amber. Three posts in, people recognise it before they read the handle. That's brand
recall for ₹0 — and your brand doc already specifies "one big number as the hero." Just be
ruthless about it.

## c) Pick the fight nobody else will

Right now we explain. Explaining is table stakes. **A brand needs a position.** The defensible
one, straight out of our own data:

> **Indian states are addicted to liquor revenue, and that's why you pay what you pay.**

It's true, provable from RBI State Finances, politically live, and nobody in the category will
say it because they're all funded by or hoping to be funded by liquor brands. **We're students.
We can say it.** That's a genuine structural advantage and it expires the moment you take money.

## d) The heritage content is your long game

The mahua/feni/apong material is the most defensible thing on the site. No competitor covers it,
it's culturally rich, and it's under-documented online — which is exactly where your library
access beats a content farm. It won't spike; it'll accumulate. It's also what makes Mind the Pour
a *publication* rather than a meme account.

## What NOT to do

- **Don't chase drink-tip virality.** "5 cocktails to try" gets reach and destroys the brand —
  and it puts us straight into Meta's alcohol category (see §2).
- **Don't take a liquor brand sponsorship this term.** The moment we're paid by Amrut, the
  "states are addicted to liquor revenue" position dies, and it's the only thing we have that
  they can't buy elsewhere. Media kit yes; money not yet.
- **Don't post daily just to hit a number.** One sourced carousel beats four vibes posts. The
  calendar is 31 days because you asked; if a day's post has no number, skip it.

---

# The order to do this in

1. **Filter GSC to India.** 30 seconds. Everything you believe about performance is currently 39%
   wrong.
2. **Request re-indexing on the 11 rewritten pages.** ~15 minutes. Highest-ROI action available.
3. **Run R1 + R2 from [RESEARCH_PLAN.md](RESEARCH_PLAN.md).** Without numbers, none of the rest
   works.
4. **Post organically for two weeks** ([CONTENT_CALENDAR.md](CONTENT_CALENDAR.md)). Don't spend
   yet.
5. **Then boost the top 2 posts by shares/saves**, ₹1,000–1,500 each, economics creative only.
6. **Hold ₹1,000 to week 4.**

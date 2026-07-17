# Mind the Pour — Research Plan

**The problem this solves:** the site has no numbers. Every state is `"priceTier": "High"` with
`legal_drinking_age: "todo"`, `source_url: "todo"`, `status: "estimate"`. The tagline promises
"the business, **pricing** & culture behind every drink in India" and there isn't one rupee figure
in the dataset.

That single gap explains our Search Console results. Our best-converting query was
`tasmac liquor price` (position 3, 100% CTR). We also show up for `pondicherry liquor price list`
and `telangana liquor price 2026`. **People want actual prices. We don't have any.** Everything
below is aimed at fixing that first, then building the authority layer on top.

**Priority order is deliberate.** R1 and R2 are worth more than R3–R8 combined. Do them first.

---

## How to use each tool

| Tool | Best at | Use it for |
|---|---|---|
| **Perplexity Pro Deep Research** | Current, cited, web-wide facts | Excise notifications, price lists, news. **Best for R1/R2.** Always demand source URLs |
| **Gemini Pro Deep Research** | Long synthesis across many sources | The narrative reports (R3–R8) — it writes a structured brief |
| **NotebookLM** | Grounded Q&A over *your* sources | The permanent repository. Only feed it primary PDFs, not blog posts |
| **XLRI institutional access** | Paid data nobody else can cite | Euromonitor/Statista market data. **This is our unfair advantage** |

**The NotebookLM discipline that matters:** NotebookLM only answers from what you feed it. Feed it
blogs, it launders blog-quality claims into confident-sounding answers. **Feed it only primary
sources** — state excise policy PDFs, RBI State Finances, ASCI orders, court judgments. Then it
becomes a genuinely citable research base.

---

# TIER 1 — Fills the core data gap. Do these first.

## R1. State excise duty & price structure (36 states/UTs)

**This is the single most valuable report.** It turns `"priceTier": "High"` into real numbers with
sources, which unlocks every state page, the price map, and a lot of Instagram content.

**Feeds:** all 36 `/states/*` pages · `/learn/why-liquor-prices-vary-by-state/` (236 impressions,
position 8.4, **0 clicks**) · `/learn/why-alcohol-not-under-gst-india/`

**Targets:** `gst on liquor in maharashtra` · `alcohol tax in tamil nadu` · `excise duty on liquor in delhi` · `why alcohol is expensive in maharashtra`

### Perplexity Deep Research prompt

```
For each of these Indian states — Maharashtra, Karnataka, Tamil Nadu, Delhi, Goa,
Puducherry, Telangana, Kerala, Uttar Pradesh, West Bengal, Rajasthan, Haryana,
Punjab, Andhra Pradesh, Madhya Pradesh — find, for FY 2025-26:

1. The excise duty structure on IMFL (slab basis: per bulk litre / per proof litre /
   ad valorem %). Give the actual rates.
2. Any additional levies: VAT on liquor, licence fee, privilege fee, gallonage fee,
   special/COVID cess if still in force.
3. The retail model (private / state monopoly / corporation) and the name of the
   state corporation if any.
4. Total excise revenue from alcohol in FY 2024-25 (₹ crore) and what % of the
   state's own tax revenue that is.
5. The legal drinking age.
6. The state's official excise department website and the URL of the most recent
   excise policy or rate notification.

RULES:
- Cite an official state excise department, gazette notification, or RBI/CAG
  document for every number. No blogs, no news aggregators, no Wikipedia.
- Where a number is contested or dated, say so and give the year of the figure.
- If you cannot find an official source for a state, say "NOT FOUND" for that
  field. Do not estimate. Do not interpolate.
- Output as a markdown table, one row per state, plus a numbered source list
  with full URLs.
```

### XLRI lookups

```
📚 LOOKUP REQUEST
━━━━━━━━━━━━━━━━
Platform: EMIS (ISI Emerging Markets)
Search query: India alcoholic beverages industry report state excise
What I need: The industry report section covering state-wise excise duty structure
             and any table of comparative state tax rates on IMFL
Why: Gives us a citable secondary source for the state-by-state tax comparison —
     the backbone of all 36 state pages and our worst-performing page
Format needed: Download the PDF; screenshot any state-comparison table
Fallback: Euromonitor Passport → "Spirits in India" → Market Context / Taxation
```

```
📚 LOOKUP REQUEST
━━━━━━━━━━━━━━━━
Platform: Statista
Search query: alcohol excise revenue India state
What I need: Any chart of state-wise excise revenue (₹ crore), most recent year
Why: The "states are addicted to liquor revenue" angle needs a hard number per
     state — this is also the most screenshot-able Instagram carousel we can make
Format needed: Screenshot the chart + note the underlying source and year
Fallback: RBI "State Finances: A Study of Budgets" (free) → State Excise table
```

### NotebookLM sources to collect
- Each state's excise policy PDF for FY 2025-26 (from the official excise department site)
- **RBI, "State Finances: A Study of Budgets"** — free, authoritative, has state excise revenue
  for every state in one table. *Start here — it's the single highest-value free document.*
- CAG audit reports on state excise for any state you can find

---

## R2. Real price lists — TASMAC, Puducherry, Telangana, Delhi, Karnataka

**Our highest-intent, best-converting queries and we serve none of them.** `tasmac liquor price`
was our only 100% CTR query. This report is what makes `/states/*` pages actually rank for
money terms — and it's the seed data for the crowdsourced price map later.

**Feeds:** `/states/tamil-nadu/` · `/states/puducherry/` (117 impressions) · `/states/telangana/`
(35 impr, 2 clicks) · a future `/prices/` hub

**Targets:** `tasmac liquor price` · `pondicherry liquor price list` · `puducherry liquor price list 2026` · `telangana liquor price 2026` · `pondicherry excise liquor price`

### Perplexity Deep Research prompt

```
Find the current official retail price lists for alcohol in these Indian states:
Tamil Nadu (TASMAC), Puducherry, Telangana (TGBCL), Delhi, Karnataka, Goa.

For each state, for these benchmark products, give the current MRP in ₹:
- Old Monk 750ml
- McDowell's No.1 Whisky 750ml
- Royal Stag 750ml
- Blenders Pride 750ml
- Kingfisher Strong beer 650ml
- Officer's Choice 750ml

Also report:
- The official source of the price list (corporation website, excise notification)
  with a direct URL
- The date the list was last revised
- Whether the price is inclusive of all taxes

RULES:
- Prefer the state liquor corporation's own published rate list over any news article.
- Give the exact date of the price list. Prices change with each excise year — a
  2023 list is worthless to us.
- If a product is not sold in a state, write "NOT SOLD".
- If you cannot find an official list, say so explicitly and name the best
  unofficial source separately, clearly flagged as unofficial.
- Output one markdown table per state + a source list with URLs and dates.
```

**Why these six products:** they're national, span the price ladder from Old Monk to Blenders
Pride, and appear in nearly every state's list. That makes them a genuine like-for-like index —
"the same bottle, six states" is the entire premise of the site, finally with numbers.

> **Verify before publishing.** Liquor prices are exactly the kind of thing an LLM will
> confidently invent. Every number goes on the site only with a source URL and a date. Anything
> unsourced stays `status: estimate` and gets labelled as such on the page.

---

# TIER 2 — Authority and differentiation

## R3. Bar economics & pour cost in India

**Feeds:** `/learn/how-bars-price-cocktails-pour-cost/` (currently position **67** — we're nowhere)
**Targets:** `pour cost` (pos 85) · `how to price liquor for a bar` · `how much is a cocktail`

### Gemini Deep Research prompt
```
Research how bars and restaurants in India price alcoholic drinks. Cover:

1. Pour cost — definition, how it's calculated, typical target percentages in
   Indian bars vs US/UK bars, and why they differ.
2. A full cost breakdown of a ₹700 cocktail in a metro Indian bar: liquor cost,
   mixers, garnish, ice, labour, rent, licence amortisation, wastage, GST, margin.
   Give realistic ₹ figures for a Tier-1 Indian city.
3. What an annual bar licence (L-1/L-2/FL-3 or state equivalent) actually costs in
   Mumbai, Delhi, Bangalore and Goa. Cite the excise policy.
4. Why bars in Bangalore/Mumbai charge more than Goa for an identical cocktail —
   separate the tax component from the rent component.
5. Standard pour sizes used in Indian bars and whether 30/60ml is regulated or
   convention.

Prioritise Indian sources: excise policies, NRAI reports, trade press
(Hotelier India, BarMag, Restaurant India), interviews with operators.
Give ₹ figures wherever possible and flag any that are estimates.
Output as a structured brief with a full source list.
```

### XLRI lookup
```
📚 LOOKUP REQUEST
━━━━━━━━━━━━━━━━
Platform: EBSCO (Business Source Elite)
Search query: restaurant beverage pricing pour cost margin
What I need: 2-3 practitioner articles on beverage cost control methodology
Why: Lets us explain pour cost with a citable framework instead of blog folklore —
     this page is at position 67, meaning our current version is worthless
Format needed: PDF download
Fallback: Emerald → "beverage cost management hospitality"
```

---

## R4. Premiumization & the Indian single malt boom

**This is the report that makes us look serious.** Euromonitor/Statista data here is stuff no
competing blog can cite — it's our institutional-access moat.

**Feeds:** `/learn/premiumization-indian-alcohol-market/` · all `/brands/*` pages
**Targets:** `indian alcohol brands` · `diageo india brands` · `alcobev industry india` · `imfl india`

### XLRI lookups — do these before any prompting
```
📚 LOOKUP REQUEST
━━━━━━━━━━━━━━━━
Platform: Euromonitor Passport
Search query: Spirits in India
What I need: (a) market size by value & volume 2020-2025 + forecast to 2030,
             (b) the premium/standard/economy value split and how it has shifted,
             (c) company & brand shares (Diageo/USL, Pernod Ricard, Allied Blenders, Radico)
Why: This is the spine of the whole premiumization story AND every brand page.
     No competing site can cite Euromonitor — this is our unfair advantage.
Format needed: Export the report PDF + screenshot the market-share and
               price-tier-split charts
Fallback: Statista → "spirits India market size"; IWSR press releases (free, partial)
```

```
📚 LOOKUP REQUEST
━━━━━━━━━━━━━━━━
Platform: CMIE Prowess
Search query: United Spirits Ltd / Radico Khaitan / Allied Blenders and Distillers / Tilaknagar
What I need: 5-year revenue, EBITDA margin, and A&P spend as % of revenue
Why: Lets us prove premiumization with margins rather than assert it. "Radico's
     margin went from X to Y as it went premium" is a real finding, not a vibe.
Format needed: Export the P&L comparison table
Fallback: Screener.in (free) or the companies' annual reports
```

### Gemini Deep Research prompt
```
Research the premiumization of India's alcohol market, 2015-2026:

1. Why Indian single malts (Amrut, Paul John, Indri, Rampur, Godawan) emerged and
   how they're positioned vs Scotch. Include the specific international awards that
   changed perception and the year each happened.
2. The economics: what margin does a premium Indian single malt earn vs mass IMFL?
3. Demographic and income drivers — cite Euromonitor/Statista/NSSO if possible.
4. How the 2025 UK-India FTA whisky tariff cut affects domestic premium players.
5. Counter-argument: is premiumization real volume growth or just price inflation
   plus a narrow metro elite? Steelman the sceptical case.

Indian sources preferred. Every claim needs a source. Flag estimates as estimates.
```

**Point 5 matters.** Every other blog writes the breathless version. Steelmanning the sceptical
case is exactly what makes a piece look researched rather than promotional — and it's the kind of
thing your CB/strategy professors will notice.

---

## R5. Prohibition economics — Gujarat, Bihar, Mizoram, Nagaland

**Feeds:** `/learn/which-states-india-are-dry-prohibition/` (17 impr, pos 13.7) · dry state pages

### Gemini Deep Research prompt
```
Research alcohol prohibition in India as an economic and public-policy question:

1. Which states/UTs are currently dry, since when, and under what law.
2. Bihar since 2016: excise revenue forgone (₹ crore/yr), enforcement cost, arrests
   and prison overcrowding, and the hooch/methanol tragedy death toll by year.
3. Gujarat: how the permit system actually works, and estimated size of the illicit
   market.
4. States that reversed prohibition (Kerala 2014-17, Andhra, Haryana, Tamil Nadu
   historically) — why they reversed, with the fiscal numbers.
5. Peer-reviewed evidence on whether prohibition reduces consumption or displaces
   it into illicit channels.
6. The equity angle: who actually gets arrested under prohibition law in Bihar,
   by caste and income. This is well documented — find it.

Sources: state budget documents, CAG reports, NCRB data, court judgments,
peer-reviewed economics/public-health literature. Cite everything.
```

### XLRI lookup
```
📚 LOOKUP REQUEST
━━━━━━━━━━━━━━━━
Platform: JSTOR (fallback: American Economic Association, Oxford University Press)
Search query: prohibition alcohol India policy evaluation
What I need: Peer-reviewed papers evaluating prohibition outcomes, India-specific
             if possible, otherwise US Prohibition as the comparative baseline
Why: Turns an opinion piece into a cited argument. This is the page most likely to
     earn journalist backlinks — prohibition is perennially in the news
Format needed: PDF download
Fallback: Economic & Political Weekly (EPW) via EBSCO — very likely to have this
```

---

## R6. Surrogate advertising & the law

**Feeds:** `/learn/surrogate-advertising-alcohol-india/`
**Angle nobody else has:** actual enforcement outcomes. Everyone lists examples; nobody reports
what happened when ASCI acted.

### Perplexity Deep Research prompt
```
Research surrogate advertising of alcohol in India:

1. The exact legal basis of the ad ban — Cable Television Networks (Regulation)
   Act 1995 Rule 7(2)(viii), plus any IT Rules 2021 provisions and the 2022
   Consumer Protection (Misleading Ads) guidelines. Quote the operative text.
2. The 2022 CCPA guidelines on surrogate advertising — what test do they apply to
   decide if a brand extension is genuine?
3. Specific ASCI rulings against alcohol brands 2020-2026: which brand, which ad,
   what was decided, what happened next.
4. Named surrogate products and whether the "real" product has meaningful sales
   (Royal Stag music CDs, Officer's Choice soda, Kingfisher water, 8PM playing cards,
   Imperial Blue music).
5. Any court cases challenging the ban.
6. What alcohol brands legally CAN do: events, sponsorships, in-store, D2C.

Cite the actual regulation text, ASCI orders and judgments — not news summaries.
```

---

## R7. Traditional & heritage liquor policy

**Feeds:** `/learn/traditional-tribal-alcohol-india/` · `/learn/traditional-drinks-northeast-india/`
· the `traditional` block on state pages

**This is our most defensible content.** No competitor covers it seriously, it's culturally rich,
and it's genuinely under-documented online — which is exactly where a student with library access
can beat a content farm.

### Gemini Deep Research prompt
```
Research India's traditional and tribal alcoholic drinks as both culture and policy:

1. A catalogue: mahua, handia, feni, toddy/kallu, apong, zutho, tongba, chhang,
   kyat, judima, sekmai, rice beers. For each: region, communities, base ingredient,
   method, approximate ABV, ritual/festival role.
2. The colonial excise history — how the 1878 Excise Act criminalised home
   distillation and what that did to Adivasi communities.
3. Heritage liquor policy: Madhya Pradesh legalising mahua (2021-22), Goa's feni GI
   tag, Assam's judima GI. What changed legally and commercially?
4. Which traditional drinks now have GI tags, and their commercial status.
5. The tension: does formalising heritage liquor protect communities or let
   corporates capture their heritage? Find voices on both sides.
6. Health/safety: the methanol risk in unregulated production and what regulation
   would fix.

Prioritise anthropological sources, state heritage-liquor policies, GI registry
filings, and Northeast/Adivasi regional journalism.
```

### XLRI lookup
```
📚 LOOKUP REQUEST
━━━━━━━━━━━━━━━━
Platform: JSTOR (fallback: Taylor & Francis)
Search query: mahua adivasi liquor colonial excise India
What I need: Anthropology/history papers on traditional Indian alcohol and colonial
             excise policy
Why: This is the single most defensible content on the site. Nobody else is citing
     anthropology here — it's where library access beats a content farm outright
Format needed: PDF download
Fallback: EPW via EBSCO; XLRI OPAC for ethnography monographs
```

---

## R8. Who drinks what, and why

**Feeds:** a future `/learn/who-drinks-what-india/` · sharpens all brand pages
**Bonus:** this doubles as Consumer Behaviour course material — same research, two deliverables.

### XLRI lookup
```
📚 LOOKUP REQUEST
━━━━━━━━━━━━━━━━
Platform: Euromonitor Passport
Search query: Consumer Lifestyles in India / Alcoholic Drinks in India
What I need: Consumption by age/income/urban-rural, occasion-based consumption,
             at-home vs on-trade split
Why: Nobody writes about WHO drinks in India using real panel data — it's all
     anecdote. This is a genuine differentiator and it feeds your CB coursework too
Format needed: Report PDF + demographic charts
Fallback: Statista Consumer Insights → India → Alcoholic Beverages; NFHS-5 (free,
          has alcohol-use prevalence by state/sex/education — very citable)
```

**NFHS-5 is free and underused.** It has alcohol-use prevalence by state, sex, and education for
all of India. Almost no drinks blog cites it. Genuinely strong, and it's a public dataset you can
link to directly.

---

# The NotebookLM repository

Build **one notebook per pillar**, not one giant notebook. Retrieval degrades when you mix
unrelated sources.

| Notebook | Feed it |
|---|---|
| **Excise & Pricing** | State excise policies · RBI State Finances · CAG reports · official price lists |
| **Bar Economics** | Licence fee schedules · NRAI reports · pour-cost articles |
| **Market & Premiumization** | Euromonitor/Statista exports · USL/Radico annual reports · IWSR |
| **Law & Advertising** | Cable TV Act · CCPA guidelines · ASCI orders · judgments |
| **Culture & Heritage** | Anthropology PDFs · heritage liquor policies · GI filings |
| **Prohibition** | Bihar/Gujarat budgets · NCRB · public-health papers |

**Rules:** primary sources only — no blogs, no listicles. Name every source with its year
(`TN-excise-policy-2025-26.pdf`, not `document1.pdf`); NotebookLM cites by filename, so a good
name is half the citation. Re-ask every claim you plan to publish: *"What does the source say
about X? Quote it and cite the file."* If it can't quote, don't publish.

---

# What to do first

1. **RBI "State Finances: A Study of Budgets"** — free, one PDF, gives state excise revenue for
   every state. Highest value per minute of anything on this page.
2. **Run R2 (price lists) in Perplexity.** It directly targets our best-converting query.
3. **Run R1 (excise structure) in Perplexity.** It unlocks all 36 state pages.
4. **Book one library session for the Euromonitor "Spirits in India" report** (R4). It's the
   single most valuable thing your XLRI access gives us.
5. Everything else is Tier 2 — good, but only after the site has actual numbers in it.

**Then tell me when the data lands** and I'll restructure `states.json` to hold real figures with
per-field source URLs, add sourced-vs-estimate labelling on the pages, and build the comparison
charts. Right now there's nothing to chart — that's the whole problem.

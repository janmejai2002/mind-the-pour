# Mind the Pour — Research Corpus & Accuracy Workflow

> Rule: **every number gets a source.** Wrong data on a public page kills credibility (and the grade). This file is the truth layer feeding both Reels and website pages.

## Workflow (use your Gemini Pro + NotebookLM)
1. **Collect** sources below into a **NotebookLM notebook** ("Mind the Pour — India Alcohol").
2. Ask NotebookLM grounded questions → it answers **only from your sources** (no hallucination) with citations.
3. Draft scripts/pages from those grounded answers.
4. Keep `data/state_excise_starter.csv` updated as the single source of truth for numbers.

## Source categories to gather
- **State excise / prices:** each state Excise Department site & annual excise policy (Maharashtra, Karnataka, Delhi, Goa, Telangana, Kerala, TN, UP, Rajasthan, Haryana, WB…). MRP lists where published.
- **Market & industry:** CIABC (Confederation of Indian Alcoholic Beverage Companies), ISWAI, IWSR reports (summaries), ICRIER alcohol studies, brokerage FMCG/alcobev reports (United Spirits, Radico, United Breweries investor decks — public, great for margins).
- **Premium/Indian craft:** Amrut, Indri (Piccadily), Rampur (Radico), Paul John — award records (World Whiskies Awards, etc.).
- **Policy/tax:** GST vs. state excise treatment of alcohol (alcohol is *outside* GST — key explainer), prohibition states (Gujarat, Bihar, Nagaland, Lakshadweep).
- **Consumer safety:** WHO standard-drink definitions, national guidelines, credible health sources for the Drink Smart pillar.

## Accuracy guardrails
- Prefer **primary/official** (excise dept, company filings) over blogs.
- Show **year** on every stat (excise policy changes annually).
- When unsure, say "as of [year]" and link the source on the website.
- Never state a health claim without a credible citation.

## High-value evergreen explainers (write these once, rank forever)
- "Why is alcohol not under GST in India?"
- "How does liquor pricing/excise work in [State]?"
- "Why is alcohol cheaper in Goa/Daman?"
- "What is a standard drink / peg / large / patiala peg?"
- "Which Indian whiskies have won world awards?"
- "How do bars price cocktails (pour cost explained)?"

## Fact-check status legend for the CSV
`verified` (official source) · `estimate` (reported/derived) · `todo` (needs sourcing).

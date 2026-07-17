# Mind the Pour — Team Publishing Guide

Everything you need to write and publish a post. No coding.

---

## Signing in

1. Go to **https://mindthepour.space/login/**
2. Enter the email and password Janmejai gave you.
3. You land on the admin panel at `/admin/`.

If it says *"Your account isn't on the contributors list yet"* — your login worked, but Janmejai
still needs to add you as a contributor. Message him.

---

## Writing a post

Hit **+ New post**. The fields, in the order they matter:

| Field | What it is | Get this right |
|---|---|---|
| **Headline** | The big heading readers see on the page | Write it for humans |
| **URL** | The web address, auto-filled from the headline | Once published, **never change it** — it resets the post's Google ranking to zero |
| **Google title** | The blue clickable line in search results | 50–60 characters. This is the single highest-leverage field on the page |
| **Google description** | The grey text under it in search results | 120–160 characters |
| **Pillar** | Which content bucket it belongs to | Pick the closest fit |
| **Intro** | First paragraph | Answer the question in sentence one |
| **Body** | The article | Markdown (see below) |
| **FAQs** | Questions + answers | This is what wins Google's answer boxes |

The Google title and description have a bar underneath that turns **green** when the length is
right. Get both green before publishing.

---

## The four rules that actually move traffic

We learned these from our own Search Console data, not from theory. In our first two weeks we got
**688 impressions and 5 clicks**. People saw us and didn't click. Here's why, and what fixes it.

### 1. Write the Google title for the search, not for the page

Our worst page ranked **8th on Google 236 times and got zero clicks**. Its title was
*"Why do liquor prices vary so much across Indian states?"* — a full sentence that got cut off
mid-way in search results.

- ❌ `Why do liquor prices vary so much across Indian states?`
- ✅ `Why Liquor Prices Vary by State in India (2026)`

Front-load the words people type. Add the year when the topic changes yearly (prices, taxes,
rules) — it signals freshness and lifts clicks.

### 2. Phrase FAQs exactly how people search

This is the big one. Real searches that hit our site:

> `1 peg ml` · `large peg ml` · `patiala peg size` · `what is large in alcohol` · `peg full form alcohol`

Nobody types *"Is a peg the same across all bars in India?"* — but that's what we'd written. So we
ranked 20th and got nothing.

- ❌ "Is a peg the same across all bars in India?"
- ✅ "How many ml is a large peg?"

**Write the question the way a person types it into Google.** Then answer it in the first sentence.

### 3. Put the actual answer in the first sentence

Our peg page explained pegs for four paragraphs without ever saying **60ml**. Google can't feature
an answer that isn't there.

- ❌ "The amount depends on the volume poured and the drink's ABV…"
- ✅ "A peg is 60ml, a large peg is 90ml and a patiala peg is 120ml."

Numbers, names, dates — state them plainly and early. Explain *after*.

### 4. Write for India

Nearly **40% of our impressions came from the United States** and produced zero clicks. Our readers
are in India. Say "₹", say "TASMAC", say "Maharashtra". Specific and local beats broad and generic —
broad traffic doesn't convert and it drags our click-through rate down.

---

## Markdown quick reference

The Body field uses Markdown:

```markdown
## A heading

A normal paragraph. Make words **bold** or *italic*.

- A bullet
- Another bullet

1. A numbered item
2. Another

[Link to another post](/learn/why-liquor-prices-vary-by-state/)

> A pull quote
```

**Link to our own posts whenever it's relevant** (`/learn/...`, `/states/...`). It helps readers
and it helps Google understand what we're about.

---

## Publishing

- **Save draft** — saves privately. Nobody can see it. Safe to do constantly.
- **Publish to site** — puts it live. Requires a Google title, Google description and an intro.
- **Unpublish** — takes it back off the site.

After publishing, the site rebuilds automatically. **Your post appears in about 2 minutes.**
It's not instant — that's normal, don't hit publish five times.

You'll see `✓ Published. It'll be live on the site in about 2 minutes.` If you instead see a
message about the rebuild not triggering, the post *is* saved and marked live — just tell Janmejai
so he can kick the rebuild.

---

## Before you hit publish — checklist

- [ ] Google title bar is **green** (50–60 chars) and front-loads the search words
- [ ] Google description bar is **green** (120–160 chars) and promises the answer
- [ ] The intro answers the question in the **first sentence**, with real numbers
- [ ] At least 3 FAQs, each phrased **the way someone would actually type it**
- [ ] URL is lowercase-with-dashes and you're happy with it **forever**
- [ ] At least one link to another Mind the Pour post
- [ ] Prices in ₹, examples from India

---

## Getting ideas that will actually rank

Ask Janmejai for the Search Console query export. It shows what people searched to find us, and
where we ranked. The gold is:

- **High impressions + low position** → we're relevant but not good enough yet. Write a better,
  dedicated page.
- **Position 5–15 + zero clicks** → we rank but the title is failing. Rewrite the title.
- **Questions we have no page for** → write it.

Live examples from our current data worth writing:
- State liquor price lists (`tasmac liquor price` was our best-performing search)
- `pondicherry liquor price list` / `telangana liquor price 2026`
- Anything peg-related — that cluster alone was 27 different searches

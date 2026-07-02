// Generate rich SEO/GEO content for each brand via OpenRouter (free models).
// Reads src/data/brands.json -> writes src/data/brand-content.json
// INTEGRITY RULE: qualitative only, never invent numbers/sales figures/awards.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { genJSON } from './openrouter.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'src', 'data');
const brands = JSON.parse(readFileSync(join(dataDir, 'brands.json'), 'utf8'));
const outPath = join(dataDir, 'brand-content.json');

const SYSTEM = `You are the writer for "Mind the Pour", an editorial media brand decoding the business, pricing, branding and culture of alcohol in India. Audience: 22-35 urban Indian professionals. Voice: smart, dry-witted, business-savvy, plain-English, never preachy, never glamorising drinking.

HARD RULES:
- EDUCATIONAL analysis of brand STRATEGY, not promotion of drinking or of the brand.
- NEVER invent specific numbers: no sales figures, market share %, prices, dates, or award names/years. If a figure would strengthen a point, write "[verify: ...]". Qualitative claims (one of the largest, widely regarded, award-winning) are fine.
- Focus on the ECONOMICS and MARKETING angle: positioning, premiumization, surrogate advertising, distribution, branding vs. taste perception.
- Output STRICT JSON only. No markdown, no commentary.`;

function buildPrompt(b) {
  return `Write web content analysing the brand "${b.name}" (${b.type}) by ${b.maker}.
Positioning: ${b.positioning}. Editorial angle to explore: ${b.angle}.
Context: direct alcohol advertising is banned in India, so brands use surrogate advertising.

Return JSON with EXACTLY this shape:
{
  "intro": "one punchy paragraph (2-3 sentences) hooking the reader on the business story",
  "sections": [
    { "heading": "The business/branding story", "paragraphs": ["...", "..."] },
    { "heading": "Why it matters", "paragraphs": ["...", "..."] }
  ],
  "faqs": [ { "q": "question a real person would Google", "a": "1-3 sentence answer" } ]
}
Provide 2-3 sections and 3-4 faqs. Remember: NO invented numbers or award names.`;
}

const out = existsSync(outPath) ? JSON.parse(readFileSync(outPath, 'utf8')) : {};
for (const b of brands) {
  if (out[b.slug] && !process.env.FORCE) { console.log(`Skipping ${b.name} (exists)`); continue; }
  process.stdout.write(`Generating ${b.name}… `);
  try {
    const { data, model } = await genJSON([
      { role: 'system', content: SYSTEM },
      { role: 'user', content: buildPrompt(b) },
    ]);
    out[b.slug] = { ...data, generated_at: new Date().toISOString().slice(0, 10), model, draft: true };
    writeFileSync(outPath, JSON.stringify(out, null, 2)); // save-as-you-go
    console.log(`ok (${model.split('/')[1]})`);
  } catch (e) {
    console.log(`FAILED: ${e.message.slice(0, 120)}`);
  }
  await new Promise((r) => setTimeout(r, Number(process.env.DELAY) || 1500));
}

writeFileSync(outPath, JSON.stringify(out, null, 2));
console.log(`\nWrote ${Object.keys(out).length}/${brands.length} brands -> src/data/brand-content.json`);

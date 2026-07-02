// Generate rich SEO/GEO content for each state via OpenRouter (free models).
// Reads src/data/states.json -> writes src/data/state-content.json
// INTEGRITY RULE: the model must stay qualitative and never invent numbers.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { genJSON } from './openrouter.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'src', 'data');
const states = JSON.parse(readFileSync(join(dataDir, 'states.json'), 'utf8'));
const outPath = join(dataDir, 'state-content.json');

const SYSTEM = `You are the writer for "Mind the Pour", an editorial media brand decoding the business, pricing and culture of alcohol in India. Audience: 22-35 urban Indian professionals. Voice: smart, dry-witted, data-driven, plain-English, never preachy, never glamorising drinking.

HARD RULES:
- This is EDUCATIONAL content about the alcohol INDUSTRY, not promotion of drinking.
- NEVER invent specific numbers: no prices, percentages, tax rates, dates, or statistics. If a specific figure would strengthen a point, write a placeholder like "[verify: current excise rate]" instead. Qualitative claims (high/low/among the highest) are fine.
- Be concrete and entity-rich (name the retail body, the tax mechanism, real dynamics) so AI answer engines can cite it.
- Output STRICT JSON only, matching the requested schema. No markdown, no commentary.`;

function buildPrompt(s) {
  const trad = s.traditional?.length
    ? `\nTraditional/tribal drinks of ${s.name} you MUST cover in a dedicated culture section (use ONLY these, do not invent others): ${s.traditional.map((d) => `${d.name} — ${d.kind}, associated with ${d.communities} (${d.note})`).join('; ')}. Write about these respectfully as cultural heritage; do not romanticise intoxication or give brewing instructions.`
    : '';
  return `Write web content for the page about liquor pricing in ${s.name}, India.
Known facts you may rely on (do not contradict): retail model = "${s.model}"; relative price tier = "${s.priceTier}"; prohibition = ${s.prohibition}; summary = "${s.summary}".
Also true nationally: alcohol for human consumption is OUTSIDE GST, so each state sets its own excise duty — the main driver of price differences.${trad}

Return JSON with EXACTLY this shape:
{
  "intro": "one punchy paragraph (2-3 sentences) that hooks the reader",
  "sections": [
    { "heading": "How liquor is priced in ${s.name}", "paragraphs": ["...", "..."] },
    { "heading": "Why prices look the way they do", "paragraphs": ["...", "..."] }${s.traditional?.length ? ',\n    { "heading": "Traditional & tribal drinks", "paragraphs": ["...", "..."] }' : ''}
  ],
  "faqs": [
    { "q": "question a real person would Google", "a": "1-3 sentence answer" }
  ]
}
Provide ${s.traditional?.length ? '3' : '2'}-${s.traditional?.length ? '4' : '3'} sections and 4-5 faqs. Remember: NO invented numbers and NO invented cultural claims beyond what's given.`;
}

// Incremental: keep existing entries, only fill missing (set FORCE=1 to redo all).
const out = existsSync(outPath) ? JSON.parse(readFileSync(outPath, 'utf8')) : {};
for (const s of states) {
  if (out[s.slug] && !process.env.FORCE) { console.log(`Skipping ${s.name} (exists)`); continue; }
  process.stdout.write(`Generating ${s.name}… `);
  try {
    const { data, model } = await genJSON([
      { role: 'system', content: SYSTEM },
      { role: 'user', content: buildPrompt(s) },
    ]);
    out[s.slug] = { ...data, generated_at: new Date().toISOString().slice(0, 10), model, draft: true };
    writeFileSync(outPath, JSON.stringify(out, null, 2)); // save-as-you-go: persist progress
    console.log(`ok (${model.split('/')[1]})`);
  } catch (e) {
    console.log(`FAILED: ${e.message.slice(0, 120)}`);
  }
  await new Promise((r) => setTimeout(r, Number(process.env.DELAY) || 1500)); // be gentle on free tier
}

writeFileSync(outPath, JSON.stringify(out, null, 2));
console.log(`\nWrote ${Object.keys(out).length}/${states.length} states -> src/data/state-content.json`);
console.log('NOTE: content is DRAFT. Review, replace [verify] placeholders with sourced numbers, set draft:false.');

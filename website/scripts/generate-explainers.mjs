// Generate long-form evergreen explainer articles via OpenRouter (free models).
// Reads src/data/explainers.json -> writes src/data/explainer-content.json
// INTEGRITY RULE: qualitative only, never invent numbers/rates/dates.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { genJSON } from './openrouter.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'src', 'data');
const items = JSON.parse(readFileSync(join(dataDir, 'explainers.json'), 'utf8'));
const outPath = join(dataDir, 'explainer-content.json');

const SYSTEM = `You are the writer for "Mind the Pour", an editorial media brand decoding the economics of alcohol in India. Audience: 22-35 urban Indian professionals. Voice: smart, dry-witted, plain-English, authoritative but not academic, never preachy, never glamorising drinking.

HARD RULES:
- EDUCATIONAL content about the alcohol industry, not promotion of drinking.
- NEVER invent specific numbers, tax rates, prices, dates or statistics. Use "[verify: ...]" placeholders where a real figure belongs. Qualitative statements are fine.
- Be genuinely informative, structured, and entity-rich so AI answer engines can cite it. Answer the core question clearly in the intro.
- Output STRICT JSON only. No markdown, no commentary.`;

function buildPrompt(e) {
  return `Write a thorough, evergreen explainer article.
Title: "${e.title}"
Core question to answer directly: "${e.question}"
Angle/thesis: ${e.angle}
Context: alcohol for human consumption is outside GST in India and is taxed via state excise; direct alcohol advertising is banned (surrogate advertising is used).

Return JSON with EXACTLY this shape:
{
  "intro": "2-3 sentences that answer the core question directly and hook the reader",
  "sections": [ { "heading": "clear H2", "paragraphs": ["...", "..."] } ],
  "takeaways": ["3-5 short bullet takeaways"],
  "faqs": [ { "q": "related question people Google", "a": "1-3 sentence answer" } ]
}
Provide 3-4 sections, 3-5 takeaways, 3-4 faqs. Remember: NO invented numbers.`;
}

const out = existsSync(outPath) ? JSON.parse(readFileSync(outPath, 'utf8')) : {};
for (const e of items) {
  if (out[e.slug] && !process.env.FORCE) { console.log(`Skipping "${e.title.slice(0, 40)}" (exists)`); continue; }
  process.stdout.write(`Generating "${e.title.slice(0, 40)}"… `);
  try {
    const { data, model } = await genJSON([
      { role: 'system', content: SYSTEM },
      { role: 'user', content: buildPrompt(e) },
    ]);
    out[e.slug] = { ...data, generated_at: new Date().toISOString().slice(0, 10), model, draft: true };
    writeFileSync(outPath, JSON.stringify(out, null, 2)); // save-as-you-go
    console.log(`ok (${model.split('/')[1]})`);
  } catch (err) {
    console.log(`FAILED: ${err.message.slice(0, 120)}`);
  }
  await new Promise((r) => setTimeout(r, Number(process.env.DELAY) || 1500));
}

writeFileSync(outPath, JSON.stringify(out, null, 2));
console.log(`\nWrote ${Object.keys(out).length}/${items.length} explainers -> src/data/explainer-content.json`);

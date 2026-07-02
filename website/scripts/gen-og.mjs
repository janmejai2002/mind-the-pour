// Generate on-brand OG / social share images (1200x630) for every page.
// Output: public/og/<key>.png  ->  referenced by Base.astro as og:image.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { C, h, loadFonts, toPng, ensureDir } from './lib-og.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'src', 'data');
const outDir = join(__dirname, '..', 'public', 'og');
const rd = (f) => JSON.parse(readFileSync(join(dataDir, f + '.json'), 'utf8'));

// The branded 1200x630 template.
function template({ tag, title }) {
  return h('div', {
    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    width: '1200px', height: '630px', backgroundColor: C.ink, color: C.cream,
    padding: '70px', fontFamily: 'Inter',
  }, [
    h('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, [
      h('div', {
        display: 'flex', backgroundColor: C.amber, color: C.ink, fontSize: '26px',
        fontWeight: 600, padding: '8px 22px', borderRadius: '999px',
      }, tag),
      h('div', { display: 'flex', color: C.amber, fontFamily: 'Space Grotesk', fontSize: '26px', letterSpacing: '2px' }, 'MIND THE POUR'),
    ]),
    h('div', {
      display: 'flex', fontFamily: 'Space Grotesk', fontSize: title.length > 70 ? '58px' : '68px',
      color: C.cream, lineHeight: 1.12, maxWidth: '1060px',
    }, title),
    h('div', { display: 'flex', alignItems: 'center' }, [
      h('div', { display: 'flex', width: '56px', height: '8px', backgroundColor: C.amber, marginRight: '20px' }, ''),
      h('div', { display: 'flex', color: C.stone, fontSize: '27px' }, 'mindthepour.space · the economics of what India drinks'),
    ]),
  ]);
}

const year = new Date().getFullYear();
const jobs = [];
jobs.push({ key: 'default', tag: 'The Economics of What India Drinks', title: 'Why does the same bottle cost 3x more across a state line?' });
for (const s of rd('states')) jobs.push({ key: `state-${s.slug}`, tag: s.prohibition ? 'Dry State' : 'Price Decoded', title: `Liquor prices & excise duty in ${s.name} (${year})` });
for (const b of rd('brands')) jobs.push({ key: `brand-${b.slug}`, tag: `Brands · ${b.type}`, title: `${b.name}: the business behind the ${b.type.toLowerCase()}` });
for (const e of rd('explainers')) jobs.push({ key: `learn-${e.slug}`, tag: e.pillar, title: e.title });

const fonts = await loadFonts();
ensureDir(outDir);
let n = 0;
for (const job of jobs) {
  const png = await toPng(template(job), { width: 1200, height: 630, fonts });
  writeFileSync(join(outDir, `${job.key}.png`), png);
  n++;
  if (n % 10 === 0) process.stdout.write(`${n}… `);
}
console.log(`\nGenerated ${n} OG images -> public/og/`);

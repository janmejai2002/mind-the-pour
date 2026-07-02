// Generate on-brand Instagram carousel/post cards (1080x1080).
// Reads src/data/cards.json -> writes to ../social-cards/<key>.png (outside the website).
// Add rows to cards.json (or wire this to the content calendar) to make more.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { C, h, loadFonts, toPng, ensureDir } from './lib-og.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cards = JSON.parse(readFileSync(join(__dirname, '..', 'src', 'data', 'cards.json'), 'utf8'));
const outDir = join(__dirname, '..', '..', 'social-cards');

function card({ kicker, headline, cta }) {
  return h('div', {
    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    width: '1080px', height: '1080px', backgroundColor: C.ink, color: C.cream,
    padding: '90px', fontFamily: 'Inter',
  }, [
    // top: brand
    h('div', { display: 'flex' }, [
      h('div', { display: 'flex', color: C.amber, fontFamily: 'Space Grotesk', fontSize: '34px', letterSpacing: '3px' }, 'MIND THE POUR'),
    ]),
    // middle: kicker + headline
    h('div', { display: 'flex', flexDirection: 'column' }, [
      h('div', { display: 'flex', color: C.amber, fontSize: '30px', fontWeight: 600, letterSpacing: '4px', marginBottom: '28px' }, kicker),
      h('div', {
        display: 'flex', fontFamily: 'Space Grotesk',
        fontSize: headline.length > 60 ? '76px' : '92px', color: C.cream, lineHeight: 1.08,
      }, headline),
    ]),
    // bottom: accent + cta
    h('div', { display: 'flex', alignItems: 'center' }, [
      h('div', { display: 'flex', width: '64px', height: '10px', backgroundColor: C.amber, marginRight: '24px' }, ''),
      h('div', { display: 'flex', color: C.stone, fontSize: '32px' }, cta || '@mindthepour'),
    ]),
  ]);
}

const fonts = await loadFonts();
ensureDir(outDir);
let n = 0;
for (const c of cards) {
  const png = await toPng(card(c), { width: 1080, height: 1080, fonts });
  writeFileSync(join(outDir, `${c.key}.png`), png);
  n++;
}
console.log(`Generated ${n} IG cards -> social-cards/`);

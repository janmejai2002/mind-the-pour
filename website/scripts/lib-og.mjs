// Shared image-generation helpers: fonts + Satori(SVG) -> PNG (resvg).
// No LLM calls. Used by gen-og.mjs (share images) and gen-cards.mjs (IG cards).
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fontsDir = join(__dirname, 'fonts');

export const C = {
  ink: '#0E0E10', surface: '#1A1A1E', amber: '#E0A73C',
  green: '#1F6B4E', cream: '#F4EAD5', stone: '#9A968E',
};

const FONTS = [
  { name: 'Space Grotesk', weight: 700, file: 'space-grotesk-700.ttf', url: 'https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-700-normal.ttf' },
  { name: 'Inter', weight: 400, file: 'inter-400.ttf', url: 'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.ttf' },
  { name: 'Inter', weight: 600, file: 'inter-600.ttf', url: 'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-600-normal.ttf' },
  // Fallback for glyphs the latin subsets lack (esp. ₹ U+20B9). latin-ext includes the rupee sign.
  { name: 'Noto Sans', weight: 400, file: 'noto-sans-400.ttf', url: 'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans@latest/latin-ext-400-normal.ttf' },
  { name: 'Noto Sans', weight: 700, file: 'noto-sans-700.ttf', url: 'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans@latest/latin-ext-700-normal.ttf' },
];

export async function loadFonts() {
  if (!existsSync(fontsDir)) mkdirSync(fontsDir, { recursive: true });
  const out = [];
  for (const f of FONTS) {
    const p = join(fontsDir, f.file);
    if (!existsSync(p)) {
      process.stdout.write(`Downloading font ${f.file}… `);
      const res = await fetch(f.url);
      if (!res.ok) throw new Error(`font download failed: ${f.url} ${res.status}`);
      writeFileSync(p, Buffer.from(await res.arrayBuffer()));
      console.log('ok');
    }
    out.push({ name: f.name, weight: f.weight, style: 'normal', data: readFileSync(p) });
  }
  return out;
}

// tiny hyperscript so we don't need JSX in .mjs
export const h = (type, style, children) => ({ type, props: { style, ...(children !== undefined ? { children } : {}) } });

export async function toPng(node, { width, height, fonts }) {
  const svg = await satori(node, { width, height, fonts });
  return new Resvg(svg, { fitTo: { mode: 'width', value: width } }).render().asPng();
}

export function ensureDir(p) { if (!existsSync(p)) mkdirSync(p, { recursive: true }); }

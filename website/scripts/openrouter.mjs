// Minimal OpenRouter client — no dependencies.
// Loads OPEN_ROUTER_KEY from ../.env (project root) or the website/.env.
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  const candidates = [
    join(__dirname, '..', '..', '.env'), // Mind The Pour/.env
    join(__dirname, '..', '.env'),       // website/.env
  ];
  for (const p of candidates) {
    if (!existsSync(p)) continue;
    const txt = readFileSync(p, 'utf8');
    for (const line of txt.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m) process.env[m[1]] ??= m[2].replace(/^["']|["']$/g, '');
    }
  }
}
loadEnv();

export const KEY = process.env.OPEN_ROUTER_KEY || process.env.OPENROUTER_API_KEY;
// Optional Google AI Studio key (free, higher daily limits). Get one at aistudio.google.com.
export const GEMINI_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
export const GEMINI_MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash'];

// Free models to try in order (fallback if one is rate-limited/unavailable).
// Verified available on OpenRouter's free tier. Refresh with: node scripts/list-free.mjs
export const FREE_MODELS = [
  'qwen/qwen3-next-80b-a3b-instruct:free',
  'openai/gpt-oss-120b:free',
  'meta-llama/llama-3.3-70b-instruct:free',
  'nvidia/nemotron-3-super-120b-a12b:free',
];

// Replace ASCII control characters (code < 32) with spaces so raw newlines/tabs
// inside string values don't break JSON.parse. Avoids tricky literal regex.
function stripControlChars(s) {
  let out = '';
  for (const ch of s) out += ch.charCodeAt(0) < 32 ? ' ' : ch;
  return out;
}

// Robust-ish JSON extraction from an LLM reply (handles code fences,
// prose wrappers, trailing commas, and stray control characters).
export function parseJsonLoose(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  let raw = fenced ? fenced[1] : text;
  const start = raw.indexOf('{');
  const end = raw.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('No JSON object found');
  raw = raw.slice(start, end + 1);
  const clean = stripControlChars(raw).replace(/,\s*([}\]])/g, '$1'); // drop trailing commas
  return JSON.parse(clean);
}

export async function chat(messages, { model, temperature = 0.7, json = false } = {}) {
  if (!KEY) throw new Error('OPEN_ROUTER_KEY not found in .env');
  const models = model ? [model] : FREE_MODELS;
  let lastErr;
  for (const m of models) {
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://mindthepour.space',
          'X-Title': 'Mind the Pour',
        },
        body: JSON.stringify({
          model: m,
          temperature,
          messages,
          ...(json ? { response_format: { type: 'json_object' } } : {}),
        }),
      });
      if (!res.ok) { lastErr = new Error(`${m}: ${res.status} ${await res.text()}`); continue; }
      const data = await res.json();
      const content = data.choices?.[0]?.message?.content;
      if (!content) { lastErr = new Error(`${m}: empty response`); continue; }
      return { content, model: m };
    } catch (e) { lastErr = e; }
  }
  throw lastErr;
}

// Google Gemini (AI Studio) chat — free key, higher daily limits than OpenRouter free tier.
// Maps our {system, user} messages into Gemini's format and asks for JSON output.
export async function geminiChat(messages, { model, temperature = 0.6, json = true } = {}) {
  if (!GEMINI_KEY) throw new Error('GEMINI_API_KEY not set');
  const models = model ? [model] : GEMINI_MODELS;
  const system = messages.filter((m) => m.role === 'system').map((m) => m.content).join('\n\n');
  const contents = messages
    .filter((m) => m.role !== 'system')
    .map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] }));
  let lastErr;
  for (const m of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${GEMINI_KEY}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          ...(system ? { systemInstruction: { parts: [{ text: system }] } } : {}),
          generationConfig: { temperature, ...(json ? { responseMimeType: 'application/json' } : {}) },
        }),
      });
      if (!res.ok) { lastErr = new Error(`${m}: ${res.status} ${await res.text()}`); continue; }
      const data = await res.json();
      const content = data.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ?? '';
      if (!content) { lastErr = new Error(`${m}: empty response`); continue; }
      return { content, model: `google/${m}` };
    } catch (e) { lastErr = e; }
  }
  throw lastErr;
}

// Generate + parse JSON with retries. Tries OpenRouter free models first,
// then falls back to Gemini (if GEMINI_API_KEY is set) — useful when the
// OpenRouter free daily quota is exhausted.
export async function genJSON(messages, { tries = Number(process.env.TRIES) || 3, temperature = 0.6 } = {}) {
  let lastErr;
  const pref = process.env.PROVIDER; // 'gemini' or 'openrouter' to force one; unset = try both
  const providers = [];
  if (KEY && pref !== 'gemini') providers.push((msgs) => chat(msgs, { temperature }));
  if (GEMINI_KEY && pref !== 'openrouter') providers.push((msgs) => geminiChat(msgs, { temperature }));
  if (!providers.length) throw new Error('No usable API key (set OPEN_ROUTER_KEY and/or GEMINI_API_KEY in .env)');
  for (let i = 0; i < tries; i++) {
    for (const call of providers) {
      try {
        const { content, model } = await call(messages);
        return { data: parseJsonLoose(content), model };
      } catch (e) {
        lastErr = e;
        await new Promise((r) => setTimeout(r, 500));
      }
    }
  }
  throw lastErr;
}

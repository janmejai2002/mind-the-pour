// Refresh the list of currently-free OpenRouter models.
import { KEY } from './openrouter.mjs';
const r = await fetch('https://openrouter.ai/api/v1/models', { headers: { Authorization: 'Bearer ' + KEY } });
const { data } = await r.json();
const free = data.filter((m) => m.pricing?.prompt === '0' && m.pricing?.completion === '0');
console.log(`Free models (${free.length}):`);
console.log(free.map((m) => '  ' + m.id).join('\n'));

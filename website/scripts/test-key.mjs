import { chat, KEY } from './openrouter.mjs';

console.log('Key loaded:', KEY ? `yes (${KEY.slice(0, 8)}…, ${KEY.length} chars)` : 'NO');
const { content, model } = await chat(
  [{ role: 'user', content: 'Reply with exactly: OK' }],
  { temperature: 0 }
);
console.log('Model used:', model);
console.log('Response:', content.trim());

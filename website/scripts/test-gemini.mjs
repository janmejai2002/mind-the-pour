import { geminiChat, GEMINI_KEY } from './openrouter.mjs';

console.log('Gemini key loaded:', GEMINI_KEY ? `yes (${GEMINI_KEY.slice(0, 6)}…)` : 'NO — add GEMINI_API_KEY to .env');
if (GEMINI_KEY) {
  const { content, model } = await geminiChat([{ role: 'user', content: 'Reply with exactly: OK' }], { json: false });
  console.log('Model used:', model);
  console.log('Response:', content.trim());
}

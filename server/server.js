// server/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import crypto from 'crypto';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// In-memory cache (swap for Redis or a database in production)
const cache = new Map();

// Initialize the GPT-4.1 Nano client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Split text into chunks by approximate token count
 * (1 token ≈ 4 characters).
 */
function chunkText(text, maxTokens = 1500) {
  const maxChars = maxTokens * 4;
  const chunks = [];
  for (let i = 0; i < text.length; i += maxChars) {
    chunks.push(text.slice(i, i + maxChars));
  }
  return chunks;
}

app.post('/summarize', async (req, res) => {
  try {
    const { text: rawText, length } = req.body;
    if (!rawText || !rawText.trim()) {
      return res.status(400).json({ error: 'No text provided' });
    }

    // 1) Clean & collapse whitespace
    const text = rawText.replace(/\s+/g, ' ').trim();

    // 2) Cache key = SHA-256 of text + length
    const key = crypto.createHash('sha256').update(text + length).digest('hex');
    if (cache.has(key)) {
      return res.json(cache.get(key));
    }

    // 3) Determine bullet count
    const bulletCount =
      length === 'short'    ? 3 :
      length === 'detailed' ? 8 :
                              5;

    // 4) Chunk the text into ~1 500‐token pieces
    const chunks = chunkText(text, 1500);

    // 5) Summarize each chunk
    const perChunkMax = 200;  // limit tokens per chunk
    const chunkSummaries = [];
    for (const chunk of chunks) {
      const chat = await openai.chat.completions.create({
        model: 'gpt-4.1-nano',
        messages: [
          { role: 'system', content:
            `You are a summarization assistant.` },
          { role: 'user', content:
            `Summarize this text into ${Math.ceil(bulletCount/chunks.length)} bullet points ONLY. Do NOT include anything else.` },
          { role: 'user', content: chunk }
        ],
        max_tokens: perChunkMax,
        temperature: 0.7,
      });
      chunkSummaries.push(chat.choices[0].message.content.trim());
    }

    // 6) Combine into final bullets + tags
    const finalMax = 500;
    const combinePrompt = `
You MUST return EXACTLY and ONLY valid JSON with this schema:
{
  "bullets": ["…","…","…"], 
  "tags":    ["…","…","…","…","…"]
}
Now combine these ${chunks.length} summaries into ${bulletCount} final bullets,
then extract the top 5 keywords.

Summaries:
"""${chunkSummaries.join('\n---\n')}"""
`;
    const finalChat = await openai.chat.completions.create({
      model: 'gpt-4.1-nano',
      messages: [
        { role: 'system', content:
          'You summarize and extract keywords as JSON only.' },
        { role: 'user', content: combinePrompt }
      ],
      max_tokens: finalMax,
      temperature: 0.7,
    });

    const reply = finalChat.choices[0].message.content.trim();
    console.log('🔍 AI raw reply:', reply);

    // 7) Parse JSON (with error catch)
    let payload;
    try {
      payload = JSON.parse(reply);
    } catch (parseErr) {
      console.error('❌ JSON parse error:', parseErr);
      return res.status(500).json({
        error: 'Invalid JSON from OpenAI',
        raw: reply
      });
    }

    // 8) Cache & return
    cache.set(key, payload);
    res.json(payload);

  } catch (err) {
    console.error('Summarize error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`📝 Summarize API listening on http://localhost:${PORT}`);
});

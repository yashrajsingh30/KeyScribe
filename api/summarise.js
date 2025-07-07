// api/summarize.js
import OpenAI from 'openai';

// Initialize once per cold start
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { text: rawText, length } = req.body;
    if (!rawText?.trim()) {
      return res.status(400).json({ error: 'No text provided' });
    }

    // Clean & chunk
    const text = rawText.replace(/\s+/g, ' ').trim();
    const bulletCount = length === 'short' ? 3 : length === 'detailed' ? 8 : 5;
    const maxTokens = 500; 

    // Single‐pass summarization for simplicity (you can re-add your chunk logic here)
    const prompt = `
You MUST return EXACTLY and ONLY valid JSON with this schema:
{
  "bullets": ["…","…","…"],
  "tags":    ["…","…","…","…","…"]
}
Summarize into ${bulletCount} bullets and extract top 5 keywords:
"""${text}"""
`;
    const chat = await openai.chat.completions.create({
      model: 'gpt-4.1-nano',
      messages: [
        { role: 'system', content: 'You summarize and extract keywords as JSON only.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: maxTokens,
      temperature: 0.7,
    });

    const reply = chat.choices[0].message.content.trim();
    const payload = JSON.parse(reply);
    return res.json(payload);

  } catch (err) {
    console.error('Summarize error:', err);
    return res.status(500).json({ error: err.message });
  }
}

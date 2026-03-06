import { createRequire } from 'module'
import OpenAI from 'openai'

const require = createRequire(import.meta.url)
const knowledgeBase = require('./knowledge-base.json')

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

function cosineSim(a, b) {
  let dot = 0, magA = 0, magB = 0
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]
    magA += a[i] * a[i]
    magB += b[i] * b[i]
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB))
}

async function retrieveContext(query, lang, topK = 4) {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: query,
  })
  const queryEmbedding = response.data[0].embedding

  const scored = knowledgeBase.map(passage => ({
    ...passage,
    score: cosineSim(queryEmbedding, passage.embedding) * (passage.lang === lang ? 1.0 : 0.85),
  }))

  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, topK)
}

function detectLang(messages) {
  const lastUser = [...messages].reverse().find(m => m.role === 'user')
  if (!lastUser) return 'fr'
  const frWords = /\b(je|tu|vous|elle|est|les|des|une|pour|avec|dans|sur|qui|que|son|ses|kim|bonjour|salut|comment|quoi|quels?|quel(?:le)?s?)\b/i
  return frWords.test(lastUser.content) ? 'fr' : 'en'
}

const SYSTEM_PROMPT = `You are Kimy, the friendly AI assistant on Kim Hilaire's portfolio website. You answer questions about Kim based ONLY on the context provided below.

Rules:
- Be warm, professional, and concise (2-4 sentences max unless asked for detail)
- Reply in the same language the user writes in (French or English)
- ONLY use information from the provided context — do not invent or assume
- If the context doesn't contain the answer, say so politely and suggest contacting Kim directly at kimhilaire@yahoo.fr
- Speak as Kim's assistant, not as Kim herself`

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { messages, lang: clientLang } = req.body
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Missing messages array' })
  }

  try {
    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user')
    if (!lastUserMsg) {
      return res.status(400).json({ error: 'No user message found' })
    }

    const lang = clientLang || detectLang(messages)
    const relevantPassages = await retrieveContext(lastUserMsg.content, lang)

    const contextBlock = relevantPassages
      .map((p, i) => `[${i + 1}] (${p.topic})\n${p.text}`)
      .join('\n\n')

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: `${SYSTEM_PROMPT}\n\nIMPORTANT: You MUST reply in ${lang === 'fr' ? 'French' : 'English'} only.\n\n---\nContext:\n${contextBlock}\n---` },
        ...messages.slice(-10),
      ],
      max_tokens: 300,
      temperature: 0.4,
    })

    return res.status(200).json({
      reply: completion.choices[0].message.content,
    })
  } catch (err) {
    console.error('Chat error:', err)
    return res.status(500).json({ error: 'Failed to get response' })
  }
}

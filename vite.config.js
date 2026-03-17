import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { readFileSync } from 'fs'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // Load knowledge base at server start
  let knowledgeBase = []
  try {
    knowledgeBase = JSON.parse(readFileSync('api/knowledge-base.json', 'utf-8'))
  } catch {
    console.warn('⚠ api/knowledge-base.json not found — run: node scripts/enrich-data.js')
  }

  function cosineSim(a, b) {
    let dot = 0, magA = 0, magB = 0
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i]
      magA += a[i] * a[i]
      magB += b[i] * b[i]
    }
    return dot / (Math.sqrt(magA) * Math.sqrt(magB))
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'api-chat-dev',
        configureServer(server) {
          server.middlewares.use('/api/chat', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405
              res.end(JSON.stringify({ error: 'Method not allowed' }))
              return
            }

            let body = ''
            for await (const chunk of req) body += chunk
            const { messages, lang: clientLang } = JSON.parse(body)

            if (!messages || !Array.isArray(messages)) {
              res.statusCode = 400
              res.end(JSON.stringify({ error: 'Missing messages array' }))
              return
            }

            try {
              const { default: OpenAI } = await import('openai')
              const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY })

              // Get latest user message
              const lastUserMsg = [...messages].reverse().find(m => m.role === 'user')
              if (!lastUserMsg) {
                res.statusCode = 400
                res.end(JSON.stringify({ error: 'No user message found' }))
                return
              }

              // Detect language
              const frWords = /\b(je|tu|vous|elle|est|les|des|une|pour|avec|dans|sur|qui|que|son|ses|kim|bonjour|salut|comment|quoi|quels?|quel(?:le)?s?)\b/i
              const lang = clientLang || (frWords.test(lastUserMsg.content) ? 'fr' : 'en')

              // Embed the query
              const embResponse = await openai.embeddings.create({
                model: 'text-embedding-3-small',
                input: lastUserMsg.content,
              })
              const queryEmbedding = embResponse.data[0].embedding

              // Retrieve top-4 relevant passages + always-include critical topics
              const ALWAYS_INCLUDE = ['current-status']
              const scored = knowledgeBase
                .map(p => ({
                  ...p,
                  score: cosineSim(queryEmbedding, p.embedding) * (p.lang === lang ? 1.0 : 0.85),
                }))
                .sort((a, b) => b.score - a.score)

              const topResults = scored.slice(0, 4)
              const topTopics = new Set(topResults.map(p => p.topic))
              for (const topic of ALWAYS_INCLUDE) {
                if (!topTopics.has(topic)) {
                  const match = scored.find(p => p.topic === topic && p.lang === lang)
                  if (match) topResults.push(match)
                }
              }

              const contextBlock = topResults
                .map((p, i) => `[${i + 1}] (${p.topic})\n${p.text}`)
                .join('\n\n')

              const SYSTEM_PROMPT = `You are Kimy, the friendly AI assistant on Kim Hilaire's portfolio website. You answer questions about Kim based ONLY on the context provided below.

Rules:
- Be warm, professional, and concise (2-4 sentences max unless asked for detail)
- Reply in the same language the user writes in (French or English)
- ONLY use information from the provided context — do not invent or assume
- If the context doesn't contain the answer, say so politely and suggest contacting Kim directly at kimhilaire@yahoo.fr
- Speak as Kim's assistant, not as Kim herself`

              const completion = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [
                  { role: 'system', content: `${SYSTEM_PROMPT}\n\nIMPORTANT: You MUST reply in ${lang === 'fr' ? 'French' : 'English'} only.\n\n---\nContext:\n${contextBlock}\n---` },
                  ...messages.slice(-10),
                ],
                max_tokens: 300,
                temperature: 0.4,
              })

              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ reply: completion.choices[0].message.content }))
            } catch (err) {
              console.error('OpenAI dev error:', err)
              res.statusCode = 500
              res.end(JSON.stringify({ error: 'Failed to get response' }))
            }
          })
        },
      },
    ],
  }
})

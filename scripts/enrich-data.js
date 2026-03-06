/**
 * Enrichment script — converts raw portfolio JSON into contextual passages,
 * then computes embeddings for each passage.
 *
 * Usage: node scripts/enrich-data.js
 * Requires: OPENAI_API_KEY in ../.env
 */

import { readFileSync, writeFileSync } from 'fs'
import { config } from 'dotenv'
import OpenAI from 'openai'

config() // load .env from cwd (run from site/)

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// ---------- Load raw data ----------
const fr = JSON.parse(readFileSync('src/data/fr.json', 'utf-8'))
const en = JSON.parse(readFileSync('src/data/en.json', 'utf-8'))

// ---------- Build structured sections for enrichment ----------
function buildRawSections(data, lang) {
  const sections = []

  // About / Profile
  sections.push({
    topic: 'profile',
    raw: `Name: Kim Hilaire\nTitle: ${data.hero.headline}\nSubheadline: ${data.hero.subheadline}\n\nAbout:\n${data.about.text.join(' ')}\n\nContact: ${data.about.email} | ${data.about.phone}\nLinkedIn: ${data.about.linkedinUrl}`,
  })

  // Experience — one section per role
  for (const role of data.experience.roles) {
    sections.push({
      topic: `experience-${role.company}`,
      raw: `Position: ${role.position}\nCompany: ${role.company}\nPeriod: ${role.period} (${role.duration})\nMetrics: ${role.metrics.join(', ')}\nAchievements:\n${role.bullets.map(b => `- ${b}`).join('\n')}`,
    })
  }

  // Education — one section per degree
  for (const deg of data.education.degrees) {
    sections.push({
      topic: `education-${deg.institution}`,
      raw: `Degree: ${deg.degree.replace(/\n/g, ' ')}\nInstitution: ${deg.institution.replace(/\n/g, ', ')}\nPeriod: ${deg.period}${deg.note ? `\nNote: ${deg.note}` : ''}`,
    })
  }

  // Skills — grouped by category
  const skillLines = []
  for (const [category, items] of Object.entries(data.skills.technical)) {
    skillLines.push(`${category}: ${items.join(', ')}`)
  }
  skillLines.push(`Soft skills: ${data.skills.soft.join(', ')}`)
  sections.push({
    topic: 'skills',
    raw: skillLines.join('\n'),
  })

  // Projects — one section per project
  for (const proj of data.projects.items) {
    const desc = Array.isArray(proj.description) ? proj.description.join(' ') : proj.description
    sections.push({
      topic: `project-${proj.name}`,
      raw: `Project: ${proj.name}\nCompany: ${proj.company}\nYear: ${proj.year}\nMetric: ${proj.metric.value} ${proj.metric.label}\nDescription: ${desc}`,
    })
  }

  // Certifications — all together
  sections.push({
    topic: 'certifications',
    raw: data.certifications.items.map(c => `${c.name} — ${c.issuer} (${c.year}): ${c.description}`).join('\n'),
  })

  // Languages
  sections.push({
    topic: 'languages',
    raw: data.languages.items.map(l => `${l.name}: ${l.level} — ${l.tooltip}`).join('\n'),
  })

  // Hobbies
  sections.push({
    topic: 'hobbies',
    raw: `Hobbies: ${data.hobbies.items.map(h => h.name).join(', ')}`,
  })

  // Contact details (separate for direct questions)
  sections.push({
    topic: 'contact',
    raw: `Email: ${data.about.email}\nPhone: ${data.about.phone}\nLinkedIn: ${data.about.linkedinUrl}`,
  })

  return sections
}

// ---------- Enrich with LLM ----------
async function enrichSections(sections, lang) {
  const langLabel = lang === 'fr' ? 'French' : 'English'
  const enriched = []

  console.log(`\nEnriching ${sections.length} sections (${langLabel})...`)

  for (const section of sections) {
    console.log(`  → ${section.topic}`)

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a data enrichment assistant. Convert the following raw portfolio data about Kim Hilaire into a natural, contextual paragraph in ${langLabel}. The paragraph should:
- Be 3-6 sentences long
- Include specific details, numbers, and context from the raw data
- Cross-reference related information where relevant (e.g., link skills to where they were used)
- Be written in third person ("Kim..." / "Elle...")
- Sound natural and informative, as if explaining Kim's background to someone
- DO NOT add any information not present in the raw data
- DO NOT include headers or bullet points — write flowing prose`,
        },
        {
          role: 'user',
          content: `Topic: ${section.topic}\n\nRaw data:\n${section.raw}`,
        },
      ],
      max_tokens: 400,
      temperature: 0.3,
    })

    enriched.push({
      topic: section.topic,
      text: completion.choices[0].message.content.trim(),
      lang,
    })
  }

  return enriched
}

// ---------- Compute embeddings ----------
async function computeEmbeddings(passages) {
  console.log(`\nComputing embeddings for ${passages.length} passages...`)

  const texts = passages.map(p => p.text)

  // OpenAI allows up to 2048 inputs per batch
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: texts,
  })

  return passages.map((p, i) => ({
    ...p,
    embedding: response.data[i].embedding,
  }))
}

// ---------- Main ----------
async function main() {
  const frSections = buildRawSections(fr, 'fr')
  const enSections = buildRawSections(en, 'en')

  const frEnriched = await enrichSections(frSections, 'fr')
  const enEnriched = await enrichSections(enSections, 'en')

  const allPassages = [...frEnriched, ...enEnriched]
  const withEmbeddings = await computeEmbeddings(allPassages)

  // Save to api/ so the serverless function can import it
  writeFileSync(
    'api/knowledge-base.json',
    JSON.stringify(withEmbeddings, null, 2)
  )

  console.log(`\n✓ Saved ${withEmbeddings.length} enriched passages with embeddings to api/knowledge-base.json`)
}

main().catch(err => {
  console.error('Error:', err)
  process.exit(1)
})

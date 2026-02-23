import './ATSResume.css'

const content = {
  fr: {
    title: 'Chef de Projet Transformation Digitale Data & IA',
    profile: { heading: 'Profil', text: "Œuvrer pour une Data & IA centrée sur l'humain est l'un de mes objectifs. Ayant grandi dans un environnement multiculturel, je m'appuie sur cette ouverture d'esprit pour faciliter le dialogue entre le secteur public et privé, convaincue que l'intelligence collective est essentielle à la réussite. Bilingue français-anglais avec une expérience internationale en Europe et en Océanie, mon parcours m'a forgée une capacité prouvée à coordonner des équipes pluridisciplinaires au sein d'écosystèmes complexes. Mon intervention vise un juste équilibre : délivrer des résultats mesurables via des frameworks agiles et de gouvernance (RGPD), tout en vulgarisant la complexité pour faire de chaque projet un levier d'acculturation et de progrès partagé." },
    expHeading: 'Expériences Professionnelles',
    roles: [
      { role: 'Chargée de Mission – Numérique & Audiovisuel', company: 'Gouvernement de la Polynésie Française (Tahiti)', period: 'Mars 2024 – Nov. 2024', bullets: ['Cartographie de 20+ acteurs clés via un stakeholder mapping, alignant les feuilles de route publique/privée', "Référent direction/Direction Générale de l'Economie Numérique (DGEN), traduction et co-construction de 3 axes politiques en feuille de route opérationnelle", "Analyse d'impact réglementaire sur 2 projets d'infrastructures publiques, identifiant 10 points de risques"] },
      { role: 'Assistante Chef de Projet – Data & IA', company: 'Crédit Agricole S.A, DataLab (Paris)', period: 'Juin 2023 – Nov. 2023', bullets: ["Structuration d'une équipe transverse de 10 personnes via une matrice RACI, -15% latence décisionnelle", 'Cadrage de 2 Preuves de Concept (POCs) en IA Générative via MoSCoW, livrable testable en moins de 4 mois', 'Pilotage ateliers « Veille IA Green », 90% satisfaction équipes techniques et métier'] },
      { role: 'Assistante Marketing – Développement Commercial', company: 'Les Belles Envies (Paris)', period: 'Sept. 2021 – Déc. 2021', bullets: ['Conception visuels produits, prospection commerciale et création de document d\'information précontractuel', 'Traduction brochures commerciales français/anglais pour le développement international'] },
      { role: 'Assistante Marketing', company: 'American Express OFINA (Tahiti)', period: 'Fév. 2021 – Août 2021', bullets: ['Plans de communication produits bancaires régionaux, supports visuels et analyses concurrentielles'] },
      { role: 'Assistante Marketing & Communication', company: 'Air Calédonie (Nouvelle-Calédonie)', period: 'Jan. 2018 – Mars 2018', bullets: ['Conception visuels de marque et gestion sponsoring événement teambuilding annuel'] },
    ],
    eduHeading: 'Formations',
    degrees: [
      { degree: 'MSc Artificial Intelligence for Business Transformation', inst: 'Skema Business School / ESIEA, Paris, France', period: '2020 – 2023' },
      { degree: 'Master en Management International Programme Grande Ecole', inst: 'Skema Business School / ESIEA, Paris, France', period: '2020 – 2023', note: '2021 année de césure professionnelle' },
      { degree: 'Bachelor de Commerce – Commerce International & Management', inst: "Université d'Auckland, Auckland, Nouvelle-Zélande", period: '2017 – 2019' },
      { degree: 'Baccalauréat Général Scientifique', inst: 'Lycée Blaise Pascal, Nouméa, Nouvelle-Calédonie', period: '2013 – 2015' },
    ],
    skillsHeading: 'Compétences',
    skills: 'Agile (Scrum, Kanban) • Cadrage & pilotage de projet • Gestion des parties prenantes • Matrice RACI / MoSCoW • RGPD & Privacy by Design • IA générative & éthique IA • Gouvernance des données • Jira / Confluence / Trello • Python & SQL',
    projHeading: 'Projets Clés',
    projects: [
      { name: "Stratégie du numérique et de l'audiovisuel polynésien", meta: 'Gouvernement de la Polynésie Française, 2024' },
      { name: 'Livraison de POCs en IA Générative (x2)', meta: 'Crédit Agricole S.A, DataLab, 2023' },
      { name: 'Programme Veille IA Green', meta: 'Crédit Agricole S.A, DataLab, 2023' },
    ],
    certHeading: 'Certifications',
    certs: ['Elements of AI – IA & Éthique, University of Helsinki (2026)', "L'Atelier RGPD – Protection des Données, CNIL (2025)", 'Cambridge Advanced English (CAE) C1 (2025)', 'Agile PM Certification (2023)'],
    langHeading: 'Langues',
    languages: 'Français (Maternelle) • Anglais (Courant – C1, CAE) • Vietnamien (Débutant)',
    hobbiesHeading: 'Loisirs',
    hobbies: 'Yoga & Pilates • Gastronomie • Danse contemporaine • Jeunes IHEDN',
  },
  en: {
    title: 'Digital Transformation Data & AI Project Manager',
    profile: { heading: 'Profile', text: "Working towards ethical, human-centered Data and AI is one of my core objectives. Born and raised in a multicultural environment, I draw on this open-mindedness to bridge the dialogue between the public and private sectors, convinced that collective intelligence is essential to success. Bilingual French-English with international experience across Europe and Oceania, my journey has forged a proven ability to coordinate multidisciplinary teams within complex ecosystems. My approach seeks the right balance: delivering measurable outcomes through Agile and governance frameworks (GDPR), while making complexity accessible to turn every project into a driver of shared progress and digital acculturation." },
    expHeading: 'Professional Experience',
    roles: [
      { role: 'Project Officer – Digital & Audiovisual', company: 'Government of French Polynesia (Tahiti)', period: 'Mar 2024 – Nov 2024', bullets: ['Mapped 20+ key stakeholders via Stakeholder Mapping, aligning public/private roadmaps for digital and audiovisual sectors', 'Served as liaison between government leadership and DGEN, translating 3 policy pillars into a co-constructed operational roadmap', 'Conducted regulatory impact analysis on 2 public infrastructure projects, identifying 10 critical risk points'] },
      { role: 'Assistant Project Manager – Data & AI', company: 'Crédit Agricole S.A, DataLab (Paris)', period: 'Jun 2023 – Nov 2023', bullets: ['Structured a 10-person cross-functional team via RACI Matrix, reducing decision-making latency by 15%', 'Scoped 2 Generative AI Proofs of Concept (POCs) via MoSCoW, delivering testable product in under 4 months', 'Led "Green AI Watch" workshops, achieving 90% satisfaction across technical and business teams'] },
      { role: 'Marketing Assistant – Business Development', company: 'Les Belles Envies (Paris)', period: 'Sep 2021 – Dec 2021', bullets: ['Designed product visuals, led commercial prospecting and created pre-contractual documentation', 'Translated commercial brochures French/English for international development'] },
      { role: 'Marketing Assistant', company: 'American Express OFINA (Tahiti)', period: 'Feb 2021 – Aug 2021', bullets: ['Strategic communication plans for regional banking products, visual materials and competitive analysis'] },
      { role: 'Marketing & Communication Assistant', company: 'Air Calédonie (New Caledonia)', period: 'Jan 2018 – Mar 2018', bullets: ['Designed brand visuals and managed sponsoring for annual corporate teambuilding event'] },
    ],
    eduHeading: 'Education',
    degrees: [
      { degree: 'MSc Artificial Intelligence for Business Transformation', inst: 'Skema Business School / ESIEA, Paris, France', period: '2020 – 2023' },
      { degree: 'Master in International Management – Grande École Programme', inst: 'Skema Business School / ESIEA, Paris, France', period: '2020 – 2023', note: '2021 professional gap year' },
      { degree: 'Bachelor of Commerce – International Business & Management', inst: 'University of Auckland, Auckland, New Zealand', period: '2017 – 2019' },
      { degree: 'Scientific Baccalaureate', inst: 'Lycée Blaise Pascal, Nouméa, New Caledonia', period: '2013 – 2015' },
    ],
    skillsHeading: 'Skills',
    skills: 'Agile (Scrum, Kanban) • Project Scoping & Steering • Stakeholder Management • RACI Matrix / MoSCoW • GDPR & Privacy by Design • Generative AI & AI Ethics • Data Governance • Jira / Confluence / Trello • Python & SQL',
    projHeading: 'Key Projects',
    projects: [
      { name: 'Polynesian Digital & Audiovisual Strategy', meta: 'Government of French Polynesia, 2024' },
      { name: 'Generative AI POC Delivery (x2)', meta: 'Crédit Agricole S.A, DataLab, 2023' },
      { name: 'Green AI Watch Program', meta: 'Crédit Agricole S.A, DataLab, 2023' },
    ],
    certHeading: 'Certifications',
    certs: ['Elements of AI – AI & Ethics, University of Helsinki (2026)', "L'Atelier RGPD – Data Protection, CNIL (2025)", 'Cambridge Advanced English (CAE) C1 (2025)', 'Agile PM Certification (2023)'],
    langHeading: 'Languages',
    languages: 'French (Native) • English (Fluent – C1, CAE) • Vietnamese (Beginner)',
    hobbiesHeading: 'Hobbies',
    hobbies: 'Yoga & Pilates • Gastronomy • Contemporary Dance • Jeunes IHEDN',
  },
}

export default function ATSResume({ isEditing, lang = 'fr' }) {
  const editable = isEditing || undefined
  const d = content[lang]
  const prefix = lang === 'fr' ? 'ats' : 'ats-en'

  return (
    <div className="ats-resume">
      {/* Header */}
      <header className="ats-header">
        <h1 data-key={`${prefix}-name`} contentEditable={editable} suppressContentEditableWarning>Kim Hilaire</h1>
        <p className="ats-title" data-key={`${prefix}-title`} contentEditable={editable} suppressContentEditableWarning>{d.title}</p>
        <div className="ats-contact">
          <span>(+33) 6 26 21 13 55</span>
          <span className="ats-sep">|</span>
          <a href="mailto:kimhilaire@yahoo.fr" className="ats-link">kimhilaire@yahoo.fr</a>
          <span className="ats-sep">|</span>
          <a href="https://www.linkedin.com/in/kim-h-618bb9202/" target="_blank" rel="noopener noreferrer" className="ats-link">kim hilaire</a>
          <span className="ats-sep">|</span>
          <a href="https://portfolio-kimh.vercel.app" target="_blank" rel="noopener noreferrer" className="ats-link">portfolio-kimh.vercel.app</a>
        </div>
      </header>

      {/* Profile */}
      <section className="ats-section">
        <h2>{d.profile.heading}</h2>
        <p data-key={`${prefix}-profil`} contentEditable={editable} suppressContentEditableWarning>{d.profile.text}</p>
      </section>

      {/* Experience */}
      <section className="ats-section">
        <h2>{d.expHeading}</h2>
        {d.roles.map((r, i) => (
          <div className="ats-entry" key={i}>
            <div className="ats-entry-header">
              <div className="ats-entry-left">
                <span className="ats-entry-role" data-key={`${prefix}-exp${i + 1}-role`} contentEditable={editable} suppressContentEditableWarning>{r.role}</span>
                <span className="ats-entry-org" data-key={`${prefix}-exp${i + 1}-company`} contentEditable={editable} suppressContentEditableWarning>{r.company}</span>
              </div>
              <span className="ats-entry-date">{r.period}</span>
            </div>
            <ul>
              {r.bullets.map((b, j) => (
                <li key={j} data-key={`${prefix}-exp${i + 1}-b${j + 1}`} contentEditable={editable} suppressContentEditableWarning>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="ats-section">
        <h2>{d.eduHeading}</h2>
        {d.degrees.map((deg, i) => (
          <div className="ats-entry" key={i}>
            <div className="ats-entry-header">
              <div className="ats-entry-left">
                <span className="ats-entry-role">{deg.degree}</span>
                <span className="ats-entry-org">{deg.inst}</span>
              </div>
              <span className="ats-entry-date">{deg.period}</span>
            </div>
            {deg.note && <p className="ats-note">{deg.note}</p>}
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="ats-section">
        <h2>{d.skillsHeading}</h2>
        <p className="ats-skills-line" data-key={`${prefix}-skills`} contentEditable={editable} suppressContentEditableWarning>{d.skills}</p>
      </section>

      {/* Key Projects */}
      <section className="ats-section">
        <h2>{d.projHeading}</h2>
        {d.projects.map((p, i) => (
          <div className="ats-entry" key={i}>
            <div className="ats-entry-header">
              <div className="ats-entry-left">
                <span className="ats-entry-role">{p.name}</span>
                <span className="ats-entry-org">{p.meta}</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Certifications */}
      <section className="ats-section">
        <h2>{d.certHeading}</h2>
        <ul className="ats-cert-list">
          {d.certs.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
      </section>

      {/* Languages */}
      <section className="ats-section">
        <h2>{d.langHeading}</h2>
        <p className="ats-skills-line">{d.languages}</p>
      </section>

      {/* Hobbies */}
      <section className="ats-section">
        <h2>{d.hobbiesHeading}</h2>
        <p className="ats-skills-line">{d.hobbies}</p>
      </section>
    </div>
  )
}

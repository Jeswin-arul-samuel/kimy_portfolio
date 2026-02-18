import { useRef, useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { QRCodeSVG } from 'qrcode.react'
import './Resume.css'

const STORAGE_KEY = 'resume_edits'

export default function ResumePage() {
  const resumeRef = useRef(null)
  const [isEditing, setIsEditing] = useState(false)

  // Restore saved edits from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved || !resumeRef.current) return
    try {
      const edits = JSON.parse(saved)
      Object.entries(edits).forEach(([key, html]) => {
        const el = resumeRef.current.querySelector(`[data-key="${key}"]`)
        if (el) el.innerHTML = html
      })
    } catch { /* ignore corrupt data */ }
  }, [])

  // Save all editable content to localStorage
  const saveEdits = useCallback(() => {
    if (!resumeRef.current) return
    const edits = {}
    resumeRef.current.querySelectorAll('[data-key]').forEach(el => {
      edits[el.dataset.key] = el.innerHTML
    })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(edits))
  }, [])

  // Toggle editing — save when finishing
  const handleToggleEdit = () => {
    if (isEditing) saveEdits()
    setIsEditing(prev => !prev)
  }

  // Reset to defaults
  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY)
    window.location.reload()
  }

  const handleDownload = async () => {
    if (!resumeRef.current) return
    const el = resumeRef.current

    // Strip edit-mode artifacts before capture
    el.classList.remove('is-editing')
    el.querySelectorAll('[contenteditable]').forEach(node => {
      node.setAttribute('contenteditable', 'false')
    })

    // Strip screen-only styles before capture
    el.style.margin = '0'
    el.style.boxShadow = 'none'

    const canvas = await html2canvas(el, { scale: 2, useCORS: true })

    // Create a single-page A4 PDF and fit the image into it
    const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })
    const imgData = canvas.toDataURL('image/jpeg', 0.98)
    pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297)
    pdf.save('CV_Kim_Hilaire.pdf')

    // Restore screen styles and edit state
    el.style.margin = ''
    el.style.boxShadow = ''
    if (isEditing) {
      el.classList.add('is-editing')
      el.querySelectorAll('[contenteditable]').forEach(node => {
        node.setAttribute('contenteditable', 'true')
      })
    }
  }

  // Only show admin buttons on localhost (not on Vercel)
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'

  // When not editing, attribute is absent (undefined removes it from DOM)
  const editable = (isEditing && isLocal) || undefined

  return (
    <>
      <div className="resume-toolbar">
        <Link to="/" className="resume-back-link">&larr; Retour au site</Link>
        {isLocal && (
          <div className="resume-toolbar-actions">
            <button
              className={`resume-edit-btn${isEditing ? ' active' : ''}`}
              onClick={handleToggleEdit}
            >
              {isEditing ? 'Terminer' : 'Modifier'}
            </button>
            <button className="resume-reset-btn" onClick={handleReset}>
              Réinitialiser
            </button>
            <button className="resume-download-btn" onClick={handleDownload}>
              Télécharger PDF
            </button>
          </div>
        )}
      </div>

      <div className={`resume-page${isEditing ? ' is-editing' : ''}`} ref={resumeRef}>
        {/* ===== LEFT SIDEBAR ===== */}
        <aside className="resume-sidebar">
          <img src="/dp.jpeg" alt="Kim Hilaire" className="resume-photo" />

          <div className="resume-sidebar-name">
            <h1 data-key="sidebar-name" contentEditable={editable} suppressContentEditableWarning>Kim Hilaire</h1>
            <p data-key="sidebar-title" contentEditable={editable} suppressContentEditableWarning>Chef de Projet<br />Transformation Digitale<br />Data &amp; IA</p>
          </div>

          {/* Contact */}
          <div className="resume-sidebar-section">
            <h2 data-key="contact-title" contentEditable={editable} suppressContentEditableWarning>Contact</h2>
            <ul className="resume-contact-list">
              <li>
                <span className="resume-contact-icon">&#9742;</span>
                <a href="tel:+33626211355" className="resume-contact-link" data-key="contact-phone" contentEditable={editable} suppressContentEditableWarning>(+33) 6 26 21 13 55</a>
              </li>
              <li>
                <span className="resume-contact-icon">&#9993;</span>
                <a href="mailto:kimhilaire@yahoo.fr" className="resume-contact-link" data-key="contact-email" contentEditable={editable} suppressContentEditableWarning>kimhilaire@yahoo.fr</a>
              </li>
              <li>
                <span className="resume-contact-icon">in</span>
                <a href="https://www.linkedin.com/in/kim-h-618bb9202/" target="_blank" rel="noopener noreferrer" className="resume-contact-link" data-key="contact-linkedin" contentEditable={editable} suppressContentEditableWarning>kim hilaire</a>
              </li>
            </ul>
          </div>

          {/* Compétences */}
          <div className="resume-sidebar-section">
            <h2 data-key="skills-title" contentEditable={editable} suppressContentEditableWarning>Compétences</h2>
            <ul className="resume-skills-list">
              <li data-key="skill-1" contentEditable={editable} suppressContentEditableWarning>Agile (Scrum, Kanban)</li>
              <li data-key="skill-2" contentEditable={editable} suppressContentEditableWarning>Cadrage &amp; pilotage de projet</li>
              <li data-key="skill-3" contentEditable={editable} suppressContentEditableWarning>Gestion des parties prenantes</li>
              <li data-key="skill-4" contentEditable={editable} suppressContentEditableWarning>Matrice RACI / MoSCoW</li>
              <li data-key="skill-5" contentEditable={editable} suppressContentEditableWarning>RGPD &amp; Privacy by Design</li>
              <li data-key="skill-6" contentEditable={editable} suppressContentEditableWarning>IA générative &amp; éthique IA</li>
              <li data-key="skill-7" contentEditable={editable} suppressContentEditableWarning>Gouvernance des données</li>
              <li data-key="skill-8" contentEditable={editable} suppressContentEditableWarning>Jira / Confluence / Trello</li>
              <li data-key="skill-9" contentEditable={editable} suppressContentEditableWarning>Python &amp; SQL</li>
            </ul>
          </div>

          {/* Langues */}
          <div className="resume-sidebar-section">
            <h2 data-key="lang-title" contentEditable={editable} suppressContentEditableWarning>Langues</h2>

            <div className="resume-lang-item">
              <span data-key="lang-1-name" contentEditable={editable} suppressContentEditableWarning>Français</span>
              <span className="resume-lang-level" data-key="lang-1-level" contentEditable={editable} suppressContentEditableWarning>Maternelle</span>
            </div>

            <div className="resume-lang-item">
              <span data-key="lang-2-name" contentEditable={editable} suppressContentEditableWarning>Anglais</span>
              <span className="resume-lang-level" data-key="lang-2-level" contentEditable={editable} suppressContentEditableWarning>Courant – C1 (CAE)</span>
            </div>

            <div className="resume-lang-item">
              <span data-key="lang-3-name" contentEditable={editable} suppressContentEditableWarning>Vietnamien</span>
              <span className="resume-lang-level" data-key="lang-3-level" contentEditable={editable} suppressContentEditableWarning>Débutant</span>
            </div>
          </div>

          {/* Loisirs */}
          <div className="resume-sidebar-section">
            <h2 data-key="hobbies-title" contentEditable={editable} suppressContentEditableWarning>Loisirs</h2>
            <ul className="resume-hobbies-list">
              <li data-key="hobby-1" contentEditable={editable} suppressContentEditableWarning>Yoga &amp; Pilates</li>
              <li data-key="hobby-2" contentEditable={editable} suppressContentEditableWarning>Gastronomie</li>
              <li data-key="hobby-3" contentEditable={editable} suppressContentEditableWarning>Danse contemporaine</li>
              <li data-key="hobby-4" contentEditable={editable} suppressContentEditableWarning>Jeunes IHEDN</li>
            </ul>
          </div>

          {/* QR Code */}
          <div className="resume-sidebar-section resume-qr-section">
            <h2 data-key="qr-title" contentEditable={editable} suppressContentEditableWarning>Portfolio</h2>
            <div className="resume-qr-wrapper">
              <QRCodeSVG
                value="https://portfolio-kimh.vercel.app"
                size={150}
                bgColor="transparent"
                fgColor="#ffffff"
                level="M"
              />
              <span className="resume-qr-label" data-key="qr-label" contentEditable={editable} suppressContentEditableWarning>portfolio-kimh.vercel.app</span>
            </div>
          </div>
        </aside>

        {/* ===== RIGHT MAIN ===== */}
        <main className="resume-main">
          {/* Profil */}
          <section className="resume-section resume-profil">
            <h2 data-key="profil-title" contentEditable={editable} suppressContentEditableWarning>Profil</h2>
            <p data-key="profil-text" contentEditable={editable} suppressContentEditableWarning>
              Œuvrer pour une Data &amp; IA centrée sur l'humain est l'un de mes objectifs. Ayant grandi dans un
              environnement multiculturel, je m'appuie sur cette ouverture d'esprit pour faciliter le dialogue entre le
              secteur public et privé, convaincue que l'intelligence collective est essentielle à la réussite.
              Bilingue français-anglais avec une expérience internationale en Europe et en Océanie, mon parcours
              m'a forgée une capacité prouvée à coordonner des équipes pluridisciplinaires au sein d'écosystèmes
              complexes. Mon intervention vise un juste équilibre : délivrer des résultats mesurables via des
              frameworks agiles et de gouvernance (RGPD), tout en vulgarisant la complexité pour faire de chaque
              projet un levier d'acculturation et de progrès partagé.
            </p>
          </section>

          {/* Expériences Professionnelles */}
          <section className="resume-section">
            <h2 data-key="exp-title" contentEditable={editable} suppressContentEditableWarning>Expériences Professionnelles</h2>

            <div className="resume-exp-entry">
              <div className="resume-exp-header">
                <span className="resume-exp-title" data-key="exp1-role" contentEditable={editable} suppressContentEditableWarning>Chargée de Mission – Numérique &amp; Audiovisuel</span>
                <span className="resume-exp-period" data-key="exp1-period" contentEditable={editable} suppressContentEditableWarning>Mars 2024 – Nov. 2024</span>
              </div>
              <div className="resume-exp-company" data-key="exp1-company" contentEditable={editable} suppressContentEditableWarning>Gouvernement de la Polynésie Française (Tahiti)</div>
              <ul className="resume-exp-bullets">
                <li data-key="exp1-b1" contentEditable={editable} suppressContentEditableWarning>Cartographie de 20+ acteurs clés via un stakeholder mapping, alignant les feuilles de route publique/privée</li>
                <li data-key="exp1-b2" contentEditable={editable} suppressContentEditableWarning>Référent direction/Direction Générale de l'Economie Numérique (DGEN), traduction et co-construction de 3 axes politiques en feuille de route opérationnelle</li>
                <li data-key="exp1-b3" contentEditable={editable} suppressContentEditableWarning>Analyse d'impact réglementaire sur 2 projets d'infrastructures publiques, identifiant 10 points de risques</li>
              </ul>
            </div>

            <div className="resume-exp-entry">
              <div className="resume-exp-header">
                <span className="resume-exp-title" data-key="exp2-role" contentEditable={editable} suppressContentEditableWarning>Assistante Chef de Projet – Data &amp; IA</span>
                <span className="resume-exp-period" data-key="exp2-period" contentEditable={editable} suppressContentEditableWarning>Juin 2023 – Nov. 2023</span>
              </div>
              <div className="resume-exp-company" data-key="exp2-company" contentEditable={editable} suppressContentEditableWarning>Crédit Agricole S.A, DataLab (Paris)</div>
              <ul className="resume-exp-bullets">
                <li data-key="exp2-b1" contentEditable={editable} suppressContentEditableWarning>Structuration d'une équipe transverse de 10 personnes via une matrice RACI, -15% latence décisionnelle</li>
                <li data-key="exp2-b2" contentEditable={editable} suppressContentEditableWarning>Cadrage de 2 Preuves de Concept (POCs) en IA Générative via MoSCoW, livrable testable en moins de 4 mois</li>
                <li data-key="exp2-b3" contentEditable={editable} suppressContentEditableWarning>Pilotage ateliers « Veille IA Green », 90% satisfaction équipes techniques et métier</li>
              </ul>
            </div>

            <div className="resume-exp-entry">
              <div className="resume-exp-header">
                <span className="resume-exp-title" data-key="exp3-role" contentEditable={editable} suppressContentEditableWarning>Assistante Marketing – Développement Commercial</span>
                <span className="resume-exp-period" data-key="exp3-period" contentEditable={editable} suppressContentEditableWarning>Sept. 2021 – Déc. 2021</span>
              </div>
              <div className="resume-exp-company" data-key="exp3-company" contentEditable={editable} suppressContentEditableWarning>Les Belles Envies (Paris)</div>
              <ul className="resume-exp-bullets">
                <li data-key="exp3-b1" contentEditable={editable} suppressContentEditableWarning>Conception visuels produits, prospection commerciale et création de document d'information précontractuel</li>
                <li data-key="exp3-b2" contentEditable={editable} suppressContentEditableWarning>Traduction brochures commerciales français/anglais pour le développement international</li>
              </ul>
            </div>

            <div className="resume-exp-entry">
              <div className="resume-exp-header">
                <span className="resume-exp-title" data-key="exp4-role" contentEditable={editable} suppressContentEditableWarning>Assistante Marketing</span>
                <span className="resume-exp-period" data-key="exp4-period" contentEditable={editable} suppressContentEditableWarning>Fév. 2021 – Août 2021</span>
              </div>
              <div className="resume-exp-company" data-key="exp4-company" contentEditable={editable} suppressContentEditableWarning>American Express OFINA (Tahiti)</div>
              <ul className="resume-exp-bullets">
                <li data-key="exp4-b1" contentEditable={editable} suppressContentEditableWarning>Plans de communication produits bancaires régionaux, supports visuels et analyses concurrentielles</li>
              </ul>
            </div>

            <div className="resume-exp-entry">
              <div className="resume-exp-header">
                <span className="resume-exp-title" data-key="exp5-role" contentEditable={editable} suppressContentEditableWarning>Assistante Marketing &amp; Communication</span>
                <span className="resume-exp-period" data-key="exp5-period" contentEditable={editable} suppressContentEditableWarning>Jan. 2018 – Mars 2018</span>
              </div>
              <div className="resume-exp-company" data-key="exp5-company" contentEditable={editable} suppressContentEditableWarning>Air Calédonie (Nouvelle-Calédonie)</div>
              <ul className="resume-exp-bullets">
                <li data-key="exp5-b1" contentEditable={editable} suppressContentEditableWarning>Conception visuels de marque et gestion sponsoring événement teambuilding annuel</li>
              </ul>
            </div>
          </section>

          {/* Formations */}
          <section className="resume-section">
            <h2 data-key="edu-title" contentEditable={editable} suppressContentEditableWarning>Formations</h2>

            <div className="resume-edu-entry">
              <div className="resume-edu-header">
                <span className="resume-edu-degree" data-key="edu1b-degree" contentEditable={editable} suppressContentEditableWarning>MSc Artificial Intelligence for Business Transformation</span>
                <span className="resume-edu-period" data-key="edu1b-period" contentEditable={editable} suppressContentEditableWarning>2020 – 2023</span>
              </div>
              <div className="resume-edu-institution" data-key="edu1b-inst" contentEditable={editable} suppressContentEditableWarning>Skema Business School / ESIEA, Paris, France</div>
            </div>

            <div className="resume-edu-entry">
              <div className="resume-edu-header">
                <span className="resume-edu-degree" data-key="edu1a-degree" contentEditable={editable} suppressContentEditableWarning>Master en Management International Programme Grande Ecole</span>
                <span className="resume-edu-period" data-key="edu1a-period" contentEditable={editable} suppressContentEditableWarning>2020 – 2023</span>
              </div>
              <div className="resume-edu-institution" data-key="edu1a-inst" contentEditable={editable} suppressContentEditableWarning>Skema Business School / ESIEA, Paris, France</div>
              <div className="resume-edu-note" data-key="edu1a-note" contentEditable={editable} suppressContentEditableWarning>2021 année de césure professionnelle</div>
            </div>

            <div className="resume-edu-entry">
              <div className="resume-edu-header">
                <span className="resume-edu-degree" data-key="edu2-degree" contentEditable={editable} suppressContentEditableWarning>Bachelor de Commerce – Commerce International &amp; Management</span>
                <span className="resume-edu-period" data-key="edu2-period" contentEditable={editable} suppressContentEditableWarning>2017 – 2019</span>
              </div>
              <div className="resume-edu-institution" data-key="edu2-inst" contentEditable={editable} suppressContentEditableWarning>Université d'Auckland, Auckland, Nouvelle-Zélande</div>
            </div>

            <div className="resume-edu-entry">
              <div className="resume-edu-header">
                <span className="resume-edu-degree" data-key="edu3-degree" contentEditable={editable} suppressContentEditableWarning>Baccalauréat Général Scientifique</span>
                <span className="resume-edu-period" data-key="edu3-period" contentEditable={editable} suppressContentEditableWarning>2013 – 2015</span>
              </div>
              <div className="resume-edu-institution" data-key="edu3-inst" contentEditable={editable} suppressContentEditableWarning>Lycée Blaise Pascal, Nouméa, Nouvelle-Calédonie</div>
            </div>
          </section>

          {/* Projets Clés */}
          <section className="resume-section">
            <h2 data-key="proj-title" contentEditable={editable} suppressContentEditableWarning>Projets Clés</h2>
            <ul className="resume-projects-list">
              <li>
                <span data-key="proj1-name" contentEditable={editable} suppressContentEditableWarning>Stratégie du numérique et de l'audiovisuel polynésien</span>
                <span className="resume-project-meta" data-key="proj1-meta" contentEditable={editable} suppressContentEditableWarning>Gouvernement de la Polynésie Française, 2024</span>
              </li>
              <li>
                <span data-key="proj2-name" contentEditable={editable} suppressContentEditableWarning>Livraison de POCs en IA Générative (x2)</span>
                <span className="resume-project-meta" data-key="proj2-meta" contentEditable={editable} suppressContentEditableWarning>Crédit Agricole S.A, DataLab, 2023</span>
              </li>
              <li>
                <span data-key="proj5-name" contentEditable={editable} suppressContentEditableWarning>Programme Veille IA Green</span>
                <span className="resume-project-meta" data-key="proj5-meta" contentEditable={editable} suppressContentEditableWarning>Crédit Agricole S.A, DataLab, 2023</span>
              </li>
            </ul>
          </section>

          {/* Certifications */}
          <section className="resume-section">
            <h2 data-key="cert-title" contentEditable={editable} suppressContentEditableWarning>Certifications</h2>
            <ul className="resume-cert-list">
              <li data-key="cert-1" contentEditable={editable} suppressContentEditableWarning>Elements of AI – IA &amp; Éthique, University of Helsinki <span className="resume-cert-year">(2026)</span></li>
              <li data-key="cert-2" contentEditable={editable} suppressContentEditableWarning>L'Atelier RGPD – Protection des Données, CNIL <span className="resume-cert-year">(2025)</span></li>
              <li data-key="cert-3" contentEditable={editable} suppressContentEditableWarning>Cambridge Advanced English (CAE) C1 <span className="resume-cert-year">(2025)</span></li>
              <li data-key="cert-4" contentEditable={editable} suppressContentEditableWarning>Agile PM Certification <span className="resume-cert-year">(2023)</span></li>
            </ul>
          </section>
        </main>
      </div>
    </>
  )
}

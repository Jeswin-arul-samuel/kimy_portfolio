import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { QRCodeSVG } from 'qrcode.react'
import './Resume.css'

export default function ResumePage() {
  const resumeRef = useRef(null)
  const [isEditing, setIsEditing] = useState(false)

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

  // When not editing, attribute is absent (undefined removes it from DOM)
  const editable = isEditing || undefined

  return (
    <>
      <div className="resume-toolbar">
        <Link to="/" className="resume-back-link">&larr; Retour au site</Link>
        <div className="resume-toolbar-actions">
          <button
            className={`resume-edit-btn${isEditing ? ' active' : ''}`}
            onClick={() => setIsEditing(prev => !prev)}
          >
            {isEditing ? 'Terminer' : 'Modifier'}
          </button>
          <button className="resume-download-btn" onClick={handleDownload}>
            Télécharger PDF
          </button>
        </div>
      </div>

      <div className={`resume-page${isEditing ? ' is-editing' : ''}`} ref={resumeRef}>
        {/* ===== LEFT SIDEBAR ===== */}
        <aside className="resume-sidebar">
          <img src="/dp.jpeg" alt="Kim Hilaire" className="resume-photo" />

          <div className="resume-sidebar-name">
            <h1 contentEditable={editable} suppressContentEditableWarning>Kim Hilaire</h1>
            <p contentEditable={editable} suppressContentEditableWarning>Chef de Projet<br />Transformation Digitale &amp; Data</p>
          </div>

          {/* Contact */}
          <div className="resume-sidebar-section">
            <h2 contentEditable={editable} suppressContentEditableWarning>Contact</h2>
            <ul className="resume-contact-list">
              <li>
                <span className="resume-contact-icon">&#9742;</span>
                <a href="tel:+33626211355" className="resume-contact-link" contentEditable={editable} suppressContentEditableWarning>(+33) 6 26 21 13 55</a>
              </li>
              <li>
                <span className="resume-contact-icon">&#9993;</span>
                <a href="mailto:kimhilaire@yahoo.fr" className="resume-contact-link" contentEditable={editable} suppressContentEditableWarning>kimhilaire@yahoo.fr</a>
              </li>
              <li>
                <span className="resume-contact-icon">in</span>
                <a href="https://www.linkedin.com/in/kim-h-618bb9202/" target="_blank" rel="noopener noreferrer" className="resume-contact-link" contentEditable={editable} suppressContentEditableWarning>linkedin.com/in/kim-h-618bb9202</a>
              </li>
            </ul>
          </div>

          {/* Compétences */}
          <div className="resume-sidebar-section">
            <h2 contentEditable={editable} suppressContentEditableWarning>Compétences</h2>
            <ul className="resume-skills-list">
              <li contentEditable={editable} suppressContentEditableWarning>Agile (Scrum, Kanban)</li>
              <li contentEditable={editable} suppressContentEditableWarning>Cadrage &amp; Pilotage de Projet</li>
              <li contentEditable={editable} suppressContentEditableWarning>Gestion des Parties Prenantes</li>
              <li contentEditable={editable} suppressContentEditableWarning>Matrice RACI / MoSCoW</li>
              <li contentEditable={editable} suppressContentEditableWarning>RGPD &amp; Privacy by Design</li>
              <li contentEditable={editable} suppressContentEditableWarning>IA Générative &amp; Éthique IA</li>
              <li contentEditable={editable} suppressContentEditableWarning>Gouvernance des Données</li>
              <li contentEditable={editable} suppressContentEditableWarning>Jira / Confluence / Trello</li>
              <li contentEditable={editable} suppressContentEditableWarning>Python &amp; SQL</li>
            </ul>
          </div>

          {/* Langues */}
          <div className="resume-sidebar-section">
            <h2 contentEditable={editable} suppressContentEditableWarning>Langues</h2>

            <div className="resume-lang-item">
              <div className="resume-lang-label">
                <span contentEditable={editable} suppressContentEditableWarning>Français</span>
                <span contentEditable={editable} suppressContentEditableWarning>Maternelle</span>
              </div>
              <div className="resume-lang-bar">
                <div className="resume-lang-fill" style={{ width: '100%' }} />
              </div>
            </div>

            <div className="resume-lang-item">
              <div className="resume-lang-label">
                <span contentEditable={editable} suppressContentEditableWarning>Anglais</span>
                <span contentEditable={editable} suppressContentEditableWarning>C1 (CAE)</span>
              </div>
              <div className="resume-lang-bar">
                <div className="resume-lang-fill" style={{ width: '85%' }} />
              </div>
            </div>

            <div className="resume-lang-item">
              <div className="resume-lang-label">
                <span contentEditable={editable} suppressContentEditableWarning>Espagnol</span>
                <span contentEditable={editable} suppressContentEditableWarning>B2</span>
              </div>
              <div className="resume-lang-bar">
                <div className="resume-lang-fill" style={{ width: '65%' }} />
              </div>
            </div>

            <div className="resume-lang-item">
              <div className="resume-lang-label">
                <span contentEditable={editable} suppressContentEditableWarning>Vietnamien</span>
                <span contentEditable={editable} suppressContentEditableWarning>Débutant</span>
              </div>
              <div className="resume-lang-bar">
                <div className="resume-lang-fill" style={{ width: '20%' }} />
              </div>
            </div>
          </div>

          {/* Loisirs */}
          <div className="resume-sidebar-section">
            <h2 contentEditable={editable} suppressContentEditableWarning>Loisirs</h2>
            <ul className="resume-hobbies-list">
              <li contentEditable={editable} suppressContentEditableWarning>Yoga &amp; Pilates</li>
              <li contentEditable={editable} suppressContentEditableWarning>Gastronomie</li>
              <li contentEditable={editable} suppressContentEditableWarning>Danse Contemporaine</li>
              <li contentEditable={editable} suppressContentEditableWarning>Jeunes IHEDN</li>
            </ul>
          </div>

          {/* QR Code */}
          <div className="resume-sidebar-section resume-qr-section">
            <h2 contentEditable={editable} suppressContentEditableWarning>Portfolio</h2>
            <div className="resume-qr-wrapper">
              <QRCodeSVG
                value="https://portfolio-kimh.vercel.app"
                size={150}
                bgColor="transparent"
                fgColor="#ffffff"
                level="M"
              />
              <span className="resume-qr-label" contentEditable={editable} suppressContentEditableWarning>portfolio-kimh.vercel.app</span>
            </div>
          </div>
        </aside>

        {/* ===== RIGHT MAIN ===== */}
        <main className="resume-main">
          {/* Profil */}
          <section className="resume-section resume-profil">
            <h2 contentEditable={editable} suppressContentEditableWarning>Profil</h2>
            <p contentEditable={editable} suppressContentEditableWarning>
              Œuvrer pour une Data &amp; IA centrée sur l'humain. Née et grandie dans un environnement
              multiculturel, je m'appuie sur cette ouverture d'esprit pour faciliter le dialogue entre
              le secteur public et privé, convaincue que l'intelligence collective est essentielle à
              la réussite. Bilingue français-anglais avec
              une expérience internationale en Europe et en Océanie, mon parcours m'a forgée une
              capacité prouvée à coordonner des équipes pluridisciplinaires au sein d'écosystèmes
              complexes. Mon intervention vise un juste équilibre : délivrer des résultats mesurables
              via des frameworks agiles et de gouvernance (RGPD), tout en vulgarisant la complexité
              pour faire de chaque projet un levier d'acculturation et de progrès partagé.
            </p>
          </section>

          {/* Expériences Professionnelles */}
          <section className="resume-section">
            <h2 contentEditable={editable} suppressContentEditableWarning>Expériences Professionnelles</h2>

            <div className="resume-exp-entry">
              <div className="resume-exp-header">
                <span className="resume-exp-title" contentEditable={editable} suppressContentEditableWarning>Chargée de Mission – Numérique &amp; Audiovisuel</span>
                <span className="resume-exp-period" contentEditable={editable} suppressContentEditableWarning>Mars 2024 – Nov. 2024</span>
              </div>
              <div className="resume-exp-company" contentEditable={editable} suppressContentEditableWarning>Gouvernement de la Polynésie Française</div>
              <ul className="resume-exp-bullets">
                <li contentEditable={editable} suppressContentEditableWarning>Cartographie de 20+ acteurs clés via un Stakeholder Mapping, alignant les feuilles de route publique/privée</li>
                <li contentEditable={editable} suppressContentEditableWarning>Référent direction/DGEN, traduction de 3 axes politiques en feuille de route opérationnelle co-construite</li>
                <li contentEditable={editable} suppressContentEditableWarning>Analyse d'impact réglementaire sur 2 projets d'infrastructures publiques, identifiant 10 points de risque</li>
              </ul>
            </div>

            <div className="resume-exp-entry">
              <div className="resume-exp-header">
                <span className="resume-exp-title" contentEditable={editable} suppressContentEditableWarning>Assistante Chef de Projet – Data &amp; IA</span>
                <span className="resume-exp-period" contentEditable={editable} suppressContentEditableWarning>Juin 2023 – Nov. 2023</span>
              </div>
              <div className="resume-exp-company" contentEditable={editable} suppressContentEditableWarning>Crédit Agricole S.A, DataLab (Paris)</div>
              <ul className="resume-exp-bullets">
                <li contentEditable={editable} suppressContentEditableWarning>Structuration d'une équipe transverse de 10 personnes via Matrice RACI, -15% latence décisionnelle</li>
                <li contentEditable={editable} suppressContentEditableWarning>Cadrage de 2 POCs IA Générative via MoSCoW, livrable testable en moins de 4 mois</li>
                <li contentEditable={editable} suppressContentEditableWarning>Pilotage ateliers « Veille IA Green », 90% satisfaction équipes techniques et métier</li>
              </ul>
            </div>

            <div className="resume-exp-entry">
              <div className="resume-exp-header">
                <span className="resume-exp-title" contentEditable={editable} suppressContentEditableWarning>Assistante Marketing – Dév. Commercial</span>
                <span className="resume-exp-period" contentEditable={editable} suppressContentEditableWarning>Sept. 2021 – Déc. 2021</span>
              </div>
              <div className="resume-exp-company" contentEditable={editable} suppressContentEditableWarning>Les Belles Envies (Paris)</div>
              <ul className="resume-exp-bullets">
                <li contentEditable={editable} suppressContentEditableWarning>Conception visuels produits, prospection commerciale et création de DIP</li>
                <li contentEditable={editable} suppressContentEditableWarning>Traduction brochures commerciales FR → EN pour le développement international</li>
              </ul>
            </div>

            <div className="resume-exp-entry">
              <div className="resume-exp-header">
                <span className="resume-exp-title" contentEditable={editable} suppressContentEditableWarning>Assistante Marketing</span>
                <span className="resume-exp-period" contentEditable={editable} suppressContentEditableWarning>Fév. 2021 – Août 2021</span>
              </div>
              <div className="resume-exp-company" contentEditable={editable} suppressContentEditableWarning>American Express OFINA (Tahiti)</div>
              <ul className="resume-exp-bullets">
                <li contentEditable={editable} suppressContentEditableWarning>Plans de communication produits bancaires régionaux, supports visuels et analyses concurrentielles</li>
              </ul>
            </div>

            <div className="resume-exp-entry">
              <div className="resume-exp-header">
                <span className="resume-exp-title" contentEditable={editable} suppressContentEditableWarning>Assistante Marketing &amp; Communication</span>
                <span className="resume-exp-period" contentEditable={editable} suppressContentEditableWarning>Jan. 2018 – Mars 2018</span>
              </div>
              <div className="resume-exp-company" contentEditable={editable} suppressContentEditableWarning>Air Calédonie (Nouvelle-Calédonie)</div>
              <ul className="resume-exp-bullets">
                <li contentEditable={editable} suppressContentEditableWarning>Conception visuels de marque et gestion sponsoring événement teambuilding annuel</li>
              </ul>
            </div>
          </section>

          {/* Formations */}
          <section className="resume-section">
            <h2 contentEditable={editable} suppressContentEditableWarning>Formations</h2>

            <div className="resume-edu-entry">
              <div className="resume-edu-header">
                <span className="resume-edu-degree" contentEditable={editable} suppressContentEditableWarning>Master Management PGE / MSc AI for Business Transformation</span>
                <span className="resume-edu-period" contentEditable={editable} suppressContentEditableWarning>2020 – 2023</span>
              </div>
              <div className="resume-edu-institution" contentEditable={editable} suppressContentEditableWarning>Skema Business School / ESIEA France</div>
              <div className="resume-edu-note" contentEditable={editable} suppressContentEditableWarning>2021 année de césure professionnelle</div>
            </div>

            <div className="resume-edu-entry">
              <div className="resume-edu-header">
                <span className="resume-edu-degree" contentEditable={editable} suppressContentEditableWarning>Bachelor de Commerce – International &amp; Management</span>
                <span className="resume-edu-period" contentEditable={editable} suppressContentEditableWarning>2017 – 2019</span>
              </div>
              <div className="resume-edu-institution" contentEditable={editable} suppressContentEditableWarning>Université d'Auckland, Nouvelle-Zélande</div>
            </div>

            <div className="resume-edu-entry">
              <div className="resume-edu-header">
                <span className="resume-edu-degree" contentEditable={editable} suppressContentEditableWarning>Baccalauréat Général Scientifique</span>
                <span className="resume-edu-period" contentEditable={editable} suppressContentEditableWarning>2013 – 2015</span>
              </div>
              <div className="resume-edu-institution" contentEditable={editable} suppressContentEditableWarning>Lycée Blaise Pascal, Nouméa, Nouvelle-Calédonie</div>
            </div>
          </section>

          {/* Projets Clés */}
          <section className="resume-section">
            <h2 contentEditable={editable} suppressContentEditableWarning>Projets Clés</h2>
            <ul className="resume-projects-list">
              <li>
                <span contentEditable={editable} suppressContentEditableWarning>Stratégie Numérique &amp; Alignement de l'Écosystème</span>
                <span className="resume-project-meta" contentEditable={editable} suppressContentEditableWarning>Gouv. Polynésie Française, 2024</span>
              </li>
              <li>
                <span contentEditable={editable} suppressContentEditableWarning>Livraison de POCs en IA Générative (x2)</span>
                <span className="resume-project-meta" contentEditable={editable} suppressContentEditableWarning>Crédit Agricole S.A, 2023</span>
              </li>
              <li>
                <span contentEditable={editable} suppressContentEditableWarning>Évaluation des Risques Réglementaires</span>
                <span className="resume-project-meta" contentEditable={editable} suppressContentEditableWarning>Gouv. Polynésie Française, 2024</span>
              </li>
              <li>
                <span contentEditable={editable} suppressContentEditableWarning>Réduction de la Fracture Numérique</span>
                <span className="resume-project-meta" contentEditable={editable} suppressContentEditableWarning>Gouv. Polynésie Française, 2024</span>
              </li>
              <li>
                <span contentEditable={editable} suppressContentEditableWarning>Programme Veille IA Green</span>
                <span className="resume-project-meta" contentEditable={editable} suppressContentEditableWarning>Crédit Agricole S.A, 2023</span>
              </li>
            </ul>
          </section>

          {/* Certifications */}
          <section className="resume-section">
            <h2 contentEditable={editable} suppressContentEditableWarning>Certifications</h2>
            <ul className="resume-cert-list">
              <li contentEditable={editable} suppressContentEditableWarning>Agile PM Certification <span className="resume-cert-year">(2023)</span></li>
              <li contentEditable={editable} suppressContentEditableWarning>Elements of AI – IA &amp; Éthique, University of Helsinki <span className="resume-cert-year">(2025)</span></li>
              <li contentEditable={editable} suppressContentEditableWarning>L'Atelier RGPD – Protection des Données, CNIL <span className="resume-cert-year">(2025)</span></li>
              <li contentEditable={editable} suppressContentEditableWarning>Cambridge Advanced English (CAE) C1 <span className="resume-cert-year">(2025)</span></li>
            </ul>
          </section>
        </main>
      </div>
    </>
  )
}

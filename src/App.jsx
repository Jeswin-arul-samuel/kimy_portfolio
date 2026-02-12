import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ExperiencePage from './pages/ExperiencePage'
import EducationPage from './pages/EducationPage'
import SkillsPage from './pages/SkillsPage'
import ProjectsPage from './pages/ProjectsPage'
import CertificationsPage from './pages/CertificationsPage'
import LanguagesPage from './pages/LanguagesPage'
import HobbiesPage from './pages/HobbiesPage'
import ContactPage from './pages/ContactPage'
import ResumePage from './pages/ResumePage'

export default function App() {
  return (
    <Routes>
      <Route path="/resume" element={<ResumePage />} />
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/certifications" element={<CertificationsPage />} />
        <Route path="/languages" element={<LanguagesPage />} />
        <Route path="/hobbies" element={<HobbiesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
    </Routes>
  )
}

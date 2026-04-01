import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ProjectsProvider } from './context/ProjectsContext'

import CursorGlow  from './components/CursorGlow'
import Navbar      from './components/Navbar'
import Hero        from './components/Hero'
import About       from './components/About'
import Skills      from './components/Skills'
import Experience  from './components/Experience'
import Projects    from './components/Projects'
import Contact     from './components/Contact'
import Footer      from './components/Footer'

import AdminLogin  from './admin/AdminLogin'
import AdminPanel  from './admin/AdminPanel'

/* ── Portfolio wrapper ─────────────────────────────────────── */
function Portfolio({ dark, setDark }) {
  return (
    <>
      <Navbar dark={dark} setDark={setDark} />
      <main>
        <Hero       dark={dark} />
        <About      dark={dark} />
        <Skills     dark={dark} />
        <Experience dark={dark} />
        <Projects   dark={dark} />
        <Contact    dark={dark} />
      </main>
      <Footer dark={dark} />
    </>
  )
}

/* ── Root ──────────────────────────────────────────────────── */
export default function App() {
  const [dark, setDark] = useState(true)
  const location = useLocation()
  const isAdmin  = location.pathname.startsWith('/admin')
  

  useEffect(() => {
    dark
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark')
  }, [dark])

  return (
    <ProjectsProvider>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          dark ? 'bg-[#0A0A0F] text-[#E8E8F0]' : 'bg-[#F5F5F0] text-[#0A0A0F]'
        }`}
      >
        {/* cursor glow only on portfolio in dark mode */}
        {dark && !isAdmin && <CursorGlow />}

        <Routes>
          <Route path="/"                element={<Portfolio dark={dark} setDark={setDark} />} />
          <Route path="/admin"           element={<AdminLogin dark={dark} />} />
          <Route path="/admin/dashboard" element={<AdminPanel dark={dark} />} />
        </Routes>
      </div>
    </ProjectsProvider>
  )
}
import { createContext, useContext, useState, useEffect } from 'react'

const Ctx = createContext(null)

const DEMO = [
  {
    id: '1',
    title: 'Money Sync (Hyphun Technology)',
    description: 'One-stop platform for comparing financial products including cards, loans, insurance, and accounts. Features smart comparison tools and financial calculators for faster and better decision-making.',
    image: 'https://cdn.moneysync.net/assets/fe/images/expert-guidance.webp',
    video: '',
    liveLink: 'https://moneysync.net/',
    githubLink: '',
    tags: ['Laravel', 'Livewire','Filament','MySQL', 'Bootstrap'],
    featured: true,
  },
  {
    id: '2',
    title: 'Hyphun Technologies – Official Company Website',
    description: 'Developed the official corporate website for Hyphun Technologies, showcasing services like web/mobile development, AI, cloud, and DevOps.Focused on clean UI, performance, and structured content to present global business presence and services effectively.',
    image: 'https://hyphun.com/assets/images/logo.svg',
    video: '',
    liveLink: 'https://hyphun.com/',
    githubLink: '',
   tags: ['Laravel', 'Livewire','Filament','MySQL', 'Bootstrap'],
    featured: false,
  },
  {
    id: '3',
    title: 'FIXHR – HR Management System',
    description: 'HR management system similar to Zoho, handling employee data, attendance, leave, and payroll.  Includes reporting, dashboards, and admin controls to streamline HR operations.',
    image: 'https://fixhr.app/home/hrpdf-1copy.png',
    video: 'https://www.youtube.com/watch?v=X3DNydVcNX0',
    liveLink: 'https://fixhr.app/home/',
    githubLink: '',
     tags: ['Laravel', 'Livewire','Filament','MySQL', 'Bootstrap'],
    featured: true,
  },
]

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState(() => {
    try {
      const s = localStorage.getItem('ssp_projects')
      return s ? JSON.parse(s) : DEMO
    } catch {
      return DEMO
    }
  })

  useEffect(() => {
    localStorage.setItem('ssp_projects', JSON.stringify(projects))
  }, [projects])

  const addProject    = (p)     => setProjects((prev) => [{ ...p, id: Date.now().toString() }, ...prev])
  const updateProject = (id, p) => setProjects((prev) => prev.map((x) => (x.id === id ? { ...x, ...p } : x)))
  const deleteProject = (id)    => setProjects((prev) => prev.filter((x) => x.id !== id))

  return (
    <Ctx.Provider value={{ projects, addProject, updateProject, deleteProject }}>
      {children}
    </Ctx.Provider>
  )
}

export const useProjects = () => useContext(Ctx)

import { createContext, useContext, useState, useEffect } from 'react'

const Ctx = createContext(null)

const DEMO = [
  {
    id: '1',
    title: 'Coin Stock Tracker',
    description: 'Real-time coin stock tracking app with live price updates and portfolio management.',
    image: '',
    video: '',
    liveLink: 'https://example.com',
    githubLink: 'https://github.com/shivam',
    tags: ['Laravel', 'PHP', 'MySQL', 'React'],
    featured: true,
  },
  {
    id: '2',
    title: 'Bank Review Platform',
    description: 'Comprehensive bank review system with comparison features and user ratings.',
    image: '',
    video: '',
    liveLink: 'https://example.com',
    githubLink: 'https://github.com/shivam',
    tags: ['Laravel', 'Tailwind', 'MySQL'],
    featured: true,
  },
  {
    id: '3',
    title: 'Blog CMS',
    description: 'Full-featured blog content management system with rich text editing and media uploads.',
    image: '',
    video: '',
    liveLink: 'https://example.com',
    githubLink: 'https://github.com/shivam',
    tags: ['PHP', 'Laravel', 'Bootstrap'],
    featured: false,
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
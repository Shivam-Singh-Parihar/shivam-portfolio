import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProjects } from '../context/ProjectsContext'
import ProjectForm from './ProjectForm'

export default function AdminPanel({ dark }) {
  const navigate = useNavigate()
  const { projects, addProject, updateProject, deleteProject } = useProjects()

  const [view,       setView]       = useState('list')  // 'list' | 'add' | 'edit'
  const [editTarget, setEditTarget] = useState(null)
  const [deleteId,   setDeleteId]   = useState(null)
  const [toast,      setToast]      = useState('')
  const [sideOpen,   setSideOpen]   = useState(false)

  /* ── Auth guard ── */
  useEffect(() => {
    if (!sessionStorage.getItem('admin_auth')) navigate('/admin')
  }, [navigate])

  /* ── Toast helper ── */
  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2800)
  }

  /* ── CRUD handlers ── */
  const handleAdd = (data) => {
    addProject(data)
    setView('list')
    showToast('✓ Project added successfully!')
  }

  const handleEdit = (data) => {
    updateProject(editTarget.id, data)
    setView('list')
    setEditTarget(null)
    showToast('✓ Project updated!')
  }

  const handleDelete = () => {
    deleteProject(deleteId)
    setDeleteId(null)
    showToast('✓ Project deleted.')
  }

  const logout = () => {
    sessionStorage.removeItem('admin_auth')
    navigate('/admin')
  }

  const goTo = (v) => {
    setView(v)
    setEditTarget(null)
    setSideOpen(false)
  }

  /* ── Style tokens ── */
  const bg       = dark ? 'bg-[#0A0A0F] text-[#E8E8F0]'      : 'bg-[#F5F5F0] text-[#0A0A0F]'
  const sidebar  = dark ? 'bg-[#0D0D14] border-white/5'       : 'bg-white border-black/6'
  const topbar   = dark ? 'border-white/5'                    : 'border-black/5'
  const card     = dark ? 'bg-[#12121A] border-white/5'       : 'bg-white border-black/6'
  const dim      = dark ? 'text-white/42'                     : 'text-black/42'
  const rowHover = dark ? 'hover:bg-white/[0.03]'             : 'hover:bg-black/[0.03]'
  const inputCx  = `w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors font-mono ${
    dark
      ? 'bg-white/5 border-white/8 text-white placeholder-white/18 focus:border-[#FF3D57]/50'
      : 'bg-black/5 border-black/8 text-black placeholder-black/18 focus:border-[#FF3D57]/50'
  }`

  const navItem = (label, icon, key) => {
    const active = view === key || (key === 'list' && view === 'edit')
    return (
      <button
        key={key}
        onClick={() => goTo(key)}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-mono text-xs tracking-wider transition-all duration-200 ${
          active
            ? 'bg-[#FF3D57]/14 text-[#FF3D57]'
            : dark
              ? 'text-white/38 hover:bg-white/5 hover:text-white/65'
              : 'text-black/38 hover:bg-black/5 hover:text-black/65'
        }`}
      >
        <span className="text-sm w-5 text-center shrink-0">{icon}</span>
        {label}
        {key === 'list' && (
          <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full ${
            active ? 'bg-[#FF3D57]/20 text-[#FF3D57]' : dark ? 'bg-white/8 text-white/30' : 'bg-black/8 text-black/30'
          }`}>
            {projects.length}
          </span>
        )}
      </button>
    )
  }

  /* ── Page title ── */
  const pageTitle = view === 'add' ? 'Add New Project' : view === 'edit' ? 'Edit Project' : 'All Projects'

  return (
    <div className={`min-h-screen flex ${bg}`}>

      {/* ════════════════════════════════════════
          SIDEBAR — desktop
      ════════════════════════════════════════ */}
      <aside className={`hidden md:flex flex-col w-60 shrink-0 border-r sticky top-0 h-screen ${sidebar}`}>
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/5">
          <span className="font-script text-2xl text-[#FF3D57] block">shivam singh</span>
          <span className={`font-mono text-[9px] tracking-[0.3em] uppercase ${dim}`}>admin panel</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItem('All Projects', '◈', 'list')}
          {navItem('Add New',      '+', 'add' )}
        </nav>

        {/* Bottom actions */}
        <div className={`px-3 py-4 border-t ${dark ? 'border-white/5' : 'border-black/5'} space-y-1`}>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-mono text-xs tracking-wider transition-all duration-200 ${
              dark ? 'text-white/32 hover:bg-white/5 hover:text-white/60' : 'text-black/32 hover:bg-black/5 hover:text-black/60'
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 shrink-0">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            View Portfolio
          </a>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-mono text-xs tracking-wider transition-all duration-200 text-[#FF3D57]/50 hover:bg-[#FF3D57]/8 hover:text-[#FF3D57]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 shrink-0">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* ════════════════════════════════════════
          MOBILE SIDEBAR OVERLAY
      ════════════════════════════════════════ */}
      {sideOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setSideOpen(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <aside
            className={`absolute left-0 top-0 bottom-0 w-64 flex flex-col border-r ${sidebar}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-6 border-b border-white/5 flex items-center justify-between">
              <span className="font-script text-2xl text-[#FF3D57]">shivam singh</span>
              <button onClick={() => setSideOpen(false)} className={dim}>✕</button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1">
              {navItem('All Projects', '◈', 'list')}
              {navItem('Add New',      '+', 'add' )}
            </nav>
            <div className={`px-3 py-4 border-t ${dark ? 'border-white/5' : 'border-black/5'} space-y-1`}>
              <a href="/" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-mono text-xs ${dim}`}>
                ↗ View Portfolio
              </a>
              <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-mono text-xs text-[#FF3D57]/60">
                ← Logout
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ════════════════════════════════════════
          MAIN CONTENT
      ════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">

        {/* Top bar */}
        <header className={`flex items-center justify-between px-6 py-4 border-b sticky top-0 z-30 ${topbar} ${
          dark ? 'bg-[#0A0A0F]/95 backdrop-blur-xl' : 'bg-[#F5F5F0]/95 backdrop-blur-xl'
        }`}>
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              className="md:hidden p-1.5 rounded-lg"
              onClick={() => setSideOpen(true)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`w-5 h-5 ${dim}`}>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            <div>
              <h1 className={`font-display font-bold text-lg leading-none ${dark ? 'text-white' : 'text-black'}`}>
                {pageTitle}
              </h1>
              <p className={`font-mono text-[10px] tracking-wider mt-0.5 ${dim}`}>
                {projects.length} project{projects.length !== 1 ? 's' : ''} total
              </p>
            </div>
          </div>

          {view === 'list' && (
            <button
              onClick={() => setView('add')}
              className="flex items-center gap-2 px-4 py-2 bg-[#FF3D57] text-white font-mono text-[11px] tracking-widest uppercase rounded-full hover:shadow-[0_0_18px_rgba(255,61,87,0.3)] transition-all duration-300"
            >
              <span className="text-base leading-none">+</span>
              Add Project
            </button>
          )}
        </header>

        {/* ── Page body ── */}
        <main className="flex-1 p-6 overflow-auto">

          {/* ─────────────────────────────
              ADD FORM
          ───────────────────────────── */}
          {view === 'add' && (
            <div className={`max-w-2xl mx-auto rounded-2xl border p-6 md:p-8 ${card}`}>
              <div className="flex items-center gap-3 mb-7">
                <div className="w-1 h-7 rounded-full bg-gradient-to-b from-[#FF3D57] to-[#FF8C42]" />
                <h2 className={`font-display font-bold text-lg ${dark ? 'text-white' : 'text-black'}`}>
                  New Project Details
                </h2>
              </div>
              <ProjectForm
                dark={dark}
                onSave={handleAdd}
                onCancel={() => setView('list')}
                submitLabel="Add Project"
              />
            </div>
          )}

          {/* ─────────────────────────────
              EDIT FORM
          ───────────────────────────── */}
          {view === 'edit' && editTarget && (
            <div className={`max-w-2xl mx-auto rounded-2xl border p-6 md:p-8 ${card}`}>
              <div className="flex items-center gap-3 mb-7">
                <div className="w-1 h-7 rounded-full bg-gradient-to-b from-[#FF3D57] to-[#FF8C42]" />
                <div>
                  <h2 className={`font-display font-bold text-lg ${dark ? 'text-white' : 'text-black'}`}>
                    Editing Project
                  </h2>
                  <p className="font-mono text-xs text-[#FF3D57] mt-0.5">{editTarget.title}</p>
                </div>
              </div>
              <ProjectForm
                dark={dark}
                initial={editTarget}
                onSave={handleEdit}
                onCancel={() => { setView('list'); setEditTarget(null) }}
                submitLabel="Save Changes"
              />
            </div>
          )}

          {/* ─────────────────────────────
              PROJECT LIST
          ───────────────────────────── */}
          {view === 'list' && (
            <>
              {projects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 gap-4">
                  <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center text-2xl ${
                    dark ? 'border-white/8 bg-white/3' : 'border-black/8 bg-black/3'
                  }`}>
                    ◈
                  </div>
                  <p className={`font-mono text-sm ${dim}`}>No projects yet.</p>
                  <button
                    onClick={() => setView('add')}
                    className="font-mono text-xs text-[#FF3D57] hover:underline tracking-wider"
                  >
                    Add your first project →
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className={`rounded-2xl border p-4 flex items-center gap-4 transition-all duration-200 ${rowHover} ${card}`}
                    >
                      {/* Thumbnail */}
                      <div
                        className="w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden shrink-0 flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg,rgba(255,61,87,0.12),rgba(255,140,66,0.08))' }}
                      >
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="font-display font-bold text-xl gradient-text">
                            {project.title?.charAt(0) ?? '?'}
                          </span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <h3 className={`font-display font-semibold text-sm truncate ${dark ? 'text-white' : 'text-black'}`}>
                            {project.title}
                          </h3>
                          {project.featured && (
                            <span className="shrink-0 bg-[#FF3D57]/14 text-[#FF3D57] font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className={`font-mono text-[11px] truncate mb-1.5 ${dim}`}>
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {(project.tags ?? []).map((tag) => (
                            <span
                              key={tag}
                              className={`font-mono text-[9px] tracking-wider uppercase px-1.5 py-0.5 rounded-full ${
                                dark ? 'bg-white/5 text-white/32' : 'bg-black/5 text-black/32'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* External links */}
                      <div className="hidden sm:flex items-center gap-1 shrink-0">
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noreferrer"
                            title="Live link"
                            className={`p-2 rounded-lg transition-colors hover:text-[#FF3D57] ${dim}`}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                              <polyline points="15 3 21 3 21 9"/>
                              <line x1="10" y1="14" x2="21" y2="3"/>
                            </svg>
                          </a>
                        )}
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noreferrer"
                            title="GitHub repo"
                            className={`p-2 rounded-lg transition-colors hover:text-[#FF3D57] ${dim}`}
                          >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                            </svg>
                          </a>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => { setEditTarget(project); setView('edit') }}
                          className={`px-3 py-1.5 rounded-lg border font-mono text-[10px] tracking-widest uppercase transition-all duration-200 ${
                            dark
                              ? 'border-white/8 text-white/38 hover:border-[#FF3D57]/40 hover:text-[#FF3D57]'
                              : 'border-black/8 text-black/38 hover:border-[#FF3D57]/40 hover:text-[#FF3D57]'
                          }`}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteId(project.id)}
                          className="px-3 py-1.5 rounded-lg border border-red-500/20 text-red-400/55 font-mono text-[10px] tracking-widest uppercase hover:border-red-500/45 hover:text-red-400 transition-all duration-200"
                        >
                          Del
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* ════════════════════════════════════════
          DELETE CONFIRM MODAL
      ════════════════════════════════════════ */}
      {deleteId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(10px)' }}
        >
          <div className={`w-full max-w-sm rounded-2xl border p-6 shadow-2xl animate-fade-up ${card}`}>
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" className="w-5 h-5">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6M14 11v6"/>
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
            </div>
            <h3 className={`font-display font-bold text-base mb-1.5 ${dark ? 'text-white' : 'text-black'}`}>
              Delete Project?
            </h3>
            <p className={`font-mono text-sm mb-6 ${dim}`}>
              This cannot be undone. The project will be permanently removed from your portfolio.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="flex-1 py-2.5 bg-red-500 text-white font-mono text-xs tracking-widest uppercase rounded-xl hover:bg-red-600 transition-colors"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className={`flex-1 py-2.5 rounded-xl border font-mono text-xs tracking-widest uppercase transition-colors ${
                  dark ? 'border-white/10 text-white/45 hover:border-white/22' : 'border-black/10 text-black/45 hover:border-black/22'
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════
          TOAST NOTIFICATION
      ════════════════════════════════════════ */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full shadow-xl animate-fade-up font-mono text-xs tracking-wider whitespace-nowrap"
          style={{ background: dark ? '#1A1A28' : '#fff', color: dark ? '#E8E8F0' : '#0A0A0F', border: '1px solid rgba(255,61,87,0.28)' }}>
          {toast}
        </div>
      )}
    </div>
  )
}
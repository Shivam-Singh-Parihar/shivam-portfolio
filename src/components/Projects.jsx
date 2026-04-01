import { useEffect, useRef, useState } from 'react'
import { useProjects } from '../context/ProjectsContext'

function useReveal(ref) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    ref.current?.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* Render image, YouTube embed, or raw video */
function MediaPreview({ image, video, title }) {
  if (video) {
    const isYT = video.includes('youtube.com') || video.includes('youtu.be')
    if (isYT) {
      const id = video.includes('v=')
        ? video.split('v=')[1].split('&')[0]
        : video.split('/').pop().split('?')[0]
      return (
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${id}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )
    }
    return <video src={video} className="w-full h-full object-cover" controls muted loop playsInline />
  }
  if (image) {
    return <img src={image} alt={title} className="w-full h-full object-cover" loading="lazy" />
  }
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FF3D57]/10 to-[#FF8C42]/8">
      <span className="font-display font-bold text-4xl gradient-text">{title?.charAt(0) ?? '?'}</span>
    </div>
  )
}

export default function Projects({ dark }) {
  const ref = useRef(null)
  useReveal(ref)
  const { projects }  = useProjects()
  const [filter, setFilter] = useState('All')

  const dim  = dark ? 'text-white/50' : 'text-black/50'
  const card = dark
    ? 'bg-[#12121A] border-white/5 hover:border-[#FF3D57]/30'
    : 'bg-white border-black/5 hover:border-[#FF3D57]/30'

  const allTags = ['All', ...new Set(projects.flatMap((p) => p.tags ?? []))]
  const shown   = filter === 'All' ? projects : projects.filter((p) => p.tags?.includes(filter))

  return (
    <section id="projects" ref={ref} className="py-32 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FF3D57]/25 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Label */}
        <div className="reveal flex items-center gap-4 mb-16">
          <span className="font-mono text-[#FF3D57] text-xs tracking-[0.4em] uppercase">05</span>
          <div className="h-px w-12 bg-[#FF3D57]" />
          <span className={`font-mono text-xs tracking-[0.3em] uppercase ${dim}`}>Projects</span>
        </div>

        <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <h2 className={`font-display font-bold text-4xl md:text-5xl ${dark ? 'text-white' : 'text-[#0A0A0F]'}`}>
            Things I've <span className="gradient-text">built.</span>
          </h2>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full border transition-all duration-200 ${
                  filter === tag
                    ? 'bg-[#FF3D57] border-[#FF3D57] text-white'
                    : dark
                      ? 'border-white/10 text-white/40 hover:border-white/25 hover:text-white/70'
                      : 'border-black/10 text-black/40 hover:border-black/25 hover:text-black/70'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {shown.length === 0 ? (
          <div className={`text-center py-24 font-mono text-sm ${dim}`}>
            No projects found for this tag.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shown.map((project, i) => (
              <div
                key={project.id}
                className={`reveal group rounded-2xl border overflow-hidden card-lift shadow-sm ${card}`}
                style={{ transitionDelay: `${i * 0.055}s` }}
              >
                {/* Media */}
                <div className="h-44 overflow-hidden relative">
                  <MediaPreview image={project.image} video={project.video} title={project.title} />
                  {project.featured && (
                    <span className="absolute top-3 left-3 bg-[#FF3D57] text-white font-mono text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full shadow">
                      Featured
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="p-5">
                  <h3 className={`font-display font-bold text-base mb-2 ${dark ? 'text-white' : 'text-black'}`}>
                    {project.title}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-4 line-clamp-2 ${dim}`}>
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {(project.tags ?? []).map((tag) => (
                      <span
                        key={tag}
                        className={`font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-full ${
                          dark ? 'bg-white/5 text-white/38' : 'bg-black/5 text-black/38'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-[#FF3D57] font-mono text-xs tracking-wider hover:underline"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15 3 21 3 21 9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                        Live
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className={`flex items-center gap-1.5 font-mono text-xs tracking-wider transition-colors hover:text-[#FF3D57] ${dim}`}
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
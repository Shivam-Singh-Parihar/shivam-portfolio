import { useState, useEffect } from 'react'

const ROLES  = ['Full Stack Developer', 'Laravel Developer', 'React Developer',]

const SOCIALS = [
  {
    label: 'GitHub',
    href:  'https://github.com/Shivam-Singh-Parihar',
    icon:  (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href:  'https://www.linkedin.com/in/shivam-singh-parihar/',
    icon:  (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  // {
  //   label: 'Instagram',
  //   href:  'https://instagram.com',
  //   icon:  (
  //     <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
  //       <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  //     </svg>
  //   ),
  // },
  {
    label: 'Email',
    href:  'mailto:shivamsinghparihar449@gmail.com',
    icon:  (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
]

export default function Hero({ dark }) {
  const [idx,      setIdx]      = useState(0)
  const [text,     setText]     = useState('')
  const [deleting, setDeleting] = useState(false)
  const [visible,  setVisible]  = useState(false)

  useEffect(() => { setTimeout(() => setVisible(true), 80) }, [])

  useEffect(() => {
    const cur = ROLES[idx]
    let t
    if (!deleting && text.length < cur.length)
      t = setTimeout(() => setText(cur.slice(0, text.length + 1)), 72)
    else if (!deleting && text.length === cur.length)
      t = setTimeout(() => setDeleting(true), 2200)
    else if (deleting && text.length > 0)
      t = setTimeout(() => setText(text.slice(0, -1)), 36)
    else { setDeleting(false); setIdx((i) => (i + 1) % ROLES.length) }
    return () => clearTimeout(t)
  }, [text, deleting, idx])

  const dim = dark ? 'text-white/50' : 'text-black/50'

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.032]"
        style={{
          backgroundImage: `linear-gradient(${dark ? 'white' : 'black'} 1px, transparent 1px),
                            linear-gradient(90deg, ${dark ? 'white' : 'black'} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-10 animate-pulse-slow"
        style={{ background: 'radial-gradient(circle,#FF3D57,transparent)' }} />
      <div className="absolute bottom-1/3 right-1/4 w-60 h-60 rounded-full blur-3xl opacity-10 animate-pulse-slow"
        style={{ background: 'radial-gradient(circle,#FF8C42,transparent)', animationDelay: '2s' }} />

      {/* Content */}
      <div className={`relative z-10 max-w-6xl mx-auto px-6 py-24 w-full transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8">
          <span className={`font-mono text-xs tracking-[0.3em] uppercase ${dim}`}>Hey, my name is</span>
          {[0, 0.3, 0.6].map((d, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#FF3D57] animate-pulse" style={{ animationDelay: `${d}s` }} />
          ))}
        </div>

        {/* Name */}
        <h1 className="font-display font-bold leading-none mb-6">
          <span className={`block text-5xl md:text-7xl lg:text-[6.5rem] ${dark ? 'text-white' : 'text-[#0A0A0F]'}`}>
            Shivam Singh
          </span>
          <span className="block text-5xl md:text-7xl lg:text-[6.5rem] gradient-text">
            Parihar.
          </span>
        </h1>

        {/* Typewriter */}
        <div className="flex items-center gap-2 mb-8 h-10">
          <span className={`font-mono text-xl md:text-2xl ${dark ? 'text-white/70' : 'text-black/70'}`}>
            {text}
          </span>
          <span className="w-0.5 h-7 bg-[#FF3D57] animate-pulse" />
        </div>

        {/* Bio */}
        <p className={`max-w-xl text-base md:text-lg leading-relaxed mb-10 ${dim}`}>
          Crafting extraordinary web experiences where creativity meets code.
          Specializing in Laravel, React, PHP, MySQL & modern frontend tools.
          Currently at{' '}
          <a href="https://fixingdots.com/" className="text-[#FF3D57] hover:underline font-medium">Fixing Dots</a>.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mb-12">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-2 px-7 py-3.5 bg-[#FF3D57] text-white font-mono text-xs tracking-widest uppercase rounded-full hover:shadow-[0_0_28px_rgba(255,61,87,0.4)] transition-all duration-300 hover:scale-105"
          >
            Connect
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className={`flex items-center gap-2 px-7 py-3.5 border rounded-full font-mono text-xs tracking-widest uppercase transition-all duration-300 hover:scale-105 hover:border-[#FF3D57] hover:text-[#FF3D57] ${
              dark ? 'border-white/10 text-white/55' : 'border-black/10 text-black/55'
            }`}
          >
            View Projects
          </button>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-2">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              target="_blank"
              rel="noreferrer"
              className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 hover:text-[#FF3D57] ${
                dark ? 'text-white/35 hover:bg-white/5' : 'text-black/35 hover:bg-black/5'
              }`}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce">
        <span className={`font-mono text-[10px] tracking-widest uppercase ${dim}`}>scroll</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`w-4 h-4 ${dim}`}>
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </section>
  )
}
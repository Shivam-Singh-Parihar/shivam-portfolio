import { useState, useEffect } from 'react'

const LINKS = ['About', 'Skills', 'Experience', 'Projects', 'Contact']

export default function Navbar({ dark, setDark }) {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  const dim = dark ? 'text-white/45 hover:text-white' : 'text-black/45 hover:text-black'

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? dark
            ? 'bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-white/5'
            : 'bg-[#F5F5F0]/90 backdrop-blur-xl border-b border-black/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="font-script text-2xl font-bold text-[#FF3D57] select-none">
          shivam singh
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <button
              key={l}
              onClick={() => go(l)}
              className={`font-mono text-[11px] tracking-widest uppercase transition-colors hover:text-[#FF3D57] ${dim}`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Dark/light toggle */}
          <button
            onClick={() => setDark(!dark)}
            title="Toggle theme"
            className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-200 hover:text-[#FF3D57] hover:border-[#FF3D57]/40 ${
              dark ? 'border-white/8 text-white/40' : 'border-black/8 text-black/40'
            }`}
          >
            {dark ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          {/* Resume */}
          <a
            href="#"
            className="hidden md:inline-flex items-center px-5 py-2 border border-[#FF3D57] text-[#FF3D57] font-mono text-[11px] tracking-widest uppercase rounded-full hover:bg-[#FF3D57] hover:text-white transition-all duration-300"
          >
            Resume
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-1"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 transition-all duration-300 origin-center ${dark ? 'bg-white' : 'bg-black'} ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-0.5 transition-all duration-300 ${dark ? 'bg-white' : 'bg-black'} ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 transition-all duration-300 origin-center ${dark ? 'bg-white' : 'bg-black'} ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-80' : 'max-h-0'}`}>
        <div className={`px-6 pb-6 pt-2 space-y-4 border-t ${dark ? 'bg-[#0A0A0F] border-white/5' : 'bg-[#F5F5F0] border-black/5'}`}>
          {LINKS.map((l) => (
            <button
              key={l}
              onClick={() => go(l)}
              className={`block w-full text-left font-mono text-[11px] tracking-widest uppercase transition-colors hover:text-[#FF3D57] ${dim}`}
            >
              {l}
            </button>
          ))}
          <a href="#" className="inline-flex items-center px-5 py-2 border border-[#FF3D57] text-[#FF3D57] font-mono text-[11px] tracking-widest uppercase rounded-full">
            Resume
          </a>
        </div>
      </div>
    </nav>
  )
}
import { useEffect, useRef, useState } from 'react'

function useReveal(ref) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function Contact({ dark }) {
  const ref = useRef(null)
  useReveal(ref)
  const [copied, setCopied] = useState(false)

  const dim  = dark ? 'text-white/50' : 'text-black/50'
  const card = dark
    ? 'bg-white/[0.025] border-white/5 hover:border-[#FF3D57]/30'
    : 'bg-black/[0.025] border-black/5 hover:border-[#FF3D57]/30'

  const copyEmail = () => {
    navigator.clipboard.writeText('shivam@example.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <section id="contact" ref={ref} className="py-32 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FF3D57]/25 to-transparent" />

      {/* Ghost text bg */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className={`font-display font-bold select-none ${dark ? 'text-white/[0.017]' : 'text-black/[0.022]'}`}
          style={{ fontSize: '18vw' }}>
          CONTACT
        </span>
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="reveal flex items-center gap-4 mb-16">
          <span className="font-mono text-[#FF3D57] text-xs tracking-[0.4em] uppercase">06</span>
          <div className="h-px w-12 bg-[#FF3D57]" />
          <span className={`font-mono text-xs tracking-[0.3em] uppercase ${dim}`}>Get In Touch</span>
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <h2 className={`reveal font-display font-bold text-5xl md:text-6xl leading-tight mb-6 ${dark ? 'text-white' : 'text-[#0A0A0F]'}`}>
            Let's build something{' '}
            <span className="gradient-text">together.</span>
          </h2>

          <p className={`reveal text-lg mb-12 ${dim}`} style={{ transitionDelay: '0.1s' }}>
            Whether you have a project in mind or just want to say hello — my inbox is always open.
          </p>

          {/* Contact cards */}
          <div className="reveal grid sm:grid-cols-2 gap-4 mb-10" style={{ transitionDelay: '0.15s' }}>

            {/* Email */}
            <button
              onClick={copyEmail}
              className={`group p-5 rounded-2xl border text-left transition-all duration-300 ${card}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF3D57]/10 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#FF3D57" strokeWidth="2" className="w-5 h-5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <span className={`font-mono text-xs transition-colors ${copied ? 'text-green-400' : 'text-[#FF3D57]'}`}>
                  {copied ? 'Copied ✓' : 'Click to copy'}
                </span>
              </div>
              <p className={`font-mono text-[10px] mb-1 ${dim}`}>Email</p>
              <p className={`font-display font-semibold text-sm ${dark ? 'text-white' : 'text-black'}`}>
                shivamsinghparihar449@gmail.com
              </p>
            </button>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/shivam-singh-parihar"
              target="_blank"
              rel="noreferrer"
              className={`group p-5 rounded-2xl border text-left transition-all duration-300 ${card}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF3D57]/10 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="#FF3D57" className="w-5 h-5">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  className={`w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ${dim}`}>
                  <path d="M7 17L17 7M7 7h10v10"/>
                </svg>
              </div>
              <p className={`font-mono text-[10px] mb-1 ${dim}`}>LinkedIn</p>
              <p className={`font-display font-semibold text-sm ${dark ? 'text-white' : 'text-black'}`}>
                shivam-singh-parihar
              </p>
            </a>
          </div>

          <a
            href="mailto:shivamsinghparihar449@gmail.com"
            className="reveal inline-flex items-center gap-3 px-8 py-4 bg-[#FF3D57] text-white font-mono text-sm tracking-widest uppercase rounded-full hover:shadow-[0_0_38px_rgba(255,61,87,0.4)] transition-all duration-300 hover:scale-105"
            style={{ transitionDelay: '0.2s' }}
          >
            Say Hello
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
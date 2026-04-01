import { useEffect, useRef } from 'react'
import shivam from '../assets/shivam.jpg'

function useReveal(ref) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    ref.current?.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

const STATS = [
  { value: '3+',  label: 'Years Exp.'   },
  { value: '10+', label: 'Projects'     },
  { value: '9+',  label: 'Technologies' },
]

const INFO = [
  { label: 'Location',   value: 'Raipur, CG, India'   },
  { label: 'Currently',  value: 'Fixing Dots'   },
  { label: 'Started',    value: '2025'                 },
  { label: 'Status',     value: 'Open to work ✓'      },
]

export default function About({ dark }) {
  const ref = useRef(null)
  useReveal(ref)

  const dim  = dark ? 'text-white/50'  : 'text-black/50'
  const card = dark ? 'bg-[#12121A] border-white/5' : 'bg-white border-black/6'

  return (
    <section id="about" ref={ref} className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section label */}
        <div className="reveal flex items-center gap-4 mb-16">
          <span className="font-mono text-[#FF3D57] text-xs tracking-[0.4em] uppercase">02</span>
          <div className="h-px w-12 bg-[#FF3D57]" />
          <span className={`font-mono text-xs tracking-[0.3em] uppercase ${dim}`}>About Me</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left ── */}
         <div>
  <h2 className={`reveal font-display font-bold text-4xl md:text-5xl leading-tight mb-8 ${dark ? 'text-white' : 'text-[#0A0A0F]'}`}>
    Turning ideas into{' '}
    <span className="gradient-text">digital reality.</span>
  </h2>

  <div className={`reveal space-y-4 text-base leading-relaxed ${dim}`} style={{ transitionDelay: '0.1s' }}>
    <p>
      Hello! I'm{' '}
      <strong className={dark ? 'text-white' : 'text-black'}>
        Shivam Singh Parihar
      </strong>,
      a passionate Full Stack Developer with a drive for crafting digital experiences.
    </p>

    <p>
      My journey began in 2023 at{' '}
      <span className="text-[#FF3D57]">Yasham Academy</span>, which led me to an
      internship and then a full-time role at{' '}
      <span className="text-[#FF3D57]">Yasham Software</span>.
    </p>

    <p>
      I then worked at{' '}
      <span className="text-[#FF3D57]">Hyphun Technology</span>, where I strengthened my expertise
      in Laravel, Livewire, and modern web development practices.
    </p>

    <p>
      Currently, I am working as a{' '}
      <span className="text-[#FF3D57]">Software Developer</span> at{' '}
      <span className="text-[#FF3D57]">Fixing Dots, Raipur (C.G.)</span>, where I have been
      contributing for the past 9 months—building scalable applications using Laravel, React,
      and improving performance-driven solutions.
    </p>
  </div>

  {/* Stats */}
  <div className="reveal grid grid-cols-3 gap-4 mt-10" style={{ transitionDelay: '0.2s' }}>
    {STATS.map((s) => (
      <div
        key={s.label}
        className={`p-4 rounded-2xl border text-center transition-colors duration-300 hover:border-[#FF3D57]/30 ${card}`}
      >
        <div className="font-display font-bold text-3xl gradient-text mb-1">
          {s.value}
        </div>
        <div className={`font-mono text-[10px] tracking-wider uppercase ${dim}`}>
          {s.label}
        </div>
      </div>
    ))}
  </div>
</div>

          {/* ── Right ── */}
          <div className="reveal relative" style={{ transitionDelay: '0.15s' }}>
            {/* Dashed frame */}
            <div className="absolute inset-0 rounded-3xl border-2 border-dashed border-[#FF3D57]/15 -rotate-2 pointer-events-none" />

            <div className={`relative rounded-3xl p-8 border shadow-2xl ${card}`}>
              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FF3D57] to-[#FF8C42] opacity-20 blur-xl animate-pulse-slow" />
                  <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#FF3D57]/20 to-[#FF8C42]/10 border-2 border-[#FF3D57]/30 flex items-center justify-center">
                    {/* <span className="font-display font-bold text-4xl gradient-text"> */}
                      <img className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#FF3D57]/20 to-[#FF8C42]/10 border-2 border-[#FF3D57]/30 flex items-center justify-center" src={shivam} alt="Avatar" />
                    {/* </span> */}
                  </div>
                </div>
              </div>

              <div className="text-center mb-6">
                <h3 className={`font-display font-bold text-lg mb-1 ${dark ? 'text-white' : 'text-black'}`}>
                  Shivam Singh Parihar
                </h3>
                <p className="text-[#FF3D57] font-mono text-xs tracking-widest uppercase">
                  Full Stack Developer
                </p>
              </div>

              {INFO.map((item) => (
                <div
                  key={item.label}
                  className={`flex justify-between items-center py-3 border-b last:border-0 ${
                    dark ? 'border-white/5' : 'border-black/5'
                  }`}
                >
                  <span className={`font-mono text-xs ${dim}`}>{item.label}</span>
                  <span className={`font-mono text-xs font-medium ${dark ? 'text-white/80' : 'text-black/80'}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Floating badge */}
            <div className="absolute -top-3 -right-3 px-3 py-1.5 bg-[#FF3D57] text-white font-mono text-xs rounded-full shadow-lg animate-float">
              Available ✓
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
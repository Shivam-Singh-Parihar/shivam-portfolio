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

const EXPERIENCES = [

  {
  company: 'Fixing Dots, Raipur (C.G.)',
  role:    'Software Developer',
  period:  '2025 — Present',
  type:    'Full-time',
  projects: [
    {
      title: 'FixHR (HRM SaaS Platform)',
      desc: 'Working on FixHR, a comprehensive HRM SaaS platform that manages the complete employee lifecycle across multiple businesses.'
    },
    {
      title: 'Core HR Modules',
      desc: 'Developed and maintained modules for attendance, payroll, employee management, late marks, missed punches, and detailed reporting systems within FixHR.'
    },
    {
      title: 'Advanced Reporting & Analytics',
      desc: 'Built dynamic reports for attendance, payroll, and employee insights to help businesses make data-driven decisions.'
    },
    {
      title: 'Super Admin & Multi-Tenant System',
      desc: 'Implemented a super admin panel to manage multiple businesses, control access, and monitor platform-wide operations.'
    },
    {
      title: 'Subscription & Plan Management',
      desc: 'Developed a SaaS-based subscription system allowing businesses to subscribe, upgrade plans, and manage services.'
    },
    {
      title: 'Livewire-Based Dynamic UI',
      desc: 'Built reactive and dynamic interfaces using Laravel Livewire for seamless user experience.'
    },
    {
      title: 'Biometric Integration (ZKTeco)',
      desc: 'Integrated ZKTeco biometric devices for real-time attendance tracking and synchronization within FixHR.'
    },
    {
      title: 'FixGPT (AI Chatbot for FixHR)',
      desc: 'Developed APIs for FixGPT, an AI-powered chatbot within FixHR that allows users to query HR data (employee count, payroll structure, attendance, etc.) using natural language.'
    },
  ],
},

  {
    company: 'Hyphun Technologies Pvt. Ltd.',
    role:    'Full Stack Developer',
    period:  '2024 — Present',
    type:    'Full-time',
    projects: [
      { title: 'Coin Stock',         desc: 'Development and implementation of Coin Stock tracking features with real-time data.' },
      { title: 'Blogs Platform',     desc: 'Developed and managed blog functionalities ensuring seamless content management.' },
      { title: 'IMEI Project',       desc: 'Implemented IMEI project for efficient data handling and retrieval.' },
      { title: 'Bank Reviews',       desc: 'Comprehensive bank review system with comparison features and ratings.' },
      { title: 'Hyphun Consultancy', desc: 'Contributed to projects under Hyphun and Hyphun Consultancy umbrella.' },
      { title: 'Laravel Filament',   desc: 'Learned Filament in Laravel, building efficient admin panel interfaces.' },
    ],
  },
  {
    company: 'Yasham Software Services Pvt. Ltd.',
    role:    'Junior Developer',
    period:  '2023 — 2024',
    type:    'Full-time',
    projects: [
      { title: 'Web Applications', desc: 'Built and maintained web apps with PHP, Laravel, and MySQL.' },
      { title: 'Frontend UI',      desc: 'Responsive UI components with HTML, CSS, Bootstrap, and JavaScript.' },
    ],
  },
]

export default function Experience({ dark }) {
  const ref    = useRef(null)
  const [active, setActive] = useState(0)
  useReveal(ref)

  const dim  = dark ? 'text-white/50' : 'text-black/50'
  const card = dark ? 'bg-white/[0.025] border-white/5' : 'bg-black/[0.025] border-black/5'

  return (
    <section id="experience" ref={ref} className="py-32 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FF3D57]/25 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Label */}
        <div className="reveal flex items-center gap-4 mb-16">
          <span className="font-mono text-[#FF3D57] text-xs tracking-[0.4em] uppercase">04</span>
          <div className="h-px w-12 bg-[#FF3D57]" />
          <span className={`font-mono text-xs tracking-[0.3em] uppercase ${dim}`}>Work Experience</span>
        </div>

        <h2 className={`reveal font-display font-bold text-4xl md:text-5xl mb-16 ${dark ? 'text-white' : 'text-[#0A0A0F]'}`}>
          Where I've <span className="gradient-text">worked.</span>
        </h2>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Company tabs */}
          <div className="lg:col-span-2 space-y-3 reveal">
            {EXPERIENCES.map((exp, i) => (
              <button
                key={exp.company}
                onClick={() => setActive(i)}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
                  active === i
                    ? dark
                      ? 'bg-white/5 border-[#FF3D57]/40'
                      : 'bg-black/5 border-[#FF3D57]/40'
                    : dark
                      ? 'bg-white/[0.02] border-white/5 hover:border-white/14'
                      : 'bg-black/[0.02] border-black/5 hover:border-black/14'
                }`}
              >
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className={`font-display font-semibold text-sm leading-snug ${dark ? 'text-white' : 'text-black'}`}>
                    {exp.company}
                  </h3>
                  {active === i && (
                    <span className="shrink-0 w-2 h-2 rounded-full bg-[#FF3D57] mt-1 animate-pulse" />
                  )}
                </div>
                <p className={`font-mono text-xs mb-1 ${active === i ? 'text-[#FF3D57]' : dim}`}>{exp.role}</p>
                <p className={`font-mono text-[10px] ${dim}`}>{exp.period}</p>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-3 reveal" style={{ transitionDelay: '0.1s' }}>
            <div className={`p-6 rounded-2xl border ${card}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full bg-gradient-to-b from-[#FF3D57] to-[#FF8C42]" />
                <div>
                  <h3 className={`font-display font-bold text-base ${dark ? 'text-white' : 'text-black'}`}>
                    {EXPERIENCES[active].role}
                  </h3>
                  <p className="font-mono text-xs text-[#FF3D57]">@ {EXPERIENCES[active].company}</p>
                </div>
                <span className={`ml-auto shrink-0 font-mono text-[10px] px-3 py-1 rounded-full border ${
                  dark ? 'border-white/10 text-white/35' : 'border-black/10 text-black/35'
                }`}>
                  {EXPERIENCES[active].type}
                </span>
              </div>

              <div className="space-y-2">
                {EXPERIENCES[active].projects.map((p) => (
                  <div
                    key={p.title}
                    className={`flex gap-3 p-3 rounded-xl transition-colors ${
                      dark ? 'hover:bg-white/3' : 'hover:bg-black/3'
                    }`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="#FF3D57" strokeWidth="2"
                      className="w-4 h-4 shrink-0 mt-0.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                    <p className={`text-sm ${dim}`}>
                      <span className={`font-display font-semibold mr-1 ${dark ? 'text-white' : 'text-black'}`}>
                        {p.title}:
                      </span>
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
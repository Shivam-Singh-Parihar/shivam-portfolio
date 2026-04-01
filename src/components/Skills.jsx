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

/* ── Data ──────────────────────────────────────────────────── */
const SKILL_GROUPS = [
  {
    category: 'Frontend',
    color:    '#61DAFB',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    items: [
      { name: 'HTML5',        letter: 'H5', color: '#E34F26', level: 4 },
      { name: 'CSS3',         letter: 'C3', color: '#1572B6', level: 4 },
      { name: 'JavaScript',   letter: 'JS', color: '#F7DF1E', level: 3 },
      { name: 'React',        letter: 'Re', color: '#61DAFB', level: 3 },
      { name: 'Tailwind CSS', letter: 'TW', color: '#06B6D4', level: 4 },
      { name: 'Bootstrap',    letter: 'BS', color: '#7952B3', level: 4 },
    ],
  },
  {
    category: 'Backend',
    color:    '#FF2D20',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M3 5v14a9 3 0 0 0 18 0V5"/>
        <path d="M3 12a9 3 0 0 0 18 0"/>
      </svg>
    ),
    items: [
      { name: 'PHP',     letter: 'PHP', color: '#777BB4', level: 3 },
      { name: 'Laravel', letter: 'Lv',  color: '#FF2D20', level: 4 },
      { name: 'MySQL',   letter: 'SQL', color: '#4479A1', level: 3 },
    ],
  },
]

const MARQUEE_ITEMS = [
  { name: 'HTML5',        letter: 'H5',  color: '#E34F26' },
  { name: 'CSS3',         letter: 'C3',  color: '#1572B6' },
  { name: 'JavaScript',   letter: 'JS',  color: '#F7DF1E' },
  { name: 'PHP',          letter: 'PHP', color: '#777BB4' },
  { name: 'MySQL',        letter: 'SQL', color: '#4479A1' },
  { name: 'React',        letter: 'Re',  color: '#61DAFB' },
  { name: 'Laravel',      letter: 'Lv',  color: '#FF2D20' },
  { name: 'Bootstrap',    letter: 'BS',  color: '#7952B3' },
  { name: 'Tailwind CSS', letter: 'TW',  color: '#06B6D4' },
]

const LEVEL_LABEL = ['', 'Beginner', 'Familiar', 'Proficient', 'Advanced', 'Expert']

const ALSO_KNOW = [
  { name: 'Nest.js',      color: '#ffffff' },
  { name: 'TypeScript',   color: '#3178C6' },
  { name: 'Vue.js',       color: '#42b883' },
  { name: 'Docker',       color: '#2496ED' },
  { name: 'Filament',     color: '#FF2D20' },
  { name: 'Livewire',     color: '#FB70A9' },
  { name: 'REST APIs',    color: '#FF8C42' },
  { name: 'Git & GitHub', color: '#F05032' },
]

/* ── Component ─────────────────────────────────────────────── */
export default function Skills({ dark }) {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(null)
  useReveal(ref)

  const dim = dark ? 'text-white/45' : 'text-black/45'

  return (
    <section id="skills" ref={ref} className="py-32 relative overflow-hidden">

      {/* Top separator line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FF3D57]/25 to-transparent" />

      {/* Soft ambient glow in center */}
      <div
        className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(255,61,87,0.05), transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-6">

        {/* ── Section label ── */}
        <div className="reveal flex items-center gap-4 mb-16">
          <span className="font-mono text-[#FF3D57] text-xs tracking-[0.4em] uppercase">03</span>
          <div className="h-px w-12 bg-[#FF3D57]" />
          <span className={`font-mono text-xs tracking-[0.3em] uppercase ${dim}`}>Skills & Tech</span>
        </div>

        {/* ── Headline ── */}
        <div className="reveal mb-16">
          <h2 className={`font-display font-bold text-4xl md:text-5xl mb-4 ${dark ? 'text-white' : 'text-[#0A0A0F]'}`}>
            Tools I craft with
          </h2>
          <p className={`max-w-lg text-base leading-relaxed ${dim}`}>
            A full-stack toolkit forged over 3+ years of hands-on production work —
            from pixel-perfect frontends to robust backend systems.
          </p>
        </div>

        {/* ── Skill category cards ── */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {SKILL_GROUPS.map((group, gi) => (
            <div
              key={group.category}
              className={`reveal rounded-3xl border p-6 relative overflow-hidden ${
                dark ? 'bg-[#12121A] border-white/5' : 'bg-white border-black/6'
              }`}
              style={{ transitionDelay: `${gi * 0.1}s` }}
            >
              {/* Corner ambient */}
              <div
                className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl pointer-events-none"
                style={{ background: group.color, opacity: 0.06 }}
              />

              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: group.color + '18', color: group.color }}
                >
                  {group.icon}
                </div>
                <div>
                  <h3 className={`font-display font-bold text-base ${dark ? 'text-white' : 'text-black'}`}>
                    {group.category}
                  </h3>
                  <p className={`font-mono text-[10px] tracking-wider mt-0.5 ${dim}`}>
                    {group.items.length} technologies
                  </p>
                </div>
                {/* Subtle category tag */}
                <span
                  className="ml-auto font-mono text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full border"
                  style={{ color: group.color, borderColor: group.color + '30', background: group.color + '0F' }}
                >
                  {group.category === 'Frontend' ? 'UI / UX' : 'Server / DB'}
                </span>
              </div>

              {/* Skill chips */}
              <div className="grid grid-cols-2 gap-2.5">
                {group.items.map((skill) => {
                  const isHov = hovered === skill.name
                  return (
                    <div
                      key={skill.name}
                      onMouseEnter={() => setHovered(skill.name)}
                      onMouseLeave={() => setHovered(null)}
                      className={`group relative flex items-center gap-3 p-3 rounded-2xl border cursor-default transition-all duration-300 ${
                        isHov
                          ? dark
                            ? 'border-[#FF3D57]/35 bg-white/[0.06] shadow-[0_0_20px_rgba(255,61,87,0.08)]'
                            : 'border-[#FF3D57]/35 bg-black/[0.04] shadow-[0_0_20px_rgba(255,61,87,0.06)]'
                          : dark
                            ? 'border-white/5 bg-white/[0.025] hover:border-white/10'
                            : 'border-black/5 bg-black/[0.02] hover:border-black/10'
                      }`}
                      style={{ transform: isHov ? 'scale(1.025)' : 'scale(1)' }}
                    >
                      {/* Letter badge */}
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-[11px] shrink-0 transition-all duration-300"
                        style={{
                          background: isHov ? skill.color + '30' : skill.color + '18',
                          color: skill.color,
                          boxShadow: isHov ? `0 0 12px ${skill.color}30` : 'none',
                        }}
                      >
                        {skill.letter}
                      </div>

                      {/* Name + level dots */}
                      <div className="min-w-0 flex-1">
                        <p className={`font-display font-semibold text-xs truncate mb-1.5 transition-colors duration-300 ${
                          isHov
                            ? dark ? 'text-white' : 'text-black'
                            : dark ? 'text-white/80' : 'text-black/80'
                        }`}>
                          {skill.name}
                        </p>
                        {/* 5-dot proficiency bar (no numbers) */}
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, di) => (
                            <div
                              key={di}
                              className="h-1 rounded-full transition-all duration-400"
                              style={{
                                width: di < skill.level ? '14px' : '10px',
                                background: di < skill.level
                                  ? (isHov ? skill.color : '#FF3D57')
                                  : dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                                opacity: di < skill.level ? 1 : 0.5,
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Tooltip on hover */}
                      <div
                        className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg font-mono text-[9px] tracking-wider uppercase whitespace-nowrap shadow-lg z-10 pointer-events-none transition-all duration-200 ${
                          isHov ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
                        }`}
                        style={{
                          background: dark ? '#1A1A2E' : '#fff',
                          color: skill.color,
                          border: `1px solid ${skill.color}28`,
                        }}
                      >
                        {LEVEL_LABEL[skill.level]}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ── Also learning card ── */}
        <div
          className={`reveal rounded-3xl border p-6 md:p-8 relative overflow-hidden mb-16 ${
            dark ? 'bg-[#12121A] border-white/5' : 'bg-white border-black/6'
          }`}
          style={{ transitionDelay: '0.2s' }}
        >
          {/* Ghost bg text */}
          <div
            className="absolute right-4 top-1/2 -translate-y-1/2 font-display font-bold leading-none pointer-events-none select-none hidden md:block"
            style={{
              fontSize: '72px',
              color: dark ? 'rgba(255,61,87,0.04)' : 'rgba(255,61,87,0.05)',
            }}
          >
            LEARNING
          </div>

          <div className="relative flex flex-col md:flex-row md:items-center gap-6">
            {/* Left label */}
            <div className="md:w-64 shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#FF3D57] animate-pulse" />
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#FF3D57]">
                  Also exploring
                </span>
              </div>
              <h3 className={`font-display font-bold text-lg leading-snug ${dark ? 'text-white' : 'text-black'}`}>
                Always levelling up.
              </h3>
              <p className={`font-mono text-[11px] mt-2 leading-relaxed ${dim}`}>
                Tools &amp; frameworks beyond the core stack.
              </p>
            </div>

            {/* Tool pills */}
            <div className="flex flex-wrap gap-2">
              {ALSO_KNOW.map((tool) => (
                <span
                  key={tool.name}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-full border font-mono text-xs tracking-wide transition-all duration-200 hover:scale-105 cursor-default ${
                    dark
                      ? 'border-white/8 bg-white/[0.025] text-white/50 hover:border-[#FF3D57]/35 hover:text-white/80'
                      : 'border-black/8 bg-black/[0.025] text-black/50 hover:border-[#FF3D57]/35 hover:text-black/80'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: tool.color }} />
                  {tool.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

     

    </section>
  )
}
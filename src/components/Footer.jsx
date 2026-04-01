export default function Footer({ dark }) {
  const dim = dark ? 'text-white/22' : 'text-black/22'

   const SOCIAL_LINKS = [
  { name: 'GitHub',    url: 'https://github.com/Shivam-Singh-Parihar' },
  { name: 'LinkedIn',  url: 'https://linkedin.com/in/shivam-singh-parihar' },
  { name: 'Instagram', url: 'https://instagram.com/shivamsinghparihar' },
];
  return (
    <footer className={`py-10 border-t ${dark ? 'border-white/5' : 'border-black/5'}`}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-script text-2xl text-[#FF3D57]">shivam singh</span>

        <p className={`font-mono text-xs ${dim}`}>
          Made with <span className="text-[#FF3D57]">♥</span> by Shivam Singh Parihar
        </p>

       

<div className="flex items-center gap-5">
  {SOCIAL_LINKS.map((s) => (
    <a
      key={s.name}
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`font-mono text-xs tracking-wider transition-colors hover:text-[#FF3D57] ${dim}`}
    >
      {s.name}
    </a>
  ))}
</div>
      </div>
    </footer>
  )
}
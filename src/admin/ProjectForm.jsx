import { useState } from 'react'

const EMPTY_FORM = {
  title:       '',
  description: '',
  image:       '',
  video:       '',
  liveLink:    '',
  githubLink:  '',
  tags:        '',
  featured:    false,
}

export default function ProjectForm({
  dark,
  initial     = {},
  onSave,
  onCancel,
  submitLabel = 'Add Project',
}) {
  const [form, setForm] = useState({
    ...EMPTY_FORM,
    ...initial,
    tags: Array.isArray(initial.tags) ? initial.tags.join(', ') : (initial.tags ?? ''),
  })

  const set = (key) => (e) =>
    setForm((f) => ({
      ...f,
      [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...form,
      tags: form.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    })
  }

  /* ── style helpers ── */
  const label = `block font-mono text-[10px] tracking-widest uppercase mb-1.5 ${
    dark ? 'text-white/35' : 'text-black/35'
  }`
  const inputCx = `w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors font-mono ${
    dark
      ? 'bg-white/5 border-white/8 text-white placeholder-white/18 focus:border-[#FF3D57]/50'
      : 'bg-black/5 border-black/8 text-black placeholder-black/18 focus:border-[#FF3D57]/50'
  }`

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Row 1 — title + tags */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={label}>Project Title *</label>
          <input
            value={form.title}
            onChange={set('title')}
            placeholder="My Awesome Project"
            className={inputCx}
            required
          />
        </div>
        <div>
          <label className={label}>Tags (comma-separated)</label>
          <input
            value={form.tags}
            onChange={set('tags')}
            placeholder="Laravel, React, MySQL"
            className={inputCx}
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className={label}>Description *</label>
        <textarea
          value={form.description}
          onChange={set('description')}
          rows={3}
          placeholder="Brief description of the project…"
          className={`${inputCx} resize-none`}
          required
        />
      </div>

      {/* Row 2 — image + video */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={label}>Image URL</label>
          <input
            value={form.image}
            onChange={set('image')}
            placeholder="https://i.imgur.com/abc.png"
            className={inputCx}
          />
          <p className={`font-mono text-[9px] mt-1 ${dark ? 'text-white/18' : 'text-black/18'}`}>
            Any public image URL (Imgur, GitHub raw, Cloudinary…)
          </p>
        </div>
        <div>
          <label className={label}>Video URL</label>
          <input
            value={form.video}
            onChange={set('video')}
            placeholder="https://youtube.com/watch?v=…"
            className={inputCx}
          />
          <p className={`font-mono text-[9px] mt-1 ${dark ? 'text-white/18' : 'text-black/18'}`}>
            YouTube link or direct .mp4 URL
          </p>
        </div>
      </div>

      {/* Row 3 — live + github */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={label}>Live Link</label>
          <input
            value={form.liveLink}
            onChange={set('liveLink')}
            placeholder="https://myproject.com"
            className={inputCx}
          />
        </div>
        <div>
          <label className={label}>GitHub Repo</label>
          <input
            value={form.githubLink}
            onChange={set('githubLink')}
            placeholder="https://github.com/shivam/repo"
            className={inputCx}
          />
        </div>
      </div>

      {/* Featured checkbox */}
      <label className="flex items-center gap-3 cursor-pointer select-none pt-1">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={set('featured')}
          className="w-4 h-4 accent-[#FF3D57] rounded"
        />
        <span className={`font-mono text-xs ${dark ? 'text-white/45' : 'text-black/45'}`}>
          Mark as <span className="text-[#FF3D57]">Featured</span> project
        </span>
      </label>

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 py-3 bg-[#FF3D57] text-white font-mono text-xs tracking-widest uppercase rounded-xl hover:shadow-[0_0_18px_rgba(255,61,87,0.3)] transition-all duration-300"
        >
          {submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className={`px-6 py-3 rounded-xl border font-mono text-xs tracking-widest uppercase transition-all duration-300 ${
              dark
                ? 'border-white/10 text-white/38 hover:border-white/22'
                : 'border-black/10 text-black/38 hover:border-black/22'
            }`}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ⚠️  Change these before deploying
const ADMIN_USER = 'shivam'
const ADMIN_PASS = 'admin@123'

export default function AdminLogin({ dark }) {
  const [user,  setUser]  = useState('')
  const [pass,  setPass]  = useState('')
  const [error, setError] = useState('')
  const [show,  setShow]  = useState(false)
  const navigate = useNavigate()

  const bg    = dark ? 'bg-[#0A0A0F]'             : 'bg-[#F5F5F0]'
  const card  = dark ? 'bg-[#12121A] border-white/5' : 'bg-white border-black/8'
  const input = dark
    ? 'bg-white/5 border-white/8 text-white placeholder-white/20 focus:border-[#FF3D57]/55'
    : 'bg-black/5 border-black/8 text-black placeholder-black/20 focus:border-[#FF3D57]/55'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      sessionStorage.setItem('admin_auth', '1')
      navigate('/admin/dashboard')
    } else {
      setError('Invalid username or password.')
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${bg}`}>
      <div className={`w-full max-w-sm rounded-3xl border p-8 shadow-2xl ${card}`}>

        {/* Header */}
        <div className="text-center mb-8">
          <span className="font-script text-3xl text-[#FF3D57] block mb-1">shivam singh</span>
          <p className={`font-mono text-[10px] tracking-[0.3em] uppercase ${dark ? 'text-white/28' : 'text-black/28'}`}>
            Admin Panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className={`block font-mono text-[10px] tracking-widest uppercase mb-1.5 ${dark ? 'text-white/35' : 'text-black/35'}`}>
              Username
            </label>
            <input
              type="text"
              value={user}
              onChange={(e) => { setUser(e.target.value); setError('') }}
              placeholder="shivam"
              autoComplete="username"
              className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors font-mono ${input}`}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className={`block font-mono text-[10px] tracking-widest uppercase mb-1.5 ${dark ? 'text-white/35' : 'text-black/35'}`}>
              Password
            </label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={pass}
                onChange={(e) => { setPass(e.target.value); setError('') }}
                placeholder="••••••••"
                autoComplete="current-password"
                className={`w-full px-4 py-3 pr-11 rounded-xl border text-sm outline-none transition-colors font-mono ${input}`}
                required
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${dark ? 'text-white/25 hover:text-white/50' : 'text-black/25 hover:text-black/50'}`}
              >
                {show ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="font-mono text-xs text-red-400 text-center pt-1">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 bg-[#FF3D57] text-white font-mono text-xs tracking-widest uppercase rounded-xl hover:shadow-[0_0_24px_rgba(255,61,87,0.35)] transition-all duration-300 hover:scale-[1.02] mt-2"
          >
            Login →
          </button>
        </form>

        <a
          href="/"
          className={`block text-center mt-6 font-mono text-[10px] tracking-wider uppercase transition-colors hover:text-[#FF3D57] ${dark ? 'text-white/18' : 'text-black/18'}`}
        >
          ← Back to Portfolio
        </a>
      </div>
    </div>
  )
}
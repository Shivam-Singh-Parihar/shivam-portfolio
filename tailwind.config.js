/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Clash Display"', 'sans-serif'],
        body:    ['"General Sans"',  'sans-serif'],
        mono:    ['"JetBrains Mono"','monospace'],
        script:  ['"Caveat"',        'cursive'],
      },
      colors: {
        accent: '#FF3D57',
      },
      animation: {
        'float':      'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'marquee':    'marquee 25s linear infinite',
        'fade-up':    'fadeUp 0.5s ease forwards',
      },
      keyframes: {
        float: { '50%':     { transform: 'translateY(-14px)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
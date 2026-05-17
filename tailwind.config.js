/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        nexus: {
          50:  '#edfffe',
          100: '#c6fffc',
          200: '#8ffff9',
          300: '#4dfaf4',
          400: '#1ae9e2',
          500: '#0df2c0',
          600: '#00c9a7',
          700: '#00a086',
          800: '#007d6a',
          900: '#006657',
          950: '#003d34',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'aurora': 'linear-gradient(135deg, #0df2c0 0%, #7c3aed 50%, #f43f5e 100%)',
        'nexus-gradient': 'linear-gradient(135deg, #0df2c0 0%, #7c3aed 100%)',
      },
      animation: {
        'fade-in':        'fadeIn 0.3s ease-in-out',
        'slide-up':       'slideUp 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'pulse-slow':     'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'shimmer':        'shimmer 2.5s linear infinite',
        'aurora-float':   'auroraFloat 8s ease-in-out infinite',
        'glow-pulse':     'glowPulse 2s ease-in-out infinite',
        'spin-slow':      'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn:      { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp:     { '0%': { transform: 'translateY(10px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        slideInRight:{ '0%': { transform: 'translateX(20px)', opacity: '0' }, '100%': { transform: 'translateX(0)', opacity: '1' } },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        auroraFloat: {
          '0%,100%': { transform: 'translate(0, 0) scale(1)' },
          '33%':     { transform: 'translate(30px, -30px) scale(1.05)' },
          '66%':     { transform: 'translate(-20px, 20px) scale(0.95)' },
        },
        glowPulse: {
          '0%,100%': { boxShadow: '0 0 10px rgba(13,242,192,0.3)' },
          '50%':     { boxShadow: '0 0 24px rgba(13,242,192,0.7)' },
        },
      },
      boxShadow: {
        'glow':        '0 0 20px rgba(13,242,192,0.35)',
        'glow-sm':     '0 0 10px rgba(13,242,192,0.25)',
        'glow-violet': '0 0 20px rgba(124,58,237,0.4)',
        'glow-rose':   '0 0 20px rgba(244,63,94,0.35)',
        'glow-amber':  '0 0 20px rgba(245,158,11,0.35)',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          1: 'rgb(var(--color-surface-1) / <alpha-value>)',
          2: 'rgb(var(--color-surface-2) / <alpha-value>)',
          3: 'rgb(var(--color-surface-3) / <alpha-value>)',
          4: 'rgb(var(--color-surface-4) / <alpha-value>)',
        },
        ink: {
          50:  'rgb(var(--color-ink-50)  / <alpha-value>)',
          100: 'rgb(var(--color-ink-100) / <alpha-value>)',
          200: 'rgb(var(--color-ink-200) / <alpha-value>)',
          300: 'rgb(var(--color-ink-300) / <alpha-value>)',
          400: 'rgb(var(--color-ink-400) / <alpha-value>)',
          500: 'rgb(var(--color-ink-500) / <alpha-value>)',
          600: 'rgb(var(--color-ink-600) / <alpha-value>)',
          700: 'rgb(var(--color-ink-700) / <alpha-value>)',
          800: 'rgb(var(--color-ink-800) / <alpha-value>)',
        },
        // Accent palette: #00d09c (primary) → hover → light bg
        gold: {
          50:  '#e7faf5',
          100: '#d0f5ec',
          200: '#a1ead8',
          300: '#00d09c',
          400: '#00d09c',  // primary accent — used for hero CTAs, active states
          500: '#00b386',  // hover state
          600: '#00956d',
          700: '#007a5a',
          800: '#005c44',
          900: '#003d2d',
        },
        // Price direction
        up:   '#12b76a',
        down: '#f04438',
      },
      fontFamily: {
        sans:    ['Manrope', 'system-ui', 'sans-serif'],
        mono:    ['DM Mono', 'ui-monospace', 'monospace'],
        display: ['Manrope', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      animation: {
        'ticker':     'ticker 60s linear infinite',
        'flash-up':   'flash-up 0.6s ease',
        'flash-down': 'flash-down 0.6s ease',
        'pulse-dot':  'pulse-dot 2s ease-in-out infinite',
      },
      keyframes: {
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'flash-up': {
          '0%, 100%': { color: 'rgb(var(--color-ink-50))' },
          '30%':      { color: '#12b76a' },
        },
        'flash-down': {
          '0%, 100%': { color: 'rgb(var(--color-ink-50))' },
          '30%':      { color: '#f04438' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.4', transform: 'scale(0.85)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #00d09c 0%, #00b386 100%)',
      },
      // No shadows — Groww style uses borders only
      boxShadow: {
        'gold-sm': 'none',
        'gold-md': 'none',
        'card':    'none',
      },
    },
  },
  plugins: [],
};

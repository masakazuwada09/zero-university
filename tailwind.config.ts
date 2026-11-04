import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#030a07',
          900: '#06130d',
          850: '#0a1d15',
          800: '#0f291e',
          700: '#173d2d',
          600: '#1f4f3b',
          500: '#2b6950',
        },
        mint: {
          50: '#f0fdf7',
          100: '#dafbee',
          200: '#b6f6dc',
          300: '#83ecc1',
          400: '#4cdaa0',
          500: '#22c55e',
          accent: '#a3ff75',
          neon: '#4ade80',
        },
        beige: {
          50: '#faf8f5',
          100: '#f4efe6',
          200: '#e8e2d3',
          300: '#ded5c2',
          400: '#cec2ab',
          800: '#2c2720',
          900: '#181512',
        },
        charcoal: {
          950: '#080a09',
          900: '#101412',
          850: '#151a17',
          800: '#1c2420',
          700: '#26312c',
        },
        offwhite: '#f7f8f4',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        display: ['var(--font-display)', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-glow': 'radial-gradient(circle at 50% 50%, rgba(76, 218, 160, 0.15), transparent 70%)',
      },
    },
  },
  plugins: [],
}
export default config

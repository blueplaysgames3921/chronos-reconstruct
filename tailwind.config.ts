
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#050505',
        emerald: {
          500: '#10b981',
        },
        amber: {
          500: '#f59e0b',
        },
        red: {
          600: '#dc2626',
        },
        cyan: {
          DEFAULT: '#06b6d4',
        },
      },
      fontFamily: {
        mono: ['var(--font-mono)'],
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'glow-expansion': {
            '0%, 100%': { boxShadow: '0 0 2px 0px rgba(16, 185, 129, 0.7)' },
            '50%': { boxShadow: '0 0 10px 3px rgba(16, 185, 129, 0.5)' },
        }
      },
      animation: {
        flicker: 'flicker 1.5s infinite',
        'glow-expansion': 'glow-expansion 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;


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
        void: '#0E0B16',
        'cyan-glow': '#00FFFF',
        'cyan-border': 'rgba(0, 255, 255, 0.3)',
      },
    },
  },
  plugins: [],
}

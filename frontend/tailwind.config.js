/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdfbf0',
          100: '#f9f3d9',
          200: '#f2e4b0',
          300: '#e7ce7e',
          400: '#dfb76c',
          500: '#d4af37', // Primary Gold Accent
          600: '#b88d29',
          700: '#946921',
          800: '#795320',
          900: '#654420',
          950: '#39230f',
        },
        charcoal: {
          950: '#07080a',
          900: '#0b0c10', // Main Dark Background
          850: '#11131c', // Card Background
          800: '#181b28', // Elevated Layer
          700: '#242838', // Border Color
          600: '#353a4e',
        },
        parchment: {
          100: '#fcf8f0',
          200: '#f4ecd8',
          300: '#e8dbb8',
          400: '#d7c494',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Outfit', 'Inter', 'sans-serif'],
        manuscript: ['Cormorant Garamond', 'serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(212, 175, 55, 0.25)',
        'gold-glow-lg': '0 0 35px -5px rgba(212, 175, 55, 0.4)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #f4ecd8 0%, #d4af37 50%, #997a15 100%)',
        'gold-radial': 'radial-gradient(circle at center, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
      }
    },
  },
  plugins: [],
}

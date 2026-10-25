/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
        },
        cream: {
          50: '#fdfbf7',
          100: '#f9f6ee',
          200: '#f3ede0',
          300: '#e8dec9',
        }
      },
      fontFamily: {
        dancing: ['"Dancing Script"', 'cursive'],
        patrick: ['"Patrick Hand"', 'cursive'],
        comfortaa: ['"Comfortaa"', 'cursive'],
        vietnam: ['"Be Vietnam Pro"', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
        quicksand: ['"Quicksand"', 'sans-serif']
      },
      boxShadow: {
        'soft-3d': '0 20px 40px -15px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.04)',
        'popup-deep': '0 25px 50px -12px rgba(0, 0, 0, 0.22), 0 0 0 1px rgba(255, 255, 255, 0.7)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.12)',
        'polaroid': '0 18px 38px -6px rgba(0, 0, 0, 0.18), 0 6px 16px rgba(0, 0, 0, 0.08)'
      }
    },
  },
  plugins: [],
}

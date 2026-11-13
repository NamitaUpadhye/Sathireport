/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        medivia: {
          green: '#15803d',        // Primary Medivia Green
          greenDark: '#166534',    // Darker green
          greenLight: '#22c55e',   // Bright accent green
          greenSoft: '#f0fdf4',    // Soft green background
          tealDark: '#0b4745',     // Signature deep teal stats banner & hero CTA
          tealDeep: '#063533',     // Deeper teal
          forestDark: '#072827',   // Medivia footer background
          slateBg: '#f8fafc',      // Fresh page background
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
        'spin-reverse': {
          to: { transform: 'rotate(-360deg)' },
        },
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
        'spin-slow-reverse': 'spin-reverse 2s linear infinite',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary: '#0D6EFD'
      },
      screens: {
        xs: '475px',
      },
    },
    plugins: [],
  }
}

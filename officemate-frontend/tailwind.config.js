/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#9BCDD2',
        customPink: '#FFDEDE',
        customBeige: '#FAF0E4',
        customOrange: '#FF8551',
      },
    },
  },
  daisyui: {
    themes: ["light", "pastel", "cupcake"],
  },
  plugins: [require("daisyui")],
}


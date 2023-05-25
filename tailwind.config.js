/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-1": '#16B3AC',
        "primary-2": '#D2DC02',
      },
      fontFamily: {
        poppins: ['var(--font-poppins)'],
        suisseNeue: ['var(--font-suisse-neue)'],
      }
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
  important: true
}

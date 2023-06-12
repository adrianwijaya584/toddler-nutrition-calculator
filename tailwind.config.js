/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    './public/**/*.html'
  ],
  theme: {
    extend: {
      colors: {
        "primary-1": '#2AA8FF',
        "primary-2": '#32B6C1',
        "paragraph": '#637381',
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

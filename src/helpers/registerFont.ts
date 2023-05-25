import localFont from 'next/font/local'

export const poppins= localFont({
  variable: '--font-poppins',
  src: [
    {
      path: './../../public/fonts/Poppins-Regular.ttf',
      weight: 'normal'
    },
  ]
})

export const suisseNeue= localFont({
  variable: '--font-suisse-neue',
  src: [
    {
      path: './../../public/fonts/SuisseNeue-Regular.woff2',
      weight: 'normal'
    },
  ]
})
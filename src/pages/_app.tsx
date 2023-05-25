import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'
import {poppins, suisseNeue} from '@/helpers/registerFont'
import CustomNavbar from '@/components/CustomNavbar'
import CustomFooter from '@/components/CustomFooter'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <title>Toddler Nutrition Calculator</title>
      <meta name="description" content="Aplikasi informasi perhitungan gizi balita" />
      <link rel="manifest" href="/app.webmanifest"></link>
      <link rel="apple-touch-icon" href="/icons/icon-192x192.png"></link>
      <link rel="apple-touch-icon" href="/icons/touch-icon-192x192.png" />
    </Head>

    <div className={`min-h-screen px-5 pt-[70px] pb-8 ${poppins.variable} ${suisseNeue.variable}`}>
      <CustomNavbar/>
      <Component {...pageProps} />
    </div>

    <CustomFooter/>
  </>
  )
}
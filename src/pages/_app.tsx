import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'
import CustomNavbar from '@/components/CustomNavbar'
import CustomFooter from '@/components/CustomFooter'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <title>Toddler Nutrition Calculator</title>
      <meta name="description" content="Aplikasi informasi perhitungan gizi balita" />
    </Head>

    <div className="min-h-screen px-4 pt-[70px] pb-8">
      <CustomNavbar/>
      <Component {...pageProps} />
    </div>

    <CustomFooter/>
  </>
  )
}
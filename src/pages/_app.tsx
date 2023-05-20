import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <title>Toddler Nutrition Calculator</title>
      <meta name="description" content="Aplikasi informasi perhitungan gizi balita" />
    </Head>

    <div className="min-h-screen">
      <Component {...pageProps} />
    </div>
  </>
  )
}
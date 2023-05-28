import Head from "next/head"

const MetaHead= ()=> {
  return (
    <Head>
      <title>Toddler Nutrition Calculator</title>
      <meta name="description" content="Aplikasi informasi perhitungan gizi balita" />
      <link rel="manifest" href="/app.webmanifest"></link>
      <link rel="apple-touch-icon" href="/icons/icon-192x192.png"></link>
      <link rel="apple-touch-icon" href="/icons/touch-icon-192x192.png" />
    </Head>
  )
}

export default MetaHead
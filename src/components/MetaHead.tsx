import Head from "next/head"

const MetaHead= ()=> {

  return (
    <Head>
      <link rel="shortcut icon" href="/icons/tnc_logo.png" type="image/x-icon" />
      <title>Toddler Nutrition Calculator</title>
      <link rel="manifest" href="/app.webmanifest"></link>
      <link rel="apple-touch-icon" href="/icons/icon-192x192.png"></link>
      <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />

      <meta name="dicoding:email" content="agungsurya771@gmail.com" />
      <meta name="description" content="Aplikasi informasi perhitungan gizi balita" />
      <meta name="theme_color" content="#fff" />
      <meta name="robots" content="noodp, noydir"/>
      <meta property="og:title" content="Toddler Nutrition Calculator"/>
      <meta property="og:url" content="/"/>
      <meta property="og:type" content="website"/>
      <meta property="og:image" content="/icons/tnc_logo.png"/>
      <meta name="thumbnail" content="/icons/tnc_logo.png"/>
      <meta property="og:description" content="Aplikasi informasi perhitungan gizi balita"/>

      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:site" content="@adrianwijaya584"/>
      <meta name="twitter:site" content="@adrianwijaya584"/>
      <meta name="twitter:creator" content="@adrianwijaya584"/>
      <meta name="twitter:title" content="Toddler Nutrition Calculator"/>
      <meta name="twitter:description" content="Aplikasi informasi perhitungan gizi balita"/>
      <meta name="twitter:image" content={`/icons/tnc_logo.png`}/>
    </Head>
  )
}

export default MetaHead
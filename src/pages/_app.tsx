import type { AppProps } from 'next/app'
import "aos/dist/aos.css";

import { useEffect } from 'react';
import '../styles/globals.css'
import {poppins, suisseNeue} from '@/helpers/registerFont'
import CustomNavbar from '@/components/CustomNavbar'
import CustomFooter from '@/components/CustomFooter'
import MetaHead from '@/components/MetaHead';

export default function App({ Component, pageProps }: AppProps) {
  async function initAos() {
    const Aos= await import('aos')
    Aos.init()
  }

  useEffect(()=> {
    initAos()
  }, [])

  return (
  <>
    <MetaHead/>

    <div className={`min-h-screen pt-[70px] pb-12 overflow-hidden ${poppins.variable} ${suisseNeue.variable}`}>
      <CustomNavbar/>
      <Component {...pageProps} />
    </div>

    <CustomFooter/>
  </>
  )
}
import type { AppProps } from 'next/app'
import {poppins, suisseNeue} from '@/helpers/registerFont'
import CustomNavbar from '@/components/CustomNavbar'
import CustomFooter from '@/components/CustomFooter'
import MetaHead from '@/components/MetaHead';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {

  return (
  <>
    <MetaHead/>

    <div className={`min-h-screen pt-[70px] pb-12 relative ${poppins.variable} ${suisseNeue.variable}`}>
      <CustomNavbar/>
      <Component {...pageProps} />
      <ToastContainer position='top-right' />
    </div>

    <CustomFooter/>
  </>
  )
}
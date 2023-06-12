import { Footer } from "flowbite-react"
import Image from "next/image"
import Link from "next/link"
import TncLogo from '~/icons/tnc_logo.png'

const CustomFooter= ()=> {
  return (
    <Footer container={true}>
      <div className="w-full text-center">
        <div className="w-full justify-between flex flex-col items-start space-y-5 sm:flex-row sm:items-center sm:space-y-0">
          <div>
          <Link href="/" className="flex flex-row justify-center items-center relative">
            <Image
              src={TncLogo}
              className="max-w-md"
              width={40}
              height={40}
              priority={true}
              alt="Flowbite Logo"
            />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">TNC</span>
        </Link>
          </div>
          <Footer.LinkGroup
            className="flex-row items-center space-x-5 sm:mt-0"
          >
           <li>
            <Link href="/">
              Home
            </Link>
           </li>
           <li>
            <Link href="/psg">
              Perhitungan
            </Link>
           </li>
           <li>
            <Link href="/resep">
              Resep
            </Link>
           </li>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright
          by="TNC Team C23-M4098"
          year={2023}
        />
      </div>
    </Footer>
  )
}

export default CustomFooter
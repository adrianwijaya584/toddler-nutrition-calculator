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
              className="max-w-md w-auto h-auto"
              width={40}
              height={40}
              priority={true}
              alt="Flowbite Logo"
            />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">TNC</span>
        </Link>
          </div>
          <Footer.LinkGroup
            className="flex-row space-x-3 items-center sm:mt-0"
          >
            <Footer.Link href="#">
              Home
            </Footer.Link>
            <Footer.Link href="#">
              Perhitungan
            </Footer.Link>
            <Footer.Link href="#">
              Resep
            </Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright
          by="TNC Team"
          year={2023}
        />
      </div>
    </Footer>
  )
}

export default CustomFooter
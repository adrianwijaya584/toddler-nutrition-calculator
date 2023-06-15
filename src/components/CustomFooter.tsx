import { Footer } from "flowbite-react"
import Image from "next/image"
import Link from "next/link"
import {FaLocationArrow, FaMapMarkerAlt} from "react-icons/fa"
import {GoMail} from "react-icons/go"
import TncLogo from '~/icons/tnc_logo.png'

const CustomFooter= ()=> {
  return (
    <Footer container>
      <div className="w-full">
        <div className="flex flex-col w-full space-y-7 md:space-x-8 md:flex-row">
          <Link href="/" className="flex flex-row items-center relative">
            <Image
              src={TncLogo}
              className="max-w-md"
              width={40}
              height={40}
              priority={true}
              alt="Flowbite Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold text-primary-2 hidden md:block">Toddler Nutrition Calculator</span>
            <span className="self-center whitespace-nowrap text-xl font-semibold text-primary-2 md:hidden ">TNC</span>
          </Link>

          <div className="flex flex-col w-full space-y-7 md:flex-row md:justify-evenly md:space-y-0">
            <div className="md:max-w-[200px]">
              <h2 className="flex text-gray-500 mb-6 text-lg items-center space-x-3 font-semibold">
                <FaMapMarkerAlt className="mr-2 text-xl"/>
                Lokasi Kami
              </h2>

              <Footer.LinkGroup>
                <p className="leading-relaxed">Jl. Raya Puputan No.86, Dangin Puri Klod, Kec. Denpasar Tim., Kota Denpasar, Bali 80234</p>
              </Footer.LinkGroup>
            </div>

            <div>
              <h2 className="flex text-gray-500 mb-6 text-lg items-center space-x-3 font-semibold">
                <GoMail className="mr-2 text-xl"/>
                Kontak Kami
              </h2>
              
              <Footer.LinkGroup col>
                <p className="text-paragraph">info@tnc.com</p>

                <p className="text-paragraph">+62818118888</p>
              </Footer.LinkGroup>
            </div>

            <div>
              <h2 className="flex text-gray-500 mb-6 text-lg items-center space-x-3 font-semibold">
                <FaLocationArrow className="mr-2 text-xl"/>
                Navigasi
              </h2>

              <Footer.LinkGroup col>
                <li>
                  <Link href="/" className="duration-500 hover:text-primary-2">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/psg" className="duration-500 hover:text-primary-2">
                    Perhitungan
                  </Link>
                </li>
                <li>
                  <Link href="/resep" className="duration-500 hover:text-primary-2">
                    Resep
                  </Link>
                </li>
              </Footer.LinkGroup>
            </div>
          </div>
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
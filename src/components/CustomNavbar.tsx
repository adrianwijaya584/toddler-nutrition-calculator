import React, { useEffect, useState } from 'react'
import { Navbar } from "flowbite-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/router'
import TncLogo from '~/icons/tnc_logo.png'

const CustomNavbar= ()=> {
  const router= useRouter()
  const routes= [
    {
      path: '/',
      text: 'Home',
    },
    {
      path: '/psg',
      text: 'Perhitungan',
    },
    {
      path: '/resep',
      text: 'Resep',
    },
  ]
  const [showMenu, setShowMenu]= useState(false)

  useEffect(()=> {
    setShowMenu(false)
  }, [router.pathname])
  

  return (
    <div className="h-[70px] fixed top-0 left-0 z-50 w-full flex items-center">
      <Navbar
        className="w-full h-full px-6 sm:py-0 lg:px-12 xl:px-24 flex items-center"
      >
        <Link href="/" className="flex flex-row justify-center items-center py-4 relative">
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

        <Navbar.Toggle
          onClick={()=> setShowMenu((show)=> !show)}
        />
        
        <ul
          className={`${showMenu?'fixed w-full top-[70px] left-0 bg-gray-50 border-gray-100 md:bg-transparent md:relative':'hidden'}  font-medium flex-col px-4 md:p-0 rounded-lg pb-5 md:flex md:flex-row md:mt-0 md:border-0 md:top-0 `}
        >
          {
            routes.map((route, k)=> (
              <li key={k}>
                <Link href={route.path} className={`${route.path==router.pathname?'text-primary-1':''} block p-4 duration-500 hover:text-primary-2`}>{route.text}</Link>
              </li>
            ))
          }
        </ul>
      </Navbar>
    </div>
  )
}

export default CustomNavbar
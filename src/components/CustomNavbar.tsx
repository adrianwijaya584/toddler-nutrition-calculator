import React, { useEffect, useState } from 'react';
import { Navbar } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import {FaBars} from 'react-icons/fa';
import { useRouter } from 'next/router';
import TncLogo from '~/icons/tnc_logo.png';

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
          <span className="self-center whitespace-nowrap text-xl font-semibold text-primary-2">TNC</span>
        </Link>

        <button data-testid="flowbite-navbar-toggle" className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
        onClick={()=> setShowMenu((show)=> !show)}
        ><span className="sr-only">Open main menu</span><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 12 16" aria-hidden="true" className="h-6 w-6 shrink-0" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.41 9H.59C0 9 0 8.59 0 8c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zm0-4H.59C0 5 0 4.59 0 4c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zM.59 11H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1H.59C0 13 0 12.59 0 12c0-.59 0-1 .59-1z"></path></svg></button>
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
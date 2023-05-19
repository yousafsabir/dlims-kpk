'use client'

import HamburgerIcon from '@/assets/Hamburger'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { NavbarOptions } from '@/constants/navbar'
const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="max-w-7xl flex justify-between items-center text-white mx-auto w-full px-4 mb-16 pt-5">
      <div>
        <Image alt="LOGO" width={70} height={70} src="/images/main_logo.png" />
      </div>
      <div className="hidden lg:block">
        <div className="flex justify-center items-center gap-3">
          {NavbarOptions.map((item) => (
            <Link
              href={item.id}
              key={item.id}
              className="transition-opacity opacity-75 hover:opacity-100 rounded-lg font-bold"
            >
              <h2>{item.title}</h2>
            </Link>
          ))}
        </div>
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-50 hover:text-black hover:border-gray-400"
          onClick={toggleMenu}
        >
          <HamburgerIcon />
        </button>
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } w-full p-2 block lg:flex lg:items-center lg:w-auto`}
        >
          <div className="flex absolute w-36 p-2 transition-all ease-in-out duration-400 right-2 rounded-lg bg-black text-white opacity-80 flex-col justify-start items-start gap-3">
            {NavbarOptions.map((item) => (
              <Link
                key={item.id}
                href={item.id}
                className="p-2 rounded-lg hover:text-gray-800 hover:bg-slate-100"
              >
                <h2>{item.title}</h2>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Navbar

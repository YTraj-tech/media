import React from 'react'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'


const NavBar = () => {
  return (
    <nav className='flex flex-row w-full justify-evenly items-center  gap-x-20 fixed    z-50'>
      <div className='text-6xl font-bold '>
        Logo
      </div>
      
      <div className='flex flex-row space-x-6'>
        <Link href="#home" className='text-gray-700 text-2xl hover:text-blue-600 transition-colors duration-200'>
          Home
        </Link>
        <Link href="#about" className='text-gray-700 text-2xl hover:text-blue-600 transition-colors duration-200'>
          About
        </Link>
        <Link href="#services" className='text-gray-700 text-2xl hover:text-blue-600 transition-colors duration-200'>
          Services
        </Link>
        <Link href="#contact" className='text-gray-700 text-2xl hover:text-blue-600 transition-colors duration-200'>
          Contact
        </Link>
         <UserButton/>
      </div>
      
      <button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200'>
        Sign In
      </button>
    </nav>
  )
}

export default NavBar
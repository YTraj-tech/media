 
//  'use client'

// import React from 'react'
// import Link from 'next/link'
// import { UserButton } from '@clerk/nextjs'
// import { UseClientContext } from '@/context/ClientContext'


// const NavBar = () => {

//    const {UserRole} = UseClientContext()

//   return (
//     <nav className='flex flex-row w-full justify-evenly items-center  gap-x-20 fixed    z-50'>
//       <div className='text-6xl font-bold '>
//         Logo
//       </div>
      
//       <div className='flex flex-row space-x-6'>
//         <Link href="#home" className='text-gray-700 text-2xl hover:text-blue-600 transition-colors duration-200'>
//           Home
//         </Link>
//         <Link href="#about" className='text-gray-700 text-2xl hover:text-blue-600 transition-colors duration-200'>
//           About
//         </Link>
//         <Link href="#services" className='text-gray-700 text-2xl hover:text-blue-600 transition-colors duration-200'>
//           Services
//         </Link>
//         <Link href="#contact" className='text-gray-700 text-2xl hover:text-blue-600 transition-colors duration-200'>
//           {UserRole==="client" ? }
//         </Link>
//          <UserButton/>
//       </div>
      
//       <button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200'>
//         Sign In
//       </button>
//     </nav>
//   )
// }

// export default NavBar


'use client'

import React from 'react'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { UseClientContext } from '@/context/ClientContext'

const NavBar = () => {

  const { UserRole } = UseClientContext()

  return (
    <nav className='flex flex-row w-full justify-evenly items-center gap-x-20 fixed z-50'>

      {/* Logo */}
      <div className='text-6xl font-bold'>
        Logo
      </div>

      {/* Links */}
      <div className='flex flex-row space-x-6'>

        <Link href="/" className='text-gray-700 text-2xl hover:text-blue-600'>
          Home
        </Link>

        <Link href="/about" className='text-gray-700 text-2xl hover:text-blue-600'>
          About
        </Link>

        <Link href="/services" className='text-gray-700 text-2xl hover:text-blue-600'>
          Services
        </Link>

        {/* 👇 ROLE BASED LINK */}
        {UserRole === "client" && (
          <Link href="/dashboard" className='text-green-600 text-2xl'>
            Client Dashboard
          </Link>
        )}

        {UserRole === "worker" && (
          <Link href="/worker" className='text-orange-600 text-2xl'>
            Worker Panel
          </Link>
        )}

        {UserRole === "Admin" && (
          <Link href="/admin" className='text-red-600 text-2xl'>
            Admin Panel
          </Link>
        )}

      </div>

      {/* Auth */}
      <div className='flex items-center gap-x-4'>

        <UserButton />

        {!UserRole && (
          <button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700'>
            Sign In
          </button>
        )}

      </div>

    </nav>
  )
}

export default NavBar
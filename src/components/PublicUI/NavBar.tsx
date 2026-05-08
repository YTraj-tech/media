


// 'use client'

// import React, { useEffect } from 'react'
// import Link from 'next/link'
// import { UserButton } from '@clerk/nextjs'
// import { useState } from 'react'
// import { UseClientContext } from '@/context/ClientContext'

// const NavBar = () => {

//   const [UserRole,setUserRole] = useState<null|string>('client')

//   useEffect(() => {
//     const role = localStorage.getItem('role')
//      setUserRole(role)
//   }, [UserRole])
  
//   return (
//     <nav className='flex flex-row  sm:w-2xl md:w-full  justify-evenly items-center gap-x-20 fixed z-50'>

//       {/* Logo */}
//       <div className='text-6xl font-bold'>
//         Logo
//       </div>

//       {/* Links */}
//       <div className='flex flex-row space-x-6'>

//         <Link href="/" className='text-gray-700 text-2xl hover:text-blue-600'>
//           Home
//         </Link>

//         <Link href="/about" className='text-gray-700 text-2xl hover:text-blue-600'>
//           About
//         </Link>

//         <Link href="/services" className='text-gray-700 text-2xl hover:text-blue-600'>
//           Services
//         </Link>

//         {/* 👇 ROLE BASED LINK */}
//         {UserRole === "client" && (
//           <Link href="/dashboard" className='text-green-600 text-2xl'>
//             Client Dashboard
//           </Link>
//         )}

//         {UserRole === "worker" && (
//           <Link href="/worker" className='text-orange-600 text-2xl'>
//             Worker Panel
//           </Link>
//         )}

//         {UserRole === "Admin" && (
//           <Link href="/Admin" className='text-red-600 text-2xl'>
//             Admin Panel
//           </Link>
//         )}

//       </div>

//       {/* Auth */}
//       <div className='flex items-center gap-x-4'>

//         <UserButton />

//         {!UserRole && (
//           <button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700'>
//             Sign In
//           </button>
//         )}

//       </div>

//     </nav>
//   )
// }

// export default NavBar


'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { UserButton, SignInButton, SignUpButton, useUser } from '@clerk/nextjs'

const NavBar = () => {
  const { isSignedIn, isLoaded } = useUser()
  const [userRole, setUserRole] = useState<null | string>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const role = localStorage.getItem('role')
    setUserRole(role)
  }, [])

  const roleLink = () => {
    if (userRole === 'client')
      return { href: '/dashboard', label: 'Client Dashboard', className: 'text-green-600' }
    if (userRole === 'worker')
      return { href: '/worker', label: 'Worker Panel', className: 'text-orange-500' }
    if (userRole === 'Admin')
      return { href: '/Admin', label: 'Admin Panel', className: 'text-red-600' }
    return null
  }

  const rl = roleLink()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    ...(rl ? [rl] : []),
  ]

  const AuthButtons = ({ size = 'md' }: { size?: 'sm' | 'md' }) => {
    const px = size === 'sm' ? 'px-3 py-1.5' : 'px-4 py-2'
    return (
      <>
        <SignInButton mode="modal">
          <button className={`text-sm font-medium text-gray-700 ${px} rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors`}>
            Sign In
          </button>
        </SignInButton>

        <SignUpButton mode="modal">
          <button className={`text-sm font-medium text-white bg-blue-600 ${px} rounded-lg hover:bg-blue-700 transition-colors`}>
            Sign Up
          </button>
        </SignUpButton>
      </>
    )
  }

  // Don't render auth section until Clerk has loaded — prevents flicker
  const AuthSection = ({ size = 'md' }: { size?: 'sm' | 'md' }) => {
    if (!isLoaded) return <div className="w-16 h-8 bg-gray-100 animate-pulse rounded-lg" />
    if (isSignedIn) return <UserButton />
    return <AuthButtons size={size} />
  }

  return (
    <nav className="fixed top-0 left-0 md:my-3 right-0 z-50 bg-white/90 backdrop-blur ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="text-2xl font-bold tracking-tight text-gray-900">
            Logo
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-x-8">
            {navLinks.map(({ href, label, className }) => (
              <Link
                key={href}
                href={href}
                className={` text-lg md:text-xl transition-colors hover:text-blue-600 ${className ?? 'text-gray-700'}`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-x-3">
            <AuthSection size="md" />
          </div>

          {/* Mobile: Auth + Hamburger */}
          <div className="flex md:hidden items-center gap-x-2">
            <AuthSection size="sm" />

            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-md">
          <div className="flex flex-col px-4 py-3 gap-y-3">
            {navLinks.map(({ href, label, className }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`text-base font-medium py-1 transition-colors hover:text-blue-600 ${className ?? 'text-gray-700'}`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavBar
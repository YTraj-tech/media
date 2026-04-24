'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Noto_Sans } from 'next/font/google'
import {
  LayoutDashboard,
  User,
  FilePlus,
  Activity,
  LogOut,
} from 'lucide-react'

interface INav {
  href: string
  label: string
  icon: React.ReactNode
}

const Labelfont = Noto_Sans({
  subsets:['latin'],
  weight:['500']
})

const navLinks: INav[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard size={20} />,
  },
  {
    href: '/dashboard/profile',
    label: 'Profile',
    icon: <User size={20} />,
  },
  {
    href: '/dashboard/createTask',
    label: 'CreateTask',
    icon: <FilePlus size={20} />,
  },
  {
    href: '/dashboard/Track',
    label: 'Live Tracking',
    icon: <Activity size={20} />,
  },
]

const SideBar = () => {
  const pathName = usePathname()

  const isActive = (href: string) => pathName === href

  return (
    <nav className="h-screen flex flex-col mx-12 gap-y-16  ">

      {/* Logo */}
        <img src="/logo.webp" alt="logo" className="h-40 w-40" />

      {/* Nav links */}

      <div className="flex flex-col">
        <h1 className='text-sm  text-gray-400'>OVERVIEW</h1>

        {navLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`
              flex items-center gap-2 mx-3 my-3  py-3  rounded-[10px]
               duration-150 
               ${Labelfont.className}
               ${isActive(item.href)
                ? 'text-xl font-extrabold'
                : 'text-lg font-semibold'}`}
          >

            <span className={isActive(item.href) ? 'text-indigo-500' : ''}>
              {item.icon}
            </span>
            {item.label}
          </Link>
        ))}
      </div>

      {/* Logout */}
      <div className='mt-9' >
        <h1 className='text-gray-500  text-sm'>SETTINGS</h1>
        <button
          className="
            flex items-center text-red-300 gap-3 px-3 py-3 rounded-[10px] w-full
             font-medium"
          onClick={() => { /* your logout logic */ }}
        >
          <LogOut size={18} />
          Logout
        </button>
        <button
          className="
            flex items-center gap-3 px-3 py-3 rounded-[10px] w-full
             font-medium"
          onClick={() => { /* your logout logic */ }}
        >
          <LogOut size={18} />
          Settings
        </button>
      </div>
    </nav>
  )
}

export default SideBar
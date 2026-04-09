import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Bentham } from "next/font/google"
import { 
  Home, 
  BarChart3, 
  Settings, 
  Users, 
  FileText, 
  Bell,
  LogOut,
  User
} from 'lucide-react'

const bentham = Bentham({
  subsets: ["latin"],
  weight: ["400"],
})

interface NavItem {
  label: string
  icon: React.ReactNode
  href: string
  badge?: number
}

const Sidebar = () => {
  const navItems: NavItem[] = [
    {
      label: 'Home',
      icon: <Home className='w-9 h-9' />,
      href: '/home'
    },
    {
      label: 'LiveTracking',
      icon: <BarChart3 className='w-9 h-9' />,
      href: '/dashboard/Track'
    },
    {
      label: 'Profile',
      icon: <Users className='w-9 h-9' />,
      href: '/dashboard/profile'
    },
    {
      label: 'CreateTask',
      icon: <FileText className='w-9 h-9' />,
      href: '/dashboard/createTask'
    },
    {
      label: 'ListOfTasks',
      icon: <Bell className='w-9 h-9' />,
      href: '/dashboard/Track/Tasks',
    },
   
  ]

  return (
    <div className=' flex flex-col mx-10'>
      {/* Logo Section */}
      <div className=' w-full flex  items-center justify-center md:justify-start'>
        <Image
          src={'/logo.webp'}
          alt='logo'
          width={200}
          height={60}
          className='w-35 md:w-45 h-auto object-contain'
          priority
        />
      </div>

      {/* Navigation Routes */}
      <nav className='flex flex-col  gap-5 flex-1'>
        {navItems.map((item, index) => (
          <Link 
            key={index}
            href={item.href}
            className={`
               relative flex items-center-safe gap-4 px-4 my-2 md:my-4 rounded-xl
              text-purple-200  duration-300 
              font-medium text-sm md:text-base
              ${bentham.className}
              hover:shadow-md hover:scale-102
            `}
          >
            {/* Icon */}
            <div className="text-purple-400 text-lg">
              {item.icon}
            </div>

            {/* Label */}
            <span className=' text-purple-400 text-lg'>{item.label}</span>

            {/* Badge */}
            {item.badge && (
              <span className='
                flex items-center justify-center 
                w-6 h-6 rounded-full 
                bg-red-500 text-white text-xs font-bold
                group-hover:bg-red-600 transition-colors
              '>
                {item.badge}
              </span>
            )}

            {/* Hover indicator */}
            <div className='absolute inset-0 rounded-xl bg-blue-100 opacity-0 group-hover:opacity-10 transition-opacity -z-10' />
          </Link>
        ))}
      </nav>

      {/* Divider */}
      {/* <div className='my-6 h-px bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200' /> */}

      {/* Profile Section at Bottom */}
      <div>
        {/* Logout Button */}
        <a
          href='/logout'
          className={`
            group flex items-center gap-4 px-4 py-5 rounded-xl
            text-gray-700 hover:text-red-600 
            hover:bg-red-50 transition-all duration-300 
            font-medium text-sm md:text-base
            ${bentham.className}
          `}
        >
          <LogOut className='w-5 h-5 group-hover:text-red-600 transition-colors' />
          <span>Logout</span>
        </a>

        {/* User Profile Card */}
        <div className='
          flex items-center gap-3 px-4 my-9 rounded-xl
          bg-white/50 hover:bg-white 
          transition-all duration-300 cursor-pointer
          border border-blue-200/50 hover:border-blue-300
          group
        '>
          <div className='
             w-10 h-10 rounded-full 
            bg-gradient-to-br from-blue-400 to-blue-600
            flex items-center justify-center 
            text-white font-bold text-sm
            group-hover:shadow-lg transition-shadow
          '>
            <User className='w-6 h-6' />
          </div>
          <div className='flex-1 m-5 '>
            <p className={`text-sm font-semibold text-gray-700 truncate ${bentham.className}`}>
              John Doe
            </p>
            <p className='text-xs text-gray-500 truncate'>
              john@example.com
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
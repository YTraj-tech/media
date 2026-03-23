

import React from 'react'
import { delay } from '@/lib/delay'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { connectDB } from '@/lib/dbconnect'
import { Iuser, User } from '../../../../models/user.model'
import Sidebar from '@/components/ClientSide/sidebar'
import Navbar from '@/components/Navbar'

const ClientLayout = async ({ children }: { children: React.ReactNode }) => {


  return (
    <div>
      <main>

        <div className="h-fit overflow-hidden  flex flex-row md:m-[5%] ">
          <Sidebar />
          {children}
       </div>
      </main>
    </div>
  )
}

export default ClientLayout

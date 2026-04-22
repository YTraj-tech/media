
import React from 'react'
import SideBar from '@/components/clientCompo/SideBar'
import { ClientProvider } from '@/context/ClientContext'
import { AdminProvider } from '@/context/AdminContext'

export default async  function ClientLayout  ({ children }: { children: React.ReactNode })  {
  return (
    <div className="flex h-full ">

      <SideBar />

      {/* Page content — changes per route */}
      <main className="flex-1 justify-center items-center w-full overflow-hidden h-screen ">
        <ClientProvider>

          {children}
        </ClientProvider>
      </main>

    </div>

  )
}


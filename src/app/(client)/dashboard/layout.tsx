
import React from 'react'
import SideBar from '@/components/clientCompo/SideBar'
import { ClientProvider, UseClientContext } from '@/context/ClientContext'


export default function ClientLayout({ children }: { children: React.ReactNode }) {



  return (
    <div className="flex h-full ">

      <SideBar />

      <main className="flex-1 justify-center w-screen items-center overflow-hidden h-screen ">
        <ClientProvider>

          {children}
        </ClientProvider>
      </main>

    </div>

  )
}


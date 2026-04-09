import React from 'react'
import SideBar from '@/components/clientCompo/SideBar'

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" fixed  inset-0 flex px-[6%] py-[3%]">


      <div className="flex flex-1  rounded-[20px] overflow-hidden shadow-[0_0_0_1px_#1e1e1e,0_40px_80px_rgba(0,0,0,0.6)]">

        <SideBar />

        {/* Page content — changes per route */}
        <main className="flex-1 border-l-2   border-red-200 rounded-r-[18px] ">
          {children}
        </main>

      </div>
    </div>
  )
}

export default ClientLayout
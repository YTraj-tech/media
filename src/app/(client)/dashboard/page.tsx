
'use client'
import { HoverBorderGradientDemo } from "@/components/ReuseCompo/Button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"
import { Noto_Sans_Display } from "next/font/google"
import CardData from "@/components/clientCompo/CardData";
import { TableOfTask } from "@/components/clientCompo/TabelofTask"
import { Button } from "@/components/ui/button"
import FilterData from "@/components/clientCompo/FilterData"
import ClientCard from "@/components/clientCompo/UserProfile"
import { Suspense } from "react"

const Vend = Noto_Sans_Display({
  subsets: ['latin'],
  weight: ['600']
})

const ClientPage = () => {

  return (
    <div className=" h-full  flex flex-row   border-l-2 border-b-2  border-gray-300  ml-20">

      <section className="flex h-full flex-col no-scrollbar border-r-2  border-gray-300  w-6xl pt-9   overflow-y-scroll">

        <div className="w-full flex flex-row justify-between gap-x-5 relative border-b-2 px-9  border-gray-300 pb-4">
          <input type="text" placeholder="Search your task..." className="py-2.5 ml-10 pl-12 border-2 border-gray-300 w-1/2 rounded-2xl bg-white" />
          <Search className="absolute top-3 left-24 font-extrabold text-gray-500" />
          <button className=" p-3 rounded-2xl bg-linear-to-r from-[#0f172a]  to-[#334155] text-white">Create Task</button>
        </div>
        <div className='flex-col ml-9'>
          <h1 className={`text-4xl  text-gray-700 mt-12 ${Vend.className} `}>Campaign Dashboard</h1>
          <p className="text-sm ml-3 text-gray-400 mb-5">
            Monitor, manage, and optimize all your campaigns from a single place.
          </p>
        </div>
        <Suspense fallback={<p>loading...</p>}>        
          <CardData />
        </Suspense>
        <div className="ml-9">
          <h1 className={`text-3xl text-gray-700 mt-12 ${Vend.className} `}>List Of All Task</h1>
          <p className="text-sm ml-3 text-gray-400 mb-9 ">
            Monitor, manage, and optimize all your campaigns from a single place.
          </p>
          <FilterData />

          <TableOfTask />
        </div>
      </section>
      <section className="flex-1 bg-[#F5F6F7] h-full  p-9 m-9 rounded-3xl ">
        <ClientCard />
      </section>
    </div>
  )
}


export default ClientPage
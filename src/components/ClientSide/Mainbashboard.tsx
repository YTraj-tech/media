





import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { ArrowRight, Badge, Sparkles, Zap } from 'lucide-react'
import { Inter } from "next/font/google"
import { RetroGrid } from "@/components/ui/retro-grid"
import React from 'react'
import HoverButton from '@/components/ClientSide/HoverBtn'
import IconSlideButton from '@/components/ClientSide/HoverBtn'
import Image from 'next/image'
import BoardCard from '@/components/ClientSide/BoardCard'
import ClientTaskTabel from '@/components/ClientSide/ClientTaskTabel'


const Benthamfount = Inter({
  subsets: ["latin"],
  weight: ['400']
})


const Mainbashboard = () => {
  return (
    <div className='px-5 bg-[#D0E4E5] w-full flex flex-col mt-9'>
      <Card className="flex-1 border-0  bg-[#ADCFD1] text-white  rounded-2xl overflow-hidden relative">
        {/* Content with relative positioning to appear above the grid */}
        <div className="relative z-10">
          {/* Main Content */}
          <CardContent className="px-8">
            {/* Heading */}
            <div className={`${Benthamfount.className} mt-9`}>
              <h1 className="text-3xl text-blue-950 font-semibold md:text-6xl">
                Hey, Siddaraj Great
              </h1>
              <h1 className="text-3xl mt-2 text-purple-500 font-semibold md:text-6xl ">
                Good Luck For Today
              </h1>
            </div>

            {/* Button */}
            {/* <div className="pt-4">
              <button
                className=" mt-2 bg-purple-400 text-white font-semibold text-base hover:bg-opacity-90 transition-all duration-200 rounded-lg shadow-lg hover:shadow-xl"
              >
                Join Now
              </button>
            </div> */}
            <IconSlideButton />
          </CardContent>
        </div>
        <div className="absolute inset-0 z-0">
          <RetroGrid opacity={1} />
        </div>
      </Card>

      <div>
         <BoardCard/>
      </div>
      <div>
        <ClientTaskTabel/>
      </div>
    </div>
  )
}

export default Mainbashboard







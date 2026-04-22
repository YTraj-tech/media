import React from 'react'
import { TbSum } from "react-icons/tb";
import { TbLiveView } from "react-icons/tb";
import { MdOutlinePendingActions } from "react-icons/md";
import { Archivo } from "next/font/google"
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'

const Vend = Archivo({
    subsets: ['latin'],
    weight: ['300']
})

const CardData = () => {
    return (
        <section className='flex gap-x-4 mx-12 '>
         
            <Card className="flex flex-row rounded-3xl p-5 m-3  w-fit border-2 border-gray-200 text-white bg-linear-to-r from-[#0f172a]  to-[#334155] ">
                <div>
                    <CardTitle className={`text-3xl ${Vend.className}`}>Total Tasks</CardTitle>
                    <span className='ml-2'>All the tasks created</span>
                    <CardContent className={`text-4xl ${Vend.className} `}>00</CardContent>
                </div>
                <TbSum className='text-3xl mt-0.5' />
            </Card>
            <Card className="flex flex-row  rounded-3xl p-5 m-3  w-fit border-2 border-gray-500   ">
                <div>
                    <CardTitle className={`text-3xl ${Vend.className}`}>Total Tasks</CardTitle>
                    <span className='ml-2'>All the tasks created</span>
                    <CardContent className={`text-4xl ${Vend.className} `}>00</CardContent>
                </div>
                <TbSum className='text-3xl mt-0.5' />
            </Card>
            <Card className="flex flex-row  rounded-3xl p-5 m-3  w-fit border-2 border-gray-500   ">
                <div>
                    <CardTitle className={`text-3xl ${Vend.className}`}>Total Tasks</CardTitle>
                    <span className='ml-2'>All the tasks created</span>
                    <CardContent className={`text-4xl ${Vend.className} `}>00</CardContent>
                </div>
                <TbSum className='text-3xl mt-0.5' />
            </Card>
        </section>
    )
}

export default CardData

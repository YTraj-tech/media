import React from 'react'
import { TbSum } from "react-icons/tb";
import { TbLiveView } from "react-icons/tb";
import { MdOutlinePendingActions } from "react-icons/md";
import { Quicksand } from "next/font/google"
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'

const Vend = Quicksand({
    subsets: ['latin'],
    weight: ['400'],

})

const CardData = () => {
    return (
        <section className='flex ml-9 gap-9 items-stretch'>

            {/* Total Tasks Completed - Dark Card */}
            <Card className="flex flex-row justify-between items-center relative w-1/3 rounded-3xl p-5  border-2 border-gray-200 text-white bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800">
                <div className="flex flex-col">
                    <CardTitle className={`text-3xl mb-1 ${Vend.className}`}>Completed Tasks</CardTitle>
                    <span className='ml-1 text-gray-400 text-sm'>      Successfully finished across all campaigns</span>
                    <CardContent className={`text-5xl ml-6 ${Vend.className} p-0 mt-2`}>00</CardContent>
                </div>
                <TbSum className='text-4xl absolute top-5 right-5 opacity-80' />
            </Card>

            {/* Total Tasks - Light Card */}
            <Card className="flex flex-row justify-between relative w-1/4 items-center rounded-3xl p-5 border-2 border-gray-200">
                <div className="flex flex-col gap-1">
                    <CardTitle className={`text-2xl ${Vend.className}`}>Total Tasks</CardTitle>
                    <span className='ml-1 text-gray-400 text-sm'>All the tasks created</span>
                    <CardContent className={`text-5xl ml-1 ${Vend.className} p-0 mt-2`}>00</CardContent>
                </div>
                <TbSum className='text-4xl absolute top-5 right-5 opacity-70' />
            </Card>

            {/* Pending Tasks - Light Card */}
            <Card className="flex flex-row justify-between w-1/4 relative items-center rounded-3xl p-5  border-2 border-gray-200">
                <div className="flex flex-col gap-1">
                    <CardTitle className={`text-2xl ${Vend.className}`}>Pending Tasks</CardTitle>
                    <span className='ml-1 text-gray-400 text-sm'>All the tasks pending</span>
                    <CardContent className={`text-5xl ml-1 ${Vend.className} p-0 mt-2`}>00</CardContent>
                </div>
                <MdOutlinePendingActions className='text-4xl absolute top-5 right-5 opacity-70' />
            </Card>

        </section>
    )
}

export default CardData

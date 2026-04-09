import React from 'react'
// import { Space_Grotes} from "next/font/google"
import { Space_Grotesk } from 'next/font/google'
import GridVedios from './gridvedios'


const unica = Space_Grotesk({
  subsets: ["latin-ext"],
  weight: '500'
})


const HeroSection = () => {

  return (
    <section className="flex  flex-row py-28  ">
      {/* Left half — text */}
      <div className="w-1/2 flex flex-col justify-center md:pl-36 md:mt-36 ">

        <h1 className={`text-9xl font-stretch-ultra-expanded ${unica.className} `}>
          WELCOME <br />
          <span>ABROAD</span>
        </h1>

        <p className='text-2xl font-extralight my-3'>The best snorel excurision according to your friends</p>

        <div className="flex gap-5 my-6 mx-9">
          <button className="px-12 py-3 text-2xl bg-indigo-600 font-medium rounded-lg hover:bg-indigo-700 transition-colors">
            Check availability
          </button>
          <button className="px-6 py-3 bg-indigo-600   border border-gray-300 text-white text-2xl rounded-lg ">
            About us
          </button>
        </div>
      </div>

      <div className="w-1/2 flex justify-center items-center overflow-x-hidden md:mt-32">
        <GridVedios />
      </div>
    </section>
  )
}

export default HeroSection




import { Quicksand, Space_Grotesk } from 'next/font/google'
import GridVedios from './gridvedios'
import { ShimmerButton } from '../ui/shimmer-button'

const unica = Space_Grotesk({
  subsets: ["latin-ext"],
  weight: '400'
})

const HeroSection = () => {
  return (
    <section className="flex  flex-col lg:mt-20  lg:flex lg:flex-row   md:h-250  ">
      {/* Left half — text */}
      <div className="  lg:w-1/2  text-center mt-24   lg:mt-60 ">
        <h1 className={`text-3xl  sm:text-5xl lg:text-6xl   2xl:text-9xl  ${unica.className}`}>
          WELCOMEBRO <br />
          <span>ABROAD</span>
        </h1>

        <p className='text-sm  md:text-2xl font-extralight my-3 px-3'>
          The best snorkel excursion according to your friends
        </p>

        <div className="flex justify-center items-center gap-2 md:gap-6 md:my-6  ">
          <ShimmerButton className="shadow-2xl">
            <span className="text-center text-sm leading-none font-medium tracking-tight whitespace-pre-wrap text-white lg:text-lg dark:from-white dark:to-slate-900/10">
              Get Started →
            </span>
          </ShimmerButton>
        </div>
      </div>

      {/* Right half — grid videos, desktop only */}
      <div className="lg:w-1/2 flex justify-center items-center flex-col lg:flex lg:relative  overflow-hidden">
        <GridVedios />
      </div>
    </section>
  )
}

export default HeroSection


// import React from 'react'
// import {Quicksand} from "next/font/google"

// const Quick = Quicksand({
//    subsets:['latin'],
//    weight:['500']
// })

// const HeroSection = () => {
//   return (
//     <div>
//       <div className=" w-20 md:w-1/2  mt-20 md:mt-60 ">
//          <h1 className={` text-3xl w-fit md:text-6xl lg:text-8xl xl:text-9xl ${Quick.className}`}>
//            WELCOME <br />
//            <span>ABROAD</span>
//          </h1>

//          <p className='text-sm  md:text-2xl font-extralight my-3 px-3'>
//            The best snorkel excursion according to your friends
//          </p>
//       </div>
//       </div>
//       )
// }

//       export default HeroSection

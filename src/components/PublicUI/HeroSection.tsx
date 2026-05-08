// // import React from 'react'
// // import { Space_Grotesk } from 'next/font/google'
// // import GridVedios from './gridvedios'


// // const unica = Space_Grotesk({
// //   subsets: ["latin-ext"],
// //   weight: '500'
// // })


// // const HeroSection = () => {

// //   return (
// //     <section className="flex h-full md:h-250 flex-row overflow-x-hidden  ">
// //       {/* Left half — text */}
// //       <div className=" md:w-1/2  mt-12 md:mt-60 text-center lg:flex-col lg:justify-center  ">

// //         <h1 className={` text-center text-5xl  md:text-6xl lg:text-8xl xl:text-9xl  ${unica.className} `}>
// //           WELCOME <br />
// //           <span>ABROAD</span>
// //         </h1>

// //         <p className=' text-lg md:text-2xl font-extralight my-3'>The best snorel excurision according to your friends</p>

// //         <div className="  flex flex-col md:flex-row  gap-2 md:gap-6 md:my-6 md:ml-36 text-center">
// //           <button className="md:p-5 text-lg md:text-2xl bg-indigo-600 font-medium rounded-lg hover:bg-indigo-700 transition-colors">
// //             Check availability
// //           </button>
// //           <button className=" md:px-5 py-3  text-lg md:text-2xl bg-indigo-600   border border-gray-300 text-white  rounded-lg ">
// //             About us
// //           </button>
// //         </div>
// //       </div>

// //       <div className=" hidden w-1/2    lg:flex relative justify-center  items-center overflow-x-hidden ">
// //         <GridVedios />
// //       </div>
// //     </section>
// //   )
// // }

// // export default HeroSection



import { Quicksand, Space_Grotesk } from 'next/font/google'
import GridVedios from './gridvedios'
import { ShimmerButton } from '../ui/shimmer-button'

const unica = Space_Grotesk({
  subsets: ["latin-ext"],
  weight: '400'
})

const HeroSection = () => {
  return (
    <section className="flex  flex-col md:mt-20  md:flex md:flex-row   md:h-250  ">
      {/* Left half — text */}
      <div className="  md:w-1/2  text-center mt-16 md:mt-60 ">
        <h1 className={` text-4xl md:text-6xl lg:text-8xl xl:text-9xl ${unica.className}`}>
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
      <div className=" mx-5 md:w-1/2 flex-col md:flex md:relative  overflow-hidden">
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

import React from 'react'
import {Space_Grotesk} from "next/font/google"

const Span = Space_Grotesk({
    subsets:['latin-ext'],
    weight:'500'
})

const Note = () => {
  return (
    <article className='mt-12 md:my-40 w-full flex flex-col justify-center items-center'>
        <h1 className={`text-xl sm:text-3xl md:text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl ${Span.className}`}>WE SPEND <span className='text-green-500'>$0</span> DOLLAR ON </h1>
        <h1 className={`text-xl sm:text-3xl  md:text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl ${Span.className}`}>MARKETING</h1>
        <p className=' text-xl sm:text-3xl m-3'>So Somebody probebly told about us</p>
        <div className='mt-5 md:mt-12'>
            <button className='bg-blue-700 rounded-4xl text-white px-12 py-6 text-xl'>FAQ</button>
        </div>
    </article>
  )
}

export default Note

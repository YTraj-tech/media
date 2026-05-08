import React from 'react'
import {Space_Grotesk} from "next/font/google"

const Span = Space_Grotesk({
    subsets:['latin-ext'],
    weight:'500'
})

const Note = () => {
  return (
    <article className='mt-12 w-fit flex flex-col justify-center items-center'>
        <h1 className={`text-2xl md:text-8xl ${Span.className}`}>WE SPEND <span className='text-green-500'>$0</span> DOLLAR ON </h1>
        <h1 className={`text-2xl md:text-8xl ${Span.className}`}>MARKETING</h1>
        <p className='text-2xl m-3'>So Somebody probebly told about us</p>
        <div className='mt-5 md:mt-12'>
            <button className='bg-blue-700 rounded-4xl text-white px-12 py-6 text-lg'>FAQ</button>
        </div>
    </article>
  )
}

export default Note

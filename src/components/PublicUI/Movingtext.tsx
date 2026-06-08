'use client'
import React from 'react'
import { motion } from 'framer-motion'

const Movingtext = () => {
  const paratext: string[] = [
    "Amplifying brand visibility through strategic offline marketing solutions",
    "Transforming public spaces into powerful advertising opportunities",
    "Driving customer engagement with targeted outdoor advertising campaigns",
    "Delivering high-impact brand exposure where audiences live and travel",
    "Bridging businesses and communities through innovative offline media"
  ];
  return (
    <div className='overflow-hidden mt-12 md:mt-20'>
      <motion.div
        className='flex gap-10 text-center w-max'
        animate={{ x: ["0%", "-30%"] }}
        transition={{
          repeat: Infinity,
          duration: 50,
          ease: 'linear'
        }}
      >
        {[...paratext, ...paratext, ...paratext, ...paratext].map((text, inx) => (
          <h1 key={inx} className='text-2xl text-gray-500  mx-12 '>
            {text.slice(0, 40)}
            <br />
            <span>{text.slice(41, text.length - 1)}</span>
          </h1>
        ))}
      </motion.div>
    </div>
  )
}

export default Movingtext
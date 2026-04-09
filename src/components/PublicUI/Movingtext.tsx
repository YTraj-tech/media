'use client'
import React from 'react'
import { motion } from 'framer-motion'

const Movingtext = () => {
const paratext: string[] = [
  "Building modern web experiences with creativity Building modern",
  "Turning ideas into scalable and powerful digital solutions Building modern",
  "Passionate about coding, learning, and solving real problems Building modern",
  "Designing smooth user interfaces with clean interactions Building modern",
  "Always exploring new technologies to grow and improve Building modern"
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
        {[...paratext, ...paratext,...paratext,...paratext].map((text, inx) => (
          <h1 key={inx} className='text-2xl  mx-12 '>
            {text.slice(0,40)}
              <br/>
             <span>{text.slice(41,text.length-1)}</span> 
          </h1>
        ))}
      </motion.div>
    </div>
  )
}

export default Movingtext
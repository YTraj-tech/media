'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const IconSlideButton = ({ icon: Icon = ArrowRight, ...props }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Button
      className="relative w-20 h-9 mt-5 bg-white text-[#6E62E5] hover:bg-opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          x: isHovered ? 8 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
        }}
      >
        <Icon className="w-6 h-6" />
      </motion.div>
    </Button>
  )
}

export default IconSlideButton
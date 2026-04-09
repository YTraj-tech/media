import HeroSection from '@/components/PublicUI/HeroSection'
import Movingtext from '@/components/PublicUI/Movingtext'
import Note from '@/components/PublicUI/Note'
import React from 'react'

const PublicPage = () => {
  return (
    <div className='mt-5'>
      <HeroSection/>
      <Note/>
      <Movingtext/>
    </div>
  )
}

export default PublicPage

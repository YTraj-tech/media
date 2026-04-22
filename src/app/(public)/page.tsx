
'use client'

import HeroSection from '@/components/PublicUI/HeroSection'
import Movingtext from '@/components/PublicUI/Movingtext'
import Note from '@/components/PublicUI/Note'
import React from 'react'
import Feature from '@/components/PublicUI/Feature'
import Footer from '@/components/PublicUI/Footer'
import dynamic from 'next/dynamic'



const MoveScroleImg = dynamic(
  ()=>import('@/components/PublicUI/MoveScroleImg').then(mod=>mod.MoveScroleImg),
  {
    loading:()=> <p>loading...</p>,
    ssr:false
  }
)

const MainText = dynamic(
  ()=>import('@/components/PublicUI/MainText').then(mod=>mod.MainText),
  {
    loading:()=><p>loading...</p>,
    ssr:false
  }
)





const PublicPage = () => {
  return (
    <div className='mt-5'>
      <HeroSection />
      <Note />
      <Movingtext />
      <MainText />
      <MoveScroleImg />
      <Feature />
      <Footer />
    </div>
  )
}

export default PublicPage

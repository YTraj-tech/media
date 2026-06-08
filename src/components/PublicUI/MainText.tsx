'use client'
import React from 'react'
import { VideoText } from "../ui/video-text"

export function MainText (){
  return (
    <div className='relative h-96 w-full overflow-hidden'>

      <VideoText
        src='https://cdn.magicui.design/ocean-small.webm'
       >
        VISIBILITY
      </VideoText>

    </div>
  )
}


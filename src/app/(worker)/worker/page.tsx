
'use client'

import React, { useState } from 'react'
import WorkerProfile from '@/components/WorkerCompo/WorkerProfile'
import { useWorker } from '@/context/workerContext'
import { redirect } from 'next/navigation'

const WorkerPage = () => {
  
  const {sendlocation} = useWorker()

  if (sendlocation) {
    return redirect("/worker/location")
  }

  return (
    <div>
       <WorkerProfile/>
    </div>
  )
}

export default WorkerPage

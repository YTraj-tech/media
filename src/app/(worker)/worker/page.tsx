
'use client'

import React, { useEffect, useState } from 'react'
import WorkerProfile from '@/components/WorkerCompo/WorkerProfile'
import { useWorker } from '@/context/workerContext'
import { redirect, useRouter } from 'next/navigation'

const WorkerPage = () => {
  
  const router = useRouter()
  
  
    useEffect(() => {
  
      const role = localStorage.getItem("role")
  
      if (role !== "worker") {
        router.push('/')
      }
  
    }, [router])

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

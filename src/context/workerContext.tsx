'use client'

import React, { useContext, createContext, useState, useEffect } from "react";

interface Iworker {
  loading: boolean
  name: string
  sendlocation: boolean
  fetchWorkerProfile: () => Promise<void>
  createprofile: (licenseImage: File, rcbookImage: File, vehicalType: string, gender: string) => Promise<void>
}

const CreateWorkerContext = createContext<Iworker | null>(null)

interface Iprops {
  children: React.ReactNode
}


export const WorkerProvider = ({ children }: Iprops) => {

  const [loading, setloading] = useState(false)
  const [sendlocation, setsendlocation] = useState(false)

  const createprofile = async (licenseImage: File, rcbookImage: File, vehicalType: string, gender: string) => {
    try {
      setloading(true)
      const formData = new FormData()
      formData.append('licenseImage', licenseImage)
      formData.append('rcbookImage', rcbookImage)
      formData.append('vehicalType', vehicalType)
      formData.append('gender', gender)


      const response = await fetch("/api/workerprofile", {
        method: "POST",
           body: formData
      })
      const data = await response.json()
      setsendlocation(data.sendlocation)
      setloading(false)

    } catch (err) {
      console.log(err, "inter error")
      setloading(false)
    }
  }

  const fetchWorkerProfile = async () => {
    try {
      setloading(true)

      const response = await fetch('/api/LocationAccessOfWorker', {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      })

      const data = await response.json()
      console.log(data)
      setloading(false)
      setsendlocation(data.Sendlocation)
      console.log(data.Sendlocation, "send location or not")
    } catch (err) {
      console.log(err)
      setloading(false)
    }
  }

  useEffect(() => {
    fetchWorkerProfile()
  }, [])

  return (
    <CreateWorkerContext.Provider value={{ name: "siddu", loading, sendlocation, createprofile, fetchWorkerProfile }}>
      {children}
    </CreateWorkerContext.Provider>
  )
}


export const useWorker = () => {
  const context = useContext(CreateWorkerContext)
  if (!context) {
    throw new Error("please define this in the main layout")
  }
  return context
}
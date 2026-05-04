"use client"

import Link from 'next/link'
import React, { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import Loading from '@/components/clientCompo/loading'

interface IWorkerData {
    workerId: string
    location: {
        lat: number | null
        lng: number | null
    }
    status: string
}

// Dynamically import map to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import('@/components/WorkerCompo/MapComponent'), {
    ssr: false,
    loading: () => <Loading/>,
})

const TrackPage = () => {

    const buttonInterval = useRef<NodeJS.Timeout | null>(null)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [stop, setStop] = useState(false)
    const [activeTask, setActiveTask] = useState<boolean | null>(null)
    const [workers, setWorkers] = useState<IWorkerData[]>([])

    const fetchLocation = async () => {
        setLoading(true)
        setError('')
        try {
            const res = await fetch('/api/TaskLocation')
            const data = await res.json()

            if (!res.ok) {
                setError('Something went wrong')
                setActiveTask(false)
                setStop(data.stop)

                if (data.stop && buttonInterval.current) {
                    clearInterval(buttonInterval.current)
                }

                return
            }

            setWorkers(data.data)
            setActiveTask(true)
            setStop(data.stop)

            if (data.stop && buttonInterval.current) {
                console.log("🛑 Stop received → clearing interval")
                clearInterval(buttonInterval.current)
            }
        } catch {
            setError('Nuetwork error. Please try again.')
            setActiveTask(false)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchLocation()
        buttonInterval.current = setInterval(() => {
            fetchLocation()
        }, 10000)
        return () => {
            if (buttonInterval.current) {
                clearInterval(buttonInterval.current)
            }
        }
    }, [])

    if (stop) {
        if (buttonInterval.current) {
            clearInterval(buttonInterval.current)
        }
    }



    const validWorkers = workers.filter(
        (w) => w.location.lat !== null && w.location.lng !== null
    )

    return (
        <div style={{ fontFamily: 'sans-serif', padding: '16px' }} className='border-l-2 h-full text-center border-gray-300'>
            <h1 className='text-2xl'>Live Tracking</h1>

            {loading && <Loading/>}

            {!loading && error && (
                <p className='text-red-400 text-xl'>Make the Task Live To Fetch The location</p>
            )}

            

            {/* Leaflet Map — loaded dynamically (no SSR) */}
            {!error && validWorkers.length > 0 && (
                <MapComponent workers={validWorkers} />
            )}

            {/* Worker list */}
            {!loading && !error && workers.length > 0 && (
                <ul style={{ marginTop: '16px' }}>
                    {workers.map((worker, i) => (
                        <li key={i}>
                            <strong>Worker:</strong> {worker.workerId} |{' '}
                            <strong>Lat:</strong> {worker.location.lat ?? 'N/A'},{' '}
                            <strong>Lng:</strong> {worker.location.lng ?? 'N/A'} |{' '}
                            <strong>Status:</strong> {worker.status}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default TrackPage


// 'use client'

// import React from 'react'
// import { useState, useEffect , useRef } from 'react'

// interface IWorkerData {
//   workerId: string,
//   location: {
//     lat: number,
//     lng: number
//   },
//   status: string
// }

// const TrackPage = () => {

//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const [Sendlocation, setSendlocation] = useState(false)
//   const [workerData, setWorkerData] = useState<IWorkerData | null>(null)

//   const Stoplocation = useRef<NodeJS.Timeout | null>(null)

//   async function fetchLocation() {
//     setLoading(true)
//     try {
//       setLoading(true)
//       const response = await fetch('/api/TaskLocation', {
//         method: 'GET',
//         headers: {
//           'content-type': 'application/json'
//         }
//       })

//       const data = await response.json()
//       console.log(data)
//       setWorkerData(data)
//       setSendlocation(data.success)
//     } catch (error: any) {
//       console.log(error)
//       setError(error)
//     }
//   }

//   useEffect(() => {
//     fetchLocation()
//     if (Sendlocation) {
//         Stoplocation.current = setInterval(() => {
//         fetchLocation()
//       }, 10000)
//     }
//     return () => {
//       if (Stoplocation.current) {
//         clearInterval(Stoplocation.current)
//       }
//     }
//   }, [])

//   return (
//     <div>
//       <h1>Live Trackign</h1>
//     </div>
//   )
// }

// export default TrackPage

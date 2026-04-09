


// // // "use client"

// // // import { UseClientContext } from '@/context/ClientContext'
// // // import Link from 'next/link'
// // // import React, { useEffect } from 'react'
// // // import { useState } from 'react'

// // // const TrackPage = () => {

// // //   interface Ilocation {
// // //     workerId:string
// // //     location: {
// // //       lat: number
// // //       lng: number
// // //     }
// // //     status:string
// // //   }

// // //   const [loading, setLoading] = useState(false)
// // //   const [error, setError] = useState('')
// // //   const [activeTask, setActiveTask] = useState<boolean | null>(null)
// // //   const [location, setLocation] = useState<Ilocation[]>([])


// // //   const fetchLocation = async () => {
// // //     setLoading(true)
// // //     try {
// // //       const res = await fetch('/api/TaskLocation')
// // //       const data = await res.json()

// // //       if (!res.ok) {
// // //         setError(data.error)
// // //         setActiveTask(false)
// // //         return
// // //       }

// // //       setLocation(data.data)
// // //       setActiveTask(true)

// // //     } catch {
// // //       setError("Network error")
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }


// // //   useEffect(() => {
// // //     fetchLocation()
// // //   }, [])

// // //   return (
// // //     <div>
// // //       <h1>i will track bro</h1>
// // //       {loading && (<>loading...</>)}

// // //       {error && (<> {error} </>)}

// // //       {!activeTask && !loading && (<><Link href={'/dashboard/Track/Tasks'}>Make your task live to make Tracking</Link></>)}

// // //       {!loading && !error && (
// // //         <ul>
// // //           {location.map((worker, i) => (
// // //             <li key={i}>
// // //               Worker: {worker.workerId} — {worker.location.lat}, {worker.location.lng} ({worker.status})
// // //             </li>
// // //           ))}
// // //         </ul>
// // //       )}
// // //     </div>
// // //   )
// // // }

// // // export default TrackPage



// // "use client"

// // import Link from 'next/link'
// // import React, { useEffect, useState } from 'react'

// // interface IWorkerData {
// //     workerId: string
// //     location: {
// //         lat: number | null
// //         lng: number | null
// //     }
// //     status: string
// // }

// // const TrackPage = () => {
// //     const [loading, setLoading] = useState(false)
// //     const [error, setError] = useState('')
// //     const [activeTask, setActiveTask] = useState<boolean | null>(null)
// //     const [workers, setWorkers] = useState<IWorkerData[]>([])

// //     const fetchLocation = async () => {
// //         setLoading(true)
// //         setError('')
// //         try {
// //             const res = await fetch('/api/TaskLocation')
// //             const data = await res.json()

// //             if (!res.ok) {
// //                 setError(data.error || 'Something went wrong')
// //                 setActiveTask(false)
// //                 return
// //             }

// //             setWorkers(data.data)   // ✅ matches IWorkerData[]
// //             setActiveTask(true)

// //         } catch {
// //             setError('Network error. Please try again.')
// //             setActiveTask(false)
// //         } finally {
// //             setLoading(false)
// //         }
// //     }

// //     useEffect(() => {
// //         fetchLocation()
// //     }, [])

// //     return (
// //         <div>
// //             <h1>Live Tracking</h1>

// //             {loading && <p>Loading...</p>}

// //             {!loading && error && <p style={{ color: 'red' }}>{error}</p>}

// //             {!loading && activeTask === false && (
// //                 <Link href="/dashboard/Track/Tasks">
// //                     Make your task live to start tracking
// //                 </Link>
// //             )}

// //             {!loading && !error && workers.length > 0 && (
// //                 <ul>
// //                     {workers.map((worker, i) => (
// //                         <li key={i}>
// //                             <strong>Worker:</strong> {worker.workerId} |{' '}
// //                             <strong>Lat:</strong> {worker.location.lat ?? 'N/A'},{' '}
// //                             <strong>Lng:</strong> {worker.location.lng ?? 'N/A'} |{' '}
// //                             <strong>Status:</strong> {worker.status}
// //                         </li>
// //                     ))}
// //                 </ul>
// //             )}
// //         </div>
// //     )
// // }

// // export default TrackPage


"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix default marker icon broken by webpack
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

interface IWorkerData {
    workerId: string
    location: {
        lat: number | null
        lng: number | null
    }
    status: string
}

const TrackPage = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [activeTask, setActiveTask] = useState<boolean | null>(null)
    const [workers, setWorkers] = useState<IWorkerData[]>([])

    const fetchLocation = async () => {
        setLoading(true)
        setError('')
        try {
            const res = await fetch('/api/TaskLocation')
            const data = await res.json()

            if (!res.ok) {
                setError(data.error || 'Something went wrong')
                setActiveTask(false)
                return
            }

            setWorkers(data.data)
            setActiveTask(true)
        } catch {
            setError('Network error. Please try again.')
            setActiveTask(false)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchLocation()
        // Poll every 10 seconds for live location updates
        const interval = setInterval(fetchLocation, 10000)
        return () => clearInterval(interval)
    }, [])

    // Filter out workers with valid coordinates
    const validWorkers = workers.filter(
        (w) => w.location.lat !== null && w.location.lng !== null
    )

    // Default map center: first valid worker, or fallback
    const mapCenter: [number, number] =
        validWorkers.length > 0
            ? [validWorkers[0].location.lat!, validWorkers[0].location.lng!]
            : [20.5937, 78.9629] // India center fallback

    return (
        <div style={{ fontFamily: 'sans-serif' }}>
            <h1>Live Tracking</h1>

            {loading && <p>Loading...</p>}

            {!loading && error && (
                <p style={{ color: 'red' }}>{error}</p>
            )}

            {!loading && activeTask === false && (
                <Link href="/dashboard/Track/Tasks">
                    Make your task live to start tracking
                </Link>
            )}

            {/* Leaflet Map */}
            {!loading && !error && validWorkers.length > 0 && (
                <MapContainer
                    center={mapCenter}
                    zoom={13}
                    style={{ height: '500px', width: '100%', borderRadius: '8px', marginTop: '16px' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {validWorkers.map((worker, i) => (
                        <Marker
                            key={i}
                            position={[worker.location.lat!, worker.location.lng!]}
                        >
                            <Popup>
                                <strong>Worker ID:</strong> {worker.workerId} <br />
                                <strong>Status:</strong> {worker.status} <br />
                                <strong>Lat:</strong> {worker.location.lat} <br />
                                <strong>Lng:</strong> {worker.location.lng}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            )}

            {/* Worker list below map */}
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



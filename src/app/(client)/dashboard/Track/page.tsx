"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

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
    loading: () => <p>Loading map...</p>,
})

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
                setError('Something went wrong')
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
        const interval = setInterval(fetchLocation, 10000)
        return () => clearInterval(interval)
    }, [])

    const validWorkers = workers.filter(
        (w) => w.location.lat !== null && w.location.lng !== null
    )

    return (
        <div style={{ fontFamily: 'sans-serif', padding: '16px' }}>
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


'use client'
import { useWorker } from '@/context/workerContext'
import { useEffect, useState, useRef } from 'react'
import { redirect } from 'next/navigation'
import React from 'react'

type LocationStatus = 'idle' | 'fetching' | 'tracking' | 'error'

const Workerlocation = () => {
    const { sendlocation } = useWorker()

    const [status, setStatus] = useState<LocationStatus>('idle')
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const watchIdRef = useRef<number | null>(null)
    const latestCoordsRef = useRef<{ lat: number; lng: number } | null>(null)

    if (!sendlocation) {
        return redirect('/worker')
    }

    const sendLocationToServer = async (lat: number, lng: number) => {
        try {
            const res = await fetch('/api/updateWorkerLocation', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ lat, lng }),
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.message || 'Failed to update location')
            }

            setLastUpdated(new Date())
        } catch (err: any) {
            console.error('Location update failed:', err.message)
            setErrorMsg(err.message)
        }
    }

    
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude: lat, longitude: lng } = position.coords
                    sendLocationToServer(lat, lng)
                },
                null,
                { enableHighAccuracy: true, timeout: 10000 }
            )
        }, 10_000)

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [])

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-xl font-semibold">Live Location Tracking</h1>

            {status === 'fetching' && (
                <p className="text-yellow-500">Fetching your location...</p>
            )}

            {status === 'error' && (
                <p className="text-red-500">Error: {errorMsg}</p>
            )}

            {status === 'tracking' && coords && (
                <div className="space-y-1 text-sm">
                    <p className="text-green-500 font-medium">Tracking active</p>
                    <p>Lat: <span className="font-mono">{coords.lat.toFixed(6)}</span></p>
                    <p>Lng: <span className="font-mono">{coords.lng.toFixed(6)}</span></p>
                    {lastUpdated && (
                        <p className="text-gray-400">
                            Last synced: {lastUpdated.toLocaleTimeString()}
                        </p>
                    )}
                    {errorMsg && (
                        <p className="text-yellow-500 text-xs">Sync warning: {errorMsg}</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default Workerlocation

"use client"

import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix broken default marker icons in webpack/Next.js
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

interface Props {
    workers: IWorkerData[]
}

const MapComponent = ({ workers }: Props) => {
    const center: [number, number] = [
        workers[0].location.lat!,
        workers[0].location.lng!,
    ]

    return (
        <MapContainer
            center={center}
            zoom={13}
            style={{
                height: '700px',
                width: '100%',
                borderRadius: '8px',
                marginTop: '16px',
            }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {workers.map((worker, i) => (
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
    )
}

export default MapComponent
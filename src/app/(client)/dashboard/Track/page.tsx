"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

interface Worker {
  workerId: string;
  status: string;
  location: { lat: number; lng: number };
}

const Map = dynamic(
  async () => {
    const L = (await import("leaflet")).default;
    const { MapContainer, TileLayer, Marker, Popup } = await import("react-leaflet");

    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });

    return function LeafletMap({ workers }: { workers: Worker[] }) {
      return (
        <MapContainer
          center={[13.12014688914087, 77.6166398579161]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {workers.map((worker, index) => (
            <Marker key={index} position={[worker.location.lat, worker.location.lng]}>
              <Popup>
                <strong>Worker ID:</strong> {worker.workerId} <br />
                <strong>Status:</strong> {worker.status}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      );
    };
  },
  { ssr: false, loading: () => <p>Loading map...</p> }
);

const TrackPage = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch("/api/TakeLocationOfWorker");
        const data = await response.json();
        setWorkers(data.workers);
      } catch (err) {
        setError("Failed to fetch worker locations");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();

    // 🔄 Poll every 10 seconds for live location updates
    const interval = setInterval(fetchTask, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Fetching worker locations...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Worker Tracker ({workers.length} active)</h2>
      <div style={{ height: "500px", width: "100%" }}>
        <Map workers={workers} />
      </div>

      {/* Worker list below the map */}
      <ul style={{ marginTop: "1rem" }}>
        {workers.map((worker, index) => (
          <li key={index}>
            <strong>{worker.workerId}</strong> — {worker.status} | lat:{" "}
            {worker.location.lat.toFixed(5)}, lng: {worker.location.lng.toFixed(5)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackPage;
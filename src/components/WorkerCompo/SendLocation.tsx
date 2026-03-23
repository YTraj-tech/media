"use client";

import React, { useEffect, useRef, useState } from "react";

const SendLocation = () => {
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isRunning) return;

    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser");
      return;
    }

    const sendLocation = () => {
      console.log("Attempting to get location...");
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude: lat, longitude: lng } = pos.coords;
          console.log("Got location:", lat, lng);
          try {
            const response = await fetch("/api/updatelocation", {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ lat, lng }),
            });

            if (!response.ok) {
              console.error("API failed:", await response.text());
            } else {
              console.log("Location sent successfully");
            }
          } catch (err) {
            console.error("Failed to send the location", err);
          }
        },
       
      );
    };

    sendLocation();
    intervalRef.current = setInterval(sendLocation, 10000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const handleStop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  return (
    <div>
      <p>{isRunning ? "Sending location..." : "Location tracking stopped"}</p>
      {isRunning && <button onClick={handleStop}>Stop</button>}
    </div>
  );
};

export default SendLocation;
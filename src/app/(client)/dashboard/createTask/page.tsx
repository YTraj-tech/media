"use client"
import React, { useState } from 'react'

const vehicleTypes = [
  { value: "sedan", label: "Sedan", icon: "🚗" },
  { value: "suv", label: "SUV", icon: "🚙" },
  { value: "truck", label: "Truck", icon: "🚛" },
  { value: "van", label: "Van", icon: "🚐" },
  { value: "bike", label: "Bike", icon: "🏍️" },
]

export default function CreateTask() {
  const [selectedVehicle, setSelectedVehicle] = useState("")
  const [startDate, setStartDate] = useState("")
  const [workers, setWorkers] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedVehicle || !startDate) return

    setLoading(true)
    setStatus(null)

    try {
      const res = await fetch("/api/createTask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vehicalType: selectedVehicle, startDate,numberOfWorker:workers }),
      })
      const data = await res.json()

      if (res.ok) {
        setStatus({ type: "success", message: "Task created successfully!" })
        setSelectedVehicle("")
        setStartDate("")
        setWorkers('')
      } else {
        setStatus({ type: "error", message: data.message || "Something went wrong." })
      }
    } catch {
      setStatus({ type: "error", message: "Network error. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-md">

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2   rounded-full px-3 py-1 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-zinc-500 text-xs tracking-widest uppercase">New Task</span>
          </div>
          <h1 className="text-white text-3xl font-bold tracking-tight mb-2">
            Create a Task
          </h1>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Select your vehicle type and pick a start date to get going.
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className=" border border-zinc-800 rounded-2xl p-6 flex flex-col gap-6"
        >

          {/* Vehicle Type */}
          <div>
            <label className="block text-zinc-500 text-xs tracking-widest uppercase mb-3">
              Vehicle Type
            </label>
            <div className="grid grid-cols-5 gap-2">
              {vehicleTypes.map((v) => (
                <button
                  key={v.value}
                  type="button"
                  onClick={() => setSelectedVehicle(v.value)}
                  className={`flex flex-col items-center gap-1.5 rounded-xl py-3 px-1 border transition-all duration-150 cursor-pointer
                    ${selectedVehicle === v.value
                      ? "bg-green-950 border-green-500"
                      : "bg-zinc-800 border-zinc-700 hover:border-zinc-500"
                    }`}
                >
                  <span className="text-xl">{v.icon}</span>
                  <span className={`text-[10px] font-semibold uppercase tracking-wide transition-colors
                    ${selectedVehicle === v.value ? "text-green-400" : "text-zinc-500"}`}>
                    {v.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-zinc-800" />

          {/* Start Date */}
          <div>
            <label className="block text-zinc-500 text-xs tracking-widest uppercase mb-3">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm
                focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500
                hover:border-zinc-500 transition-colors cursor-pointer [color-scheme:dark]"
            />
          </div>


          <div>
            <label className="block text-zinc-500 text-xs tracking-widest uppercase mb-3">
              Num Of Workers
            </label>
            <input
              type="number"
              value={workers}
              onChange={(e) => setWorkers(e.target.value)}
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm
                focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500
                hover:border-zinc-500 transition-colors cursor-pointer [color-scheme:dark]"
            />
          </div>


          {/* Status Message */}
          {status && (
            <div className={`flex items-start gap-2 px-4 py-3 rounded-xl text-sm border
              ${status.type === "success"
                ? "bg-green-950/50 border-green-800 text-green-400"
                : "bg-red-950/50 border-red-800 text-red-400"
              }`}>
              <span className="mt-0.5">{status.type === "success" ? "✓" : "✕"}</span>
              <span>{status.message}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !selectedVehicle || !startDate}
            className={`w-full py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-200
              ${loading || !selectedVehicle || !startDate
                ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                : "bg-green-400 text-zinc-950 hover:bg-green-300 active:scale-[0.98] cursor-pointer"
              }`}
          >
            
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                </svg>
                Creating...
              </span>
            ) : (
              "Create Task →"
            )}
          </button>

        </form>

        {/* Footer */}
        <p className="text-zinc-700 text-xs text-center mt-4 tracking-wide">
          Any existing task for your account will be replaced.
        </p>

      </div>
    </div>
  )
}
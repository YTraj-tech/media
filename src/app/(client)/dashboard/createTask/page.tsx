'use client'

import { UseClientContext } from '@/context/ClientContext'
import { useState } from 'react'
import { Quicksand } from "next/font/google"
import { Inconsolata } from "next/font/google"
import { Truck, CalendarDays, Users, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'


const Vend = Quicksand({
  subsets: ['latin'],
  weight: ['600']
})

const Inco = Inconsolata({
  subsets: ['latin'],
  weight: ['400']
})

const infoCards = [
  {
    icon: Truck,
    title: 'Vehicle Assignment',
    desc: 'Specify the vehicle type needed for this task',
    number: '01',
  },
  {
    icon: CalendarDays,
    title: 'Scheduled Start',
    desc: 'Tasks can only be scheduled from today onwards',
    number: '02',
  },
  {
    icon: Users,
    title: 'Worker Allocation',
    desc: 'Minimum one worker required per task',
    number: '03',
  },
]

const CreateTaskPage = () => {
  const [loading,setloading] = useState(false)
  const [formData, setFormData] = useState({
    vehicleType: '',
    startDate: '',
    numberOfWorker: '',
  })

  const { CreateTask} = UseClientContext()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setloading(true)
    await CreateTask(
      formData.vehicleType,
      new Date(formData.startDate),
      Number(formData.numberOfWorker)
    )
    setloading(false)
    handleReset()

  }

  const handleReset = () => {
    setFormData({ vehicleType: '', startDate: '', numberOfWorker: '' })
  }

  const filledCount = Object.values(formData).filter(Boolean).length
  const progressWidth = filledCount === 0 ? 'w-0' : filledCount === 1 ? 'w-1/3' : filledCount === 2 ? 'w-2/3' : 'w-full'

  return (
    <div className="flex flex-col border-l-2 border-gray-300 md:flex-row min-h-screen w-full">

      {/* ── LEFT PANEL ── */}
      <div className="relative bg-white flex items-center justify-center p-10 md:p-16 md:w-1/2 border-r border-gray-100">



        <div className="w-full max-w-sm">

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-900" />
              <span className="text-[11px] font-semibold tracking-widest uppercase text-gray-400">
                New Task
              </span>
            </div>
            <h2 className={`text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-2 ${Vend.className} `}>
              Task Details
            </h2>
            <p className={`text-lg text-gray-700  ${Inco.className} `}>
              Fill in the details below to create and assign a new operational task.
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[11px] text-gray-400 font-medium">Completion</span>
              <span className="text-[11px] text-gray-900 font-semibold">{filledCount}/3 fields</span>
            </div>
            <div className="h-0.5 bg-gray-100 rounded-full overflow-hidden">
              <div className={`h-full bg-gray-900 rounded-full transition-all duration-500 ${progressWidth}`} />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-7">

            {/* Vehicle Type */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold tracking-widest uppercase text-gray-400">
                Vehicle Type <span className="text-red-500">*</span>
              </label>
              <input
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                placeholder="e.g. Truck, Van, Pickup"
                required
                className="w-full bg-transparent border-0 border-b border-gray-200 focus:border-gray-900 outline-none py-2.5 text-sm text-gray-900 placeholder:text-gray-300 transition-colors duration-200"
              />
              <p className="text-xs text-gray-400">The type of vehicle required for this task</p>
            </div>

            {/* Start Date */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold tracking-widest uppercase text-gray-400">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
                className="w-full bg-transparent border-0 border-b border-gray-200 focus:border-gray-900 outline-none py-2.5 text-sm text-gray-900 transition-colors duration-200"
              />
              <p className="text-xs text-gray-400">Scheduled date for task to begin</p>
            </div>

            {/* Workers */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold tracking-widest uppercase text-gray-400">
                Workers Needed <span className="text-red-500">*</span>
              </label>
              <input
                name="numberOfWorker"
                type="number"
                value={formData.numberOfWorker}
                onChange={handleChange}
                placeholder="e.g. 4"
                min="1"
                required
                className="w-full bg-transparent border-0 border-b border-gray-200 focus:border-gray-900 outline-none py-2.5 text-sm text-gray-900 placeholder:text-gray-300 transition-colors duration-200"
              />
              <p className="text-xs text-gray-400">Number of workers to be allocated</p>
            </div>

            <div className="h-px bg-gray-100" />

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium py-3.5 px-6 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-900/20 active:translate-y-0"
              >
                {loading ? "Creating..." : "Create Task"}
                <ArrowRight size={15} />
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-3.5 text-sm text-gray-400 border border-gray-200 rounded-xl hover:border-gray-300 hover:text-gray-600 transition-all duration-200"
              >
                Reset
              </button>
            </div>

          </form>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="relative flex flex-col justify-between p-10 md:p-16 md:w-1/2 md:min-h-screen bg-[#0c1117] overflow-hidden">

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />

        {/* Glow blobs */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-16 w-64 h-64 rounded-full bg-emerald-500/8 blur-3xl pointer-events-none" />

        {/* Top section */}
        <div className="relative space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
            <Sparkles size={10} className="text-white/40" />
            <span className="text-[11px] font-medium tracking-widest uppercase text-white/40">
              Task Management
            </span>
          </div>

          <h1 className={`text-4xl md:text-5xl font-extrabold text-white leading-[1.1] tracking-tight ${Vend.className} `}>
            Coordinate.<br />
            <span className="text-white/30">Deploy.</span><br />
            Execute.
          </h1>

          <p className={`text-lg text-white  w-sm ${Inco.className} `}>
            Streamline operations by assigning vehicles and workers to new tasks — tracked and logged in real time.
          </p>
        </div>

        {/* Info cards */}
        <div className="relative flex flex-col gap-3 my-10 md:my-0">
          {infoCards.map(({ icon: Icon, title, desc, number }) => (
            <div
              key={title}
              className="flex items-start gap-4 border border-white/[0.07] rounded-2xl p-4 bg-white/3 hover:bg-white/6 hover:border-white/12 transition-all duration-200"
            >
              <span className="text-[11px] font-bold text-white/20 tracking-wide pt-0.5 min-w-5">
                {number}
              </span>
              <div className="w-9 h-9 rounded-xl bg-white/[0.07] border border-white/10 flex items-center justify-center shrink-0">
                <Icon size={15} className="text-white/60" />
              </div>
              <div>
                <p className="text-sm text-white/80 font-semibold mb-0.5">{title}</p>
                <p className="text-xs text-white/35 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="relative flex items-center justify-between">
          <p className="text-[11px] text-white/20 tracking-wide">© 2025 Operations Platform</p>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-emerald-400/80 font-medium">System live</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CreateTaskPage
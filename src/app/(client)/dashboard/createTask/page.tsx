// 'use client'

// import { UseClientContext } from '@/context/ClientContext'
// import { useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Separator } from '@/components/ui/separator'
// import { Truck, CalendarDays, Users } from 'lucide-react'

// const infoCards = [
//   {
//     icon: Truck,
//     title: 'Vehicle assignment',
//     desc: 'Specify the vehicle type needed for this task',
//   },
//   {
//     icon: CalendarDays,
//     title: 'Scheduled start',
//     desc: 'Tasks can only be scheduled from today onwards',
//   },
//   {
//     icon: Users,
//     title: 'Worker allocation',
//     desc: 'Minimum one worker required per task',
//   },
// ]

// const CreateTask = () => {
//   const [formData, setFormData] = useState({
//     vehicleType: '',
//     startDate: '',
//     numberOfWorker: '',
//   })

//   const { CreateTask } = UseClientContext()

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData(prev => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     await CreateTask(
//       formData.vehicleType,
//       new Date(formData.startDate),
//       Number(formData.numberOfWorker)
//     )
//     handleReset()
//   }

//   const handleReset = () => {
//     setFormData({ vehicleType: '', startDate: '', numberOfWorker: '' })
//   }

//   return (
//     <div className="grid grid-cols-2 h-screen w-screen">

//       {/* Left panel */}
//       <div className=" bg-black flex w-1/2 flex-col justify-between p-12">
//         <div className="space-y-4">
//           <p className="text-xs font-medium tracking-widest uppercase text-white/40">
//             Task management
//           </p>
//           <h1 className="text-3xl font-medium text-white leading-snug">
//             Create a new task
//           </h1>
//           <p className="text-sm text-white/50 leading-relaxed max-w-xs">
//             Assign vehicles and workers to kick off a new operation quickly.
//           </p>
//         </div>

//         <div className="flex flex-col gap-3">
//           {infoCards.map(({ icon: Icon, title, desc }) => (
//             <div
//               key={title}
//               className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4"
//             >
//               <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
//                 <Icon size={16} className="text-white" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-white">{title}</p>
//                 <p className="text-xs text-white/45 mt-0.5">{desc}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Right panel */}
//       <div className="bg-background flex items-center justify-center overflow-y-auto p-12">
//         <div className="w-full max-w-sm">
//           <div className="mb-8">
//             <h2 className="text-xl font-medium mb-1">Task details</h2>
//             <p className="text-sm text-muted-foreground">
//               All fields marked <span className="text-destructive">*</span> are required.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div className="space-y-2">
//               <Label htmlFor="vehicleType">
//                 Vehicle type <span className="text-destructive">*</span>
//               </Label>
//               <Input
//                 id="vehicleType"
//                 name="vehicleType"
//                 value={formData.vehicleType}
//                 onChange={handleChange}
//                 placeholder="e.g. Truck, Van, Car"
//                 required
//               />
//               <p className="text-xs text-muted-foreground">Enter the type of vehicle to be used</p>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="startDate">
//                 Start date <span className="text-destructive">*</span>
//               </Label>
//               <Input
//                 id="startDate"
//                 name="startDate"
//                 type="date"
//                 value={formData.startDate}
//                 onChange={handleChange}
//                 min={new Date().toISOString().split('T')[0]}
//                 required
//               />
//               <p className="text-xs text-muted-foreground">Select when the task should begin</p>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="numberOfWorker">
//                 Number of workers <span className="text-destructive">*</span>
//               </Label>
//               <Input
//                 id="numberOfWorker"
//                 name="numberOfWorker"
//                 type="number"
//                 value={formData.numberOfWorker}
//                 onChange={handleChange}
//                 placeholder="e.g. 4"
//                 min="1"
//                 required
//               />
//               <p className="text-xs text-muted-foreground">Specify how many workers will be assigned</p>
//             </div>

//             <Separator />

//             <div className="flex gap-2">
//               <Button type="submit" className="flex-1">Create task</Button>
//               <Button type="button" variant="outline" onClick={handleReset}>Reset</Button>
//             </div>
//           </form>
//         </div>
//       </div>

//     </div>
//   )
// }

// export default CreateTask


'use client'

import { UseClientContext } from '@/context/ClientContext'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Truck, CalendarDays, Users } from 'lucide-react'

const infoCards = [
  {
    icon: Truck,
    title: 'Vehicle assignment',
    desc: 'Specify the vehicle type needed for this task',
  },
  {
    icon: CalendarDays,
    title: 'Scheduled start',
    desc: 'Tasks can only be scheduled from today onwards',
  },
  {
    icon: Users,
    title: 'Worker allocation',
    desc: 'Minimum one worker required per task',
  },
]

const CreateTask = () => {
  const [formData, setFormData] = useState({
    vehicleType: '',
    startDate: '',
    numberOfWorker: '',
  })

  const { CreateTask } = UseClientContext()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await CreateTask(
      formData.vehicleType,
      new Date(formData.startDate),
      Number(formData.numberOfWorker)
    )
    handleReset()
  }

  const handleReset = () => {
    setFormData({ vehicleType: '', startDate: '', numberOfWorker: '' })
  }

  return (
    <div className="flex border-l-2 border-gray-300 flex-col md:flex-row min-h-screen w-full overflow-hidden">

      {/* Right panel */}
      <div className="bg-background flex items-center justify-center p-8 md:p-12 md:w-1/2 md:min-h-screen overflow-y-auto">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-1">Task details</h2>
            <p className="text-sm text-muted-foreground">
              All fields marked <span className="text-destructive">*</span> are required.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="vehicleType">
                Vehicle type <span className="text-destructive">*</span>
              </Label>
              <Input
                id="vehicleType"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                placeholder="e.g. Truck, Van, Car"
                required
              />
              <p className="text-xs text-muted-foreground">Enter the type of vehicle to be used</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">
                Start date <span className="text-destructive">*</span>
              </Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
              <p className="text-xs text-muted-foreground">Select when the task should begin</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="numberOfWorker">
                Number of workers <span className="text-destructive">*</span>
              </Label>
              <Input
                id="numberOfWorker"
                name="numberOfWorker"
                type="number"
                value={formData.numberOfWorker}
                onChange={handleChange}
                placeholder="e.g. 4"
                min="1"
                required
              />
              <p className="text-xs text-muted-foreground">Specify how many workers will be assigned</p>
            </div>

            <Separator />

            <div className="flex gap-2">
              <Button type="submit" className="flex-1">Create task</Button>
              <Button type="button" variant="outline" onClick={handleReset}>Reset</Button>
            </div>
          </form>
        </div>
      </div>


        {/* Left panel */}
      <div className="bg-[#F5F6F7] flex flex-col justify-between p-8 md:p-12 md:w-1/2 md:min-h-screen">
        <div className="space-y-4">
          <p className="text-xs font-medium tracking-widest uppercase ">
            Task management
          </p>
          <h1 className="text-2xl md:text-3xl font-medium leading-snug">
            Create a new task
          </h1>
          <p className="text-sm leading-relaxed max-w-xs">
            Assign vehicles and workers to kick off a new operation quickly.
          </p>
        </div>

        <div className="flex flex-col gap-3 mt-10 md:mt-0">
          {infoCards.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-3  border border-white/10 rounded-xl p-4"
            >
              <div className="w-8 h-8 rounded-lg  flex items-center justify-center shrink-0">
                <Icon size={16}  />
              </div>
              <div>
                <p className="text-sm font-medium ">{title}</p>
                <p className="text-xs  mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default CreateTask
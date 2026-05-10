// 'use client'

// import React from 'react'
// import { CiFilter } from "react-icons/ci";
// import { Noto_Sans_Display } from "next/font/google"
// import { UseClientContext } from '@/context/ClientContext';
// import { convertSegmentPathToStaticExportFilename } from 'next/dist/shared/lib/segment-cache/segment-value-encoding';

// const Vend = Noto_Sans_Display({
//   subsets: ['latin'],
//   weight: ['500']
// })

// const FilterData = () => {

//   const {
//     setselectfilter,
//     selectfilter
//   } = UseClientContext()

//   console.log(selectfilter)
//   return (

//     <section className='h-fit rounded-2xl m-9 p-5 bg-[#F5F6F7] shadow-2xs'>

//       {/* HEADER */}

//       <div className='flex items-center gap-2 mb-4'>

//         <CiFilter className='text-2xl' />

//         <h1 className={`text-xl text-gray-600 ${Vend.className}`}>
//           Filter Tasks
//         </h1>

//       </div>

//       {/* FILTERS */}

//       <div className='flex flex-col md:flex-row gap-4'>

//         {/* TASK STATUS */}

//         <div className='flex flex-col gap-1 flex-1'>

//           <label className={`text-sm text-gray-500 ${Vend.className}`}>
//             Task Status
//           </label>

//           <select
//             value={selectfilter}
//             onChange={(e) => {
//               console.log(e.target.value)
//               setselectfilter(e.target.value)}
//             }
//             className={`w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer ${Vend.className}`}
//           >

//             <option value="">
//               All Tasks
//             </option>

//             <option value="COMPLETED">
//               Completed
//             </option>

//             <option value="LIVE">
//               Live
//             </option>

//             <option value="NOTSTARTED">
//               Not Started
//             </option>

//           </select>

//         </div>

//         {/* SECOND FILTER */}

//         <div className='flex flex-col gap-1 flex-1'>

//           <label className={`text-sm text-gray-500 ${Vend.className}`}>
//             Worker Status
//           </label>

//           <select
//             className={`w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer ${Vend.className}`}
//           >

//             <option value="">
//               All Workers
//             </option>

//             <option value="AVAILABLE">
//               Available
//             </option>

//             <option value="BUSY">
//               Busy
//             </option>

//           </select>

//         </div>

//         {/* SORT */}

//         <div className='flex flex-col gap-1 flex-1'>

//           <label className={`text-sm text-gray-500 ${Vend.className}`}>
//             Sort By
//           </label>

//           <select
//             className={`w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer ${Vend.className}`}
//           >

//             <option value="">
//               Default
//             </option>

//             <option value="newest">
//               Newest First
//             </option>

//             <option value="oldest">
//               Oldest First
//             </option>

//             <option value="az">
//               A → Z
//             </option>

//             <option value="za">
//               Z → A
//             </option>

//           </select>

//         </div>

//       </div>

//     </section>
//   )
// }


// export default FilterData





'use client'

import React, { useEffect } from 'react'
import { CiFilter } from "react-icons/ci";
import { Noto_Sans_Display } from "next/font/google"
import { UseClientContext } from '@/context/ClientContext';

const Vend = Noto_Sans_Display({
  subsets: ['latin'],
  weight: ['500']
})

const FilterData = () => {

  const { setselectfilter, selectfilter } = UseClientContext()



  return (
    <section className='h-fit rounded-2xl m-9 p-5 bg-[#F5F6F7] shadow-2xs'>

      {/* HEADER */}
      <div className='flex items-center gap-2 mb-4'>
        <CiFilter className='text-2xl' />
        <h1 className={`text-xl text-gray-600 ${Vend.className}`}>
          Filter Tasks
        </h1>
      </div>

      {/* FILTERS */}
      <div className='flex flex-col md:flex-row gap-4'>

        {/* TASK STATUS */}
        <div className='flex flex-col gap-1 flex-1'>
          <label className={`text-sm text-gray-500 ${Vend.className}`}>
            Task Status
          </label>
          <select
            value={selectfilter}
            onChange={(e) => {
              const newValue = e.target.value
              setselectfilter(newValue)
            }}
            className={`w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer ${Vend.className}`}
          >
            <option value="ALL">All Tasks</option>        {/* ✅ value="ALL" */}
            <option value="COMPLETED">Completed</option>
            <option value="LIVE">Live</option>
            <option value="NOTSTARTED">Not Started</option>
          </select>
        </div>
        <h1> hello bro{selectfilter}</h1>
        {/* WORKER STATUS */}
        <div className='flex flex-col gap-1 flex-1'>
          <label className={`text-sm text-gray-500 ${Vend.className}`}>
            Worker Status
          </label>
          <select
            className={`w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer ${Vend.className}`}
          >
            <option value="">All Workers</option>
            <option value="AVAILABLE">Available</option>
            <option value="BUSY">Busy</option>
          </select>
        </div>

        {/* SORT */}
        <div className='flex flex-col gap-1 flex-1'>
          <label className={`text-sm text-gray-500 ${Vend.className}`}>
            Sort By
          </label>
          <select
            className={`w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer ${Vend.className}`}
          >
            <option value="">Default</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="az">A → Z</option>
            <option value="za">Z → A</option>
          </select>
        </div>

      </div>
    </section>
  )
}

export default FilterData
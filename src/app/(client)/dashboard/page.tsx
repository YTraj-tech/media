// import React from 'react';

// const stats = [
//   { label: 'Revenue', value: '$84,240', change: '+12.4%', up: true },
//   { label: 'Active Users', value: '3,842', change: '+8.1%', up: true },
//   { label: 'Bounce Rate', value: '24.6%', change: '-3.2%', up: false },
//   { label: 'Conversion', value: '6.38%', change: '+1.9%', up: true },
// ];

// const recentActivity = [
//   { name: 'Sarah Chen', action: 'Completed project milestone', time: '2m ago', dot: '#e8ff47' },
//   { name: 'James Park', action: 'Uploaded 3 new assets', time: '18m ago', dot: '#aaff00' },
//   { name: 'Maria Lopez', action: 'Left a comment on Nexus v2', time: '1h ago', dot: '#888' },
//   { name: 'Tom Reid', action: 'Merged pull request #142', time: '3h ago', dot: '#555' },
// ];

// const ClientPage = () => {
//   return (
//     <main className="flex-1 bg-[#111]  rounded-r-[18px] p-8 flex flex-col gap-7 overflow-y-auto">
//       {/* Header */}
//       <div className="flex justify-between items-start">
//         <div>
//           <p className="font-mono text-[11px] tracking-[0.18em] text-[#555] uppercase mb-1.5">
//             MONDAY, 23 MARCH 2026
//           </p>
//           <h1 className="font-mono font-black text-[26px] text-white tracking-[-0.02em] m-0">
//             Good morning, Alex ◈
//           </h1>
//         </div>
//         <div className="flex gap-2.5">
//           <button className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-[10px] px-[18px] py-2.5 text-[#888] font-mono text-xs cursor-pointer">
//             ⊕ New Report
//           </button>
//           <button className="bg-[#e8ff47] border-none rounded-[10px] px-[18px] py-2.5 text-black font-mono text-xs font-bold cursor-pointer">
//             ▶ Export
//           </button>
//         </div>
//       </div>

//       {/* Stat Cards */}
//       <div className="grid grid-cols-4 gap-3.5">
//         {stats.map((s) => (
//           <div
//             key={s.label}
//             className="bg-[#151515] border border-[#1e1e1e] rounded-[14px] p-5 transition-colors duration-200 hover:border-[#2a2a2a]"
//           >
//             <p className="font-mono text-[11px] text-[#555] mb-2.5 tracking-[0.1em] uppercase">
//               {s.label}
//             </p>
//             <p className="font-mono text-2xl font-black text-white mb-2 tracking-[-0.02em]">
//               {s.value}
//             </p>
//             <span
//               className={`
//                 font-mono text-[11px] font-bold px-2 py-0.5 rounded-md
//                 ${s.up ? 'text-[#e8ff47] bg-[#e8ff47]/10' : 'text-[#ff5c5c] bg-[#ff5c5c]/10'}
//               `}
//             >
//               {s.change}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* Bottom Section */}
//       <div className="grid grid-cols-2 gap-3.5 flex-1">
//         {/* Chart Placeholder */}
//         <div className="bg-[#151515] border border-[#1e1e1e] rounded-[14px] p-6 flex flex-col gap-4">
//           <div className="flex justify-between items-center">
//             <p className="font-mono text-[13px] font-bold text-white m-0">
//               Revenue Overview
//             </p>
//             <span className="font-mono text-[10px] text-[#555] tracking-[0.1em]">
//               LAST 7 DAYS
//             </span>
//           </div>
//           {/* Simple Bar Chart */}
//           <div className="flex items-end gap-2 h-[120px]">
//             {[55, 72, 48, 85, 63, 91, 78].map((h, i) => (
//               <div
//                 key={i}
//                 className="flex-1 flex flex-col items-center gap-1 h-full justify-end"
//               >
//                 <div
//                   className="w-full rounded-t-[5px] transition-colors duration-200"
//                   style={{
//                     height: `${h}%`,
//                     background: i === 5 ? '#e8ff47' : '#222',
//                     border: i === 5 ? 'none' : '1px solid #2a2a2a',
//                   }}
//                 />
//                 <span className="font-mono text-[9px] text-[#444]">
//                   {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Activity */}
//         <div className="bg-[#151515] border border-[#1e1e1e] rounded-[14px] p-6 flex flex-col gap-4">
//           <div className="flex justify-between items-center">
//             <p className="font-mono text-[13px] font-bold text-white m-0">
//               Recent Activity
//             </p>
//             <span className="font-mono text-[10px] text-[#e8ff47] cursor-pointer tracking-[0.05em] hover:opacity-80">
//               VIEW ALL →
//             </span>
//           </div>
//           <div className="flex flex-col gap-3.5">
//             {recentActivity.map((a, i) => (
//               <div key={i} className="flex items-center gap-3">
//                 <div
//                   className="w-2 h-2 rounded-full flex-shrink-0"
//                   style={{ background: a.dot }}
//                 />
//                 <div className="flex-1">
//                   <p className="font-mono text-xs font-bold text-[#ccc] mb-0.5">
//                     {a.name}
//                   </p>
//                   <p className="font-mono text-[11px] text-[#555] m-0">
//                     {a.action}
//                   </p>
//                 </div>
//                 <span className="font-mono text-[10px] text-[#444] flex-shrink-0">
//                   {a.time}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default ClientPage;








import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { ArrowRight, Badge, Bell, Circle, Search, Section, Sparkles, Zap } from 'lucide-react'
import { Inter } from "next/font/google"
import { RetroGrid } from "@/components/ui/retro-grid"
import React from 'react'



const Benthamfount = Inter({
  subsets: ["latin"],
  weight: ['400']
})


const Mainbashboard = () => {
  return (
    <div className='bg-[#D0E4E5] h-full px-5 w-full border-l-8 border-red-800 flex flex-col '>
      <div className='flex  justify-between  my-10'>
        <section className='text-center'>
          <p className='text-lg text-purple-400'>WelCome back,Siddaraj</p>
          <h1 className=' text-5xl mt-3  font-mono font-bold'>Dashboard</h1>
        </section>
        <section className='flex gap-x-5'>
          <Search />
          <Bell />
          <Circle />
          <h1>Sidda  Raj</h1>
        </section>

      </div>

      <div className='flex gap-5 justify-center '>
        <Card className='border-2  rounded-3xl border-red-200 h-52 w-1/2  '>
          <h1>hello</h1>
        </Card>
        <Card className='border-2  rounded-3xl border-red-200 h-52 w-1/2   '>
          <h1>hello</h1>

        </Card>
      </div>

    

      <div className='flex flex-row justify-center my-5 h-full gap-5'>
        {/* Card with table - w-1/2 */}
        <Card className='h-full w-1/2'>
          <table>
            <thead>
              <tr>
                <th>Car</th>
                <th>Brand</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Model S</td>
                <td>Tesla</td>
                <td>2023</td>
              </tr>
              <tr>
                <td>Civic</td>
                <td>Honda</td>
                <td>2022</td>
              </tr>
              <tr>
                <td>Mustang</td>
                <td>Ford</td>
                <td>2021</td>
              </tr>
            </tbody>
          </table>
        </Card>

        {/* Card with text - w-1/2 */}
        <Card className='h-full w-1/2 p-4'>
          <CardTitle className='mb-2'>About</CardTitle>
          <p className='text-sm text-gray-600'>
            Welcome to your dashboard! Here you can manage your projects,
            track progress, and stay up to date with recent activity.
            Use the table on the left to browse vehicle records.
          </p>
        </Card>

      </div>
    </div>
  )
}

export default Mainbashboard






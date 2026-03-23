// 'use client'

// import React, { useState } from 'react';

// const BoardCard = () => {
//   const [hoveredId, setHoveredId] = useState<number | null>(null);

//   const cards = [
//     {
//       id: 1,
//       title: "Total tasks",
//       count: "24",
//       icon: "📋",
//       color: "from-purple-600 to-purple-500",
//       accent: "bg-purple-100",
//       trend: "+2 this week"
//     },
//     {
//       id: 2,
//       title: "Live tasks",
//       count: "8",
//       icon: "▶️",
//       color: "from-indigo-600 to-indigo-500",
//       accent: "bg-indigo-100",
//       trend: "3 in progress"
//     },
//     {
//       id: 3,
//       title: "Upcoming tasks",
//       count: "12",
//       icon: "📅",
//       color: "from-violet-600 to-violet-500",
//       accent: "bg-violet-100",
//       trend: "Next 7 days"
//     }
//   ];

//   return (
//     <div className="w-full  p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Cards Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {cards.map((card) => (
//             <div
//               key={card.id}
//               onMouseEnter={() => setHoveredId(card.id)}
//               onMouseLeave={() => setHoveredId(null)}
//               className={`
//                 relative overflow-hidden rounded-xl p-4
//                 bg-white border border-purple-100
//                 transition-all duration-500 cursor-pointer
//                 ${hoveredId === card.id ? 'shadow-lg -translate-y-1 border-purple-300' : 'shadow-md hover:shadow-lg'}
//               `}
//             >
//               {/* Gradient background accent */}
//               <div className={`
//                 absolute inset-0 bg-gradient-to-br ${card.color} opacity-5
//                 transition-opacity duration-500
//                 ${hoveredId === card.id ? 'opacity-10' : 'opacity-5'}
//               `} />

//               {/* Content */}
//               <div className="relative z-10">
//                 <div className="flex items-start justify-between gap-3">
//                   <div className="flex-1">
//                     <p className="text-xs font-medium  mb-1 uppercase tracking-wide">
//                       {card.title}
//                     </p>
//                     <div className="flex items-baseline gap-2">
//                       <span className="text-2xl font-bold text-purple-400">
//                         {card.count}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Icon container */}
//                   <div className={`
//                     w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
//                     transition-all duration-500
//                     ${card.accent}
//                     ${hoveredId === card.id ? 'scale-110 rotate-12' : 'scale-100'}
//                   `}>
//                     <span className="text-lg">{card.icon}</span>
//                   </div>
//                 </div>

//                 {/* Trend indicator */}
//                 <div className={`
//                   text-xs font-medium transition-all duration-500 mt-2
//                   ${hoveredId === card.id ? 'text-gray-700' : 'text-gray-500'}
//                 `}>
//                   {card.trend}
//                 </div>

//                 {/* Progress bar indicator */}
//                 <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
//                   <div
//                     className={`h-full bg-gradient-to-r ${card.color} rounded-full transition-all duration-700`}
//                     style={{
//                       width: hoveredId === card.id ? '100%' : `${Math.random() * 60 + 40}%`
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* Top border accent */}
//               <div className={`
//                 absolute top-0 left-0 right-0 h-0.5
//                 bg-gradient-to-r ${card.color}
//                 transition-opacity duration-500
//                 ${hoveredId === card.id ? 'opacity-100' : 'opacity-30'}
//               `} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BoardCard;


'use client'

import React, { useState } from 'react';

const BoardCard = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const cards = [
    {
      id: 1,
      title: "Total tasks",
      count: "24",
      icon: "📋",
      color: "from-purple-600 to-purple-500",
      accent: "bg-purple-100",
      trend: "+2 this week"
    },
    {
      id: 2,
      title: "Live tasks",
      count: "8",
      icon: "▶️",
      color: "from-indigo-600 to-indigo-500",
      accent: "bg-indigo-100",
      trend: "3 in progress"
    },
    {
      id: 3,
      title: "Upcoming tasks",
      count: "12",
      icon: "📅",
      color: "from-violet-600 to-violet-500",
      accent: "bg-violet-100",
      trend: "Next 7 days"
    }
  ];

  return (
    <div className="w-full p-8">
      <div className="max-w-7xl mx-auto">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <button
              key={card.id}
              onMouseEnter={() => setHoveredId(card.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`
                block w-full text-left border-2 border-black bg-white p-5
                transition-all duration-300 cursor-pointer
                ${hoveredId === card.id 
                  ? 'translate-x-1 translate-y-1 shadow-none bg-yellow-50' 
                  : 'shadow-[4px_4px_0_0_rgba(0,0,0,1),8px_8px_0_0_rgba(0,0,0,0.5),12px_12px_0_0_rgba(0,0,0,0.2)]'
                }
                focus:ring-2 focus:ring-purple-300 focus:outline-0
              `}
            >
              {/* Header with icon */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <p className="text-xs font-black uppercase tracking-widest text-gray-700 mb-1">
                    {card.title}
                  </p>
                  <p className={`text-3xl font-black transition-colors duration-300 ${hoveredId === card.id ? 'text-purple-600' : 'text-black'}`}>
                    {card.count}
                  </p>
                </div>

                {/* Icon container */}
                <div className={`
                  w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0
                  border-2 border-black transition-all duration-300
                  ${card.accent}
                  ${hoveredId === card.id ? 'scale-110 rotate-12 bg-yellow-100' : 'scale-100'}
                `}>
                  <span className="text-xl">{card.icon}</span>
                </div>
              </div>

              {/* Trend indicator */}
              <div className={`
                text-xs font-bold uppercase tracking-wide transition-all duration-300 mb-3
                ${hoveredId === card.id ? 'text-purple-600' : 'text-gray-600'}
              `}>
                {card.trend}
              </div>

              {/* Progress bar indicator */}
              <div className="h-2 bg-gray-200 border border-black rounded overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${card.color} transition-all duration-700`}
                  style={{
                    width: hoveredId === card.id ? '100%' : `${Math.random() * 60 + 40}%`
                  }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardCard;
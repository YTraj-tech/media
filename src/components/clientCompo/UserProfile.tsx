import React from 'react'

const stats = [
  { num: '193', label: 'Post' },
  { num: '17,536', label: 'Followers' },
  { num: '274', label: 'Following' },
]

const avatars = [1, 5, 8, 15, 20]

const UserProfile = () => {
  return (
    <div className="w-full h-screen flex flex-col overflow-y-auto  p-4 gap-3">

      {/* Profile Card */}
      <div className=" rounded-2xl p-5 flex flex-col items-center text-center border border-gray-100">

        {/* Avatar */}
        <div className="relative mb-4">
          <div className="w-28 h-28 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-white overflow-hidden">
            <img
              src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
              className="w-full h-full object-cover rounded-full"
              alt="Siddaraj"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <h1 className="text-xl font-semibold text-gray-900">Siddaraj</h1>
        <p className="text-gray-400 text-sm  mt-0.5 mb-4">Siddararn335@gmail.com</p>

        {/* Stats */}
        <div className="flex w-full border-t border-b border-gray-100 py-3">
          {stats.map(({ num, label }) => (
            <div key={label} className="flex-1 text-center">
              <p className="text-sm font-semibold text-gray-900">{num}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Bio */}
        <div className="w-full mt-4 space-y-2 text-left">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            Bengaluru, India
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Full Stack Developer
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="text-violet-500">siddaraj.dev</span>
          </div>
        </div>
      </div>

      {/* Campaign Card */}
      <div className="rounded-2xl p-4 bg-gray-900">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-white">Facebook campaign</span>
          <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500 text-white">
            Active
          </span>
        </div>
        <div className="flex items-stretch mb-4">
          <div className="flex-1">
            <p className="text-2xl font-semibold text-white leading-none">1,129</p>
            <p className="text-[10px] text-gray-500 mt-1">Followers today</p>
          </div>
          <div className="w-px bg-gray-700 mx-4" />
          <div className="flex-1">
            <p className="text-2xl font-semibold text-white leading-none">50,000</p>
            <p className="text-[10px] text-gray-500 mt-1">Followers goal</p>
          </div>
        </div>
        <div className="w-full h-1 rounded-full bg-gray-800 mb-4">
          <div
            className="h-full rounded-full"
            style={{ width: '22.58%', background: 'linear-gradient(90deg,#818cf8,#a78bfa)' }}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center pl-2">
            {avatars.map((id, i) => (
              <img
                key={i}
                src={`https://i.pravatar.cc/32?img=${id}`}
                alt=""
                className="w-7 h-7 rounded-full border-2 border-gray-900 -ml-2 first:ml-0 object-cover"
              />
            ))}
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-white">+7,294</p>
            <p className="text-[10px] text-gray-500 mt-0.5">All time</p>
          </div>
        </div>
      </div>

      {/* Connected Platforms */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
          Connected platforms
        </p>
        <div className="flex flex-col gap-3">
          {[
            { name: 'Twitter',   handle: '@siddaraj',     bg: 'bg-violet-100', text: 'text-violet-700', connected: true  },
            { name: 'Instagram', handle: '@siddaraj_dev', bg: 'bg-pink-100',   text: 'text-pink-700',   connected: true  },
            { name: 'YouTube',   handle: 'Siddaraj',      bg: 'bg-red-100',    text: 'text-red-600',    connected: false },
          ].map(p => (
            <div key={p.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-semibold ${p.bg} ${p.text}`}>
                  {p.name[0]}
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-800 leading-tight">{p.name}</p>
                  <p className="text-[10px] text-gray-400">{p.handle}</p>
                </div>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                p.connected ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-400'
              }`}>
                {p.connected ? 'Live' : 'Connect'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto bg-white rounded-2xl p-4 border border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-gray-400">Member since</p>
          <p className="text-xs font-medium text-gray-800 mt-0.5">Jan 2024</p>
        </div>
        <button className="text-[11px] px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
          Edit profile →
        </button>
      </div>

    </div>
  )
}

export default UserProfile
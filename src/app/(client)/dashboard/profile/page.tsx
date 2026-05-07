'use client'

import { UseClientContext } from '@/context/ClientContext'
import { useState } from 'react'
import { Quicksand } from "next/font/google"
import { Inconsolata } from "next/font/google"
import { Info } from 'lucide-react'


const Archi = Quicksand({
  subsets: ['latin'],
  weight: ['500']
})

const Inco = Inconsolata({
  subsets: ['latin'],
  weight: ['300']
})


const ProfilePage = () => {

  const [loading , setloading] = useState(false)
  const [formData, setFormData] = useState({
    companyName: '',
    companyType: '',
    purpose: '',
    name: '',
    employees: '',
  })



  const { CreateProfile} = UseClientContext()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setloading(true)
    console.log('loading...', loading)
    await CreateProfile(
      formData.companyName,
      formData.companyType,
      formData.purpose,
      formData.name,
      formData.employees
    )
    console.log('loading...', loading)
    setloading(false)
    handleReset()
  }

  const handleReset = () => {
    setFormData({ companyName: '', companyType: '', purpose: '', name: '', employees: '' })
  }

  const sidebarIcons = [
    { active: true, d: 'M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z' },
    { active: false, d: 'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 5v5l4 2' },
    { active: false, d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' },
    { active: false, d: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' },
    { active: false, d: 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14' },
  ]

  const inputClass =
    'w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition'

  return (
    <div className="font-sans border-l-2 px-3 py-6 border-gray-300 ">

      <div className="flex" style={{ height: 'calc(100vh - 53px)' }}>



        {/* Main */}
        <div className="flex-1 overflow-y-auto">

          {/* Banner */}
          <div className="h-24  bg-linear-to-r from-gray-500 via-gray-400 to-gray-700 rounded-3xl" />

          {/* Content */}
          <div className="px-7 pb-8 -mt-10">

            {/* Profile Header */}
            <div className="flex  items-center justify-between pb-9">
              <div className="flex items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-linear-to-l from-gray-500 via-gray-800 to-slate-600 border-[3px] border-white flex items-center justify-center text-xl font-medium text-white shadow-sm">
                  AC
                </div>
                <div>
                  <p className={`text-3xl text-white ${Archi.className} `}>Alexa Rawles</p>
                  <p className={`text-lg  ${Inco.className}`}>Alexarawles@gmail.com</p>
                </div>
              </div>

            </div>

            {/* Card */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

              {/* Card Header */}
              <div className="px-9 pt-5 pb-4 border-b border-gray-100">
                <span className={`text-4xl text-gray-700 mb-3 rounded-full  ${Archi.className} `}>
                  CAMPANY SETUP
                </span>
                <h2 className={`text-xl font-medium text-gray-800 mb-4 ml-2 ${Inco.className} `}>Company Information</h2>
                <p className={`text-lg text-gray-400 ${Inco.className}`}>Fill in your organization details to get started.</p>
              </div>

              {/* Card Body */}
              <div className="px-6 py-5">
                <form onSubmit={handleSubmit} className="space-y-4">

                  {/* Row 1 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">
                        Company name <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Acme Inc."
                        required
                        className={inputClass}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor='companyType' className="text-sm font-medium text-gray-700">
                        Company type <span className="text-red-400">*</span>
                      </label>
                      <select
                        name="companyType"
                        value={formData.companyType}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      >
                        <option value="" disabled>Select type</option>
                        <option>Private</option>
                        <option>Public</option>
                        <option>Non-Profit</option>
                        <option>Government</option>
                        <option>Startup</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">
                        Contact person <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jane Smith"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">
                        Employees <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="employees"
                        value={formData.employees}
                        onChange={handleChange}
                        placeholder="e.g. 50"
                        required
                        className={inputClass}
                      />
                      <p className="text-xs text-gray-300">Approximate headcount</p>
                    </div>
                  </div>

                  {/* Purpose */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">
                      Purpose / mission <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleChange}
                      placeholder="Describe your company's purpose or mission statement..."
                      required
                      rows={4}
                      className={`${inputClass} resize-y min-h-22`}
                    />
                  </div>

                  <hr className="border-gray-100" />

                  {/* Actions */}
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="submit"
                      disabled={loading}
                      className=" bg-linear-to-r from-gray-500 via-gray-400 to-gray-700  disabled:cursor-not-allowed text-white text-sm font-medium p-2 rounded-lg transition cursor-pointer"
                    >
                      {loading ? 'Saving...' : 'Save profile'}
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                    >
                      Reset
                    </button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage




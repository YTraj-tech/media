import React from 'react'
import { CiFilter } from "react-icons/ci";
import { Noto_Sans_Display } from "next/font/google"

const Vend = Noto_Sans_Display({
  subsets: ['latin'],
  weight: ['500']
})

const FilterData = () => {
  return (
    <section className='h-fit rounded-2xl m-9 p-5 bg-[#F5F6F7] shadow-2xs'>
      <div className='flex items-center gap-2 mb-4'>
        <CiFilter className='text-2xl' />
        <h1 className={`text-xl text-gray-600 ${Vend.className}`}>Filter</h1>
      </div>

      <div className='flex flex-row gap-4'>
        {/* Filter 1 */}
        <div className='flex flex-col gap-1 flex-1'>
          <label className={`text-sm text-gray-500 ${Vend.className}`}>
            Category
          </label>
          <select
            className={`w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer ${Vend.className}`}
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="furniture">Furniture</option>
            <option value="books">Books</option>
          </select>
        </div>

        {/* Filter 2 */}
        <div className='flex flex-col gap-1 flex-1'>
          <label className={`text-sm text-gray-500 ${Vend.className}`}>
            Status
          </label>
          <select
            className={`w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer ${Vend.className}`}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Filter 3 */}
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
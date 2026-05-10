'use client'

import React, { useState, useEffect } from 'react'
import { CiFilter } from "react-icons/ci"
import { Noto_Sans_Display } from "next/font/google"

const Vend = Noto_Sans_Display({
    subsets: ['latin'],
    weight: ['500']
})

interface Task {
    _id: string;
    clientId: string;
    workerId: string[];
    vehicalType: string;
    startDate: string;
    numberOfWorker: number;
    iscompleted: string;
    __v: number;
}

const badgeClass: Record<string, string> = {
    YES: "bg-green-100 text-green-800",
    TRACKING: "bg-yellow-100 text-yellow-800",
    NO: "bg-red-100 text-red-800",
}

const TaskFilterTable = () => {

    const [selectfilter, setselectfilter] = useState<string>('ALL')
    const [FilterdTasks, setFilterdTasks] = useState<Task[]>([])
    const [filterLoading, setFilterLoading] = useState(false)

    const fetchFilteredTasks = async (status: string) => {
        setFilterLoading(true)
        try {
            const response = await fetch(`/api/clientFilterTask?selectfilter=${status}`, {
                method: "GET",
                headers: { 'content-type': 'application/json' },
                credentials: 'include'
            })
            const data = await response.json()
            console.log("✅ data:", data)
            setFilterdTasks(data.FilterTask || [])
        } catch (error) {
            console.log(error)
        } finally {
            setFilterLoading(false)
        }
    }

    useEffect(() => {
        fetchFilteredTasks('ALL')
    }, [])

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value
        setselectfilter(newValue)
        fetchFilteredTasks(newValue)
    }

    return (
        <section className='rounded-2xl bg-[#F5F6F7] shadow-2xs overflow-hidden'>

            {/* FILTER HEADER */}
            <div className='p-5'>
                <div className='flex items-center gap-2 mb-4'>
                    <CiFilter className='text-2xl' />
                    <h1 className={`text-xl text-gray-600 ${Vend.className}`}>
                        Filter Tasks
                    </h1>
                </div>

                <div className='flex flex-col md:flex-row gap-4'>

                    <div className='flex flex-col gap-1 flex-1'>
                        <label className={`text-sm text-gray-500 ${Vend.className}`}>Task Status</label>
                        <select
                            value={selectfilter}
                            onChange={handleFilterChange}
                            className={`w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer ${Vend.className}`}
                        >
                            <option value="ALL">All Tasks</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="LIVE">Live</option>
                            <option value="NOTSTARTED">Not Started</option>
                        </select>
                    </div>

                    <div className='flex flex-col gap-1 flex-1'>
                        <label className={`text-sm text-gray-500 ${Vend.className}`}>Worker Status</label>
                        <select className={`w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer ${Vend.className}`}>
                            <option value="">All Workers</option>
                            <option value="AVAILABLE">Available</option>
                            <option value="BUSY">Busy</option>
                        </select>
                    </div>

                    <div className='flex flex-col gap-1 flex-1'>
                        <label className={`text-sm text-gray-500 ${Vend.className}`}>Sort By</label>
                        <select className={`w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer ${Vend.className}`}>
                            <option value="">Default</option>
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="az">A → Z</option>
                            <option value="za">Z → A</option>
                        </select>
                    </div>

                </div>
            </div>

            {/* TABLE */}
            <div className='border rounded-xl overflow-x-auto bg-white mx-5 mb-5'>
                {filterLoading ? (
                    <div className='flex items-center justify-center py-10'>
                        <p className='text-gray-400 text-sm'>Loading tasks...</p>
                    </div>
                ) : (
                    <table className='w-full border-collapse'>
                        <thead className='bg-gray-50'>
                            <tr className='border-b'>
                                <th className='px-4 py-3 text-left text-sm font-semibold'>Vehicle</th>
                                <th className='px-4 py-3 text-left text-sm font-semibold'>Status</th>
                                <th className='px-4 py-3 text-left text-sm font-semibold'>Workers</th>
                                <th className='px-4 py-3 text-left text-sm font-semibold'>Start Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {FilterdTasks.length > 0 ? (
                                FilterdTasks.map((task) => (
                                    <tr key={task._id} className='border-b hover:bg-gray-50'>
                                        <td className='px-4 py-3'>{task.vehicalType}</td>
                                        <td className='px-4 py-3'>
                                            <span className={`px-2 py-1 rounded-full text-xs ${badgeClass[task.iscompleted] ?? 'bg-gray-100 text-gray-600'}`}>
                                                {task.iscompleted}
                                            </span>
                                        </td>
                                        <td className='px-4 py-3'>{task.numberOfWorker}</td>
                                        <td className='px-4 py-3'>{new Date(task.startDate).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className='text-center py-10 text-gray-400'>No Tasks Found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}

                {!filterLoading && (
                    <div className='bg-gray-50 px-4 py-3 border-t font-semibold text-sm text-gray-600'>
                        Total Tasks: {FilterdTasks.length}
                    </div>
                )}
            </div>

        </section>
    )
}

export default TaskFilterTable
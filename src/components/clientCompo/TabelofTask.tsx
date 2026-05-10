'use client'

import React, { useEffect } from "react"
import { UseClientContext } from "@/context/ClientContext"

const badgeClass: Record<string, string> = {
    YES: "bg-green-100 text-green-800",
    TRACKING: "bg-yellow-100 text-yellow-800",
    NO: "bg-red-100 text-red-800",
}

export const TableOfTask = () => {

    const { FilterdTasks, filterLoading,selectfilter , FilterTasks } = UseClientContext()  
      console.log(FilterdTasks.length,"hello length")
    // ✅ show loading spinner while fetching

     useEffect(()=>{
        FilterTasks(selectfilter)
     },[])

    if (filterLoading) {
        return (
            <div className="mx-9 border rounded-xl bg-white flex items-center justify-center py-10">
                <p className="text-gray-400 text-sm">Loading tasks...</p>
            </div>
        )
    }

    return (
        <div  className="mx-9 border rounded-xl overflow-x-hidden bg-white">
            <table className="w-full border-collapse">

                {/* HEADER */}
                <thead className="bg-gray-50">
                    <tr className="border-b">
                        <th className="px-4 py-3 text-left text-sm font-semibold">Vehicle</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Workers</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Start Date</th>
                    </tr>
                </thead>

                {/* BODY */}
                <tbody>
                    {FilterdTasks.length > 0 ? (
                        FilterdTasks.map((task) => (
                            <tr key={task._id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-3">{task.vehicalType}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs ${badgeClass[task.iscompleted]}`}>
                                        {task.iscompleted}
                                    </span>
                                </td>
                                <td className="px-4 py-3">{task.numberOfWorker}</td>
                                <td className="px-4 py-3">{new Date(task.startDate).toLocaleDateString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="text-center py-10 text-gray-400">
                                No Tasks Found
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>

            {/* FOOTER */}
            <div className="bg-gray-50 px-4 py-3 border-t font-semibold">
                Total Tasks: {FilterdTasks.length}
            </div>
        </div>
    )
}
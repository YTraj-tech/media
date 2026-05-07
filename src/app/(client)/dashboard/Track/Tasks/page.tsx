'use client'

import { UseClientContext } from '@/context/ClientContext';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'



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

interface ApiResponse {
  message: string;
  AllPendingTask: Task[];
  AllTrackingTask: Task[];
}

const Taskspage = () => {

  const { TaskLive, fetchTaskOfClient, PendingTask, TrackingTasks } = UseClientContext()

  const [loading, setloading] = useState(false)



  const handelTaskToLive = async (taskid: string) => {
    await TaskLive(taskid)
    await fetchTaskOfClient()
  }

  useEffect(() => {
    fetchTaskOfClient()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="py-8">
      <h1 className="text-2xl font-semibold mb-1">Available tasks</h1>
      <p className="text-sm text-gray-500 mb-8">Manage pending and live tracking tasks below</p>

      {/* Pending Tasks */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-5">
          <h2 className="text-lg font-semibold">Pending</h2>
          <span className="text-xs font-medium bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
            {PendingTask.length}
          </span>
        </div>

        {PendingTask.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PendingTask.map((task) => (
              <div key={task._id} className="bg-white border border-gray-100 rounded-xl p-5 hover:border-gray-200 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs text-gray-400 font-mono tracking-wide">#{task._id.slice(-6).toUpperCase()}</span>
                  <span className="w-2 h-2 rounded-full bg-amber-400 mt-1" />
                </div>
                <p className="text-base font-medium text-gray-900 mb-4">{task.vehicalType}</p>
                <div className="flex gap-6 mb-5">
                  <div>
                    <p className="text-[11px] text-gray-400 uppercase tracking-wide mb-0.5">Start date</p>
                    <p className="text-sm font-medium text-gray-600">{new Date(task.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 uppercase tracking-wide mb-0.5">Workers</p>
                    <p className="text-sm font-medium text-gray-600">{task.numberOfWorker}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 uppercase tracking-wide mb-0.5">Status</p>
                    <p className="text-sm font-medium text-gray-600">{task.iscompleted}</p>
                  </div>
                </div>
                <hr className="border-gray-100 mb-4" />
                <button
                  onClick={() => handelTaskToLive(task._id)}
                  className="flex items-center gap-1.5 text-sm font-medium bg-amber-50 text-amber-900 hover:bg-amber-100 px-4 py-2 rounded-lg transition-colors"
                >
                  Make live <span>→</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center p-8 bg-gray-50 rounded-xl text-sm text-gray-400">
            No pending tasks available
          </div>
        )}
      </div>

      {/* Tracking Tasks */}
      {TrackingTasks.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-5">
            <h2 className="text-lg font-semibold">Tracking</h2>
            <span className="text-xs font-medium bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full">
              {TrackingTasks.length}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TrackingTasks.map((task) => (
              <Link key={task._id} href={`/dashboard/Track/Tasks/${task._id}`}>
                <div className="bg-white border border-gray-100 rounded-xl p-5 hover:border-gray-200 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs text-gray-400 font-mono tracking-wide">#{task._id.slice(-6).toUpperCase()}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1" />
                  </div>
                  <p className="text-base font-medium text-gray-900 mb-4">{task.vehicalType}</p>
                  <div className="flex gap-6 mb-5">
                    <div>
                      <p className="text-[11px] text-gray-400 uppercase tracking-wide mb-0.5">Start date</p>
                      <p className="text-sm font-medium text-gray-600">{new Date(task.startDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-400 uppercase tracking-wide mb-0.5">Workers</p>
                      <p className="text-sm font-medium text-gray-600">{task.numberOfWorker}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-400 uppercase tracking-wide mb-0.5">Status</p>
                      <p className="text-sm font-medium text-gray-600">{task.iscompleted}</p>
                    </div>
                  </div>
                  <hr className="border-gray-100 mb-4" />
                  <div className="flex items-center gap-1.5 text-sm font-medium bg-emerald-50 text-emerald-900 px-4 py-2 rounded-lg w-fit">
                    Track task <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Taskspage
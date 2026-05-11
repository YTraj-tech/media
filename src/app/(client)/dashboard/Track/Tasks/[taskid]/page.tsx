'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { UseClientContext } from '@/context/ClientContext';
import { useWorker } from '@/context/workerContext';
import { toast } from 'sonner';

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

const SingelTask = () => {
  const [task, setTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { taskid } = useParams()
  const router = useRouter()


  const { StoptheTask, fetchTaskOfClient } = UseClientContext()
  const { fetchWorkerProfile } = useWorker()

  const handelStopTask = async () => {
    if (taskid && typeof taskid === 'string') {
      StoptheTask(taskid)
      await fetchWorkerProfile()

      alert("Stoped the Task")
    }
    
  }

  const fetchSingelTask = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/clientAllTask/${taskid}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }

      })

      if (!response.ok) {
        if (response.status === 404) {
          toast('Task not found')
        }
        if (response.status === 401) {
         toast('Unauthorized access')
        }
        toast('Failed to fetch task')
      }

      const data = await response.json()
      setTask(data.SingelTask)
      await fetchTaskOfClient()
      console.log('Task data:', data.SingelTask)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching task:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (taskid) {
      fetchSingelTask()
    }
  }, [taskid])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'text-green-600 bg-green-100'
      case 'TRACKING':
        return 'text-blue-600 bg-blue-100'
      case 'PENDING':
        return 'text-yellow-600 bg-yellow-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading task details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-gray-600 text-5xl mb-4">📋</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Task Found</h2>
          <p className="text-gray-600 mb-6">The requested task does not exist.</p>
          <button
            onClick={() => router.push('/tasks')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Tasks
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Task Details</h1>
          <div className="w-20"></div> {/* Spacer for alignment */}
        </div>

        {/* Main Card */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Status Banner */}
          <div className={`px-6 py-3 ${getStatusColor(task.iscompleted)}`}>
            <div className="flex items-center justify-between">
              <span className="font-semibold">Current Status</span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-white bg-opacity-50">
                {task.iscompleted}
              </span>
            </div>
          </div>

          {/* Task Information */}
          <div className="p-6 space-y-6">
            {/* ID Section */}
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Task ID</label>
              <p className="text-sm text-gray-900 font-mono mt-1">{task._id}</p>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Client Information */}
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Client ID</label>
                  <p className="text-sm text-gray-900 font-mono mt-1 break-all">{task.clientId}</p>
                </div>

                <div className="border-b pb-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Vehicle Type</label>
                  <p className="text-sm text-gray-900 mt-1 font-medium">{task.vehicalType}</p>
                </div>

                <div className="border-b pb-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Number of Workers</label>
                  <p className="text-sm text-gray-900 mt-1">{task.numberOfWorker}</p>
                </div>
              </div>

              {/* Date Information */}
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Start Date</label>
                  <p className="text-sm text-gray-900 mt-1">{formatDate(task.startDate)}</p>
                </div>

                <div className="border-b pb-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Version</label>
                  <p className="text-sm text-gray-900 mt-1">v{task.__v}</p>
                </div>
              </div>
            </div>

            {/* Workers Section */}
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block">
                Assigned Workers ({task.workerId?.length || 0})
              </label>
              {task.workerId && task.workerId.length > 0 ? (
                <div className="space-y-2">
                  {task.workerId.map((worker, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-white rounded-md">
                      <span className="text-sm font-mono text-gray-700">{worker}</span>
                      <span className="text-xs text-gray-500">Worker #{index + 1}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">No workers assigned to this task</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handelStopTask}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
               {loading ? "stoping.." : "Stop"}
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingelTask
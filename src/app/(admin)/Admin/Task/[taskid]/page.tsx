
'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import AssignWorkers from '@/components/AdminSide/AssignWorkers'

interface Worker {
  _id: string
  name?: string
}

interface ClientDetails {
  _id: string
  clientId: string
  companyName: string
  companyType: string
  purpose: string
  name: string
  Employes: string
  completedTask: number
}

interface Task {
  _id: string
  clientId: string
  workerId: string[]
  vehicalType: string
  startDate: string
  numberOfWorker: number
  iscompleted: "NO" | "TRACKING" | "YES"
  __v: number
}

interface TaskData {
  Singel_Task: Task
  clientDetails: ClientDetails
}

const AdminSinglePage = () => {
  const { taskid } = useParams() as { taskid: string }
  const [loading, setLoading] = useState(false)
  const [taskData, setTaskData] = useState<TaskData | null>(null)
  const [error, setError] = useState<string | null>(null)


  const fetchSingleTaskDetail = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/admin/SingelTaskFullDetail/${taskid}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch task details')
      }

      const data = await response.json()
      setTaskData(data)
      console.log(data)
    } catch (error) {
      console.error(error)
      setError('Failed to load task details. Please try again.')
    } finally {
      setLoading(false)
    }
  }



  useEffect(() => {
    if (taskid) {
      fetchSingleTaskDetail()
    }
  }, [taskid])



  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <p className="text-red-600 text-center">{error}</p>
          <button
            onClick={fetchSingleTaskDetail}
            className="mt-4 w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!taskData) {
    return null
  }

  const { Singel_Task, clientDetails } = taskData

  // Format date
  const formattedDate = new Date(Singel_Task.startDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'YES':
        return 'bg-green-100 text-green-800'
      case 'TRACKING':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-red-100 text-red-800'
    }
  }

  // Get vehicle type icon/color
  const getVehicleColor = (type: string) => {
    switch (type) {
      case 'TRUCK':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {loading ? (<h1 className='text-9xl bg-red-950'>Loading....</h1>): (<div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Task Details</h1>
          <p className="text-gray-600 mt-2">Task ID: {Singel_Task._id}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Task Information Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-linear-to-r from-blue-600 to-blue-700 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Task Information</h2>
            </div>

            <div className="p-6 space-y-4">
              {/* Status Badge */}
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Status:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(Singel_Task.iscompleted)}`}>
                  {Singel_Task.iscompleted}
                </span>
              </div>
              {/* Vehicle Type */}
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Vehicle Type:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getVehicleColor(Singel_Task.vehicalType)}`}>
                  {Singel_Task.vehicalType}
                </span>
              </div>

              {/* Start Date */}
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Start Date:</span>
                <span className="text-gray-900">{formattedDate}</span>
              </div>

              {/* Number of Workers */}
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Number of Workers Requested:</span>
                <span className="text-2xl font-bold text-blue-600">{Singel_Task.numberOfWorker}</span>
              </div>
              <AssignWorkers taskid={Singel_Task._id} Task={Singel_Task} fetchSingleTaskDetail={fetchSingleTaskDetail} />
            </div>
          </div>

          {/* Client Information Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Client Information</h2>
            </div>

            <div className="p-6 space-y-4">
              {/* Company Name */}
              <div className="flex justify-between items-start">
                <span className="text-gray-600 font-medium">Company Name:</span>
                <span className="text-gray-900 font-semibold text-right">{clientDetails.companyName}</span>
              </div>

              {/* Company Type */}
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Company Type:</span>
                <span className="text-gray-900">{clientDetails.companyType}</span>
              </div>

              {/* Contact Person */}
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Contact Person:</span>
                <span className="text-gray-900">{clientDetails.name}</span>
              </div>

              {/* Employees */}
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Employees:</span>
                <span className="text-gray-900">{clientDetails.Employes}</span>
              </div>

              {/* Completed Tasks */}
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Completed Tasks:</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-green-600">{clientDetails.completedTask}</span>
                  <span className="text-gray-500 text-sm">total</span>
                </div>
              </div>

              {/* Purpose */}
              {clientDetails.purpose && (
                <div className="pt-4 border-t border-gray-200">
                  <span className="text-gray-600 font-medium block mb-2">Purpose:</span>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{clientDetails.purpose}</p>
                </div>
              )}

              {/* Client ID */}
              <div className="pt-2">
                <span className="text-gray-500 text-xs">Client ID: {clientDetails.clientId}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Actions Section */}
        <div className="mt-8 flex gap-4 justify-end">
          <button className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            Edit Task
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Assign Workers
          </button>
          <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Delete Task
          </button>
        </div>
      </div>)}
    </div>
  )
}

export default AdminSinglePage






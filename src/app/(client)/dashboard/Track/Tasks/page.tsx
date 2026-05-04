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
    <div>
      <h1>Available tasks so that you can make them live</h1>

      {/* Display Pending Tasks */}
      {PendingTask.length > 0 ? (
        <div>
          <h2>Pending Tasks ({PendingTask.length})</h2>
          {PendingTask.map((task) => (
            <div key={task._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <p><strong>Task ID:</strong> {task._id}</p>
              <p><strong>Vehicle Type:</strong> {task.vehicalType}</p>
              <p><strong>Start Date:</strong> {new Date(task.startDate).toLocaleDateString()}</p>
              <p><strong>Number of Workers:</strong> {task.numberOfWorker}</p>
              <p><strong>Status:</strong> {task.iscompleted}</p>
              <button onClick={() => handelTaskToLive(task._id)}>
                Make Live
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No pending tasks available</p>
      )}

      {/* Display Tracking Tasks */}
      {TrackingTasks.length > 0 && (
        <div>
          <h2>Tracking Tasks ({TrackingTasks.length})</h2>
          {TrackingTasks.map((task) => (
            <Link key={task._id} href={`/dashboard/Track/Tasks/${task._id}`}>
              <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                <p><strong>Task ID:</strong> {task._id}</p>
                <p><strong>Vehicle Type:</strong> {task.vehicalType}</p>
                <p><strong>Start Date:</strong> {new Date(task.startDate).toLocaleDateString()}</p>
                <p><strong>Number of Workers:</strong> {task.numberOfWorker}</p>
                <p><strong>Status:</strong> {task.iscompleted}</p>
                <button onClick={() => {/* Add your tracking logic here */ }}>
                  Track Task
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Taskspage
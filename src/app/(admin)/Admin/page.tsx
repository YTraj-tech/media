'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { lazy, Suspense } from 'react'


const AdminWorkers = lazy(() => import('@/components/AdminSide/AdminWorkers'))

const AdminPage = () => {

  const [task, settask] = useState<any[]>([])
  const [loading, setloading] = useState<boolean>(false)

  const fetchTasks = async () => {
    try {
      setloading(true)
      const response = await fetch(`/api/admintask`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json"
          }
        }
      )
      const data = await response.json()
      console.log(data)
      settask(data.avilabelTask)
      setloading(false)
    } catch (error) {
      setloading(false)
      console.log('failed to fetch the task', error)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])


  return (
    <div>
      <h1>i am the admin so i am in the admin page</h1>

      {loading && <p>Loading...</p>}

      {!loading &&
        task.map((tas: any) => (
          <div
            key={tas._id}
            style={{
              border: "1px solid #444",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "8px"
            }}

          >

            <Link href={`/Admin/${tas._id}`}>
              <h2>🚗 Vehicle: {tas.vehicalType}</h2>



              <p>
                👷 Workers: {tas.workerId.length} / {tas.numberOfWorker}
              </p>

              <p>
                📅 Start Date: {new Date(tas.startDate).toLocaleDateString()}
              </p>
            </Link>



          </div>
        ))
      }
      <Suspense fallback={<p>loading...</p>}>
        <AdminWorkers />
      </Suspense>
    </div>
  )
}

export default AdminPage

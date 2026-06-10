"use client"

import { useAdminhook } from "@/context/AdminContext"
import { useState } from "react"
import Loading from "../PublicUI/loading"

interface Task {
  numberOfWorker: number
  workerId: string[]
}

interface ItaskId {
  taskid: string
  Task: Task
  fetchSingleTaskDetail: () => Promise<void>
}


const AssignWorkers = ({ taskid, Task , fetchSingleTaskDetail }: ItaskId) => {

  const [addWorker, setAddWorker] = useState(false)
  const [assignloading,setassignloading] = useState(false)
  const [selectedWorker, setSelectedWorker] = useState("")

  const { freeWorkers, UpdatetheTaskwothWorkers } = useAdminhook()

  const handelSubmit = async () => {
    if (!selectedWorker) {
      return
    }
    setassignloading(true)
    await UpdatetheTaskwothWorkers(taskid, selectedWorker)
    await fetchSingleTaskDetail()
    setassignloading(false)
    setAddWorker(false)
  }

  return (
    <div>
      <h1>AssignWorkers</h1>
      {Task.numberOfWorker === Task.workerId.length ? "Workers Are fully updated" : addWorker ? (
        <div className='flex gap-2'>
          {/* ✅ Select input */}
          <select
            value={selectedWorker}
            onChange={(e) => setSelectedWorker(e.target.value)}
            className="border p-1"
          >
            <option value="">Select Worker</option>

            {freeWorkers?.map((worker, inx) => (
              <option key={worker._id.toString()} value={worker._id.toString()}>
                {worker.workerId}
              </option>
            ))}

          </select>

          <button disabled={assignloading} onClick={handelSubmit}>{assignloading ? <Loading/>:"Assign"}</button>


        </div >
      ) : (
        <div onClick={() => setAddWorker(true)} className="cursor-pointer">
          +
        </div>
      )}


    </div >
  )
}

export default AssignWorkers



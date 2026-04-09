import { WorkerProvider } from '@/context/workerContext'
import React from 'react'

const WorkerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <WorkerProvider>
        {children}
      </WorkerProvider>
    </div>
  )
}

export default WorkerLayout

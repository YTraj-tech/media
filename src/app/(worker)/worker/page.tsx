'use client'

import React, { useState } from 'react'
import { auth } from '@clerk/nextjs/server'
import { Show, UserButton } from '@clerk/nextjs'
import AssignedTask from '@/components/WorkerCompo/AssignedTask'
import SendLocation from '@/components/WorkerCompo/SendLocation'
import WorkerProfile from '@/components/WorkerCompo/WorkerProfile'
import { Button } from "@/components/ui/button"
import { UserPlus } from 'lucide-react'

const WorkerPage = () => {

    
    const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false)
     
  return (
    <div className="min-h-screen">
      {/* Header with Create Profile Button */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Worker Dashboard</h1>
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => setIsProfileDialogOpen(true)}
                className="flex items-center gap-2"
              >
                <UserPlus className="h-5 w-5" />
                Create Profile
              </Button>
              <Show when={'signed-in'}>
                <UserButton  />
              </Show>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AssignedTask/>
        <SendLocation/>
      </main>

      {/* Worker Profile Dialog */}
      <WorkerProfile 
        open={isProfileDialogOpen} 
        onOpenChange={setIsProfileDialogOpen}
      />
    </div>
  )
}

export default WorkerPage
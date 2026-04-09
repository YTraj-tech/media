import React from 'react'
import { AdminProvider } from '@/context/AdminContext'


const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminProvider>
        {children}
     </AdminProvider>
    </div>
  )
}

export default AdminLayout

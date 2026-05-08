import React from 'react'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { AdminProvider } from '@/context/AdminContext';
import { ClientProvider } from '@/context/ClientContext';
import { WorkerProvider } from '@/context/workerContext';
import { Toaster } from '@/components/ui/sonner';



const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });



export default async function layout({ children }: { children: React.ReactNode }) {
   
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className='bg-[#FFFFFF] min-h-full w-full  '>
        <ClerkProvider>
          <ClientProvider>
            <AdminProvider>
              <WorkerProvider>
                {children}
                <Toaster/>
              </WorkerProvider>
            </AdminProvider>
          </ClientProvider>

        </ClerkProvider>
      </body>
    </html>
  )
}


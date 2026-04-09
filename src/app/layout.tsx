import React from 'react'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className='bg-[#FFFFFF]'>
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}

export default layout

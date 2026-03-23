import React from 'react'
import "./globals.css"
import { ClerkProvider } from '@clerk/nextjs';
import { ClientProvider } from '@/context/ClientContext';

export const layout = async ({ children }: { children: React.ReactNode }) => {



  return (
    <html lang="en">

      <body>
        <ClerkProvider>
          <ClientProvider>
            {children}
          </ClientProvider>

        </ClerkProvider>
      </body>
    </html>
  )
}

export default layout

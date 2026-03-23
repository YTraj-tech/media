'use client'

import React, { useEffect } from 'react'

const AdminWorkers = () => {
    const fetchactiveworkers = async() => {
        const response = await fetch('/api/activeworkers')
        const data = await response.json()
        console.log(data)

    }

    useEffect(()=>{
        fetchactiveworkers()
       },[])
  return (
    <div>
       
    </div>
  )
}

export default AdminWorkers

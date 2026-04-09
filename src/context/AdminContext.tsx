"use client"
import mongoose, { Types } from "mongoose"
import { createContext, useContext, useEffect, useState } from "react"
import { ReactNode } from "react"



interface Itask {
    _id: string
    clientId: mongoose.Types.ObjectId
    workerId: mongoose.Types.ObjectId[]
    vehicalType: string
    startDate: Date,
    numberOfWorker: number,
    iscompleted: "NO" | "TRACKING" | "YES",
    review: string
}

interface Iworkers {
    _id: mongoose.Types.ObjectId,
    workerId: string

}

interface IAdmin {
    name: string
    loading: boolean
    pendingTask: Itask[] | null
    freeWorkers: Iworkers[] | null
    UpdatetheTaskwothWorkers:(id:string,workerId:string)=>Promise<void>
}

const CreateAdminContext = createContext<IAdmin | null>(null)


interface Iprops {
    children: ReactNode
}

export const AdminProvider = ({ children }: Iprops) => {

    const [loading, setloading] = useState(false)
    const [pendingTask, setpendingTask] = useState<Itask[] | null>(null)

    const [freeWorkers, setfreeWorkers] = useState<Iworkers[] | null>(null)

    const fetchpendingtask = async () => {
        setloading(true)
        try {
            const response = await fetch("/api/admin/AllTask", {
                method: "GET",
                headers: {
                    'Content-type': 'application/json'
                }
            })

            const data = await response.json()
            console.log(data.data)
            setpendingTask(data.data)

            setloading(false)
        } catch (error) {
            console.log(error)
            setloading(false)
        }
    }




    const fetchfreeWorkers = async () => {
        setloading(true)
        try {

            const response = await fetch('/api/admin/freeworkers', {
                method: "GET",
                headers: {
                    'Content-type': 'appliocation/json'
                }
            })

            const data = await response.json()
            console.log(data)
            setfreeWorkers(data.data)
            setloading(false)

        } catch (error) {
            console.log(error)
        }
    }

    const UpdatetheTaskwothWorkers = async(id:string,workerId:string) => {
         
        try {
           setloading(true)
           const response = await fetch(`/api/admin/UpdateWorkerToTask/${id}`,{
            method:"PATCH",
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({workerId})
           }) 

           const data = await response.json()
           console.log(data)
        await fetchfreeWorkers()
           setloading(false)
        } catch (err) {
            setloading(false)
        }
    }

    useEffect(() => {
        fetchfreeWorkers()
    }, [])



    useEffect(() => {
        fetchpendingtask()
    }, [])

    return (
        <CreateAdminContext.Provider value={{ name: "siddu", pendingTask, freeWorkers, UpdatetheTaskwothWorkers,loading }}>
            {children}
        </CreateAdminContext.Provider>
    )
}


export const useAdminhook = () => {
    const context = useContext(CreateAdminContext)
    if (!context) {
        throw new Error("Wrap the context")
    }
    return context
}





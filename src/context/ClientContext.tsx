'use client'

import { createContext, useContext, useState, ReactNode } from "react"


interface Task {
    _id: string;
    clientId: string;
    workerId: string[];
    vehicalType: string;
    startDate: string;
    numberOfWorker: number;
    iscompleted: string;
    __v: number;
}

interface Iclient {
    loading: boolean,
    CreateProfile: (companyName: string, companyType: string, purpose: string, name: string, Employes: string) => Promise<void>
    CreateTask: (vehicleType: string, startDate: Date, numberOfWorker: number) => Promise<void>,
    StoptheTask: (taskid: string) => Promise<void>
    TaskLive: (taskid: string) => Promise<void>
    fetchTaskOfClient: () => Promise<void>,
    PendingTask: Task[],
    TrackingTasks: Task[]
}

const CreateClientContext = createContext<Iclient | null>(null)

interface Iprops {
    children: ReactNode
}



export const ClientProvider = ({ children }: Iprops) => {

    const [loading, setLoading] = useState(false)
    const [Workers, setWorkers] = useState<String[]>([])
    const [PendingTask, setPendingTasks] = useState<Task[]>([])
    const [TrackingTasks, setTrackingTasks] = useState<Task[]>([])

    const CreateProfile = async (companyName: string, companyType: string, purpose: string, name: string, Employes: string) => {
        setLoading(true)
        try {
            const response = await fetch('/api/clientprofile', {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ companyName, companyType, purpose, name, Employes })
            })

            const data = await response.json()
            console.log(data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log("failed to create the profile")
        }
    }



    const CreateTask = async (vehicalType: string, startDate: Date, numberOfWorker: number) => {
        setLoading(true)
        try {
            const response = await fetch('/api/clientTask', {
                method: "POST",
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify({ vehicalType, startDate, numberOfWorker })
            })
            const data = await response.json()
            console.log(data)
            await fetchTaskOfClient()
            setLoading(false)
        } catch (err) {
            setLoading(false)
            console.log("failed to create the profile")
        }
    }


    const StoptheTask = async (taskid: string) => {
        try {
            setLoading(true)

            const response = await fetch(`/api/clientStopTask/${taskid}`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    'content-type': "application/json"
                },
            })

            const data = await response.json()

            console.log(data)
            await fetchTaskOfClient()
            setLoading(false)

        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }



    const TaskLive = async (taskid: string) => {
        setLoading(true)
        const response = await fetch('/api/makeTaskLive', {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ taskid })
        })
        const data = await response.json()
        await fetchTaskOfClient()
        setLoading(false)
    }


    const fetchTaskOfClient = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/clientAllTask', {
                method: "GET",
                headers: {
                    'content-type': "application/json"
                },
                credentials: "include"
            })

            if (!response.ok) {
                throw new Error("Failed to fetch the task")
            }

            const data = await response.json()
            console.log(data)

            setPendingTasks(data.AllPendingTask || [])
            setTrackingTasks(data.AllTrackingTask || [])
            setLoading(false)
        } catch (error) {
            console.error("Error fetching tasks:", error)
        } finally {
            setLoading(false)
        }
    }



    return (
        <CreateClientContext.Provider value={{ CreateProfile, CreateTask, StoptheTask, TaskLive, fetchTaskOfClient, PendingTask, TrackingTasks, loading }}>
            {children}
        </CreateClientContext.Provider>
    )
}

export const UseClientContext = () => {
    const context = useContext(CreateClientContext)

    if (!context) {
        throw new Error("useAppContext must be used inside AppProvider");
    }

    return context
}
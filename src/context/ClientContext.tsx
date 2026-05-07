'use client'

import { Alert } from "@/components/ui/alert";
import { createContext, useContext, useState, ReactNode, useEffect } from "react"
import { toast } from "sonner";


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
    TrackingTasks: Task[],
    UserRole: string | null

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
    const [UserRole, setUserRole] = useState<null | string>(null)

 



    const CreateProfile = async (companyName: string, companyType: string, purpose: string, name: string, Employes: string) => {
        setLoading(true)   // ✅ move this outside try
        try {
            const response = await fetch('/api/clientprofile', {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ companyName, companyType, purpose, name, Employes })
            })
            const data = await response.json()
            console.log(data)
            toast("Profile created successfully!")
        } catch (error) {
            toast("Failed to create the profile")
        } finally {
            setLoading(false)  // ✅ always runs
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
            toast("Create the Task SUccessfully")
              if (!response.ok) {
                if (response.status===400) {
                    toast(data.error)
                }
            }
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
        console.log(data)
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
                toast("Failed to fetch the task")
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


  async function fetchMe() {
    setLoading(true)

    const response = await fetch('/api/UserRole',{
        method:"GET",
        headers:{
            'content-type':'application/json'
        }
    })

    const data = await response.json()
    console.log(data.UserRole.role)
    setUserRole(data.UserRole.role)
    setLoading(false)
  }

  useEffect(()=>{
    fetchMe()
  },[])



    return (
        <CreateClientContext.Provider value={{ CreateProfile, CreateTask, StoptheTask, TaskLive, fetchTaskOfClient, PendingTask, TrackingTasks, loading, UserRole }}>
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
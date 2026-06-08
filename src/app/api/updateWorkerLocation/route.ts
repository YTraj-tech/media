import { auth } from "@clerk/nextjs/server";
import { Worker } from "../../../../models/workers.model";
import { NextResponse, NextRequest } from "next/server";
import { Task } from "../../../../models/task.model";
import { ReactServerDOMTurbopackClient } from "next/dist/server/route-modules/app-page/vendored/ssr/entrypoints";
import { connectDB } from "@/lib/dbconnect";


interface Iveicle {
    licence: string,
    rcbook: string
}

interface Ilocation {
    lat: number,
    lng: number
}



interface Iworkers {
    workerId: string,
    isActive: boolean,
    isVerified: boolean,
    rating: number,
    totalTaskCompleted: number,
    vehicalType: string,
    lisence: string,
    status: 'WORKING' | 'FREE'
    vehicelProfile: Iveicle,
    gender: 'MALE' | 'FEMALE'
    location: Ilocation
}

export const PATCH = async (req: NextRequest) => {

    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    try {
        const body = await req.json()
        const { lat, lng } = body
           await connectDB()
        const existingWorker = await Worker.findOne({ workerId: userId })

        if (!existingWorker) {
            return NextResponse.json({ message: "Worker Not Found" }, { status: 404 })
        }

        const ActiveTaskOfWorker = await Task.findOne({ workerId:existingWorker._id, iscompleted: 'TRACKING' })

        if (!ActiveTaskOfWorker) {
            return NextResponse.json({ message: "You are not assigned to any task" }, { status: 401 })
        }

        const UpdateTheLocation = await Worker.findByIdAndUpdate(existingWorker._id, { location: { lat, lng }, status: "WORKING" }, { returnDocument:"after" })

        if (!UpdateTheLocation) {
            return NextResponse.json({ message: "failed To Update The location" }, { status: 403 })
        }

        return NextResponse.json({ messgae: "updated succesfully",data:UpdateTheLocation }, { status: 201 })

    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}
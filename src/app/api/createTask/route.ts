interface Itask {
    clientId: string
    workerId: string[]
    vehicalType: string
    startDate: Date,
    stopit: boolean,  //client will stop it 
    iscompleted: boolean,
    review: string
}


import { Task } from "../../../../models/task.model"
import { NextResponse, NextRequest } from "next/server"
import { auth } from "@clerk/nextjs/server"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { vehicalType, startDate , numberOfWorker } = body

        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json({ message: "unauthorized" }, { status: 404 })
        }

        const PrevTask = await Task.find({ clientId: userId, iscompleted: false })

        if (PrevTask.some(prev => prev.iscompleted === false)) {
            return NextResponse.json(
                { message: "Previous task is still active, you cannot create a new one" },
                { status: 400 }
            )
        }

        if (numberOfWorker > 10) {
            return NextResponse.json({message:"For one Task not more than 10 Worker"},{status:402})
        }

        const CreateTask = await Task.create({
            clientId: userId,
            vehicalType,
            startDate,
            numberOfWorker
        })

        if (!CreateTask) {
            return NextResponse.json({ message: "failed to create the task" }, { status: 403 })
        }

        return NextResponse.json({ message: "create the task", CreateTask }, { status: 201 })


    } catch (err) {
        console.log(err, "server error")
        return NextResponse.json({ message: "Internal Sever error" }, { status: 500 })
    }
}
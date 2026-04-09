import { NextRequest, NextResponse } from "next/server"
import { Task } from "../../../../../../models/task.model"
import { Worker } from "../../../../../../models/workers.model"
import { auth } from "@clerk/nextjs/server"
import mongoose from "mongoose"


export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { userId } = await auth()
    if (!userId) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 })
    }
    try {
        const body = await req.json()
        const { id } = await params
        const { workerId } = body

        console.log("DEBUG:", { id, workerId }) // 👈 add this


        if (!id || !workerId) {
            return NextResponse.json({ error: "WorkerId and the taskId are required" }, { status: 400 })
        }

        const workerObjectId = new mongoose.Types.ObjectId(workerId)

        const workerdetails = await Worker.findOne({
            _id: workerObjectId,
            isVerified: true,
            status: "FREE",
        })

        if (!workerdetails) {
            return NextResponse.json({ error: "worker not availabel" }, { status: 400 })
        }

        const task = await Task.findById(id)

        if (!task) {
            return NextResponse.json({ error: "task not found" }, { status: 404 })
        }

        if (task.workerId.length > task.numberOfWorker) {
            return NextResponse.json({ error: "You cannot assigned more then the needed workers" }, { status: 400 })
        }


        const updateTaskToWorker = await Task.findByIdAndUpdate(
            {
                _id: id
            },
            {
                $push: { workerId: workerObjectId }
            },
            { new: true }
        )

        await Worker.findOneAndUpdate({ _id: workerObjectId }, { $set: { status: "WORKING" } })

        return NextResponse.json({ message: "added the worker succesfully", updateTaskToWorker }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "internal server error" }, { status: 500 })
    }
}

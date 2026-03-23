import { Task } from "../../../../../models/task.model";
import { Worker } from "../../../../../models/workers.model";
import { NextRequest, NextResponse } from "next/server";
import { User } from "../../../../../models/user.model";
import { auth } from "@clerk/nextjs/server";

interface Itask {
    clientId: string
    workerId: string[]
    vehicalType: string
    startDate: Date,
    numberOfWorker: number,
    stopit: boolean,  //client will stop it 
    iscompleted: boolean,
    review: string
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    const { userId } = await auth()

    const { id } = await params;
    const { workerId } = await req.json()
    if (!userId) {
        return NextResponse.json({
            message: "unathorized"
        },
            { status: 401 })
    }
    try {

        const AdminUser = await User.findOne({ clerkId: userId })

        if (AdminUser.role !== "Admin") {
            return NextResponse.json({
                message: "only admin can assign the workers"
            },
                {
                    status: 402
                })
        }

        const AssignWorkerTask = await Task.findById(id)

        if (!AssignWorkerTask) {
            return NextResponse.json({ message: "no task found for this to assign the worker" })
        }

        if (AssignWorkerTask.workerId.length >= AssignWorkerTask.numberOfWorker) {
            return NextResponse.json({ message: "the workers are alredy full" }, { status: 401 })
        }
        if (AssignWorkerTask.workerId.includes(workerId)) {
            return NextResponse.json({ message: "worker alredy existes" }, { status: 401 })
        }
        AssignWorkerTask.workerId.push(workerId)

        await AssignWorkerTask.save()


        return NextResponse.json({
            message: "Worker added successfully",
            AssignWorkerTask,
        });
    } catch (err) {
        return NextResponse.json(
            { message: "Server error", error: err },
            { status: 500 }
        );
    }
}
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { Task } from "../../../../models/task.model";
import { json } from "stream/consumers";



export async function GET(req: NextRequest) {
    const { userId } = await auth()
    if (!userId) {
        return NextResponse.json({ message: "unauthorized" }, { status: 404 })
    }
    try {
        const incompleteTask = await Task.find({ iscompleted: false })

        if (incompleteTask.length === 0) {
            return NextResponse.json({ message: "there is no task is been assigned" }, { status: 402 })
        }

        const avilabelTask = incompleteTask.filter((tas => tas.workerId.length  < tas.numberOfWorker))

        return NextResponse.json({ avilabelTask }, { status: 201 })
    } catch (err) {
        return NextResponse.json(
            { message: "Server error", error: err },
            { status: 500 }
        );
    }
}
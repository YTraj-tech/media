import { Task } from "../../../../models/task.model";
import { NextResponse, NextRequest } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ message: "unAuthorised" }, { status: 404 })
        }

        const ClientTask = await Task.find({ clerkId: userId, iscompleted: false })

        if (!ClientTask.length) {
            return NextResponse.json({ message: "No Active Task" }, { status: 404 })
        }

        return NextResponse.json({ tasks: ClientTask }, { status: 200 })


    } catch (err) {
        console.log(err, "server error")
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}
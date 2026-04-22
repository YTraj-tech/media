import { Task } from "../../../../models/task.model";
import { client } from "../../../../models/client.model"
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbconnect";


export const GET = async () => {
    const { userId } = await auth()
    if (!userId) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 })
    }
    try {
        await connectDB()
        const clientlive = await client.findOne({ clientId: userId })

        if (!clientlive) {
            return NextResponse.json({ error: "client not found" }, { status: 402 })
        }

        const AllPendingTask = await Task.find({ clientId: clientlive._id, iscompleted: "NO" })
        const AllTrackingTask = await Task.find({ clientId: clientlive._id, iscompleted: "TRACKING" })

        if (!AllPendingTask || !AllTrackingTask) {
            return NextResponse.json({error:"the task is empty"},{status:403})
        }

        return NextResponse.json({message:"data is present" , AllPendingTask , AllTrackingTask},{status:201})


    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "internal server error" }, { status: 500 })
    }
}  
import { NextRequest, NextResponse } from "next/server"
import { client } from "../../../../models/client.model"
import { Worker } from "../../../../models/workers.model"
import { Task } from "../../../../models/task.model"
import { auth } from "@clerk/nextjs/server"
import { connectDB } from "@/lib/dbconnect"
import { User } from "../../../../models/user.model"


 export async function POST  (req: NextRequest) {
    const { userId } = await auth()
    console.log(userId,"hello id")
    if (!userId) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 })
    }
    try {

        const body = await req.json()
        const { vehicalType, startDate, numberOfWorker } = body

        await connectDB()

        const clientlive = await client.findOne({ clientId: userId })
        const userRole = await User.findOne({clerkId:userId})

        if (userRole.role !== "client") {
            return NextResponse.json({ error: "You cannot create the task" }, { status: 403 })
        }

        const availabelWorkersNumber = await Worker.find({status:"FREE"}).countDocuments()

        if (numberOfWorker > availabelWorkersNumber) {
            return NextResponse.json({error:`there is only ${availabelWorkersNumber} workers avalabel`},{status:400})
        }

        const createTask = await Task.create({
            clientId: clientlive._id,
            vehicalType,
            startDate,
            numberOfWorker,
            iscompleted: "NO"
        })

        

        if (!createTask) {
            return NextResponse.json({error:"failed to create  the task"},{status:422})
        }

        return NextResponse.json({ message: "create the task succesfully", data: createTask }, { status: 201 })


    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: "internal server error" }, { status: 500 })
    }
}

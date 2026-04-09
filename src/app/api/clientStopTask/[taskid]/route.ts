// import { NextRequest, NextResponse } from "next/server";
// import { Task } from "../../../../../models/task.model";
// import { auth } from "@clerk/nextjs/server";
// import { client } from "../../../../../models/client.model";
// import { connectDB } from "@/lib/dbconnect";
// import { Worker } from "../../../../../models/workers.model";

// export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ taskid: string }> }) => {
//     const { userId } = await auth()

//     if (!userId) {
//         return NextResponse.json({ error: "unauthorized" }, { status: 401 })
//     }
//     try {


//         const { taskid } = await params

//         await connectDB()

//         if (!taskid) {
//             return NextResponse.json({ error: "task not found" }, { status: 400 })
//         }

//         const clientlive = await client.findOne({ clientId: userId })

//         if (!clientlive) {
//             return NextResponse.json({ error: "client not found" }, { status: 404 })
//         }

//         const updatetostopTask = await Task.findOneAndUpdate({ _id: taskid, clientId: clientlive._id }, { $set: { iscompleted: "YES" } }, { new: true })

//         if (!updatetostopTask) {
//             return NextResponse.json({ error: "failed to stop task" }, { status: 404 })
//         }

//         clientlive.completedTask += 1
//         await clientlive.save()



//         await Worker.updateMany(
//             { _id: { $in: updatetostopTask.workerId } },
//             {
//                 $inc: { totalTaskCompleted: 1 },
//                 $set: { status: "FREE" }
//             }
//         )

//         return NextResponse.json({ message: "stoped the task succesfully" }, { status: 200 })

//     } catch (error) {
//         console.log(error)

//         return NextResponse.json({ error: "internal server" }, { status: 500 })
//     }
// }



import { Task } from "../../../../../models/task.model";
import { client } from "../../../../../models/client.model";
import { Worker } from "../../../../../models/workers.model";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/dbconnect";



export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ taskid: string }> }) => {

    try {

        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: "login please" }, { status: 401 })
        }

        const { taskid } = await params

        await connectDB()

        const clientlive = await client.findOne({ clientId: userId })

        if (!clientlive) {
            return NextResponse.json({ error: "client not found" }, { status: 404 })
        }

        const clientTask = await Task.findById(taskid)

        if (!clientTask) {
            return NextResponse.json({ error: "task not found" }, { status: 404 })
        }


        if (clientTask.iscompleted === "YES" || clientTask.iscompleted === "NO") {
            return NextResponse.json({ error: "You cannot stop the task which is alredy stoped or complted" }, { status: 400 })
        }


        clientTask.iscompleted = "YES"
        await clientTask.save()

        clientlive.completedTask += 1;
        await clientlive.save()

        await Worker.updateMany({ _id: { $in: clientTask.workerId } }, { $inc: { totalTaskCompleted: 1 }, $set: { status: "FREE" } })

        return NextResponse.json({ message: "updated the data succesfully" }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "internal serve error" }, { status: 500 })
    }
}
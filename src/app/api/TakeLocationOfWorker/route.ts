import { NextRequest, NextResponse } from "next/server";
import { Task } from "../../../../models/task.model";
import { Worker } from "../../../../models/workers.model";
import { auth } from "@clerk/nextjs/server";


export async function GET(req: NextRequest) {
    try {

        const {userId} = await auth()
        const activeTask = await Task.findOne({ clientId: userId });

        if (!activeTask) {
            return NextResponse.json({ message: "No task found" });
        }

        const workers = await Worker.find({
            workerId: { $in: activeTask.workerId }
        });

        if (!workers || workers.length===0) {
            return NextResponse.json({message:"This workers is not present for this task"},{status:401})
        }

        const workerData = workers.map(w => ({
            workerId: w.workerId,
            location: w.location,
            status: w.status
        }));

        return NextResponse.json({
            task: activeTask,
            workers: workerData
        });

    } catch (err) {
        console.log(err)
        return NextResponse.json({ Message: "internal server error" }, { status: 500 })
    }
}
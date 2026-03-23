import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { Worker } from "../../../../models/workers.model";
import { Task } from "../../../../models/task.model";
import { connectDB } from "@/lib/dbconnect";

export async function PATCH(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    console.log("DB connected, userId:", userId);

    const checkTask = await Task.findOne({ workerId: userId });
    console.log("Task found:", checkTask);

    if (!checkTask) {
      return NextResponse.json(
        { message: "There is no active task" },
        { status: 404 }
      );
    }

    if (checkTask.iscompleted===true) {
      return NextResponse.json(
        { message: "The task has been finished" },
        { status: 403 }
      );
    }

    const body = await req.json();
    console.log("Request body:", body);

    const { lat, lng } = body;

    if (lat === undefined || lng === undefined) {
      return NextResponse.json(
        { error: "lat and lng are required" },
        { status: 400 }
      );
    }

    const updatedWorker = await Worker.findOneAndUpdate(
      { workerId: userId },
      { location: { lat, lng } },
      { new: true, upsert: true } 
    );
    console.log("Updated worker:", updatedWorker);

    if (!updatedWorker) {
      console.error("No worker found with workerId:", userId);
      return NextResponse.json(
        { error: "Worker not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Location updated" }, { status: 200 })

  } catch (error) {

    console.error("Error updating location:", error);
    return NextResponse.json(
      { error: "Internal server error", detail: (error as Error).message },
      { status: 500 }
    );
  }
}
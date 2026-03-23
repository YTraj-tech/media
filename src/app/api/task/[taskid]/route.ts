import { NextRequest,NextResponse } from "next/server";
import { connectDB } from "@/lib/dbconnect";
import { auth } from "@clerk/nextjs/server";
import { Task } from "../../../../../models/task.model";



export async function GET(
  req: NextRequest, 
  { params }: { params: Promise<{ taskid: string }> }  // Promise here
) {
  try {
    await connectDB();

    const { taskid } = await params;  // await here
    
    if (!taskid) {
      return NextResponse.json({ message: "No task ID provided" }, { status: 400 });
    }

    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const singleTask = await Task.findById(taskid);

    if (!singleTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ SingelTask: singleTask }, { status: 200 });

  } catch (err) {
    return NextResponse.json(
      { message: "Server error", error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
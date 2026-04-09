import { NextResponse } from "next/server";
import { Worker } from "../../../../models/workers.model";
import { Task } from "../../../../models/task.model";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/dbconnect";

export const GET = async () => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB()

    // 1. Get worker by logged-in user
    const worker = await Worker.findOne({ workerId: userId });

    if (!worker) {
      return NextResponse.json(
        { message: "Worker not found" },
        { status: 404 }
      );
    }

    // 2. If not verified
    if (!worker.isVerified) {
      return NextResponse.json(
        {
          message: "Admin must verify your profile",
          Sendlocation: false
        },
        { status: 403 }
      );
    }

    // 3. Check if worker is assigned to active task
    const activeTask = await Task.findOne({
      workerId: { $in: [worker._id] },
      iscompleted: "TRACKING"
    });

   

    // 4. If assigned → allow location
    if (activeTask) {
      return NextResponse.json(
        {
          message: "You can send location now",
          Sendlocation: true
        },
        { status: 200 }
      );
    }

    // 5. Default response
    return NextResponse.json(
      {
        message: "No active task",
        Sendlocation: false,
        worker
      },
      { status: 200 }
    );

  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
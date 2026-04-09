import { NextRequest, NextResponse } from "next/server";
import { Task } from "../../../../models/task.model";
import { auth } from "@clerk/nextjs/server";
import { client } from "../../../../models/client.model";
import { connectDB } from "@/lib/dbconnect";
import mongoose from "mongoose";

export const PATCH = async (req: NextRequest) => {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { taskid } = body;

    await connectDB();

    if (!taskid) {
      return NextResponse.json(
        { error: "Task ID is required" },
        { status: 400 }
      );
    }

    // ✅ ObjectId validation
    if (!mongoose.Types.ObjectId.isValid(taskid)) {
      return NextResponse.json(
        { error: "Invalid task ID" },
        { status: 400 }
      );
    }

    const clientlive = await client.findOne({ clientId: userId });

    if (!clientlive) {
      return NextResponse.json(
        { error: "Client not found" },
        { status: 404 }
      );
    }

    // ✅ find task first
    const task = await Task.findOne({
      _id: taskid,
      clientId: clientlive._id,
    });


    if (!task) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }



    // ✅ business rules
    if (task.iscompleted === "YES") {
      return NextResponse.json(
        { error: "Task already completed" },
        { status: 400 }
      );
    }

    if (task.iscompleted === "TRACKING") {
      return NextResponse.json(
        { error: "Task already in tracking" },
        { status: 400 }
      );
    }

    if (task.numberOfWorker > task.workerId.length) {
      return NextResponse.json({ error: "Still the required workers are not yet added " }, { status: 403 })
    }

    task.iscompleted = "TRACKING";
    await task.save();

    return NextResponse.json(
      { message: "updated successfully", data: task },
      { status: 200 }
    );

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
};
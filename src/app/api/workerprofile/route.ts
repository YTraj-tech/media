import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/dbconnect";
import { Worker } from "../../../../models/workers.model";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

        await connectDB();


    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { vehicalType, gender } =  body;
   
    // Validate required fields from body
    if (!vehicalType) {
      return NextResponse.json(
        { error: "vehicalType is required" },
        { status: 400 }
      );
    }


  

    const worker = await Worker.create({
      workerId: userId,       // Clerk user ID
      vehicalType,            // required from body
      gender: gender || "MALE",
    });

    return NextResponse.json(
      { message: "Worker profile created successfully", worker },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating worker profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server"
import { Worker } from "../../../../../models/workers.model"
import { connectDB } from "@/lib/dbconnect"

export async function GET() {
    try {
        await connectDB()

        const workers = await Worker.find({ status: "FREE" })

         if (workers.length===0) {
            return NextResponse.json({error:"There are no Workers free right now"},{status:200})
         }

        return NextResponse.json(
            { data: workers },
            { status: 200 }
        )

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Failed to fetch workers" },
            { status: 500 }
        )
    }
}
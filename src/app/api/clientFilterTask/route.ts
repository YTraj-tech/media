import { Task } from "../../../../models/task.model";
import { client } from "../../../../models/client.model";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/dbconnect";


export async function GET(req:NextRequest) {
    const { userId } = await auth()
    const {searchParams} = new URL(req.url)
    if (!userId) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 })
    }
    try {
        await connectDB()
         const query: Record<string, any> = {}

         const selectfilter = searchParams.get('selectfilter')

        const clientlive = await client.findOne({ clientId: userId })

        if (!clientlive) {
            return NextResponse.json({ error: "client not found" }, { status: 402 })
        }

        if (selectfilter==="ALL") {
            
        }

         if (selectfilter==="COMPLETED") {
            query.iscompleted="YES"
         }

         if (selectfilter==="LIVE") {
            query.iscompleted="TRACKING"
         }

         if (selectfilter==="NOTSTARTED") {
            query.iscompleted="NO"
         }

         const FilterTask = await Task.find({clientId:clientlive._id,...query})

         return NextResponse.json({FilterTask},{status:200})

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
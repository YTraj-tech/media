import { NextResponse } from "next/server"
import { Task } from "../../../../../models/task.model"
import { connectDB } from "@/lib/dbconnect"
import { auth } from "@clerk/nextjs/server"
import { User } from "../../../../../models/user.model"

export async function GET() {
      try {
        const {userId} = await auth()

        if (!userId) {
            return NextResponse.json({error:"unauthorized"},{status:401})
        }
        await connectDB()
        
        const userRole = await User.findOne({clerkId:userId})

         if (userRole.role!=="Admin") {
            return NextResponse.json({error:"You Are Not Admin"},{status:403})
         }

        const tasks = await Task.find({ iscompleted: "NO" })

        return NextResponse.json(
            { message: " Admin Tasks fetched successfully", data: tasks  },
            { status: 200 }
        )

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
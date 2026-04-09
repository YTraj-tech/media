import { auth } from "@clerk/nextjs/server";
import { Task } from "../../../../../../models/task.model";
import { Worker } from "../../../../../../models/workers.model";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/dbconnect";
import { User } from "../../../../../../models/user.model";
import { client } from "../../../../../../models/client.model";



export const GET = async (req:NextRequest,{ params }: { params: Promise<{ taskid: string }> }) => {

   const { userId } = await auth()
   if (!userId) {
      return NextResponse.json({ error: "please login" }, { status: 401 })
   }

   try {

      const { taskid } = await params

      if (!taskid) {
         return NextResponse.json({ error: "Taskid required" },{status:400})
      }
      await connectDB()


      const userRole = await User.findOne({ clerkId: userId })

      if (!userRole || userRole.role !== "Admin") {
         return NextResponse.json({ error: 'You are not Admin' }, { status: 403 })
      }

      const Singel_Task = await Task.findById(taskid)

      const numberOfWorkerRequired = Singel_Task.workerId.length

      if (!Singel_Task) {
         return NextResponse.json({ error: "Task not found" }, { status: 404 })
      }

   

      const clientDetails = await client.findById(Singel_Task.clientId)

      if (!clientDetails) {
         return NextResponse.json({ error: "Client details not found" }, { status: 404 })
      }

      return NextResponse.json({ Singel_Task, clientDetails }, { status: 201 })


   } catch (error) {

      console.log(error)
      return NextResponse.json({ error: "Inter serer error" }, { status: 500 })
   }
}
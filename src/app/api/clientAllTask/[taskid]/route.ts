import { NextResponse ,NextRequest } from "next/server";
import { Task } from "../../../../../models/task.model";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/dbconnect";


export const GET = async( req:NextRequest , {params}:{params:Promise<{taskid:string}>}) => {
    const {userId} = await auth()
    if (!userId) {
        return NextResponse.json({error:"unauthorized"},{status:401})
    }
   try {

    await connectDB()

    const {taskid} = await params
     
    const SingelTask = await Task.findById(taskid)

    if (!SingelTask) {
        return NextResponse.json({error:"task not found"},{status:404})
    }

     return NextResponse.json({message:"data came succesfully" , SingelTask},{status:200})
    
   } catch (error) {
      console.log(error)
      return NextResponse.json({error:"internal server error"},{status:500})
   }
}
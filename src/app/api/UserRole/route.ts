import { User } from "../../../../models/user.model";
import { auth } from "@clerk/nextjs/server";
import { NextRequest , NextResponse } from "next/server";

export async function GET(req:NextRequest) {
  try {
    const {userId} = await auth()
     if (!userId) {
      return NextResponse.json({error:"unathorized"},{status:401})
     }

     const UserRole = await User.findOne({clerkId:userId}).select('role').lean()

     if (!UserRole) {
       return NextResponse.json({error:"The User role is not present"},{status:404})
     }

     return  NextResponse.json({UserRole},{status:200})
  } catch (error) {
    console.error(error)
    NextResponse.json({error:"Internal server error"},{status:500})
  }
}
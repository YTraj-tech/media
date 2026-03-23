import { Worker } from "../../../../models/workers.model";
import { NextResponse,NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";

interface Iveicle {
    licence: string,
    rcbook: string
}

interface Ilocation {
    lat: number,
    lng: number
}

interface Iworkers {
    workerId: string,
    isActive: boolean,
    isVerified: boolean,
    rating: number,
    totalTaskCompleted: number,
    vehicalType: string,
    lisence: string,
    status: 'WORKING' | 'FREE'
    vehicelProfile: Iveicle,
    gender: 'MALE' | 'FEMALE'
    location: Ilocation
}


export async function GET(req:NextRequest) {
    try {
       const {userId} = await auth()

       if (!userId) {
        return NextResponse.json({message:"unautorized"},{status:404})
       }
        
       const ActiveWorker = await Worker.find({isVerified:true})

       if (ActiveWorker.length===0) {
          return NextResponse.json({message:"There is No Worker Free"},{status:404})
       }

       return NextResponse.json({ActiveWorker},{status:201})

    } catch (err) {
        console.error(err)
        return NextResponse.json({message:"Inter server error"},{status:500})
    }
}

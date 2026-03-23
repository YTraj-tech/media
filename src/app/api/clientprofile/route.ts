import { client } from "../../../../models/client.model";
import mongoose from "mongoose";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { User } from "../../../../models/user.model";

export interface Iclient {
    clientId: string,
    companyName: string
    companyType: string,
    purpose: string,
    name: string,
    Employes: number,
    completedTask: number
}



export interface Iuser {
    clerkId: string,
    email: string,
    name: string,
    role: "client" | "worker" | "Admin"
}


export  async function POST(req: NextRequest) {
    const { userId } = await auth()

    try {

        const body = await req.json()
        const { companyName, companyType, purpose, name, Employes, completedTask } =  body

        const existingCompany = await client.findOne({companyName})

        if (existingCompany) {
            return NextResponse.json( { message: "Company name has been alredy taken" },{ status: 401 })
        }

        const userrole = await User.findOne({clerkId:userId})

        if (!userrole) {
            return NextResponse.json({message:"user not found"},{status:404})
        }

        if (userrole.role !== "client") {
            return NextResponse.json({ message: "Your are not the client to make the profile" },{ status: 404 })
        }

        await client.create({
            clientId: userId,
            companyName,
            companyType,
            purpose ,
            name ,
            Employes,
            completedTask:0
        })

         return NextResponse.json({message:"Created the prfile succesfully"},{status:201})


    } catch (err) {
        console.log(err)
        NextResponse.json({message:"internal server error"},{status:500})
    }
}
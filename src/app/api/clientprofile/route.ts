import { NextRequest, NextResponse } from "next/server";
import { client } from "../../../../models/client.model";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/dbconnect";

export interface Iclient {
    clientId: string,
    companyName: string
    companyType: string,
    purpose: string,
    name: string,
    Employes: string,
    completedTask: number
}


export const POST = async (req: NextRequest) => {
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 404 })
    }
    try {
        await connectDB()
        const body = await req.json();
        const { companyName, companyType, purpose, name, Employes } = body

        const alredyExits = await client.findOne({ companyName: companyName })

        if (alredyExits && alredyExits.clientId !== userId) {
            return NextResponse.json({ message: "Company name alredy exist" }, { status: 401 })
        }

        const existingprofile = await client.findOne({ clientId: userId })

        if (!existingprofile) {
            const createProfile = await client.create({
                clientId: userId,
                companyName,
                companyType,
                purpose,
                name,
                Employes,
                completedTask: 0,
            })
            return NextResponse.json({
                message: "Profile created",
                data: createProfile
            }, { status: 201 })

        } else {
            const updateData = await client.findOneAndUpdate({ clientId: userId }, {
                companyName,
                companyType,
                purpose,
                name,
                Employes
            },
                { new: true }
            )
            return NextResponse.json({
                message: "Profile updated",
                data: updateData
            }, { status: 201 })

        }

        return NextResponse.json({ message: "the data updated sucessfull" }, { status: 200 })

    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "INTERNAL server error" }, { status: 500 })
    }
}
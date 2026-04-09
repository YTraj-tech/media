import { NextResponse, NextRequest } from "next/server";
import { Worker } from "../../../../models/workers.model";
import { auth } from "@clerk/nextjs/server";
import { AwardIcon, ReceiptRussianRubleIcon } from "lucide-react";
import { connectDB } from "@/lib/dbconnect";
import { UploadToCloudinary } from "@/lib/uploadToCloudinary";





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

export const POST = async (req: NextRequest) => {

    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    try {
        await connectDB()

        const formData = await req.formData()

        const licenseFile = formData.get('licenseImage') as File
        const rcbookFile = formData.get('rcbookImage') as File

        const vehicalType = formData.get('vehicalType') as string
        const gender = formData.get('gender') as string


        if (!vehicalType || !gender) {
            return NextResponse.json({ message: "input fields are required" }, { status: 400 })
        }

        if (!licenseFile || !rcbookFile) {
            return NextResponse.json({ message: "Please upload the img" }, { status: 400 })
        }

        const existingdata = await Worker.findOne({ workerId: userId })

        if (existingdata && existingdata.role === "worker") {
            return NextResponse.json({ message: "You are not worker to create this profile" }, { status: 403 })
        }

        const licenceUpload = await UploadToCloudinary(licenseFile, "worker/licence");
        const rcbookUpload = await UploadToCloudinary(rcbookFile, 'worker/rcbook')

        if (existingdata) {
            const updateData = await Worker.findOneAndUpdate({ workerId: userId },
                {
                    vehicalType: vehicalType,
                    gender: gender,
                    vehicelProfile: {
                        licence: licenceUpload.secure_url,
                        rcbook: rcbookUpload.secure_url
                    }
                },
                {
                    new: true
                }
            )

            return NextResponse.json({ message: "updated the data sucessfully" }, { status: 200 })
        }


        const createData = await Worker.create({
            workerId: userId,
            vehicalType,
            gender,
            vehicelProfile: {
                licence: licenceUpload.secure_url,
                rcbook: rcbookUpload.secure_url
            }
        })

        return NextResponse.json({ message: "Created the profile sucessfully" }, { status: 201 })

    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}










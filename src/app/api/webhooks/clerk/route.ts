import { Webhook } from "svix"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { connectDB } from "@/lib/dbconnect"
import { User } from "../../../../../models/user.model"
import { WebhookEvent } from "@clerk/nextjs/server"

export async function POST(req: Request) {

    const payload = await req.text()
    const headerPayload = await headers()

    const svix_id = headerPayload.get("svix-id")!
    const svix_timestamp = headerPayload.get("svix-timestamp")!
    const svix_signature = headerPayload.get("svix-signature")!

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!)

    let event: WebhookEvent

    try {
        event = wh.verify(payload, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent
    } catch (err) {
        return new NextResponse("Error verifying webhook", { status: 400 })
    }

    if (event.type === "user.created") {

        const { id, email_addresses, first_name } = event.data

        await connectDB()

        await User.create({
            clerkId: id,
            email: email_addresses[0].email_address,
            name: first_name,
            role: "client"
        })
        console.log("Webhook received")
        console.log(event.type)
        console.log("User stored in DB")
    }


    return NextResponse.json({ success: true })
}
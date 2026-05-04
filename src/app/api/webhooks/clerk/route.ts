import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbconnect";
import { User } from "../../../../../models/user.model";
import { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    const payload = await req.text();
    const headerPayload = await headers();

    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new NextResponse("Missing svix headers", { status: 400 });
    }

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);

    let event: WebhookEvent;

    try {
        event = wh.verify(payload, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error("Webhook verification failed:", err);
        return new NextResponse("Error verifying webhook", { status: 400 });
    }

    console.log("EVENT TYPE:", event.type);

    if (event.type !== "user.created") {
        return NextResponse.json({ received: true });
    }

    const { id, email_addresses, first_name } = event.data;

    const email = email_addresses?.[0]?.email_address;

    if (!email) {
        return new NextResponse("Email missing", { status: 400 });
    }

    try {
        await connectDB();

        await User.findOneAndUpdate(
            { clerkId: id },
            {
                clerkId: id,
                email,
                name: first_name,
                role: "client",
            },
            { upsert: true, new: true }
        );

        console.log("User stored/updated in DB");

        return NextResponse.json({ success: true });

    } catch (err) {
        console.error("Database error:", err);
        return new NextResponse("Database error", { status: 500 });
    }
}
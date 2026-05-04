import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/dbconnect";
import { User } from "../../../../models/user.model";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ role: null }, { status: 401 });
    }

    await connectDB();

    const user = await User.findOne({ clerkId: userId })
      .select("role")
      .lean();

    return NextResponse.json({
      role: user?.role || "client",
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch role" },
      { status: 500 }
    );
  }
}
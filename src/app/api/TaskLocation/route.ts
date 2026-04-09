// import { Task } from "../../../../models/task.model";
// import { Worker } from "../../../../models/workers.model";
// import { connectDB } from "@/lib/dbconnect";
// import { client } from "../../../../models/client.model";
// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";




// export const GET = async (req: NextRequest) => {

//     const { userId } = await auth();

//     if (!userId) {
//         return NextResponse.json({ message: "Unauthorized" }, { status: 401 }); // Changed to 401
//     }
    
//     try {
//         await connectDB();

//         const clientdoc = await client.findOne({ clientId: userId });
        
//         if (!clientdoc) {
//             return NextResponse.json({ error: "Client not found" }, { status: 404 });
//         }

//         const ActiveTask = await Task.findOne({ 
//             clientId:clientdoc._id, 
//             iscompleted: "TRACKING" 
//         }).populate({
//             path: "workerId",
//             select: "workerId location status vehicalType" // Added more fields for debugging
//         });

//         if (!ActiveTask) {
//             return NextResponse.json(
//                 { error: "No active task found", stop: true , active:false }, 
//                 { status: 404 } // Changed to 200 since this is a valid state
//             );
//         }

//         if (!ActiveTask.workerId || ActiveTask.workerId.length === 0) {
//             return NextResponse.json(
//                 { error: "No workers assigned to this task", stop: true }, 
//                 { status: 400 }
//             );
//         }

        

//         if (ActiveTask.iscompleted === "YES") {
//             return NextResponse.json(
//                 { error: "The Task is completed", stop: true }, 
//                 { status: 401 }
//             );
//         }

//         // Map the workers safely
//         const result = ActiveTask.workerId.map((worker: any) => ({
//             workerId: worker._id,
//             location: {
//                 lat: worker.location?.lat ,
//                 lng: worker.location?.lng 
//             },
//             status: worker.status 
//         }));

//         if (!result) {
//             return NextResponse.json({error:"the data is not been sent"},{status:400})
//         }

//         return NextResponse.json({ 
//             data: result, 
//             success: true 
//         }, { status: 200 });

//     } catch (error) {
//         console.error("Detailed error:", error); // Better logging
        
//         // Return proper error message
//         return NextResponse.json({ 
//             message: "Internal server error", 
//             error: error instanceof Error ? error.message : "Unknown error"
//         }, { status: 500 });
//     }
// };



import { Task } from "../../../../models/task.model";
import { Worker } from "../../../../models/workers.model"; // ✅ MUST import to register schema
import { connectDB } from "@/lib/dbconnect";
import { client } from "../../../../models/client.model";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export const GET = async (req: NextRequest) => {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        await connectDB();

        // ✅ Referencing Worker after connectDB ensures Mongoose registers the schema
        // before Task.populate() tries to look it up by the ref name "Worker"
        void Worker;

        const clientdoc = await client.findOne({ clientId: userId });

        if (!clientdoc) {
            return NextResponse.json({ error: "Client not found" }, { status: 404 });
        }

        const ActiveTask = await Task.findOne({
            clientId: clientdoc._id,
            iscompleted: "TRACKING",
        }).populate({
            path: "workerId",
            select: "workerId location status vehicalType",
        });

        if (!ActiveTask) {
            return NextResponse.json(
                { error: "No active task found. Make your task live to start tracking.", stop: true, active: false },
                { status: 404 }
            );
        }

        if (!ActiveTask.workerId || ActiveTask.workerId.length === 0) {
            return NextResponse.json(
                { error: "No workers assigned to this task", stop: true },
                { status: 400 }
            );
        }

        const result = ActiveTask.workerId.map((worker: any) => ({
            workerId: worker.workerId, // ✅ string ID, not _id
            location: {
                lat: worker.location?.lat ?? null,
                lng: worker.location?.lng ?? null,
            },
            status: worker.status,
        }));

        return NextResponse.json({ data: result, success: true }, { status: 200 });

    } catch (error) {
        console.error("TaskLocation error:", error);
        return NextResponse.json(
            {
                message: "Internal server error",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
};
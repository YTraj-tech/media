import mongoose, { Schema, Types, model, models } from "mongoose";

interface Itask {
    clientId: Types.ObjectId
    workerId: Types.ObjectId[]
    vehicalType: string
    startDate: Date,
    numberOfWorker: number,
    iscompleted: "NO" | "TRACKING" | "YES",
    review: string
}


const TaskSchema = new Schema<Itask>({
    clientId: {
        type: Schema.Types.ObjectId,
        ref: "client",
        required: true
    },
    workerId: [
        {
            type: Schema.Types.ObjectId,
            ref: "Worker"
        }
    ],
    vehicalType: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    numberOfWorker: {
        type: Number,
        default: 0,
        required: true
    },

    iscompleted: {
        type: String,
        enum: ["NO", "TRACKING", "YES"],
        default: "NO"
    },
    review: {
        type: String,

    }
})

export const Task = models.Task || model<Itask>('Task', TaskSchema)
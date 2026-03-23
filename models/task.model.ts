import mongoose, { Schema, Types, model, models } from "mongoose";

interface Itask {
    clientId:string
    workerId: string[]
    vehicalType: string
    startDate: Date,
    numberOfWorker: number,
    stopit: boolean,  //client will stop it 
    iscompleted: boolean,
    review: string
}


const TaskSchema = new Schema<Itask>({
    clientId: {
        type: String,
         required: true
    },
    workerId: [
        {
            type:String,
            required: true
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
        default: 0
    },
    stopit: {
        type: Boolean,
        default: false
    },
    iscompleted: {
         type:Boolean,
        default: false
    },
    review: {
        type: String,

    }
})

export const Task = models.Task || model<Itask>('Task', TaskSchema)
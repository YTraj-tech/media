import mongoose, { Schema, models, model } from "mongoose";

interface Iveicle {
    licence: string,
    rcbook: string
}

interface Ilocation {
    lat: number,
    lng: number
}



interface Iworkers {
    workerId:string,
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


const WorkerSchema = new Schema<Iworkers>({
    workerId: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    lisence: {
        type: String
    },

    rating: {
        type: Number
    },
    totalTaskCompleted: {
        type: Number,
        default: 0
    },
    vehicalType: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum:['WORKING' , 'FREE'],
        default: 'FREE'
    },
    vehicelProfile: {
        licence: {
            type: String,

        },
        rcbook: {
            type: String,

        }
    },
    gender: {
        type: String,
        enum: ['MALE', 'FEMALE'],
        default: "MALE"
    },
    location: {
        lat: {
            type: Number
        },
        lng: {
            type: Number
        }
    },


})



export const Worker = models.Worker || model<Iworkers>('Worker', WorkerSchema)

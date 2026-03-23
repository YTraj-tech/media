import mongoose, { Schema, model, models } from "mongoose";




export interface Iuser {
    clerkId: string,
    email: string,
    name: string,
    role: "client" | "worker" | "Admin"
}


const UserSchema = new Schema<Iuser>(
    {
        clerkId:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        name:{
            type:String,
            required:true
        },
        role:{
          enum:["client" , "worker" , "Admin"],
          default:'client',
          type:String,
          required:true
        },
    
    },
    {
        timestamps:true
    }
)


export const User = models.User || model<Iuser>('User',UserSchema)
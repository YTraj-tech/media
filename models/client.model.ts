import mongoose,{Schema,models,model} from "mongoose";


export interface Iclient {
  clientId:string,
  companyName:string
  companyType:string,
  purpose:string,
  name:string,
  Employes:number,
  completedTask:number
}

const ClientSchema = new Schema<Iclient>({
    clientId:{
         type:String,
        required:true
    },
    companyName:{
        type:String,
        required:true
    },
    companyType:{
        type:String,
        required:true
    },
    purpose:{
        type:String,
        maxLength:[20,"at least one line must be written"]
        
    },
    name:{
        type:String,
        required:true
    },
    Employes:{
        type:Number,
        required:true
    },
    completedTask:{
        type:Number
    }
})


export const client = models.client || model<Iclient>('client',ClientSchema)


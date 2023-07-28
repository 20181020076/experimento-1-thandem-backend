import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    userName: String,
    sala:Number,
    message:{type:String,require:true},
    rating:{type:Number,require:true},
    plan:Object
})

export default model("Message",messageSchema)

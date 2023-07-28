import { Schema, model } from "mongoose";
import Message from "./Message.js";
const salaSchema = new Schema({
    salaName: Number,
    messages:Message,
    rating:{type:Number,require:true},
    plan:Object
})

export default model("Sala",salaSchema)

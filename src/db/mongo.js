import mongoose from "mongoose";
import "dotenv/config";

import Message from "../models/Message.js"
import Sala from "../models/Sala.js";
const uri = process.env.URI


const db = mongoose.connection
mongoose.connect(uri).catch(err=>console.log(err));

db.once("open", _=>{
    console.log('Database is connected to ', uri)
})
db.on("error", err =>{
    console.log(err)
})


export const saveData = async (model) => {
    try {
      await model.save();
      console.log("Datos guardados exitosamente");
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }
  };

const mensaje1 = new Message({
    userName: "pepe",
    sala:15,
    message:"hola",
    rating:0,
    plan:{name:"la goloza"}
})
// console.log(mensaje1) 

// saveData(mensaje1)
import mongoose from "mongoose";

const db = mongoose.connection
const uri = process.env.URI

mongoose.connect(uri).catch(err=>console.log(err));

db.once("once", _=>{
    console.log('Database is connected to ', uri)
})
db.on("error", err =>{
    console.log(err)
})
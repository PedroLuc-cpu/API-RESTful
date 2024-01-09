import mongoose, { Schema } from "mongoose";
import { QueryPerson } from "../model/Person";



// Schema da tabela
const createSchema = new Schema<QueryPerson>({
       name: {type: "string", required: true},
       salary: {type: "number", required:true},
       sexy: {type: "string" , required:true, enum:["masculino" , "feminino"]},
       approved: {type: "boolean", required:true},
})


export const Person = mongoose.model('Person', createSchema)
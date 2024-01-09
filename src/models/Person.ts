import mongoose, { Schema } from "mongoose";

interface  Query  {
       name: string
       salary: number
       approved: boolean
}

// Schema da tabela
const createSchema = new Schema<Query>({
       name: {type: "string", required: true},
       salary: {type: "number", required:true},
       approved: {type: "boolean", required:true},
})


export const Person = mongoose.model('Person', createSchema)
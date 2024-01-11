import express, { Request, Response } from "express"
import {Person} from "../data/Person"
import { QueryPerson } from "../model/Person";

const router = express.Router();


// Rotas da API
router.post('/', async (req : Request, res: Response) => {
       const {name, salary, approved, sexy} = req.body
       
       if(!name){
              res.status(422).json({error:"O nome é obrigatório"})
              return
       }
       const person: QueryPerson = {
              name,
              salary,
              approved,
              sexy
       }

       try{
       // create

       await Person.create(person)
       res.status(201).json({message: "Cadastrado com sucesso"})

       }catch(err){
              res.status(500).json({message: err})
       }
})


// LEITURA DOS DADOS
router.get('/', async (req : Request, res: Response) => {
       try{

              const people = await Person.find()
              res.status(200).json(people)

       }catch (err){
              res.status(500).json({message: err})
       }
})

router.get('/:id', async (req : Request, res: Response) => {
       
       const id = req.params.id

       try{
              const person = await Person.findOne({_id: id})

              if(!person){
              res.status(422).json({message: "Pessoa não encontrada"})
              return
              }

              res.status(200).json(person) 
       }catch(err){
              res.status(500).json({message: err})
       }
})


// Update - (PUT / Patch)
router.put('/:id', async (req : Request, res: Response) => {

       const id = req.params.id

       const {name, salary, approved} = req.body
       
       const person: QueryPerson = {name, salary, approved, sexy:"masculino"}

       try{

       const UpdatedPerson = await Person.updateOne({_id:id}, person)

       if(UpdatedPerson.matchedCount === 0){
              res.status(422).json({message:"Usuario não encontrada"})
       }else if(UpdatedPerson.modifiedCount === 0){
              res.status(422).json({message:"Usuario já se encontra atualizado"})
              return
       }

       res.status(200).json(person)
       }catch(err){
              res.status(500).json({message: err})
       }

})


// delete 
router.delete('/:id', async (req : Request, res: Response) => {

       const id = req.params.id

       const person = await Person.deleteOne({_id: id})
       
       if(!person){
              res.status(422).json({message: "Pessoa não encontrada"})
              return
              }


       try{
              // CORRIRIR O TRATAMENTO DE USER JÁ DELETADOS E NÃO ENCOTRADOS
       const DeletePerson = await Person.deleteOne({_id:id}, person)

       if(DeletePerson.acknowledged){
       res.status(422).json({message:"Usuario não encontrado"})
       return
       }


              res.status(200).json({message:"Usuario Removido com sucesso"}) 
       }catch(err){
              res.status(500).json({message: err})
       }
})


export default router;
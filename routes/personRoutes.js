const router = require('express').Router()

const Person = require('../models/Person') 


// Rotas da API
router.post('/', async (req, res) => {
       const {name, salary, approved} = req.body
       
       if(!name){
       res.status(422).json({error:"O nome é obrigatório"})
       }


       const person = {
              name,
              salary,
              approved
       }

       try{
       // create

       await Person.create(person)
       res.status(201).json({message: "Cadastrado com sucesso"})

       }catch(err){
              res.status(500).json({message: err.message})
       }
})


module.exports = router
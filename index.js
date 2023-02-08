// config initialization
const express = require('express')
const mongoose = require('mongoose');
const app = express()


// JSON / middleware
app.use(
       express.urlencoded({
              extended: true
       })
)
app.use(express.json())


// Rotas da API
const personRouter = require('./routes/personRoutes')
app.use('/person', personRouter)


// Router init

app.get('/', (req, res) => {
 res.json({messagem:"success"})
})

const DB_USER = "pedro"
const DB_PASS = encodeURIComponent('123')

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@restfulcluster.wbgvswh.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{
       console.info("Connection ao MongoDB")
       app.listen(3000)
})
.catch(err => console.log(err))


// Port open

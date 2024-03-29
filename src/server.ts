// config initialization
import express, { Request, Response } from "express"
import mongoose from "mongoose";
import personRouter from "./routes/personRoutes"
import cors from "cors"

export const app = express()



// JSON / middleware
app.use(
       express.urlencoded({
              extended: true
       })
)
app.use(express.json())
app.use(cors())


// Rotas da API
app.use('/person', personRouter)


// Router init

app.get('/', (req : Request, res: Response) => {
       res.json({messagem:"success"})
})

const DB_USER = "pedro"
const DB_PASS = encodeURIComponent('123')

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@restfulcluster.wbgvswh.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{
       // Port open
       console.info("Connection ao MongoDB")
       app.listen(3000)
})
.catch(err => console.log(err))
import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import connectDB from './configs/db.js'
import bodyParser from 'body-parser' 
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/api/auth',authRoutes)

app.get('/',(req,res)=>{
    res.send(`<h1>Hello World</h1>`)                
})

app.listen(PORT,()=>{
    connectDB()
    console.log(`The Server is Listening on ${PORT}`);
})
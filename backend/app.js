import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import connectDB from './configs/db.js'
import bodyParser from 'body-parser' 
import cookieParser from 'cookie-parser'
import userRoutes from './routes/user.route.js'
import cloudinary from 'cloudinary'

dotenv.config()

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API,
    api_secret:process.env.CLOUDINARY_SECRET
})
 

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)

app.get('/',(req,res)=>{
    res.send(`<h1>Hello World</h1>`)                
})

app.listen(PORT,()=>{
    connectDB()
    console.log(`The Server is Listening on ${PORT}`);
})
import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import connectDB from './configs/db.js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/user.routes.js'
import cloudinary from 'cloudinary'
import postRoutes from './routes/post.routes.js'
import NotificationRoutes from './routes/notification.routes.js'
import cors from 'cors'

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET
})


const app = express()
const PORT = process.env.PORT

app.use(cors({
    origin:`${process.env.FRONT_END}`,
    credentials: true
}))
app.use(express.json({
    limit:'5mb'
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/notification', NotificationRoutes)

app.get('/', (req, res) => {
    res.send(`<h1>Hello World</h1>`)
})

app.listen(PORT, () => {
    connectDB()
    console.log(`The Server is Listening on ${PORT}`);
})

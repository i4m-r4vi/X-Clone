import express from 'express'
import { signUp,logOut,signIn,getMe } from '../controllers/auth.controllers.js'
import protectRoute from '../middleware/protectRoute.js'


const authRoutes = express.Router()


authRoutes.post('/signup',signUp)
authRoutes.post('/signin',signIn)
authRoutes.post('/logout',logOut)
authRoutes.get('/me',protectRoute,getMe)


export default authRoutes
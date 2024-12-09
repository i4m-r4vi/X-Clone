import express from 'express'
import protectRoute from '../middleware/protectRoute.js'
import { getProfile,followUnFollowUser,Suggested,updateUser } from '../controllers/user.controller.js'


const userRoutes = express.Router()


userRoutes.get('/profile/:username',protectRoute,getProfile)
userRoutes.post('/follow/:id',protectRoute,followUnFollowUser)
userRoutes.get('/suggested',protectRoute,Suggested)
userRoutes.post('/update',protectRoute,updateUser)


export default userRoutes
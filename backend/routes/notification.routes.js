import express from 'express'
import protectRoute from '../middleware/protectRoute.js'
import { getNotification,deleteNotification } from '../controllers/notification.controller.js'


const NotificationRoutes = express.Router()

NotificationRoutes.get('/',protectRoute,getNotification)
NotificationRoutes.delete('/deleteNoti',protectRoute,deleteNotification)

export default NotificationRoutes
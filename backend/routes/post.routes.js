import express from 'express'
import protectRoute from '../middleware/protectRoute.js'
import { createPost, deletePost, createComment, likeUnlikePost, getAllPost, getLikedPost, getFollowingPost, getUserPost } from '../controllers/post.controller.js'


const postRoutes = express.Router()

postRoutes.get('/getAllPost', protectRoute, getAllPost)
postRoutes.get('/likes/:id', protectRoute, getLikedPost)
postRoutes.get('/follwingPost', protectRoute, getFollowingPost)
postRoutes.get("/user/:username", protectRoute, getUserPost)
postRoutes.post('/create', protectRoute, createPost)
postRoutes.post('/like/:id', protectRoute, likeUnlikePost)
postRoutes.post('/comment/:id', protectRoute, createComment)
postRoutes.delete('/:id', protectRoute, deletePost)


export default postRoutes
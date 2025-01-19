import NotificationSend from "../models/notification.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import cloudinary from 'cloudinary'

const createPost = async (req, res) => {
    try {
        const { text } = req.body;
        let { img } = req.body
        const userId = req.user._id
        const user = await User.findById({ _id: userId })
        if (!user) {
            return res.status(400).json({ error: "Cannot find User" })
        }

        if (!text && !img) {
            return res.status(400).json({ error: "Post must have text or image" })
        }

        if (img) {
            const uploadedResponse = await cloudinary.uploader.upload(img);
            img = uploadedResponse.secure_url;
        }

        const newPost = new Post({
            user: userId,
            text,
            img
        })

        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        console.log(`Error in create post controller:${error}`);
        res.status(400).json({ error: "Internal Server Error" })
    }
}

const deletePost = async (req, res) => {
    try {
        const { id } = req.params
        const post = await Post.findById({ _id: id })
        if (!post) {
            return res.status(400).json({ error: "Cannot find Post" })
        }
        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(400).json({ error: "You Cannot Delete the post" })
        }

        if (post.img) {
            const imgId = post.img.split("/").pop().split(".")[0]
            await cloudinary.uploader.destroy(imgId)
        }

        await Post.findByIdAndDelete({ _id: id })
        res.status(200).json({ message: "Successfully Deleted" });

    } catch (error) {
        console.log(`Error in deleting Post:${error}`);
        res.status(400).json({ error: "Internal Server Error" })
    }
}

const createComment = async (req, res) => {
    try {
        const { text } = req.body
        const postId = req.params.id
        const userId = req.user._id
        const post = await Post.findById({ _id: postId })
        if (!post) {
            return res.status(404).json({ error: "Cannot Find Post" })
        }
        const comment = {
            user: userId,
            text
        }
        post.comments.push(comment)
        await post.save()
        res.status(200).json({ message: 'Created Comment' })

    } catch (error) {
        console.log(`Error in create Comment:${error}`);
        res.status(404).json({ error: "Internal Server Error" })
    }
}

const likeUnlikePost = async (req, res) => {
    try {
        const userID = req.user._id
        const userId = await User.findById({ _id: req.user._id })
        const postId = await Post.findById({ _id: req.params.id })
        if (!userId) {
            return res.status(200).json({ message: "User Id Not Found" })
        }
        const isLike = postId.like.includes(req.user._id)
        if (!isLike) {
            await Post.findByIdAndUpdate({ _id: req.params.id }, { $push: { like: req.user._id } })
            await User.findByIdAndUpdate({ _id: req.user._id }, { $push: { likedPost: req.params.id } })
            const notification = new NotificationSend({
                from: userID,
                to: postId.user,
                type: "like"
            })
            await notification.save()
            return res.status(200).json({ message: "Post is Liked" })
        } else {
            await Post.findByIdAndUpdate({ _id: req.params.id }, { $pull: { like: req.user._id } })
            await User.findByIdAndUpdate({ _id: req.user._id }, { $pull: { likedPost: req.params.id } })
            return res.status(200).json({ message: "Post is UnLiked" })
        }
    } catch (error) {
        console.log(`Error in likeUnlike:${error}`);
        res.status(404).json({ error: "Internal Server Error" })
    }
}

const getAllPost = async (req, res) => {
    try {
        const post = await Post.find().sort({ createdAt: -1 })
            .populate({ path: "user", select: "-password" }).populate({ path: "comments.user", select: ["-password", "-email", "-following", "-followers", "-bio", "-link"] })
        if (!post.length == 0) {
            return res.status(200).json(post)
        }
        res.status(200).json([])
    } catch (error) {
        console.log(`Error in getAllPost:${error}`);
        res.status(404).json({ error: "Internal Server Error" })
    }
}

const getLikedPost = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findById({ _id: userId })
        if (!user) {
            return res.status(404).json({ error: "Users Not Found" })
        }
        const likedPosts = await Post.find({ _id: { $in: user.likedPost } })
            .populate({
                path: 'user',
                select: '-password'
            })
            .populate({ path: "comments.user", select: ["-password", "-email", "-following", "-followers", "-bio", "-link"] })
        res.status(200).json(likedPosts)
    } catch (error) {
        console.log(`Error in getLikedPost:${error}`);
        res.status(404).json({ error: "Internal Server Error" })
    }
}

const getFollowingPost = async(req,res)=>{
    try {
        const userId = req.user._id;
        const user = await User.findById({_id:userId})
        if(!user){
            return res.status(404).json({message:"The user is not Found"})
        }
        const following = user.following
        const feedPosts = await Post.find({user:{$in:following}})
                            .sort({createdAt:-1})
                            .populate({
                                path:"user",
                                select:"-password"
                            })
                            .populate({
                                path:"comments.user",
                                select:"-password"
                            })
        res.status(200).json(feedPosts)
    } catch (error) {
        console.log(`Error in getFollowingPost:${error}`);
        res.status(404).json({ error: "Internal Server Error" })
    }
}

const getUserPost = async(req,res)=>{
    try {
        const userId = req.user._id;
        const getUserId = User.findById({_id:userId});
        if(!getUserId){
            return res.status(404).json({message:"The user is not Found"})
        }
        const {username} = req.params
        const getUsername = await User.findOne({username})
        if(!getUsername){
            return res.status(404).json({message:"The user is not Found"})
        }
        const getPost = await Post.find({user:getUsername._id})
                        .sort({createdAt:-1})
                        .populate({
                            path:"user",
                            select:"-password"
                        })
                        .populate(
                            {
                                path:"comments.user",
                                select:"-password"
                            }
                        )
        res.status(200).json(getPost)
    } catch (error) {
        console.log(`Error in getUserPost:${error}`);
        res.status(404).json({ error: "Internal Server Error" })
    }
}


export { createPost, getAllPost, deletePost, createComment, likeUnlikePost ,getLikedPost ,getFollowingPost,getUserPost}
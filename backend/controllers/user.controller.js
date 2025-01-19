import User from "../models/user.model.js";
import NotificationSend from "../models/notification.model.js";
import bcrypt from 'bcryptjs'
import cloudinary from 'cloudinary'

const getProfile = async (req, res) => {
    try {
        const { username } = req.params
        const user = await User.findOne({ username: username })
        if (!user) {
            return res.status(400).json({ error: "User not Found" })
        }
        res.status(200).json(user)
    } catch (error) {
        console.log(`Error in user profile : ${error}`);
        res.status(500).json({ error: "Internal Server Error" })

    }
}

const followUnFollowUser = async (req, res) => {
    try {
        const { id } = req.params
        const userToModify = await User.findById({ _id: id })
        const currentUser = await User.findById({ _id: req.user._id })
        if (id == req.user._id) {
            return res.status(400).json({ error: "You Can't follow and unfollow" })
        }
        if (!userToModify || !currentUser) {
            return res.status(400).json({ error: "User Not Found" })
        }
        const isFollowing = currentUser.following.includes(id);
        if (isFollowing) {
            //unFollow
            await User.findByIdAndUpdate({ _id: id }, { $pull: { followers: req.user._id } });
            await User.findByIdAndUpdate({ _id: req.user._id }, { $pull: { following: id } });
            return res.status(200).json({ message: "Unfollow Succesfully" })
        }
        else {
            //Follow
            await User.findByIdAndUpdate({ _id: id }, { $push: { followers: req.user._id } });
            await User.findByIdAndUpdate({ _id: req.user._id }, { $push: { following: id } })
            const newNotification = new NotificationSend({
                type: "follow",
                from: req.user._id,
                to: id
            })
            await newNotification.save()
            return res.status(200).json({ message: "Follow Succesfully" })
        }
    } catch (error) {
        console.log(`Error in Follow and Unfollow : ${error}`);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

const Suggested = async (req, res) => {
    try {
        const userId = req.user._id
        const userFollowed = await User.findById({ _id: userId }).select('-password')
        const users = await User.aggregate([
            {
                $match: {
                    _id: { $ne: userId }
                }
            },
            {
                $sample:{
                    size:10
                }
            }
        ])
        const fillteredUsers = users.filter((user)=>!userFollowed.following.includes(user._id))
        const suggestedUsers = fillteredUsers.slice(0,4)
        suggestedUsers.forEach((user)=>(user.password=null))
        res.status(200).json(suggestedUsers);
    } catch (error) {
        console.log(`Error in Suggested: ${error}`);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

const updateUser = async (req,res)=>{
    try {
        const getUser = await req.user._id
        let findingUser = await User.findById({_id:getUser});
        const {username,fullname,email,currentPassword,newPassword,bio,link} = req.body
        let {profileImg,coverImg} = req.body
        if(!findingUser){
            return res.status(400).json({error:"User Not found"})
        }
        if((!newPassword && currentPassword) || (!currentPassword && newPassword)){
            return res.status(400).json({error:"Please Provide Both current Password and new Password"})
        }

        if(currentPassword && newPassword){
            const isMatch = await bcrypt.compare(currentPassword,findingUser.password)
            if(!isMatch){
                return res.status(400).json({message:"The Password didn't Match"})   
            }
            if(newPassword.length<6){
                return res.status(400).json({message:"The Password should be 6 digit"})   
            }
            const salt = await bcrypt.genSalt(10)
            findingUser.password = await bcrypt.hash(newPassword,salt)
        }
        if(profileImg){
            if(findingUser.profileImg){
                await cloudinary.uploader.destroy(findingUser.profileImg.split("/").pop().split(".")[0])
            }
            const uploadedResponse = await cloudinary.uploader.upload(profileImg)
            profileImg = uploadedResponse.secure_url;
        }
        if(coverImg){
            if(findingUser.coverImg){
                await cloudinary.uploader.destroy(findingUser.coverImg.split("/").pop().split(".")[0])
            }
            const uploadedResponse = await cloudinary.uploader.upload(coverImg)
            coverImg = uploadedResponse.secure_url;
        }

        findingUser.fullname = fullname || findingUser.fullname
        findingUser.email = email || findingUser.email
        findingUser.username = username || findingUser.username
        findingUser.bio = bio || findingUser.bio
        findingUser.link = link || findingUser.link
        findingUser.profileImg = profileImg || findingUser.profileImg
        findingUser.coverImg = coverImg || findingUser.coverImg
        findingUser = await findingUser.save()
        findingUser.password = null
        return res.status(200).json(findingUser)

    } catch (error) {
        console.log(`Error in Updateuser: ${error}`);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export { getProfile, followUnFollowUser, Suggested,updateUser }
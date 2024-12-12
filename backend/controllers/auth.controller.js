import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const signUp = async (req, res) => {
    try {
        const { username, fullname, email, password } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email Format" })
        }
        const existingEmail = await User.findOne({ email: email })
        const existingUsername = await User.findOne({ username: username })
        if (existingEmail || existingUsername) {
            return res.status(400).json({ message: 'Already Exisiting User or Email' })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password Must be Greater than 6' })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
            fullname: fullname
        })

        if (!newUser) {
            return res.status(400).json({ error: "User Did not Created Error Occured" })
        }
        generateToken(newUser._id, res)
        await newUser.save()
        res.status(200).json({ message: {
            _id:newUser._id,
            username:newUser.username,
            fullname:newUser.fullname,
            email:newUser.email,
            followers : newUser.followers,
            following:newUser.following,
            coverImg : newUser.coverImg,
            bio:newUser.bio,
            link:newUser.link,
            profileImg:newUser.profileImg
        }})
    } catch (error) {
        console.log(`Error in signUp : ${error}`);
        res.status(500).json({ error: "Internal Server Error" })
    }
}
const signIn = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username: username });
        const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid username or password"})
        }
        generateToken(user._id,res);
        res.status(200).json({
            _id:user._id,
            username:user.username,
            fullname:user.fullname,
            email:user.email,
            followers : user.followers,
            following:user.following,
            coverImg : user.coverImg,
            bio:user.bio,
            link:user.link,
            profileImg:user.profileImg
        })    

    } catch (error) {
        console.log(`Error in signIn : ${error}`);
        res.status(500).json({ error: "Internal Server Error" })
    }
}
const logOut = (req, res) => {
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:'Successfully Logout'});
    } catch (error) {
        console.log(`Error in logOut : ${error}`);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

const getMe = async (req,res)=>{
    try {
        const user = await User.findOne({_id:req.user._id}).select("-password")
        res.status(200).json(user)
    } catch (error) {
        console.log(`Error in getMe : ${error}`);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export { signUp, signIn, logOut,getMe }
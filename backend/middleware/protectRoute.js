import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';

const protectRoute = async (req,res,next)=>{
     try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(400).json({error:"Unauthorized:No Token Provided"})
        }
        const decode = jwt.verify(token,process.env.JWT_SECRET_TOKEN) 
        if(!decode){
            return res.status(400).json({error:"Unauthorized Invalid Token"})
        }

        const user = await User.findOne({_id:decode.userId}).select("-password")
        if (!user){
            return res.status(400).json({error:"User Not Found"})
        }
        req.user = user;
        next()
     } catch (error) {
        console.log(`Error From Protect Routes:${error}`);
        res.status(500).json({ error: "Internal Server Error" })
     }
}

export default protectRoute
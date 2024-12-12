import mongoose, { Schema } from 'mongoose'

const postShema = new mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    text:{
        type:String
    },
    img:{
        type:String
    },
    like : [
        {
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    comments : [{
        text:{
            type:String,
            required:true
        },
        user:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
    }]
},{timestamps:true})

const Post = mongoose.model("Post",postShema)
export default Post
import mongoose from "mongoose";

const UserSchemas = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minLength: 6
    },

    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            default: []
        }
    ],

    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            default: []
        }
    ],

    profileImg: {
        type: String,
        default: ""
    },
    coverImg: {
        type: String,
        default: ""
    },

    bio: {
        type: String,
        default: ""
    },

    link:{
        type:String,
        default:""
    }
},{timestamps:true})

const User = mongoose.model("User",UserSchemas);

export default User
import mongoose, { Schema } from "mongoose";

const NotificationSchema = new mongoose.Schema({
    from:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    to:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    type:{
        type:String,
        required:true,
        enum:["follow","like"]
    },
    read:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const NotificationSend = mongoose.model("Notification",NotificationSchema);

export default NotificationSend
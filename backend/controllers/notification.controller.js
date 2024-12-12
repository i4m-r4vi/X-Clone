import NotificationSend from "../models/notification.model.js";

const getNotification = async(req,res)=>{
    try {
        const userId = req.user._id;
        const notification = await NotificationSend.find({to:userId})
                            .populate({
                                path:'from',
                                select:'username profileImg'
                            })
        await NotificationSend.updateMany({to:userId},{read:true})
        res.status(200).json(notification)
    } catch (error) {
        console.log(`Error in getNotification:${error}`);
        res.status(404).json({ error: "Internal Server Error" })
    }
}

const deleteNotification = async(req,res)=>{
    try {
        const userId = req.user._id
        await NotificationSend.deleteMany({to:userId}) 
        res.status(200).json({message:"Notification Succesfully Deleted"})
    } catch (error) {
        console.log(`Error in deleteNotification:${error}`);
        res.status(404).json({ error: "Internal Server Error" })
    }
}

export {getNotification,deleteNotification}
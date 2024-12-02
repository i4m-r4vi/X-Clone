import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MOGNODB_URI)
        console.log('The Mongodb is Connected');
    } catch (e) {
        console.log(`Error in connecting DB:${e}`);
        process.exit(1)
    }
}

export default connectDB
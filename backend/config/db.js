import mongoose from "mongoose";

export const connectDB = async (req,res) => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("Error Connecting to MONGODB", error);
        process.exit(1);
    }
}
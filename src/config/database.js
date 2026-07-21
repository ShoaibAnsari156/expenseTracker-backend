// import mongoose from "mongoose";
// const connectDB = async () => {
//     try {
//         const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
//         console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
//     }
//     catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//         process.exit(1);
//     }
// }
// export default connectDB;

import mongoose from 'mongoose';

// Cache the connection across serverless invocations
let isConnected = false;

const connectDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI);
        isConnected = db.connections[0].readyState === 1;
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
};

export default connectDB;
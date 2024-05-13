/* global process*/
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`MongoDB connected !! DB HOST:${'mongodb://localhost:27017/shopping'}`);
    } catch (error) {
        console.log('MONGODB connection failed', error);
    }
};

export default connectDB;

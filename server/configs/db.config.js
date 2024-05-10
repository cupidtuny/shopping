const mongoose = require("mongoose");
// const mongoURI = "localhost://27017:resturant";

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://localhost:27017/resturant`);
        console.log(
            `MongoDB connected !! DB HOST:${"mongodb://localhost:27017/shopping"}`,
        );
    } catch (error) {
        console.log('MONGODB connection failed', error);
    }
};

module.exports = connectDB;

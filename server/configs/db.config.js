const mongoose = require("mongoose");
// ${process.env.MONGODB_URI}/${DB_NAME}
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `mongodb://localhost:27017/resturant`,
        );
        console.log(
            `MongoDB connected !! DB HOST:${connectionInstance.connection.host}`,
        );
    } catch (error) {
        console.log('MONGODB connection failed',error);
    }
};

module.exports = connectDB;

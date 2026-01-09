import mongoose from "mongoose";

const connectDB = async () => {
    try {      
        await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log("Successfully connected to mongoDB")
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}
export const hash_id_mongo = (id) => {
    return new mongoose.Types.ObjectId(id)
}
export default connectDB
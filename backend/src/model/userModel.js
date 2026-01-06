import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username : { type: String, required: true },
    password : { type: String, required: true },
})

const UserModel = mongoose.model('user', userSchema)

export default UserModel
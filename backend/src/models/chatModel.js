import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
    message: { type: String },
    createAt: { type: Date, default: Date.now },
    updateAt : { type: Date, default: Date.now },
    imageUrl : {type : String}
})

const ChatModel = mongoose.model('chat', chatSchema)

export default ChatModel
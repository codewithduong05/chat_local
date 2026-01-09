import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
    roomChatID: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    message: { type: String },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
    imageUrl: { type: String }
});

const ChatModel = mongoose.model('Chat', chatSchema);

export default ChatModel;
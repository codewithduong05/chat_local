import ChatModel from "../models/chatModel.js";
import RoomModel from "../models/roomModel.js";
import { hash_id_mongo } from "../config/monggo.js";

const ChatService = {
    async getMessagesByRoomId(roomId) {
        const roomObjectId = hash_id_mongo(roomId);

        const chats = await ChatModel.find({ roomChatID: roomObjectId });

        if (!chats || chats.length === 0) {
            return [];
        }

        return chats.map(item => ({
            message: item.message,
            createdAt: item.createAt
        }));
    },

    async createMessage(roomId, message) {
        const roomObjectId = hash_id_mongo(roomId);

        const room = await RoomModel.findById(roomObjectId);
        if (!room) {
            throw new Error("ROOM_NOT_FOUND");
        }

        const newChat = new ChatModel({
            roomChatID: roomObjectId,
            message
        });

        return await newChat.save();
    }
};

export default ChatService;

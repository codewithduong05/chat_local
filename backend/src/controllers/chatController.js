import message from "../config/messageApi.js";
import ChatService from "../services/chatServices.js";

const ChatController = {
    async getAllChatRoomId(req, res) {
        try {
            const { id } = req.params;

            const messages = await ChatService.getMessagesByRoomId(id);

            res.status(200).json({
                data: {
                    id_room_chat: id,
                    message: messages
                },
                message: message.success.user.message_chat
            });
        } catch (err) {
            res.status(500).json({
                error: err.message || message.error.server[500]
            });
        }
    },

    async createChat(req, res) {
        try {
            const { id } = req.params;
            const { message: content } = req.body;

            if (!content) {
                return res.status(403).json({
                    message: message.error.input[1]
                });
            }

            const newChat = await ChatService.createMessage(id, content);

            res.status(201).json({
                status: true,
                data: newChat,
                message: message.success.user.chat
            });
        } catch (err) {
            if (err.message === "ROOM_NOT_FOUND") {
                return res.status(404).json({
                    message: message.error.user.room
                });
            }

            res.status(500).json({
                error: err.message || message.error.server[500]
            });
        }
    }
};

export default ChatController;

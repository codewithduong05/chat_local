import ChatModel from "../models/chatModel.js";
import RoomModel from "../models/roomModel.js";
import { hash_id_mongo } from "../config/monggo.js";

const RoomService = {
  async createRoom(name,description) {
       const newRoom = new RoomModel({ name,description});

       return await newRoom.save()
    },



  async getAllRoom() {
    return []
  }
};

export default RoomService;

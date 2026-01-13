import express from "express";
import UserController from "../controllers/userController.js";
import loginMiddlewares from "../middlewares/loginMiddlewares.js";
import ChatController from "../controllers/chatController.js";
import RoomController from "../controllers/roomController.js";
import authMiddlewares from "../middlewares/authMiddlewares.js";

const usersRouter = express.Router();
// endpoints : http://{host}/api/v1/user/heath 


// method : Get
usersRouter.get("/heath", (req,res) => {res.status(200).json("hello")});

//endpoints : http://{host}/api/v1/user/login 
// method : POST
usersRouter.post("/login", loginMiddlewares,UserController.login) 


//endpoints : http://{host}/api/v1/user/room
// method : GET ( Get all room chat)
usersRouter.get("/room", authMiddlewares,RoomController.getAllRoom) 


//endpoints : http://{host}/api/v1/user/room
// method : POST ( Create room chat)
usersRouter.post("/room", authMiddlewares,RoomController.createRoom) 

//endpoints : http://{host}/api/v1/user/chat 
// method : GET ( Get all object chat id)
usersRouter.get("/chat/:id", authMiddlewares,ChatController.getAllChatRoomId) 


//endpoints : http://{host}/api/v1/user/chat/:id
// method : Post ( create chat room id)
usersRouter.post("/chat/:id", authMiddlewares,ChatController.createChat) 


export default usersRouter
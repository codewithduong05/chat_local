import express from "express";
import UserController from "../controllers/userController.js";
import loginMiddlewares from "../middlewares/loginMiddlewares.js";


const authRouter = express.Router();

//endpoints : http://{host}/api/v1/user/login 
// method : POST
authRouter.post("/login", loginMiddlewares,UserController.login) 






export default authRouter
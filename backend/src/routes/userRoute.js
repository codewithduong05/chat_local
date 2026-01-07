import express from "express";
import UserController from "../controllers/userController.js";
import loginMiddlewares from "../middlewares/loginMiddlewares.js";

const usersRouter = express.Router();
// endpoints : http://{host}/api/v1/user/heath 
// method : Get
usersRouter.get("/heath", (req,res) => {res.status(200).json("hello")});

//endpoints : http://{host}/api/v1/user/login 
// method : POST
usersRouter.post("/login", loginMiddlewares,UserController.login) 


export default usersRouter
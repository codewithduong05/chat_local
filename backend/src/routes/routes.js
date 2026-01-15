import express from "express";
import usersRouter from "./userRoute.js";
import authRouter from "./authRoute.js";

const RootRouter = express.Router();


// endpoints : http://{host}/api/v1/user
RootRouter.use('/api/v1/user',usersRouter)
RootRouter.use('/api/v1/auth', authRouter)
export default RootRouter
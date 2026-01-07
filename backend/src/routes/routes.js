import express from "express";
import usersRouter from "./userRoute.js";

const RootRouter = express.Router();


// endpoints : http://{host}/api/v1/user
RootRouter.use('/api/v1/user',usersRouter)

export default RootRouter
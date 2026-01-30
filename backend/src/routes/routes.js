import express from "express";
import usersRouter from "./userRoute.js";
import authRouter from "./authRoute.js";
import parkingRouter from "./parkingRoute.js";

const RootRouter = express.Router();


// endpoints : http://{host}/api/v1/user
RootRouter.use('/api/v1/user',usersRouter)
RootRouter.use('/api/v1/auth', authRouter)
RootRouter.use('/api/v1/parking', parkingRouter)
export default RootRouter
import express from "express";

import { restParking } from "../controllers/bookingController.js";


const parkingRouter = express.Router();

//endpoints : http://{host}/api/v1/parking/getTime
// method : GET
parkingRouter.get("/getTime", restParking ) 

export default parkingRouter
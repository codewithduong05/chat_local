import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./config/monggo.js";
connectDB()



const app = express();


app.listen(3000, () => {
    console.log("Server running ...");
 
})

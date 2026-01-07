import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./config/monggo.js";
import RootRouter from "./routes/routes.js";




const app = express();
app.use(express.json())

app.use(RootRouter)

app.listen(3000, () => {
    console.log("Server running ...");
    connectDB()
})

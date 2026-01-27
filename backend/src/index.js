import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./config/monggo.js";
import RootRouter from "./routes/routes.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";
import apiLogger from "./middlewares/loggerMiddleware.js";
// socket
import http from "http";
import { Server } from "socket.io"
import { handleBooking } from "./services/parkinglotServices.js";
import socketHandler from "./socket/socketHandler.js";


const app = express();

app.use(cors({
  origin: process.env.URL_FE, // frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json())

// print logger status cmd 
app.use(apiLogger);

//  test enpoint
app.get("/", (req, res) => {
  res.status(200).json({ message: "hello" });
});
// endpoints : http://{url}/api/v1
app.use(RootRouter)

app.use(notFoundHandler);
app.use(errorHandler);

// const logUrl = process.env.LOG_URL_BACKEND || "http://localhost:";
// app.listen(process.env.PORT_BACKEND, () => {
//     console.log("Server is running " );
//     console.log("url:" +logUrl + process.env.PORT_BACKEND);
//     console.log("---");
    
//     connectDB()
// })

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

socketHandler(io);

server.listen(process.env.PORT_BACKEND, () => {
  console.log("Server running on port 3000");
});
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

const DAY = 24 * 60 * 60 * 1000;


/**
 * In-memory store (KHÔNG model)
 * slotId: { slotId, expiresAt }
 */
let parkingSlots = {};


io.on("connection", (socket) => {

  console.log(DAY);
  
  console.log("Socket connected:", socket.id );

  
  // gửi trạng thái ban đầu
  socket.on("slots:init",  (ok) => {
      console.log("tets");
    console.log(ok);
    
  });

  // // thuê slot theo số ngày
  // socket.on("slot:rent", ({ slotId, days }) => {
  //   parkingSlots[slotId] = {
  //     slotId,
  //     expiresAt: Date.now() + days * DAY,
  //   };

  //   io.emit("slot:update", parkingSlots[slotId]);
  // });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

// setInterval(() => {
//   const now = Date.now();

//   Object.keys(parkingSlots).forEach((slotId) => {
//     if (parkingSlots[slotId].expiresAt <= now) {
//       delete parkingSlots[slotId];
//       io.emit("slot:reset", Number(slotId));
//     }
//   });
// }, 60 * 1000); // mỗi phút

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
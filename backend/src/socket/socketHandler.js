import TIMER_CONFIG from "../config/timer.config.js";
import { createParking } from "../controllers/bookingController.js";
import { clearDataParking } from "../services/parkinglotServices.js";
import { formatTime } from "../utils/date.util.js";

let cachems;
const timers = new Map();

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('send-parking', async (data) => {

      const { id, expiresAt, status } = data;
      await createParking(data);   
      if (timers.has(id)) return;



      const DURATION = TIMER_CONFIG.DURATION_MS(expiresAt)
      const hash_expiresAt = Date.now() + DURATION;
      // console.log(hash_expiresAt);
      // console.log(formatTime(hash_expiresAt));

      // let remainingSeconds = Math.floor(DURATION / 1000);
      // let remainingSeconds = 20

      const timer = setInterval(() => {
        const now = Date.now();
        const remainingSeconds = Math.max(
          Math.floor((new Date(hash_expiresAt).getTime() - now) / 1000),
          0
        );

        cachems = remainingSeconds
        // 3) output trả về FE
        io.emit("parking-timer", {
          id: id,
          seconds: remainingSeconds,
          timeFormat: formatTime(remainingSeconds),
        });
        // console.log(remainingSeconds);

        if (remainingSeconds <= 0) {
          clearInterval(timer);
          clearDataParking()
          timers.delete(id);
          io.emit("parking-expired", {
            id,
            message: "Thoi gian het han vui chon ghe moi",
            seconds: 0,
          });
        }
      }, 1000);
      timers.set(id, timer);
    });
    io.emit("time_cache", cachems)
    // io.emit('parking-update', result); 
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });


};

export default socketHandler;
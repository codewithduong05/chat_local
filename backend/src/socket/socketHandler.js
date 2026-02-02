import TIMER_CONFIG from "../config/timer.config.js";
import { createParking } from "../controllers/bookingController.js";
import { clearDataParking } from "../services/parkinglotServices.js";
import { formatTime } from "../utils/date.util.js";

let cachems ;
const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('send-parking', async (data) => {


      await createParking(data);   
      // const expiresAt = Date.now() + TIMER_CONFIG.DURATION_MS(data.expiresAt);
      // const seconds = getRemainingSeconds(expiresAt);
      // console.log(expiresAt);
      // console.log(seconds);


      // const DURATION = TIMER_CONFIG.DURATION_MS(data.expiresAt)
      // let remainingSeconds = Math.floor(DURATION / 1000);
        let remainingSeconds = 20

        const timer = setInterval(() => {
        remainingSeconds--;
        cachems = remainingSeconds
        // 3) output trả về FE
        io.emit("parking-timer", {
          id: data.id,
          seconds: remainingSeconds,
          timeFormat: formatTime(remainingSeconds),
        });
        console.log(remainingSeconds);
        
        if (remainingSeconds <= 0) {
          clearInterval(timer);
          clearDataParking()
          io.emit("parking-expired", { 
            message : "Thoi gian het han vui chon ghe moi",
           seconds: 0,
           });
        }
      }, 1000);

    });
    io.emit("time_cache", cachems)
    // io.emit('parking-update', result); 
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });


};

export default socketHandler;

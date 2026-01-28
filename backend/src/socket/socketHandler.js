import { createParking } from "../controllers/bookingController.js";

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    // console.log('Client connected:', socket.id);

    socket.on('send-parking', (data) => {
      const result = createParking(data);   

      
      // io.emit('parking-update', result);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};

export default socketHandler;

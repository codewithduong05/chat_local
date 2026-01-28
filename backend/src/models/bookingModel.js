// models/booking.model.js
import mongoose from 'mongoose';
let bookings = [];

const reset = () => {
  bookings = [];
};

const add = (data) => {
  bookings.push(data);
};

const getAll = () => bookings;




const bookingSchema = new mongoose.Schema({
  seat: Number,
  status: Boolean,
  // expireAt: {
  //   type: Date,
  // }, // thời điểm hết hạn tuyệt đối (server tính)
});
const Booking =  mongoose.model('Booking', bookingSchema); 
export default Booking
export  {
  reset,
  add,
  getAll
};


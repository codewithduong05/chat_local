//backend/src/services/parkinglotServices.js

import  Booking, { add, reset } from "../models/bookingModel.js"
import { addHours, getToday, parseServerTime } from "../utils/date.util.js"

let currentToday = getToday();

export const handleBooking = (seat) => {
// console.log(seat); // { seat: 3, status: true, expiresAt: 12 }

//  const serverNow = parseServerTime(seat.expiresAt);
//   const expireAt = addHours(serverNow, seat.expiresAt);
  const now = new Date();
  const expireAt = new Date(now.getTime() + (12 - now.getHours()) * 60 * 60 * 1000);
  if (now.getHours() >= 12) {
    expireAt.setDate(expireAt.getDate() + 1);

  }
//   console.log(`Expire at: ${expireAt.toLocaleString()}`);/
  setInterval(() => console.log(`Current time: ${new Date().toLocaleString()}`), 1000 * 60 * 60);
  return Booking.create({
    seat : seat.seat,
    status: seat.status,

  });
}
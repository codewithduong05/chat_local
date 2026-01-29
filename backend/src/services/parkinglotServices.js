//backend/src/services/parkinglotServices.js

import Booking, { add, reset } from "../models/bookingModel.js"
import { addHours, getToday, parseServerTime } from "../utils/date.util.js"

let currentToday = getToday();

export const handleBooking = (seat) => {

  const DURATION = seat.expiresAt * 60 * 60 * 1000
  let startTime = Date.now();
  
setInterval(() => {
  const now = Date.now();
  const elapsed = now - startTime;
  const remaining = DURATION - elapsed;

  console.log(remaining);
  
  return remaining
}, 1000);
}

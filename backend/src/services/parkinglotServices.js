//backend/src/services/parkinglotServices.js

import TIMER_CONFIG from "../config/timer.config.js";
import Booking, { add, reset } from "../models/bookingModel.js"
import { addHours, getToday, parseServerTime } from "../utils/date.util.js"

let currentToday = getToday();

export const handleBooking = async (seat) => {
  console.log(seat); // { seat: 1, status: true, expiresAt: 4 }
  
  // const DURATION = seat.expiresAt * 60 * 60 * 1000
  const DURATION = TIMER_CONFIG.DURATION_MS(seat.expiresAt)
  const data = await Booking.create({ seat : seat.seat, status: seat.status, serverTime: DURATION });

  
  if (data) {
    return {
      data ,
      status :true
    }
  }
  return false
  // return DURATION
  
}
export const getTimeParking = async () => {
  const data = await Booking.find()

  
  if (!data) return false
  return data
}
export const clearDataParking = async () => {
  await Booking.deleteMany({})
}
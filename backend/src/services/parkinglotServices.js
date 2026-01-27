//backend/src/services/parkinglotServices.js

import { add, reset } from "../models/bookingModel.js"
import { getToday, parseServerTime } from "../utils/date.util.js"

let currentToday = getToday();

export const handleBooking = (seat) => {
    const today = getToday();

    if (today !== currentToday) {
        reset();
        currentToday = today
    }
    
    const seatData = {
        seat,
        serverNow : parseServerTime(getToday()),
        expiresAt : Date.now() + 0 * 4 * 1000
    }

    add(seatData);
    return seatData
}
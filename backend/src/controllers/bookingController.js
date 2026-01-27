import { handleBooking } from "../services/parkinglotServices.js";

export const createParking = (seat) => {
    return handleBooking(seat);
}

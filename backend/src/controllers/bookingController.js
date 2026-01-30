import message from "../config/messageApi.js";
import { getTimeParking, handleBooking } from "../services/parkinglotServices.js";

let tempdata ;
export const createParking = async (seat) => {
    // return handleBooking(seat);
    const data = await handleBooking(seat)
    if (data.status == true ) {
        tempdata = data;
        return true
    }
    return  false
}
export const restParking = async (req,res) => {
    try {
        if (!tempdata || tempdata == undefined) {
            return res.status(400).json({
                message : message.error.server[404]
            })
        } 
        const data =  await getTimeParking()
        if (data == false) {
            re
        }
        return res.status(200).json("ok")
    } catch (error) {
        res.status(500).json({message : error})
    }
}

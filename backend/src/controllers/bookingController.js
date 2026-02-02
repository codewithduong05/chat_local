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
        const data =  await getTimeParking()     
        if (data == false) {
            return res.status(400).json({
                data : null,
                message : message.error.server[404]
            })
        }
     
        
        return res.status(200).json({
            data : data,
            message : "Get data successfull!"
        })
    } catch (error) {
        res.status(500).json({message : error})
    }
}

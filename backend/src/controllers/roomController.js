import RoomModel from "../models/roomModel.js"
import RoomService from "../services/roomServices.js";
const RoomController = {
    getAllRoom :  (req,res) => {
        RoomModel.find({})
            .then(rooms => res.json(rooms))
            .catch(err => res.status(500).json({ error: err.message }));
    },
    createRoom : async (req,res) => {
        try {
            const { name,description} = req.body;
         
         
            const room = await RoomService.createRoom(name,description)

            res.status(201).json(room);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default RoomController
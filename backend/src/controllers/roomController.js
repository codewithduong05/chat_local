import RoomModel from "../models/roomModel.js"
const RoomController = {
    getAllRoom :  (req,res) => {
        RoomModel.find({})
            .then(rooms => res.json(rooms))
            .catch(err => res.status(500).json({ error: err.message }));
    },
    createRoom : async (req,res) => {
        try {
            const { name,description} = req.body;
         
            const newRoom = new RoomModel({ name,description});
            const savedRoom = await newRoom.save();
            res.status(201).json(savedRoom);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default RoomController
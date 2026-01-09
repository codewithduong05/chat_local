import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
});

const RoomModel = mongoose.model('Room', roomSchema);

export default RoomModel;
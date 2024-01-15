import mongoose from "mongoose";

const RoomDetailSchema = new mongoose.Schema({
    RoomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    },
    UserId: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }],
    },
},
    { timestamps: true }
);

export default mongoose.model("RoomDetails", RoomDetailSchema);

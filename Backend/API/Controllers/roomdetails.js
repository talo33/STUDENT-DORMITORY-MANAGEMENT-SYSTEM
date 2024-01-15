import RoomDetails from "../Models/RoomDetails.js"


//Add sv vào phòng
export const createRoomDetails = async (req,res,next)=>{
    const newDetails = new RoomDetails(req.body)
    try {
        const savedRoomDetails = await newDetails.save()
        res.status(200).json(savedRoomDetails)
    } catch (err) {
        next(err)
    }
};

export const updateRoomDetails = async (req, res, next) => {
    try {
        const updatedRoomDetails = await RoomDetails.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedRoomDetails);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const deleteRoomDetails = async (req, res, next) => {
    try {
        await RoomDetails.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("Delete Success");
    } catch (error) {
        res.status(500).json(error);
    }
}


export const getRoomDetail = async (req, res, next) => {
    try {
        const roomdetail = await RoomDetails.findById(
            req.params.id
        );
        res.status(200).json(roomdetail);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getallRoomDetails = async (req, res, next) => {
    try {
        const roomdetails = await RoomDetails.find();
        res.status(200).json(roomdetails);
    } catch (err) {
        next(err);
    }
}


//CheckOut
// export const checkoutRoom = async (req, res, next) => {
//     try {
//         const roomId = req.params.roomId;

//         // Find the room by ID
//         const room = await Room.findById(roomId);

//         // Check if the room exists
//         if (!room) {
//             return res.status(404).json({ message: 'Room not found' });
//         }

//         // Update room status or perform any necessary checkout logic
//         room.StatusId = 'Available';
//         room.UserId = undefined; // Assuming you store the user who booked the room

//         // Save the updated room
//         const updatedRoom = await room.save();

//         // Respond with the updated room or a success message
//         res.status(200).json(updatedRoom);
//     } catch (error) {
//         // Handle errors
//         next(error);
//     }
// };
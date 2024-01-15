import Room from '../Models/Room.js';
import Dormitory from '../Models/Dormitory.js';
import checkOutRequest from '../Models/requests/checkOutRequest.js';
import changeRoomRequest from '../Models/requests/changeRoomRequest.js';
import User from '../Models/User.js';
import extendRequest from '../Models/requests/extendRequest.js';
import fixRequest from '../Models/requests/fixRequest.js';

export const createRoom = async (req, res, next) => {
  const dormitoryId = req.query.dormitoryId;

  if (!dormitoryId) {
    return res.status(404).json('Không tìm thấy tầng này');
  }
  const newRoom = new Room({
    ...req.body,
    dormId: dormitoryId,
    availableSlot: req.body.Slot
  });

  try {
    const savedRoom = await newRoom.save();
    try {
      await Dormitory.findByIdAndUpdate(dormitoryId, {
        $push: { Room: savedRoom._id }
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

//Update
export const updateRoom = async (req, res, next) => {
  const { roomMembers, Slot } = req.body;

  try {
    const roomId = req.params.id;
    const currentRoom = await Room.findById(roomId);

    if (!currentRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }

    let availableSlot, status;

    if (Slot) {
      availableSlot = Slot - (roomMembers ? roomMembers.length : 0);
    } else {
      availableSlot = currentRoom.Slot - (roomMembers ? roomMembers.length : 0);
    }

    if (availableSlot < 0) {
      return res.status(300).json('Phòng đã đầy');
    }

    if (availableSlot === 0) {
      status = 1;
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      { $set: { ...req.body, availableSlot, status } },
      { new: true }
    );

    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json(error);
  }
};

//update ngày cho cái phòng ý là ngày book hoặc ngày hết hạn tùy
export const updateRoomavAilability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { 'RoomNumbers._id': req.params.id },
      {
        $push: {
          'RoomNumbers.$.unavailableDates': req.body.dates
        }
      }
    );
    res.status(200).json('Update success!');
  } catch (error) {
    res.status(500).json(error);
  }
};

//Delete
export const deleteRoom = async (req, res, next) => {
  const dormitoryId = req.params.dormitoryId;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Dormitory.findByIdAndUpdate(dormitoryId, {
        $pull: { Room: req.params.id }
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json('Delete Success');
  } catch (error) {
    res.status(500).json(error);
  }
};

//Get
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Getall
export const getallRoom = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

export const getAllCheckoutRequest = async (req, res, next) => {
  try {
    const requests = await checkOutRequest.find();
    res.status(200).json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve change room requests.' });
  }
};

export const getCheckoutRequest = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const requests = await checkOutRequest.find({ userId });
    res.status(200).json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve change room requests.' });
  }
};

export const requestCheckout = async (req, res, next) => {
  try {
    const { CMND, userId, userDetail, room, requestStatus } = req.body;

    const request = new checkOutRequest({
      CMND,
      userId,
      userDetail,
      room,
      requestStatus
    });

    await request.save();

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ error: 'Failed to process the check-out request.' });
  }
};

export const updateCheckoutRequest = async (req, res, next) => {
  try {
    const requestId = req.params.id;
    const { requestStatus, userId, rejectReason, updatedBy } = req.body;

    // Kiểm tra nếu requestStatus là 1 (duyệt)
    if (requestStatus === 2) {
      const request = await checkOutRequest.findById(requestId);
      if (!request) {
        return res.status(404).json({ error: 'Không tìm thấy yêu cầu trả phòng chờ duyệt cho người dùng này.' });
      }

      request.requestStatus = requestStatus;
      request.rejectReason = rejectReason;
      request.updatedBy = updatedBy;

      await request.save();

      return res.status(200).json({ message: 'Yêu cầu trả phòng đã được từ chối.' });
    }
    if (requestStatus === 1) {
      const request = await checkOutRequest.findById(requestId);

      if (!request) {
        return res.status(404).json({ error: 'Không tìm thấy yêu cầu trả phòng chờ duyệt cho người dùng này.' });
      }

      const room = await Room.findById(request.room.roomId);
      const user = await User.findById(userId);

      if (room) {
        room.roomMembers = room.roomMembers.filter((member) => member.userId.toString() !== userId);
        room.availableSlot = room.Slot - room.roomMembers.length;

        await room.save();

        user.room.status = 1;
        await user.save();

        request.requestStatus = 1;
        await request.save();

        return res.status(200).json(room);
      } else {
        return res.status(404).json({ error: 'Không tìm thấy thông tin phòng cho người dùng này.' });
      }
    } else {
      return res.status(400).json({ error: 'Yêu cầu không hợp lệ.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process the check-out update.' });
  }
};

// Change room

export const getAllChangeRoomRequest = async (req, res, next) => {
  try {
    const requests = await changeRoomRequest.find();
    res.status(200).json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve change room requests.' });
  }
};

export const getChangeRoomRequest = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const requests = await changeRoomRequest.find({ userId });
    res.status(200).json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve change room requests.' });
  }
};

export const requestChangeRoom = async (req, res, next) => {
  try {
    const { CMND, userId, userDetail, originRoom, toRoom, requestStatus } = req.body;

    const request = new changeRoomRequest({
      CMND,
      userId,
      userDetail,
      originRoom,
      toRoom,
      requestStatus
    });

    await request.save();

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ error: 'Failed to process the check-out request.' });
  }
};

export const updateChangeRoomRequest = async (req, res, next) => {
  try {
    const requestId = req.params.id;
    const { requestStatus, userId, rejectReason, updatedBy } = req.body;

    // Kiểm tra nếu requestStatus là 1 (duyệt)
    if (requestStatus === 2) {
      const request = await changeRoomRequest.findById(requestId);

      if (!request) {
        return res.status(404).json({ error: 'Không tìm thấy yêu cầu trả phòng chờ duyệt cho người dùng này.' });
      }

      request.requestStatus = requestStatus;
      request.rejectReason = rejectReason;
      request.updatedBy = updatedBy;

      await request.save();

      return res.status(200).json({ message: 'Yêu cầu trả phòng đã được từ chối.' });
    }

    if (requestStatus === 1) {
      const request = await changeRoomRequest.findById(requestId);
      const user = await User.findById(userId);

      if (!request || !user) {
        return res.status(404).json({ error: 'Không tìm thấy thông tin.' });
      }

      const originRoom = await Room.findById(request.originRoom?.roomId);
      const toRoom = await Room.findById(request.toRoom.roomId);

      if (!originRoom || !toRoom) {
        return res.status(404).json({ error: 'Không tìm thấy phòng.' });
      }

      if (toRoom.availableSlot < 0) {
        return res.status(300).json('Phòng đã đầy');
      }

      if (originRoom && toRoom) {
        originRoom.roomMembers = originRoom.roomMembers.filter((member) => member.userId.toString() !== userId);
        originRoom.availableSlot = originRoom.Slot - originRoom.roomMembers.length;

        const { _id, CMND, HoTen, Mssv, Truong, Phone, Email, room } = user;

        toRoom.roomMembers = {
          userId: _id,
          CMND,
          HoTen,
          Mssv,
          Truong,
          Phone,
          Email,
          dateIn: Date.now(),
          dateOut: room.dateOut
        };
        toRoom.availableSlot = toRoom.Slot - toRoom.roomMembers.length;

        user.room = {
          ...user.room,
          roomId: toRoom._id,
          roomTitle: toRoom.Title,
          dateIn: Date.now(),
          dateOut: request.toRoom.dateOut
        };

        await originRoom.save();
        await toRoom.save();
        await user.save();

        request.requestStatus = 1;
        await request.save();

        return res.status(200).json(toRoom);
      } else {
        return res.status(404).json({ error: 'Không tìm thấy thông tin phòng cho người dùng này.' });
      }
    } else {
      return res.status(400).json({ error: 'Yêu cầu không hợp lệ.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process the check-out update.' });
  }
};

// Extend
export const getAllExtendRoomRequest = async (req, res, next) => {
  try {
    const requests = await extendRequest.find();
    res.status(200).json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve change room requests.' });
  }
};

export const getExtendRoomRequest = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const requests = await extendRequest.find({ userId });
    res.status(200).json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve change room requests.' });
  }
};

export const requestExtend = async (req, res, next) => {
  try {
    const { userId, userDetail, roomId, roomTitle, dateOut, newDateOut } = req.body;

    const request = new extendRequest({
      userId,
      userDetail,
      roomId,
      roomTitle,
      dateOut,
      newDateOut
    });

    await request.save();

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ error: 'Failed to process the extend request.' });
  }
};

export const updateExtendRequest = async (req, res, next) => {
  try {
    const requestId = req.params.id;
    const { requestStatus, userId, rejectReason } = req.body;

    // Kiểm tra nếu requestStatus là 1 (duyệt)
    if (requestStatus === 2) {
      const request = await extendRequest.findById(requestId);
      if (!request) {
        return res.status(404).json({ error: 'Không tìm thấy yêu cầu trả phòng chờ duyệt cho người dùng này.' });
      }

      request.requestStatus = 2;
      request.rejectReason = rejectReason;
      await request.save();

      return res.status(200).json({ message: 'Yêu cầu trả phòng đã được từ chối.' });
    }

    if (requestStatus === 1) {
      const request = await extendRequest.findById(requestId);

      if (!request) {
        return res.status(404).json({ error: 'Không tìm thấy yêu cầu trả phòng chờ duyệt cho người dùng này.' });
      }

      const room = await Room.findById(request.roomId);
      const user = await User.findById(userId);

      if (room && user) {
        const roomMemberUpdate = room.roomMembers.find((member) => member.userId.toString() === userId);

        if (roomMemberUpdate) {
          roomMemberUpdate.dateOut = request.newDateOut;
          user.room.dateOut = request.newDateOut;
          request.requestStatus = 1;

          await room.save();
          await user.save();
          await request.save();
          return res.status(200).json({ message: 'DateOut updated successfully.' });
        }
      } else {
        return res.status(404).json({ error: 'Không tìm thấy thông tin phòng cho người dùng này.' });
      }
    } else {
      return res.status(400).json({ error: 'Yêu cầu không hợp lệ.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process the check-out update.' });
  }
};

// fix
export const getAllFixRoomRequest = async (req, res, next) => {
  try {
    const requests = await fixRequest.find();
    res.status(200).json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve change room requests.' });
  }
};

export const getFixRoomRequest = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const requests = await fixRequest.find({ userId });
    res.status(200).json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve change room requests.' });
  }
};

export const requestFixRoom = async (req, res, next) => {
  try {
    const { userId, userDetail, room, note, newDateOut } = req.body;

    const request = new fixRequest({
      userId,
      userDetail,
      room,
      note,
      newDateOut
    });

    await request.save();

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ error: 'Failed to process the extend request.' });
  }
};

export const updateFixRequest = async (req, res, next) => {
  try {
    const requestId = req.params.id;
    const { requestStatus } = req.body;

    const request = await fixRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ error: 'Không tìm thấy yêu cầu trả phòng chờ duyệt cho người dùng này.' });
    }

    if (requestStatus === 2) {
      const request = await extendRequest.findById(requestId);
      if (!request) {
        return res.status(404).json({ error: 'Không tìm thấy yêu cầu trả phòng chờ duyệt cho người dùng này.' });
      }

      request.requestStatus = 2;
      request.rejectReason = rejectReason;
      await request.save();

      return res.status(200).json({ message: 'Yêu cầu trả phòng đã được từ chối.' });
    }

    request.requestStatus = requestStatus;
    await request.save();

    return res.status(200).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process the check-out update.' });
  }
};

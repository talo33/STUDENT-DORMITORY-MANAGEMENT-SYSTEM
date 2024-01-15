import HD from '../Models/HoaDon.js';
import HDCT from '../Models/HoaDonDetails.js';
import User from '../Models/User.js';
import Room from '../Models/Room.js';
import HoaDonDetails from '../Models/HoaDonDetails.js';

//Create
export const createHD = async (req, res, next) => {
  const { roomId, price, status, CMND, userId, Mssv, dateIn, dateOut, title, createdBy, updatedBy } = req.body;

  try {
    const user = await User.findById(userId);
    const room = await Room.findById(roomId);

    if (!user || !room) {
      return res.status(400).json({ error: 'User or Room not found.' });
    }

    const savedHD = new HD({
      title,
      roomId,
      price,
      status,
      createdBy,
      updatedBy,
      billDetails: {
        HoTen: user?.HoTen,
        CMND,
        userId: user._id,
        Mssv,
        roomName: room.Title,
        dateIn,
        dateOut
      }
    });

    await savedHD.save();
    res.status(200).json(savedHD);
  } catch (err) {
    next(err);
  }
};

//Update
export const updateHD = async (req, res, next) => {
  try {
    const updatedHD = await HD.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updatedHD);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateHDCT = async (req, res, next) => {
  try {
    const updatedHDCT = await HDCT.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updatedHDCT);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Get
export const getStudentBill = async (req, res, next) => {
  try {
    const hdct = await HD.find({
      'billDetails.CMND': req.params.cmnd
    });
    res.status(200).json(hdct);
  } catch (error) {
    res.status(500).json(error);
  }
};
//Getall
export const getallHD = async (req, res, next) => {
  try {
    const hd = await HD.find();
    res.status(200).json(hd);
  } catch (err) {
    next(err);
  }
};

//GetHDCCT từ HD
export const getBillDetail = async (req, res, next) => {
  try {
    const hoadon = await HD.findById(req.params.id);
    if (!hoadon) {
      res.status(404).json('Not found');
    }
    res.status(200).json(hoadon);
  } catch (err) {
    next(err);
  }
};

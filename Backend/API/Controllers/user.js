import Room from '../Models/Room.js';
import User from '../Models/User.js';

//Create
export const createUser = async (req, res, next) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    next(err);
  }
};
//Update
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Delete
export const deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    const roomsToUpdate = await Room.find({ 'roomMembers.userId': userId });

    await User.findByIdAndDelete(userId);

    await Promise.all(
      roomsToUpdate.map(async (room) => {
        room.roomMembers = room.roomMembers.filter((member) => member.userId.toString() !== userId);
        room.availableSlot = room.Slot - room.roomMembers.length;

        await room.save();
      })
    );

    res.status(200).json('Delete Success');
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
//Get
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ Matk: req.params.id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};
//Getall
export const getallUser = async (req, res, next) => {
  try {
    const users = await User.find({ isAdmin: { $ne: true } });

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

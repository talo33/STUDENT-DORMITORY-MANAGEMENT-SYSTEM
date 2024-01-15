import mongoose from 'mongoose';

const HoaDonDetailSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HoaDon'
    },
    CMND: {
      type: Number,
      ref: 'User',
      required: true
    },
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    MSSV: {
      type: String,
      required: true
    },
    RoomName: {
      type: String,
      required: true
    },
    dateIn: {
      type: Date,
      required: true
    },
    dateOut: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('HoaDonDetails', HoaDonDetailSchema);

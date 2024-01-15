import mongoose from 'mongoose';

const HoaDonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    status: {
      type: Number,
      required: true
    },
    billDetails: {
      HoTen: {
        type: String,
        required: true
      },
      CMND: {
        type: String,
        ref: 'User',
        required: true
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      Mssv: {
        type: String,
        required: true
      },
      roomName: {
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
    createdBy: {
      type: String
    },
    updatedBy: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model('HoaDon', HoaDonSchema);

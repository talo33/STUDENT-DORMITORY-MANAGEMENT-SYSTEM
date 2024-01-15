import mongoose from 'mongoose';

const Userchema = new mongoose.Schema(
  {
    HoTen: {
      type: String,
      required: true
    },
    Mssv: {
      type: String,
      required: true
    },
    CMND: {
      type: String,
      ref: 'Account',
      default: null
    },
    Matk: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: true
    },
    GioiTinh: {
      type: String,
      required: true
    },
    Truong: {
      type: String,
      required: true
    },
    NganHang: {
      type: String,
      required: true
    },
    room: {
      roomId: {
        type: mongoose.Schema.Types.ObjectId
      },
      roomTitle: {
        type: String
      },
      dateIn: {
        type: Date
      },
      dateOut: {
        type: Date
      },
      status: {
        type: Number,
        enum: [0, 1]
      }
    },
    Phone: {
      type: String,
      required: true
    },
    Email: {
      type: String,
      required: true,
      unique: true
    },
    Photos: {
      type: [String]
    },
    Address: {
      type: String,
      required: true
    },
    DateOfBirth: {
      type: Date,
      required: true
    },
    NienKhoa: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('User', Userchema);

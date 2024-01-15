import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema(
  {
    dormId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true
    },
    Title: {
      type: String,
      required: true
    },
    status: {
      type: Number,
      enum: [0, 1],
      required: true
    },
    Price: {
      type: Number,
      required: true
    },
    Slot: {
      type: Number,
      required: true
    },
    availableSlot: {
      type: Number
    },
    roomMembers: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        HoTen: {
          type: String
        },
        Mssv: {
          type: String
        },
        CMND: {
          type: String
        },
        Truong: {
          type: String
        },
        Phone: {
          type: String
        },
        Email: {
          type: String
        },
        dateIn: {
          type: Date,
          required: true
        },
        dateOut: {
          type: Date,
          required: true
        }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model('Room', RoomSchema);

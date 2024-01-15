import mongoose from 'mongoose';

const ChangeRoomRequest = new mongoose.Schema({
  title: {
    type: String,
    default: 'Yêu cầu chuyển phòng'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userDetail: {
    CMND: {
      type: Number,
      required: true
    },
    HoTen: {
      type: String,
      required: true
    }
  },

  originRoom: {
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

  toRoom: {
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

  requestStatus: {
    type: Number,
    required: true,
    default: 0
    // 0 là chờ duyệt, 1 là duyêt, 2 là từ chối
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  rejectReason: {
    type: String
  },
  updatedBy: {
    type: String
  }
});

export default mongoose.model('ChangeRoomRequest', ChangeRoomRequest);

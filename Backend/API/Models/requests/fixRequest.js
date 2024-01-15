import mongoose from 'mongoose';

const FixRequest = new mongoose.Schema(
  {
    title: {
      type: String,
      default: 'Yêu cầu sửa phòng'
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
    note: {
      type: String,
      required: true
    },
    requestStatus: {
      type: Number,
      required: true,
      default: 0
      // 0 là chờ duyệt, 1 là duyêt, 2 là từ chối
    },
    rejectReason: {
      type: String
    },
    updatedBy: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('FixRequest', FixRequest);

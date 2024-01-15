import mongoose from 'mongoose';

const CheckOutRequestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: 'Trả phòng'
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

export default mongoose.model('CheckOutRequest', CheckOutRequestSchema);

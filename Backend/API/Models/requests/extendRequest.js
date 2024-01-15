import mongoose from 'mongoose';

const ExtendRequest = new mongoose.Schema(
  {
    title: {
      type: String,
      default: 'Yêu cầu gia hạn'
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

    roomId: {
      type: String,
      required: true
    },

    roomTitle: {
      type: String,
      required: true
    },

    dateOut: {
      type: Date,
      required: true
    },

    newDateOut: {
      type: Date,
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

export default mongoose.model('ExtendRequest', ExtendRequest);

import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    HoTen: {
        type: String,
        required: true,
        unique: true,
    },
    CMND: {
        type: String,
        ref: 'Account',
        default: null,
    },
    GioiTinh: {
        type: String,
        required: true,
    },
    Truong: {
        type: String,
        required: true,
    },
    NganHang: {
        type: String,
        required: true,
    },
    Room: {
        type: [String],
    },
    Phone: {
        type: Number,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Photos: {
        type: [String],
    },
    Address: {
        type: String,
        required: true,
    },
    DateOfBirth: {
        type: Date,
        required: true
    },
},
    { timestamps: true }
);

export default mongoose.model("Admin", AdminSchema);
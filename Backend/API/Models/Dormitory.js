import mongoose from "mongoose";

const KTXSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Desc: {
        type: String,
        required: true,
    },
    Room: {
        type: [String],
    },
});

export default mongoose.model("Dormitory", KTXSchema);
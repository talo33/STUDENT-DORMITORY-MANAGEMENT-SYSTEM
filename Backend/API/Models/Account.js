import mongoose from "mongoose";
const { Schema } = mongoose;

const AccountSchema = new Schema(
	{
		CMND: {
			type: String,
			required: true,
			unique: true,
		},
		MatKhau: {
			type: String,
			required: true,
			default: "Password@123",
		},
		RoleId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Roles",
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Account", AccountSchema);

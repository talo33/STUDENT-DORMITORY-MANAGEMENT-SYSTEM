import mongoose from "mongoose";
const { Schema } = mongoose;

const RoleSchema = new Schema(
	{
		role: {
			type: String,
			enum: ["admin", "student"],
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Roles", RoleSchema);

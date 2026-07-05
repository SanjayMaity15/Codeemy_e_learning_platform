const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
	{
		course: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Course",
			required: true,
		},

		student: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},

		instructor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},

		averageScore: {
			type: Number,
			required: true,
		},

		certificateId: {
			type: String,
			required: true,
			unique: true,
		},

		issuedAt: {
			type: Date,
			default: Date.now,
		},
		pdfUrl: {
			type: String,
			default: "",
		},

	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model("Certificate", certificateSchema);

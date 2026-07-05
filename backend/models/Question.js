const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
	{
		question: {
			type: String,
			required: true,
			trim: true,
		},

		options: [
			{
				type: String,
				required: true,
			},
		],

		correctAnswer: {
			type: Number,
			required: true,
		},

		marks: {
			type: Number,
			default: 1,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model("Question", questionSchema);

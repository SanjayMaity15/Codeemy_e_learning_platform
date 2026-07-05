const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},

		section: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Section",
			required: true,
			unique: true,
		},

		questions: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Question",
			},
		],

		passingMarks: {
			type: Number,
			default: 50,
		},

		duration: {
			type: Number,
			default: 10,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model("Quiz", quizSchema);

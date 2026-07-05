const { default: mongoose } = require("mongoose");

const quizResultSchema = new mongoose.Schema(
	{
		quiz: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Quiz",
			required: true,
		},

		course: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Course",
			required: true,
		},

		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},

		score: Number,

		totalMarks: Number,

		isPassed: Boolean,

		answers: [
			{
				question: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Question",
				},
				selectedAnswer: Number,
				isCorrect: Boolean,
			},
		],
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model("QuizResult", quizResultSchema);

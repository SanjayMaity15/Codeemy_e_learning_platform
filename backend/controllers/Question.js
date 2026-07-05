const Question = require("../models/Question");
const Quiz = require("../models/Quiz");

exports.addQuestion = async (req, res) => {
    try {
		const { quizId, question, options, correctAnswer, marks } = req.body;
		if (!quizId || !question || !options || correctAnswer === undefined) {
			return res.status(400).json({
				success: false,
				message: "All fields are required",
			});
		}

		const quiz = await Quiz.findById(quizId);

		if (!quiz) {
			return res.status(404).json({
				success: false,
				message: "Quiz not found",
			});
		}

		const newQuestion = await Question.create({
			question,
			options,
			correctAnswer,
			marks,
		});

		quiz.questions.push(newQuestion._id);

		await quiz.save();

		const updatedQuiz = await Quiz.findById(quizId).populate("questions");

		return res.status(200).json({
			success: true,
			message: "Question Added Successfully",
			data: updatedQuiz,
		});
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};


exports.updateQuestion = async (req, res) => {
	try {
		const { questionId, question, options, correctAnswer, marks } =
			req.body;

		const updatedQuestion = await Question.findByIdAndUpdate(
			questionId,
			{
				question,
				options,
				correctAnswer,
				marks,
			},
			{
				new: true,
			},
		);

		if (!updatedQuestion) {
			return res.status(404).json({
				success: false,
				message: "Question not found",
			});
		}

		return res.status(200).json({
			success: true,
			message: "Question Updated Successfully",
			data: updatedQuestion,
		});
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};


exports.deleteQuestion = async (req, res) => {
	try {
		const { quizId, questionId } = req.body;

		await Question.findByIdAndDelete(questionId);

		const updatedQuiz = await Quiz.findByIdAndUpdate(
			quizId,
			{
				$pull: {
					questions: questionId,
				},
			},
			{
				new: true,
			},
		).populate("questions");

		return res.status(200).json({
			success: true,
			message: "Question Deleted Successfully",
			data: updatedQuiz,
		});
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
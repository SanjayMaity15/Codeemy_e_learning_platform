const Quiz = require("../models/Quiz");
const Section = require("../models/Section");
const QuizResult = require("../models/QuizResult");

// =========================
// Create Quiz
// =========================
exports.createQuiz = async (req, res) => {
	try {
		// Fetch Data
		const { title, sectionId, passingMarks, duration } = req.body;

		// Validation
		if (!title || !sectionId) {
			return res.status(400).json({
				success: false,
				message: "Title and Section ID are required",
			});
		}

		// Check Section Exists
		const section = await Section.findById(sectionId);

		if (!section) {
			return res.status(404).json({
				success: false,
				message: "Section not found",
			});
		}

		// Check if quiz already exists
		if (section.quiz) {
			return res.status(400).json({
				success: false,
				message: "Quiz already exists for this section",
			});
		}

		// Create Quiz
		const quiz = await Quiz.create({
			title,
			section: sectionId,
			passingMarks,
			duration,
		});

		// Update Section
		const updatedSection = await Section.findByIdAndUpdate(
			sectionId,
			{
				quiz: quiz._id,
			},
			{
				new: true,
			},
		)
			.populate("subSection")
			.populate({
				path: "quiz",
				populate: {
					path: "questions",
				},
			});

		return res.status(200).json({
			success: true,
			message: "Quiz created successfully",
			data: updatedSection,
		});
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			success: false,
			message: "Error while creating quiz",
			error: error.message,
		});
	}
};

exports.updateQuiz = async (req, res) => {
	try {
		const { quizId, title, passingMarks, duration } = req.body;

		const quiz = await Quiz.findById(quizId);

		if (!quiz) {
			return res.status(404).json({
				success: false,
				message: "Quiz not found",
			});
		}

		if (title) quiz.title = title;

		if (passingMarks !== undefined) quiz.passingMarks = passingMarks;

		if (duration !== undefined) quiz.duration = duration;

		await quiz.save();

		const updatedSection = await Section.findOne({
			quiz: quizId,
		})
			.populate("subSection")
			.populate({
				path: "quiz",
				populate: {
					path: "questions",
				},
			});

		return res.status(200).json({
			success: true,
			message: "Quiz Updated Successfully",
			data: updatedSection,
		});
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.deleteQuiz = async (req, res) => {
	try {
		const { sectionId, quizId } = req.body;

		await Question.deleteMany({
			_id: {
				$in: (await Quiz.findById(quizId)).questions,
			},
		});

		await Quiz.findByIdAndDelete(quizId);

		const updatedSection = await Section.findByIdAndUpdate(
			sectionId,
			{
				$unset: {
					quiz: 1,
				},
			},
			{
				new: true,
			},
		)
			.populate("subSection")
			.populate("quiz");

		return res.status(200).json({
			success: true,
			message: "Quiz Deleted Successfully",
			data: updatedSection,
		});
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.getQuiz = async (req, res) => {
	try {
		const { quizId } = req.params;

		if (!quizId) {
			return res.status(400).json({
				success: false,
				message: "Quiz Id is required",
			});
		}

		const quiz = await Quiz.findById(quizId).populate("questions");

		if (!quiz) {
			return res.status(404).json({
				success: false,
				message: "Quiz not found",
			});
		}

		return res.status(200).json({
			success: true,
			message: "Quiz fetched successfully",
			data: quiz,
		});
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.submitQuiz = async (req, res) => {
	try {
		const { quizId, answers, courseId } = req.body;

		const userId = req.user.id;

		if (!courseId) {
			return res.status(400).json({
				success: false,
				message: "CourseId is required",
			});
		}

		if (!quizId || !answers) {
			return res.status(400).json({
				success: false,
				message: "Quiz and answers are required",
			});
		}

		const quiz = await Quiz.findById(quizId).populate("questions");

		if (!quiz) {
			return res.status(404).json({
				success: false,
				message: "Quiz not found",
			});
		}

		let score = 0;
		let totalMarks = 0;

		const answerDetails = [];

		for (const question of quiz.questions) {
			totalMarks += question.marks;

			const selected = answers[question._id];

			const correct = selected === question.correctAnswer;

			if (correct) {
				score += question.marks;
			}

			answerDetails.push({
				question: question._id,
				selectedAnswer: selected,
				isCorrect: correct,
			});
		}

		const percentage = (score / totalMarks) * 100;

		const isPassed = percentage >= quiz.passingMarks;

		const result = await QuizResult.create({
			quiz: quizId,
			course: courseId,
			user: userId,
			score,
			totalMarks,
			isPassed,
			answers: answerDetails,
		});

		return res.status(200).json({
			success: true,
			message: "Quiz Submitted Successfully",
			data: {
				result,
				percentage,
			},
		});
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.getQuizResult = async (req, res) => {
	try {
		const { quizId } = req.params;
		const userId = req.user.id;

		const result = await QuizResult.findOne({
			quiz: quizId,
			user: userId,
		});

		return res.status(200).json({
			success: true,
			data: result,
		});
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

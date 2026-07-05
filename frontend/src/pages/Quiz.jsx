import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Quiz() {
	const { quizId, courseId } = useParams();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);
	const [quiz, setQuiz] = useState(null);

	const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
	const [result, setResult] = useState(null);
	
	console.log({courseId})

	const fetchQuiz = async () => {
		try {
			setLoading(true);

			const response = await axios.get(
				`${import.meta.env.VITE_SERVER_URL}course/getQuiz/${quizId}`,
				{
					withCredentials: true,
				},
			);

			setQuiz(response.data.data);
		} catch (error) {
			console.log(error);

			toast.error(
				error?.response?.data?.message || "Unable to load quiz",
			);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchQuiz();
	}, []);

	if (loading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<h2 className="text-xl font-semibold">Loading Quiz...</h2>
			</div>
		);
	}

	if (!quiz) {
		return (
			<div className="flex h-screen items-center justify-center">
				Quiz not found
			</div>
		);
	}

	const question = quiz.questions[currentQuestion];

	const handleAnswer = (optionIndex) => {
		setAnswers((prev) => ({
			...prev,
			[question._id]: optionIndex,
		}));
	};

	const handleNext = () => {
		if (currentQuestion < quiz.questions.length - 1) {
			setCurrentQuestion((prev) => prev + 1);
		}
	};

	const handlePrevious = () => {
		if (currentQuestion > 0) {
			setCurrentQuestion((prev) => prev - 1);
		}
	};

const handleSubmit = async () => {
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_SERVER_URL}course/submitQuiz`,
			{
				quizId,
				answers,
				courseId,
			},
			{
				withCredentials: true,
			},
		);

		setResult(response.data.data);

		toast.success("Quiz Submitted Successfully");
	} catch (error) {
		console.log(error);

		toast.error(error?.response?.data?.message || "Submission Failed");
	}
    };
    
    if (result) {
		return (
			<div className="mx-auto mt-20 max-w-3xl rounded-xl bg-white p-8 shadow">
				<h1 className="mb-6 text-center text-3xl font-bold">
					Quiz Result
				</h1>

				<div className="space-y-4 text-lg">
					<p>
						Score :<strong> {result.result.score}</strong>
					</p>

					<p>
						Total Marks :
						<strong> {result.result.totalMarks}</strong>
					</p>

					<p>
						Percentage :
						<strong> {result.percentage.toFixed(2)}%</strong>
					</p>

					<p>
						Status :
						{result.result.isPassed ? (
							<span className="ml-2 font-bold text-green-600">
								PASS
							</span>
						) : (
							<span className="ml-2 font-bold text-red-600">
								FAIL
							</span>
						)}
					</p>
				</div>

				<button
					onClick={() => navigate(-1)}
					className="mt-8 rounded bg-blue-600 px-6 py-2 text-white"
				>
					Back To Course
				</button>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-4xl p-8">
			<h1 className="mb-2 text-3xl font-bold">{quiz.title}</h1>

			<div className="mb-6 flex gap-6 text-gray-700">
				<p>
					<strong>Duration:</strong> {quiz.duration} Minutes
				</p>

				<p>
					<strong>Passing Marks:</strong> {quiz.passingMarks}%
				</p>
			</div>

			<hr className="mb-6" />

			<h2 className="mb-2 text-xl font-semibold">
				Question {currentQuestion + 1} of {quiz.questions.length}
			</h2>

			<h3 className="mb-6 text-lg font-medium">{question.question}</h3>

			<div className="space-y-4">
				{question.options.map((option, index) => (
					<label
						key={index}
						className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition ${
							answers[question._id] === index
								? "border-blue-500 bg-blue-50"
								: "border-gray-300"
						}`}
					>
						<input
							type="radio"
							name={question._id}
							checked={answers[question._id] === index}
							onChange={() => handleAnswer(index)}
						/>

						<span>{option}</span>
					</label>
				))}
			</div>

			<div className="mt-10 flex justify-between">
				<button
					onClick={handlePrevious}
					disabled={currentQuestion === 0}
					className="rounded bg-gray-300 px-5 py-2 disabled:cursor-not-allowed disabled:opacity-50"
				>
					Previous
				</button>

				{currentQuestion === quiz.questions.length - 1 ? (
					<button
						disabled={
							Object.keys(answers).length !==
							quiz.questions.length
						}
						onClick={handleSubmit}
						className="rounded bg-green-600 px-6 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
					>
						Submit Quiz
					</button>
				) : (
					<button
						onClick={handleNext}
						className="rounded bg-blue-600 px-6 py-2 text-white"
					>
						Next
					</button>
				)}
			</div>
		</div>
	);
}

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import IconBtn from "../../../common/IconBtn";
import { setCourse } from "../../../../feature/courseSlice";
export default function QuestionModal({
	modalData,
	setModalData,
	add = false,
	edit = false,
	view = false,
}) {
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors },
	} = useForm();

	const dispatch = useDispatch();

	const { course } = useSelector((state) => state.course);

	const [loading, setLoading] = useState(false);
	useEffect(() => {
		if (edit || view) {
			setValue("question", modalData.question);
			setValue("option1", modalData.options[0]);
			setValue("option2", modalData.options[1]);
			setValue("option3", modalData.options[2]);
			setValue("option4", modalData.options[3]);
			setValue("correctAnswer", modalData.correctAnswer);
			setValue("marks", modalData.marks);
		}
	}, []);

	const onSubmit = async (data) => {
		if (view) return;

		try {
			setLoading(true);

			const response = await axios.post(
				`${import.meta.env.VITE_SERVER_URL}course/addQuestion`,
				{
					quizId: modalData.quizId,
					question: data.question,
					options: [
						data.option1,
						data.option2,
						data.option3,
						data.option4,
					],
					correctAnswer: Number(data.correctAnswer),
					marks: Number(data.marks),
				},
				{
					withCredentials: true,
				},
			);

			const updatedQuiz = response.data.data;

			// Update Redux
			const updatedCourseContent = course.courseContent.map((section) => {
				if (section.quiz && section.quiz._id === updatedQuiz._id) {
					return {
						...section,
						quiz: updatedQuiz,
					};
				}

				return section;
			});

			dispatch(
				setCourse({
					...course,
					courseContent: updatedCourseContent,
				}),
			);

			toast.success("Question Added Successfully");

			setModalData(null);
		} catch (error) {
			console.log(error);

			toast.error(
				error?.response?.data?.message || "Failed to Add Question",
			);
		} finally {
			setLoading(false);
		}
	};

	const isFormUpdated = () => {
		const values = getValues();

		return (
			values.question !== modalData.question ||
			values.option1 !== modalData.options[0] ||
			values.option2 !== modalData.options[1] ||
			values.option3 !== modalData.options[2] ||
			values.option4 !== modalData.options[3] ||
			Number(values.correctAnswer) !== modalData.correctAnswer ||
			Number(values.marks) !== modalData.marks
		);
	};

	return (
		<div className="fixed inset-0 z-1000 mt-0 grid h-screen w-screen place-items-center overflow-auto bg-black/50 backdrop-blur-sm">
			<div className="my-10 w-11/12 max-w-3xl rounded-lg border bg-white">
				{/* Header */}

				<div className="flex items-center justify-between border-b p-5">
					<p className="text-xl font-semibold">
						{view && "Viewing "}
						{edit && "Edit "}
						{add && "Add "}
						Question
					</p>

					<button
						onClick={() => (!loading ? setModalData(null) : {})}
					>
						<RxCross2 className="text-2xl" />
					</button>
				</div>

				{/* Form */}

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-5 p-6"
				>
					<div className="flex flex-col gap-2">
						<label>
							Question
							<sup className="text-red-600">*</sup>
						</label>

						<textarea
							rows={4}
							disabled={view || loading}
							placeholder="Enter Question"
							{...register("question", {
								required: true,
							})}
							className="form-style rounded-xl border p-3"
						/>

						{errors.question && (
							<span className="text-sm text-red-600">
								Question is required
							</span>
						)}
					</div>
					<div className="flex flex-col gap-2">
						<label>Option A</label>

						<input
							disabled={view || loading}
							placeholder="Option A"
							{...register("option1", {
								required: true,
							})}
							className="form-style rounded-xl border p-2"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label>Option B</label>

						<input
							disabled={view || loading}
							placeholder="Option B"
							{...register("option2", {
								required: true,
							})}
							className="form-style rounded-xl border p-2"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label>Option C</label>

						<input
							disabled={view || loading}
							placeholder="Option C"
							{...register("option3", {
								required: true,
							})}
							className="form-style rounded-xl border p-2"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label>Option D</label>

						<input
							disabled={view || loading}
							placeholder="Option D"
							{...register("option4", {
								required: true,
							})}
							className="form-style rounded-xl border p-2"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label>Correct Answer</label>

						<select
							disabled={view || loading}
							{...register("correctAnswer", {
								required: true,
							})}
							className="form-style rounded-xl border p-2"
						>
							<option value="">Select</option>

							<option value="0">Option A</option>

							<option value="1">Option B</option>

							<option value="2">Option C</option>

							<option value="3">Option D</option>
						</select>
					</div>
					<div className="flex flex-col gap-2">
						<label>Marks</label>

						<input
							type="number"
							disabled={view || loading}
							{...register("marks", {
								required: true,

								min: 1,
							})}
							className="form-style rounded-xl border p-2"
						/>
					</div>
					{!view && (
						<div className="flex justify-end">
							<IconBtn
								disabled={loading}
								loading={loading}
								text={
									loading
										? "Loading..."
										: edit
											? "Save Changes"
											: "Save Question"
								}
							/>
						</div>
					)}
				</form>
			</div>
		</div>
	);
}

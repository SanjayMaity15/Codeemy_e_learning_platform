import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { resetCourseState, setCourse, setStep } from "../../../../feature/courseSlice";
import { COURSE_STATUS } from "../../../../utils/constants";
import IconBtn from "../../../common/IconBtn";
import axios from "axios";
import toast from "react-hot-toast";

export default function PublishCourse() {
	const { register, handleSubmit, setValue, getValues } = useForm();

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { token } = useSelector((state) => state.auth);
	const { course } = useSelector((state) => state.course);
	const [loading, setLoading] = useState(false);
	const [loading2, setLoading2] = useState(false);

	useEffect(() => {
		if (course?.status === COURSE_STATUS.PUBLISHED) {
			setValue("public", true);
		}
	}, []);

	const goBack = () => {
		dispatch(setStep(2));
	};

	const goToCourses = () => {
		dispatch(resetCourseState());
		navigate("/dashboard/my-courses");
	};

	const handleCoursePublish = async () => {
		// check if form has been updated or not
		if (
			(course?.status === COURSE_STATUS.PUBLISHED &&
				getValues("public") === true) ||
			(course?.status === COURSE_STATUS.DRAFT &&
				getValues("public") === false)
		) {
			// form has not been updated
			// no need to make api call
			goToCourses();
			return;
		}
		const formData = new FormData();
		formData.append("courseId", course._id);
		const courseStatus = getValues("public")
			? COURSE_STATUS.PUBLISHED
			: COURSE_STATUS.DRAFT;
		formData.append("status", courseStatus);
		setLoading(true);
		const response = await axios.post(
			`${import.meta.env.VITE_SERVER_URL}course/editCourse`,
			formData,
			{ withCredentials: true },
		);

		const result = response.data.data;

		if (result) {
			goToCourses();
		}
		setLoading(false);
	};

	const onSubmit = (data) => {
		
		handleCoursePublish();
	};

	const handleCourseComplete = async () => {
		try {
			setLoading2(true);

			const response = await axios.post(
				`${import.meta.env.VITE_SERVER_URL}course/markCourseComplete`,
				{
					courseId: course._id,
				},
				{
					withCredentials: true,
				},
			);

			dispatch(
				setCourse({
					...course,
					isCompletedByInstructor: true,
				}),
			);

			toast.success(response.data.message);
		} catch (error) {
			console.log(error);

			toast.error(
				error?.response?.data?.message || "Unable to complete course",
			);
		} finally {
			setLoading2(false);
		}
	};

return (
	<div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
		{/* Header */}
		<div className="mb-8 flex items-center justify-between">
			<div>
				<h2 className="text-3xl font-bold text-gray-800">
					🚀 Publish Course
				</h2>
				<p className="mt-2 text-gray-500">
					Configure your course visibility before publishing.
				</p>
			</div>

			<div className="rounded-xl bg-indigo-50 px-4 py-2">
				<p className="text-xs uppercase tracking-wide text-gray-500">
					Status
				</p>
				<p
					className={`text-lg font-bold ${
						course?.isCompletedByInstructor
							? "text-green-600"
							: "text-orange-500"
					}`}
				>
					{course?.isCompletedByInstructor ? "Completed" : "Pending"}
				</p>
			</div>
		</div>

		<form onSubmit={handleSubmit(onSubmit)}>
			{/* Publish Toggle */}

			<div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
				<label
					htmlFor="public"
					className="flex cursor-pointer items-center justify-between"
				>
					<div>
						<h3 className="text-lg font-semibold text-gray-800">
							Public Course
						</h3>

						<p className="mt-1 text-sm text-gray-500">
							Anyone can discover and enroll in this course.
						</p>
					</div>

					<input
						type="checkbox"
						id="public"
						{...register("public")}
						className="h-6 w-6 accent-indigo-600"
					/>
				</label>
			</div>

			{/* Course Completion */}

			<div className="mt-8">
				{!course?.isCompletedByInstructor ? (
					<div className="rounded-2xl border border-yellow-300 bg-yellow-50 p-6">
						<h3 className="text-lg font-semibold text-yellow-700">
							⚠ Final Step
						</h3>

						<p className="mt-2 text-gray-600">
							Mark your course as complete once all sections,
							lectures and quizzes are ready.
						</p>

						<button
							type="button"
							onClick={handleCourseComplete}
							className="mt-5 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
						>
							✅ Mark Course Complete
						</button>
					</div>
				) : (
					<div className="rounded-2xl border border-green-300 bg-green-50 p-6">
						<div className="flex items-center gap-3">
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-2xl text-white">
								✓
							</div>

							<div>
								<h3 className="text-xl font-bold text-green-700">
									Course Completed
								</h3>

								<p className="text-sm text-gray-600">
									Your course is ready for students.
								</p>
							</div>
						</div>

						<div className="mt-5 rounded-xl bg-white p-4 text-sm leading-7 text-gray-700 shadow-sm">
							Students will become eligible for certificates
							after:
							<ul className="mt-2 list-disc space-y-1 pl-5">
								<li>Completing every lecture.</li>
								<li>
									Passing all quizzes with at least <b>60%</b>{" "}
									average.
								</li>
								<li>Finishing the course successfully.</li>
							</ul>
						</div>
					</div>
				)}
			</div>

			{/* Bottom Buttons */}

			<div className="mt-10 flex items-center justify-between border-t border-gray-200 pt-8">
				<button
					type="button"
					disabled={loading}
					onClick={goBack}
					className="rounded-xl border border-gray-300 px-8 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
				>
					← Back
				</button>

				<IconBtn
					disabled={loading}
					loading={loading}
					text="Publish Course"
					customClasses="rounded-xl px-8 py-3 shadow-lg"
				/>
			</div>
		</form>
	</div>
);
}

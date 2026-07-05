import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { resetCourseState, setStep } from "../../../../feature/courseSlice";
import { COURSE_STATUS } from "../../../../utils/constants";
import IconBtn from "../../../common/IconBtn";
import axios from "axios";

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
		<div className="rounded-md p-6 bg-white shadow-sm">
			<p className="text-2xl font-semibold text-black-5">
				Publish Settings
			</p>
			<form onSubmit={handleSubmit(onSubmit)}>
				{/* Checkbox */}
				<div className="my-6 mb-8">
					<label
						htmlFor="public"
						className="inline-flex items-center text-lg"
					>
						<input
							type="checkbox"
							id="public"
							{...register("public")}
							className="border-gray-300 h-4 w-4 accent-indigo-600"
						/>
						<span className="ml-2 text-black-400">
							Make this course as public
						</span>
					</label>
				</div>

				{!course?.isCompletedByInstructor && (
					<button
						onClick={handleCourseComplete}
						className="mt-4 rounded-md bg-green-600 px-5 py-2 text-white hover:bg-green-700"
					>
						Mark Course Complete
					</button>
				)}

				{course?.isCompletedByInstructor && (
					<div className="mt-4 rounded-md border border-green-500 bg-green-50 p-4">
						<h3 className="font-semibold text-green-700">
							✅ Course Completed
						</h3>

						<p className="text-sm">
							Students can now become eligible for certificates
							after completing all videos and maintaining at least
							a 60% average across section quizzes.
						</p>
					</div>
				)}

				{/* Next Prev Button */}
				<div className="ml-auto flex max-w-max items-center gap-x-4">
					<button
						disabled={loading}
						type="button"
						onClick={goBack}
						className="flex cursor-pointer items-center gap-x-2 rounded-md bg-pink-600 py-2 px-5 font-semibold text-white"
					>
						Back
					</button>
					<IconBtn disabled={loading} loading={loading} text="Save" />
				</div>
			</form>
		</div>
	);
}

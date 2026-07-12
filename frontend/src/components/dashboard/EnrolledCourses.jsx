import axios from "axios";
import { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function EnrolledCourses() {
	const { token } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	const [enrolledCourses, setEnrolledCourses] = useState(null);

	useEffect(() => {
		(async () => {
			try {
				const result = await axios.get(
					`${import.meta.env.VITE_SERVER_URL}profile/getEnrolledCourses`,
					{ withCredentials: true },
				);

				const res = result.data.data;

				const filterPublishCourse = res.filter(
					(ele) => ele.status !== "Draft",
				);

				setEnrolledCourses(filterPublishCourse);
			} catch (error) {
				("Could not fetch enrolled courses.");
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div>
				<h1 className="text-3xl font-bold text-primary">
					Enrolled Courses
				</h1>
				<p className="mt-2 text-gray-500">
					Continue learning where you left off.
				</p>
			</div>

			{!enrolledCourses ? (
				<div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
					<div className="spinner"></div>
				</div>
			) : !enrolledCourses.length ? (
				<div className="mt-12 rounded-2xl border border-dashed border-gray-300 bg-white py-14 text-center shadow-sm">
					<p className="text-lg font-semibold text-gray-700">
						You haven't enrolled in any course yet.
					</p>
					<p className="mt-2 text-sm text-gray-500">
						Start learning by exploring our courses.
					</p>
				</div>
			) : (
				<div className="my-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
					{/* Header */}
					<div className="hidden md:flex bg-linear-to-r from-indigo-600 to-pink-600 text-white">
						<p className="w-[45%] px-6 py-4 font-semibold">
							Course
						</p>
						<p className="w-1/4 px-4 py-4 font-semibold">
							Duration
						</p>
						<p className="flex-1 px-4 py-4 font-semibold">
							Progress
						</p>
					</div>

					{/* Courses */}
					{enrolledCourses.map((course, i, arr) => (
						<div
							key={i}
							className={`flex flex-col md:flex-row md:items-center border-b border-gray-200 hover:bg-gray-50 transition-all ${
								i === arr.length - 1 ? "border-b-0" : ""
							}`}
						>
							{/* Course */}
							<div
								className="flex w-full md:w-[45%] cursor-pointer items-center gap-4 p-5"
								onClick={() => {
									navigate(
										`/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`,
									);
								}}
							>
								<img
									src={course.thumbnail}
									alt="course_img"
									className="h-20 w-28 rounded-xl object-cover shadow-sm"
								/>

								<div className="flex flex-col">
									<p className="text-lg font-semibold text-primary">
										{course.courseName}
									</p>

									<p className="mt-1 text-sm text-gray-500 hidden md:block">
										{course.courseDescription.length > 70
											? `${course.courseDescription.slice(0, 70)}...`
											: course.courseDescription}
									</p>
								</div>
							</div>

							{/* Duration */}
							<div className="md:w-1/4 px-5 pb-3 md:pb-0">
								<p className="text-xs uppercase tracking-wide text-gray-400 md:hidden mb-1">
									Duration
								</p>

								<p className="font-medium text-gray-700">
									{course?.totalDuration}
								</p>
							</div>

							{/* Progress */}
							<div className="flex flex-col md:w-[30%] px-5 pb-5 md:pb-0">
								<div className="flex justify-between mb-2">
									<span className="text-sm text-gray-600">
										Progress
									</span>

									<span className="text-sm font-semibold text-pink-600">
										{course.progressPercentage || 0}%
									</span>
								</div>

								<ProgressBar
									completed={course.progressPercentage || 0}
									height="10px"
									borderRadius="20px"
									isLabelVisible={false}
									bgColor="#DB2777"
									baseBgColor="#F3F4F6"
								/>
							</div>
						</div>
					))}
				</div>
			)}
		</>
	);
}

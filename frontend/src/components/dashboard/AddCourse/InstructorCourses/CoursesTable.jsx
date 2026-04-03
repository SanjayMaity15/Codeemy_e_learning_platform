import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import { formatDate } from "../../../../utils/dateFormatter";

import { COURSE_STATUS } from "../../../../utils/constants";
import ConfirmationModal from "../../../common/ConfirmationModal";
import axios from "axios";

export default function CoursesTable({ courses, setCourses }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { token } = useSelector((state) => state.auth);
	const [loading, setLoading] = useState(false);
	const [confirmationModal, setConfirmationModal] = useState(null);
	const TRUNCATE_LENGTH = 30;

	const handleCourseDelete = async (courseId) => {
		console.log(courseId);
		try {
			setLoading(true);
			await axios.delete(
				`${import.meta.env.VITE_SERVER_URL}course/deleteCourse`,
				{
					withCredentials: true,
					data: { courseId }, // 🔥 MUST be inside data
				},
			);

			const response = await axios.get(
				`${import.meta.env.VITE_SERVER_URL}course/getInstructorCourses`,
				{ withCredentials: true },
			);

			const result = response.data.data;
			if (result) {
				setCourses(result);
			}
			setConfirmationModal(null);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	console.log(courses);
	// console.log("All Course ", courses)

	return (
		<>
			<table className="rounded-xl border border-primary">
				<thead className="bg-indigo-100 text-indigo-700 hidden md:block">
					<tr className="flex  gap-x-10 rounded-t-md border-b border-b-primary px-6 py-2">
						<th className="flex-1 text-left text-sm font-bold uppercase">
							Courses
						</th>
						<th className="text-left text-sm font-bold uppercase">
							Duration
						</th>
						<th className="text-left text-sm font-bold uppercase">
							Price
						</th>
						<th className="text-left text-sm font-bold uppercase">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{courses?.length === 0 ? (
						<tr>
							<td className="py-10 text-center text-2xl font-medium text-richblack-100">
								No courses found
								{/* TODO: Need to change this state */}
							</td>
						</tr>
					) : (
						courses?.map((course) => (
							<tr
								key={course._id}
								className="flex flex-col md:flex-row items-center gap-4 md:gap-10 px-6 py-8 shadow-sm bg-white mb-4"
							>
								<td className="flex flex-col md:flex-row flex-1 gap-4">
									
									<div className="flex justify-center items-center">
										<img
											src={course?.thumbnail}
											alt={course?.courseName}
											className="h-25 min-w-40 rounded-lg object-cover"
										/>
									</div>
									<div className="flex flex-col justify-between">
										<p className="md:text-lg text-sm font-semibold text-primary">
											{course.courseName}
										</p>
										<p className="text-xs text-gray-500">
											{course.courseDescription.split(" ")
												.length > TRUNCATE_LENGTH
												? course.courseDescription
														.split(" ")
														.slice(
															0,
															TRUNCATE_LENGTH,
														)
														.join(" ") + "..."
												: course.courseDescription}
										</p>
										<p className="text-[12px] text-pink-600 mt-2">
											Created:{" "}
											{formatDate(course.createdAt)}
										</p>
										{course.status ===
										COURSE_STATUS.DRAFT ? (
											<p className="flex w-fit flex-row items-center gap-2 rounded-full px-2 py-0.5 text-[12px] font-medium text-yellow-600 bg-yellow-100 mt-1">
												<HiClock size={14} />
												Drafted
											</p>
										) : (
											<p className="flex w-fit flex-row items-center gap-2 rounded-full bg-green-100 px-2 py-0.5 text-[12px] font-medium text-green-600 mt-1">
												<span className="flex h-3 w-3 items-center justify-center rounded-full">
													<FaCheck size={8} />
												</span>
												Published
											</p>
										)}
									</div>
								</td>
								<td className="text-sm font-medium text-richblack-100">
									{course.totalDuration}
								</td>
								<td className="text-sm font-medium text-richblack-100">
									₹{course.price}
								</td>
								<td className="text-sm font-medium text-richblack-100 ">
									<button
										disabled={loading}
										onClick={() => {
											navigate(
												`/dashboard/edit-course/${course._id}`,
											);
										}}
										title="Edit"
										className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
									>
										<FiEdit2
											size={16}
											className="text-yellow-700"
										/>
									</button>
									<button
										disabled={loading}
										onClick={() => {
											setConfirmationModal({
												text1: "Do you want to delete this course?",
												text2: "All the data related to this course will be deleted",
												btn1Text: "Delete",
												btn2Text: "Cancel",
												loadingText: "Deleting",
												btn1Handler: () =>
													handleCourseDelete(
														course._id,
													),

												btn2Handler: () =>
													setConfirmationModal(null),
											});
										}}
										title="Delete"
										className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
									>
										<RiDeleteBin6Line
											size={16}
											className="text-red-600"
										/>
									</button>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
			{confirmationModal && (
				<ConfirmationModal modalData={confirmationModal} />
			)}
		</>
	);
}

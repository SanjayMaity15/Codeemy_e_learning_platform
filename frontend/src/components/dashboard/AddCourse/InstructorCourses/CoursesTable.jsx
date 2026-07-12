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
		try {
			setLoading(true);

			await axios.delete(
				`${import.meta.env.VITE_SERVER_URL}course/deleteCourse`,
				{
					withCredentials: true,
					data: { courseId },
				},
			);

			const response = await axios.get(
				`${import.meta.env.VITE_SERVER_URL}course/getInstructorCourses`,
				{
					withCredentials: true,
				},
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

	return (
		<>
			<div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
				<table className="w-full">
					<thead className="hidden md:table-header-group bg-linear-to-r from-indigo-50 to-pink-50">
						<tr>
							<th className="px-8 py-5 text-left text-sm font-bold uppercase tracking-wide text-gray-700">
								Course
							</th>

							<th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wide text-gray-700">
								Duration
							</th>

							<th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wide text-gray-700">
								Price
							</th>

							<th className="px-6 py-5 text-center text-sm font-bold uppercase tracking-wide text-gray-700">
								Actions
							</th>
						</tr>
					</thead>

					<tbody>
						{courses?.length === 0 ? (
							<tr>
								<td
									colSpan="4"
									className="py-20 text-center text-xl font-semibold text-gray-400"
								>
									No courses found
								</td>
							</tr>
						) : (
							courses?.map((course) => (
								<tr
									key={course._id}
									className="border-t border-gray-200 transition-all duration-300 hover:bg-gray-50"
								>
									<td className="px-8 py-6">
										<div className="flex flex-col md:flex-row items-center gap-5">
											<img
												src={course?.thumbnail}
												alt={course?.courseName}
												className="h-28 w-44 rounded-2xl object-cover shadow-md"
											/>

											<div className="flex flex-col">
												<p className="text-lg font-bold text-primary">
													{course.courseName}
												</p>

												<p className="mt-2 text-sm leading-6 text-gray-500">
													{course.courseDescription.split(
														" ",
													).length > TRUNCATE_LENGTH
														? course.courseDescription
																.split(" ")
																.slice(
																	0,
																	TRUNCATE_LENGTH,
																)
																.join(" ") +
															"..."
														: course.courseDescription}
												</p>

												<p className="mt-3 text-xs font-medium text-pink-500">
													Created:{" "}
													{formatDate(
														course.createdAt,
													)}
												</p>

												{course.status ===
												COURSE_STATUS.DRAFT ? (
													<p className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-yellow-100 px-4 py-1 text-xs font-semibold text-yellow-700">
														<HiClock size={14} />
														Drafted
													</p>
												) : (
													<p className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-green-100 px-4 py-1 text-xs font-semibold text-green-700">
														<FaCheck size={10} />
														Published
													</p>
												)}
											</div>
										</div>
									</td>

									<td className="px-6 py-6 text-base font-semibold text-gray-700">
										{course.totalDuration}
									</td>

									<td className="px-6 py-6">
										<p className="text-lg font-bold text-pink-600">
											₹{course.price}
										</p>
									</td>

									<td className="px-6 py-6">
										<div className="flex items-center justify-center gap-3">
											<button
												disabled={loading}
												onClick={() => {
													navigate(
														`/dashboard/edit-course/${course._id}`,
													);
												}}
												title="Edit"
												className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100 transition-all duration-300 hover:scale-110 hover:bg-yellow-200"
											>
												<FiEdit2
													size={18}
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
															setConfirmationModal(
																null,
															),
													});
												}}
												title="Delete"
												className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 transition-all duration-300 hover:scale-110 hover:bg-red-200"
											>
												<RiDeleteBin6Line
													size={18}
													className="text-red-600"
												/>
											</button>
										</div>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>

			{confirmationModal && (
				<ConfirmationModal modalData={confirmationModal} />
			)}
		</>
	);
}
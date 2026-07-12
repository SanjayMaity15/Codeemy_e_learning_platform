import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import {
	FaPlayCircle,
	FaCheckCircle,
	FaCertificate,
	FaLock,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

import IconBtn from "../../components/common/IconBtn";

export default function VideoDetailsSidebar({ setReviewModal }) {
	const [activeStatus, setActiveStatus] = useState("");
	const [videoBarActive, setVideoBarActive] = useState("");
	const [quizResults, setQuizResults] = useState({});
	const [certificate, setCertificate] = useState(null);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	const { sectionId, subSectionId } = useParams();

	const {
		courseSectionData,
		courseEntireData,
		totalNoOfLectures,
		completedLectures,
	} = useSelector((state) => state.viewCourse);

	/* -------------------------------------------- */
	/* Generate Certificate                         */
	/* -------------------------------------------- */

	const handleGenerateCertificate = async () => {
		try {
			setLoading(true);

			const response = await axios.post(
				`${import.meta.env.VITE_SERVER_URL}course/generateCertificate`,
				{
					courseId: courseEntireData._id,
				},
				{
					withCredentials: true,
				},
			);

			setCertificate(response.data.data);

			toast.success(response.data.message);
		} catch (error) {
			toast.error(
				error.response?.data?.message ||
					"Unable to generate certificate",
			);
		} finally {
			setLoading(false);
		}
	};

	/* -------------------------------------------- */
	/* Download Certificate                         */
	/* -------------------------------------------- */

	const handleDownloadCertificate = async () => {
		const res = await axios.get(
			`${import.meta.env.VITE_SERVER_URL}course/downloadCertificate/${certificate._id}`,
			{
				withCredentials: true,
			},
		);

		window.open(res.data.url, "_blank");
	};

	/* -------------------------------------------- */
	/* Active Lecture                               */
	/* -------------------------------------------- */

	useEffect(() => {
		if (!courseSectionData.length) return;

		const currentSectionIndex = courseSectionData.findIndex(
			(sec) => sec._id === sectionId,
		);

		const currentLectureIndex = courseSectionData[
			currentSectionIndex
		]?.subSection.findIndex((item) => item._id === subSectionId);

		const lectureId =
			courseSectionData[currentSectionIndex]?.subSection[
				currentLectureIndex
			]?._id;

		setActiveStatus(courseSectionData[currentSectionIndex]?._id);

		setVideoBarActive(lectureId);
	}, [courseSectionData, location.pathname]);

	/* -------------------------------------------- */
	/* Fetch Quiz Result                            */
	/* -------------------------------------------- */

	const fetchQuizResult = async (quizId) => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_SERVER_URL}course/quizResult/${quizId}`,
				{
					withCredentials: true,
				},
			);

			setQuizResults((prev) => ({
				...prev,
				[quizId]: response.data.data,
			}));
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (!courseSectionData.length) return;

		courseSectionData.forEach((section) => {
			if (section.quiz) {
				fetchQuizResult(section.quiz._id);
			}
		});
	}, [courseSectionData]);

	/* -------------------------------------------- */
	/* Progress Percentage                          */
	/* -------------------------------------------- */

	const progress =
		totalNoOfLectures > 0
			? Math.round((completedLectures.length / totalNoOfLectures) * 100)
			: 0;

	return (
		<div className="h-[calc(100vh-3.5rem)] w-85 overflow-hidden bg-linear-to-b from-white to-slate-100 shadow-2xl flex flex-col">
			{/* ================= Header ================= */}

			<div className="border-b bg-white px-5 py-5 shadow-sm">
				<div className="flex items-center justify-between">
					<button
						onClick={() => navigate("/dashboard/enrolled-courses")}
						className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 transition hover:scale-95 hover:bg-indigo-100"
					>
						<IoIosArrowBack size={22} />
					</button>

					<IconBtn
						text="Add Review"
						onclick={() => setReviewModal(true)}
					/>
				</div>

				{/* Course Name */}

				<div className="mt-5">
					<h2 className="line-clamp-2 text-xl font-bold text-slate-800">
						{courseEntireData?.courseName}
					</h2>

					<p className="mt-1 text-sm text-slate-500">
						{completedLectures.length} of {totalNoOfLectures}{" "}
						lectures completed
					</p>
				</div>

				{/* Progress */}

				<div className="mt-5">
					<div className="mb-2 flex justify-between text-sm">
						<span className="font-medium text-slate-700">
							Course Progress
						</span>

						<span className="font-bold text-indigo-600">
							{progress}%
						</span>
					</div>

					<div className="h-3 overflow-hidden rounded-full bg-slate-200">
						<div
							className="h-full rounded-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-700"
							style={{
								width: `${progress}%`,
							}}
						/>
					</div>
				</div>

				{/* Certificate */}

				{completedLectures.length === totalNoOfLectures && (
					<div className="mt-6 rounded-xl bg-linear-to-r from-indigo-600 to-purple-700 p-4 text-white shadow-lg">
						<div className="flex items-center gap-3">
							<div className="rounded-full bg-white/20 p-3">
								<FaCertificate size={24} />
							</div>

							<div>
								<h3 className="font-semibold">
									Course Completed 🎉
								</h3>

								<p className="text-sm text-indigo-100">
									Claim your certificate now.
								</p>
							</div>
						</div>

						{certificate ? (
							<button
								onClick={handleDownloadCertificate}
								className="mt-4 w-full rounded-lg bg-white py-2 font-semibold text-indigo-700 transition hover:scale-[1.02]"
							>
								Download Certificate
							</button>
						) : (
							<button
								disabled={loading}
								onClick={handleGenerateCertificate}
								className="mt-4 w-full rounded-lg bg-white py-2 font-semibold text-indigo-700 transition hover:scale-[1.02] disabled:opacity-70"
							>
								{loading
									? "Generating..."
									: "Generate Certificate"}
							</button>
						)}
					</div>
				)}
			</div>

			{/* ================= Lecture List ================= */}

			<div className="flex-1 overflow-y-auto px-3 py-4">
				{courseSectionData.map((course) => (
					<div
						key={course._id}
						className="mb-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
					>
						{/* Section Header */}

						<button
							onClick={() =>
								setActiveStatus(
									activeStatus === course._id
										? ""
										: course._id,
								)
							}
							className="flex w-full items-center justify-between bg-slate-50 px-5 py-4 transition hover:bg-indigo-50"
						>
							<div className="text-left">
								<h3 className="font-semibold text-slate-800">
									{course.sectionName}
								</h3>

								<p className="text-xs text-slate-500">
									{course.subSection.length} Lectures
								</p>
							</div>

							<BsChevronDown
								className={`transition-transform duration-300 ${
									activeStatus === course._id
										? "rotate-180"
										: ""
								}`}
							/>
						</button>

						{/* Lectures */}

						{activeStatus === course._id && (
							<div className="divide-y">
								{course.subSection.map((lecture) => {
									const completed =
										completedLectures.includes(lecture._id);

									const active =
										videoBarActive === lecture._id;

									return (
										<div
											key={lecture._id}
											onClick={() => {
												setVideoBarActive(lecture._id);

												navigate(
													`/view-course/${courseEntireData._id}/section/${course._id}/sub-section/${lecture._id}`,
												);
											}}
											className={`flex cursor-pointer items-center gap-3 px-5 py-3 transition-all duration-200

							${active ? "border-r-4 border-indigo-600 bg-indigo-100" : "hover:bg-slate-50"}`}
										>
											{completed ? (
												<FaCheckCircle
													className="text-green-500"
													size={18}
												/>
											) : (
												<FaPlayCircle
													className="text-indigo-500"
													size={18}
												/>
											)}

											<div className="flex-1">
												<p
													className={`text-sm ${
														active
															? "font-semibold text-indigo-700"
															: "text-slate-700"
													}`}
												>
													{lecture.title}
												</p>
											</div>
										</div>
									);
								})}

								{/* Quiz */}

								{course.quiz && (
									<div className="bg-slate-50 p-4">
										<div className="mb-3 flex items-center gap-2">
											<span className="text-xl">📝</span>

											<div>
												<h4 className="font-semibold">
													{course.quiz.title}
												</h4>

												<p className="text-xs text-slate-500">
													Section Quiz
												</p>
											</div>
										</div>

										{quizResults[course.quiz._id] ? (
											<div className="rounded-xl border border-green-300 bg-green-50 p-4">
												<p className="font-semibold text-green-700">
													Quiz Completed ✅
												</p>

												<p className="mt-2 text-sm">
													Score
													<span className="ml-2 font-bold">
														{
															quizResults[
																course.quiz._id
															].score
														}
														/
														{
															quizResults[
																course.quiz._id
															].totalMarks
														}
													</span>
												</p>

												<p className="mt-1 text-sm">
													Status :
													<span
														className={`ml-2 font-semibold ${
															quizResults[
																course.quiz._id
															].isPassed
																? "text-green-600"
																: "text-red-600"
														}`}
													>
														{quizResults[
															course.quiz._id
														].isPassed
															? "Passed ✔"
															: "Failed ✘"}
													</span>
												</p>
											</div>
										) : (
											<button
												disabled={course.subSection.some(
													(item) =>
														!completedLectures.includes(
															item._id,
														),
												)}
												onClick={() =>
													navigate(
														`/quiz/${courseEntireData._id}/${course.quiz._id}`,
													)
												}
												className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold transition

								${
									course.subSection.some(
										(item) =>
											!completedLectures.includes(
												item._id,
											),
									)
										? "cursor-not-allowed bg-gray-300 text-gray-600"
										: "bg-yellow-500 text-white hover:bg-yellow-600"
								}`}
											>
												{course.subSection.some(
													(item) =>
														!completedLectures.includes(
															item._id,
														),
												) ? (
													<>
														<FaLock />
														Complete lectures first
													</>
												) : (
													<>Start Quiz →</>
												)}
											</button>
										)}
									</div>
								)}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
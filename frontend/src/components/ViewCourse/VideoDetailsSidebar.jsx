import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

import IconBtn from "../../components/common/IconBtn";

export default function VideoDetailsSidebar({ setReviewModal }) {
	const [activeStatus, setActiveStatus] = useState("");
	const [videoBarActive, setVideoBarActive] = useState("");
	const [quizResults, setQuizResults] = useState({});
	const navigate = useNavigate();
	const location = useLocation();
	const [certificate, setCertificate] = useState(null);
	const [loading, setLoading] = useState(false);
	const { sectionId, subSectionId } = useParams();
	const {
		courseSectionData,
		courseEntireData,
		totalNoOfLectures,
		completedLectures,
	} = useSelector((state) => state.viewCourse);

	console.log(courseSectionData);

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
			console.log(error);

			toast.error(
				error.response?.data?.message ||
					"Unable to generate certificate",
			);
		} finally {
			setLoading(false);
		}
	};
	const handleDownloadCertificate = async () => {
		const res = await axios.get(
			`${import.meta.env.VITE_SERVER_URL}course/downloadCertificate/${certificate._id}`,
			{
				withCredentials: true,
			},
		);

		window.open(res.data.url, "_blank");
	};
	useEffect(() => {
		(() => {
			if (!courseSectionData.length) return;
			const currentSectionIndx = courseSectionData.findIndex(
				(data) => data._id === sectionId,
			);
			const currentSubSectionIndx = courseSectionData?.[
				currentSectionIndx
			]?.subSection.findIndex((data) => data._id === subSectionId);
			const activeSubSectionId =
				courseSectionData[currentSectionIndx]?.subSection?.[
					currentSubSectionIndx
				]?._id;
			setActiveStatus(courseSectionData?.[currentSectionIndx]?._id);
			setVideoBarActive(activeSubSectionId);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [courseSectionData, courseEntireData, location.pathname]);

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
		} catch (error) {
			console.log(error);
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

	return (
		<>
			<div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-87.5 flex-col shadow-sm bg-white">
				<div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-black-25">
					<div className="flex w-full items-center justify-between ">
						<div
							onClick={() => {
								navigate(`/dashboard/enrolled-courses`);
							}}
							className="flex h-8.75 w-8.75 items-center justify-center rounded-full bg-gray-100 p-1 text-black-700 hover:scale-90"
							title="back"
						>
							<IoIosArrowBack size={30} />
						</div>
						<IconBtn
							text="Add Review"
							customClasses="ml-auto"
							onclick={() => setReviewModal(true)}
						/>
					</div>
					{completedLectures.length === totalNoOfLectures && (
						<div className="mt-3">
							{certificate ? (
								<button
									onClick={handleDownloadCertificate}
									className="w-full rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
								>
									🎓 Download Certificate
								</button>
							) : (
								<button
									onClick={handleGenerateCertificate}
									disabled={loading}
									className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
								>
									{loading
										? "Generating..."
										: "🎓 Generate Certificate"}
								</button>
							)}
						</div>
					)}
					<div className="flex flex-col">
						<p>{courseEntireData?.courseName}</p>
						<p className="text-sm font-semibold text-black-500">
							{completedLectures?.length} / {totalNoOfLectures}
						</p>
					</div>
				</div>

				<div className="h-[calc(100vh - 5rem)] overflow-y-auto">
					{courseSectionData.map((course, index) => (
						<div
							className="mt-2 cursor-pointer text-sm text-black-5"
							onClick={() => setActiveStatus(course?._id)}
							key={index}
						>
							{/* Section */}
							<div className="flex flex-row justify-between bg-gray-200 px-5 py-4">
								<div className="w-[70%] font-semibold">
									{course?.sectionName}
								</div>
								<div className="flex items-center gap-3">
									{/* <span className="text-[12px] font-medium">
                    Lession {course?.subSection.length}
                  </span> */}
									<span
										className={`${
											activeStatus === course?.sectionName
												? "rotate-0"
												: "rotate-180"
										} transition-all duration-500`}
									>
										<BsChevronDown />
									</span>
								</div>
							</div>

							{/* Sub Sections */}
							{activeStatus === course?._id && (
								<div className="transition-[height] duration-500 ease-in-out">
									{/* Lectures */}
									{course.subSection.map((topic, i) => (
										<div
											key={i}
											className={`flex gap-3 items-center px-5 py-2 ${
												videoBarActive === topic._id
													? "bg-indigo-200 font-semibold border-r-4 border-r-primary"
													: "hover:bg-indigo-100"
											}`}
											onClick={() => {
												navigate(
													`/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`,
												);
												setVideoBarActive(topic._id);
											}}
										>
											<input
												type="checkbox"
												checked={completedLectures.includes(
													topic?._id,
												)}
												onChange={() => {}}
												className="w-3 h-3 accent-indigo-600"
											/>

											<span>{topic.title}</span>
										</div>
									))}

									{/* Quiz */}
									{course.quiz && (
										<div className="mt-4 border-t border-gray-300 px-5 pt-4">
											<p className="mb-2 font-semibold text-gray-700">
												📝 {course.quiz.title}
											</p>

											{quizResults[course.quiz._id] ? (
												<div className="rounded-md border border-green-300 bg-green-50 p-3">
													<p className="font-semibold text-green-700">
														✅ Quiz Completed
													</p>

													<p className="mt-2 text-sm">
														Score :{" "}
														<strong>
															{
																quizResults[
																	course.quiz
																		._id
																].score
															}
															/
															{
																quizResults[
																	course.quiz
																		._id
																].totalMarks
															}
														</strong>
													</p>

													<p className="mt-1 text-sm">
														Status :{" "}
														{quizResults[
															course.quiz._id
														].isPassed ? (
															<span className="font-semibold text-green-600">
																Passed ✔
															</span>
														) : (
															<span className="font-semibold text-red-600">
																Failed ✘
															</span>
														)}
													</p>
												</div>
											) : (
												<button
													disabled={course.subSection.some(
														(lecture) =>
															!completedLectures.includes(
																lecture._id,
															),
													)}
													onClick={() =>
														navigate(
															`/quiz/${courseEntireData._id}/${course.quiz._id}`,
														)
													}
													className={`w-full rounded-md py-2 text-white ${
														course.subSection.some(
															(lecture) =>
																!completedLectures.includes(
																	lecture._id,
																),
														)
															? "cursor-not-allowed bg-gray-400"
															: "bg-yellow-500 hover:bg-yellow-600"
													}`}
												>
													{course.subSection.some(
														(lecture) =>
															!completedLectures.includes(
																lecture._id,
															),
													)
														? "Complete all lectures first"
														: "Start Quiz"}
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
		</>
	);
}

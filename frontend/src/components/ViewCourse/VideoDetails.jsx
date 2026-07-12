import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import "video-react/dist/video-react.css";
import { useLocation } from "react-router-dom";
import { BigPlayButton, Player } from "video-react";

import { updateCompletedLectures } from "../../feature/viewCourseSlice";
import IconBtn from "../../components/common/IconBtn";
import axios from "axios";

const VideoDetails = () => {
	const { courseId, sectionId, subSectionId } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const playerRef = useRef(null);
	const dispatch = useDispatch();
	const { token } = useSelector((state) => state.auth);
	const { courseSectionData, courseEntireData, completedLectures } =
		useSelector((state) => state.viewCourse);

	const [videoData, setVideoData] = useState([]);
	const [previewSource, setPreviewSource] = useState("");
	const [videoEnded, setVideoEnded] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		(async () => {
			if (!courseSectionData.length) return;
			if (!courseId && !sectionId && !subSectionId) {
				navigate(`/dashboard/enrolled-courses`);
			} else {
				
				const filteredData = courseSectionData.filter(
					(course) => course._id === sectionId,
				);
				
				const filteredVideoData = filteredData?.[0]?.subSection.filter(
					(data) => data._id === subSectionId,
				);
				
				setVideoData(filteredVideoData[0]);
				setPreviewSource(courseEntireData.thumbnail);
				setVideoEnded(false);
			}
		})();
	}, [courseSectionData, courseEntireData, location.pathname]);

	// check if the lecture is the first video of the course
	const isFirstVideo = () => {
		const currentSectionIndx = courseSectionData.findIndex(
			(data) => data._id === sectionId,
		);

		const currentSubSectionIndx = courseSectionData[
			currentSectionIndx
		].subSection.findIndex((data) => data._id === subSectionId);

		if (currentSectionIndx === 0 && currentSubSectionIndx === 0) {
			return true;
		} else {
			return false;
		}
	};

	// go to the next video
	const goToNextVideo = () => {
		

		const currentSectionIndx = courseSectionData.findIndex(
			(data) => data._id === sectionId,
		);

		const noOfSubsections =
			courseSectionData[currentSectionIndx].subSection.length;

		const currentSubSectionIndx = courseSectionData[
			currentSectionIndx
		].subSection.findIndex((data) => data._id === subSectionId);

		

		if (currentSubSectionIndx !== noOfSubsections - 1) {
			const nextSubSectionId =
				courseSectionData[currentSectionIndx].subSection[
					currentSubSectionIndx + 1
				]._id;
			navigate(
				`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`,
			);
		} else {
			const nextSectionId = courseSectionData[currentSectionIndx + 1]._id;
			const nextSubSectionId =
				courseSectionData[currentSectionIndx + 1].subSection[0]._id;
			navigate(
				`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`,
			);
		}
	};

	// check if the lecture is the last video of the course
	const isLastVideo = () => {
		const currentSectionIndx = courseSectionData.findIndex(
			(data) => data._id === sectionId,
		);

		const noOfSubsections =
			courseSectionData[currentSectionIndx].subSection.length;

		const currentSubSectionIndx = courseSectionData[
			currentSectionIndx
		].subSection.findIndex((data) => data._id === subSectionId);

		if (
			currentSectionIndx === courseSectionData.length - 1 &&
			currentSubSectionIndx === noOfSubsections - 1
		) {
			return true;
		} else {
			return false;
		}
	};

	// go to the previous video
	const goToPrevVideo = () => {
		

		const currentSectionIndx = courseSectionData.findIndex(
			(data) => data._id === sectionId,
		);

		const currentSubSectionIndx = courseSectionData[
			currentSectionIndx
		].subSection.findIndex((data) => data._id === subSectionId);

		if (currentSubSectionIndx !== 0) {
			const prevSubSectionId =
				courseSectionData[currentSectionIndx].subSection[
					currentSubSectionIndx - 1
				]._id;
			navigate(
				`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`,
			);
		} else {
			const prevSectionId = courseSectionData[currentSectionIndx - 1]._id;
			const prevSubSectionLength =
				courseSectionData[currentSectionIndx - 1].subSection.length;
			const prevSubSectionId =
				courseSectionData[currentSectionIndx - 1].subSection[
					prevSubSectionLength - 1
				]._id;
			navigate(
				`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`,
			);
		}
	};

	const handleLectureCompletion = async () => {
		setLoading(true);
		const res = await axios.post(
			`${import.meta.env.VITE_SERVER_URL}course/updateCourseProgress`,
			{ courseId: courseId, subsectionId: subSectionId },
			{ withCredentials: true },
		);
		if (res) {
			dispatch(updateCompletedLectures(subSectionId));
		}
		setLoading(false);
	};

	return (
		<div className="flex flex-col gap-5 text-white">
			{!videoData ? (
				<img
					src={previewSource}
					alt="Preview"
					className="h-full w-full rounded-md object-cover"
				/>
			) : (
				<Player
					ref={playerRef}
					aspectRatio="16:9"
					autoPlay={true}
					playsInline
					onEnded={() => setVideoEnded(true)}
					src={videoData?.videoUrl}
				>
					<BigPlayButton position="center" />
					{/* Render When Video Ends */}
					{videoEnded && (
						<div
							style={{
								background:
									"linear-gradient(to top, rgba(15,23,42,.95), rgba(15,23,42,.75), rgba(15,23,42,.45), transparent)",
							}}
							className="absolute inset-0 z-50 flex flex-col items-center justify-center px-6 backdrop-blur-[2px]"
						>
							{/* Success Icon */}
							<div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 border border-green-400">
								<span className="text-5xl">🎉</span>
							</div>

							<h2 className="text-3xl font-bold text-white">
								Lecture Completed
							</h2>

							<p className="mt-2 max-w-md text-center text-gray-200">
								Great job! Continue learning and unlock the next
								lesson.
							</p>

							{/* Buttons */}
							<div className="mt-8 flex flex-wrap justify-center gap-4">
								{!completedLectures.includes(subSectionId) && (
									<IconBtn
										disabled={loading}
										onclick={handleLectureCompletion}
										text={
											loading
												? "Saving..."
												: "✓ Mark as Completed"
										}
										customClasses="rounded-xl px-6 py-3 bg-green-600 hover:bg-green-700 text-white shadow-lg"
									/>
								)}

								<button
									disabled={loading}
									onClick={() => {
										if (playerRef.current) {
											playerRef.current.seek(0);
											setVideoEnded(false);
										}
									}}
									className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-medium text-white transition hover:bg-white/20"
								>
									🔄 Watch Again
								</button>
							</div>

							{/* Navigation */}
							<div className="mt-10 flex gap-4">
								{!isFirstVideo() && (
									<button
										disabled={loading}
										onClick={goToPrevVideo}
										className="rounded-xl bg-red-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-red-600"
									>
										← Previous Lesson
									</button>
								)}

								{!isLastVideo() && (
									<button
										disabled={loading}
										onClick={goToNextVideo}
										className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-indigo-700"
									>
										Next Lesson →
									</button>
								)}
							</div>
						</div>
					)}
				</Player>
			)}

			<div className="bg-white rounded-xl ">
				<h1 className="p-4 text-xl font-semibold text-black">
					Title: {videoData?.title}
				</h1>
			</div>
		</div>
	);
};

export default VideoDetails;
// video

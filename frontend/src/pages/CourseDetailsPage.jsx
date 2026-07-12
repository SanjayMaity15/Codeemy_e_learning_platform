import React, { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmationModal from "../components/common/ConfirmationModal";
import RatingStars from "../components/common/RatingStars";
import CourseAccordionBar from "../components/Course/CourseAccordionBar";
import CourseDetailsCard from "../components/Course/CourseDetailsCard";
import { formatDate } from "../utils/dateFormatter";
import { BuyCourse } from "../apis/studentFeaturesAPI";
import GetAvgRating from "../utils/avgRating";
import axios from "axios";
import Loader from "../components/common/Loader";
import PageTitle from "../components/common/HelmetForTitle";
import { ACCOUNT_TYPE } from "../utils/constants";
import { addToCart } from "../feature/cartSlice";
import { FaShareSquare } from "react-icons/fa";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
// import Error from "./Error";

function CourseDetailsPage() {
	const { user } = useSelector((state) => state.profile);
	const { token } = useSelector((state) => state.auth);
	
	const { paymentLoading } = useSelector((state) => state.course);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false)
	// Getting courseId from url parameter
	const { courseId } = useParams();
	

	// Declear a state to save the course details
	const [response, setResponse] = useState(null);
	const [confirmationModal, setConfirmationModal] = useState(null);
	useEffect(() => {
		// Calling fetchCourseDetails fucntion to fetch the details
		(async () => {
			try {
				setLoading(true)
				const res = await axios.post(
					`${import.meta.env.VITE_SERVER_URL}course/getFullCourseDetails`,
					{ courseId },
					{ withCredentials: true },
				);
				
				
				setResponse(res.data);
				setLoading(false)
			} catch (error) {
				setLoading(false)
				console.log("Could not fetch Course Details");
			}
		})();
	}, [courseId]);

	

	// Calculating Avg Review count
	const [avgReviewCount, setAvgReviewCount] = useState(0);
	useEffect(() => {
		const count = GetAvgRating(
			response?.data?.courseDetails.ratingAndReviews,
		);
		setAvgReviewCount(count);
	}, [response]);

	// Collapse all

	const [isActive, setIsActive] = useState(Array(0));
	const handleActive = (id) => {
		setIsActive(
			!isActive.includes(id)
				? isActive.concat([id])
				: isActive.filter((e) => e != id),
		);
	};

	// Total number of lectures
	const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
	useEffect(() => {
		let lectures = 0;
		response?.data?.courseDetails?.courseContent?.forEach((sec) => {
			lectures += sec.subSection.length || 0;
		});
		setTotalNoOfLectures(lectures);
	}, [response]);

	if (loading || !response) {
		return <Loader />;
	}
	if (!response.success) {
		return <Error />;
	}

	const {
		_id,
		courseName,
		courseDescription,
		thumbnail,
		price,
		whatYouWillLearn,
		courseContent,
		ratingAndReviews,
		instructor,
		studentsEnrolled,
		createdAt,
	} = response.data?.courseDetails;

	const handleBuyCourse = () => {
		
		if (token) {
			BuyCourse(token, [courseId], user, navigate, dispatch);
			return;
		}
		setConfirmationModal({
			text1: "You are not logged in!",
			text2: "Please login to Purchase Course.",
			btn1Text: "Login",
			btn2Text: "Cancel",
			btn1Handler: () => navigate("/login"),
			btn2Handler: () => setConfirmationModal(null),
		});
	};

	const handleShare = () => {
		copy(window.location.href);
		toast.success("Link copied");
	};

	const handleAddToCart = (course) => {
		
		if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR || user && user.accountType === ACCOUNT_TYPE.ADMIN) {
			toast.error("You can't buy a course.");
			return;
		}
		if (token) {
			dispatch(addToCart(course));
			
			// toast.success(`${course.courseName} added to cart`)
			return;
		}
		setConfirmationModal({
			text1: "You are not logged in!",
			text2: "Please login to add To Cart",
			btn1Text: "Login",
			btn2Text: "Cancel",
			btn1Handler: () => navigate("/login"),
			btn2Handler: () => setConfirmationModal(null),
		});
	};

	if (paymentLoading) {
		return <Loader />;
	}

	

	return (
	<>
		<section className="min-h-screen bg-gray-50">
			<PageTitle title={response.data.courseDetails.courseName} />

			{/* ---------------- Hero Section ---------------- */}
			<section className="bg-white border-b border-gray-200">
				<div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-10">
					{/* Left Side */}
					<div className="lg:col-span-2">

						<p className="text-sm text-indigo-600 font-medium mb-3">
							Home / Courses
						</p>

						<h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
							{courseName}
						</h1>

						<p className="mt-5 text-lg text-gray-600 leading-8">
							{courseDescription}
						</p>

						{/* Rating */}
						<div className="flex flex-wrap items-center gap-4 mt-6">

							<div className="flex items-center gap-2">
								<RatingStars
									Review_Count={avgReviewCount}
									Star_Size={22}
								/>

								<span className="text-gray-700 font-medium">
									({ratingAndReviews.length} Reviews)
								</span>
							</div>

							<span className="text-gray-400">•</span>

							<span className="text-gray-700">
								{studentsEnrolled.length} Students
							</span>
						</div>

						{/* Instructor */}
						<div className="mt-8 flex items-center gap-4">

							<img
								src={
									instructor.image
										? instructor.image
										: `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
								}
								alt="Instructor"
								className="w-14 h-14 rounded-full object-cover border"
							/>

							<div>
								<p className="font-semibold text-gray-900">
									{`${instructor.firstName} ${instructor.lastName}`}
								</p>

								<p className="text-sm text-gray-500">
									Course Instructor
								</p>
							</div>
						</div>

						{/* Extra Info */}
						<div className="flex flex-wrap gap-6 mt-8 text-gray-600">

							<div className="flex items-center gap-2">
								<BiInfoCircle />
								<span>
									Created {formatDate(createdAt)}
								</span>
							</div>

							<div className="flex items-center gap-2">
								<HiOutlineGlobeAlt />
								<span>English</span>
							</div>

							<button
								onClick={handleShare}
								className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition"
							>
								<FaShareSquare />
								Share
							</button>

						</div>

						{/* Mobile Thumbnail */}
						<div className="lg:hidden mt-10">
							<img
								src={thumbnail}
								alt={courseName}
								className="rounded-2xl shadow-md w-full object-cover"
							/>
						</div>

						{/* Mobile Purchase */}
						<div className="lg:hidden mt-8 bg-white rounded-2xl border p-6 shadow-sm">

							<h2 className="text-3xl font-bold text-gray-900">
								₹ {price}
							</h2>

							<div className="mt-6 flex flex-col gap-4">

								<button
									onClick={handleBuyCourse}
									className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
								>
									Buy Now
								</button>

								<button
									onClick={() =>
										handleAddToCart(
											response.data.courseDetails
										)
									}
									className="w-full border border-indigo-600 text-indigo-600 hover:bg-indigo-50 py-3 rounded-xl font-semibold transition"
								>
									Add to Cart
								</button>

							</div>

						</div>

					</div>

					{/* Desktop Sticky Card */}
					<div className="hidden lg:block">
						<div className="sticky top-24">
							<CourseDetailsCard
								course={response?.data?.courseDetails}
								setConfirmationModal={setConfirmationModal}
								handleBuyCourse={handleBuyCourse}
							/>
						</div>
					</div>

				</div>
			</section>

			{/* ---------- Content Starts ---------- */}
			<div className="max-w-7xl mx-auto px-6 py-12">				{/* ---------------- What You'll Learn ---------------- */}
				<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

					<h2 className="text-3xl font-bold text-gray-900">
						What You'll Learn
					</h2>

					<div className="mt-6 text-gray-700 leading-8 prose max-w-none">
						<ReactMarkdown>
							{whatYouWillLearn}
						</ReactMarkdown>
					</div>

				</div>

				{/* ---------------- Course Content ---------------- */}
				<div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

						<div>
							<h2 className="text-3xl font-bold text-gray-900">
								Course Content
							</h2>

							<div className="flex flex-wrap gap-5 mt-3 text-gray-600">

								<span>
									{courseContent.length} Sections
								</span>

								<span>
									{totalNoOfLectures} Lectures
								</span>

								<span>
									{response.data?.totalDuration}
								</span>

							</div>
						</div>

						<button
							onClick={() => setIsActive([])}
							className="text-indigo-600 hover:text-indigo-700 font-medium transition"
						>
							Collapse All
						</button>

					</div>

					{/* Accordion */}
					<div className="mt-8 space-y-4">

						{courseContent?.map((course, index) => (
							<CourseAccordionBar
								key={index}
								course={course}
								isActive={isActive}
								handleActive={handleActive}
							/>
						))}

					</div>

				</div>				{/* ---------------- Instructor ---------------- */}
				<div className="mt-12 mb-16 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

					<h2 className="text-3xl font-bold text-gray-900 mb-8">
						Meet Your Instructor
					</h2>

					<div className="flex flex-col md:flex-row gap-6">

						{/* Profile Image */}
						<div className="shrink-0">

							<img
								src={
									instructor.image
										? instructor.image
										: `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
								}
								alt="Instructor"
								className="w-28 h-28 rounded-full object-cover border-4 border-indigo-100 shadow-md"
							/>

						</div>

						{/* Details */}
						<div className="flex-1">

							<h3 className="text-2xl font-semibold text-gray-900">
								{`${instructor.firstName} ${instructor.lastName}`}
							</h3>

							<p className="mt-2 text-indigo-600 font-medium">
								Course Instructor
							</p>

							<p className="mt-5 text-gray-600 leading-8">
								{instructor?.additionalDetails?.about ||
									"No instructor description available."}
							</p>

						</div>

					</div>

				</div>

			</div>
		</section>

		{/* Confirmation Modal */}
		{confirmationModal && (
			<ConfirmationModal
				modalData={confirmationModal}
			/>
		)}
	</>
);
}

export default CourseDetailsPage;

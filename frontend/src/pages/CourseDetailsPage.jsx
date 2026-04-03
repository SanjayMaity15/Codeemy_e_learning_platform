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
	const { loading } = useSelector((state) => state.profile);
	const { paymentLoading } = useSelector((state) => state.course);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Getting courseId from url parameter
	const { courseId } = useParams();
	// console.log(`course id: ${courseId}`)

	// Declear a state to save the course details
	const [response, setResponse] = useState(null);
	const [confirmationModal, setConfirmationModal] = useState(null);
	useEffect(() => {
		// Calling fetchCourseDetails fucntion to fetch the details
		(async () => {
			try {
				const res = await axios.post(
					`${import.meta.env.VITE_SERVER_URL}course/getFullCourseDetails`,
					{ courseId },
					{ withCredentials: true },
				);
				// console.log("course details res: ", res)
				console.log(res);
				setResponse(res.data);
			} catch (error) {
				console.log("Could not fetch Course Details");
			}
		})();
	}, [courseId]);

	// console.log("response: ", response)

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
		console.log("Buying...");
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
		console.log("work");
		if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
			toast.error("You are an Instructor. You can't buy a course.");
			return;
		}
		if (token) {
			dispatch(addToCart(course));
			console.log(course);
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

	console.log(response);

	return (
		<>
			<div
				className={`relative section-container w-full bg-linear-to-br from-green-50 via-white to-yellow-50 text-black z-10`}
			>
				<PageTitle title={response.data.courseDetails.courseName} />
				{/* Hero Section */}
				<div className="mx-auto lg:w-315 2xl:relative ">
					<div className="mx-auto grid min-h-112.5 py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-202.5">
						<div className="relative block max-h-120 lg:hidden">
							<div className="absolute bottom-0 left-0 h-full w-full shadow-md"></div>
							<img
								src={thumbnail}
								alt="course thumbnail"
								className="aspect-auto w-full"
							/>
						</div>
						<div
							className={`z-30 my-5 flex flex-col justify-start gap-4 py-5 text-lg `}
						>
							<div>
								<p className="md:text-4xl text-2xl text-primary font-bold">
									{courseName}
								</p>
							</div>
							<p className={`text-gray-500`}>
								{courseDescription}
							</p>
							<div className="text-md flex flex-wrap items-center gap-2">
								<RatingStars
									Review_Count={avgReviewCount}
									Star_Size={24}
								/>
								<span className="text-sm">{`(${ratingAndReviews.length} reviews)`}</span>
								<span className="text-sm">{`${studentsEnrolled.length} students enrolled`}</span>
							</div>
							<div>
								<p className="text-sm text-pink-600">
									Created By{" "}
									{`${instructor.firstName} ${instructor.lastName}`}
								</p>
							</div>
							<div className="flex text-sm flex-wrap gap-5">
								<p className="flex items-center gap-2">
									{" "}
									<BiInfoCircle /> Created at{" "}
									{formatDate(createdAt)}
								</p>
								<p className="flex items-center gap-2">
									{" "}
									<HiOutlineGlobeAlt /> English
								</p>
							</div>
							<div className="text-center">
								<button
									className="mx-auto flex items-center gap-2 py-6 text-green-600 "
									onClick={handleShare}
								>
									<FaShareSquare size={15} /> Share
								</button>
							</div>
						</div>
						<div className="flex w-full flex-col gap-4 py-4 lg:hidden">
							<p className="space-x-3 pb-4 text-3xl font-semibold ">
								Rs. {price}
							</p>
							<button
								className="bg-primary py-2 rounded-md text-white cursor-pointer hover:bg-indigo-700 transition-colors duration-200 "
								onClick={handleBuyCourse}
							>
								Buy Now
							</button>
							<button
								className="bg-pink-600 py-2 rounded-md text-white cursor-pointer hover:bg-pink-700 transition-colors duration-200 "
								onClick={() =>
									handleAddToCart(
										response?.data?.courseDetails,
									)
								}
							>
								Add to Cart
							</button>
						</div>
					</div>
					{/* Courses Card */}
					<div className="right-4 top-15 mx-auto hidden min-h-150 w-1/3 max-w-102.5 translate-y-24 md:translate-y-0 lg:absolute rounded-full lg:block z-500">
						<CourseDetailsCard
							course={response?.data?.courseDetails}
							setConfirmationModal={setConfirmationModal}
							handleBuyCourse={handleBuyCourse}
						/>
					</div>
				</div>
			</div>
			<div className="mx-auto text-start  lg:w-315">
				<div className="mx-auto lg:mx-0 xl:max-w-202.5 px-6">
					{/* What will you learn section */}
					<div className="my-8 rounded-md">
						<p className="text-3xl font-semibold">
							What you'll learn
						</p>
						<div className="mt-5 text-gray-500">
							<ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
						</div>
					</div>

					{/* Course Content Section */}
					<div className="max-w-207.5">
						<div className="flex flex-col gap-3">
							<p className="text-[28px] font-semibold">
								Course Content
							</p>
							<div className="flex flex-wrap justify-between gap-2">
								<div className="flex gap-2 text-xs md:text-sm">
									<span>
										{courseContent.length} {`section(s)`}
									</span>
									<span>
										{totalNoOfLectures} {`lecture(s)`}
									</span>
									<span>
										{response.data?.totalDuration} total
										length
									</span>
								</div>
								<div className="flex justify-end w-full text-xs md:text-sm">
									<button
										className="text-pink-500 cursor-pointer"
										onClick={() => setIsActive([])}
									>
										Collapse all sections
									</button>
								</div>
							</div>
						</div>

						{/* Course Details Accordion */}
						<div className="py-4">
							{courseContent?.map((course, index) => (
								<CourseAccordionBar
									course={course}
									key={index}
									isActive={isActive}
									handleActive={handleActive}
								/>
							))}
						</div>

						{/* Author Details */}
						<div className="mb-12 py-4 w-full">
							<p className="text-[28px] font-semibold">Author</p>
							<div className="flex items-center gap-4 py-4">
								<img
									src={
										instructor.image
											? instructor.image
											: `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
									}
									alt="Author"
									className="h-14 w-14 rounded-full object-cover"
								/>
								<p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
							</div>
							<p className="text-gray-500 w-full">
								{instructor?.additionalDetails?.about}
							</p>
						</div>
					</div>
				</div>
			</div>

			{confirmationModal && (
				<ConfirmationModal modalData={confirmationModal} />
			)}
		</>
	);
}

export default CourseDetailsPage;

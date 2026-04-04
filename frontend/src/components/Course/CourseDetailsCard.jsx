import React from "react"
import copy from "copy-to-clipboard"
import { toast } from "react-hot-toast"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { addToCart } from "../../feature/cartSlice"
import { ACCOUNT_TYPE } from "../../utils/constants"



function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  console.log(token);

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    _id,
  } = course

  console.log(course);

  const handleShare = () => {
    copy(window.location.href)
    toast.success("Link copied")
  }

  const handleAddToCart = () => {
    console.log("work");
    if (
		(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) ||
		(user && user?.accountType === ACCOUNT_TYPE.ADMIN)
	) {
		toast.error("You can't buy a course.");
		return;
	}
    if (token) {
		dispatch(addToCart(course))
		console.log(course);
		// toast.success(`${course.courseName} added to cart`)
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }



  return (
		<>
			<div
				className={`flex flex-col gap-4 rounded-md bg-white shadow-md`}
			>
				{/* Course Image */}
				<img
					src={ThumbnailImage}
					alt={course?.courseName}
					className="max-h-75 min-h-45 w-100 overflow-hidden rounded-2xl object-cover md:max-w-full"
				/>

				<div className="px-4">
					<div className="space-x-3 pb-4 text-3xl text-pink-600 font-semibold">
						Rs. {CurrentPrice}
					</div>
					<div className="flex flex-col gap-4">
						<button
							className="bg-primary py-2 rounded-md text-white cursor-pointer hover:bg-indigo-700 transition-colors duration-200  "
							onClick={
								user &&
								course?.studentsEnrolled.includes(user?._id)
									? () =>
											navigate(
												"/dashboard/enrolled-courses",
											)
									: handleBuyCourse
							}
						>
							{user &&
							course?.studentsEnrolled.includes(user?._id)
								? "Go To Course"
								: "Buy Now"}
						</button>
						{(!user ||
							!course?.studentsEnrolled.includes(user?._id)) && (
							<button
								onClick={() => handleAddToCart()}
								className="bg-pink-600 py-2 rounded-md text-white cursor-pointer hover:bg-pink-700 transition-colors duration-200 "
							>
								Add to Cart
							</button>
						)}
					</div>
					<div>
						<p className="pb-3 pt-6 text-center text-sm text-gray-500">
							30-Day Money-Back Guarantee
						</p>
					</div>

					<div>
						<p className={`my-2 text-xl font-semibold `}>
							This Course Prequisite :
						</p>
						<div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
							{course?.instructions?.map((item, i) => {
								return (
									<p className={`flex gap-2 items-center`} key={i}>
										<BsFillCaretRightFill />
										<span>{item}</span>
									</p>
								);
							})}
						</div>
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
			</div>
		</>
  );
}

export default CourseDetailsCard

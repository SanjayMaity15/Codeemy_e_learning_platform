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

  

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    _id,
  } = course

  

  const handleShare = () => {
    copy(window.location.href)
    toast.success("Link copied")
  }

  const handleAddToCart = () => {
    
    if (
		(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) ||
		(user && user?.accountType === ACCOUNT_TYPE.ADMIN)
	) {
		toast.error("You can't buy a course.");
		return;
	}
    if (token) {
		dispatch(addToCart(course))
		
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
	<div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
		{/* Thumbnail */}
		<img
			src={ThumbnailImage}
			alt={course?.courseName}
			className="h-60 w-full object-fit"
		/>

		<div className="p-6">
			{/* Price */}
			<div className="mb-6">
				<p className="text-4xl font-bold text-primary">
					₹ {CurrentPrice}
				</p>
			</div>

			{/* Buttons */}
			<div className="space-y-3">
				<button
					onClick={
						user && course?.studentsEnrolled.includes(user?._id)
							? () => navigate("/dashboard/enrolled-courses")
							: handleBuyCourse
					}
					className="w-full rounded-xl bg-primary py-3 text-white font-semibold transition hover:bg-indigo-700 cursor-pointer"
				>
					{user && course?.studentsEnrolled.includes(user?._id)
						? "Go To Course"
						: "Buy Now"}
				</button>

				{(!user || !course?.studentsEnrolled.includes(user?._id)) && (
					<button
						onClick={handleAddToCart}
						className="w-full rounded-xl border border-primary py-3 font-semibold text-primary transition hover:bg-indigo-50 cursor-pointer"
					>
						Add to Cart
					</button>
				)}
			</div>

			{/* Guarantee */}
			<div className="my-6 rounded-xl bg-gray-50 py-3 text-center">
				<p className="text-sm text-gray-600">
					✅ 30-Day Money-Back Guarantee
				</p>
			</div>

			{/* Includes */}
			<div className="border-t border-gray-200 pt-6">
				<h3 className="mb-4 text-lg font-semibold text-gray-900">
					Course Prerequisites
				</h3>

				<div className="space-y-3">
					{course?.instructions?.map((item, i) => (
						<div key={i} className="flex items-start gap-3">
							<div className="mt-1 text-primary">
								<BsFillCaretRightFill size={10} />
							</div>

							<p className="text-sm leading-6 text-gray-600">
								{item}
							</p>
						</div>
					))}
				</div>
			</div>

			{/* Share */}
			<div className="mt-8 border-t border-gray-200 pt-5">
				<button
					onClick={handleShare}
					className="mx-auto flex items-center gap-2 text-primary font-medium hover:text-indigo-700 transition cursor-pointer"
				>
					<FaShareSquare />
					Share this course
				</button>
			</div>
		</div>
	</div>
);
}

export default CourseDetailsCard

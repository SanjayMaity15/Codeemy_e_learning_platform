import { FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";

import { removeFromCart } from "../../../feature/cartSlice";

export default function RenderCartCourses() {
	const { cart } = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	return (
		<div className="flex flex-1 flex-col">
			{cart.map((course, indx) => (
				<div
					key={course._id}
					className={`flex w-full flex-col md:flex-row flex-wrap items-center shadow-sm bg-white p-4 justify-between gap-6 ${
						indx !== cart.length - 1 &&
						"border-b border-b-gray-400 pb-6"
					} ${indx !== 0 && "mt-6"} `}
				>
					<div className="flex flex-1 flex-col gap-4 xl:flex-row items-center">
						<img
							src={course?.thumbnail}
							alt={course?.courseName}
							className="h-37 w-55 rounded-lg object-cover"
						/>
						<div className="flex flex-col space-y-1">
							<p className="text-lg font-semibold">
								{course?.courseName}
							</p>
							<p className="text-sm text-black-300">
								{course?.category?.name}
							</p>
							<div className="flex items-center gap-2 text-pink-600">
								<span className="text-yellow-5">4.5</span>
								<ReactStars
									count={5}
									value={course?.ratingAndReviews?.length}
									size={20}
									edit={false}
									activeColor="#ffd700"
									emptyIcon={<FaStar />}
									fullIcon={<FaStar />}
								/>
								<span className="text-black-400">
									{course?.ratingAndReviews?.length} Ratings
								</span>
							</div>
						</div>
					</div>
					<div className="flex md:flex-col items-center flex-row-reverse md:items-end space-y-2 gap-3">
						<button
							onClick={() => dispatch(removeFromCart(course._id))}
							className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-pink-100 cursor-pointer py-2 px-4 text-pink-600"
						>
							<RiDeleteBin6Line />
							<span>Remove</span>
						</button>
						<p className="md:mb-6 text-xl md:text-2xl font-semibold text-primary">
							₹ {course?.price}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}

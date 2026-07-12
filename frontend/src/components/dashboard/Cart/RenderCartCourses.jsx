import { FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";

import { removeFromCart } from "../../../feature/cartSlice";

export default function RenderCartCourses() {
	const { cart } = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	return (
		<div className="flex flex-1 flex-col gap-6">
			{cart.map((course, indx) => (
				<div
					key={course._id}
					className={`group flex w-full flex-col flex-wrap items-center justify-between gap-6 rounded-3xl border border-gray-200 bg-white/90 backdrop-blur-md p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
						indx !== cart.length - 1 &&
						"border-b border-b-gray-200 pb-6"
					} ${indx !== 0 && "mt-2"}`}
				>
					<div className="flex flex-1 flex-col xl:flex-row items-center gap-5">
						<img
							src={course?.thumbnail}
							alt={course?.courseName}
							className="h-40 w-60 rounded-2xl object-fit shadow-md transition duration-500 group-hover:scale-105"
						/>

						<div className="flex flex-col space-y-2">
							<p className="text-lg font-bold text-gray-800 group-hover:text-primary transition">
								{course?.courseName}
							</p>

							<p className="inline-flex w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
								{course?.category?.name}
							</p>

							<div className="flex flex-wrap items-center gap-2">
								<ReactStars
									count={5}
									value={course?.ratingAndReviews?.length}
									size={20}
									edit={false}
									activeColor="#ffd700"
									emptyIcon={<FaStar />}
									fullIcon={<FaStar />}
								/>

								<span className="text-sm text-gray-500">
									({course?.ratingAndReviews?.length} Ratings)
								</span>
							</div>

							<div className="flex flex-row justify-between items-center gap-5">
								<p className="md:mb-2 text-3xl font-bold bg-linear-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
									₹ {course?.price}
								</p>
								<button
									onClick={() =>
										dispatch(removeFromCart(course._id))
									}
									className="flex justify-center items-center text-red-600"
								>
									<RiDeleteBin6Line className="text-lg" />
									
								</button>
							</div>
						</div>
					</div>

					<div className="absolute bottom-0 left-0 h-1 w-0 rounded-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 group-hover:w-full"></div>
				</div>
			))}
		</div>
	);
}

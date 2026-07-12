import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import GetAvgRating from "../../utils/avgRating";
import RatingStars from "../../components/common/RatingStars";

function Course_Card({ course, Height }) {
	const [avgReviewCount, setAvgReviewCount] = useState(0);

	useEffect(() => {
		const count = GetAvgRating(course.ratingAndReviews);
		setAvgReviewCount(count);
	}, [course]);

	

return (
	<Link to={`/course/${course._id}`} className="block h-full">
		<div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-2xl">
			{/* Thumbnail */}
			<div className="relative overflow-hidden">
				<img
					src={course?.thumbnail}
					alt="course thumbnail"
					className={`${Height} w-full object-fit transition-transform duration-700 group-hover:scale-110`}
				/>

				{/* Gradient Overlay */}
				<div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

				{/* Price Badge */}
				<div className="absolute right-4 top-4 rounded-full bg-white/95 px-4 py-1 shadow-lg backdrop-blur-md">
					<p className="font-bold text-pink-600">
						₹ {course?.price}
					</p>
				</div>

				{/* Hover Button */}
				<div className="absolute bottom-5 left-1/2 -translate-x-1/2 translate-y-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
					<span className="rounded-full bg-white px-2 py-2 text-sm font-semibold text-indigo-600 shadow-lg">
						View Course →
					</span>
				</div>
			</div>

			{/* Content */}
			<div className="flex flex-1 flex-col p-5">
				{/* Title */}
				<h2 className="line-clamp-2 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-indigo-600">
					{course?.courseName}
				</h2>

				{/* Instructor */}
				{/* <p className="mt-2 text-sm text-gray-500">
					by{" "}
					<span className="font-medium text-gray-700">
						{course?.instructor?.firstName}{" "}
						{course?.instructor?.lastName}
					</span>
				</p> */}

				{/* Rating */}
				<div className="mt-2 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<RatingStars Review_Count={avgReviewCount} />

						<span className="text-sm font-medium text-gray-500">
							({course?.ratingAndReviews?.length})
						</span>
					</div>

					<div className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
						⭐ {avgReviewCount}
					</div>
				</div>

				{/* Footer */}
				<div className="mt-auto pt-6">
					<div className="flex items-center justify-between border-t border-gray-100 pt-4">
						<div>
							<p className="text-xs uppercase tracking-wider text-gray-400">
								Price
							</p>

							<p className="text-2xl font-bold text-indigo-600">
								₹ {course?.price}
							</p>
						</div>

						<div className="rounded-xl bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white">
							Enroll →
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Gradient */}
			<div className="h-1 w-0 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 group-hover:w-full"></div>
		</div>
	</Link>
);
}

export default Course_Card;

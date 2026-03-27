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
		<Link to={`/course/${course._id}`}>
			<div className="group rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
				{/* Thumbnail */}
				<div className="overflow-hidden">
					<img
						src={course?.thumbnail}
						alt="course thumbnail"
						className={`${Height} w-full object-cover transition-transform duration-300 group-hover:scale-105`}
					/>
				</div>

				{/* Content */}
				<div className="flex flex-col gap-2 p-4">
					{/* Title */}
					<h2 className="text-lg font-semibold text-primary line-clamp-2">
						{course?.courseName}
					</h2>

					{/* Instructor */}
					<p className="text-sm text-gray-500">
						{course?.instructor?.firstName}{" "}
						{course?.instructor?.lastName}
					</p>

					{/* Rating */}
					<div className="flex items-center gap-2 text-sm">


						<RatingStars Review_Count={avgReviewCount} />

						<span className="text-gray-500">
							({course?.ratingAndReviews?.length})
						</span>
					</div>

					{/* Price */}
					<div className="flex items-center justify-between mt-2">
						<p className="text-lg font-bold text-pink-600">
							₹ {course?.price}
						</p>

						{/* CTA */}
						<span className="text-sm font-medium text-[--color-primary] group-hover:underline">
							View
						</span>
					</div>
				</div>

				{/* Bottom Accent Line */}
				<div className="h-1 w-0 bg-[--color-primary] transition-all duration-300 group-hover:w-full"></div>
			</div>
		</Link>
	);
}

export default Course_Card;

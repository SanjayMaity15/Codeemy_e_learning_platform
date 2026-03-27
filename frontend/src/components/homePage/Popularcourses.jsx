import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { PiCurrencyInrBold } from "react-icons/pi";
import { Link } from "react-router-dom";

const Popularcourses = () => {
	const [popularCourses, setPopularCourses] = useState([]);

	async function fetchPopularCourses() {
		try {
			const res = await axios.get(
				`${import.meta.env.VITE_SERVER_URL}admin/popular-courses`,
			);

			setPopularCourses(res.data.data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchPopularCourses();
    }, []);
    
    console.log(popularCourses);

	if (popularCourses?.length === 0) {
		return <div></div>;
	}

	return (
		<div className="section-container pt-20 mt-12">
			{/* Heading */}
			<h2 className="text-3xl md:text-5xl font-bold text-center mb-4 font-orbitron text-gray-500">
				Popular{" "}
				<span className="bg-linear-to-b from-indigo-600  to-pink-600 bg-clip-text text-transparent">
					Courses
				</span>
			</h2>

			<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
				{popularCourses.map((course) => (
					<li
						key={course._id}
						className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform flex flex-col"
					>
						{/* Course Image */}
						<div className="overflow-hidden">
							<img
								src={course?.thumbnail}
								alt={course?.courseName}
								className="object-cover w-full h-60 rounded-t-xl transition-transform duration-300 hover:scale-105"
							/>
						</div>

						{/* Course Content */}
						<div className="p-4 flex flex-col flex-1 gap-2">
							<h3 className="text-xl text-primary font-bold truncate">
								{course.courseName}
							</h3>

							<p className="text-gray-600 text-sm line-clamp-3">
								{course.whatYouWillLearn}
							</p>

							<h4 className="text-gray-800 font-medium text-sm">
								Instructor:{" "}
								<span className="text-pink-600 font-semibold text-sm">
									{course.instructor.firstName}{" "}
									{course.instructor.lastName}
								</span>
							</h4>

							<div className="flex justify-between items-center mt-2">
								{/* Rating */}
								<div className="flex items-center gap-1">
									{Array.from({ length: 5 }).map((_, i) =>
										i + 1 <= course.avgRating ? (
											<FaStar
												key={i}
												className="text-yellow-400"
											/>
										) : (
											<FaRegStar
												key={i}
												className="text-gray-300"
											/>
										),
									)}
									<span className="text-gray-500 text-xs ml-1">
										({course.ratingAndReviews.length})
									</span>
								</div>

								{/* Price */}
								<div className="flex items-center text-primary font-bold">
									<PiCurrencyInrBold className="mr-1" />{" "}
									{course.price}
								</div>
							</div>

							{/* View Button */}
							<div className="mt-4 text-center">
								<Link
									to={`course/${course._id}`}
									className="text-primary hover:underline"
								>
									View Course
								</Link>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Popularcourses;

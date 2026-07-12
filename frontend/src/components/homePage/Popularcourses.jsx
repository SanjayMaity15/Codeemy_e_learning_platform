import axios from "axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { PiCurrencyInrBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useScrollAnim } from "../common/ScrollAnimation";

const Popularcourses = () => {
	const [popularCourses, setPopularCourses] = useState([]);

	const popularCourseRef = useRef(null);
	// if (popularCourses.length === 0) return;
	useScrollAnim(
		popularCourseRef,
		{
			start: "top 75%",
			end: "top 40%",
		},
		[popularCourses],
	);

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

	console.log(popularCourses)
	

	if (popularCourses?.length === 0) {
		return <div></div>;
	}

	return (
		<div
			className="section-container md:pt-20 mt-12"
			ref={popularCourseRef}
		>
			{/* Heading */}
			<div className="text-center mb-16">
				<span className="rounded-full bg-indigo-100 px-5 py-2 text-sm font-semibold text-indigo-600">
					TOP COURSES
				</span>

				<h2 className="mt-6 text-4xl md:text-5xl font-bold font-orbitron text-slate-900">
					Popular{" "}
					<span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
						Courses
					</span>
				</h2>

				<p className="mx-auto mt-5 max-w-2xl text-lg text-slate-500">
					Explore our most loved courses chosen by thousands of
					learners and start building real-world skills today.
				</p>
			</div>

			<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
				{popularCourses.map((course) => (
					<li
						key={course._id}
						className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
					>
						{/* Thumbnail */}
						<div className="relative overflow-hidden">
							<img
								src={course.thumbnail}
								alt={course.courseName}
								className="h-60 w-full object-cover transition duration-500 group-hover:scale-110"
							/>

							{/* Overlay */}
							<div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div>

							{/* Bestseller */}
							<div className="absolute left-4 top-4 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-white shadow-lg">
								🔥 Best Seller
							</div>

							{/* Price */}
							<div className="absolute right-4 top-4 rounded-full bg-white px-4 py-2 font-bold text-indigo-600 shadow-lg flex items-center">
								<PiCurrencyInrBold />
								{course.price}
							</div>

							{/* Course Name */}
							<div className="absolute bottom-4 left-4 right-4">
								<h3 className="text-2xl font-bold text-white line-clamp-2">
									{course.courseName}
								</h3>
							</div>
						</div>

						{/* Content */}
						<div className="p-6">
							{/* Instructor */}
							<div className="flex items-center gap-3">
								<p
									className="h-12 w-12 rounded-full
									flex justify-center items-center border-2 bg-pink-600 text-white border-indigo-200"
								>
									{course.instructor.firstName[0]}{" "}
									{course.instructor.lastName[0]}
								</p>

								<div>
									<p className="font-semibold text-slate-800">
										{course.instructor.firstName}{" "}
										{course.instructor.lastName}
									</p>

									<p className="text-sm text-slate-500">
										Professional Instructor
									</p>
								</div>
							</div>

							{/* Description */}
							<p className="mt-5 line-clamp-3 leading-7 text-slate-500">
								{course.whatYouWillLearn}
							</p>

							{/* Stats */}
							<div className="mt-6 flex items-center justify-between rounded-2xl bg-slate-50 p-4">
								{/* Rating */}
								<div>
									<div className="flex items-center gap-1">
										{Array.from({ length: 5 }).map(
											(_, i) =>
												i + 1 <=
												Math.round(course.avgRating) ? (
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
									</div>

									<p className="mt-1 text-xs text-slate-500">
										{course.ratingAndReviews.length} Reviews
									</p>
								</div>

								{/* Students */}
								<div className="text-center">
									<p className="text-xl font-bold text-indigo-600">
										{course.studentsEnrolled?.length}
									</p>

									<p className="text-xs text-slate-500">
										Students
									</p>
								</div>
							</div>

							{/* CTA */}
							<Link
								to={`/course/${course._id}`}
								className="mt-6 flex items-center justify-center rounded-xl bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
							>
								View Course →
							</Link>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Popularcourses;

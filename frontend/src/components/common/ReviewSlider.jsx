import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "../../App.css";

import { FaRegStar, FaStar } from "react-icons/fa";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import axios from "axios";

function ReviewSlider() {
	const [reviews, setReviews] = useState([]);
	const [hoveredIndex, setHoveredIndex] = useState(null); // ✅ NEW STATE
	const truncateWords = 15;

	useEffect(() => {
		(async () => {
			const result = await axios.get(
				`${import.meta.env.VITE_SERVER_URL}course/getReviews`,
				{ withCredentials: true },
			);

			if (result?.data?.success) {
				setReviews(result?.data?.data);
			}
		})();
	}, []);

	return (
		<div className="w-full py-12 mb-8">
			<div className="mx-auto max-w-6xl">
				<div className="text-center mb-16">
					<span className="rounded-full bg-indigo-100 px-5 py-2 text-sm font-semibold text-indigo-600">
						TESTIMONIALS
					</span>

					<h2 className="mt-6 text-4xl md:text-5xl font-bold font-orbitron text-slate-900">
						What Our{" "}
						<span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
							Students Say
						</span>
					</h2>

					<p className="mx-auto mt-5 max-w-2xl text-lg text-slate-500">
						Thousands of learners have transformed their careers
						through Codeemy. Here's what they have to say.
					</p>
				</div>

				<div className="mb-8 flex justify-center">
					<div className="rounded-full bg-white px-6 py-3 shadow">
						⭐ <span className="font-bold">{reviews.length}</span>{" "}
						Verified Student Reviews
					</div>
				</div>

				<div className="px-4 lg:px-0">
					<Swiper
						modules={[Pagination, Autoplay]}
						spaceBetween={30}
						slidesPerView={1}
						loop
						speed={900}
						autoplay={{
							delay: 3000,
							disableOnInteraction: false,
						}}
						pagination={{
							clickable: true,
							dynamicBullets: true,
						}}
						breakpoints={{
							640: {
								slidesPerView: 1,
							},
							768: {
								slidesPerView: 2,
							},
							1200: {
								slidesPerView: 3,
							},
						}}
					>
						{reviews.map((review, i) => {
							const isHovered = hoveredIndex === i;
							const isOther =
								hoveredIndex !== null && hoveredIndex !== i;

							return (
								<SwiperSlide key={i}>
									<div
										onMouseEnter={() => setHoveredIndex(i)}
										onMouseLeave={() =>
											setHoveredIndex(null)
										}
										className={`
										group relative overflow-hidden rounded-3xl
										border border-slate-200
										bg-white
										p-6
										shadow-sm
										transition-all duration-500
										hover:-translate-y-2 hover:shadow-2xl

										${isOther ? "blur-sm opacity-50" : ""}
										`}
																		>
										{/* Gradient Top */}
										<div className="absolute left-0 top-0 h-1 w-full bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600"></div>

										{/* Quote */}
										<div className="absolute right-5 top-5 text-6xl text-indigo-100 font-serif">
											“
										</div>

										{/* User */}
										<div className="flex items-center gap-4">
											<img
												src={
													review.user.image
														? review.user.image
														: `https://api.dicebear.com/7.x/initials/svg?seed=${review.user.firstName} ${review.user.lastName}`
												}
												alt=""
												className="h-16 w-16 rounded-full border-4 border-indigo-100 object-cover"
											/>

											<div>
												<h3 className="font-bold text-lg text-slate-800">
													{review.user.firstName}{" "}
													{review.user.lastName}
												</h3>

												<span className="inline-block mt-1 rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-600">
													{review.course.courseName}
												</span>
											</div>
										</div>

										{/* Review */}
										<p className="mt-6 text-slate-600 leading-7 line-clamp-4 min-h-28">
											{review.review}
										</p>

										{/* Footer */}
										<div className="mt-6 flex items-center justify-between">
											{/* Rating */}
											<div className="flex items-center gap-1">
												{[1, 2, 3, 4, 5].map((star) =>
													star <= review.rating ? (
														<FaStar
															key={star}
															className="text-yellow-400"
														/>
													) : (
														<FaRegStar
															key={star}
															className="text-gray-300"
														/>
													),
												)}
											</div>

											{/* Date */}
											<div className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">
												{new Date(
													review.createdAt,
												).toLocaleDateString()}
											</div>
										</div>
									</div>
								</SwiperSlide>
							);
						})}
					</Swiper>
				</div>
			</div>
		</div>
	);
}

export default ReviewSlider;
